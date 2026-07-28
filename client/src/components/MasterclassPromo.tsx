import { ArrowRight, Calendar, Gift, Sparkles } from "lucide-react";

export default function MasterclassPromo() {
  return (
    <section style={{ background: "#F3F1EE", padding: "4rem 0" }}>
      <div className="container">
        <div
          style={{
            background: "linear-gradient(135deg, #439288 0%, #16A34A 100%)",
            borderRadius: "1.5rem",
            padding: "3rem 2.5rem",
            display: "grid",
            gap: "2.5rem",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
          className="masterclass-promo-grid"
        >
          {/* Decorative blobs */}
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: 180, height: 180, borderRadius: "50%", background: "rgba(230,184,0,0.12)", pointerEvents: "none" }} />

          {/* Left: copy */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.15)", borderRadius: "99px", padding: "0.35rem 0.875rem", marginBottom: "1.25rem" }}>
              <Sparkles size={14} style={{ color: "#E6B800" }} />
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#ffffff", letterSpacing: "0.04em" }}>July 2025 · Limited Seats</span>
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#ffffff", lineHeight: 1.2, marginBottom: "1rem" }}>
              AI Transformation Master Class
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 480 }}>
              Build a real AI-powered business in 10 steps — from idea to income. No tech background needed.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { icon: Calendar, text: "Last 2 Saturdays of July" },
                { icon: Gift, text: "Free 1-on-1 session included" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Icon size={15} style={{ color: "rgba(255,255,255,0.7)" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
              <a
                href="/masterclass"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "#151B23", color: "#439288", borderRadius: "0.75rem",
                  padding: "0.9rem 1.75rem", fontFamily: "'Sora', sans-serif",
                  fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
              >
                Reserve Your Spot <ArrowRight size={16} />
              </a>
              <a
                href="/masterclass"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "transparent", color: "#ffffff", borderRadius: "0.75rem",
                  padding: "0.9rem 1.75rem", fontFamily: "'Sora', sans-serif",
                  fontWeight: 600, fontSize: "0.95rem", textDecoration: "none",
                  border: "1.5px solid rgba(255,255,255,0.55)",
                }}
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Right: pricing cards */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { price: "₦50,000", market: "Nigeria" },
              { price: "£50", market: "UK & International" },
            ].map((p) => (
              <div key={p.market} style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: "1rem", padding: "1.25rem 1.5rem", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#ffffff", lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginTop: "0.25rem" }}>{p.market}</div>
              </div>
            ))}
            <div style={{ background: "rgba(230,184,0,0.15)", border: "1px solid rgba(230,184,0,0.35)", borderRadius: "1rem", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Gift size={18} style={{ color: "#E6B800", flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#ffffff", lineHeight: 1.5 }}>
                <strong>Bonus:</strong> Free 1-on-1 AI Transformation Consultation for every participant
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .masterclass-promo-grid { grid-template-columns: 1.5fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
