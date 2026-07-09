/**
 * Navbar — UpskillinTech v3
 * Design: White bg, taller (72px), larger logo, bigger nav text, green CTA
 * Font: Sora
 */
import { useState, useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { Menu, X, ChevronDown, BookOpen, FileText, Briefcase, Video, Zap, Mail } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const LOGO_URL = "/logo-transparent.png";
const ACTIVE_NAV_COLOR = "#2ecc71";

const RESOURCE_LINKS = [
  { label: "Blog", desc: "Articles & insights", href: "/resources/blog", icon: <BookOpen size={18} style={{ color: "#2ecc71" }} /> },
  { label: "AI Guides", desc: "Free downloadable guides", href: "/resources/ai-guides", icon: <FileText size={18} style={{ color: "#2ecc71" }} /> },
  { label: "Case Studies", desc: "Real results & stories", href: "/resources/case-studies", icon: <Briefcase size={18} style={{ color: "#2ecc71" }} /> },
  { label: "Webinars", desc: "Live & recorded sessions", href: "/resources/webinars", icon: <Video size={18} style={{ color: "#2ecc71" }} /> },
  { label: "AI Workflows", desc: "Step-by-step templates", href: "/resources/workflows", icon: <Zap size={18} style={{ color: "#2ecc71" }} /> },
  { label: "Newsletter", desc: "Weekly AI insights", href: "/newsletter", icon: <Mail size={18} style={{ color: "#2ecc71" }} /> },
];

const PROGRAM_LINKS = [
  { label: "Programs", desc: "Structured AI learning paths", href: "/programs", icon: <BookOpen size={18} style={{ color: "#2ecc71" }} /> },
  { label: "Masterclass", desc: "Live practical AI sessions", href: "/masterclass", icon: <Video size={18} style={{ color: "#2ecc71" }} /> },
  { label: "Enterprise", desc: "Team training and strategy", href: "/enterprise", icon: <Briefcase size={18} style={{ color: "#2ecc71" }} /> },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const secondaryNavLinks = [
  { label: "Community", href: "/community" },
];

function DesktopNavLink({ label, href }: { label: string; href: string }) {
  const [active] = useRoute(href);
  const color = active ? ACTIVE_NAV_COLOR : "#F3F4F6";

  return (
    <Link
      href={href}
      className="font-semibold transition-colors duration-150"
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: "0.975rem",
        color,
        fontWeight: active ? 800 : 600,
        textDecoration: "none",
        letterSpacing: "0.01em",
      }}
      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ACTIVE_NAV_COLOR)}
      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = color)}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
  const [active] = useRoute(href);

  return (
    <Link
      href={href}
      className="font-semibold py-3 px-3 rounded-xl"
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: "1rem",
        color: active ? ACTIVE_NAV_COLOR : "#F3F4F6",
        fontWeight: active ? 800 : 600,
        textDecoration: "none",
        background: active ? "rgba(46,204,113,0.08)" : "transparent",
      }}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const programsDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { loading, user } = useAuth();
  const [programsActive] = useRoute("/programs");
  const [masterclassActive] = useRoute("/masterclass");
  const [masterclassesActive] = useRoute("/masterclasses");
  const [enterpriseActive] = useRoute("/enterprise");
  const isProgramsActive = programsActive || masterclassActive || masterclassesActive || enterpriseActive;

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
      if (programsDropdownRef.current && !programsDropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "#0d1117",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.35)" : "0 1px 0 #1F2937",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: "72px" }}>
          {/* Logo — larger and more prominent */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={LOGO_URL}
              alt="UpskillinTech"
              style={{ height: "60px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <DesktopNavLink key={link.label} label={link.label} href={link.href} />
            ))}

            {/* Programs dropdown */}
            <div className="relative" ref={programsDropdownRef}>
              <button
                className="flex items-center gap-1.5 font-semibold transition-colors duration-150"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.975rem",
                  color: isProgramsActive || programsOpen ? ACTIVE_NAV_COLOR : "#F3F4F6",
                  fontWeight: isProgramsActive ? 800 : 600,
                  background: "none",
                  border: "none",
                  letterSpacing: "0.01em",
                }}
                onClick={() => {
                  setProgramsOpen(!programsOpen);
                  setResourcesOpen(false);
                }}
              >
                Programs{" "}
                <ChevronDown
                  size={16}
                  style={{
                    transition: "transform 0.2s",
                    transform: programsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {programsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl overflow-hidden"
                  style={{
                    background: "#151B23",
                    boxShadow: "0 12px 48px rgba(0,0,0,0.14)",
                    border: "1px solid #1F2937",
                  }}
                >
                  <div className="p-2.5">
                    {PROGRAM_LINKS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                        style={{ textDecoration: "none" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1A2230")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        onClick={() => setProgramsOpen(false)}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#10231C" }}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.9rem", color: "#F3F4F6" }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {secondaryNavLinks.map((link) => (
              <DesktopNavLink key={link.label} label={link.label} href={link.href} />
            ))}

            {/* Resources dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1.5 font-semibold transition-colors duration-150"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.975rem",
                  color: resourcesOpen ? "#2ecc71" : "#F3F4F6",
                  background: "none",
                  border: "none",
                  letterSpacing: "0.01em",
                }}
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setProgramsOpen(false);
                }}
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
                    background: "#151B23",
                    boxShadow: "0 12px 48px rgba(0,0,0,0.14)",
                    border: "1px solid #1F2937",
                  }}
                >
                  <div className="p-2.5">
                    <Link
                      href="/resources"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 font-bold"
                      style={{
                        background: "linear-gradient(135deg, rgba(46,204,113,0.08), rgba(46,204,113,0.08))",
                        color: "#2ecc71",
                        fontFamily: "'Sora', sans-serif",
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
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1A2230")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        onClick={() => setResourcesOpen(false)}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#10231C" }}>
                          {r.icon}
                        </div>
                        <div>
                          <div className="font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.9rem", color: "#F3F4F6" }}>
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
          <div className="hidden xl:flex items-center gap-3">
            {!loading && user ? (
              <Link href="/dashboard" style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#D1D5DB", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#2ecc71")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#D1D5DB")}
              >
                Dashboard
              </Link>
            ) : (
              <GoogleSignInButton size="sm" label="Get Started" variant="default" />
            )}
            {!loading && user && (
              <Link href="/onboarding" className="btn-primary" style={{ fontSize: "0.9rem", padding: "0.7rem 1.5rem", background: "#2ecc71", boxShadow: "0 4px 14px rgba(46,204,113,0.25)" }}>
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden p-2 rounded-md"
            style={{ color: "#F3F4F6" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden border-t" style={{ background: "#0d1117", borderColor: "#1F2937" }}>
          <div className="container py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <MobileNavLink key={link.label} label={link.label} href={link.href} onClick={() => setMenuOpen(false)} />
            ))}
            <div className="mt-2 mb-1">
              <p className="text-xs font-bold uppercase tracking-wider px-3 py-1.5" style={{ color: "#9CA3AF" }}>
                Programs
              </p>
              {PROGRAM_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl"
                  style={{ color: "#F3F4F6", textDecoration: "none", fontSize: "0.95rem" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
            {secondaryNavLinks.map((link) => (
              <MobileNavLink key={link.label} label={link.label} href={link.href} onClick={() => setMenuOpen(false)} />
            ))}
            <div className="mt-2 mb-1">
              <p className="text-xs font-bold uppercase tracking-wider px-3 py-1.5" style={{ color: "#9CA3AF" }}>
                Resources
              </p>
              <Link
                href="/resources"
                className="font-bold py-2.5 px-3 block rounded-xl"
                style={{ color: "#2ecc71", textDecoration: "none", fontSize: "1rem" }}
                onClick={() => setMenuOpen(false)}
              >
                All Resources
              </Link>
              {RESOURCE_LINKS.map((r) => (
                <Link
                  key={r.label}
                  href={r.href}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl"
                  style={{ color: "#F3F4F6", textDecoration: "none", fontSize: "0.95rem" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {r.icon} {r.label}
                </Link>
              ))}
            </div>
            {!loading && user ? (
              <>
                <Link href="/onboarding" className="btn-primary mt-3 text-center justify-center" style={{ background: "#2ecc71" }} onClick={() => setMenuOpen(false)}>
                  Get Started
                </Link>
                <Link href="/dashboard" className="btn-outline mt-2 text-center justify-center" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </>
            ) : (
              <GoogleSignInButton className="mt-3 w-full" label="Get Started" variant="default" onClick={() => setMenuOpen(false)} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
