import { Clock, FileText, BarChart2, Users, Repeat, Inbox } from "lucide-react";

const cases = [
  {
    icon: FileText,
    who: "A solopreneur",
    task: "drafts client proposals",
    outcome: "in 20 minutes instead of two hours.",
    color: "#0D9488",
  },
  {
    icon: Clock,
    who: "A business owner",
    task: "turns meeting notes into action items and follow-up emails",
    outcome: "automatically, with no manual write-up.",
    color: "#16A34A",
  },
  {
    icon: BarChart2,
    who: "A working professional",
    task: "researches a topic, summarises long reports, and preps for a presentation",
    outcome: "in a fraction of the usual time.",
    color: "#D97706",
  },
  {
    icon: Users,
    who: "A team leader",
    task: "creates a first draft of their team's onboarding documents",
    outcome: "from a quick briefing note, not from scratch.",
    color: "#7C3AED",
  },
  {
    icon: Repeat,
    who: "A content creator",
    task: "repurposes one piece of content into five formats",
    outcome: "for LinkedIn, email, Instagram, a blog, and a short video script.",
    color: "#0D9488",
  },
  {
    icon: Inbox,
    who: "An individual",
    task: "manages their inbox, plans their week, and tracks key tasks",
    outcome: "using AI to stay on top of things without the overwhelm.",
    color: "#16A34A",
  },
];

export default function UseCasesSection() {
  return (
    <section
      id="use-cases"
      aria-label="Everyday AI use cases"
      className="section-py"
      style={{ background: "white" }}
    >
      <div className="container">
        <div className="text-center mb-14" style={{ maxWidth: 600, margin: "0 auto 3.5rem" }}>
          <span className="section-label">Everyday AI</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#111827", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
            What can you actually do with AI?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#6B7280", lineHeight: 1.7 }}>
            Not theory. Not demos. Real tasks that real people do every day — made faster, easier, and better with AI.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{ background: "#F9F8F6", border: "1px solid #E5E7EB" }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-4"
                  style={{ width: 40, height: 40, background: `${c.color}12` }}
                >
                  <Icon size={20} style={{ color: c.color }} />
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#111827", lineHeight: 1.65 }}>
                  <strong style={{ fontWeight: 600 }}>{c.who}</strong>{" "}
                  <span style={{ color: "#374151" }}>{c.task} — </span>
                  <span style={{ color: c.color, fontWeight: 600 }}>{c.outcome}</span>
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href="#programs"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#0D9488", textDecoration: "none" }}
          >
            Learn how in our programmes →
          </a>
        </div>
      </div>
    </section>
  );
}
