/**
 * FinalCTASection — UpskillinTech v4 "Evergreen"
 * Calm, confident closing: deep green panel, one clear message,
 * primary + secondary CTA, single trust line.
 */
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

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

export default function FinalCTASection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="final-cta"
      style={{ background: "#1B4A11", padding: "6.5rem 0" }}
    >
      <div className="container" ref={ref}>
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 style={{ color: "#ffffff", marginBottom: "1.5rem" }}>
            Ready to make AI part of how you work?
          </h2>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: "2.75rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Join 1,000+ professionals across Nigeria, the UK, and the diaspora who are
            learning to use AI practically — with structure, support, and no hype.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href="/programs" className="btn-primary-white" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
              Explore Programmes <ArrowRight size={17} />
            </a>
            <a href="#start-free" className="btn-outline-white" style={{ fontSize: "1rem", padding: "0.85rem 2rem" }}>
              Start with Free Resources
            </a>
          </div>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>
            1,000+ professionals · 20+ countries · Founded by a PhD AI &amp; Robotics researcher
          </p>
        </div>
      </div>
    </section>
  );
}
