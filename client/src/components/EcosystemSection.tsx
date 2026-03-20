/**
 * EcosystemSection — "The UpskillinTech Ecosystem"
 * Design: White background, 4 ecosystem stages in horizontal flow
 * Positions UpskillinTech as a full platform, not just a course
 */

import { useRef, useEffect, useState } from "react";
import { Radio, BookOpen, Wrench, Users2 } from "lucide-react";

const stages = [
  {
    icon: Radio,
    number: "01",
    title: "Awareness",
    subtitle: "AI Content & Insights",
    desc: "AI content, webinars, and insights to help you understand what's happening in the AI world and why it matters for your work.",
    items: ["Weekly AI insights", "Free webinars", "AI trend reports"],
    color: "#0D9488",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Learning",
    subtitle: "Structured AI Programs",
    desc: "Structured programs that take you from AI basics to advanced workflow integration with practical, hands-on learning.",
    items: ["Cohort programs", "Self-paced courses", "Live workshops"],
    color: "#16A34A",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Application",
    subtitle: "Workflow Integration",
    desc: "Apply what you've learned with real workflow templates, tools, and guided implementation support.",
    items: ["AI workflow templates", "Tool integrations", "Implementation support"],
    color: "#D97706",
  },
  {
    icon: Users2,
    number: "04",
    title: "Community",
    subtitle: "Ongoing Learning & Collaboration",
    desc: "Join a community of AI-enabled professionals for ongoing learning, collaboration, and peer support.",
    items: ["Peer community", "Expert mentors", "Monthly masterclasses"],
    color: "#7C3AED",
  },
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

export default function EcosystemSection() {
  const { ref, inView } = useInView();

  return (
    <section id="ecosystem" className="py-20 lg:py-28" style={{ background: "white" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="section-label mb-3">The Platform</div>
          <h2 className="mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#0F172A", lineHeight: 1.2 }}>
            The UpskillinTech{" "}
            <span style={{ background: "linear-gradient(135deg, #0D9488, #16A34A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Ecosystem
            </span>
          </h2>
          <p className="text-lg" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            We're not just a course platform. We're a complete ecosystem designed to take you from AI awareness to full AI transformation.
          </p>
        </div>

        {/* Ecosystem Stages */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 mx-16" style={{ background: "linear-gradient(to right, #0D9488, #16A34A, #D97706, #7C3AED)", opacity: 0.3 }} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.title}
                  className={`relative flex flex-col ${inView ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
                >
                  {/* Stage number indicator */}
                  <div className="relative z-10 flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm mb-3" style={{ background: `${stage.color}12`, border: `2px solid ${stage.color}30` }}>
                      <Icon size={28} style={{ color: stage.color }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: stage.color, fontFamily: "'Sora', sans-serif", letterSpacing: "0.1em" }}>
                      STAGE {stage.number}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-all duration-300" style={{ borderTopColor: stage.color, borderTopWidth: "3px" }}>
                    <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#0F172A" }}>
                      {stage.title}
                    </h3>
                    <p className="text-xs font-semibold mb-3" style={{ color: stage.color, fontFamily: "'Sora', sans-serif" }}>
                      {stage.subtitle}
                    </p>
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                      {stage.desc}
                    </p>
                    <ul className="space-y-1.5">
                      {stage.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: stage.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
