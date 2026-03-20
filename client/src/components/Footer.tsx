/**
 * Footer — UpskillinTech v3
 * Dark #111827 background, larger text, bigger logo, green hover accents
 */
import { Linkedin, Youtube, Instagram, Twitter } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/upskillintech_logo_transparent_2bd795be.png";

const footerLinks = {
  Insights: [
    { label: "Blog & Articles", href: "/resources/blog" },
    { label: "Free AI Guides", href: "/resources/ai-guides" },
    { label: "Case Studies", href: "/resources/case-studies" },
    { label: "AI Workflows", href: "/resources/workflows" },
    { label: "Newsletter", href: "/newsletter" },
  ],
  Programs: [
    { label: "AI Foundations", href: "/programs" },
    { label: "AI-Enabled Professional", href: "/programs" },
    { label: "AI Leadership", href: "/programs" },
    { label: "Enterprise Training", href: "/enterprise" },
    { label: "Webinars", href: "/resources/webinars" },
  ],
  Community: [
    { label: "Join the Community", href: "/community" },
    { label: "Events & Meetups", href: "/events" },
    { label: "AI Masterclasses", href: "/community" },
    { label: "Peer Network", href: "/community" },
  ],
  Company: [
    { label: "About UpskillinTech", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter/X", href: "#" },
];

export default function Footer() {
  return (
    <footer id="footer" style={{ background: "#111827" }}>
      <div className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-2 sm:col-span-2">
            <div className="mb-5">
              <img
                src={LOGO_URL}
                alt="UpskillinTech"
                style={{ height: "64px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="mb-3 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.975rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
              An independent AI awareness platform sharing insights on AI productivity, AI tools, and the future of work.
            </p>
            <p className="mb-7 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              Helping professionals understand and adopt AI responsibly — to think, lead, and create impact in an AI-powered world.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex items-center justify-center transition-all duration-200"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "0.625rem",
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#ffffff";
                      (e.currentTarget as HTMLElement).style.background = "#38B54A";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="font-bold mb-5"
                style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", color: "#ffffff" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200"
                      style={{ fontSize: "0.925rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", lineHeight: 1.5 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38B54A"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
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
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)" }}>
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
                style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.30)", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38B54A"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.30)"; }}
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
