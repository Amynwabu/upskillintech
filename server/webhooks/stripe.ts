import { and, eq } from "drizzle-orm";
import type { Request, Response } from "express";
import type Stripe from "stripe";
import { enrollments, orders, stripeWebhookEvents } from "../../drizzle/schema";
import { ENV } from "../_core/env";
import { getDb } from "../db";
import { stripe } from "../stripe";
import { canTransitionPayment, type PaymentStatus } from "../payments/state";
import { verifyStripeSignature } from "./verifyStripeSignature";

function logPayment(action: string, details: Record<string, unknown>) {
  console.info(`[payments] ${action}`, details);
}

function objectId(value: string | { id: string } | null): string | null {
  return typeof value === "string" ? value : value?.id ?? null;
}

async function paymentMethodType(paymentIntentId: string | null) {
  if (!stripe || !paymentIntentId) return null;
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId, { expand: ["payment_method"] });
  return typeof intent.payment_method === "object" && intent.payment_method ? intent.payment_method.type : null;
}

export async function processPaidSession(session: Stripe.Checkout.Session, event: Stripe.Event) {
  const orderId = session.metadata?.order_id;
  if (!orderId) throw new Error("Stripe session is missing order_id metadata");
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const paymentIntentId = objectId(session.payment_intent);
  const method = await paymentMethodType(paymentIntentId);

  await db.transaction(async tx => {
    const seen = await tx.select({ id: stripeWebhookEvents.id }).from(stripeWebhookEvents).where(eq(stripeWebhookEvents.id, event.id)).limit(1);
    if (seen.length) {
      logPayment("webhook_duplicate", { stripeEventId: event.id, orderId });
      return;
    }
    const [order] = await tx.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (!order) throw new Error(`Unknown order ${orderId}`);
    if (session.currency !== order.currency) {
      console.error("[payments] currency_mismatch", { orderId, stripeEventId: event.id, expectedCurrency: order.currency, receivedCurrency: session.currency });
      throw new Error(`Currency mismatch for order ${orderId}`);
    }
    if (session.amount_total !== order.total) {
      console.error("[payments] amount_mismatch", { orderId, stripeEventId: event.id, expectedAmount: order.total, receivedAmount: session.amount_total });
      throw new Error(`Amount mismatch for order ${orderId}`);
    }

    const paid = session.payment_status === "paid";
    const targetStatus: PaymentStatus = paid ? "paid" : "processing";
    if (!canTransitionPayment(order.paymentStatus, targetStatus)) {
      logPayment("transition_ignored", { orderId, stripeEventId: event.id, from: order.paymentStatus, to: targetStatus });
      await tx.insert(stripeWebhookEvents).values({ id: event.id, type: event.type });
      return;
    }
    await tx.update(orders).set({
      paymentStatus: targetStatus,
      stripeCustomerId: objectId(session.customer),
      stripePaymentIntentId: paymentIntentId,
      paymentMethod: method,
      paidAmount: paid ? session.amount_total : null,
      paidAt: paid ? new Date() : null,
    }).where(eq(orders.id, orderId));

    if (paid) {
      const enrolled = await tx.select({ id: enrollments.id }).from(enrollments).where(and(eq(enrollments.userId, order.userId), eq(enrollments.courseId, order.courseId))).limit(1);
      if (!enrolled.length) {
        await tx.insert(enrollments).values({ userId: order.userId, courseId: order.courseId });
        logPayment("enrollment_created", { orderId, courseId: order.courseId, userId: order.userId, stripeEventId: event.id });
      }
    }
    await tx.insert(stripeWebhookEvents).values({ id: event.id, type: event.type });
    logPayment(paid ? "order_paid" : "order_processing", { orderId, courseId: order.courseId, userId: order.userId, stripeEventId: event.id, stripeSessionId: session.id });
  });
}

export async function updateByPaymentIntent(intent: Stripe.PaymentIntent, status: "failed" | "processing", event: Stripe.Event) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const orderId = intent.metadata.order_id;
  if (!orderId) return;
  await db.transaction(async tx => {
    const seen = await tx.select({ id: stripeWebhookEvents.id }).from(stripeWebhookEvents).where(eq(stripeWebhookEvents.id, event.id)).limit(1);
    if (seen.length) {
      logPayment("webhook_duplicate", { stripeEventId: event.id, orderId });
      return;
    }
    const [order] = await tx.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (!order || !canTransitionPayment(order.paymentStatus, status)) {
      await tx.insert(stripeWebhookEvents).values({ id: event.id, type: event.type });
      return;
    }
    await tx.update(orders).set({ paymentStatus: status, stripePaymentIntentId: intent.id }).where(eq(orders.id, orderId));
    await tx.insert(stripeWebhookEvents).values({ id: event.id, type: event.type });
    logPayment(status === "failed" ? "order_failed" : "order_processing", { orderId, stripeEventId: event.id, stripePaymentIntentId: intent.id });
  });
}

