import { createHash, randomBytes } from "node:crypto";
import { and, count, eq, ne, sql } from "drizzle-orm";
import {
  webinarEmailEvents,
  webinarEmailQueue,
  webinarRegistrations,
  webinars,
} from "../../drizzle/schema";
import {
  AI_EMPLOYEE_WEBINAR_PLACEHOLDER,
  getWebinarPhase,
  normaliseEmail,
  type PublicWebinar,
  type WebinarRegistrationInput,
} from "../../shared/webinar";
import { getDb } from "../db";

const MAX_REGISTRATIONS_PER_WINDOW = 8;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const registrationAttempts = new Map<string, number[]>();

function publicWebinar(
  webinar: typeof webinars.$inferSelect,
): PublicWebinar {
  return {
    id: webinar.id,
    title: webinar.title,
    slug: webinar.slug,
    subtitle: webinar.subtitle,
    description: webinar.description,
    format: webinar.format,
    speakerName: webinar.speakerName,
    speakerTitle: webinar.speakerTitle,
    speakerBiography: webinar.speakerBiography,
    speakerImageUrl: webinar.speakerImageUrl,
    eventStartAt: webinar.eventStartAt,
    eventEndAt: webinar.eventEndAt,
    registrationOpensAt: webinar.registrationOpensAt,
    registrationClosesAt: webinar.registrationClosesAt,
    timezone: webinar.timezone,
    maximumAttendees: webinar.maximumAttendees,
    status: webinar.status,
    recordingAvailable: webinar.recordingAvailable,
    masterclassUrl: webinar.masterclassUrl,
  };
}

export async function getWebinarBySlug(slug: string) {
  const db = await getDb();
  if (!db) {
    return slug === AI_EMPLOYEE_WEBINAR_PLACEHOLDER.slug
      ? AI_EMPLOYEE_WEBINAR_PLACEHOLDER
      : null;
  }
  const [webinar] = await db
    .select()
    .from(webinars)
    .where(eq(webinars.slug, slug))
    .limit(1);
  return webinar ? publicWebinar(webinar) : null;
}

export function enforceRegistrationRateLimit(key: string) {
  const now = Date.now();
  const recent = (registrationAttempts.get(key) ?? []).filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= MAX_REGISTRATIONS_PER_WINDOW) return false;
  recent.push(now);
  registrationAttempts.set(key, recent);
  return true;
}

function token() {
  return randomBytes(32).toString("base64url");
}

