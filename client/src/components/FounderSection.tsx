/**
 * FounderSection — UpskillinTech v3
 * White background, split layout: photo left, bio right
 * Larger text, expertise tags, stronger visual hierarchy
 */
const FOUNDER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/founder-portrait-g2gj6Gs4zs3JeXJbWqWTy7.webp";

const expertise = ["AI Research", "Robotics", "Education Technology", "Workflow Automation", "AI Strategy"];

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
                  boxShadow: "0 24px 64px rgba(56,181,74,0.20)",
                  border: "3px solid rgba(230,184,0,0.30)",
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
                style={{ background: "#38B54A", boxShadow: "0 8px 24px rgba(56,181,74,0.35)" }}
              >
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#ffffff" }}>PhD</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>AI & Robotics</div>
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <span className="section-label mb-5">About the Founder</span>
            <h2 className="mt-4 mb-3">
              Built on Real <span style={{ color: "#38B54A" }}>AI Expertise</span>
            </h2>
            <p className="font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#38B54A", fontSize: "1.2rem" }}>
              Dr. Amaka Adiuku
            </p>
            <p className="mb-6" style={{ fontSize: "1rem", color: "#6B7280" }}>
              Lecturer in AI | Robotics Researcher | Educator
            </p>
            <p className="mb-4" style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#4B5563" }}>
              Dr. Amaka Adiuku is a researcher, educator, and AI practitioner who founded UpskillinTech to bridge the gap between AI theory and real-world professional application.
            </p>
            <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#4B5563" }}>
              UpskillinTech combines cutting-edge AI research, industry collaboration, and practical workflow innovation to help professionals, organisations, and communities thrive in an AI-powered world.
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {expertise.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full font-semibold"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.875rem",
                    background: "rgba(56,181,74,0.10)",
                    color: "#38B54A",
                    border: "1px solid rgba(56,181,74,0.20)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a href="/about" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
