/**
 * MethodSection — UpskillinTech v3
 * Light background, 4-stage progression, larger circles, bolder text
 */
const steps = [
  {
    num: "01",
    label: "AI Curiosity",
    desc: "Understand what AI is, how it works, and how it applies directly to your professional context.",
    color: "#38B54A",
    textColor: "#ffffff",
    shadow: "rgba(56,181,74,0.35)",
  },
  {
    num: "02",
    label: "AI Confidence",
    desc: "Build practical skills using real AI tools in hands-on scenarios — no theory without practice.",
    color: "#6B9E2A",
    textColor: "#ffffff",
    shadow: "rgba(107,158,42,0.35)",
  },
  {
    num: "03",
    label: "AI Productivity",
    desc: "Integrate AI into your daily workflows to save hours every week and deliver better results.",
    color: "#8B9E1A",
    textColor: "#ffffff",
    shadow: "rgba(139,158,26,0.35)",
  },
  {
    num: "04",
    label: "AI Transformation",
    desc: "Lead AI adoption across your team, organisation, or community — and become the go-to AI expert.",
    color: "#E6B800",
    textColor: "#111827",
    shadow: "rgba(230,184,0,0.40)",
  },
];

export default function MethodSection() {
  return (
    <section className="section-py" style={{ background: "#F7F8FA" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-5">Our Approach</span>
          <h2 className="mt-4 mb-5">The UpskillinTech Method</h2>
          <p className="max-w-2xl mx-auto" style={{ fontSize: "1.15rem", color: "#6B7280" }}>
            We don't just teach AI tools.{" "}
            <span style={{ color: "#38B54A", fontWeight: 700 }}>We help you integrate AI into real work.</span>
          </p>
        </div>

        {/* Desktop: horizontal stepper */}
        <div className="hidden lg:flex items-start justify-center gap-0 mb-4">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-start">
              <div className="flex flex-col items-center" style={{ width: 240 }}>
                {/* Circle */}
                <div
                  className="flex items-center justify-center font-bold mb-5"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: step.color,
                    color: step.textColor,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    boxShadow: `0 8px 24px ${step.shadow}`,
                  }}
                >
                  {step.num}
                </div>
                <div className="text-center px-4">
                  <div
                    className="font-bold mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif", color: "#111827", fontSize: "1.1rem" }}
                  >
                    {step.label}
                  </div>
                  <div style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#6B7280" }}>
                    {step.desc}
                  </div>
                </div>
              </div>
              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div
                  className="flex items-center mt-8 mx-2"
                  style={{ color: "#E6B800", fontSize: "2rem", fontWeight: 800 }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical stepper */}
        <div className="lg:hidden flex flex-col gap-0 max-w-md mx-auto">
          {steps.map((step, i) => (
            <div key={step.label} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center font-bold shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: step.color,
                    color: step.textColor,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    boxShadow: `0 4px 16px ${step.shadow}`,
                  }}
                >
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 3, flex: 1, background: "linear-gradient(to bottom, #38B54A, #E6B800)", minHeight: 40, margin: "6px 0", borderRadius: 2 }} />
                )}
              </div>
              <div className="pb-10">
                <div
                  className="font-bold mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif", color: "#111827", fontSize: "1.15rem" }}
                >
                  {step.label}
                </div>
                <div style={{ fontSize: "0.975rem", lineHeight: 1.7, color: "#6B7280" }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
