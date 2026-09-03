import "dotenv/config";

function main() {
  const secret = process.env.STRIPE_SECRET_KEY ?? "";
  if (!secret) throw new Error("STRIPE TEST SECRET REQUIRED");
  if (secret.startsWith("sk_live_")) throw new Error("Live Stripe keys are forbidden during test-mode validation.");
  if (!secret.startsWith("sk_test_")) throw new Error("STRIPE_SECRET_KEY must be a Stripe test-mode secret (sk_test_...).");
  if (process.env.STRIPE_ENABLED !== "true") throw new Error("STRIPE_ENABLED must be true for test-mode validation.");
  if (!(process.env.STRIPE_WEBHOOK_SECRET ?? "").startsWith("whsec_")) throw new Error("A Stripe CLI/test webhook signing secret is required.");
  if (!process.env.APP_URL) throw new Error("APP_URL is required.");
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");
  console.log("Stripe test environment variables are present and test-mode scoped.");
}

try { main(); } catch (error) { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; }
