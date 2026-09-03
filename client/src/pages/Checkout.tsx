import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/payments";
import { trpc } from "@/lib/trpc";
import { Check, CreditCard, LockKeyhole } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const courseId = Number(new URLSearchParams(window.location.search).get("courseId"));
  const requestId = useRef(crypto.randomUUID());
  const details = trpc.payments.checkoutDetails.useQuery({ courseId }, { enabled: Number.isInteger(courseId) && courseId > 0 });
  const checkout = trpc.payments.createCheckout.useMutation({
    onSuccess: ({ url }) => window.location.assign(url),
    onError: error => toast.error(error.message),
  });

  const item = details.data;
  const total = item ? formatMoney(item.amount, item.currency) : "";

  return <div className="min-h-screen bg-[#f6f7f4] text-[#0b0d0c]">
    <Navbar />
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-28 sm:px-6">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6f8528]">Secure checkout</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>
      </div>

      {details.isLoading && <div className="rounded-xl border border-[#e5e7eb] bg-white p-8" role="status">Loading your order…</div>}
      {details.error && <div className="rounded-xl border border-red-200 bg-white p-8 text-red-700" role="alert">{details.error.message}</div>}
      {item && <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <section className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm sm:p-7" aria-labelledby="payment-heading">
          <h2 id="payment-heading" className="text-xl font-bold">Choose how you would like to pay</h2>
          <p className="mt-2 text-sm leading-6 text-[#555b57]">Stripe will show the payment methods available for your device, location, and this purchase.</p>
          <div className="mt-6 rounded-lg border-2 border-[#859d30] bg-[#f7f9f1] p-5">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#859d30] text-white" aria-hidden="true"><Check size={15} strokeWidth={3} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">Secure payment with Stripe</h3>
                  <CreditCard className="shrink-0 text-[#171a18]" aria-hidden="true" />
                </div>
                <p className="mt-2 text-sm leading-6 text-[#555b57]">Stripe will show only the cards, wallets, or flexible-payment methods enabled and eligible for this purchase.</p>
              </div>
            </div>
          </div>
          <Button
            className="mt-6 min-h-12 w-full bg-[#859d30] text-base font-semibold text-white hover:bg-[#6f8528] focus-visible:ring-[#859d30]"
            disabled={checkout.isPending}
            onClick={() => checkout.mutate({ courseId, checkoutRequestId: requestId.current })}
          >
            {checkout.isPending ? "Processing payment…" : `Pay ${total} securely`}
          </Button>
          <div className="mt-4 flex items-start gap-2 text-sm leading-5 text-[#555b57]"><LockKeyhole size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><p>Secure payment powered by Stripe. Your payment details are handled by Stripe and never stored by UpskillinTech.</p></div>
        </section>

        <aside className="h-fit rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm sm:p-7" aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="text-xl font-bold">Order summary</h2>
          <div className="mt-6 border-b border-[#e5e7eb] pb-5"><h3 className="font-semibold">{item.title}</h3>{item.description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#555b57]">{item.description}</p>}</div>
          <dl className="space-y-3 py-5 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-[#555b57]">Subtotal</dt><dd>{total}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-[#555b57]">Discount</dt><dd>{formatMoney(0, item.currency)}</dd></div>
          </dl>
          <div className="flex items-end justify-between gap-4 border-t border-[#e5e7eb] pt-5"><span className="font-semibold">Total</span><strong className="text-3xl">{total}</strong></div>
          <p className="mt-3 text-xs leading-5 text-[#686d69]">This is the authoritative total that will be sent securely to Stripe.</p>
        </aside>
      </div>}
    </main>
    <Footer />
  </div>;
}
