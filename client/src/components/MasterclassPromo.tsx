/**
 * MasterclassPromo — UpskillinTech v4 "Evergreen"
 * Restrained deep-forest feature panel with a gold accent label,
 * clear details row, and a single strong CTA.
 */
import { ArrowRight, Calendar, Gift } from "lucide-react";

export default function MasterclassPromo() {
  return (
    <section aria-label="AI Masterclass" style={{ background: "#FFFFFF", paddingBottom: "5rem" }}>
      <div className="container">
        <div
          style={{
            background: "#0C1F12",
            borderRadius: "1rem",
            padding: "3.5rem 2.5rem",
            display: "grid",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="masterclass-promo-grid"
        >
          {/* Left: copy */}
          <div>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#D9AE2B",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              July 2025 · Limited seats
            </p>
            <h2 style={{ color: "#ffffff", marginBottom: "1rem", maxWidth: 480 }}>
              AI Transformation Masterclass
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 460 }}>
              Build a real AI-powered business in ten practical steps — from idea to income.
              Live sessions, real examples, no technical background needed.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.25rem" }}>
              {[
                { icon: Calendar, text: "Last two Saturdays of July" },
                { icon: Gift, text: "Includes a free 1-on-1 consultation" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Icon size={15} style={{ color: "#7ED164" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
              <a href="/masterclass" className="btn-primary-white">
                Reserve Your Seat <ArrowRight size={16} />
              </a>
              <a href="/masterclass" className="btn-outline-white">
                Learn more
              </a>
            </div>
          </div>

          {/* Right: pricing */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { price: "₦50,000", market: "Nigeria" },
              { price: "£50", market: "UK & International" },
            ].map((p) => (
              <div
                key={p.market}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "0.75rem",
                  padding: "1.25rem 1.5rem",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#ffffff", lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginTop: "0.35rem" }}>{p.market}</div>
              </div>
            ))}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, padding: "0 0.25rem" }}>
              Every participant receives a free 1-on-1 AI transformation consultation.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .masterclass-promo-grid { grid-template-columns: 1.6fr 1fr !important; padding: 3.5rem 3.5rem !important; }
        }
      `}</style>
    </section>
  );
}
