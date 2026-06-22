import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { webinarRegistrations } from "../../drizzle/schema";
import { desc } from "drizzle-orm";
import {
  sendWebinarRegistrationNotification,
} from "../emailService";

export const webinarRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Valid email required"),
        phone: z.string().optional(),
        company: z.string().optional(),
        role: z.string().optional(),
        webinarTitle: z.string(),
        webinarDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();

      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available. Please try again later.",
        });
      }

      await db.insert(webinarRegistrations).values({
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        company: input.company ?? null,
        role: input.role ?? null,
        webinarTitle: input.webinarTitle,
        webinarDate: input.webinarDate,
      });

      // Fetch back to get the ID (non-critical)
      sendWebinarRegistrationNotification({
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        role: input.role,
        registrationId: 0,
        registeredAt: new Date(),
      }).catch((err) => console.warn("[Webinar] Admin notification failed:", err));

      return { success: true };
    }),

  exportRegistrations: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(webinarRegistrations)
      .orderBy(desc(webinarRegistrations.createdAt));
  }),
});
