import { describe, expect, it } from "vitest";
import { canTransitionPayment } from "./state";

describe("payment state transitions", () => {
  it("allows the supported payment lifecycle", () => {
    expect(canTransitionPayment("pending", "processing")).toBe(true);
    expect(canTransitionPayment("processing", "paid")).toBe(true);
    expect(canTransitionPayment("paid", "partially_refunded")).toBe(true);
    expect(canTransitionPayment("partially_refunded", "refunded")).toBe(true);
    expect(canTransitionPayment("pending", "failed")).toBe(true);
    expect(canTransitionPayment("pending", "cancelled")).toBe(true);
  });

  it("blocks terminal-state regression", () => {
    expect(canTransitionPayment("refunded", "paid")).toBe(false);
    expect(canTransitionPayment("failed", "processing")).toBe(false);
    expect(canTransitionPayment("cancelled", "paid")).toBe(false);
    expect(canTransitionPayment("paid", "failed")).toBe(false);
  });
});
