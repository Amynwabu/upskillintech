import { useRef, useEffect, useState } from "react";
import { Download, Mail, CheckCircle2, Check, Shield, Zap, BookOpen, ListChecks, BarChart2 } from "lucide-react";
import { toast } from "sonner";

function useInView(threshold = 0.2) {
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
  { icon: BookOpen, label: "20 prompts for daily productivity", desc: "Emails, planning, research, writing, and communication" },
  { icon: Zap, label: "10 AI use cases for business owners", desc: "Marketing, customer service, operations, and sales" },
  { icon: ListChecks, label: "5 simple automation ideas", desc: "Workflows you can set up this week with free tools" },
  { icon: Shield, label: "AI safety checklist", desc: "Use AI responsibly — what to share, what to protect" },
  { icon: BarChart2, label: "Tool comparison guide", desc: "ChatGPT vs Claude vs Gemini — which fits your needs" },
  { icon: CheckCircle2, label: "Beginner-friendly workflow examples", desc: "Real before-and-after examples you can copy immediately" },
];

export default function LeadMagnetSection() {
  const { ref, inView } = useInView();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success("Your AI Everyday Starter Kit is on its way!", {
      description: "Check your inbox — it should arrive within a few minutes.",
    });
  };

  return (
    <section id="lead-magnet" className="overflow-hidden py-20 lg:py-28" style={{ background: "linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #16A34A 100%)" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Kit preview */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div style={{ borderRadius: "1.5rem", padding: "2rem", background: "rgba(255,255,255,0.10)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Download size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Free Resource</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#ffffff" }}>AI Everyday Starter Kit</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {kitContents.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                      <div style={{ width: 34, height: 34, borderRadius: "0.5rem", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#ffffff", marginBottom: "0.15rem" }}>{item.label}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.775rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Email capture */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.75rem" }}>
              Free Download — No Credit Card Needed
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white", lineHeight: 1.2, marginBottom: "1rem" }}>
              Download the Free AI Everyday Starter Kit
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, marginBottom: "2rem" }}>
              Everything you need to start using AI practically — prompts, use cases, automation ideas, a safety checklist, and a tool comparison guide. Built for beginners and busy professionals.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
                      <Mail size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.45)" }} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        style={{
                          width: "100%", paddingLeft: "2.5rem", paddingRight: "1rem",
                          paddingTop: "0.875rem", paddingBottom: "0.875rem",
                          borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.25)",
                          background: "rgba(255,255,255,0.12)", color: "white",
                          fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", outline: "none",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        background: "#E6B800", color: "#F3F4F6", borderRadius: "0.75rem",
                        padding: "0.875rem 1.5rem", border: "none", cursor: "pointer",
                        fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Download size={15} /> Download Free Kit
                    </button>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                    No spam. Unsubscribe anytime. We respect your privacy.
                  </p>
                </div>
              </form>
            ) : (
              <div style={{ borderRadius: "1rem", padding: "1.5rem", background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={18} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#ffffff", marginBottom: "0.2rem" }}>Starter Kit sent to your inbox!</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}>Check {email} — it should arrive in a few minutes.</div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <a href="/challenge" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
                → Take the 7-Day AI Challenge
              </a>
              <a href="#quiz" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
                → Find your AI level
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
