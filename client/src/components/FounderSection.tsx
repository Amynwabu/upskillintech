/**
 * FounderSection — UpskillinTech v3.1
 * Mission framing: Positions the founder as the voice behind the independent
 * AI awareness platform — researcher, educator, and thought leader.
 * White background, split layout: photo left, bio right
 * Typography: Sora headings, DM Sans body
 */
const FOUNDER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/founder-portrait-g2gj6Gs4zs3JeXJbWqWTy7.webp";

const expertise = ["AI Research", "Robotics", "Technology Literacy", "Workflow Automation", "AI Adoption", "Public Engagement"];

export default function FounderSection() {
  return (
    <section className="section-py" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Left: Founder photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  maxWidth: 360,
                  width: "100%",
                  boxShadow: "0 24px 64px rgba(13,148,136,0.18)",
                  border: "3px solid rgba(13,148,136,0.20)",
                }}
              >
                <img
                  src={FOUNDER_IMG}
                  alt="Dr. Amaka Adiuku, Founder of UpskillinTech"
                  className="w-full h-auto"
                  style={{ display: "block" }}
                />
              </div>
              {/* Floating credential badge */}
              <div
                className="absolute -bottom-5 -right-5 rounded-2xl px-5 py-4 text-center"
                style={{ background: "#0D9488", boxShadow: "0 8px 24px rgba(13,148,136,0.35)" }}
              >
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#ffffff" }}>PhD</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>AI &amp; Robotics</div>
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <span className="section-label mb-5">The Voice Behind the Platform</span>
            <h2 className="mt-4 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              Insights Grounded in{" "}
              <span style={{ background: "linear-gradient(135deg, #0D9488, #38B54A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Real Research
              </span>
            </h2>
            <p className="font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#0D9488", fontSize: "1.2rem" }}>
              Dr. Amaka Adiuku
            </p>
            <p className="mb-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#6B7280" }}>
              AI Researcher · Lecturer · Educator · Technology Literacy Advocate
            </p>
            <p className="mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "#4B5563" }}>
              UpskillinTech is an independent platform I created to share practical AI insights with professionals, leaders, and organisations navigating the AI era. My goal is simple: help people understand and adopt AI responsibly — without the overwhelm.
            </p>
            <p className="mb-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "#4B5563" }}>
              As a researcher and university lecturer in AI and Robotics, I bring academic depth and real-world application together — to bridge the gap between AI theory and everyday professional practice.
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {expertise.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full font-semibold"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "0.875rem",
                    background: "rgba(13,148,136,0.08)",
                    color: "#0D9488",
                    border: "1px solid rgba(13,148,136,0.18)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a href="/about" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem", background: "#0D9488" }}>
              About UpskillinTech
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
