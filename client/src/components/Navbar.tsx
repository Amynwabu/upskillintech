import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Learn AI", href: "/programs" },
  { label: "AI for Business", href: "/enterprise" },
  { label: "Consultancy", href: "/consult" },
  { label: "About", href: "/about" },
];

const resources = [
  { label: "Resources Hub", href: "/resources" },
  { label: "AI Guides", href: "/resources/ai-guides" },
  { label: "Webinars", href: "/resources/webinars" },
  { label: "Blog", href: "/resources/blog" },
];

function NavLink({
  label,
  href,
  mobile = false,
  onClick,
}: {
  label: string;
  href: string;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const [active] = useRoute(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${mobile ? "block rounded-lg px-3 py-3" : ""} font-semibold transition-colors`}
      style={{
        color: active ? "#859d30" : "#111111",
        background: mobile && active ? "#f4f7ea" : "transparent",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e5e7eb] bg-white">
      <nav
        className="container flex h-[72px] items-center justify-between"
        aria-label="Main navigation"
      >
        <Logo variant="light-background" size="lg" />

        <div className="hidden items-center gap-7 xl:flex">
          {mainLinks.slice(0, 4).map(link => (
            <NavLink key={link.href} {...link} />
          ))}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 font-semibold text-[#111111] hover:text-[#859d30]"
              aria-expanded={resourcesOpen}
              onClick={() => setResourcesOpen(value => !value)}
            >
              Resources <ChevronDown size={16} />
            </button>
            {resourcesOpen && (
              <div className="absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2 rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-lg">
                {resources.map(link => (
                  <NavLink
                    key={link.href}
                    {...link}
                    mobile
                    onClick={() => setResourcesOpen(false)}
                  />
                ))}
              </div>
            )}
          </div>
          <NavLink {...mainLinks[4]} />
        </div>

        <a
          className="btn-primary hidden px-5 py-2.5 text-sm xl:inline-flex"
          href="/programs"
        >
          Get Started
        </a>

        <button
          type="button"
          className="rounded-lg p-2 text-[#111111] xl:hidden"
          onClick={() => setMenuOpen(value => !value)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#e5e7eb] bg-white px-5 py-4 xl:hidden">
          <div className="mx-auto flex max-w-3xl flex-col gap-1">
            {mainLinks.map(link => (
              <NavLink
                key={link.href}
                {...link}
                mobile
                onClick={() => setMenuOpen(false)}
              />
            ))}
            <p className="mb-1 mt-3 px-3 text-sm font-bold text-[#5f6368]">
              Resources
            </p>
            {resources.map(link => (
              <NavLink
                key={link.href}
                {...link}
                mobile
                onClick={() => setMenuOpen(false)}
              />
            ))}
            <a className="btn-primary mt-3 justify-center" href="/programs">
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
