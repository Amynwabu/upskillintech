/**
 * AudienceSection — UpskillinTech v4 "Evergreen"
 * "Built for how you work": four concise cards, one brand color,
 * three concrete outcomes each.
 */
import { User, Briefcase, Store, Users, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: User,
    label: "Professionals",
    desc: "Save hours every week on emails, reports, research, and planning.",
    useCases: [
      "Write clearer emails and documents",
      "Summarise research and long reports",
      "Plan your week and manage tasks",
    ],
    href: "#programs",
  },
  {
    icon: Briefcase,
    label: "Solopreneurs",
    desc: "Grow your business without hiring — content, clients, and admin handled.",
    useCases: [
      "Create a month of content in one session",
      "Draft proposals and client messages",
      "Automate onboarding and follow-ups",
    ],
    href: "#programs",
  },
  {
    icon: Store,
    label: "Business Owners",
    desc: "Run smarter operations across marketing, sales, and customer service.",
    useCases: [
      "Automate customer enquiries",
      "Analyse sales data and reports",
      "Train staff to use AI safely",
    ],
    href: "#programs",
  },
  {
    icon: Users,
    label: "Organisations",
    desc: "Build an AI-ready team with structured training and clear governance.",
    useCases: [
      "Role-specific team training",
      "Workflow redesign and automation",
      "AI adoption strategy and safe-use policy",
    ],
    href: "/enterprise",
  },
];

export default function AudienceSection() {
  return (
    <section
      id="who-its-for"
      aria-label="Who UpskillinTech is for"
      className="section-py"
      style={{ background: "#FFFFFF" }}
    >
      <div className="container">
        <div style={{ maxWidth: 640, margin: "0 auto 4rem", textAlign: "center" }}>
          <span className="section-label">Who it's for</span>
          <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            Built for how you actually work
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#5D6B60", lineHeight: 1.7 }}>
            Whether you're in Lagos, London, or anywhere in between — the starting point is
            your real work, not the technology.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.label} className="card-modern p-7 flex flex-col">
                <div
                  className="flex items-center justify-center rounded-lg mb-5"
                  style={{ width: 44, height: 44, background: "#E9F5E2" }}
                >
                  <Icon size={21} style={{ color: "#2E7B20" }} />
                </div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: "0.6rem" }}>{a.label}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#3E4A41", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                  {a.desc}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.5rem", flex: 1 }}>
                  {a.useCases.map((uc) => (
                    <li key={uc} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <span
                        aria-hidden="true"
                        style={{ width: 5, height: 5, borderRadius: "50%", background: "#50B040", display: "inline-block", flexShrink: 0, marginTop: "0.5rem" }}
                      />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#5D6B60", lineHeight: 1.55 }}>{uc}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={a.href}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.375rem",
                    fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.85rem",
                    color: "#2E7B20", textDecoration: "none", marginTop: "auto",
                  }}
                >
                  See your path <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
