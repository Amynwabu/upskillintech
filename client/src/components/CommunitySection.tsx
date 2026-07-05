/**
 * CommunitySection — UpskillinTech v4 "Evergreen"
 * Compact community band: white card row with image, three benefits, one CTA.
 */
import { ArrowRight } from "lucide-react";

const COMMUNITY_IMG = "/community-engagement.jpg";

const benefits = [
  "Monthly live masterclasses with practitioners",
  "Real AI workflows shared across industries",
  "A peer network across Africa and the diaspora",
];

export default function CommunitySection() {
  return (
    <section id="community" className="section-py" style={{ background: "#FFFFFF" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div
              className="relative overflow-hidden"
              style={{ maxWidth: 520, width: "100%", boxShadow: "0 24px 60px rgba(12,31,18,0.14)", borderRadius: "1rem", border: "1px solid #E3EAE2" }}
            >
              <img
                src={COMMUNITY_IMG}
                alt="Professionals connecting at a community networking event"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
            </div>
          </div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <span className="section-label">Community</span>
            <h2 style={{ marginTop: "1rem", marginBottom: "1.25rem", maxWidth: 460 }}>
              You don't have to figure it out alone
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#3E4A41", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 460 }}>
              Learn alongside professionals who are putting AI to work every day — sharing
              what works, what doesn't, and what's next.
            </p>
            <ul className="flex flex-col gap-3 mb-9">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#50B040", display: "inline-block", flexShrink: 0, marginTop: "0.6rem" }}
                  />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.975rem", color: "#3E4A41", lineHeight: 1.65 }}>{b}</span>
                </li>
              ))}
            </ul>
            <a href="/community" className="btn-primary">
              Join the Community <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
