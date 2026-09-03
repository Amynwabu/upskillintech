import { describe, expect, it } from "vitest";
import Stripe from "stripe";
import { verifyStripeSignature } from "./verifyStripeSignature";

const stripe = new Stripe("sk_test_placeholder");
const secret = "whsec_test_secret";
const payload = JSON.stringify({ id: "evt_test", type: "checkout.session.completed", data: { object: {} } });

describe("Stripe webhook signature verification", () => {
  it("accepts a valid Stripe test signature", () => {
    const signature = stripe.webhooks.generateTestHeaderString({ payload, secret });
    expect(verifyStripeSignature(stripe, payload, signature, secret)).toMatchObject({ id: "evt_test" });
  });

  it("rejects an invalid signature", () => {
    expect(() => verifyStripeSignature(stripe, payload, "t=1,v1=invalid", secret)).toThrow();
  });

  it("rejects a missing signature", () => {
    expect(() => verifyStripeSignature(stripe, payload, undefined, secret)).toThrow("Missing Stripe signature");
  });

  it("rejects a malformed body even with a signature for another payload", () => {
    const signature = stripe.webhooks.generateTestHeaderString({ payload, secret });
    expect(() => verifyStripeSignature(stripe, "not-json", signature, secret)).toThrow();
  });
});
