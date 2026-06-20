import { z } from "zod";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { emailEvents } from "../../drizzle/schema";
import {
  generateWelcomeEmailHtml,
  generatePreferenceConfirmationHtml,
  generatePasswordResetEmailHtml,
  generateEventRegistrationEmailHtml,
  sendWelcomeEmail,
  sendPreferenceConfirmationEmail,
  sendPasswordResetEmail,
} from "../emailService";

type EmailTemplate =
  | "welcome"
  | "preference_confirmation"
  | "password_reset"
  | "event_registration";

const templateSchema = z.enum([
  "welcome",
  "preference_confirmation",
  "password_reset",
  "event_registration",
]);

const preferencesSchema = z
  .object({
    prefAiNews: z.boolean(),
    prefCourseUpdates: z.boolean(),
    prefEvents: z.boolean(),
    prefTips: z.boolean(),
  })
  .optional();

export const adminRouter = router({
  previewEmailTemplate: adminProcedure
    .input(
      z.object({
        template: templateSchema,
        preferences: preferencesSchema,
      })
    )
    .mutation(({ input }) => {
      let html: string;

      switch (input.template) {
        case "welcome":
          html = generateWelcomeEmailHtml();
          break;
        case "preference_confirmation":
          html = generatePreferenceConfirmationHtml(
            input.preferences ?? {
              prefAiNews: true,
              prefCourseUpdates: true,
              prefEvents: false,
              prefTips: true,
            }
          );
          break;
        case "password_reset":
          html = generatePasswordResetEmailHtml();
          break;
        case "event_registration":
          html = generateEventRegistrationEmailHtml();
          break;
        default:
          html = generateWelcomeEmailHtml();
      }

      return { html };
    }),

  sendTestEmail: adminProcedure
    .input(
      z.object({
        template: templateSchema,
        recipientEmail: z.string().email(),
        preferences: preferencesSchema,
      })
    )
    .mutation(async ({ input }) => {
      let result: { success: boolean; error?: string };

      switch (input.template) {
        case "welcome":
          result = await sendWelcomeEmail(input.recipientEmail);
          break;
        case "preference_confirmation":
          result = await sendPreferenceConfirmationEmail(
            input.recipientEmail,
            input.preferences ?? {
              prefAiNews: true,
              prefCourseUpdates: true,
              prefEvents: false,
              prefTips: true,
            },
            "test-token-preview"
          );
          break;
        case "password_reset":
          result = await sendPasswordResetEmail(
            input.recipientEmail,
            "test-reset-token"
          );
          break;
        case "event_registration":
          result = { success: true };
          break;
        default:
          result = { success: false, error: "Unknown template" };
      }

      if (!result.success) {
        return {
          success: false,
          error: result.error ?? "Failed to send test email",
        };
      }

      return { success: true };
    }),

  getEmailAnalytics: adminProcedure
    .input(z.object({ days: z.number().min(1).max(365).default(30) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        return {
          summary: {
            totalSent: 0,
            delivered: 0,
            opened: 0,
            clicked: 0,
            bounced: 0,
            unsubscribed: 0,
            spamReports: 0,
            openRate: 0,
            clickRate: 0,
            bounceRate: 0,
          },
          eventsByDate: [],
          eventsByTemplate: [],
          recentEvents: [],
        };
      }

      const since = new Date();
      since.setDate(since.getDate() - input.days);

      const events = await db
        .select()
        .from(emailEvents)
        .where(gte(emailEvents.timestamp, since))
        .orderBy(desc(emailEvents.timestamp));

      const totalSent = events.filter((e) =>
        ["processed", "delivered"].includes(e.eventType)
      ).length;
      const delivered = events.filter((e) => e.eventType === "delivered").length;
      const opened = events.filter((e) => e.eventType === "open").length;
      const clicked = events.filter((e) => e.eventType === "click").length;
      const bounced = events.filter((e) => e.eventType === "bounce").length;
      const unsubscribed = events.filter(
        (e) => e.eventType === "unsubscribe" || e.eventType === "group_unsubscribe"
      ).length;
      const spamReports = events.filter((e) => e.eventType === "spamreport").length;

      const openRate =
        delivered > 0 ? Math.round((opened / delivered) * 100) : 0;
      const clickRate =
        delivered > 0 ? Math.round((clicked / delivered) * 100) : 0;
      const bounceRate =
        totalSent > 0 ? Math.round((bounced / totalSent) * 100) : 0;

      // Group by date
      const dateMap = new Map<
        string,
        { delivered: number; opened: number; clicked: number }
      >();
      for (const e of events) {
        const date = new Date(e.timestamp).toISOString().split("T")[0];
        const existing = dateMap.get(date) ?? {
          delivered: 0,
          opened: 0,
          clicked: 0,
        };
        if (e.eventType === "delivered") existing.delivered++;
        if (e.eventType === "open") existing.opened++;
        if (e.eventType === "click") existing.clicked++;
        dateMap.set(date, existing);
      }
      const eventsByDate = Array.from(dateMap.entries())
        .map(([date, counts]) => ({ date, ...counts }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Group by template
      const templateMap = new Map<string, number>();
      for (const e of events) {
        if (e.templateType) {
          templateMap.set(
            e.templateType,
            (templateMap.get(e.templateType) ?? 0) + 1
          );
        }
      }
      const eventsByTemplate = Array.from(templateMap.entries())
        .map(([templateType, count]) => ({ templateType, count }))
        .sort((a, b) => b.count - a.count);

      return {
        summary: {
          totalSent,
          delivered,
          opened,
          clicked,
          bounced,
          unsubscribed,
          spamReports,
          openRate,
          clickRate,
          bounceRate,
        },
        eventsByDate,
        eventsByTemplate,
        recentEvents: events.slice(0, 20),
      };
    }),
});
