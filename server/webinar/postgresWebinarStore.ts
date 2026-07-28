import { createHash, randomBytes } from "node:crypto";
import postgres from "postgres";
import {
  getWebinarPhase,
  normaliseEmail,
  type PublicWebinar,
  type WebinarRegistrationInput,
  type WebinarStatus,
} from "../../shared/webinar";

type RegistrationContext = { userAgent?: string; ip?: string };

let client: ReturnType<typeof postgres> | null = null;

export function usesPostgresWebinarStore() {
  return /^postgres(?:ql)?:\/\//i.test(process.env.DATABASE_URL ?? "");
}

export function getPostgresClient() {
  if (!usesPostgresWebinarStore()) return null;
  if (!client) {
    client = postgres(process.env.DATABASE_URL!, {
      ssl: "require",
      max: 3,
      prepare: false,
      idle_timeout: 20,
      connect_timeout: 15,
    });
  }
  return client;
}

function asDate(value: unknown) {
  return value ? new Date(String(value)) : null;
}

function publicWebinar(row: Record<string, unknown>): PublicWebinar {
  return {
    id: Number(row.id),
    title: String(row.title),
    slug: String(row.slug),
    subtitle: row.subtitle ? String(row.subtitle) : null,
    description: row.description ? String(row.description) : null,
    format: String(row.format),
    speakerName: row.speaker_name ? String(row.speaker_name) : null,
    speakerTitle: row.speaker_title ? String(row.speaker_title) : null,
    speakerBiography: row.speaker_biography
      ? String(row.speaker_biography)
      : null,
    speakerImageUrl: row.speaker_image_url
      ? String(row.speaker_image_url)
      : null,
    eventStartAt: asDate(row.event_start_at),
    eventEndAt: asDate(row.event_end_at),
    registrationOpensAt: asDate(row.registration_opens_at),
    registrationClosesAt: asDate(row.registration_closes_at),
    timezone: String(row.timezone),
    maximumAttendees:
      row.maximum_attendees == null ? null : Number(row.maximum_attendees),
    status: String(row.status) as WebinarStatus,
    recordingAvailable: Boolean(row.recording_available),
    masterclassUrl: row.masterclass_url ? String(row.masterclass_url) : null,
  };
}

function token() {
  return randomBytes(32).toString("base64url");
}

