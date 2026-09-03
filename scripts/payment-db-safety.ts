export function requireLocalDevelopmentDatabase() {
  if (process.env.NODE_ENV === "production") throw new Error("Payment development tooling cannot run with NODE_ENV=production.");
  const value = process.env.DATABASE_URL;
  if (!value) throw new Error("DATABASE_URL is required.");
  const url = new URL(value);
  if (url.protocol !== "mysql:") throw new Error("DATABASE_URL must use the mysql protocol.");
  if (!["127.0.0.1", "localhost"].includes(url.hostname)) {
    throw new Error(`Refusing to modify a non-local database host: ${url.hostname}`);
  }
  return value;
}
