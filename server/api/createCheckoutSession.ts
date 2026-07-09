import type { Request, Response } from "express";
import { stripe } from "../stripe";

/**
 * POST /api/create-checkout-session
 * Accepts: { email, firstName, lastName, phone?, country?, currency? ("GBP" | "USD"), priceId? }
 * Creates a Stripe Checkout session for the AI Masterclass and returns
 * { sessionId, url }. The client redirects the browser to `url`.
 *
 * Price IDs are read from environment variables so the client can never
 * charge an arbitrary price:
 *   NEXT_PUBLIC_STRIPE_PRICE_GBP — £50 (United Kingdom)
 *   NEXT_PUBLIC_STRIPE_PRICE_USD — $50 (All Other Regions)
 */
export async function createCheckoutSessionHandler(req: Request, res: Response) {
  try {
    if (!stripe) {
      res.status(500).json({ error: "Payment is not configured yet. Please contact hello@upskillintech.com to reserve your seat." });
      return;
    }

    const { email, firstName, lastName, phone, country, currency, priceId } = req.body ?? {};

    if (!email || !firstName || !lastName) {
      res.status(400).json({ error: "email, firstName, and lastName are required." });
      return;
    }

    const priceGbp = process.env.NEXT_PUBLIC_STRIPE_PRICE_GBP;
    const priceUsd = process.env.NEXT_PUBLIC_STRIPE_PRICE_USD;

    // Resolve the price server-side; a client-supplied priceId is only
    // accepted when it matches one of the configured prices.
    let resolvedPriceId: string | undefined;
    if (priceId && [priceGbp, priceUsd].includes(priceId)) {
      resolvedPriceId = priceId;
    } else if (currency === "USD") {
      resolvedPriceId = priceUsd;
    } else if (currency === "GBP") {
      resolvedPriceId = priceGbp;
    }

    if (!resolvedPriceId) {
      res.status(500).json({ error: "Masterclass pricing is not configured. Please contact us directly." });
      return;
    }

    const origin =
      req.headers.origin ||
      (req.headers.host ? `https://${req.headers.host}` : "http://localhost:3000");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: resolvedPriceId, quantity: 1 }],
      customer_email: email,
      success_url: `${origin}/masterclass/success`,
      cancel_url: `${origin}/masterclass#register`,
      allow_promotion_codes: true,
      metadata: {
        product: "masterclass_august_2026",
        first_name: String(firstName),
        last_name: String(lastName),
        phone: phone ? String(phone) : "",
        country: country ? String(country) : "",
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("create-checkout-session failed:", err);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
}
