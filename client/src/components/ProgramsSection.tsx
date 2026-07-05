/**
 * ProgramsSection — UpskillinTech v4 "Evergreen"
 * Four scannable programme cards on white: level tag, one-line promise,
 * three outcomes, single accent color.
 */
import { Briefcase, BookOpen, Users, Zap, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    level: "Beginner",
    title: "AI Foundations",
    desc: "Understand AI and start using it confidently — no technical background required.",
    outcomes: ["No prior experience needed", "Hands-on tools & prompts", "Community support"],
  },
  {
    icon: Briefcase,
    level: "Professional",
    title: "AI-Enabled Professional",
    desc: "Apply AI to emails, documents, research, and presentations — and reclaim hours every week.",
    outcomes: ["Save 5–10 hours a week", "Real workflow practice", "Practical certification"],
  },
  {
    icon: Zap,
    level: "Live sessions",
    title: "Webinars & Masterclasses",
    desc: "Live, practical sessions on AI tools, workflows, and productivity strategies.",
    outcomes: ["Live & recorded sessions", "Real case studies", "Free for members"],
  },
  {
    icon: Users,
    level: "Leadership",
    title: "AI Leadership",
    desc: "Structured AI adoption for teams — training, workflow redesign, and governance.",
    outcomes: ["Team-wide AI confidence", "Custom adoption roadmap", "Safe AI governance"],
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="section-py" style={{ background: "#FFFFFF" }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: 640, margin: "0 auto 4rem", textAlign: "center" }}>
          <span className="section-label">Programmes</span>
          <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            A clear path from first prompt to confident adoption
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#5D6B60", lineHeight: 1.7 }}>
            Four structured programmes, each matched to a stage of the journey. Start where
            you are — every programme is practical from day one.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {programs.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="card-modern p-7 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ background: "#E9F5E2" }}
                  >
                    <Icon size={21} style={{ color: "#2E7B20" }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#2E7B20",
                      background: "#F5FAF2",
                      border: "1px solid #D2EBC5",
                      borderRadius: "99px",
                      padding: "0.25rem 0.7rem",
                    }}
                  >
                    {p.level}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.6rem" }}>{p.title}</h3>
                <p className="flex-1" style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#3E4A41", marginBottom: "1.25rem" }}>
                  {p.desc}
                </p>
                <ul className="flex flex-col gap-2 mb-6" style={{ paddingTop: "1rem", borderTop: "1px solid #EDF2EC" }}>
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5" style={{ fontSize: "0.85rem", color: "#5D6B60", lineHeight: 1.5 }}>
                      <span
                        aria-hidden="true"
                        style={{ width: 5, height: 5, borderRadius: "50%", background: "#50B040", display: "inline-block", flexShrink: 0, marginTop: "0.5rem" }}
                      />
                      {o}
                    </li>
                  ))}
                </ul>
                <a
                  href="/programs"
                  className="flex items-center gap-1.5 mt-auto"
                  style={{ color: "#2E7B20", textDecoration: "none", fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.85rem" }}
                >
                  Learn more <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a href="/programs" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2.25rem" }}>
            Explore All Programmes
          </a>
        </div>
      </div>
    </section>
  );
}
