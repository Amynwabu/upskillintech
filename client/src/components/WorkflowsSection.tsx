/**
 * WorkflowsSection — UpskillinTech v3
 * Design: Modern tabbed workflow explorer
 * - Left: vertical tab list with workflow titles and icons
 * - Right: active workflow detail with numbered steps, descriptions, and outcome badge
 * - Color: white card, green accent, yellow highlights, subtle shadow
 */
import { useState } from "react";
import {
  Users,
  Search,
  PenLine,
  BarChart3,
  ChevronRight,
  Zap,
  Clock,
  CheckCircle2,
} from "lucide-react";

const workflows = [
  {
    id: "meetings",
    icon: Users,
    title: "Meeting Intelligence",
    subtitle: "Turn every meeting into actionable outcomes",
    color: "#38B54A",
    steps: [
      {
        label: "Capture",
        title: "Record & Transcribe",
        desc: "Use AI tools like Otter.ai or Fireflies to automatically transcribe your meeting in real time.",
      },
      {
        label: "Summarise",
        title: "AI-Generated Summary",
        desc: "Prompt ChatGPT or Claude to extract key decisions, discussion points, and open questions from the transcript.",
      },
      {
        label: "Act",
        title: "Structured Action Plan",
        desc: "AI formats a prioritised action list with owners and deadlines — ready to share with your team immediately.",
      },
    ],
    outcome: "Save 45 min per meeting",
    tools: ["Otter.ai", "ChatGPT", "Notion AI"],
  },
  {
    id: "research",
    icon: Search,
    title: "Research & Reporting",
    subtitle: "From raw data to polished insights in minutes",
    color: "#8B9E1A",
    steps: [
      {
        label: "Gather",
        title: "Targeted Research",
        desc: "Use Perplexity AI or ChatGPT to rapidly gather information from multiple sources on any topic.",
      },
      {
        label: "Analyse",
        title: "AI-Powered Insights",
        desc: "Ask AI to identify patterns, contradictions, and key takeaways — turning raw information into structured insights.",
      },
      {
        label: "Deliver",
        title: "Professional Report",
        desc: "AI drafts a structured report with executive summary, findings, and recommendations in your preferred format.",
      },
    ],
    outcome: "3× faster research cycles",
    tools: ["Perplexity AI", "Claude", "Google Gemini"],
  },
  {
    id: "content",
    icon: PenLine,
    title: "Content Creation",
    subtitle: "From rough idea to polished final draft",
    color: "#E6B800",
    steps: [
      {
        label: "Ideate",
        title: "Concept & Outline",
        desc: "Describe your goal to an AI assistant — it generates a structured outline with angles, hooks, and key messages.",
      },
      {
        label: "Draft",
        title: "AI-Assisted Writing",
        desc: "Use the outline to generate a first draft. AI adapts tone, style, and length to your audience and platform.",
      },
      {
        label: "Refine",
        title: "Edit & Publish",
        desc: "Review and personalise the draft. AI checks for clarity, grammar, and consistency before final publication.",
      },
    ],
    outcome: "5× content output",
    tools: ["ChatGPT", "Jasper", "Grammarly AI"],
  },
  {
    id: "strategy",
    icon: BarChart3,
    title: "Strategic Decision-Making",
    subtitle: "AI-enhanced analysis for better decisions",
    color: "#38B54A",
    steps: [
      {
        label: "Define",
        title: "Frame the Challenge",
        desc: "Articulate the decision context to AI — it helps clarify assumptions, constraints, and success criteria.",
      },
      {
        label: "Analyse",
        title: "Scenario Analysis",
        desc: "AI generates multiple strategic scenarios, evaluates trade-offs, and surfaces risks you may not have considered.",
      },
      {
        label: "Decide",
        title: "Informed Recommendation",
        desc: "AI synthesises the analysis into a clear recommendation with supporting rationale — ready for stakeholder review.",
      },
    ],
    outcome: "Faster, better decisions",
    tools: ["Claude", "ChatGPT", "Notion AI"],
  },
];

