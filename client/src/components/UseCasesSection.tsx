import {
  Mail, Calendar, PenLine, Search, BarChart2, Users,
  Repeat, Inbox, MonitorSmartphone, FileText, BookOpen, Church,
} from "lucide-react";

const cases = [
  {
    icon: Mail,
    title: "AI for Emails",
    outcome: "Write clearer replies, follow-ups, proposals, and customer messages in minutes.",
    color: "#859D30",
  },
  {
    icon: PenLine,
    title: "AI for Social Media Content",
    outcome: "Build a full content calendar and write posts in your voice — weeks of content in one session.",
    color: "#859D30",
  },
  {
    icon: FileText,
    title: "AI for Business Admin",
    outcome: "Draft proposals, invoices, SOPs, and reports without starting from a blank page.",
    color: "#859D30",
  },
  {
    icon: Users,
    title: "AI for Customer Service",
    outcome: "Respond faster, personalise messages, and handle common enquiries automatically.",
    color: "#859D30",
  },
  {
    icon: BarChart2,
    title: "AI for Excel & Data",
    outcome: "Analyse spreadsheets, spot trends, and turn numbers into clear summaries without formulas.",
    color: "#859D30",
  },
  {
    icon: MonitorSmartphone,
    title: "AI for Presentations",
    outcome: "Turn a brief into a structured slide deck with key messages and speaker notes in minutes.",
    color: "#859D30",
  },
  {
    icon: Search,
    title: "AI for Research",
    outcome: "Gather information, summarise long documents, and compare sources at speed.",
    color: "#859D30",
  },
  {
    icon: Calendar,
    title: "AI for Meetings & Notes",
    outcome: "Transcribe, summarise, and turn meeting notes into action plans automatically.",
    color: "#859D30",
  },
  {
    icon: Inbox,
    title: "AI for Personal Planning",
    outcome: "Plan your week, track goals, organise tasks, and stay on top of life without the overwhelm.",
    color: "#859D30",
  },
  {
    icon: Repeat,
    title: "AI for Solopreneur Workflows",
    outcome: "Automate client onboarding, content creation, and follow-ups so you can focus on delivery.",
    color: "#859D30",
  },
  {
    icon: BookOpen,
    title: "AI for Small Business Marketing",
    outcome: "Create campaigns, write ad copy, design visuals, and reach more customers with less effort.",
    color: "#859D30",
  },
  {
    icon: Church,
    title: "AI for Churches & Community Groups",
    outcome: "Write sermons, newsletters, event plans, and community communications faster and more consistently.",
    color: "#859D30",
  },
];

export default function UseCasesSection() {
  return (
    <section
      id="use-cases"
      aria-label="What you can do with AI"
      className="section-py"
      style={{ background: "#07100B" }}
    >
      <div className="container">
        <div className="text-center mb-14" style={{ maxWidth: 620, margin: "0 auto 3.5rem" }}>
          <span className="section-label">What You Can Actually Do With AI</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#F3F4F6", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
            Real tasks. Real results. No jargon.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#9CA3AF", lineHeight: 1.7 }}>
            Not theory. Not demos. Practical outcomes that individuals, solopreneurs, business owners, and teams achieve every day with AI.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-2xl p-5"
                style={{ background: "#07100B", border: "1px solid #1F2937" }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-3"
                  style={{ width: 38, height: 38, background: `${c.color}12` }}
                >
                  <Icon size={18} style={{ color: c.color }} />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#F3F4F6", marginBottom: "0.5rem" }}>
                  {c.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8375rem", color: "#9CA3AF", lineHeight: 1.6 }}>
                  {c.outcome}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href="#programs"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#859D30", textDecoration: "none" }}
          >
            Learn how in our programmes →
          </a>
        </div>
      </div>
    </section>
  );
}
