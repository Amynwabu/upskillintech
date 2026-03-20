/**
 * LeadMagnetSection — "Free Guide: 50 AI Prompts Every Professional Should Know"
 * Design: Teal gradient background, email capture form, guide preview
 */

import { useRef, useEffect, useState } from "react";
import { Download, Mail, BookOpen, Check } from "lucide-react";
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

export default function LeadMagnetSection() {
  const { ref, inView } = useInView();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success("Your free guide is on its way!", {
      description: "Check your inbox for the 50 AI Prompts guide.",
    });
  };

  const guideTopics = [
    "Research & Analysis prompts",
    "Strategy & Decision-making",
    "Writing & Communication",
    "Data interpretation",
    "Meeting & Planning",
    "Client & Stakeholder comms",
  ];

  return (
    <section id="lead-magnet" className="py-20 lg:py-28" style={{ background: "linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #16A34A 100%)" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Guide Preview */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            {/* Guide "Book" mockup */}
            <div className="relative max-w-sm">
              <div className="rounded-2xl p-8 shadow-2xl" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <BookOpen size={22} style={{ color: "white" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/70 uppercase tracking-wider" style={{ fontFamily: "'Sora', sans-serif" }}>Free Guide</div>
                    <div className="text-white font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>50 AI Prompts</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  50 AI Prompts Every Professional Should Know
                </h3>
                <p className="text-white/80 text-sm mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Learn powerful prompts used for research, strategy, writing, and decision-making.
                </p>

                <div className="space-y-2">
                  {guideTopics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                        <Check size={9} style={{ color: "white" }} />
                      </div>
                      <span className="text-sm text-white/90" style={{ fontFamily: "'DM Sans', sans-serif" }}>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full opacity-20" style={{ background: "white" }} />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full opacity-15" style={{ background: "white" }} />
            </div>
          </div>

          {/* Right: Email Capture */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              Free Resource
            </div>
            <h2 className="mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white", lineHeight: 1.2 }}>
              Get Your Free AI Productivity Guide
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
              Download the{" "}
              <strong style={{ color: "white" }}>50 AI Prompts Every Professional Should Know</strong>{" "}
              — your top-of-funnel toolkit for AI productivity.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.5)" }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>
                  <button type="submit" className="btn-amber flex items-center gap-2 whitespace-nowrap" style={{ fontSize: "0.9rem" }}>
                    <Download size={15} />
                    Download Free Guide
                  </button>
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            ) : (
              <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <Check size={18} style={{ color: "white" }} />
                  </div>
                  <div>
                    <div className="font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Guide sent to your inbox!</div>
                    <div className="text-sm text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>Check {email} for your free guide.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
