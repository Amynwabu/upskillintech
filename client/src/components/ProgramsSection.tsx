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
    title: "AI Foundations",
    subtitle: "For Beginners",
    desc: "Understand AI and start using it confidently — with no technical background required. Build practical skills from day one using the C.L.E.A.R. prompting framework.",
    outcomes: ["No prior experience needed", "Hands-on tools & prompts", "Community support"],
  },
  {
    icon: Briefcase,
    color: "#16A34A",
    bg: "rgba(22,163,74,0.10)",
    title: "AI-Enabled Professional",
    subtitle: "For Professionals & Individuals",
    desc: "Use AI for emails, planning, writing, research, documents, and presentations — and save hours every single week. Think. Create. Build. Grow.",
    outcomes: ["Save 5–10 hrs/week", "Real workflow practice", "Practical certification"],
  },
  {
    icon: Zap,
    color: "#D97706",
    bg: "rgba(217,119,6,0.10)",
    title: "Webinars & Masterclasses",
    subtitle: "For Solopreneurs & Business Owners",
    desc: "Live, practical sessions on AI tools, workflows, and productivity strategies — from the UpskillinTech team and guest practitioners.",
    outcomes: ["Live & recorded sessions", "Real case studies", "Free for members"],
  },
  {
    icon: Users,
    color: "#0D9488",
    bg: "rgba(13,148,136,0.10)",
    title: "AI Leadership",
    subtitle: "For Business Owners & Organisations",
    desc: "Structured AI adoption for teams — covering training, workflow redesign, governance, and safe, responsible implementation across your organisation.",
    outcomes: ["Team-wide AI confidence", "Custom adoption roadmap", "Safe AI governance"],
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="section-py" style={{ background: "#151B23" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-5">Structured Programmes</span>
          <h2 className="mt-4 mb-4">
            The right programme for <span style={{ color: "#0D9488" }}>where you are now</span>
          </h2>
          <div className="flex justify-center gap-1.5 mb-5">
            <div style={{ width: 64, height: 4, background: "#0D9488", borderRadius: 2 }} />
            <div style={{ width: 32, height: 4, background: "#E6B800", borderRadius: 2 }} />
          </div>
          <p className="max-w-2xl mx-auto" style={{ fontSize: "1.15rem", color: "#9CA3AF" }}>
            From AI Foundations to AI Leadership — structured learning paths designed for professionals in Nigeria, the UK, and across the diaspora.
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
                  background: "#151B23",
                  border: "1px solid #1F2937",
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
                <p className="mb-5 flex-1" style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#9CA3AF" }}>{p.desc}</p>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2" style={{ fontSize: "0.875rem", color: "#D1D5DB" }}>
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
