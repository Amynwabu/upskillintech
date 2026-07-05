/**
 * FounderSection — UpskillinTech v4 "Evergreen"
 * High-trust authority section on deep forest: photo, credentials row,
 * first-person mission statement.
 */
const FOUNDER_IMG = "/founder-amaka-adiuku.png";

const credentials = [
  { value: "PhD", label: "AI & Robotics" },
  { value: "Lecturer", label: "Cranfield University" },
  { value: "Published", label: "AI researcher" },
];

export default function FounderSection() {
  return (
    <section aria-label="About the founder" className="section-py" style={{ background: "#0C1F12" }}>
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-14 items-center max-w-5xl mx-auto">
          {/* Left: Founder photo */}
          <div className="lg:col-span-2 flex justify-center">
            <div
              className="overflow-hidden"
              style={{
                maxWidth: 340,
                width: "100%",
                borderRadius: "1rem",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
              }}
            >
              <img
                src={FOUNDER_IMG}
                alt="Dr. Amaka Adiuku, founder of UpskillinTech"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
            </div>
          </div>

          {/* Right: Bio */}
          <div className="lg:col-span-3">
            <span className="section-label" style={{ color: "#7ED164" }}>Founder</span>
            <h2 style={{ color: "#ffffff", marginTop: "1rem", marginBottom: "0.75rem" }}>
              Dr. Amaka Adiuku
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
              AI &amp; Robotics researcher · Lecturer at Cranfield University · AI educator and journalist
            </p>

            {/* Credentials row */}
            <div className="founder-creds mb-8">
              {credentials.map((c) => (
                <div key={c.label} className="founder-cred">
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#ffffff" }}>{c.value}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginTop: "0.15rem" }}>{c.label}</div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.82)", marginBottom: "1.25rem" }}>
              "I built UpskillinTech to close the gap between AI research and real work. My
              day job is teaching and researching AI — my mission here is making it useful
              for professionals like you, calmly and without the hype."
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.975rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", marginBottom: "2.25rem" }}>
              Alongside teaching and research, Dr. Adiuku runs an investigative YouTube channel
              and podcast on AI manipulation, misinformation, and responsible adoption.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="/about" className="btn-primary-white">
                About UpskillinTech
              </a>
              <a href="/contact" className="btn-outline-white">
                Book a Discovery Call
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .founder-creds {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .founder-cred { padding: 1.1rem 1rem 1.1rem 0; }
        .founder-cred + .founder-cred {
          border-left: 1px solid rgba(255,255,255,0.12);
          padding-left: 1.25rem;
        }
      `}</style>
    </section>
  );
}
