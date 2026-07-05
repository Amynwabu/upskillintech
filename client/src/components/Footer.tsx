/**
 * Footer — UpskillinTech v4 "Evergreen"
 * Deep forest background, colored icon + white wordmark, tidy columns,
 * green hover accents, clean bottom bar.
 */
import { Linkedin, Music2, Youtube, Instagram } from "lucide-react";

const ICON_URL = "/icon-mark.png";
const LINK_COLOR = "rgba(255,255,255,0.55)";
const LINK_HOVER = "#7ED164";

const footerLinks = {
  Programmes: [
    { label: "AI Foundations", href: "/programs" },
    { label: "AI-Enabled Professional", href: "/programs" },
    { label: "AI Leadership", href: "/programs" },
    { label: "Masterclass", href: "/masterclass" },
    { label: "Enterprise Training", href: "/enterprise" },
  ],
  Resources: [
    { label: "Blog & Articles", href: "/resources/blog" },
    { label: "Free AI Guides", href: "/resources/ai-guides" },
    { label: "Case Studies", href: "/resources/case-studies" },
    { label: "AI Workflows", href: "/resources/workflows" },
    { label: "Webinars", href: "/resources/webinars" },
    { label: "Newsletter", href: "/newsletter" },
  ],
  Community: [
    { label: "Join the Community", href: "/community" },
    { label: "Events & Meetups", href: "/events" },
    { label: "7-Day AI Challenge", href: "/challenge" },
  ],
  Company: [
    { label: "About UpskillinTech", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/upskillintech" },
  { icon: Music2, label: "TikTok", href: "https://www.tiktok.com/@upskillintech" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@upskillintech" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/upskillintech" },
];

export default function Footer() {
  return (
    <footer id="footer" style={{ background: "#0C1F12" }}>
      <div className="container" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2 sm:col-span-2" style={{ maxWidth: 340 }}>
            <div className="flex items-center gap-2.5 mb-5">
              <img
                src={ICON_URL}
                alt=""
                aria-hidden="true"
                style={{ height: "36px", width: "36px", objectFit: "contain" }}
              />
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#ffffff", letterSpacing: "-0.01em" }}>
                UpskillinTech
              </span>
            </div>
            <p className="mb-7" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.925rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.75 }}>
              Practical AI adoption for professionals, solopreneurs, business owners, and
              organisations — founded by a PhD AI &amp; Robotics researcher. No technical
              background required.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center transition-colors duration-200"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "0.5rem",
                      background: "rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#0C1F12";
                      (e.currentTarget as HTMLElement).style.background = LINK_HOVER;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                    }}
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="mb-5"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200"
                      style={{ fontSize: "0.9rem", color: LINK_COLOR, textDecoration: "none", lineHeight: 1.5 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LINK_HOVER; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = LINK_COLOR; }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
        >
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} UpskillinTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors duration-200"
                style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LINK_HOVER; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