function hashIp(value?: string) {
  if (!value) return null;
  const salt = process.env.WEBINAR_IP_HASH_SALT ?? "upskillintech-webinar";
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

function emailSchedule(webinar: Record<string, unknown>, now: Date) {
  const jobs: Array<{ emailType: string; scheduledFor: Date }> = [];
  const start = asDate(webinar.event_start_at);
  const end = asDate(webinar.event_end_at);
  if (webinar.confirmation_email_enabled !== false) {
    jobs.push({ emailType: "confirmation", scheduledFor: now });
  }
  if (start && webinar.two_day_reminder_enabled !== false) {
    const scheduledFor = new Date(start.getTime() - 48 * 60 * 60 * 1000);
    if (scheduledFor > now)
      jobs.push({ emailType: "reminder_2_days", scheduledFor });
  }
  if (start && webinar.one_hour_reminder_enabled !== false) {
    const scheduledFor = new Date(start.getTime() - 60 * 60 * 1000);
    if (scheduledFor > now)
      jobs.push({ emailType: "reminder_1_hour", scheduledFor });
  }
  if (end && webinar.follow_up_enabled !== false) {
    jobs.push({
      emailType: "follow_up_attended",
      scheduledFor: new Date(end.getTime() + 2 * 60 * 60 * 1000),
    });
  }
  return jobs;
}

export async function pgGetWebinarBySlug(slug: string) {
  const sql = getPostgresClient();
  if (!sql) return null;
  const rows = await sql`select * from webinars where slug = ${slug} limit 1`;
  return rows[0] ? publicWebinar(rows[0]) : null;
}

export async function pgRegisterForWebinar(
  slug: string,
  input: WebinarRegistrationInput,
  context: RegistrationContext
) {
  const sql = getPostgresClient();
  if (!sql) throw new Error("REGISTRATION_UNAVAILABLE");
  const webinarRows =
    await sql`select * from webinars where slug = ${slug} limit 1`;
  const webinar = webinarRows[0];
  if (!webinar) throw new Error("WEBINAR_NOT_FOUND");

  const phase = getWebinarPhase(publicWebinar(webinar));
  if (phase !== "registration_open") {
    throw new Error(
      phase === "registration_closed"
        ? "REGISTRATION_CLOSED"
        : "REGISTRATION_NOT_OPEN"
    );
  }

  const emailNormalised = normaliseEmail(input.email);
  const existing = await sql`
    select confirmation_token, first_name, registration_status
    from webinar_registrations
    where webinar_id = ${webinar.id} and email_normalised = ${emailNormalised}
    limit 1
  `;
  if (existing[0] && existing[0].registration_status !== "cancelled") {
    return {
      success: true,
      duplicate: true,
      confirmationToken: existing[0].confirmation_token,
      firstName: existing[0].first_name,
      status: existing[0].registration_status,
    };
  }

  const countRows = await sql`
    select count(*)::int as value
    from webinar_registrations
    where webinar_id = ${webinar.id} and registration_status <> 'cancelled'
  `;
  const status =
    webinar.maximum_attendees != null &&
    Number(countRows[0].value) >= Number(webinar.maximum_attendees)
      ? "waitlisted"
      : "registered";
  const confirmationToken = token();
  const unsubscribeToken = token();
  const now = new Date();

  return sql.begin(async tx => {
    const inserted = await tx`
      insert into webinar_registrations (
        webinar_id, first_name, last_name, full_name, email, email_normalised,
        phone, organisation, role, automation_goal, event_consent,
        event_consent_at, marketing_consent, marketing_consent_at,
        registration_status, utm_source, utm_medium, utm_campaign, utm_content,
        utm_term, referrer_url, landing_page, user_agent, ip_hash,
        unsubscribe_token, confirmation_token
      ) values (
        ${webinar.id}, ${input.firstName}, ${input.lastName},
        ${`${input.firstName} ${input.lastName}`.trim()}, ${input.email.trim()},
        ${emailNormalised}, ${input.phone || null}, ${input.organisation || null},
        ${input.role}, ${input.automationGoal || null}, true, ${now},
        ${input.marketingConsent}, ${input.marketingConsent ? now : null},
        ${status}, ${input.utmSource || null}, ${input.utmMedium || null},
        ${input.utmCampaign || null}, ${input.utmContent || null},
        ${input.utmTerm || null}, ${input.referrerUrl || null},
        ${input.landingPage || null}, ${context.userAgent?.slice(0, 500) || null},
        ${hashIp(context.ip)}, ${unsubscribeToken}, ${confirmationToken}
      )
      returning id
    `;
    const registrationId = inserted[0].id;
    for (const job of emailSchedule(webinar, now)) {
      const queued = await tx`
        insert into webinar_email_queue (
          webinar_id, registration_id, email_type, scheduled_for
        ) values (
          ${webinar.id}, ${registrationId}, ${job.emailType}, ${job.scheduledFor}
        )
        on conflict (registration_id, email_type) do nothing
        returning id
      `;
      await tx`
        insert into webinar_email_events (
          email_queue_id, registration_id, webinar_id, event_type, event_data
        ) values (
          ${queued[0]?.id ?? null}, ${registrationId}, ${webinar.id}, 'queued',
          ${tx.json({ scheduledFor: job.scheduledFor.toISOString(), type: job.emailType })}
        )
      `;
    }
    return {
      success: true,
      duplicate: false,
      confirmationToken,
      firstName: input.firstName,
      status,
    };
  });
}

export async function pgGetPublicRegistrationCount(slug: string) {
  const sql = getPostgresClient();
  if (!sql) return 0;
  const rows = await sql`
    select count(*)::int as value
    from webinar_registrations r
    join webinars w on w.id = r.webinar_id
    where w.slug = ${slug} and r.registration_status <> 'cancelled'
  `;
  return Number(rows[0]?.value ?? 0);
}

export async function pgGetConfirmation(tokenValue: string) {
  const sql = getPostgresClient();
  if (!sql) return null;
  const rows = await sql`
    select r.first_name, r.registration_status, r.confirmation_sent,
           row_to_json(w.*) as webinar
    from webinar_registrations r
    join webinars w on w.id = r.webinar_id
    where r.confirmation_token = ${tokenValue}
    limit 1
  `;
  if (!rows[0]) return null;
  return {
    firstName: rows[0].first_name,
    status: rows[0].registration_status,
    confirmationSent: rows[0].confirmation_sent,
    webinar: publicWebinar(rows[0].webinar),
  };
}

export async function pgUpdateSubscription(
  tokenValue: string,
  action: "marketing_opt_out" | "cancel_registration"
) {
  const sql = getPostgresClient();
  if (!sql) throw new Error("REGISTRATION_UNAVAILABLE");
  const rows = await sql`
    select id, webinar_id from webinar_registrations
    where unsubscribe_token = ${tokenValue}
    limit 1
  `;
  if (!rows[0]) return null;
  const registration = rows[0];
  await sql.begin(async tx => {
    if (action === "marketing_opt_out") {
      await tx`
        update webinar_registrations
        set marketing_consent = false, marketing_consent_at = null
        where id = ${registration.id}
      `;
    } else {
      await tx`
        update webinar_registrations
        set registration_status = 'cancelled'
        where id = ${registration.id}
      `;
      await tx`
        update webinar_email_queue set status = 'cancelled'
        where registration_id = ${registration.id} and status = 'pending'
      `;
    }
    await tx`
      insert into webinar_email_events (
        registration_id, webinar_id, event_type, event_data
      ) values (
        ${registration.id}, ${registration.webinar_id}, 'unsubscribed',
        ${tx.json({ action })}
      )
    `;
  });
  return { success: true, action };
}
