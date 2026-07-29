import { Layers, Compass, Shuffle, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Layers,
    color: "#859D30",
    title: "There are hundreds of AI tools. Which ones matter?",
    desc: "Most people try 3–5 tools, get confused, and give up — before they've seen what AI can actually do for them.",
  },
  {
    icon: Compass,
    color: "#859D30",
    title: "Nobody explains where to actually begin.",
    desc: "Generic advice doesn't account for your work, your business, or your goals. You need a starting point that's specific to you.",
  },
  {
    icon: Shuffle,
    color: "#859D30",
    title: "You've tried AI, but nothing has really stuck.",
    desc: "Without structure, most people end up using AI for the same two things. It never becomes a real part of how they work.",
  },
  {
    icon: TrendingDown,
    color: "#859D30",
    title: "You know AI is useful — you just haven't felt it yet.",
    desc: "Confidence comes from practice and guidance, not from watching more YouTube videos. You need a clear path, not more content.",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="why-people-struggle"
      aria-label="Why people struggle with AI"
      className="section-py"
      style={{ background: "#F3F1EE" }}
    >
      <div className="container">
        <div className="text-center mb-14" style={{ maxWidth: 560, margin: "0 auto 3.5rem" }}>
          <span className="section-label">The real problem</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#F3F4F6", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
            Sound familiar? You're not alone.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#9CA3AF", lineHeight: 1.7 }}>
            Most people struggle with AI for the same four reasons. Here's what's really going on — and how we help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="card-modern rounded-2xl p-7"
                style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}
              >
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: 48, height: 48, background: `${p.color}12` }}
                >
                  <Icon size={24} style={{ color: p.color }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F3F4F6", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#9CA3AF", lineHeight: 1.7 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a href="#adoption-journey" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#859D30", textDecoration: "none" }}>
            Here's how we help →
          </a>
        </div>
      </div>
    </section>
  );
}
