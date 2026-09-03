import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { courses, enrollments, orders } from "../../drizzle/schema";
import { ENV } from "../_core/env";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { stripe } from "../stripe";

const courseInput = z.object({ courseId: z.number().int().positive() });

function requirePayments() {
  if (!stripe || !ENV.stripeEnabled) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Payments are not configured yet." });
  }
  return stripe;
}

async function getPaidCourse(courseId: number) {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
  const [course] = await db.select().from(courses).where(and(eq(courses.id, courseId), eq(courses.isPublished, true))).limit(1);
  if (!course || !course.isPremium || course.price <= 0) {
    throw new TRPCError({ code: "NOT_FOUND", message: "This paid programme is not available." });
  }
  if (course.currency.toLowerCase() !== "gbp") {
    throw new TRPCError({ code: "BAD_REQUEST", message: "This programme is not available for GBP checkout." });
  }
  return { db, course };
}

export const paymentsRouter = router({
  checkoutDetails: protectedProcedure.input(courseInput).query(async ({ input }) => {
    const { course } = await getPaidCourse(input.courseId);
    return { id: course.id, title: course.title, description: course.description, amount: course.price, currency: course.currency };
  }),

  createCheckout: protectedProcedure
    .input(courseInput.extend({ checkoutRequestId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const stripeClient = requirePayments();
      const { db, course } = await getPaidCourse(input.courseId);
      if (!ctx.user.email) throw new TRPCError({ code: "BAD_REQUEST", message: "Add an email address to your profile before paying." });
      const [enrollment] = await db.select({ id: enrollments.id }).from(enrollments).where(and(
        eq(enrollments.userId, ctx.user.id), eq(enrollments.courseId, course.id),
      )).limit(1);
      if (enrollment) throw new TRPCError({ code: "CONFLICT", message: "You are already enrolled in this programme." });

      const [existing] = await db.select().from(orders).where(and(
        eq(orders.checkoutRequestId, input.checkoutRequestId),
        eq(orders.userId, ctx.user.id),
      )).limit(1);
      if (existing?.stripeCheckoutSessionId) {
        const oldSession = await stripeClient.checkout.sessions.retrieve(existing.stripeCheckoutSessionId);
        if (oldSession.url && oldSession.status === "open") return { url: oldSession.url };
      }

      const orderId = existing?.id ?? nanoid(24);
      if (!existing) {
        await db.insert(orders).values({
          id: orderId,
          checkoutRequestId: input.checkoutRequestId,
          userId: ctx.user.id,
          courseId: course.id,
          subtotal: course.price,
          discount: 0,
          total: course.price,
          currency: course.currency.toLowerCase(),
          customerName: ctx.user.name,
          customerEmail: ctx.user.email,
        });
      }

      const session = await stripeClient.checkout.sessions.create({
        mode: "payment",
        line_items: [{
          price_data: {
            currency: course.currency.toLowerCase(),
            unit_amount: course.price,
            product_data: { name: course.title, description: course.description || undefined },
          },
          quantity: 1,
        }],
        customer_email: ctx.user.email,
        client_reference_id: String(ctx.user.id),
        success_url: `${ENV.appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${ENV.appUrl}/payment/cancelled?courseId=${course.id}`,
        metadata: { order_id: orderId, user_id: String(ctx.user.id), course_id: String(course.id) },
        payment_intent_data: { metadata: { order_id: orderId, user_id: String(ctx.user.id), course_id: String(course.id) } },
      }, { idempotencyKey: `checkout_${orderId}` });

      await db.update(orders).set({ stripeCheckoutSessionId: session.id }).where(eq(orders.id, orderId));
      console.info("[payments] checkout_session_created", { orderId, courseId: course.id, userId: ctx.user.id, stripeSessionId: session.id });
      if (!session.url) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe did not return a checkout URL." });
      return { url: session.url };
    }),

  orderStatus: protectedProcedure
    .input(z.object({ sessionId: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
      const [row] = await db.select({
        id: orders.id,
        status: orders.paymentStatus,
        amount: orders.total,
        paidAmount: orders.paidAmount,
        currency: orders.currency,
        courseId: orders.courseId,
        title: courses.title,
      }).from(orders).innerJoin(courses, eq(orders.courseId, courses.id)).where(and(
        eq(orders.stripeCheckoutSessionId, input.sessionId),
        eq(orders.userId, ctx.user.id),
      )).limit(1);
      if (!row) throw new TRPCError({ code: "NOT_FOUND", message: "Payment not found." });
      return row;
    }),
});
