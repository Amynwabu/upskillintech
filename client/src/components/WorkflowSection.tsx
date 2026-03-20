/**
 * WorkflowSection — "How AI Improves Daily Work"
 * Design: White background, 3 workflow cards with step-flow graphics
 * Each workflow shows: Input → AI → Output
 */

import { useRef, useEffect, useState } from "react";
import { MessageSquare, Search, Database, Brain, FileText, BarChart2, CheckSquare, Presentation, FileBarChart, ArrowRight } from "lucide-react";

const WORKFLOW_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/ai-workflow-illustration-9MtDqz9v88sW34zieqnwYJ.webp";

const workflows = [
  {
    title: "Meeting Intelligence",
    desc: "Transform every meeting into structured, actionable outcomes automatically.",
    steps: [
      { icon: MessageSquare, label: "Meeting", color: "#0D9488" },
      { icon: Brain, label: "AI Summary", color: "#7C3AED" },
      { icon: CheckSquare, label: "Action Items", color: "#16A34A" },
    ],
    timeSaved: "2 hrs/week",
    color: "#0D9488",
  },
  {
    title: "Research to Presentation",
    desc: "Go from raw research to polished presentations in a fraction of the time.",
    steps: [
      { icon: Search, label: "Research", color: "#0D9488" },
      { icon: Brain, label: "AI Insights", color: "#7C3AED" },
      { icon: Presentation, label: "Presentation", color: "#D97706" },
    ],
    timeSaved: "3 hrs/week",
    color: "#16A34A",
  },
  {
    title: "Data-Driven Reports",
    desc: "Turn client data into professional reports with AI-powered analysis.",
    steps: [
      { icon: Database, label: "Client Data", color: "#0D9488" },
      { icon: BarChart2, label: "AI Analysis", color: "#7C3AED" },
      { icon: FileBarChart, label: "Report", color: "#DC2626" },
    ],
    timeSaved: "4 hrs/week",
    color: "#D97706",
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

export default function WorkflowSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 lg:py-28" style={{ background: "#F8FAFC" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Real AI Workflows</div>
            <h2 className="mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#0F172A", lineHeight: 1.2 }}>
              How AI Improves{" "}
              <span style={{ background: "linear-gradient(135deg, #0D9488, #16A34A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Daily Work
              </span>
            </h2>
            <p className="text-lg" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
              These are real workflows our participants use every day to save time and deliver better results. You'll build workflows like these in the program.
            </p>
          </div>
          <div className={`hidden lg:block transition-all duration-700 delay-200 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100" style={{ aspectRatio: "16/10" }}>
              <img src={WORKFLOW_IMAGE} alt="AI workflow diagram" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Workflow Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {workflows.map((wf, i) => (
            <div
              key={wf.title}
              className={`bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 ${inView ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold" style={{ fontFamily: "'Sora', sans-serif", color: "#0F172A", fontSize: "1rem" }}>
                  {wf.title}
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${wf.color}15`, color: wf.color, fontFamily: "'Sora', sans-serif" }}>
                  Saves {wf.timeSaved}
                </span>
              </div>

              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                {wf.desc}
              </p>

              {/* Workflow Steps */}
              <div className="flex items-center gap-2">
                {wf.steps.map((step, si) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${step.color}15` }}>
                          <Icon size={16} style={{ color: step.color }} />
                        </div>
                        <span className="text-xs font-medium text-center" style={{ color: "#64748B", fontFamily: "'Sora', sans-serif", fontSize: "0.65rem" }}>
                          {step.label}
                        </span>
                      </div>
                      {si < wf.steps.length - 1 && (
                        <ArrowRight size={12} style={{ color: "#CBD5E1", marginBottom: "14px" }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
