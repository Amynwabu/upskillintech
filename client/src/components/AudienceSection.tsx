/**
 * AudienceSection — "Who This Is For"
 * Design: White background, 3 audience cards with teal left-border accents
 * Each card links to relevant program pages
 */

import { useRef, useEffect, useState } from "react";
import { Briefcase, Users, Building2, ArrowRight } from "lucide-react";

const WORKSHOP_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/team-workshop-bMAWioFg8P87QuCK6GTYJU.webp";

const audiences = [
  {
    icon: Briefcase,
    title: "Professionals",
    subtitle: "Managers, Consultants, Analysts, Entrepreneurs",
    desc: "Learn AI productivity and workflow automation to save hours every week and deliver better results in your role.",
    cta: "Learn AI Productivity",
    color: "#0D9488",
    bg: "rgba(13,148,136,0.06)",
    tags: ["AI Productivity", "Workflow Automation", "Decision-Making"],
  },
  {
    icon: Users,
    title: "Leaders",
    subtitle: "Pastors, Educators, Nonprofit Leaders",
    desc: "Use AI for leadership, administration, communication, and community impact — without needing a technical background.",
    cta: "Explore Leadership AI",
    color: "#16A34A",
    bg: "rgba(22,163,74,0.06)",
    tags: ["Leadership AI", "Administration", "Community Impact"],
  },
  {
    icon: Building2,
    title: "Organizations",
    subtitle: "Companies, Institutions, Teams",
    desc: "Implement AI across your operations, train your teams, and build a culture of AI-enabled productivity.",
    cta: "Enterprise Solutions",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.06)",
    tags: ["Team Training", "AI Strategy", "Operations"],
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AudienceSection() {
  const { ref, inView } = useInView();

  return (
    <section id="audience" className="py-20 lg:py-28" style={{ background: "white" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Who It's For</div>
            <h2 className="mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#0F172A", lineHeight: 1.2 }}>
              Built for{" "}
              <span style={{ background: "linear-gradient(135deg, #0D9488, #16A34A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Real Professionals
              </span>
            </h2>
            <p className="text-lg" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
              Whether you're an individual professional, a community leader, or running an organization — UpskillinTech has a path designed for your context.
            </p>
          </div>
          <div className={`hidden lg:block transition-all duration-700 delay-200 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "16/10" }}>
              <img src={WORKSHOP_IMAGE} alt="AI workshop with diverse professionals" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Audience Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className={`rounded-xl p-7 border border-slate-100 hover:shadow-lg transition-all duration-300 group ${inView ? "animate-fade-up" : "opacity-0"}`}
                style={{
                  background: a.bg,
                  borderLeftColor: a.color,
                  borderLeftWidth: "4px",
                  animationDelay: `${i * 0.15}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${a.color}20` }}>
                  <Icon size={22} style={{ color: a.color }} />
                </div>
                <h3 className="font-bold text-xl mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#0F172A" }}>
                  {a.title}
                </h3>
                <p className="text-sm mb-3 font-medium" style={{ color: a.color, fontFamily: "'DM Sans', sans-serif" }}>
                  {a.subtitle}
                </p>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                  {a.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {a.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: `${a.color}15`, color: a.color, fontFamily: "'Sora', sans-serif" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#programs" className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: a.color, fontFamily: "'Sora', sans-serif" }}>
                  {a.cta} <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
