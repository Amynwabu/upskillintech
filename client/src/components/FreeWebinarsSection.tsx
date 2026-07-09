import { ArrowRight } from "lucide-react";

export default function FreeWebinarsSection() {
  return (
    <section id="free-webinars" className="section-py" style={{ background: "#f4f4f4" }}>
      <div className="container">
        <div className="text-center" style={{ maxWidth: 640, margin: "0 auto" }}>
          <span
            className="section-label mb-4"
            style={{ display: "inline-block", color: "#111111", background: "rgba(46,204,113,0.14)", border: "1px solid rgba(46,204,113,0.30)" }}
          >
            Free Webinars
          </span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "2.25rem", color: "#111111", marginTop: "0.75rem", marginBottom: "1rem", lineHeight: 1.2 }}>
            Free AI Webinars — Coming Soon
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", color: "#111111", lineHeight: 1.7, marginBottom: "2rem" }}>
            Free live webinars on practical AI adoption are on the way. Register your interest
            to be the first to know when sessions go live.
          </p>
          <a
            href="/newsletter"
            className="btn-primary"
            style={{ fontSize: "1.05rem", padding: "1rem 2.5rem", background: "#2ecc71", color: "#0d1117" }}
          >
            Notify Me <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
