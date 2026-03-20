/**
 * Resources Hub Page — UpskillinTech
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Yellow (#E6B800)
 * Font: Poppins headings, Inter body
 * URL: /resources
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  BookOpen, Download, ArrowRight, Search, Play,
  Users, Briefcase, ChevronRight, Star, Clock,
  FileText, Zap, BarChart2, Mic, Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const FEATURED = [
  {
    icon: <BookOpen size={28} style={{ color: "#38B54A" }} />,
    badge: "Free Guide",
    title: "AI Productivity Guide",
    desc: "Learn how professionals save hours every week using structured AI workflows — from email management to strategic decision-making.",
    cta: "Read Guide",
    href: "/resources/ai-guides",
    bg: "#F0FDF4",
    border: "#38B54A",
  },
  {
    icon: <FileText size={28} style={{ color: "#8B9E1A" }} />,
    badge: "Download",
    title: "50 AI Prompts Library",
    desc: "Curated prompts for research, writing, strategy, and decision-making — ready to copy and use in ChatGPT, Gemini, or Claude.",
    cta: "Download Free",
    href: "/resources/ai-guides",
    bg: "#FEFCE8",
    border: "#E6B800",
  },
  {
    icon: <Zap size={28} style={{ color: "#8B9E1A" }} />,
    badge: "Playbook",
    title: "AI Workflow Playbook",
    desc: "Real-world examples of AI productivity systems used by professionals in meetings, research, content creation, and leadership.",
    cta: "Explore Playbook",
    href: "/resources/workflows",
    bg: "#F7F8FA",
    border: "#8B9E1A",
  },
];

const BLOG_CATEGORIES = [
  { icon: <Zap size={22} />, title: "AI Productivity", desc: "Learn how AI improves efficiency and saves hours every week.", href: "/resources/blog" },
  { icon: <Layers size={22} />, title: "AI Workflows", desc: "Discover structured AI-powered workflows for real work.", href: "/resources/blog" },
  { icon: <BarChart2 size={22} />, title: "AI Tools", desc: "Explore tools that improve productivity and decision-making.", href: "/resources/blog" },
  { icon: <Users size={22} />, title: "AI Leadership", desc: "How leaders use AI to support communication and strategy.", href: "/resources/blog" },
  { icon: <Briefcase size={22} />, title: "AI Strategy", desc: "The future of AI and organisational transformation.", href: "/resources/blog" },
];

const AI_GUIDES = [
  { title: "AI Prompts Library", desc: "Curated prompts for real-world use cases — research, writing, strategy, and more.", cta: "Explore", href: "/resources/ai-guides" },
  { title: "AI Productivity Guide", desc: "Frameworks for integrating AI into daily workflows and saving hours every week.", cta: "Download", href: "/resources/ai-guides" },
  { title: "AI Tools Guide", desc: "A curated overview of the most useful AI tools for professionals in 2025.", cta: "Read Guide", href: "/resources/ai-guides" },
];

const CASE_STUDIES = [
  { icon: <Briefcase size={22} style={{ color: "#38B54A" }} />, title: "Professional Use Cases", desc: "Examples of individuals integrating AI into their daily work — from consultants to educators.", href: "/resources/case-studies" },
  { icon: <Users size={22} style={{ color: "#8B9E1A" }} />, title: "Organisational AI Adoption", desc: "How teams implement AI productivity systems and transform internal processes.", href: "/resources/case-studies" },
  { icon: <Star size={22} style={{ color: "#E6B800" }} />, title: "Ministry AI Applications", desc: "Using AI to support teaching, communication, and administration in faith communities.", href: "/resources/case-studies" },
];

const WEBINARS = [
  { type: "Past", title: "AI Productivity Masterclass", date: "Feb 2025", speaker: "Dr. Amaka Adiuku", href: "/resources/webinars" },
  { type: "Past", title: "Building AI Workflows for Teams", date: "Jan 2025", speaker: "UpskillinTech Team", href: "/resources/webinars" },
  { type: "Upcoming", title: "AI Strategy for Leaders", date: "Apr 2025", speaker: "Dr. Amaka Adiuku", href: "/resources/webinars" },
];

const WORKFLOWS = [
  { title: "Project Management", steps: ["Meeting", "AI Summary", "Action Items", "Follow-up"], href: "/resources/workflows" },
  { title: "Research Workflows", steps: ["Research Question", "AI Insights", "Structured Report"], href: "/resources/workflows" },
  { title: "Content Creation", steps: ["Idea", "AI Draft", "Editing", "Final Publication"], href: "/resources/workflows" },
  { title: "Leadership Workflows", steps: ["Strategic Question", "AI Analysis", "Decision Framework"], href: "/resources/workflows" },
];

const POPULAR_TOPICS = ["AI Productivity", "AI Prompts", "AI Workflows", "AI Strategy", "AI Tools", "AI Leadership"];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"…`, { description: "Full search coming soon." });
    }
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Please enter your email address."); return; }
    toast.success("🎉 Guide on its way!", { description: "Check your inbox for the 50 AI Prompts guide." });
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ── 1. HERO ── */}
      <section
        className="relative overflow-hidden pt-16"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}
      >
        <div className="absolute top-[-80px] right-[-80px] rounded-full pointer-events-none" style={{ width: 400, height: 400, background: "rgba(230,184,0,0.10)" }} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(56,181,74,0.10)", color: "#1C1C1C", border: "1px solid rgba(255,255,255,0.35)" }}>Resource Hub</span>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>
                Insights, Guides, and Practical Tools for the AI-Enabled World
              </h1>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#555" }}>
                Explore articles, guides, workflows, and case studies that help professionals, leaders, and organisations integrate AI into real work and decision-making.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/resources/ai-guides" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all" style={{ background: "#fff", color: "#38B54A", fontFamily: "'Poppins', sans-serif" }}>
                  <BookOpen size={18} /> Explore AI Guides
                </Link>
                <Link href="/resources/blog" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg border-2 transition-all" style={{ borderColor: "#fff", color: "#1C1C1C", fontFamily: "'Poppins', sans-serif" }}>
                  <ArrowRight size={18} /> Browse Blog
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4 max-w-sm w-full ml-auto">
              {[
                { icon: <BookOpen size={28} style={{ color: "#38B54A" }} />, label: "AI Guides", count: "12+" },
                { icon: <FileText size={28} style={{ color: "#8B9E1A" }} />, label: "Blog Articles", count: "40+" },
                { icon: <Play size={28} style={{ color: "#E6B800" }} />, label: "Webinars", count: "20+" },
                { icon: <Zap size={28} style={{ color: "#38B54A" }} />, label: "Workflows", count: "15+" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-5 text-center" style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}>
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{item.count}</div>
                  <div className="text-xs" style={{ color: "#6B7280" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div style={{ background: "linear-gradient(90deg, #8B9E1A 0%, #E6B800 100%)" }}>
          <div className="container py-4">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              {[{ v: "40+", l: "Articles Published" }, { v: "12+", l: "AI Guides" }, { v: "20+", l: "Webinar Recordings" }, { v: "15+", l: "Workflow Templates" }].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{s.v}</div>
                  <div className="text-xs font-medium" style={{ color: "rgba(0,0,0,0.65)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED RESOURCES ── */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Top Picks</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>Featured Resources</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#6B7280" }}>Our highest-value guides and tools — free to access.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED.map((f) => (
              <div key={f.title} className="rounded-2xl p-7 flex flex-col" style={{ background: f.bg, border: `2px solid ${f.border}30`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl p-3" style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>{f.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: `${f.border}18`, color: f.border }}>{f.badge}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "#4B5563" }}>{f.desc}</p>
                <Link href={f.href} className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: f.border }}>
                  {f.cta} <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BLOG ── */}
      <section className="section-py" style={{ background: "#F7F8FA" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Knowledge Base</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>Blog</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#6B7280" }}>Practical insights on how AI is transforming work, leadership, and innovation.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_CATEGORIES.map((cat) => (
              <Link key={cat.title} href={cat.href} className="group rounded-xl p-6 flex items-start gap-4 transition-all hover:-translate-y-1" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="rounded-xl p-3 shrink-0" style={{ background: "#F0FDF4", color: "#38B54A" }}>{cat.icon}</div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-green-600 transition-colors" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{cat.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{cat.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold mt-3" style={{ color: "#38B54A" }}>View Articles <ChevronRight size={14} /></span>
                </div>
              </Link>
            ))}
            <Link href="/resources/blog" className="rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1" style={{ background: "linear-gradient(135deg, #38B54A, #8B9E1A)", boxShadow: "0 4px 20px rgba(56,181,74,0.25)" }}>
              <BookOpen size={32} style={{ color: "#fff" }} className="mb-3" />
              <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>View All Articles</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>40+ articles and growing</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. AI GUIDES ── */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Learning Materials</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>AI Guides</h2>
              <p className="text-lg mb-8" style={{ color: "#6B7280" }}>Practical guides designed to help individuals and organisations integrate AI into everyday activities — from prompts to productivity frameworks.</p>
              <div className="flex flex-col gap-4">
                {AI_GUIDES.map((g) => (
                  <div key={g.title} className="flex items-start gap-4 rounded-xl p-5" style={{ background: "#F7F8FA", border: "1px solid #E5E7EB" }}>
                    <div className="rounded-lg p-2 shrink-0" style={{ background: "#F0FDF4" }}>
                      <BookOpen size={20} style={{ color: "#38B54A" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{g.title}</h3>
                      <p className="text-sm" style={{ color: "#6B7280" }}>{g.desc}</p>
                    </div>
                    <Link href={g.href} className="shrink-0 text-sm font-semibold flex items-center gap-1" style={{ color: "#38B54A" }}>
                      {g.cta} <ChevronRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
              <Link href="/resources/ai-guides" className="inline-flex items-center gap-2 mt-8 font-semibold px-6 py-3 rounded-lg" style={{ background: "#38B54A", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
                <Download size={18} /> Browse All Guides
              </Link>
            </div>
            {/* Email capture */}
            <div className="rounded-2xl p-8" style={{ background: "linear-gradient(135deg, #8B9E1A 0%, #E6B800 100%)", boxShadow: "0 16px 48px rgba(139,158,26,0.25)" }}>
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>Get the Free AI Prompts Library</h3>
              <p className="mb-6 text-sm" style={{ color: "rgba(0,0,0,0.70)" }}>50 prompts for research, writing, strategy, and decision-making — delivered straight to your inbox.</p>
              <form onSubmit={handleDownload} className="flex flex-col gap-3">
                <input type="text" placeholder="Your Name" className="rounded-lg px-4 py-3 text-sm outline-none w-full" style={{ border: "none", color: "#1C1C1C" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="rounded-lg px-4 py-3 text-sm outline-none w-full" style={{ border: "none", color: "#1C1C1C" }} />
                <button type="submit" className="w-full font-bold py-3 rounded-lg transition-all" style={{ background: "#1C1C1C", color: "#E6B800", fontFamily: "'Poppins', sans-serif" }}>
                  Download Free Guide
                </button>
              </form>
              <p className="text-xs mt-3 text-center" style={{ color: "rgba(0,0,0,0.55)" }}>No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CASE STUDIES ── */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: "rgba(230,184,0,0.15)", color: "#E6B800" }}>Real Impact</span>
            <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#fff" }}>Case Studies</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.70)" }}>Real examples of how professionals, organisations, and ministries use AI to improve productivity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs) => (
              <Link key={cs.title} href={cs.href} className="group rounded-2xl p-7 flex flex-col transition-all hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <div className="rounded-xl p-3 mb-4 w-fit" style={{ background: "rgba(255,255,255,0.08)" }}>{cs.icon}</div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-400 transition-colors" style={{ fontFamily: "'Poppins', sans-serif", color: "#fff" }}>{cs.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.65)" }}>{cs.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold mt-5" style={{ color: "#E6B800" }}>View Case Studies <ChevronRight size={14} /></span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/resources/case-studies" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg" style={{ background: "#E6B800", color: "#1C1C1C", fontFamily: "'Poppins', sans-serif" }}>
              View All Case Studies <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. WEBINARS ── */}
      <section className="section-py" style={{ background: "#F7F8FA" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Live &amp; Recorded</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>Webinars</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#6B7280" }}>Learn from live and recorded sessions exploring practical AI applications.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {WEBINARS.map((w) => (
              <div key={w.title} className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="h-2" style={{ background: w.type === "Upcoming" ? "#E6B800" : "#38B54A" }} />
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: w.type === "Upcoming" ? "#FEFCE8" : "#F0FDF4", color: w.type === "Upcoming" ? "#8B6914" : "#166534" }}>{w.type}</span>
                  <h3 className="font-bold mt-3 mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{w.title}</h3>
                  <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "#6B7280" }}>
                    <Clock size={13} /> {w.date} · {w.speaker}
                  </div>
                  <Link href={w.href} className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: w.type === "Upcoming" ? "#8B6914" : "#38B54A" }}>
                    {w.type === "Upcoming" ? "Register" : "Watch Now"} <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/resources/webinars" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg" style={{ background: "#38B54A", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
              <Mic size={18} /> View All Webinars
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. AI WORKFLOW LIBRARY ── */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Practical Tools</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>AI Workflow Library</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#6B7280" }}>Discover practical AI workflows used in real professional environments — ready to adapt and implement today.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {WORKFLOWS.map((wf) => (
              <Link key={wf.title} href={wf.href} className="group rounded-xl p-6 transition-all hover:-translate-y-1" style={{ background: "#F7F8FA", border: "1px solid #E5E7EB" }}>
                <h3 className="font-bold mb-4 group-hover:text-green-600 transition-colors" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{wf.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {wf.steps.map((step, si) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background: "#021301" }}>{step}</span>
                      {si < wf.steps.length - 1 && <span style={{ color: "#E6B800", fontWeight: 700 }}>→</span>}
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold mt-4" style={{ color: "#38B54A" }}>Explore Workflow <ChevronRight size={14} /></span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/resources/workflows" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg" style={{ background: "#38B54A", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
              <Zap size={18} /> View Full Workflow Library
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. SEARCH ── */}
      <section className="section-py" style={{ background: "#F0FDF4" }}>
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>Search Resources</h2>
          <p className="mb-6" style={{ color: "#6B7280" }}>Find articles, guides, workflows, and webinars.</p>
          <form onSubmit={handleSearch} className="flex gap-3 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for AI productivity, workflows, prompts…"
              className="flex-1 rounded-lg px-4 py-3 text-sm outline-none"
              style={{ border: "2px solid #38B54A", fontFamily: "'Inter', sans-serif" }}
            />
            <button type="submit" className="flex items-center gap-2 font-semibold px-5 py-3 rounded-lg" style={{ background: "#38B54A", color: "#fff" }}>
              <Search size={18} />
            </button>
          </form>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm font-medium mr-2" style={{ color: "#6B7280" }}>Popular:</span>
            {POPULAR_TOPICS.map(t => (
              <button key={t} onClick={() => { setSearchQuery(t); toast.success(`Searching "${t}"…`); }} className="text-sm px-3 py-1 rounded-full transition-all hover:bg-green-100" style={{ background: "#fff", border: "1px solid #38B54A", color: "#38B54A" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. LEAD MAGNET ── */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto rounded-2xl p-10 text-center" style={{ background: "linear-gradient(135deg, #38B54A 0%, #8B9E1A 60%, #E6B800 100%)" }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(0,0,0,0.15)", color: "#fff" }}>Free Resource</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#fff" }}>
              50 AI Prompts Every Professional Should Know
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.90)" }}>
              Learn powerful prompts used for research, strategy, writing, and decision-making — curated for professionals ready to work smarter.
            </p>
            <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 rounded-lg px-4 py-3 text-sm outline-none" style={{ border: "none", color: "#1C1C1C" }} />
              <button type="submit" className="font-bold px-6 py-3 rounded-lg whitespace-nowrap" style={{ background: "#1C1C1C", color: "#E6B800", fontFamily: "'Poppins', sans-serif" }}>
                Download Free Guide
              </button>
            </form>
            <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.70)" }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className="section-py" style={{ background: "#F7F8FA" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>
            Ready to Go Beyond Articles?
          </h2>
          <p className="text-lg mb-8" style={{ color: "#6B7280" }}>
            UpskillinTech programs teach professionals how to integrate AI into real work and productivity systems — not just theory, but hands-on transformation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#programs" className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-lg" style={{ background: "#38B54A", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
              <ArrowRight size={18} /> Explore Programs
            </Link>
            <Link href="/#community" className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-lg border-2" style={{ borderColor: "#38B54A", color: "#38B54A", fontFamily: "'Poppins', sans-serif" }}>
              <Users size={18} /> Join Community
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
