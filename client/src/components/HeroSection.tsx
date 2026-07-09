import { ArrowRight } from "lucide-react";

const HERO_IMG = "/training-diverse-team.jpg";

export default function HeroSection() {
  return (
    <section aria-label="Hero" style={{ background: "#0d1117", paddingTop: "72px" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
            paddingTop: "5rem",
            paddingBottom: "5rem",
          }}
          className="hero-two-col"
        >
          {/* Left: Copy */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1rem",
                borderRadius: "99px",
                background: "rgba(46,204,113,0.08)",
                border: "1px solid rgba(46,204,113,0.20)",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#2ecc71",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#2ecc71",
                  letterSpacing: "0.02em",
                }}
              >
                No Technical Background Required
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 5vw, 3.6rem)",
                color: "#F3F4F6",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              The Practical AI Platform for{" "}
              <span style={{ color: "#2ecc71" }}>Individuals and Professionals.</span>
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.2rem",
                lineHeight: 1.75,
                color: "#D1D5DB",
                marginBottom: "2.25rem",
                maxWidth: 560,
              }}
            >
              UpskillinTech helps you move from AI curiosity to practical AI adoption in
              everyday activities. Structured programmes, live sessions, and clear guidance,
              starting exactly where you are.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.875rem",
              }}
            >
              <a
                href="/masterclass#register"
                className="btn-primary"
                style={{
                  fontSize: "1.05rem",
                  padding: "0.9rem 2rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Register for the Masterclass
                <ArrowRight size={16} />
              </a>
              <a
                href="/programs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.05rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  color: "#F3F4F6",
                  textDecoration: "none",
                  padding: "0.9rem 1.75rem",
                  borderRadius: "0.75rem",
                  border: "1.5px solid #374151",
                  background: "#161b22",
                  transition: "border-color 0.15s, color 0.15s",
                }}
              >
                Explore Programmes
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <div style={{ position: "relative", maxWidth: 600, width: "100%" }}>
              <div
                style={{
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
                  border: "4px solid rgba(46,204,113,0.12)",
                }}
              >
                {/* Image guidance: depict African professionals in modern work settings alongside a diverse international professional audience. Avoid stock images that are exclusively non-African or generic Western office settings. */}
                <img
                  src={HERO_IMG}
                  alt="African professionals and a diverse international audience learning practical AI skills together in a modern work setting"
                  width={600}
                  height={460}
                  loading="eager"
                  style={{ width: "100%", height: "460px", display: "block", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-two-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
