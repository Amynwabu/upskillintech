/**
 * EnterpriseSection — UpskillinTech v3
 * Light gray background, split layout: text left, photo right
 * Larger text, richer benefits, stronger visual hierarchy
 */
import { CheckCircle, ArrowRight } from "lucide-react";

const ENTERPRISE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/enterprise-workshop-CLVZe5SRYXeFJ3Xsx9gvnV.webp";

const benefits = [
  { title: "Train Teams in AI Productivity", desc: "Upskill your entire workforce with structured, role-specific AI training programmes." },
  { title: "Design AI Workflows", desc: "Build custom AI-powered workflows that automate repetitive tasks and boost output." },
  { title: "Develop AI Strategy", desc: "Create a long-term AI adoption roadmap aligned with your organisation's goals." },
  { title: "Measure ROI", desc: "Track productivity gains, time savings, and business impact with clear metrics." },
];

export default function EnterpriseSection() {
  return (
    <section id="enterprise" className="section-py" style={{ background: "#F7F8FA" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="section-label mb-5">Enterprise Solutions</span>
            <h2 className="mt-4 mb-5">
              AI Transformation for <span style={{ color: "#38B54A" }}>Organisations</span>
            </h2>
            <p className="mb-8" style={{ fontSize: "1.15rem", color: "#6B7280", lineHeight: 1.75 }}>
              UpskillinTech partners with organisations to build AI-ready teams, design intelligent workflows, and develop sustainable AI strategies that deliver measurable results.
            </p>
            <ul className="flex flex-col gap-5 mb-10">
              {benefits.map((b) => (
                <li key={b.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(56,181,74,0.12)" }}>
                    <CheckCircle size={18} style={{ color: "#38B54A" }} />
                  </div>
                  <div>
                    <div className="font-bold mb-0.5" style={{ fontFamily: "'Sora', sans-serif", color: "#111827", fontSize: "1rem" }}>
                      {b.title}
                    </div>
                    <div style={{ fontSize: "0.925rem", color: "#6B7280", lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <a href="/enterprise" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
                <ArrowRight size={20} />
                Enterprise Solutions
              </a>
              <a href="/contact" className="btn-outline" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
                Book a Consultation
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ maxWidth: 520, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}
            >
              <img
                src={ENTERPRISE_IMG}
                alt="AI training workshop with diverse professional team"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
              {/* Floating stat */}
              <div
                className="absolute top-5 right-5 rounded-2xl px-5 py-3 text-center"
                style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              >
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#38B54A" }}>50+</div>
                <div style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 500 }}>Business Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
