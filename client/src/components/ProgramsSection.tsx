/**
 * ProgramsSection — UpskillinTech v3
 * White bg, 4 large program cards, bold headings, richer descriptions, green top border
 */
import { Briefcase, BookOpen, Users, Zap, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Briefcase,
    color: "#38B54A",
    bg: "rgba(56,181,74,0.10)",
    title: "AI-Enabled Professional",
    subtitle: "For Working Professionals",
    desc: "Learn to integrate AI tools into your daily work — from writing and analysis to decision-making and client communication.",
    outcomes: ["Save 5–10 hrs/week", "AI-powered workflows", "Practical certification"],
  },
  {
    icon: BookOpen,
    color: "#8B9E1A",
    bg: "rgba(139,158,26,0.10)",
    title: "AI Foundations",
    subtitle: "For Beginners",
    desc: "Start your AI journey with a structured, beginner-friendly programme that builds real confidence with AI tools from day one.",
    outcomes: ["No prior experience needed", "Hands-on projects", "Community support"],
  },
  {
    icon: Users,
    color: "#38B54A",
    bg: "rgba(56,181,74,0.10)",
    title: "AI Leadership",
    subtitle: "For Educators & Leaders",
    desc: "Designed for pastors, educators, and community leaders who want to lead AI adoption and inspire others to embrace the future.",
    outcomes: ["Lead AI strategy", "Inspire your team", "Community impact"],
  },
  {
    icon: Zap,
    color: "#E6B800",
    bg: "rgba(230,184,0,0.12)",
    title: "AI Automation & Workflows",
    subtitle: "For Productivity Seekers",
    desc: "Build powerful AI-powered productivity systems that automate repetitive tasks and free up your time for high-value work.",
    outcomes: ["Automate repetitive tasks", "Custom AI workflows", "ROI-focused results"],
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="section-py" style={{ background: "#ffffff" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-5">Our Programmes</span>
          <h2 className="mt-4 mb-4">
            UpskillinTech <span style={{ color: "#38B54A" }}>Programs</span>
          </h2>
          <div className="flex justify-center gap-1.5 mb-5">
            <div style={{ width: 64, height: 4, background: "#38B54A", borderRadius: 2 }} />
            <div style={{ width: 32, height: 4, background: "#E6B800", borderRadius: 2 }} />
          </div>
          <p className="max-w-2xl mx-auto" style={{ fontSize: "1.15rem", color: "#6B7280" }}>
            Structured learning paths designed for real-world results — not just certificates.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-12">
          {programs.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl p-7 flex flex-col transition-all duration-200"
                style={{
                  background: "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderTop: `4px solid ${p.color}`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(56,181,74,0.16)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: p.bg }}>
                  <Icon size={28} style={{ color: p.color }} />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: p.color }}>
                  {p.subtitle}
                </div>
                <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>{p.title}</h3>
                <p className="mb-5 flex-1" style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#6B7280" }}>{p.desc}</p>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2" style={{ fontSize: "0.875rem", color: "#374151" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.color, display: "inline-block", flexShrink: 0 }} />
                      {o}
                    </li>
                  ))}
                </ul>
                <a
                  href="/programs"
                  className="flex items-center gap-1.5 font-semibold text-sm mt-auto"
                  style={{ color: p.color, textDecoration: "none", fontFamily: "'Sora', sans-serif" }}
                >
                  Learn More <ArrowRight size={15} />
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a href="/programs" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}>
            Explore All Programs
          </a>
        </div>
      </div>
    </section>
  );
}
