import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(resolve("drizzle/0012_secure_stripe_checkout.sql"), "utf8");

describe("payment database migration", () => {
  it("creates authoritative integer payment records and event deduplication", () => {
    expect(migration).toContain("CREATE TABLE `orders`");
    expect(migration).toContain("CREATE TABLE `stripe_webhook_events`");
    expect(migration).toContain("`total` int NOT NULL");
    expect(migration).toContain("`currency` varchar(3) NOT NULL DEFAULT 'gbp'");
    expect(migration).not.toMatch(/`total` (decimal|float|double)/i);
  });

  it("contains idempotency, enrolment uniqueness, indexes, and foreign keys", () => {
    expect(migration).toContain("orders_checkoutRequestId_unique");
    expect(migration).toContain("orders_stripeCheckoutSessionId_unique");
    expect(migration).toContain("enrollments_user_course_unique");
    expect(migration).toContain("FOREIGN KEY (`userId`) REFERENCES `users`(`id`)");
    expect(migration).toContain("FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`)");
    expect(migration).toContain("orders_payment_intent_idx");
  });
});
