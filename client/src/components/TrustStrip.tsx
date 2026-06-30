const stats = [
  { value: "1,000+", label: "Professionals reached" },
  { value: "500+", label: "Students trained" },
  { value: "20+", label: "Countries represented" },
  { value: "50+", label: "Organisations served" },
  { value: "Free", label: "Resources available" },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Platform statistics"
      style={{
        background: "#151B23",
        borderTop: "1px solid #1F2937",
        borderBottom: "1px solid #1F2937",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem 3.5rem",
            alignItems: "center",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 3vw, 2rem)",
                  color: "#0D9488",
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#9CA3AF",
                  marginTop: "0.2rem",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
