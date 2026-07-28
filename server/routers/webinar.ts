import { randomBytes } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, like, sql } from "drizzle-orm";
import { z } from "zod";
import {
  webinarEmailQueue,
  webinarRegistrations,
  webinars,
} from "../../drizzle/schema";
import {
  AI_EMPLOYEE_WEBINAR_SLUG,
  webinarRegistrationSchema,
} from "../../shared/webinar";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  calendarLinks,
  generateWebinarIcs,
} from "../webinar/webinarCalendarService";
import {
  enforceRegistrationRateLimit,
  getConfirmation,
  getPublicRegistrationCount,
  getWebinarBySlug,
  registerForWebinar,
  updateSubscription,
} from "../webinar/webinarService";

const legacyRegistrationSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().max(50).optional(),
  company: z.string().max(255).optional(),
  role: z.string().max(255).optional(),
  webinarTitle: z.string().max(500),
  webinarDate: z.string().max(100),
});

function friendlyRegistrationError(error: unknown): never {
  const message = error instanceof Error ? error.message : "";
  if (message === "WEBINAR_NOT_FOUND") {
    throw new TRPCError({ code: "NOT_FOUND", message: "This webinar could not be found." });
  }
  if (message === "REGISTRATION_CLOSED") {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Registration for this webinar has closed." });
  }
  if (message === "REGISTRATION_NOT_OPEN") {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Registration is not open yet." });
  }
  if (message === "REGISTRATION_UNAVAILABLE") {
    throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "Registration is temporarily unavailable. Please try again shortly." });
  }
  console.error("[Webinar] Registration failed:", message || "Unknown error");
  throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "We could not complete your registration. Please try again." });
}

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export const webinarRouter = router({
  bySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1).max(255) }))
    .query(async ({ input }) => {
      const webinar = await getWebinarBySlug(input.slug);
      if (!webinar) throw new TRPCError({ code: "NOT_FOUND", message: "Webinar not found" });
      return webinar;
    }),

  count: publicProcedure
    .input(z.object({ slug: z.string().min(1).max(255) }))
    .query(({ input }) => getPublicRegistrationCount(input.slug)),

  register: publicProcedure
    .input(
      z.union([
        webinarRegistrationSchema.extend({ slug: z.string().min(1).max(255) }),
        legacyRegistrationSchema,
      ]),
    )
    .mutation(async ({ input, ctx }) => {
      const forwarded = ctx.req.headers["x-forwarded-for"];
      const ip = Array.isArray(forwarded)
        ? forwarded[0]
        : forwarded?.split(",")[0]?.trim() || ctx.req.socket.remoteAddress;
      const rateKey = ip ?? "unknown";
      if (!enforceRegistrationRateLimit(rateKey)) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many registration attempts. Please wait a few minutes and try again.",
        });
      }
      const isLegacy = "name" in input;
      const names = isLegacy ? input.name.trim().split(/\s+/) : [];
      const registration = isLegacy
        ? {
            firstName: names[0] ?? input.name,
            lastName: names.slice(1).join(" ") || "Not provided",
            email: input.email,
            phone: input.phone ?? "",
            organisation: input.company ?? "",
            role: input.role || "Not provided",
            automationGoal: "",
            eventConsent: true as const,
            marketingConsent: false,
            website: "",
          }
        : input;
      try {
        return await registerForWebinar(
          isLegacy ? AI_EMPLOYEE_WEBINAR_SLUG : input.slug,
          registration,
          {
            ip,
            userAgent: ctx.req.headers["user-agent"],
          },
        );
      } catch (error) {
        friendlyRegistrationError(error);
      }
    }),

  confirmation: publicProcedure
    .input(z.object({ token: z.string().min(20).max(128) }))
    .query(async ({ input }) => {
      const result = await getConfirmation(input.token);
      if (!result) throw new TRPCError({ code: "NOT_FOUND", message: "Confirmation not found" });
      return result;
    }),

  calendar: publicProcedure
    .input(z.object({ slug: z.string().min(1).max(255) }))
    .query(async ({ input }) => {
      const webinar = await getWebinarBySlug(input.slug);
      if (!webinar) throw new TRPCError({ code: "NOT_FOUND", message: "Webinar not found" });
      return {
        links: calendarLinks(webinar),
        ics: webinar.eventStartAt && webinar.eventEndAt
          ? generateWebinarIcs(webinar)
          : null,
        filename: `upskillintech-${webinar.slug}.ics`,
      };
    }),

  unsubscribe: publicProcedure
    .input(z.object({
      token: z.string().min(20).max(128),
      action: z.enum(["marketing_opt_out", "cancel_registration"]),
    }))
    .mutation(async ({ input }) => {
      const result = await updateSubscription(input.token, input.action);
      if (!result) throw new TRPCError({ code: "NOT_FOUND", message: "This preference link is invalid or expired." });
      return result;
    }),

  adminWebinars: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select({
      id: webinars.id,
      title: webinars.title,
      slug: webinars.slug,
      status: webinars.status,
      eventStartAt: webinars.eventStartAt,
      maximumAttendees: webinars.maximumAttendees,
    }).from(webinars).orderBy(desc(webinars.createdAt));
  }),

  adminList: adminProcedure
    .input(z.object({
      webinarId: z.number().int().positive().optional(),
      search: z.string().max(200).optional(),
      status: z.enum(["registered", "waitlisted", "cancelled", "attended", "no_show"]).optional(),
      limit: z.number().int().min(1).max(500).default(100),
    }).default({ limit: 100 }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const filters = [];
      if (input.webinarId) filters.push(eq(webinarRegistrations.webinarId, input.webinarId));
      if (input.status) filters.push(eq(webinarRegistrations.registrationStatus, input.status));
      if (input.search) filters.push(like(webinarRegistrations.emailNormalised, `%${input.search.toLowerCase()}%`));
      return db
        .select({
          registration: webinarRegistrations,
          webinarTitle: webinars.title,
          confirmationStatus: sql<string>`coalesce((select status from webinar_email_queue q where q.registrationId = ${webinarRegistrations.id} and q.emailType = 'confirmation' limit 1), 'not_queued')`,
          reminderTwoDayStatus: sql<string>`coalesce((select status from webinar_email_queue q where q.registrationId = ${webinarRegistrations.id} and q.emailType = 'reminder_2_days' limit 1), 'not_queued')`,
          reminderOneHourStatus: sql<string>`coalesce((select status from webinar_email_queue q where q.registrationId = ${webinarRegistrations.id} and q.emailType = 'reminder_1_hour' limit 1), 'not_queued')`,
        })
        .from(webinarRegistrations)
        .leftJoin(webinars, eq(webinarRegistrations.webinarId, webinars.id))
        .where(filters.length ? and(...filters) : undefined)
        .orderBy(desc(webinarRegistrations.createdAt))
        .limit(input.limit);
    }),

  exportRegistrations: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(webinarRegistrations).orderBy(desc(webinarRegistrations.createdAt));
  }),

  exportCsv: adminProcedure
    .input(z.object({ webinarId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "Database unavailable" });
      const rows = await db
        .select({
          registration: webinarRegistrations,
          webinarSlug: webinars.slug,
        })
        .from(webinarRegistrations)
        .innerJoin(webinars, eq(webinarRegistrations.webinarId, webinars.id))
        .where(eq(webinarRegistrations.webinarId, input.webinarId))
        .orderBy(desc(webinarRegistrations.createdAt));
      const headers = [
        "First name", "Last name", "Email", "Phone", "Organisation", "Role",
        "Automation goal", "Registration status", "Event consent", "Marketing consent",
        "UTM source", "UTM medium", "UTM campaign", "Registration date",
      ];
      const lines = rows.map(({ registration }) => [
        registration.firstName, registration.lastName, registration.email,
        registration.phone, registration.organisation, registration.role,
        registration.automationGoal, registration.registrationStatus,
        registration.eventConsent, registration.marketingConsent,
        registration.utmSource, registration.utmMedium, registration.utmCampaign,
        registration.createdAt.toISOString(),
      ].map(csvCell).join(","));
      const date = new Date().toISOString().slice(0, 10);
      return {
        filename: `upskillintech-ai-employee-webinar-registrations-${date}.csv`,
        csv: [headers.map(csvCell).join(","), ...lines].join("\r\n"),
      };
    }),

  attendance: adminProcedure
    .input(z.object({
      registrationId: z.number().int().positive(),
      status: z.enum(["attended", "no_show", "cancelled", "registered", "waitlisted"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "Database unavailable" });
      await db.update(webinarRegistrations).set({
        registrationStatus: input.status,
        attended: input.status === "attended",
      }).where(eq(webinarRegistrations.id, input.registrationId));
      if (input.status === "cancelled") {
        await db.update(webinarEmailQueue).set({ status: "cancelled" }).where(
          and(
            eq(webinarEmailQueue.registrationId, input.registrationId),
            eq(webinarEmailQueue.status, "pending"),
          ),
        );
      }
      return { success: true };
    }),

  resendConfirmation: adminProcedure
    .input(z.object({ registrationId: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "Database unavailable" });
      await db.insert(webinarEmailQueue).values({
        webinarId: sql`(select webinarId from webinar_registrations where id = ${input.registrationId})`,
        registrationId: input.registrationId,
        emailType: "confirmation",
        scheduledFor: new Date(),
        status: "pending",
      }).onDuplicateKeyUpdate({
        set: {
          status: "pending",
          scheduledFor: new Date(),
          attemptCount: 0,
          lastError: null,
          providerMessageId: null,
          processingStartedAt: null,
          sentAt: null,
          failedAt: null,
        },
      });
      return { success: true, requestId: randomBytes(8).toString("hex") };
    }),
});
