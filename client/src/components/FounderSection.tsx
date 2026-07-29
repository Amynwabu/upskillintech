/**
 * FounderSection — UpskillinTech v3.1
 * Mission framing: Positions the founder as the voice behind the independent
 * AI awareness platform — researcher, educator, and thought leader.
 * White background, split layout: photo left, bio right
 * Typography: Sora headings, DM Sans body
 */
const FOUNDER_IMG = "/founder-amaka-adiuku.png";

const expertise = ["AI Research", "Robotics", "Technology Literacy", "Workflow Automation", "AI Adoption", "Public Engagement"];

export default function FounderSection() {
  return (
    <section className="section-py" style={{ background: "#07100B" }}>
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
                  boxShadow: "0 24px 64px rgba(133, 157, 48,0.18)",
                  border: "3px solid rgba(133, 157, 48,0.20)",
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
                style={{ background: "#859D30", boxShadow: "0 8px 24px rgba(133, 157, 48,0.35)" }}
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
              <span style={{ background: "linear-gradient(135deg, #859D30, #859D30)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Real Research
              </span>
            </h2>
            <p className="font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#859D30", fontSize: "1.2rem" }}>
              Dr. Amaka Adiuku
            </p>
            <p className="mb-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#9CA3AF" }}>
              AI Researcher · Lecturer at Cranfield University · Educator · Investigative AI Journalist
            </p>
            <p className="mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "#D1D5DB" }}>
              UpskillinTech is an independent platform I built to help professionals
              everywhere move from AI curiosity to practical adoption—calmly,
              confidently and without the overwhelm.
            </p>
            <p className="mb-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "#D1D5DB" }}>
              As a university lecturer in AI and Robotics at Cranfield University and a published researcher, I bring academic rigour and real-world application together. I also run an investigative YouTube channel and podcast covering AI manipulation, misinformation, and responsible AI adoption.
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
                    background: "rgba(133, 157, 48,0.08)",
                    color: "#859D30",
                    border: "1px solid rgba(133, 157, 48,0.18)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/about" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem", background: "#859D30" }}>
                About UpskillinTech
              </a>
              <a
                href="/contact"
                className="btn-outline"
                style={{
                  fontSize: "1.05rem",
                  padding: "1rem 2.25rem",
                  borderColor: "#859D30",
                  color: "#859D30",
                }}
              >
                Book a Discovery Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