export default function WorkflowsSection() {
  const [activeId, setActiveId] = useState("meetings");
  const active = workflows.find((w) => w.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <section className="py-24" style={{ background: "#F7F8FA" }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(56,181,74,0.10)", color: "#38B54A", fontFamily: "'Sora', sans-serif" }}
          >
            AI Workflows in Action
          </span>
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}
          >
            How Professionals Use AI
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}
          >
            Real AI workflows used in professional environments — ready to adapt and implement today.
          </p>
        </div>

        {/* Main layout: tab list + detail panel */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left: Tab list */}
          <div className="lg:w-72 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {workflows.map((wf) => {
              const Icon = wf.icon;
              const isActive = wf.id === activeId;
              return (
                <button
                  key={wf.id}
                  onClick={() => setActiveId(wf.id)}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all duration-200 flex-shrink-0 lg:flex-shrink w-full"
                  style={{
                    background: isActive ? "#ffffff" : "transparent",
                    border: isActive ? `2px solid ${wf.color}` : "2px solid transparent",
                    boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: isActive ? wf.color : "#E5E7EB" }}
                  >
                    <Icon size={18} color={isActive ? "#fff" : "#6B7280"} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-semibold text-sm leading-tight"
                      style={{ color: isActive ? "#1C1C1C" : "#6B7280" }}
                    >
                      {wf.title}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#9CA3AF" }}>
                      {wf.subtitle}
                    </p>
                  </div>
                  {isActive && (
                    <ChevronRight size={16} className="ml-auto flex-shrink-0" style={{ color: wf.color }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Detail panel */}
          <div
            className="flex-1 rounded-2xl p-8 lg:p-10"
            style={{
              background: "#ffffff",
              border: "1px solid #E5E7EB",
              boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
            }}
          >
            {/* Panel header */}
            <div className="flex items-start justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: active.color }}
                >
                  <ActiveIcon size={22} color="#fff" />
                </div>
                <div>
                  <h3
                    className="font-bold text-xl"
                    style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}
                  >
                    {active.title}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>
                    {active.subtitle}
                  </p>
                </div>
              </div>
              {/* Outcome badge */}
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0"
                style={{ background: "rgba(230,184,0,0.12)", border: "1px solid rgba(230,184,0,0.30)" }}
              >
                <Zap size={14} style={{ color: "#E6B800" }} />
                <span
                  className="text-xs font-bold"
                  style={{ color: "#B8920A", fontFamily: "'Sora', sans-serif" }}
                >
                  {active.outcome}
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {active.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Connector line */}
                  {idx < active.steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-5 left-full w-5 h-0.5 z-10"
                      style={{ background: `linear-gradient(to right, ${active.color}, #E6B800)` }}
                    />
                  )}
                  <div
                    className="rounded-xl p-5 h-full"
                    style={{
                      background: "#F9FAFB",
                      border: `1px solid #E5E7EB`,
                    }}
                  >
                    {/* Step number + label */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: active.color }}
                      >
                        {idx + 1}
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: active.color, fontFamily: "'Sora', sans-serif" }}
                      >
                        {step.label}
                      </span>
                    </div>
                    <h4
                      className="font-semibold text-sm mb-2"
                      style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer: tools + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6"
              style={{ borderTop: "1px solid #F3F4F6" }}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} style={{ color: "#9CA3AF" }} />
                  <span className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>
                    Tools used:
                  </span>
                </div>
                {active.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: "rgba(56,181,74,0.08)",
                      color: "#38B54A",
                      border: "1px solid rgba(56,181,74,0.20)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <a
                href="/resources/workflows"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
                style={{ color: active.color, fontFamily: "'Sora', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <CheckCircle2 size={15} />
                See full workflow library
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="/programs"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm transition-all"
            style={{ background: "#38B54A", color: "#fff", fontFamily: "'Sora', sans-serif", boxShadow: "0 4px 16px rgba(56,181,74,0.30)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2ea043")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#38B54A")}
          >
            Learn to Build Your Own AI Workflows
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
