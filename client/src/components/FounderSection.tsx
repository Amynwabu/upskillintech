/**
 * FounderSection — founder profile with updated subtitle, bio, and expertise tags.
 * Dark background, split layout: photo left, bio right.
 */
const FOUNDER_IMG = "/founder-amaka-adiuku.png";

const expertise = ["Robotics", "Technology Literacy", "Workflow Automation", "AI Adoption", "Public Engagement"];

export default function FounderSection() {
  return (
    <section className="section-py" style={{ background: "#161b22" }}>
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
                  boxShadow: "0 24px 64px rgba(46,204,113,0.18)",
                  border: "3px solid rgba(46,204,113,0.20)",
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
                style={{ background: "#2ecc71", boxShadow: "0 8px 24px rgba(46,204,113,0.35)" }}
              >
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#0d1117" }}>PhD</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(13,17,23,0.85)", fontWeight: 500 }}>AI &amp; Robotics</div>
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <span className="section-label mb-5">The Founder</span>
            <h2 className="mt-4 mb-3" style={{ fontFamily: "'Sora', sans-serif", fontSize: "2.25rem" }}>
              Meet <span style={{ color: "#2ecc71" }}>Dr. Amaka Adiuku</span>
            </h2>
            <p className="mb-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", color: "#D1D5DB" }}>
              AI Researcher · Educator · MIET · FHEA
            </p>
            <p className="mb-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", lineHeight: 1.8, color: "#D1D5DB" }}>
              UpskillinTech is an independent platform built to help individuals and
              professionals move from AI curiosity to practical AI adoption in everyday
              activities — practically, confidently, and without the overwhelm.
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {expertise.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full font-semibold"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "1rem",
                    background: "rgba(46,204,113,0.08)",
                    color: "#2ecc71",
                    border: "1px solid rgba(46,204,113,0.18)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/about" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem", background: "#2ecc71", color: "#0d1117" }}>
                About UpskillinTech
              </a>
              <a
                href="/contact"
                className="btn-outline"
                style={{
                  fontSize: "1.05rem",
                  padding: "1rem 2.25rem",
                  borderColor: "#2ecc71",
                  color: "#2ecc71",
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
