/**
 * HeroSection — UpskillinTech v3
 * Background: light almost-white gradient with green/yellow tints
 * Typography: h1 clamp(2.4rem → 3.75rem), body 1.125rem
 * Layout: split grid, large photo right, bold copy left
 */
import { ArrowRight, Download } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/hero-realistic-team-nun6Shd8E5rHXixQdtx7Wn.webp";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 45%, #fffef0 100%)",
        paddingTop: "76px", /* account for fixed navbar height */
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-100px] rounded-full pointer-events-none" style={{ width: 480, height: 480, background: "rgba(56,181,74,0.07)" }} />
      <div className="absolute bottom-[-80px] left-[-80px] rounded-full pointer-events-none" style={{ width: 320, height: 320, background: "rgba(230,184,0,0.08)" }} />
      <div className="absolute top-1/2 left-1/3 rounded-full pointer-events-none" style={{ width: 200, height: 200, background: "rgba(139,158,26,0.05)", transform: "translate(-50%,-50%)" }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center py-20 lg:py-28">
          {/* Left: Copy */}
          <div className="animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: "rgba(56,181,74,0.10)", border: "1px solid rgba(56,181,74,0.25)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#38B54A", display: "inline-block" }} />
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#38B54A" }}>
                Now Enrolling — Next Cohort Starts Soon
              </span>
            </div>

            <h1 className="mb-6" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, color: "#111827" }}>
              Become an AI-Enabled Professional
            </h1>

            <p style={{ fontSize: "1.2rem", lineHeight: 1.75, color: "#374151", marginBottom: "1rem" }}>
              Learn how to integrate AI into your daily work, decision-making, and workflows.
            </p>
            <p style={{ fontSize: "1.2rem", lineHeight: 1.75, color: "#374151", marginBottom: "2.5rem" }}>
              Save hours every week and stay ahead in an AI-powered world.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="/programs" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
                <ArrowRight size={20} />
                Join the AI-Enabled Program
              </a>
              <a href="#lead-magnet" className="btn-outline" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
                <Download size={20} />
                Free AI Productivity Guide
              </a>
            </div>

            {/* Progress breadcrumb */}
            <div className="flex items-center gap-3 flex-wrap">
              {["AI Curiosity", "AI Confidence", "AI Productivity"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className="font-semibold px-4 py-1.5 rounded-full"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      background: "rgba(56,181,74,0.10)",
                      color: "#111827",
                      border: "1px solid rgba(56,181,74,0.25)",
                    }}
                  >
                    {step}
                  </span>
                  {i < 2 && (
                    <span style={{ color: "#E6B800", fontWeight: 800, fontSize: "1.2rem" }}>→</span>
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
                boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
                maxWidth: 560,
                width: "100%",
              }}
            >
              <img
                src={HERO_IMG}
                alt="Diverse professionals working with AI dashboards"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
              {/* Floating badge */}
              <div
                className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-5 py-3"
                style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              >
                <span style={{ fontSize: "1.6rem" }}>🚀</span>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#38B54A" }}>
                    1,000+ Professionals
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>Already AI-Enabled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "linear-gradient(90deg, #8B9E1A 0%, #E6B800 100%)", borderTop: "1px solid rgba(255,255,255,0.10)" }}>
        <div className="container py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "1,000+", label: "Professionals Trained" },
              { value: "95%", label: "Success Rate" },
              { value: "50+", label: "Business Partners" },
              { value: "10+", label: "Flagship Courses" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "rgba(0,0,0,0.65)", marginTop: "0.25rem" }}>
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
