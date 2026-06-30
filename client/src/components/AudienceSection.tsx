import { User, Briefcase, Store, Users } from "lucide-react";

const audiences = [
  {
    icon: User,
    label: "For individuals",
    desc: "You want to use AI in your daily life and work but don't know where to start.",
    outcome: "Build practical AI skills you can use this week.",
    color: "#0D9488",
  },
  {
    icon: Briefcase,
    label: "For solopreneurs",
    desc: "You're building your business alone and you want AI to help you move faster.",
    outcome: "Save time, serve more clients, grow without burning out.",
    color: "#16A34A",
  },
  {
    icon: Store,
    label: "For business owners",
    desc: "You're ready to bring AI into your business — you just need the right strategy.",
    outcome: "Build an AI plan that works for your team and your goals.",
    color: "#D97706",
  },
  {
    icon: Users,
    label: "For teams and organisations",
    desc: "Your team needs structured, practical AI training that actually changes how they work.",
    outcome: "Upskill your team with programmes designed around real business workflows.",
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
        <div className="text-center mb-12" style={{ maxWidth: 580, margin: "0 auto 3rem" }}>
          <span className="section-label">Who it's for</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#111827", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
            Whoever you are, there's a place here for you.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#6B7280", lineHeight: 1.7 }}>
            UpskillinTech is built for people who want to use AI practically — whatever their starting point or background.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.label}
                className="card-modern rounded-2xl p-7"
                style={{ borderTop: `3px solid ${a.color}` }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-4"
                  style={{ width: 44, height: 44, background: `${a.color}14` }}
                >
                  <Icon size={22} style={{ color: a.color }} />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: a.color, marginBottom: "0.5rem" }}>
                  {a.label}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.65, marginBottom: "1rem" }}>
                  {a.desc}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#111827", lineHeight: 1.5, paddingTop: "0.75rem", borderTop: "1px solid #F3F4F6" }}>
                  {a.outcome}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a href="#programs" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#0D9488", textDecoration: "none" }}>
            Find your starting point →
          </a>
        </div>
      </div>
    </section>
  );
}
