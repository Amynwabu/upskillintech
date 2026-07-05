/**
 * EnterpriseSection — UpskillinTech v4 "Evergreen"
 * "For organisations": split layout on soft tint, four concrete capabilities,
 * photo with a single stat card.
 */
import { CheckCircle2, ArrowRight } from "lucide-react";

const ENTERPRISE_IMG = "/networking-event.jpg";

const benefits = [
  { title: "Team training", desc: "Role-specific AI training that upskills your whole workforce." },
  { title: "Workflow design", desc: "Custom AI workflows that remove repetitive work and lift output." },
  { title: "Adoption strategy", desc: "A long-term roadmap aligned with your organisation's goals." },
  { title: "Measurable ROI", desc: "Clear metrics for time saved, productivity, and business impact." },
];

export default function EnterpriseSection() {
  return (
    <section id="enterprise" className="section-py" style={{ background: "#F5FAF2", borderTop: "1px solid #E3EAE2", borderBottom: "1px solid #E3EAE2" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="section-label">For organisations</span>
            <h2 style={{ marginTop: "1rem", marginBottom: "1.25rem", maxWidth: 480 }}>
              Bring your whole team along
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#3E4A41", lineHeight: 1.75, marginBottom: "2.25rem", maxWidth: 480 }}>
              We partner with organisations to build AI-ready teams — from structured
              training and workflow redesign to governance and strategy that deliver
              measurable results.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-10">
              {benefits.map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <CheckCircle2 size={19} style={{ color: "#2E7B20", flexShrink: 0, marginTop: "0.15rem" }} />
                  <div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: "#17211A", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
                      {b.title}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#5D6B60", lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="/enterprise" className="btn-primary">
                Enterprise Solutions <ArrowRight size={16} />
              </a>
              <a href="/contact" className="btn-outline">
                Book a Consultation
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ maxWidth: 520, width: "100%", boxShadow: "0 24px 60px rgba(12,31,18,0.14)", borderRadius: "1rem", border: "1px solid #E3EAE2" }}
            >
              <img
                src={ENTERPRISE_IMG}
                alt="AI training workshop with a diverse professional team"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
              <div
                className="absolute top-5 right-5 rounded-xl px-5 py-3 text-center"
                style={{ background: "#ffffff", boxShadow: "0 8px 24px rgba(12,31,18,0.14)", border: "1px solid #E3EAE2" }}
              >
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#17211A" }}>50+</div>
                <div style={{ fontSize: "0.78rem", color: "#5D6B60", fontWeight: 500 }}>organisations served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
