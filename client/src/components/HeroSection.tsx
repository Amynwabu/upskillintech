/**
 * HeroSection — UpskillinTech v3.1
 * Mission: Independent AI Awareness Platform
 * Copy: Positions UpskillinTech as the trusted source for AI insights,
 *       productivity, tools, and responsible adoption.
 * Background: light almost-white gradient with green/teal tints
 * Typography: Sora headings, DM Sans body
 * Layout: split grid — bold copy left, photo right
 */
import { ArrowRight, BookOpen } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/hero-realistic-team-nun6Shd8E5rHXixQdtx7Wn.webp";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 45%, #f0f9ff 100%)",
        paddingTop: "76px",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-100px] rounded-full pointer-events-none" style={{ width: 480, height: 480, background: "rgba(13,148,136,0.06)" }} />
      <div className="absolute bottom-[-80px] left-[-80px] rounded-full pointer-events-none" style={{ width: 320, height: 320, background: "rgba(56,181,74,0.07)" }} />
      <div className="absolute top-1/2 left-1/3 rounded-full pointer-events-none" style={{ width: 200, height: 200, background: "rgba(215,119,6,0.04)", transform: "translate(-50%,-50%)" }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center py-20 lg:py-28">
          {/* Left: Copy */}
          <div className="animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: "rgba(13,148,136,0.10)", border: "1px solid rgba(13,148,136,0.25)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0D9488", display: "inline-block" }} />
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0D9488" }}>
                Independent AI Awareness Platform
              </span>
            </div>

            <h1 className="mb-6" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#111827" }}>
              Understand AI. Adopt It{" "}
              <span style={{ background: "linear-gradient(135deg, #0D9488, #38B54A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Responsibly.
              </span>
            </h1>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.2rem", lineHeight: 1.75, color: "#374151", marginBottom: "1rem" }}>
              Practical insights on AI productivity, AI tools, and the future of work — designed for professionals who want to stay ahead without being overwhelmed.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.15rem", lineHeight: 1.75, color: "#6B7280", marginBottom: "2.5rem" }}>
              Join thousands of professionals who use UpskillinTech to navigate AI with clarity, confidence, and purpose.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="/resources/blog" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
                <BookOpen size={20} />
                Explore Free Insights
              </a>
              <a href="/programs" className="btn-outline" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
                <ArrowRight size={20} />
                View Programs
              </a>
            </div>

            {/* Trust breadcrumb */}
            <div className="flex items-center gap-3 flex-wrap">
              {["AI Awareness", "AI Productivity", "AI Transformation"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className="font-semibold px-4 py-1.5 rounded-full"
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "0.875rem",
                      background: "rgba(13,148,136,0.08)",
                      color: "#0D9488",
                      border: "1px solid rgba(13,148,136,0.20)",
                    }}
                  >
                    {step}
                  </span>
                  {i < 2 && (
                    <span style={{ color: "#D97706", fontWeight: 800, fontSize: "1.2rem" }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center lg:justify-end animate-fade-up-delay-2">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
                maxWidth: 560,
                width: "100%",
              }}
            >
              <img
                src={HERO_IMG}
                alt="Diverse professionals collaborating with AI tools"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
              {/* Floating badge */}
              <div
                className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-5 py-3"
                style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              >
                <span style={{ fontSize: "1.6rem" }}>🌍</span>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#0D9488" }}>
                    1,000+ Professionals
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#6B7280" }}>Adopting AI Responsibly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "linear-gradient(90deg, #0D9488 0%, #16A34A 50%, #38B54A 100%)", borderTop: "1px solid rgba(255,255,255,0.10)" }}>
        <div className="container py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "1,000+", label: "Professionals Reached" },
              { value: "20+", label: "Countries" },
              { value: "50+", label: "AI Insights Published" },
              { value: "Free", label: "Resources Available" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "rgba(255,255,255,0.80)", marginTop: "0.25rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
