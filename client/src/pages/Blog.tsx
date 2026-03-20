/**
 * Blog Page — UpskillinTech
 * URL: /resources/blog
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Yellow (#E6B800)
 */
import { useState } from "react";
import { Link } from "wouter";
import { Clock, ChevronRight, ArrowRight, Tag, Users, Zap, Layers, BarChart2, Briefcase, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = [
  { id: "all", label: "All Articles" },
  { id: "productivity", label: "AI Productivity" },
  { id: "workflows", label: "AI Workflows" },
  { id: "tools", label: "AI Tools" },
  { id: "leadership", label: "AI Leadership" },
  { id: "strategy", label: "AI Strategy" },
];

const ARTICLES = [
  {
    id: 1,
    category: "productivity",
    categoryLabel: "AI Productivity",
    title: "How to Save 10 Hours a Week Using AI — A Practical Guide for Professionals",
    excerpt: "Most professionals spend hours on tasks that AI can handle in minutes. This guide walks you through the exact workflows that save time without sacrificing quality — from email drafting to meeting summaries.",
    readTime: "8 min read",
    date: "Mar 2025",
    author: "Dr. Amaka Adiuku",
    featured: true,
    tags: ["AI Productivity", "Time Management", "Workflows"],
  },
  {
    id: 2,
    category: "workflows",
    categoryLabel: "AI Workflows",
    title: "The Meeting-to-Action AI Workflow: From Transcript to Task List in 5 Minutes",
    excerpt: "Meetings are productivity killers — unless you use AI to extract value instantly. Here's the exact workflow used by UpskillinTech graduates to turn any meeting into a structured action plan.",
    readTime: "6 min read",
    date: "Feb 2025",
    author: "UpskillinTech Team",
    featured: true,
    tags: ["AI Workflows", "Meetings", "Productivity"],
  },
  {
    id: 3,
    category: "tools",
    categoryLabel: "AI Tools",
    title: "ChatGPT vs Claude vs Gemini: Which AI Tool Should Professionals Use in 2025?",
    excerpt: "You don't need all the AI tools — you need the right ones. We tested the top three AI assistants across real professional tasks and here's what we found.",
    readTime: "10 min read",
    date: "Feb 2025",
    author: "Dr. Amaka Adiuku",
    featured: false,
    tags: ["AI Tools", "ChatGPT", "Claude"],
  },
  {
    id: 4,
    category: "leadership",
    categoryLabel: "AI Leadership",
    title: "How Leaders Can Use AI to Communicate More Clearly and Decide More Confidently",
    excerpt: "AI doesn't replace leadership — it amplifies it. Discover how executives and managers are using AI to sharpen their communication, speed up decision-making, and lead more effectively.",
    readTime: "7 min read",
    date: "Jan 2025",
    author: "Dr. Amaka Adiuku",
    featured: false,
    tags: ["AI Leadership", "Communication", "Decision-Making"],
  },
  {
    id: 5,
    category: "strategy",
    categoryLabel: "AI Strategy",
    title: "Building an AI Strategy for Your Organisation: A Step-by-Step Framework",
    excerpt: "Most organisations want to adopt AI but don't know where to start. This framework breaks down the process into four clear stages — from audit to full integration.",
    readTime: "12 min read",
    date: "Jan 2025",
    author: "UpskillinTech Team",
    featured: false,
    tags: ["AI Strategy", "Organisations", "Transformation"],
  },
  {
    id: 6,
    category: "productivity",
    categoryLabel: "AI Productivity",
    title: "50 AI Prompts That Will Change How You Work — Curated for Professionals",
    excerpt: "The right prompt is the difference between a mediocre AI response and a brilliant one. Here are 50 battle-tested prompts for research, writing, strategy, and decision-making.",
    readTime: "5 min read",
    date: "Dec 2024",
    author: "UpskillinTech Team",
    featured: false,
    tags: ["AI Prompts", "Productivity", "ChatGPT"],
  },
  {
    id: 7,
    category: "workflows",
    categoryLabel: "AI Workflows",
    title: "The Research-to-Report Workflow: How to Use AI to Produce Professional Reports Faster",
    excerpt: "Research doesn't have to take days. With the right AI workflow, you can go from a research question to a polished, structured report in a fraction of the time.",
    readTime: "9 min read",
    date: "Dec 2024",
    author: "Dr. Amaka Adiuku",
    featured: false,
    tags: ["AI Workflows", "Research", "Writing"],
  },
  {
    id: 8,
    category: "tools",
    categoryLabel: "AI Tools",
    title: "The Best AI Tools for Educators and Trainers in 2025",
    excerpt: "From lesson planning to student feedback, AI is transforming how educators work. Here are the tools making the biggest difference in classrooms and training rooms.",
    readTime: "8 min read",
    date: "Nov 2024",
    author: "UpskillinTech Team",
    featured: false,
    tags: ["AI Tools", "Education", "Training"],
  },
  {
    id: 9,
    category: "leadership",
    categoryLabel: "AI Leadership",
    title: "AI for Pastors and Church Leaders: Practical Applications for Ministry",
    excerpt: "Ministry is deeply human — but AI can handle the administrative, creative, and communication tasks that take time away from people. Here's how faith leaders are using AI effectively.",
    readTime: "7 min read",
    date: "Nov 2024",
    author: "Dr. Amaka Adiuku",
    featured: false,
    tags: ["AI Leadership", "Ministry", "Church"],
  },
  {
    id: 10,
    category: "strategy",
    categoryLabel: "AI Strategy",
    title: "Why Most AI Adoption Fails — and How to Make Sure Yours Doesn't",
    excerpt: "The majority of organisations that try to adopt AI give up within six months. The problem isn't the technology — it's the approach. Here's what separates successful AI adoption from failed experiments.",
    readTime: "11 min read",
    date: "Oct 2024",
    author: "Dr. Amaka Adiuku",
    featured: false,
    tags: ["AI Strategy", "Adoption", "Change Management"],
  },
  {
    id: 11,
    category: "productivity",
    categoryLabel: "AI Productivity",
    title: "AI for Small Business Owners: How to Compete with Larger Companies Using AI",
    excerpt: "Small businesses that use AI effectively can outpace competitors ten times their size. Here's how entrepreneurs are using AI to punch above their weight.",
    readTime: "8 min read",
    date: "Oct 2024",
    author: "UpskillinTech Team",
    featured: false,
    tags: ["AI Productivity", "Small Business", "Entrepreneurship"],
  },
  {
    id: 12,
    category: "workflows",
    categoryLabel: "AI Workflows",
    title: "Content Creation at Scale: How to Use AI to Produce More Without Burning Out",
    excerpt: "Content creators, marketers, and communicators are using AI to multiply their output without multiplying their hours. Here's the exact workflow that makes it possible.",
    readTime: "7 min read",
    date: "Sep 2024",
    author: "UpskillinTech Team",
    featured: false,
    tags: ["AI Workflows", "Content Creation", "Marketing"],
  },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  productivity: <Zap size={16} />,
  workflows: <Layers size={16} />,
  tools: <BarChart2 size={16} />,
  leadership: <Users size={16} />,
  strategy: <Briefcase size={16} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  productivity: "#38B54A",
  workflows: "#8B9E1A",
  tools: "#E6B800",
  leadership: "#38B54A",
  strategy: "#8B9E1A",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all" ? ARTICLES : ARTICLES.filter(a => a.category === activeCategory);
  const featured = ARTICLES.filter(a => a.featured);
  const rest = filtered.filter(a => !a.featured);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(56,181,74,0.10)", color: "#1C1C1C", border: "1px solid rgba(255,255,255,0.35)" }}>Blog</span>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>
              Practical Insights on AI for the Modern Professional
            </h1>
            <p className="text-lg mb-6" style={{ color: "#555" }}>
              Explore how AI is transforming work, leadership, and innovation — with actionable articles written for professionals who want results, not just theory.
            </p>
            <div className="flex items-center gap-4 text-sm" style={{ color: "#555" }}>
              <span className="flex items-center gap-1"><BookOpen size={15} /> 40+ Articles</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Users size={15} /> 5 Categories</span>
              <span>·</span>
              <span>Updated weekly</span>
            </div>
          </div>
        </div>
        <div style={{ background: "linear-gradient(90deg, #8B9E1A 0%, #E6B800 100%)" }}>
          <div className="container py-3">
            <div className="flex flex-wrap gap-6 justify-center">
              {CATEGORIES.slice(1).map(c => (
                <span key={c.id} className="text-xs font-semibold flex items-center gap-1" style={{ color: "#1C1C1C" }}>
                  {CATEGORY_ICONS[c.id]} {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {activeCategory === "all" && (
        <section className="section-py" style={{ background: "#fff" }}>
          <div className="container">
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featured.map(article => (
                <div key={article.id} className="rounded-2xl overflow-hidden" style={{ border: "2px solid #38B54A20", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
                  <div className="h-2" style={{ background: "linear-gradient(90deg, #38B54A, #E6B800)" }} />
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1" style={{ background: "#F0FDF4", color: "#38B54A" }}>
                        {CATEGORY_ICONS[article.category]} {article.categoryLabel}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: "#FEFCE8", color: "#8B6914" }}>Featured</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 leading-snug" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{article.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs" style={{ color: "#9CA3AF" }}>
                        <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                        <span>{article.date}</span>
                        <span>{article.author}</span>
                      </div>
                      <button onClick={() => {}} className="text-sm font-semibold flex items-center gap-1" style={{ color: "#38B54A" }}>
                        Read <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter + All Articles */}
      <section className="section-py" style={{ background: "#F7F8FA" }}>
        <div className="container">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="text-sm font-semibold px-4 py-2 rounded-full transition-all"
                style={{
                  background: activeCategory === cat.id ? "#38B54A" : "#fff",
                  color: activeCategory === cat.id ? "#fff" : "#4B5563",
                  border: activeCategory === cat.id ? "none" : "1px solid #E5E7EB",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "all" ? rest : filtered).map(article => (
              <div key={article.id} className="rounded-xl bg-white flex flex-col" style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="h-1.5 rounded-t-xl" style={{ background: CATEGORY_COLORS[article.category] || "#38B54A" }} />
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1" style={{ color: CATEGORY_COLORS[article.category] || "#38B54A" }}>
                    {CATEGORY_ICONS[article.category]} {article.categoryLabel}
                  </span>
                  <h3 className="font-bold mb-3 leading-snug flex-1" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{article.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>{article.excerpt}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "#F7F8FA", color: "#6B7280", border: "1px solid #E5E7EB" }}>
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#F3F4F6" }}>
                    <span className="text-xs flex items-center gap-1" style={{ color: "#9CA3AF" }}>
                      <Clock size={12} /> {article.readTime} · {article.date}
                    </span>
                    <button onClick={() => {}} className="text-sm font-semibold flex items-center gap-1" style={{ color: "#38B54A" }}>
                      Read <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg" style={{ color: "#6B7280" }}>No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>Never Miss an Article</h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>Get the latest AI insights, guides, and workflows delivered to your inbox every week.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 rounded-lg px-4 py-3 text-sm outline-none" style={{ border: "none", color: "#1C1C1C" }} />
            <button className="font-bold px-6 py-3 rounded-lg whitespace-nowrap" style={{ background: "#E6B800", color: "#1C1C1C", fontFamily: "'Sora', sans-serif" }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Back to Resources */}
      <section className="py-8" style={{ background: "#F7F8FA" }}>
        <div className="container text-center">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#38B54A" }}>
            ← Back to Resources Hub
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