export async function cancelExpiredSession(session: Stripe.Checkout.Session, event: Stripe.Event) {
  const db = await getDb();
  const orderId = session.metadata?.order_id;
  if (!db || !orderId) return;
  await db.transaction(async tx => {
    const seen = await tx.select({ id: stripeWebhookEvents.id }).from(stripeWebhookEvents).where(eq(stripeWebhookEvents.id, event.id)).limit(1);
    if (seen.length) {
      logPayment("webhook_duplicate", { stripeEventId: event.id, orderId });
      return;
    }
    const [order] = await tx.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (order && canTransitionPayment(order.paymentStatus, "cancelled")) {
      await tx.update(orders).set({ paymentStatus: "cancelled" }).where(eq(orders.id, orderId));
      logPayment("order_cancelled", { orderId, stripeEventId: event.id, stripeSessionId: session.id });
    }
    await tx.insert(stripeWebhookEvents).values({ id: event.id, type: event.type });
  });
}

export async function processRefund(charge: Stripe.Charge, event: Stripe.Event) {
  const db = await getDb();
  const paymentIntentId = objectId(charge.payment_intent);
  if (!db || !paymentIntentId) return;
  await db.transaction(async tx => {
    const seen = await tx.select({ id: stripeWebhookEvents.id }).from(stripeWebhookEvents).where(eq(stripeWebhookEvents.id, event.id)).limit(1);
    if (seen.length) {
      logPayment("webhook_duplicate", { stripeEventId: event.id, stripePaymentIntentId: paymentIntentId });
      return;
    }
    const status = charge.amount_refunded >= charge.amount ? "refunded" : "partially_refunded";
    const [order] = await tx.select().from(orders).where(eq(orders.stripePaymentIntentId, paymentIntentId)).limit(1);
    if (order && canTransitionPayment(order.paymentStatus, status)) {
      await tx.update(orders).set({ paymentStatus: status, refundedAmount: charge.amount_refunded }).where(eq(orders.id, order.id));
      logPayment("refund_received", { orderId: order.id, stripeEventId: event.id, refundedAmount: charge.amount_refunded, status });
    }
    await tx.insert(stripeWebhookEvents).values({ id: event.id, type: event.type });
  });
}

export async function handleStripeWebhook(req: Request, res: Response) {
  if (!ENV.stripeEnabled || !stripe || !ENV.stripeWebhookSecret) return res.status(503).send("Stripe webhook is not configured");
  const signature = req.headers["stripe-signature"];
  let event: Stripe.Event;
  try {
    event = verifyStripeSignature(stripe, req.body, signature, ENV.stripeWebhookSecret);
  } catch (error) {
    return res.status(400).send(`Webhook signature verification failed: ${error instanceof Error ? error.message : "unknown error"}`);
  }

  logPayment("webhook_received", { stripeEventId: event.id, stripeEventType: event.type });

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await processPaidSession(event.data.object as Stripe.Checkout.Session, event);
        break;
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const intentId = objectId(session.payment_intent);
        if (intentId) await updateByPaymentIntent(await stripe.paymentIntents.retrieve(intentId), "failed", event);
        break;
      }
      case "checkout.session.expired":
        await cancelExpiredSession(event.data.object as Stripe.Checkout.Session, event);
        break;
      case "payment_intent.processing":
        await updateByPaymentIntent(event.data.object as Stripe.PaymentIntent, "processing", event);
        break;
      case "payment_intent.payment_failed":
      case "payment_intent.canceled":
        await updateByPaymentIntent(event.data.object as Stripe.PaymentIntent, "failed", event);
        break;
      case "charge.refunded":
        await processRefund(event.data.object as Stripe.Charge, event);
        break;
      default:
        break;
    }
    return res.json({ received: true });
  } catch (error) {
    console.error("[Stripe webhook] Processing failed", error);
    return res.status(500).send("Webhook processing failed");
  }
}
