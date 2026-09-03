import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "wouter";

export default function PaymentCancelled() {
  const courseId = Number(new URLSearchParams(window.location.search).get("courseId"));
  const backUrl = Number.isInteger(courseId) && courseId > 0 ? `/checkout?courseId=${courseId}` : "/learn";
  return <div className="min-h-screen bg-[#f6f7f4]"><Navbar /><main className="mx-auto flex max-w-2xl px-4 pb-20 pt-32"><section className="w-full rounded-xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm sm:p-10"><XCircle className="mx-auto text-[#555b57]" size={56}/><h1 className="mt-5 text-3xl font-bold">Your payment was cancelled.</h1><p className="mt-3 text-[#555b57]">No payment has been taken.</p><Link href={backUrl}><Button className="mt-7 bg-[#859d30] text-white hover:bg-[#6f8528]">Return to checkout</Button></Link></section></main><Footer /></div>;
}
