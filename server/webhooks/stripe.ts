import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../stripe";
import { ENV } from "../_core/env";
import { getDb } from "../db";
// import { orders } from "../../drizzle/schema"; // DEPRECATED - Marketplace removed

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error("[Stripe Webhook] No signature found");
    return res.status(400).send("No signature");
  }

  if (!stripe) {
    console.error("[Stripe Webhook] Stripe not configured");
    return res.status(400).send("Stripe not configured");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      ENV.stripeWebhookSecret!
    );
  } catch (err: any) {
    console.error(`[Stripe Webhook] Signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Stripe Webhook] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  console.log(`[Stripe Webhook] Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe] Payment succeeded: ${paymentIntent.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe] Payment failed: ${paymentIntent.id}`);
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error(`[Stripe Webhook] Error processing event:`, error);
    res.status(500).send("Webhook processing error");
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id;
  
  if (!userId) {
    console.error("[Stripe] No user_id in checkout session metadata");
    return;
  }

  const db = await getDb();
  if (!db) {
    console.error("[Stripe] Database not available");
    return;
  }

  // DEPRECATED - Marketplace removed, orders table no longer exists
  // If you need payment processing for courses or other features,
  // implement course-specific payment handling here
  console.log(`[Stripe] Checkout completed for user ${userId}, session ${session.id}`);
  console.log(`[Stripe] Payment amount: ${session.amount_total}`);
  
  // TODO: Implement course enrollment or other payment-related logic here
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const db = await getDb();
  if (!db) return;

  // Update order status to failed if exists
  console.log(`[Stripe] Payment failed for intent: ${paymentIntent.id}`);
}
