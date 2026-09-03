import "dotenv/config";
import express from "express";
import serverless from "serverless-http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../../server/_core/oauth";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";
import { handleStripeWebhook } from "../../server/webhooks/stripe";

const app = express();

app.use((req, _res, next) => {
  const functionPrefix = "/.netlify/functions/api";

  if (req.url.startsWith(functionPrefix)) {
    req.url = req.url.slice(functionPrefix.length) || "/";
  }

  if (req.url.startsWith("/trpc") || req.url.startsWith("/oauth")) {
    req.url = `/api${req.url}`;
  }

  next();
});

app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), handleStripeWebhook);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerOAuthRoutes(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "upskillintech-netlify-api" });
});

export const handler = serverless(app);
