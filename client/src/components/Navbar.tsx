/**
 * Navbar — UpskillinTech v4 "Evergreen"
 * Deep forest bar, colored icon mark + white wordmark, single green accent,
 * light dropdown panels, green primary CTA.
 */
import { useState, useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { Menu, X, ChevronDown, BookOpen, FileText, Briefcase, Video, Zap, Mail } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const ICON_URL = "/icon-mark.png";
const NAV_BG = "#0C1F12";
const NAV_TEXT = "rgba(255,255,255,0.82)";
const NAV_ACTIVE = "#7ED164";
const ICON_GREEN = "#2E7B20";

const RESOURCE_LINKS = [
  { label: "Blog", desc: "Articles & insights", href: "/resources/blog", icon: BookOpen },
  { label: "AI Guides", desc: "Free downloadable guides", href: "/resources/ai-guides", icon: FileText },
  { label: "Case Studies", desc: "Real results & stories", href: "/resources/case-studies", icon: Briefcase },
  { label: "Webinars", desc: "Live & recorded sessions", href: "/resources/webinars", icon: Video },
  { label: "AI Workflows", desc: "Step-by-step templates", href: "/resources/workflows", icon: Zap },
  { label: "Newsletter", desc: "Weekly AI insights", href: "/newsletter", icon: Mail },
];

const PROGRAM_LINKS = [
  { label: "Programmes", desc: "Structured AI learning paths", href: "/programs", icon: BookOpen },
  { label: "Masterclass", desc: "Live practical AI sessions", href: "/masterclass", icon: Video },
  { label: "Enterprise", desc: "Team training and strategy", href: "/enterprise", icon: Briefcase },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const secondaryNavLinks = [
  { label: "Community", href: "/community" },
];

function Wordmark() {
  return (
    <span
      style={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 700,
        fontSize: "1.25rem",
        color: "#ffffff",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      UpskillinTech
    </span>
  );
}

function DesktopNavLink({ label, href }: { label: string; href: string }) {
  const [active] = useRoute(href);
  const color = active ? NAV_ACTIVE : NAV_TEXT;

  return (
    <Link
      href={href}
      className="transition-colors duration-150"
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: "0.9rem",
        color,
        fontWeight: active ? 700 : 500,
        textDecoration: "none",
        letterSpacing: "0.01em",
      }}
      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
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
      className="py-3 px-3 rounded-lg"
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: "1rem",
        color: active ? NAV_ACTIVE : "rgba(255,255,255,0.9)",
        fontWeight: active ? 700 : 500,
        textDecoration: "none",
        background: active ? "rgba(126,209,100,0.08)" : "transparent",
      }}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-xl overflow-hidden"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 16px 48px rgba(12,31,18,0.18)",
        border: "1px solid #E3EAE2",
      }}
    >
      <div className="p-2">{children}</div>
    </div>
  );
}

