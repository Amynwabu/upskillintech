import type { Order } from "../../drizzle/schema";

export type PaymentStatus = Order["paymentStatus"];

const allowedTransitions: Record<PaymentStatus, readonly PaymentStatus[]> = {
  pending: ["processing", "paid", "failed", "cancelled"],
  processing: ["paid", "failed", "cancelled"],
  paid: ["partially_refunded", "refunded"],
  partially_refunded: ["partially_refunded", "refunded"],
  failed: [],
  cancelled: [],
  refunded: [],
};

export function canTransitionPayment(from: PaymentStatus, to: PaymentStatus) {
  return from === to || allowedTransitions[from].includes(to);
}

export function assertPaymentTransition(from: PaymentStatus, to: PaymentStatus) {
  if (!canTransitionPayment(from, to)) throw new Error(`Invalid payment transition: ${from} -> ${to}`);
}
