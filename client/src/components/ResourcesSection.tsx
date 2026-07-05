/**
 * ResourcesSection — UpskillinTech v3
 * White bg, 4 large content cards, richer descriptions, left border accent
 */
import { BookOpen, FileText, BarChart2, Video, ArrowRight } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    color: "#2E7B20",
    bg: "rgba(46,123,32,0.10)",
    title: "Blog",
    desc: "Practical AI insights, how-to guides, and strategies for professionals ready to work smarter.",
    count: "20+ Articles",
    href: "/resources/blog",
  },
  {
    icon: FileText,
    color: "#50B040",
    bg: "rgba(139,158,26,0.10)",
    title: "AI Guides",
    desc: "Free downloadable guides covering AI tools, prompt engineering, and workflow automation.",
    count: "4 Free Guides",
    href: "/resources/ai-guides",
  },
  {
    icon: BarChart2,
    color: "#2E7B20",
    bg: "rgba(46,123,32,0.10)",
    title: "Case Studies",
    desc: "Real-world stories of professionals and organisations who transformed their work with AI.",
    count: "6 Case Studies",
    href: "/resources/case-studies",
  },
  {
    icon: Video,
    color: "#D1A81D",
    bg: "rgba(209,168,29,0.12)",
    title: "Webinars",
    desc: "Live training sessions and recorded masterclasses on AI productivity and strategy.",
    count: "8 Sessions",
    href: "/resources/webinars",
  },
];

export default function ResourcesSection() {
  return (
    <section className="section-py" style={{ background: "#151B23" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-5">Free Resources</span>
          <h2 className="mt-4 mb-5">
            UpskillinTech <span style={{ color: "#2E7B20" }}>Resources</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ fontSize: "1.15rem", color: "#9CA3AF" }}>
            Everything you need to start, grow, and lead with AI — available free to the community.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-12">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <a
                key={r.title}
                href={r.href}
                className="rounded-2xl p-7 flex flex-col transition-all duration-200"
                style={{
                  background: "#151B23",
                  border: "1px solid #1F2937",
                  borderLeft: `4px solid ${r.color}`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-5px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 16px 48px rgba(46,123,32,0.14)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: r.bg }}>
                  <Icon size={28} style={{ color: r.color }} />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: r.color }}>
                  {r.count}
                </div>
                <h3 className="mb-3" style={{ fontSize: "1.2rem" }}>{r.title}</h3>
                <p className="mb-5 flex-1" style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#9CA3AF" }}>{r.desc}</p>
                <div className="flex items-center gap-1.5 font-semibold text-sm mt-auto" style={{ color: r.color, fontFamily: "'Sora', sans-serif" }}>
                  Explore <ArrowRight size={15} />
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center">
          <a href="/resources" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}>
            View All Resources
          </a>
        </div>
      </div>
    </section>
  );
}
