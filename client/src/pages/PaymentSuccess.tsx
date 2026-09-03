import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/payments";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

export default function PaymentSuccess() {
  const sessionId = new URLSearchParams(window.location.search).get("session_id") || "";
  const pollingDeadline = useRef(Date.now() + 120_000);
  const [pollingTimedOut, setPollingTimedOut] = useState(false);
  const status = trpc.payments.orderStatus.useQuery({ sessionId }, {
    enabled: Boolean(sessionId),
    refetchInterval: query => {
      const waiting = query.state.data?.status === "pending" || query.state.data?.status === "processing";
      return waiting && Date.now() < pollingDeadline.current ? 2000 : false;
    },
  });
  useEffect(() => {
    const timer = window.setTimeout(() => setPollingTimedOut(true), Math.max(0, pollingDeadline.current - Date.now()));
    return () => window.clearTimeout(timer);
  }, []);
  const order = status.data;
  const paid = order?.status === "paid";
  const failed = order?.status === "failed" || order?.status === "cancelled";
  const waiting = order?.status === "pending" || order?.status === "processing";
  return <div className="min-h-screen bg-[#f6f7f4]"><Navbar /><main className="mx-auto flex max-w-2xl px-4 pb-20 pt-32"><section className="w-full rounded-xl border border-[#e5e7eb] bg-white p-7 text-center shadow-sm sm:p-10" aria-live="polite">
    {status.isLoading && <><Clock3 className="mx-auto text-[#859d30]" size={52}/><h1 className="mt-5 text-3xl font-bold">Confirming your payment…</h1><p className="mt-3 text-[#555b57]">Please keep this page open while Stripe confirms the result.</p></>}
    {waiting && !pollingTimedOut && <><Clock3 className="mx-auto text-[#859d30]" size={52}/><h1 className="mt-5 text-3xl font-bold">Processing your payment…</h1><p className="mt-3 text-[#555b57]">Stripe is still confirming the payment. This page will update automatically.</p></>}
    {waiting && pollingTimedOut && <><Clock3 className="mx-auto text-[#859d30]" size={52}/><h1 className="mt-5 text-3xl font-bold">Your payment is still processing.</h1><p className="mt-3 text-[#555b57]">You can safely return to your dashboard and check again later. Your registration will activate only after Stripe confirms payment.</p><Link href="/dashboard"><Button className="mt-7 bg-[#859d30] text-white hover:bg-[#6f8528]">Return to dashboard</Button></Link></>}
    {paid && <><CheckCircle2 className="mx-auto text-[#859d30]" size={56}/><h1 className="mt-5 text-3xl font-bold">Thank you for your payment.</h1><p className="mt-3 text-lg font-semibold">{order.title}</p><p className="mt-2 text-[#555b57]">Payment received: {formatMoney(order.paidAmount ?? order.amount, order.currency)}</p><p className="mt-2 text-[#555b57]">Your registration has been confirmed.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"><Link href={`/courses/${order.courseId}`}><Button className="w-full bg-[#859d30] text-white hover:bg-[#6f8528]">View programme</Button></Link><Link href="/dashboard"><Button variant="outline" className="w-full">Return to dashboard</Button></Link></div></>}
    {failed && <><XCircle className="mx-auto text-red-600" size={56}/><h1 className="mt-5 text-3xl font-bold">Your payment has not been completed.</h1><p className="mt-3 text-[#555b57]">Please check your payment method and try again, or choose another available payment option.</p><Link href={`/checkout?courseId=${order.courseId}`}><Button className="mt-7 bg-[#859d30] text-white hover:bg-[#6f8528]">Try again</Button></Link></>}
    {status.error && <><XCircle className="mx-auto text-red-600" size={56}/><h1 className="mt-5 text-3xl font-bold">We could not verify this payment.</h1><p className="mt-3 text-[#555b57]">{status.error.message}</p></>}
  </section></main><Footer /></div>;
}