function hashIp(value?: string) {
  if (!value) return null;
  const salt = process.env.WEBINAR_IP_HASH_SALT ?? "upskillintech-webinar";
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

export function buildWebinarEmailSchedule(
  webinar: typeof webinars.$inferSelect,
  now: Date,
) {
  const jobs: Array<{
    emailType:
      | "confirmation"
      | "reminder_2_days"
      | "reminder_1_hour"
      | "follow_up_attended";
    scheduledFor: Date;
  }> = [];
  if (webinar.confirmationEmailEnabled) {
    jobs.push({ emailType: "confirmation", scheduledFor: now });
  }
  if (webinar.eventStartAt && webinar.twoDayReminderEnabled) {
    const scheduledFor = new Date(webinar.eventStartAt.getTime() - 48 * 60 * 60 * 1000);
    if (scheduledFor > now) jobs.push({ emailType: "reminder_2_days", scheduledFor });
  }
  if (webinar.eventStartAt && webinar.oneHourReminderEnabled) {
    const scheduledFor = new Date(webinar.eventStartAt.getTime() - 60 * 60 * 1000);
    if (scheduledFor > now) jobs.push({ emailType: "reminder_1_hour", scheduledFor });
  }
  if (webinar.eventEndAt && webinar.followUpEnabled) {
    jobs.push({
      emailType: "follow_up_attended",
      scheduledFor: new Date(webinar.eventEndAt.getTime() + 2 * 60 * 60 * 1000),
    });
  }
  return jobs;
}

type RegistrationContext = {
  userAgent?: string;
  ip?: string;
};

export async function registerForWebinar(
  slug: string,
  input: WebinarRegistrationInput,
  context: RegistrationContext,
) {
  const db = await getDb();
  if (!db) {
    throw new Error("REGISTRATION_UNAVAILABLE");
  }

  const [webinar] = await db
    .select()
    .from(webinars)
    .where(eq(webinars.slug, slug))
    .limit(1);
  if (!webinar) throw new Error("WEBINAR_NOT_FOUND");

  const phase = getWebinarPhase(publicWebinar(webinar));
  if (phase !== "registration_open") {
    throw new Error(
      phase === "registration_closed" ? "REGISTRATION_CLOSED" : "REGISTRATION_NOT_OPEN",
    );
  }

  const emailNormalised = normaliseEmail(input.email);
  const [existing] = await db
    .select({
      confirmationToken: webinarRegistrations.confirmationToken,
      firstName: webinarRegistrations.firstName,
      registrationStatus: webinarRegistrations.registrationStatus,
    })
    .from(webinarRegistrations)
    .where(
      and(
        eq(webinarRegistrations.webinarId, webinar.id),
        eq(webinarRegistrations.emailNormalised, emailNormalised),
      ),
    )
    .limit(1);
  if (existing && existing.registrationStatus !== "cancelled") {
    return {
      success: true,
      duplicate: true,
      confirmationToken: existing.confirmationToken,
      firstName: existing.firstName,
      status: existing.registrationStatus,
    };
  }

  const [{ value: activeCount }] = await db
    .select({ value: count() })
    .from(webinarRegistrations)
    .where(
      and(
        eq(webinarRegistrations.webinarId, webinar.id),
        ne(webinarRegistrations.registrationStatus, "cancelled"),
      ),
    );
  const registrationStatus =
    webinar.maximumAttendees !== null && activeCount >= webinar.maximumAttendees
      ? "waitlisted"
      : "registered";
  const confirmationToken = token();
  const unsubscribeToken = token();
  const now = new Date();

  return db.transaction(async tx => {
    const insertResult = await tx.insert(webinarRegistrations).values({
      webinarId: webinar.id,
      firstName: input.firstName,
      lastName: input.lastName,
      name: `${input.firstName} ${input.lastName}`.trim(),
      email: input.email.trim(),
      emailNormalised,
      phone: input.phone || null,
      organisation: input.organisation || null,
      company: input.organisation || null,
      role: input.role,
      automationGoal: input.automationGoal || null,
      eventConsent: true,
      eventConsentAt: now,
      marketingConsent: input.marketingConsent,
      marketingConsentAt: input.marketingConsent ? now : null,
      registrationStatus,
      utmSource: input.utmSource || null,
      utmMedium: input.utmMedium || null,
      utmCampaign: input.utmCampaign || null,
      utmContent: input.utmContent || null,
      utmTerm: input.utmTerm || null,
      referrerUrl: input.referrerUrl || null,
      landingPage: input.landingPage || null,
      userAgent: context.userAgent?.slice(0, 500) || null,
      ipHash: hashIp(context.ip),
      unsubscribeToken,
      confirmationToken,
      webinarTitle: webinar.title,
      webinarDate: webinar.eventStartAt?.toISOString() ?? "To be announced",
    });
    const registrationId = Number(
      (insertResult as unknown as [{ insertId: number }])[0]?.insertId ?? 0,
    );
    if (!registrationId) throw new Error("REGISTRATION_INSERT_FAILED");

    for (const job of buildWebinarEmailSchedule(webinar, now)) {
      const queueResult = await tx.insert(webinarEmailQueue).values({
        webinarId: webinar.id,
        registrationId,
        emailType: job.emailType,
        scheduledFor: job.scheduledFor,
      });
      const emailQueueId = Number(
        (queueResult as unknown as [{ insertId: number }])[0]?.insertId ?? 0,
      );
      await tx.insert(webinarEmailEvents).values({
        emailQueueId: emailQueueId || null,
        registrationId,
        webinarId: webinar.id,
        eventType: "queued",
        eventData: { scheduledFor: job.scheduledFor.toISOString(), type: job.emailType },
      });
    }

    return {
      success: true,
      duplicate: false,
      confirmationToken,
      firstName: input.firstName,
      status: registrationStatus,
    };
  });
}

export async function getPublicRegistrationCount(slug: string) {
  const db = await getDb();
  if (!db) return 0;
  const [{ value }] = await db
    .select({ value: count() })
    .from(webinarRegistrations)
    .innerJoin(webinars, eq(webinarRegistrations.webinarId, webinars.id))
    .where(
      and(
        eq(webinars.slug, slug),
        ne(webinarRegistrations.registrationStatus, "cancelled"),
      ),
    );
  return value;
}

export async function getConfirmation(tokenValue: string) {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db
    .select({
      firstName: webinarRegistrations.firstName,
      status: webinarRegistrations.registrationStatus,
      confirmationSent: webinarRegistrations.confirmationSent,
      webinar: webinars,
    })
    .from(webinarRegistrations)
    .innerJoin(webinars, eq(webinarRegistrations.webinarId, webinars.id))
    .where(eq(webinarRegistrations.confirmationToken, tokenValue))
    .limit(1);
  if (!result) return null;
  return {
    firstName: result.firstName,
    status: result.status,
    confirmationSent: result.confirmationSent,
    webinar: publicWebinar(result.webinar),
  };
}

export async function updateSubscription(
  tokenValue: string,
  action: "marketing_opt_out" | "cancel_registration",
) {
  const db = await getDb();
  if (!db) throw new Error("REGISTRATION_UNAVAILABLE");
  const [registration] = await db
    .select()
    .from(webinarRegistrations)
    .where(eq(webinarRegistrations.unsubscribeToken, tokenValue))
    .limit(1);
  if (!registration || !registration.webinarId) return null;

  if (action === "marketing_opt_out") {
    await db
      .update(webinarRegistrations)
      .set({ marketingConsent: false, marketingConsentAt: null })
      .where(eq(webinarRegistrations.id, registration.id));
  } else {
    await db.transaction(async tx => {
      await tx
        .update(webinarRegistrations)
        .set({ registrationStatus: "cancelled" })
        .where(eq(webinarRegistrations.id, registration.id));
      await tx
        .update(webinarEmailQueue)
        .set({ status: "cancelled" })
        .where(
          and(
            eq(webinarEmailQueue.registrationId, registration.id),
            eq(webinarEmailQueue.status, "pending"),
          ),
        );
    });
  }
  await db.insert(webinarEmailEvents).values({
    registrationId: registration.id,
    webinarId: registration.webinarId,
    eventType: "unsubscribed",
    eventData: { action },
  });
  return { success: true, action };
}
