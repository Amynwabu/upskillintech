/**
 * SolutionSection — UpskillinTech v4 "Evergreen"
 * "How it works": acknowledges why most people stall with AI, then shows
 * the five-stage adoption pathway. Merges the former Problem + Solution sections.
 */
import { useRef, useEffect, useState } from "react";
import { Compass, BookOpen, Wrench, Zap, Rocket } from "lucide-react";

const steps = [
  {
    icon: Compass,
    number: "01",
    title: "Discover",
    desc: "Understand what AI can genuinely do for your work — and what it can't.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Practise",
    desc: "Learn the core tools and prompting skills through hands-on guided sessions.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Apply",
    desc: "Use AI on your real tasks: emails, content, planning, research, and reporting.",
  },
  {
    icon: Zap,
    number: "04",
    title: "Automate",
    desc: "Build simple workflows with the tools you already use — no code required.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Adopt",
    desc: "Turn new skills into lasting habits, with safe practices that scale with you.",
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
    <section id="adoption-journey" className="section-py" style={{ background: "#F5FAF2", borderTop: "1px solid #E3EAE2", borderBottom: "1px solid #E3EAE2" }}>
      <div className="container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <span className="section-label">How it works</span>
            <h2 style={{ marginTop: "1rem", marginBottom: "1.5rem", maxWidth: 480 }}>
              Most people try AI and stall. Structure changes that.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#3E4A41", lineHeight: 1.75, marginBottom: "1.25rem", maxWidth: 480 }}>
              Hundreds of tools, generic advice, and no clear starting point — that's why AI
              never sticks for most professionals. Watching more videos won't fix it.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#3E4A41", lineHeight: 1.75, marginBottom: "2.25rem", maxWidth: 480 }}>
              Our five-stage pathway is built around your real tasks, so AI becomes part of
              how you work — not another experiment you abandon.
            </p>
            <a href="#programs" className="btn-primary">
              See the Programmes
            </a>
          </div>

          {/* Right: Step progression */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="relative">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative flex gap-5 mb-7 last:mb-0">
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute left-6 top-14 bottom-0 w-px"
                        style={{ background: "#C6DBBD" }}
                      />
                    )}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "#FFFFFF", border: "1px solid #C6DBBD" }}
                      >
                        <Icon size={20} style={{ color: "#2E7B20" }} />
                      </div>
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#50B040", letterSpacing: "0.08em" }}>
                          {step.number}
                        </span>
                        <h3 style={{ fontSize: "1.05rem" }}>{step.title}</h3>
                      </div>
                      <p style={{ fontSize: "0.925rem", lineHeight: 1.65, color: "#5D6B60", fontFamily: "'DM Sans', sans-serif" }}>
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
