/**
 * TrustStrip — UpskillinTech v4 "Evergreen"
 * Editorial stat row on white: dark numerals, quiet labels, thin dividers.
 */
const stats = [
  { value: "1,000+", label: "Professionals trained" },
  { value: "20+", label: "Countries represented" },
  { value: "50+", label: "Organisations served" },
  { value: "PhD-led", label: "AI & Robotics research" },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Platform statistics"
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E3EAE2",
        padding: "2.5rem 0",
      }}
    >
      <div className="container">
        <div className="trust-strip-grid">
          {stats.map((s) => (
            <div key={s.label} className="trust-strip-item">
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3vw, 2rem)",
                  color: "#17211A",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#5D6B60",
                  marginTop: "0.35rem",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-strip-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem 1rem;
          text-align: center;
        }
        @media (min-width: 768px) {
          .trust-strip-grid { grid-template-columns: repeat(4, 1fr); }
          .trust-strip-item + .trust-strip-item { border-left: 1px solid #E3EAE2; }
        }
      `}</style>
    </section>
  );
}
