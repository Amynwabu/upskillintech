import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function WebinarPromoBanner() {
  return (
    <section style={{ background: "linear-gradient(90deg, #0D9488 0%, #16A34A 100%)" }}>
      <div className="container">
        <div className="flex flex-col gap-2 py-3 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>
            <Calendar size={16} />
            <span>Free webinar: Build practical AI skills for work</span>
            <span className="hidden md:inline" style={{ color: "rgba(255,255,255,0.82)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              Live sessions and replays available
            </span>
          </div>
          <Link
            href="/resources/webinars"
            className="inline-flex items-center gap-1 text-sm font-bold text-white underline-offset-4 hover:underline"
            style={{ fontFamily: "'Sora', sans-serif", textDecoration: "none" }}
          >
            Reserve your spot <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
