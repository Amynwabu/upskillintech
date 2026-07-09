import { User, Briefcase, Store, Users, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: User,
    label: "Individuals",
    desc: "Use AI for writing, planning, research, and daily productivity.",
    useCases: [
      "Write clearer emails and documents",
      "Plan your week and manage tasks",
      "Research and summarise faster",
    ],
    cta: "Start with Everyday AI",
    href: "#programs",
  },
  {
    icon: Briefcase,
    label: "Solopreneurs",
    desc: "Create content, manage clients, and automate admin with AI.",
    useCases: [
      "Create a month of content in one session",
      "Draft proposals and client messages",
      "Automate onboarding and follow-ups",
    ],
    cta: "Explore AI for Solopreneurs",
    href: "#programs",
  },
  {
    icon: Store,
    label: "Business Owners",
    desc: "Apply AI to marketing, customer service, and business reporting.",
    useCases: [
      "Automate customer enquiries",
      "Create marketing content and ad copy",
      "Analyse sales data and reports",
    ],
    cta: "Explore AI for Business Owners",
    href: "#programs",
  },
  {
    icon: Users,
    label: "Teams",
    desc: "Train your people and adopt AI safely across your organisation.",
    useCases: [
      "Run structured AI training",
      "Redesign workflows with automation",
      "Build safe use policies",
    ],
    cta: "Explore Team AI Adoption",
    href: "/enterprise",
  },
];

export default function AudienceSection() {
  return (
    <section
      id="who-its-for"
      aria-label="Who UpskillinTech is for"
      className="section-py"
      style={{ background: "#f4f4f4" }}
    >
      <div className="container">
        <div className="text-center mb-12" style={{ maxWidth: 640, margin: "0 auto 3rem" }}>
          <span className="section-label">Who It Is For</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "2.25rem", color: "#111111", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
            AI skills that fit your life, your work, and your goals.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", color: "#111111", lineHeight: 1.7 }}>
            Practical AI adoption for individuals, solopreneurs, business owners, and teams.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.label}
                className="rounded-2xl p-7 flex flex-col"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e2e2",
                  borderTop: "3px solid #2ecc71",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-4"
                  style={{ width: 44, height: 44, background: "rgba(46,204,113,0.12)" }}
                >
                  <Icon size={22} style={{ color: "#2ecc71" }} />
                </div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#111111", marginBottom: "0.5rem" }}>
                  {a.label}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#111111", lineHeight: 1.65, marginBottom: "1rem" }}>
                  {a.desc}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.25rem", flex: 1 }}>
                  {a.useCases.map((uc) => (
                    <li key={uc} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ecc71", display: "inline-block", flexShrink: 0, marginTop: "0.5rem" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#111111", lineHeight: 1.5 }}>{uc}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={a.href}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.375rem",
                    fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem",
                    color: "#111111", textDecoration: "none", marginTop: "auto",
                    paddingTop: "0.75rem", borderTop: "1px solid #e2e2e2",
                  }}
                >
                  {a.cta} <ArrowRight size={13} style={{ color: "#2ecc71" }} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
