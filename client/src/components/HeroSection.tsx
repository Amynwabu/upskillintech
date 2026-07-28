import { ArrowRight, Download } from "lucide-react";

const HERO_IMG = "/training-diverse-team.jpg";

export default function HeroSection() {
  return (
    <section aria-label="Hero" style={{ background: "#0B0F14", paddingTop: "72px" }}>
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
                background: "rgba(67,146,136,0.08)",
                border: "1px solid rgba(67,146,136,0.20)",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#439288",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#439288",
                  letterSpacing: "0.02em",
                }}
              >
                Think. Create. Build. Grow. — No Technical Background Required
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                color: "#F3F4F6",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              The Practical AI Platform for{" "}
              <span style={{ color: "#439288" }}>
                Professionals Everywhere.
              </span>
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.15rem",
                lineHeight: 1.75,
                color: "#D1D5DB",
                marginBottom: "2.25rem",
                maxWidth: 560,
              }}
            >
              Move from AI curiosity to practical AI adoption — with structured programmes,
              free resources, and a global community for people who want to work
              confidently with AI. Start where you are. No technical background needed.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.875rem",
                marginBottom: "2.5rem",
              }}
            >
              <a
                href="#lead-magnet"
                className="btn-primary"
                style={{
                  fontSize: "1rem",
                  padding: "0.9rem 2rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Download size={18} />
                Get Your Free AI Starter Guide
              </a>
              <a
                href="/programs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  color: "#F3F4F6",
                  textDecoration: "none",
                  padding: "0.9rem 1.75rem",
                  borderRadius: "0.75rem",
                  border: "1.5px solid #374151",
                  background: "#151B23",
                  transition: "border-color 0.15s, color 0.15s",
                }}
              >
                Explore Programmes
                <ArrowRight size={16} />
              </a>
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                color: "#9CA3AF",
              }}
            >
              Trusted by{" "}
              <strong style={{ color: "#F3F4F6" }}>1,000+ professionals</strong> across{" "}
              <strong style={{ color: "#F3F4F6" }}>20+ countries</strong> — founded by a PhD AI &amp; Robotics researcher at Cranfield University.
            </p>
          </div>

          {/* Right: Photo */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <div style={{ position: "relative", maxWidth: 600, width: "100%" }}>
              <div
                style={{
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
                  border: "4px solid rgba(67,146,136,0.12)",
                }}
              >
                <img
                  src={HERO_IMG}
                  alt="A diverse group of professionals learning practical AI tools together"
                  width={600}
                  height={460}
                  loading="eager"
                  style={{ width: "100%", height: "460px", display: "block", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  background: "rgba(255,255,255,0.97)",
                  borderRadius: "1rem",
                  padding: "0.75rem 1.25rem",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>🌍</span>
                <div>
                  <div
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#439288",
                    }}
                  >
                    1,000+ Professionals
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#9CA3AF",
                    }}
                  >
                    Adopting AI Responsibly
                  </div>
                </div>
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
