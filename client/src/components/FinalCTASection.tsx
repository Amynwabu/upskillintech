/**
 * FinalCTASection — UpskillinTech v3
 * Bold green gradient background, large headline, dual CTAs, trust indicators
 */
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Users, Star, Clock } from "lucide-react";

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

const trustItems = [
  { icon: Users, label: "1,000+ Professionals Trained" },
  { icon: Star, label: "95% Success Rate" },
  { icon: Clock, label: "Practical From Day One" },
];

export default function FinalCTASection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #38B54A 0%, #2d9e3e 40%, #1a7a2e 100%)",
        padding: "7rem 0",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-[-80px] right-[-80px] rounded-full pointer-events-none" style={{ width: 400, height: 400, background: "rgba(255,255,255,0.06)" }} />
      <div className="absolute bottom-[-60px] left-[-60px] rounded-full pointer-events-none" style={{ width: 300, height: 300, background: "rgba(230,184,0,0.10)" }} />

      <div className="container relative z-10" ref={ref}>
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8" style={{ background: "rgba(255,255,255,0.18)" }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#E6B800" }} />
            <span className="font-semibold" style={{ color: "#ffffff", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
              Next Cohort Enrolling Now
            </span>
          </div>

          <h2 className="mb-6" style={{ color: "#ffffff", fontWeight: 800, lineHeight: 1.15 }}>
            Start Your Journey to Becoming an{" "}
            <span style={{ color: "#E6B800" }}>AI-Enabled Professional</span>
          </h2>

          <p className="mb-12 max-w-2xl mx-auto" style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.75 }}>
            Join the next cohort and begin integrating AI into your daily work. Save hours every week, stay ahead of the curve, and transform how you work — starting today.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12">
            <a
              href="/programs"
              className="flex items-center gap-2 font-bold rounded-xl px-8 py-4 transition-all duration-200"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.1rem",
                background: "#E6B800",
                color: "#111827",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(230,184,0,0.40)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(230,184,0,0.55)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(230,184,0,0.40)"; }}
            >
              Explore Programs <ArrowRight size={20} />
            </a>
            <a
              href="/community"
              className="flex items-center gap-2 font-bold rounded-xl px-8 py-4 transition-all duration-200"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.1rem",
                background: "transparent",
                color: "#ffffff",
                textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.70)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.70)"; }}
            >
              Join the Community
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                  <Icon size={18} style={{ color: "#E6B800" }} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.975rem", fontWeight: 500, color: "rgba(255,255,255,0.90)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
