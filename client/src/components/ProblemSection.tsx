/**
 * ProblemSection — UpskillinTech v3
 * White background, 4 large icon cards, bold headings, larger text
 */
import { Settings, GitBranch, FlaskConical, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Settings,
    color: "#38B54A",
    bg: "rgba(56,181,74,0.10)",
    title: "Too Many Tools",
    desc: "Thousands of AI tools exist with no clear starting point — professionals feel overwhelmed before they even begin.",
  },
  {
    icon: GitBranch,
    color: "#E6B800",
    bg: "rgba(230,184,0,0.12)",
    title: "No Clear Workflow",
    desc: "Most people experiment randomly without structured systems, wasting hours on tools that don't connect.",
  },
  {
    icon: FlaskConical,
    color: "#38B54A",
    bg: "rgba(56,181,74,0.10)",
    title: "Random Experimentation",
    desc: "AI becomes trial-and-error instead of a productivity engine — leading to frustration, not results.",
  },
  {
    icon: TrendingDown,
    color: "#E6B800",
    bg: "rgba(230,184,0,0.12)",
    title: "No Real Productivity Gains",
    desc: "Without the right approach, AI creates more confusion than clarity — and professionals fall further behind.",
  },
];

export default function ProblemSection() {
  return (
    <section className="section-py" style={{ background: "#ffffff" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-5">The Problem</span>
          <h2 className="mt-4 mb-5">
            Why Most Professionals<br />
            <span style={{ color: "#38B54A" }}>Struggle With AI</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ fontSize: "1.15rem", color: "#6B7280" }}>
            We don't just teach AI tools. We help you integrate AI into real work — with structure, strategy, and measurable results.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="card-modern rounded-2xl p-8 text-center"
              >
                <div
                  className="w-18 h-18 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ width: 72, height: 72, background: p.bg }}
                >
                  <Icon size={34} style={{ color: p.color }} />
                </div>
                <h3 className="mb-3" style={{ fontSize: "1.2rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.975rem", lineHeight: 1.7, color: "#6B7280" }}>{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a href="/programs" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}>
            See How We Solve This
          </a>
        </div>
      </div>
    </section>
  );
}
