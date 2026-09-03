import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  selectResults: [] as any[][],
  sessionCreate: vi.fn(),
  sessionRetrieve: vi.fn(),
  inserted: [] as any[],
  updated: [] as any[],
}));

function selectChain(): any {
  const chain: any = { innerJoin: () => chain, where: () => chain, limit: async () => mocks.selectResults.shift() ?? [] };
  return chain;
}
const fakeDb = {
  select: vi.fn(() => ({ from: () => selectChain() })),
  insert: vi.fn((table: unknown) => ({ values: async (values: unknown) => { mocks.inserted.push({ table, values }); } })),
  update: vi.fn((table: unknown) => ({ set: (values: unknown) => ({ where: async () => { mocks.updated.push({ table, values }); } }) })),
};

vi.mock("../db", () => ({ getDb: async () => fakeDb }));
vi.mock("../stripe", () => ({ stripe: { checkout: { sessions: { create: mocks.sessionCreate, retrieve: mocks.sessionRetrieve } } } }));
vi.mock("../_core/env", () => ({ ENV: { stripeEnabled: true, appUrl: "http://localhost:3000" } }));

import { paymentsRouter } from "./payments";

const paidCourse = { id: 7, title: "AI Automation Masterclass", description: "Test", price: 69900, currency: "gbp", isPremium: true, isPublished: true };
const user = { id: 11, email: "buyer@example.com", name: "Test Buyer", role: "user" } as any;
const caller = (currentUser: any = user) => paymentsRouter.createCaller({ user: currentUser, req: {} as any, res: {} as any });

describe("payment checkout", () => {
  beforeEach(() => {
    mocks.selectResults.length = 0;
    mocks.inserted.length = 0;
    mocks.updated.length = 0;
    mocks.sessionCreate.mockReset().mockResolvedValue({ id: "cs_test_1", url: "https://checkout.stripe.test/session" });
    mocks.sessionRetrieve.mockReset();
  });

  it("requires authentication", async () => {
    await expect(caller(null).checkoutDetails({ courseId: 7 })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects an invalid, free, or unpublished course", async () => {
    mocks.selectResults.push([]);
    await expect(caller().checkoutDetails({ courseId: 999 })).rejects.toMatchObject({ code: "NOT_FOUND" });
    mocks.selectResults.push([{ ...paidCourse, price: 0, isPremium: false }]);
    await expect(caller().checkoutDetails({ courseId: 7 })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("rejects an unsupported checkout currency", async () => {
    mocks.selectResults.push([{ ...paidCourse, currency: "usd" }]);
    await expect(caller().checkoutDetails({ courseId: 7 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects an already-enrolled user", async () => {
    mocks.selectResults.push([paidCourse], [{ id: 5 }]);
    await expect(caller().createCheckout({ courseId: 7, checkoutRequestId: crypto.randomUUID() })).rejects.toMatchObject({ code: "CONFLICT" });
    expect(mocks.sessionCreate).not.toHaveBeenCalled();
  });

  it("uses the server course price and GBP, ignoring extra browser fields", async () => {
    mocks.selectResults.push([paidCourse], [], []);
    await caller().createCheckout({ courseId: 7, checkoutRequestId: crypto.randomUUID(), amount: 1, currency: "usd" } as any);
    const params = mocks.sessionCreate.mock.calls[0][0];
    expect(params.line_items[0].price_data).toMatchObject({ unit_amount: 69900, currency: "gbp" });
    expect(params.line_items[0].price_data.product_data.name).toBe("AI Automation Masterclass");
    expect(mocks.inserted[0].values).toMatchObject({ total: 69900, currency: "gbp", courseId: 7, userId: 11 });
  });

  it("reuses the same open Stripe session for a repeated request ID", async () => {
    const requestId = crypto.randomUUID();
    mocks.selectResults.push([paidCourse], [], [{ id: "order_existing", checkoutRequestId: requestId, userId: 11, stripeCheckoutSessionId: "cs_existing" }]);
    mocks.sessionRetrieve.mockResolvedValue({ id: "cs_existing", status: "open", url: "https://checkout.stripe.test/existing" });
    await expect(caller().createCheckout({ courseId: 7, checkoutRequestId: requestId })).resolves.toEqual({ url: "https://checkout.stripe.test/existing" });
    expect(mocks.sessionCreate).not.toHaveBeenCalled();
  });

  it("does not expose another user's order by session ID", async () => {
    mocks.selectResults.push([]);
    await expect(caller().orderStatus({ sessionId: "cs_belongs_to_someone_else" })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
