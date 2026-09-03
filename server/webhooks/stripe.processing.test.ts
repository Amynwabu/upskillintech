import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  selectResults: [] as any[][],
  updates: [] as any[],
  inserts: [] as any[],
  paymentIntentRetrieve: vi.fn(),
}));

const tx = {
  select: vi.fn(() => ({ from: () => ({ where: () => ({ limit: async () => mocks.selectResults.shift() ?? [] }) }) })),
  update: vi.fn((table: unknown) => ({ set: (values: unknown) => ({ where: async () => { mocks.updates.push({ table, values }); } }) })),
  insert: vi.fn((table: unknown) => ({ values: async (values: unknown) => { mocks.inserts.push({ table, values }); } })),
};
const db = { transaction: async (callback: (transaction: typeof tx) => unknown) => callback(tx) };

vi.mock("../db", () => ({ getDb: async () => db }));
vi.mock("../stripe", () => ({ stripe: { paymentIntents: { retrieve: mocks.paymentIntentRetrieve } } }));
vi.mock("../_core/env", () => ({ ENV: { stripeEnabled: true, stripeWebhookSecret: "whsec_test" } }));

import { cancelExpiredSession, processPaidSession, processRefund, updateByPaymentIntent } from "./stripe";

const order = { id: "order_1", userId: 10, courseId: 20, total: 69900, currency: "gbp", paymentStatus: "pending" };
const session = (overrides: Record<string, unknown> = {}) => ({
  id: "cs_test_1",
  metadata: { order_id: "order_1" },
  payment_intent: "pi_test_1",
  customer: "cus_test_1",
  payment_status: "paid",
  amount_total: 69900,
  currency: "gbp",
  ...overrides,
} as any);
const event = (id: string, type = "checkout.session.completed") => ({ id, type, data: { object: {} } } as any);

describe("Stripe webhook order processing", () => {
  beforeEach(() => {
    mocks.selectResults.length = 0;
    mocks.updates.length = 0;
    mocks.inserts.length = 0;
    mocks.paymentIntentRetrieve.mockReset().mockResolvedValue({ payment_method: { type: "card" } });
  });

  it("marks a matching payment paid and creates one enrolment", async () => {
    mocks.selectResults.push([], [order], []);
    await processPaidSession(session(), event("evt_paid"));
    expect(mocks.updates[0].values).toMatchObject({ paymentStatus: "paid", paidAmount: 69900, paymentMethod: "card" });
    expect(mocks.inserts.some(entry => entry.values.userId === 10 && entry.values.courseId === 20)).toBe(true);
  });

  it("does not enrol while an asynchronous payment is processing", async () => {
    mocks.selectResults.push([], [order]);
    await processPaidSession(session({ payment_status: "unpaid" }), event("evt_processing"));
    expect(mocks.updates[0].values.paymentStatus).toBe("processing");
    expect(mocks.inserts.some(entry => entry.values.userId === 10)).toBe(false);
  });

  it("fulfils an asynchronous success from processing", async () => {
    mocks.selectResults.push([], [{ ...order, paymentStatus: "processing" }], []);
    await processPaidSession(session(), event("evt_async_paid", "checkout.session.async_payment_succeeded"));
    expect(mocks.updates[0].values.paymentStatus).toBe("paid");
    expect(mocks.inserts.some(entry => entry.values.courseId === 20)).toBe(true);
  });

  it("handles failure without enrolment", async () => {
    mocks.selectResults.push([], [{ ...order, paymentStatus: "processing" }]);
    await updateByPaymentIntent({ id: "pi_test_1", metadata: { order_id: "order_1" } } as any, "failed", event("evt_failed"));
    expect(mocks.updates[0].values.paymentStatus).toBe("failed");
    expect(mocks.inserts.some(entry => entry.values.userId === 10)).toBe(false);
  });

  it("cancels an expired pending Checkout Session", async () => {
    mocks.selectResults.push([], [order]);
    await cancelExpiredSession(session(), event("evt_expired", "checkout.session.expired"));
    expect(mocks.updates[0].values.paymentStatus).toBe("cancelled");
  });

  it("acknowledges duplicate events without repeating side effects", async () => {
    mocks.selectResults.push([{ id: "evt_duplicate" }]);
    await processPaidSession(session(), event("evt_duplicate"));
    expect(mocks.updates).toHaveLength(0);
    expect(mocks.inserts).toHaveLength(0);
  });

  it("blocks amount and currency mismatches", async () => {
    mocks.selectResults.push([], [order]);
    await expect(processPaidSession(session({ amount_total: 1 }), event("evt_bad_amount"))).rejects.toThrow("Amount mismatch");
    expect(mocks.updates).toHaveLength(0);
    mocks.selectResults.push([], [order]);
    await expect(processPaidSession(session({ currency: "usd" }), event("evt_bad_currency"))).rejects.toThrow("Currency mismatch");
    expect(mocks.updates).toHaveLength(0);
  });

  it("persists partial and full refund totals", async () => {
    mocks.selectResults.push([], [{ ...order, paymentStatus: "paid", stripePaymentIntentId: "pi_test_1" }]);
    await processRefund({ payment_intent: "pi_test_1", amount: 69900, amount_refunded: 10000 } as any, event("evt_partial", "charge.refunded"));
    expect(mocks.updates[0].values).toMatchObject({ paymentStatus: "partially_refunded", refundedAmount: 10000 });
    mocks.updates.length = 0;
    mocks.selectResults.push([], [{ ...order, paymentStatus: "partially_refunded", stripePaymentIntentId: "pi_test_1" }]);
    await processRefund({ payment_intent: "pi_test_1", amount: 69900, amount_refunded: 69900 } as any, event("evt_refund", "charge.refunded"));
    expect(mocks.updates[0].values).toMatchObject({ paymentStatus: "refunded", refundedAmount: 69900 });
  });

  it("does not regress a terminal order to paid", async () => {
    mocks.selectResults.push([], [{ ...order, paymentStatus: "refunded" }]);
    await processPaidSession(session(), event("evt_late_paid"));
    expect(mocks.updates).toHaveLength(0);
  });
});
