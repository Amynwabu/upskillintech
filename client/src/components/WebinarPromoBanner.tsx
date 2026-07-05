import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function WebinarPromoBanner() {
  return (
    <section aria-label="Announcement" style={{ background: "#1B4A11" }}>
      <div className="container">
        <div className="flex flex-col gap-1.5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.92)" }}>
            <span
              aria-hidden="true"
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#D9AE2B", display: "inline-block", flexShrink: 0 }}
            />
            <span style={{ fontWeight: 600 }}>July AI Masterclass — live, practical sessions</span>
            <span className="hidden md:inline" style={{ color: "rgba(255,255,255,0.65)" }}>
              ₦50,000 · £50 · Limited seats
            </span>
          </div>
          <Link
            href="/masterclass"
            className="inline-flex items-center gap-1.5 text-sm"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              color: "#ffffff",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Reserve your seat <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
