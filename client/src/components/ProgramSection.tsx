/**
 * ProgramSection — "The AI-Enabled Professional Program"
 * Design: Teal-tinted background, Before/After split cards, strong visual hierarchy
 * Colors: Teal/green gradient, amber CTA
 */

import { useRef, useEffect, useState } from "react";
import { X, Check, ArrowRight, Star } from "lucide-react";

const MENTORING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/mentoring-session-9mUjt3WzCTKftvJGVcVk9z.webp";

const beforeItems = [
  "Overwhelmed by AI tools",
  "Experimenting randomly",
  "Wasting time on AI",
  "No clear AI strategy",
  "Falling behind peers",
];

const afterItems = [
  "Using AI daily with confidence",
  "Saving 5+ hours every week",
  "Building AI workflows",
  "Clear AI integration plan",
  "Staying ahead in your field",
];

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

export default function ProgramSection() {
  const { ref, inView } = useInView();

  return (
    <section id="programs" className="py-20 lg:py-28" style={{ background: "linear-gradient(160deg, #F0FDFA 0%, #F8FAFC 60%, #ECFDF5 100%)" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label mb-3">Flagship Program</div>
          <h2 className="mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#0F172A", lineHeight: 1.2 }}>
            The AI-Enabled{" "}
            <span style={{ background: "linear-gradient(135deg, #0D9488, #16A34A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Professional Program
            </span>
          </h2>
          <p className="text-lg" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            A practical program designed to help professionals integrate AI into their daily workflows — from day one.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Before / After Cards */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Before */}
              <div className="rounded-xl p-6 flex flex-col" style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.15)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(220,38,38,0.1)" }}>
                    <X size={14} style={{ color: "#DC2626" }} />
                  </div>
                  <span className="font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif", color: "#DC2626" }}>Before</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {beforeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <X size={13} className="mt-0.5 flex-shrink-0" style={{ color: "#DC2626" }} />
                      <span className="text-sm" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="rounded-xl p-6 flex flex-col" style={{ background: "rgba(13,148,136,0.05)", border: "1px solid rgba(13,148,136,0.2)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(13,148,136,0.1)" }}>
                    <Check size={14} style={{ color: "#0D9488" }} />
                  </div>
                  <span className="font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif", color: "#0D9488" }}>After</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {afterItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: "#16A34A" }} />
                      <span className="text-sm font-medium" style={{ color: "#0F172A", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="rounded-2xl overflow-hidden shadow-xl h-full flex flex-col">
              {/* Image */}
              <div className="relative" style={{ height: "220px" }}>
                <img src={MENTORING_IMAGE} alt="Mentoring session" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 50%)" }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#D97706" style={{ color: "#D97706" }} />)}
                    <span className="text-white text-xs ml-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>4.9/5 from 200+ participants</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col bg-white">
                <h3 className="font-bold text-xl mb-3" style={{ fontFamily: "'Sora', sans-serif", color: "#0F172A" }}>
                  AI-Enabled Professional Program
                </h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                  A structured cohort-based program with live sessions, practical assignments, and peer learning — designed to transform how you work with AI.
                </p>

                {/* Program Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    "Live cohort sessions",
                    "Practical assignments",
                    "AI workflow templates",
                    "Peer community access",
                    "Expert mentorship",
                    "Certificate of completion",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(13,148,136,0.15)" }}>
                        <Check size={9} style={{ color: "#0D9488" }} />
                      </div>
                      <span className="text-xs" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{feat}</span>
                    </div>
                  ))}
                </div>

                <a href="#final-cta" className="btn-amber flex items-center justify-center gap-2 mt-auto" style={{ fontSize: "0.9rem" }}>
                  Join the Next Cohort <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
