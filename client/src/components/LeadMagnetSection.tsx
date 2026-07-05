/**
 * LeadMagnetSection — UpskillinTech v4 "Evergreen"
 * "Start free" hub: the free prompt guide and the AI level quiz together,
 * so free tools feel integrated rather than tacked on.
 */
import { useRef, useEffect, useState } from "react";
import { Download, Mail, Check } from "lucide-react";
import { toast } from "sonner";
import AISkillsQuiz from "@/components/AISkillsQuiz";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const kitContents = [
  "50 prompts for emails, planning, research, and writing",
  "10 AI use cases for business owners",
  "5 automation ideas you can set up this week",
  "AI safety checklist and tool comparison guide",
];

export default function LeadMagnetSection() {
  const { ref, inView } = useInView();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success("Your 50 AI Prompts guide is on its way!", {
      description: "Check your inbox — it should arrive within a few minutes.",
    });
  };

  return (
    <section id="start-free" aria-label="Free resources" className="section-py" style={{ background: "#FFFFFF" }}>
      <div className="container" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Start free</span>
          <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            Two free ways to take the first step
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#5D6B60", lineHeight: 1.7 }}>
            Download the prompt guide, or answer five questions to find your AI starting
            point and a recommended path.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 items-start transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Left: Free guide */}
          <div
            id="lead-magnet"
            className="card-modern"
            style={{ padding: "2.5rem", scrollMarginTop: "96px" }}
          >
            <div
              className="flex items-center justify-center rounded-lg mb-6"
              style={{ width: 46, height: 46, background: "#E9F5E2" }}
            >
              <Download size={21} style={{ color: "#2E7B20" }} />
            </div>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#8A6D10", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>
              Free guide
            </p>
            <h3 style={{ fontSize: "1.35rem", marginBottom: "0.75rem" }}>
              50 AI Prompts Every Professional Should Know
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#3E4A41", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Everything you need to start using AI practically — built for busy
              professionals, not engineers.
            </p>

            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
              {kitContents.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <Check size={16} style={{ color: "#2E7B20", flexShrink: 0, marginTop: "0.25rem" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#3E4A41", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#8B968D" }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      aria-label="Email address"
                      required
                      style={{
                        width: "100%", paddingLeft: "2.5rem", paddingRight: "1rem",
                        paddingTop: "0.8rem", paddingBottom: "0.8rem",
                        borderRadius: "0.5rem", border: "1px solid #D7E0D6",
                        background: "#FFFFFF", color: "#17211A",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", outline: "none",
                      }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
                    <Download size={15} /> Get the Guide
                  </button>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#5D6B60" }}>
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div style={{ borderRadius: "0.75rem", padding: "1.25rem", background: "#F5FAF2", border: "1px solid #D2EBC5" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#E9F5E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={18} style={{ color: "#2E7B20" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "#17211A", marginBottom: "0.15rem" }}>Guide sent to your inbox</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#5D6B60" }}>Check {email} — it should arrive in a few minutes.</div>
                  </div>
                </div>
              </div>
            )}

            <p style={{ marginTop: "1.5rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>
              <a href="/challenge" style={{ color: "#2E7B20", fontWeight: 600, textDecoration: "none" }}>
                Prefer a guided start? Take the 7-Day AI Challenge →
              </a>
            </p>
          </div>

          {/* Right: Quiz */}
          <div id="quiz" style={{ scrollMarginTop: "96px" }}>
            <AISkillsQuiz />
          </div>
        </div>
      </div>
    </section>
  );
}
