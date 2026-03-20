/**
 * SolutionSection — "The UpskillinTech Approach"
 * Design: Dark slate background, 4-step vertical progression with connecting lines
 * Colors: White text on dark, teal/green step accents
 */

import { useRef, useEffect, useState } from "react";
import { Lightbulb, Shield, Zap, Rocket } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    number: "01",
    title: "AI Curiosity",
    desc: "Start with the right mindset. Understand what AI can and can't do, and why it matters for your specific role.",
    color: "#0D9488",
  },
  {
    icon: Shield,
    number: "02",
    title: "AI Confidence",
    desc: "Build foundational skills with hands-on practice using the AI tools most relevant to your daily work.",
    color: "#16A34A",
  },
  {
    icon: Zap,
    number: "03",
    title: "AI Productivity",
    desc: "Apply AI to real tasks — writing, research, analysis, communication — and start saving hours every week.",
    color: "#D97706",
  },
  {
    icon: Rocket,
    number: "04",
    title: "AI Transformation",
    desc: "Build complete AI workflows that transform how you work, lead, and deliver results.",
    color: "#7C3AED",
  },
];

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

export default function SolutionSection() {
  const { ref, inView } = useInView();

  return (
    <section id="solution" className="py-20 lg:py-28" style={{ background: "#0F172A" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="section-label mb-3" style={{ color: "#0D9488" }}>Our Approach</div>
            <h2 className="mb-6" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white", lineHeight: 1.2 }}>
              The UpskillinTech{" "}
              <span style={{ background: "linear-gradient(135deg, #0D9488, #16A34A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Approach
              </span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
              We don't just teach AI tools.{" "}
              <span style={{ color: "white", fontWeight: 600 }}>We help you integrate AI into real work.</span>
            </p>
            <p className="mb-8" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
              Our structured 4-stage framework takes you from AI curiosity to full AI transformation — with practical skills you can apply from day one.
            </p>
            <a href="#programs" className="btn-primary" style={{ fontSize: "0.95rem" }}>
              Start Your Journey →
            </a>
          </div>

          {/* Right: Step Progression */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="relative">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative flex gap-5 mb-6 last:mb-0">
                    {/* Vertical line */}
                    {i < steps.length - 1 && (
                      <div className="absolute left-6 top-14 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, rgba(13,148,136,0.4), rgba(13,148,136,0.1))" }} />
                    )}

                    {/* Step indicator */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${step.color}20`, border: `2px solid ${step.color}40` }}>
                        <Icon size={20} style={{ color: step.color }} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: step.color, color: "white", fontFamily: "'Sora', sans-serif", fontSize: "0.6rem" }}>
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <h3 className="font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "white", fontSize: "1rem" }}>
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
