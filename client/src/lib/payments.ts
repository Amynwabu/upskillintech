export const PAYMENT_BRAND = {
  black: "#0b0d0c",
  charcoal: "#171a18",
  green: "#859d30",
  greenDark: "#6f8528",
  white: "#ffffff",
  border: "#e5e7eb",
} as const;

export function formatMoney(amount: number, currency = "gbp") {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}
