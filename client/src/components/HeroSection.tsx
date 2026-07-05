/**
 * HeroSection — UpskillinTech v4 "Evergreen"
 * Calm off-white hero: sharp headline, one primary + one secondary CTA,
 * single trust line, photo with a restrained stat card.
 */
import { ArrowRight, Download } from "lucide-react";

const HERO_IMG = "/training-diverse-team.jpg";

export default function HeroSection() {
  return (
    <section aria-label="Hero" style={{ background: "#F5FAF2", borderBottom: "1px solid #E3EAE2" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3.5rem",
            alignItems: "center",
            paddingTop: "4.5rem",
            paddingBottom: "5rem",
          }}
          className="hero-two-col"
        >
          {/* Left: Copy */}
          <div>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#2E7B20",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Practical AI adoption — no technical background required
            </p>

            <h1 style={{ marginBottom: "1.5rem", maxWidth: 560 }}>
              Learn to use AI in your work — properly, practically, and with confidence.
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.125rem",
                lineHeight: 1.7,
                color: "#3E4A41",
                marginBottom: "2.25rem",
                maxWidth: 520,
              }}
            >
              Structured programmes, real workflows, and a supportive community for African
              and diaspora professionals, solopreneurs, and organisations — wherever you're
              starting from.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.875rem",
                marginBottom: "2.25rem",
              }}
            >
              <a href="/programs" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
                Explore Programmes
                <ArrowRight size={17} />
              </a>
              <a href="#start-free" className="btn-outline" style={{ fontSize: "1rem", padding: "0.85rem 1.75rem" }}>
                <Download size={16} />
                Get the Free Starter Guide
              </a>
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: "#5D6B60",
              }}
            >
              Trusted by <strong style={{ color: "#17211A", fontWeight: 600 }}>1,000+ professionals in 20+ countries</strong>.
              Founded by a PhD AI &amp; Robotics researcher and lecturer at Cranfield University.
            </p>
          </div>

          {/* Right: Photo */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <div style={{ position: "relative", maxWidth: 560, width: "100%" }}>
              <div
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 24px 60px rgba(12,31,18,0.16)",
                  border: "1px solid #E3EAE2",
                }}
              >
                <img
                  src={HERO_IMG}
                  alt="African and multicultural professionals learning practical AI tools together"
                  width={560}
                  height={440}
                  loading="eager"
                  style={{ width: "100%", height: "440px", display: "block", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  background: "#ffffff",
                  borderRadius: "0.75rem",
                  padding: "0.8rem 1.2rem",
                  boxShadow: "0 8px 24px rgba(12,31,18,0.14)",
                  border: "1px solid #E3EAE2",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#17211A",
                    lineHeight: 1.2,
                  }}
                >
                  1,000+ professionals
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "#5D6B60",
                    marginTop: "0.15rem",
                  }}
                >
                  learning practical, responsible AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-two-col { grid-template-columns: 1.05fr 0.95fr !important; }
        }
      `}</style>
    </section>
  );
}
