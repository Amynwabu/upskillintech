import { Instagram, Linkedin, Music2, Youtube } from "lucide-react";
import Logo from "@/components/Logo";

const groups = [
  {
    title: "Learn",
    links: [
      ["AI Training", "/programs"],
      ["AI for Business", "/enterprise"],
      ["Webinars", "/resources/webinars"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Resources Hub", "/resources"],
      ["AI Guides", "/resources/ai-guides"],
      ["Blog", "/resources/blog"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Consultancy", "/consult"],
      ["Contact", "/contact"],
    ],
  },
];

const socials = [
  [Linkedin, "LinkedIn", "https://www.linkedin.com/company/upskillintech"],
  [Music2, "TikTok", "https://www.tiktok.com/@upskillintech"],
  [Youtube, "YouTube", "https://www.youtube.com/@upskillintech"],
  [Instagram, "Instagram", "https://www.instagram.com/upskillintech"],
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#07100b] text-white">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="dark-background" size="lg" />
            <p className="mt-5 max-w-md text-[#d7ddd9]">
              Practical AI learning and consultancy for individuals,
              professionals, solopreneurs, and business owners.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(([Icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-[#859d30] hover:bg-[#859d30]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          {groups.map(group => (
            <div key={group.title}>
              <h2 className="text-base text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      className="text-[#d7ddd9] hover:text-[#859d30]"
                      href={href}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-[#d7ddd9] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} UpskillinTech. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
