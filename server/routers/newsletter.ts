import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { getDb } from "../db";
import { newsletterSubscribers } from "../../drizzle/schema";
import { eq, or } from "drizzle-orm";
import { nanoid } from "nanoid";
import {
  sendWelcomeEmail,
  sendPreferenceConfirmationEmail,
} from "../emailService";

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        email: z.string().email("Please enter a valid email address"),
        role: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const name = input.firstName || "New subscriber";
      const role = input.role ? `\nRole: ${input.role}` : "";

      // Try to save to DB if available
      const db = await getDb();
      if (db) {
        try {
          await db
            .insert(newsletterSubscribers)
            .values({ email: input.email })
            .onDuplicateKeyUpdate({ set: { status: "active" } });
          // Send welcome email (non-blocking)
          sendWelcomeEmail(input.email).catch((err) =>
            console.warn("[Newsletter] Welcome email failed:", err)
          );
        } catch (err) {
          console.warn("[Newsletter] DB insert failed:", err);
        }
      }

      // Always notify owner
      await notifyOwner({
        title: `📧 New Newsletter Subscriber — ${input.email}`,
        content: `A new subscriber has joined the UpskillinTech newsletter.\n\nName: ${name}\nEmail: ${input.email}${role}\n\nPlease add them to the mailing list at info@upskillintech.com.`,
      });

      return { success: true };
    }),

  getPreferences: publicProcedure
    .input(
      z.object({
        email: z.string().email().optional(),
        token: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.email && !input.token) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email or token is required",
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const conditions = [];
      if (input.token) conditions.push(eq(newsletterSubscribers.preferencesToken, input.token));
      if (input.email) conditions.push(eq(newsletterSubscribers.email, input.email));

      const [subscriber] = await db
        .select()
        .from(newsletterSubscribers)
        .where(or(...conditions))
        .limit(1);

      if (!subscriber) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subscriber not found",
        });
      }

      return {
        email: subscriber.email,
        prefAiNews: subscriber.prefAiNews,
        prefCourseUpdates: subscriber.prefCourseUpdates,
        prefEvents: subscriber.prefEvents,
        prefTips: subscriber.prefTips,
      };
    }),

  updatePreferences: publicProcedure
    .input(
      z.object({
        email: z.string().email().optional(),
        token: z.string().optional(),
        prefAiNews: z.boolean(),
        prefCourseUpdates: z.boolean(),
        prefEvents: z.boolean(),
        prefTips: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      if (!input.email && !input.token) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email or token is required",
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const conditions = [];
      if (input.token) conditions.push(eq(newsletterSubscribers.preferencesToken, input.token));
      if (input.email) conditions.push(eq(newsletterSubscribers.email, input.email));

      const [subscriber] = await db
        .select()
        .from(newsletterSubscribers)
        .where(or(...conditions))
        .limit(1);

      if (!subscriber) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subscriber not found. Please subscribe first.",
        });
      }

      await db
        .update(newsletterSubscribers)
        .set({
          prefAiNews: input.prefAiNews,
          prefCourseUpdates: input.prefCourseUpdates,
          prefEvents: input.prefEvents,
          prefTips: input.prefTips,
        })
        .where(eq(newsletterSubscribers.id, subscriber.id));

      // Send confirmation email (non-blocking)
      if (subscriber.preferencesToken) {
        sendPreferenceConfirmationEmail(
          subscriber.email,
          {
            prefAiNews: input.prefAiNews,
            prefCourseUpdates: input.prefCourseUpdates,
            prefEvents: input.prefEvents,
            prefTips: input.prefTips,
          },
          subscriber.preferencesToken
        ).catch((err) =>
          console.warn("[Newsletter] Preference confirmation email failed:", err)
        );
      }

      return { success: true };
    }),

  requestPreferencesLink: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const [subscriber] = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, input.email))
        .limit(1);

      if (!subscriber) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email not found in our newsletter list. Please subscribe first.",
        });
      }

      // Generate a token if one doesn't exist
      let token = subscriber.preferencesToken;
      if (!token) {
        token = nanoid(32);
        await db
          .update(newsletterSubscribers)
          .set({ preferencesToken: token })
          .where(eq(newsletterSubscribers.id, subscriber.id));
      }

      return { token };
    }),
});
