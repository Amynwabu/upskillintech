import type Stripe from "stripe";

export function verifyStripeSignature(
  client: Stripe,
  payload: Buffer | string,
  signature: string | string[] | undefined,
  webhookSecret: string,
) {
  if (!signature) throw new Error("Missing Stripe signature");
  return client.webhooks.constructEvent(payload, signature, webhookSecret);
}
