import Stripe from "stripe";
import { ENV } from "./_core/env";

export const stripe = ENV.stripeSecretKey
  ? new Stripe(ENV.stripeSecretKey, {
      apiVersion: "2025-11-17.clover",
    })
  : null;

function ensureStripe() {
  if (!stripe) {
    throw new Error("Stripe is not configured. Please add STRIPE_SECRET_KEY in Settings → Payment.");
  }
  return stripe;
}

/**
 * Create a checkout session for purchasing products
 */
export async function createCheckoutSession(params: {
  userId: number;
  userEmail: string;
  userName?: string;
  items: Array<{ priceId: string; quantity: number }>;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const stripeClient = ensureStripe();
  const session = await stripeClient.checkout.sessions.create({
    mode: "payment",
    line_items: params.items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.userEmail,
    client_reference_id: params.userId.toString(),
    allow_promotion_codes: true,
    metadata: {
      user_id: params.userId.toString(),
      customer_email: params.userEmail,
      customer_name: params.userName || "",
      ...params.metadata,
    },
  });

  return session;
}

/**
 * Create a subscription checkout session
 */
export async function createSubscriptionSession(params: {
  userId: number;
  userEmail: string;
  userName?: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const stripeClient = ensureStripe();
  const session = await stripeClient.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.userEmail,
    client_reference_id: params.userId.toString(),
    allow_promotion_codes: true,
    metadata: {
      user_id: params.userId.toString(),
      customer_email: params.userEmail,
      customer_name: params.userName || "",
      ...params.metadata,
    },
  });

  return session;
}

/**
 * Retrieve a customer's payment history
 */
export async function getCustomerPayments(customerId: string) {
  const stripeClient = ensureStripe();
  const paymentIntents = await stripeClient.paymentIntents.list({
    customer: customerId,
    limit: 100,
  });

  return paymentIntents.data;
}

/**
 * Get product and price information
 */
export async function getProductInfo(productId: string) {
  const stripeClient = ensureStripe();
  const product = await stripeClient.products.retrieve(productId);
  return product;
}

export async function getPriceInfo(priceId: string) {
  const stripeClient = ensureStripe();
  const price = await stripeClient.prices.retrieve(priceId);
  return price;
}
