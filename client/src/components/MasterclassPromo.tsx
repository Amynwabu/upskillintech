import { Calendar, Gift } from "lucide-react";
import MasterclassRegistrationForm from "@/components/MasterclassRegistrationForm";

export default function MasterclassPromo() {
  return (
    <section id="masterclass" className="section-py" style={{ background: "#f4f4f4" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gap: "3rem",
            alignItems: "start",
          }}
          className="masterclass-promo-grid"
        >
          {/* Left: copy */}
          <div>
            <span className="section-label mb-4" style={{ display: "inline-block" }}>AI Masterclass</span>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "2.25rem", color: "#111111", lineHeight: 1.2, marginBottom: "1rem" }}>
              AI Transformation Masterclass
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", color: "#111111", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 480 }}>
              Build a real AI-powered business in ten practical steps, from idea to income.
              No technical background needed.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Calendar size={18} style={{ color: "#2ecc71" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#111111", fontWeight: 600 }}>
                  Saturday 1 August and Saturday 8 August 2026
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Gift size={18} style={{ color: "#2ecc71" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#111111", fontWeight: 600 }}>
                  Free one-to-one session included
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {[
                { price: "£50", market: "United Kingdom" },
                { price: "$50", market: "All Other Regions" },
              ].map((p) => (
                <div key={p.market} style={{ background: "#ffffff", borderRadius: "1rem", padding: "1.25rem 1.75rem", border: "1px solid #e2e2e2", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#111111", lineHeight: 1 }}>{p.price}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#111111", marginTop: "0.375rem" }}>{p.market}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: registration form */}
          <MasterclassRegistrationForm />
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .masterclass-promo-grid { grid-template-columns: 1fr 1.1fr !important; }
        }
      `}</style>
    </section>
  );
}
