/**
 * Navbar — UpskillinTech v3
 * Design: White bg, taller (72px), larger logo, bigger nav text, green CTA
 * Font: Poppins
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, BookOpen, FileText, Briefcase, Video, Zap, Mail } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/upskillintech_logo_transparent_2bd795be.png";

const RESOURCE_LINKS = [
  { label: "Blog", desc: "Articles & insights", href: "/resources/blog", icon: <BookOpen size={18} style={{ color: "#38B54A" }} /> },
  { label: "AI Guides", desc: "Free downloadable guides", href: "/resources/ai-guides", icon: <FileText size={18} style={{ color: "#8B9E1A" }} /> },
  { label: "Case Studies", desc: "Real results & stories", href: "/resources/case-studies", icon: <Briefcase size={18} style={{ color: "#38B54A" }} /> },
  { label: "Webinars", desc: "Live & recorded sessions", href: "/resources/webinars", icon: <Video size={18} style={{ color: "#E6B800" }} /> },
  { label: "AI Workflows", desc: "Step-by-step templates", href: "/resources/workflows", icon: <Zap size={18} style={{ color: "#8B9E1A" }} /> },
  { label: "Newsletter", desc: "Weekly AI insights", href: "/newsletter", icon: <Mail size={18} style={{ color: "#E6B800" }} /> },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300"
      style={{
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.10)" : "0 1px 0 #E5E7EB",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: "76px" }}>
          {/* Logo — larger and more prominent */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={LOGO_URL}
              alt="UpskillinTech"
              style={{ height: "68px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-semibold transition-colors duration-150"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.975rem",
                  color: "#111827",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#38B54A")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#111827")}
              >
                {link.label}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1.5 font-semibold transition-colors duration-150"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.975rem",
                  color: resourcesOpen ? "#38B54A" : "#111827",
                  background: "none",
                  border: "none",
                  letterSpacing: "0.01em",
                }}
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                Resources{" "}
                <ChevronDown
                  size={16}
                  style={{
                    transition: "transform 0.2s",
                    transform: resourcesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {resourcesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl overflow-hidden"
                  style={{
                    background: "#fff",
                    boxShadow: "0 12px 48px rgba(0,0,0,0.14)",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div className="p-2.5">
                    <Link
                      href="/resources"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 font-bold"
                      style={{
                        background: "linear-gradient(135deg, rgba(56,181,74,0.08), rgba(230,184,0,0.08))",
                        color: "#38B54A",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.95rem",
                        textDecoration: "none",
                      }}
                      onClick={() => setResourcesOpen(false)}
                    >
                      All Resources →
                    </Link>
                    {RESOURCE_LINKS.map((r) => (
                      <Link
                        key={r.label}
                        href={r.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                        style={{ textDecoration: "none" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F7F8FA")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        onClick={() => setResourcesOpen(false)}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F0FDF4" }}>
                          {r.icon}
                        </div>
                        <div>
                          <div className="font-semibold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", color: "#111827" }}>
                            {r.label}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>{r.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link href="/programs" className="btn-primary" style={{ fontSize: "0.95rem", padding: "0.75rem 1.75rem" }}>
              Join Program
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: "#111827" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t" style={{ borderColor: "#E5E7EB" }}>
          <div className="container py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-semibold py-3 px-3 rounded-xl"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1rem",
                  color: "#111827",
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 mb-1">
              <p className="text-xs font-bold uppercase tracking-wider px-3 py-1.5" style={{ color: "#9CA3AF" }}>
                Resources
              </p>
              <Link
                href="/resources"
                className="font-bold py-2.5 px-3 block rounded-xl"
                style={{ color: "#38B54A", textDecoration: "none", fontSize: "1rem" }}
                onClick={() => setMenuOpen(false)}
              >
                All Resources
              </Link>
              {RESOURCE_LINKS.map((r) => (
                <Link
                  key={r.label}
                  href={r.href}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl"
                  style={{ color: "#111827", textDecoration: "none", fontSize: "0.95rem" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {r.icon} {r.label}
                </Link>
              ))}
            </div>
            <Link href="/programs" className="btn-primary mt-3 text-center justify-center" onClick={() => setMenuOpen(false)}>
              Join Program
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
