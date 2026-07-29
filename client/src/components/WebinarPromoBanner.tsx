import { ArrowRight, Zap } from "lucide-react";
import { Link } from "wouter";

export default function WebinarPromoBanner() {
  return (
    <section style={{ background: "linear-gradient(90deg, #859D30 0%, #859D30 100%)" }}>
      <div className="container">
        <div className="flex flex-col gap-2 py-3 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>
            <Zap size={16} color="#859D30" />
            <span>July AI Masterclass — Live practical sessions</span>
            <span className="hidden md:inline" style={{ color: "rgba(255,255,255,0.82)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              ₦50,000 · £50 · Limited spots
            </span>
          </div>
          <Link
            href="/masterclass"
            className="inline-flex items-center gap-1 text-sm font-bold text-white underline-offset-4 hover:underline"
            style={{ fontFamily: "'Sora', sans-serif", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Reserve your spot <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
