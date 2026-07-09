import { useRef, useEffect, useState } from "react";
import { Compass, BookOpen, Wrench, Zap, Rocket } from "lucide-react";

const steps = [
  {
    icon: Compass,
    number: "01",
    title: "Discover",
    desc: "Understand what AI can do for your life, work, business, or organisation.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Practise",
    desc: "Learn simple prompts and everyday use cases through hands-on guided sessions.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Apply",
    desc: "Use AI for real tasks: emails, content, planning, research, and analysis.",
  },
  {
    icon: Zap,
    number: "04",
    title: "Automate",
    desc: "Build simple workflows with AI workflow tools you already use.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Adopt",
    desc: "Build repeatable AI habits, safe practices, and long-term confidence.",
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
    <section id="solution" className="overflow-hidden py-20 lg:py-28" style={{ background: "#0d1117" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="section-label mb-3" style={{ color: "#2ecc71" }}>The AI Adoption Pathway</div>
            <h2 className="mb-6" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "2.25rem", color: "white", lineHeight: 1.2 }}>
              Five stages from curiosity{" "}
              <span style={{ color: "#2ecc71" }}>to confident adoption</span>
            </h2>
            <p className="mb-8" style={{ color: "#D1D5DB", fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", lineHeight: 1.7 }}>
              We help you build a practical AI adoption habit. Every stage is designed around
              real tasks and real results, so you move from learning into doing.
            </p>
            <a href="#programs" className="btn-primary" style={{ fontSize: "1rem" }}>
              Start Your Journey
            </a>
          </div>

          {/* Right: Step Progression */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="relative">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative flex gap-5 mb-6 last:mb-0">
                    {i < steps.length - 1 && (
                      <div className="absolute left-6 top-14 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, rgba(46,204,113,0.4), rgba(46,204,113,0.1))" }} />
                    )}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(46,204,113,0.14)", border: "2px solid rgba(46,204,113,0.30)" }}>
                        <Icon size={20} style={{ color: "#2ecc71" }} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ background: "#2ecc71", color: "#0d1117", fontFamily: "'Sora', sans-serif", fontSize: "0.7rem" }}>
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1 pb-2">
                      <h3 className="font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "white", fontSize: "1.2rem" }}>
                        {step.title}
                      </h3>
                      <p className="leading-relaxed" style={{ color: "#D1D5DB", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
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
