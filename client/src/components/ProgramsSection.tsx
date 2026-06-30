/**
 * ProgramsSection — UpskillinTech v3
 * White bg, 4 large program cards, bold headings, richer descriptions, green top border
 */
import { Briefcase, BookOpen, Users, Zap, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    color: "#0D9488",
    bg: "rgba(13,148,136,0.10)",
    title: "AI Starter Bootcamp",
    subtitle: "For Beginners",
    desc: "Understand AI and start using it confidently — with no technical background required. Build practical skills from day one.",
    outcomes: ["No prior experience needed", "Hands-on tools & prompts", "Community support"],
  },
  {
    icon: Briefcase,
    color: "#16A34A",
    bg: "rgba(22,163,74,0.10)",
    title: "AI Productivity for Everyday Work",
    subtitle: "For Professionals & Individuals",
    desc: "Use AI for emails, planning, writing, research, documents, and presentations — and save hours every single week.",
    outcomes: ["Save 5–10 hrs/week", "Real workflow practice", "Practical certification"],
  },
  {
    icon: Zap,
    color: "#D97706",
    bg: "rgba(217,119,6,0.10)",
    title: "AI Automation Sprint",
    subtitle: "For Solopreneurs & Business Owners",
    desc: "Automate repetitive tasks, customer communication, content workflows, and business admin — using tools you already have.",
    outcomes: ["Automate client workflows", "Save hours every week", "ROI-focused results"],
  },
  {
    icon: Users,
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.10)",
    title: "AI Adoption for Leaders & Teams",
    subtitle: "For Business Owners, Churches & Organisations",
    desc: "Structured AI adoption for teams — covering training, workflow redesign, governance, and safe, responsible implementation.",
    outcomes: ["Team-wide AI confidence", "Custom adoption roadmap", "Safe AI governance"],
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="section-py" style={{ background: "#ffffff" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-5">Programmes &amp; Bootcamps</span>
          <h2 className="mt-4 mb-4">
            Find your <span style={{ color: "#0D9488" }}>AI adoption path</span>
          </h2>
          <div className="flex justify-center gap-1.5 mb-5">
            <div style={{ width: 64, height: 4, background: "#0D9488", borderRadius: 2 }} />
            <div style={{ width: 32, height: 4, background: "#E6B800", borderRadius: 2 }} />
          </div>
          <p className="max-w-2xl mx-auto" style={{ fontSize: "1.15rem", color: "#6B7280" }}>
            Practical AI adoption programmes for every starting point — from complete beginner to team-wide implementation.
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
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(13,148,136,0.16)";
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
