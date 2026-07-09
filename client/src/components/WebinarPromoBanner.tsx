import { ArrowRight, Zap } from "lucide-react";
import { Link } from "wouter";

export default function WebinarPromoBanner() {
  return (
    <section style={{ background: "#2ecc71" }}>
      <div className="container">
        <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between" style={{ color: "#0d1117" }}>
          <div className="flex items-center gap-2 font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem" }}>
            <Zap size={16} color="#0d1117" />
            <span>AI Masterclass — 1 and 8 August 2026</span>
            <span className="hidden md:inline" style={{ color: "rgba(13,17,23,0.75)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              £50 United Kingdom · $50 All Other Regions · Limited spots
            </span>
          </div>
          <Link
            href="/masterclass#register"
            className="inline-flex items-center gap-1 font-bold underline-offset-4 hover:underline"
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", color: "#0d1117", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Reserve your spot <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
