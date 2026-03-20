/**
 * CommunitySection — UpskillinTech v3
 * Soft yellow bg, split layout, richer benefits, larger text
 */
import { CheckCircle, ArrowRight } from "lucide-react";

const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/community-networking-foQRzPoSFZJMPVfXMtbbZA.webp";

const benefits = [
  { title: "Monthly Masterclasses", desc: "Live sessions with AI experts covering the latest tools and strategies." },
  { title: "Workflow Sharing", desc: "Access and share real AI workflows from professionals across industries." },
  { title: "Peer Networking", desc: "Connect with like-minded professionals who are building AI-powered careers." },
  { title: "Community Events", desc: "Attend workshops, hackathons, and AI challenges with the community." },
];

export default function CommunitySection() {
  return (
    <section id="community" className="section-py" style={{ background: "#FFF7D6" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="section-label mb-5">Community</span>
            <h2 className="mt-4 mb-5">
              Join the UpskillinTech <span style={{ color: "#38B54A" }}>Community</span>
            </h2>
            <p className="mb-8" style={{ fontSize: "1.15rem", color: "#4B5563", lineHeight: 1.75 }}>
              Learn, share workflows, and collaborate with thousands of professionals who are integrating AI into their work and lives.
            </p>
            <ul className="flex flex-col gap-5 mb-10">
              {benefits.map((b) => (
                <li key={b.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(56,181,74,0.15)" }}>
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
              <a href="/community" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
                <ArrowRight size={20} />
                Join the Community
              </a>
              <a href="/community" className="btn-outline" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
                Learn More
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
                src={COMMUNITY_IMG}
                alt="Diverse professionals at a community networking event"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
              {/* Floating badge */}
              <div
                className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-5 py-3"
                style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              >
                <span style={{ fontSize: "1.5rem" }}>🌍</span>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#38B54A" }}>
                    Growing Community
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>Professionals across Africa & beyond</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
