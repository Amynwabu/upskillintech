import { User, Briefcase, Store, Users, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: User,
    label: "Individuals",
    tagline: "Everyday AI for everyday life",
    desc: "Use AI for emails, planning, learning, research, budgeting, writing, and daily productivity.",
    useCases: [
      "Write clearer emails and messages",
      "Plan your week and manage tasks",
      "Research topics and summarise content",
      "Budget and organise personal finances",
      "Learn anything faster with AI support",
    ],
    cta: "Start with Everyday AI",
    href: "#programs",
    color: "#439288",
  },
  {
    icon: Briefcase,
    label: "Solopreneurs",
    tagline: "Grow your business without burning out",
    desc: "Use AI to create content, manage clients, package offers, automate admin, and grow with less overwhelm.",
    useCases: [
      "Create a month of content in one session",
      "Draft proposals and client messages",
      "Build and automate your onboarding",
      "Manage your inbox and follow-ups",
      "Package and price your services",
    ],
    cta: "Explore AI for Solopreneurs",
    href: "#programs",
    color: "#16A34A",
  },
  {
    icon: Store,
    label: "Business Owners",
    tagline: "Smarter operations, faster growth",
    desc: "Use AI for marketing, customer service, reports, operations, sales follow-up, and smarter business decisions.",
    useCases: [
      "Automate customer enquiries and responses",
      "Create marketing content and ad copy",
      "Analyse sales data and business reports",
      "Build AI-powered sales follow-up sequences",
      "Train staff to use AI safely and effectively",
    ],
    cta: "Explore AI for Business Owners",
    href: "#programs",
    color: "#D97706",
  },
  {
    icon: Users,
    label: "Teams & Organisations",
    tagline: "Build an AI-ready team",
    desc: "Train your people, redesign workflows, adopt AI safely, and build internal AI confidence across your organisation.",
    useCases: [
      "Run structured AI training for your team",
      "Redesign workflows with AI automation",
      "Develop an AI adoption strategy",
      "Build AI governance and safe use policies",
      "Support churches, charities, and community groups",
    ],
    cta: "Explore Team AI Adoption",
    href: "/enterprise",
    color: "#7C3AED",
  },
];

export default function AudienceSection() {
  return (
    <section
      id="who-its-for"
      aria-label="Who UpskillinTech is for"
      className="section-py"
      style={{ background: "#F3F1EE" }}
    >
      <div className="container">
        <div className="text-center mb-12" style={{ maxWidth: 600, margin: "0 auto 3rem" }}>
          <span className="section-label">Built for Real Professionals</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#F3F4F6", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
            AI skills that fit your life, your work, your goals.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#9CA3AF", lineHeight: 1.7 }}>
            Whether you are a professional, a solopreneur or leading a distributed team,
            UpskillinTech helps you apply AI to real work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.label}
                className="card-modern rounded-2xl p-7 flex flex-col"
                style={{ borderTop: `3px solid ${a.color}` }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-4"
                  style={{ width: 44, height: 44, background: `${a.color}14` }}
                >
                  <Icon size={22} style={{ color: a.color }} />
                </div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: a.color, marginBottom: "0.25rem" }}>
                  {a.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#9CA3AF", marginBottom: "0.75rem" }}>
                  {a.tagline}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#D1D5DB", lineHeight: 1.65, marginBottom: "1rem" }}>
                  {a.desc}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.25rem", flex: 1 }}>
                  {a.useCases.map((uc) => (
                    <li key={uc} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, display: "inline-block", flexShrink: 0, marginTop: "0.4rem" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "#D1D5DB", lineHeight: 1.5 }}>{uc}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={a.href}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.375rem",
                    fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.8125rem",
                    color: a.color, textDecoration: "none", marginTop: "auto",
                    paddingTop: "0.75rem", borderTop: "1px solid #F3F4F6",
                  }}
                >
                  {a.cta} <ArrowRight size={13} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