function DropdownItem({
  href,
  label,
  desc,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  desc: string;
  icon: typeof BookOpen;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
      style={{ textDecoration: "none" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F5FAF2")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      onClick={onClick}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "#E9F5E2" }}
      >
        <Icon size={17} style={{ color: ICON_GREEN }} />
      </div>
      <div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#17211A" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.78rem", color: "#5D6B60" }}>{desc}</div>
      </div>
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

  const dropdownButtonStyle = (open: boolean, active?: boolean) => ({
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.9rem",
    color: active || open ? NAV_ACTIVE : NAV_TEXT,
    fontWeight: active ? 700 : 500,
    background: "none",
    border: "none",
    letterSpacing: "0.01em",
  });

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: NAV_BG,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 4px 24px rgba(12,31,18,0.35)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: "72px" }}>
          {/* Logo: colored icon + white wordmark */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" style={{ textDecoration: "none" }}>
            <img
              src={ICON_URL}
              alt=""
              aria-hidden="true"
              style={{ height: "38px", width: "38px", objectFit: "contain" }}
            />
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <DesktopNavLink key={link.label} label={link.label} href={link.href} />
            ))}

            {/* Programs dropdown */}
            <div className="relative" ref={programsDropdownRef}>
              <button
                className="flex items-center gap-1.5 transition-colors duration-150"
                style={dropdownButtonStyle(programsOpen, isProgramsActive)}
                onClick={() => {
                  setProgramsOpen(!programsOpen);
                  setResourcesOpen(false);
                }}
              >
                Programmes{" "}
                <ChevronDown
                  size={15}
                  style={{
                    transition: "transform 0.2s",
                    transform: programsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {programsOpen && (
                <DropdownPanel>
                  {PROGRAM_LINKS.map((item) => (
                    <DropdownItem key={item.label} {...item} onClick={() => setProgramsOpen(false)} />
                  ))}
                </DropdownPanel>
              )}
            </div>

            {secondaryNavLinks.map((link) => (
              <DesktopNavLink key={link.label} label={link.label} href={link.href} />
            ))}

            {/* Resources dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1.5 transition-colors duration-150"
                style={dropdownButtonStyle(resourcesOpen)}
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setProgramsOpen(false);
                }}
              >
                Resources{" "}
                <ChevronDown
                  size={15}
                  style={{
                    transition: "transform 0.2s",
                    transform: resourcesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {resourcesOpen && (
                <DropdownPanel>
                  <Link
                    href="/resources"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1"
                    style={{
                      background: "#F5FAF2",
                      color: ICON_GREEN,
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      textDecoration: "none",
                    }}
                    onClick={() => setResourcesOpen(false)}
                  >
                    All Resources →
                  </Link>
                  {RESOURCE_LINKS.map((r) => (
                    <DropdownItem key={r.label} {...r} onClick={() => setResourcesOpen(false)} />
                  ))}
                </DropdownPanel>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="hidden xl:flex items-center gap-4">
            {!loading && user ? (
              <>
                <Link
                  href="/dashboard"
                  style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: NAV_TEXT, textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = NAV_TEXT)}
                >
                  Dashboard
                </Link>
                <Link href="/onboarding" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.65rem 1.4rem" }}>
                  Get Started
                </Link>
              </>
            ) : (
              <GoogleSignInButton size="sm" label="Get Started" variant="default" />
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden p-2 rounded-md"
            style={{ color: "#ffffff", background: "none", border: "none" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden" style={{ background: NAV_BG, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="container py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <MobileNavLink key={link.label} label={link.label} href={link.href} onClick={() => setMenuOpen(false)} />
            ))}
            <div className="mt-2 mb-1">
              <p className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                Programmes
              </p>
              {PROGRAM_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                    style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.95rem" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon size={17} style={{ color: NAV_ACTIVE }} /> {item.label}
                  </Link>
                );
              })}
            </div>
            {secondaryNavLinks.map((link) => (
              <MobileNavLink key={link.label} label={link.label} href={link.href} onClick={() => setMenuOpen(false)} />
            ))}
            <div className="mt-2 mb-1">
              <p className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                Resources
              </p>
              <Link
                href="/resources"
                className="py-2.5 px-3 block rounded-lg"
                style={{ color: NAV_ACTIVE, textDecoration: "none", fontSize: "0.95rem", fontWeight: 600 }}
                onClick={() => setMenuOpen(false)}
              >
                All Resources
              </Link>
              {RESOURCE_LINKS.map((r) => {
                const Icon = r.icon;
                return (
                  <Link
                    key={r.label}
                    href={r.href}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                    style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.95rem" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon size={17} style={{ color: NAV_ACTIVE }} /> {r.label}
                  </Link>
                );
              })}
            </div>
            {!loading && user ? (
              <>
                <Link href="/onboarding" className="btn-primary mt-3 text-center justify-center" onClick={() => setMenuOpen(false)}>
                  Get Started
                </Link>
                <Link href="/dashboard" className="btn-outline-white mt-2 text-center justify-center" onClick={() => setMenuOpen(false)}>
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
