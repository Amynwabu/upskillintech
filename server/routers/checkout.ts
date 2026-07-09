import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { stripe } from "../stripe";

const MASTERCLASS_PRICE_ID = process.env.STRIPE_MASTERCLASS_PRICE_ID;

export const checkoutRouter = router({
  masterclass: publicProcedure.mutation(async ({ ctx }) => {
    if (!stripe) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Payment is not configured yet. Please contact us at amaka.adiuku@gmail.com to reserve your seat.",
      });
    }
    if (!MASTERCLASS_PRICE_ID) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Masterclass pricing is not configured. Please contact us directly.",
      });
    }

    const origin = ctx.req.headers.origin || ctx.req.headers.host
      ? `https://${ctx.req.headers.host}`
      : "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: MASTERCLASS_PRICE_ID, quantity: 1 }],
      success_url: `${origin}/masterclass/success`,
      cancel_url: `${origin}/masterclass`,
      allow_promotion_codes: true,
      metadata: { product: "masterclass_august_2026" },
    });

    if (!session.url) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session." });
    }

    return { url: session.url };
  }),
});
