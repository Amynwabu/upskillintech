/**
 * ProgramsSection — four concise programme cards, brand green accents
 */
import { Briefcase, BookOpen, Users, Zap, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "AI Foundations",
    subtitle: "For Beginners",
    desc: "Understand AI and start using it confidently, with no technical background required.",
    outcomes: ["No prior experience needed", "Hands-on practice", "Community support"],
  },
  {
    icon: Briefcase,
    title: "AI-Enabled Professional",
    subtitle: "For Professionals and Individuals",
    desc: "Use AI for emails, planning, writing, research, and presentations to save hours every week.",
    outcomes: ["Real workflow practice", "Practical certification", "Weekly time savings"],
  },
  {
    icon: Zap,
    title: "Webinars and Masterclasses",
    subtitle: "For Solopreneurs and Business Owners",
    desc: "Live, practical sessions on AI productivity tools, workflows, and strategies.",
    outcomes: ["Live and recorded sessions", "Real case studies", "Free for members"],
  },
  {
    icon: Users,
    title: "AI Leadership",
    subtitle: "For Business Owners and Organisations",
    desc: "Structured AI adoption for teams: training, workflow redesign, and safe implementation.",
    outcomes: ["Team-wide AI confidence", "Custom adoption roadmap", "Safe AI governance"],
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="section-py" style={{ background: "#0d1117" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-5">Structured Programmes</span>
          <h2 className="mt-4 mb-4">
            The right programme for <span style={{ color: "#2ecc71" }}>where you are now</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ fontSize: "1.125rem", color: "#D1D5DB" }}>
            Structured learning paths from AI Foundations to AI Leadership.
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
                  background: "#161b22",
                  border: "1px solid #1F2937",
                  borderTop: "4px solid #2ecc71",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(46,204,113,0.16)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(46,204,113,0.10)" }}>
                  <Icon size={28} style={{ color: "#2ecc71" }} />
                </div>
                <div className="font-bold uppercase tracking-wider mb-2" style={{ color: "#2ecc71", fontSize: "0.875rem" }}>
                  {p.subtitle}
                </div>
                <h3 className="mb-3" style={{ fontSize: "1.3rem" }}>{p.title}</h3>
                <p className="mb-5 flex-1" style={{ fontSize: "1rem", lineHeight: 1.7, color: "#D1D5DB" }}>{p.desc}</p>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2" style={{ fontSize: "1rem", color: "#D1D5DB" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2ecc71", display: "inline-block", flexShrink: 0 }} />
                      {o}
                    </li>
                  ))}
                </ul>
                <a
                  href="/programs"
                  className="flex items-center gap-1.5 font-semibold mt-auto"
                  style={{ color: "#2ecc71", textDecoration: "none", fontFamily: "'Sora', sans-serif", fontSize: "1rem" }}
                >
                  Learn More <ArrowRight size={15} />
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a href="/programs" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}>
            Explore All Programmes
          </a>
        </div>
      </div>
    </section>
  );
}
