/**
 * Newsletter Archive Page — /newsletter/archive
 * Full searchable archive of all newsletter editions
 */
import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Search, Mail, Calendar, Clock, ArrowRight, ChevronRight, CheckCircle
} from "lucide-react";

const ALL_EDITIONS = [
  { slug: "most-professionals-are-using-ai-wrong", title: "Most Professionals Are Using AI Wrong", excerpt: "Most people treat AI like a search engine. The real power is using AI for thinking, strategy, and workflow automation — and it changes everything.", date: "March 2026", readTime: "5 min read", tag: "Featured Insight", tagColor: "#38B54A" },
  { slug: "5-ai-workflows-that-save-professionals-10-hours-a-week", title: "5 AI Workflows That Save Professionals 10 Hours a Week", excerpt: "Practical, copy-paste AI workflows for meetings, research, content creation, email management, and client reporting — tested by real professionals.", date: "February 2026", readTime: "7 min read", tag: "Workflow Guide", tagColor: "#8B9E1A" },
  { slug: "the-ai-leadership-gap-why-managers-need-ai-skills-now", title: "The AI Leadership Gap: Why Managers Need AI Skills Now", excerpt: "Teams are adopting AI faster than their managers. Here's why leaders who don't upskill now will find themselves managing workflows they don't understand.", date: "January 2026", readTime: "6 min read", tag: "Leadership", tagColor: "#D97706" },
  { slug: "how-to-build-your-first-ai-powered-productivity-system", title: "How to Build Your First AI-Powered Productivity System", excerpt: "A step-by-step guide to building a personal AI productivity stack — from choosing the right tools to creating workflows that actually stick.", date: "December 2025", readTime: "8 min read", tag: "Beginner Guide", tagColor: "#7C3AED" },
  { slug: "ai-tools-for-educators-and-community-leaders", title: "AI Tools for Educators and Community Leaders", excerpt: "From lesson planning to community outreach, these AI tools are transforming how educators and leaders serve their communities more effectively.", date: "November 2025", readTime: "5 min read", tag: "Education & Leadership", tagColor: "#0891B2" },
];

const TAGS = ["All", "Featured Insight", "Workflow Guide", "Leadership", "Beginner Guide", "Education & Leadership"];

export default function NewsletterArchive() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => { setSubDone(true); setEmail(""); },
    onError: (err: { message?: string }) => toast.error(err.message || "Subscription failed."),
  });

  const filtered = ALL_EDITIONS.filter((ed) => {
    const matchesTag = activeTag === "All" || ed.tag === activeTag;
    const matchesSearch = !search || ed.title.toLowerCase().includes(search.toLowerCase()) || ed.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main className="flex-1 pt-[76px]">

        {/* ── Breadcrumb ── */}
        <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "14px 0" }}>
          <div className="container">
            <div className="flex items-center gap-2 text-sm" style={{ color: "#6B7280" }}>
              <Link href="/resources" style={{ color: "#38B54A", textDecoration: "none" }}>Resources</Link>
              <ChevronRight size={14} />
              <Link href="/newsletter" style={{ color: "#38B54A", textDecoration: "none" }}>Newsletter</Link>
              <ChevronRight size={14} />
              <span style={{ color: "#374151" }}>Archive</span>
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        <section style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 60%, #fffef0 100%)", padding: "60px 0 50px" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-semibold"
                style={{ background: "rgba(56,181,74,0.12)", color: "#38B54A" }}>
                <Mail size={16} /> Newsletter Archive
              </div>
              <h1 className="font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#111827", lineHeight: 1.2 }}>
                Every Edition, All in One Place
              </h1>
              <p className="text-lg" style={{ color: "#6B7280", lineHeight: 1.75 }}>
                Browse all past editions of the UpskillinTech newsletter. Search by topic, filter by category, or scroll through the full archive.
              </p>
            </div>
          </div>
        </section>

        {/* ── Search & Filter ── */}
        <section style={{ background: "#ffffff", padding: "40px 0 20px" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {/* Search */}
              <div className="relative mb-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
                <input
                  type="text"
                  placeholder="Search editions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl outline-none"
                  style={{ border: "1.5px solid #E5E7EB", fontSize: "1rem", background: "#F9FAFB" }}
                />
              </div>
              {/* Tag filters */}
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={{
                      background: activeTag === tag ? "#38B54A" : "#F3F4F6",
                      color: activeTag === tag ? "#fff" : "#374151",
                      border: activeTag === tag ? "1.5px solid #38B54A" : "1.5px solid #E5E7EB",
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Editions List ── */}
        <section style={{ background: "#ffffff", padding: "20px 0 80px" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-lg" style={{ color: "#6B7280" }}>No editions found matching your search.</p>
                  <button onClick={() => { setSearch(""); setActiveTag("All"); }}
                    className="mt-4 px-5 py-2.5 rounded-xl font-semibold text-white"
                    style={{ background: "#38B54A" }}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {filtered.map((ed) => (
                    <Link key={ed.slug} href={`/newsletter/${ed.slug}`}
                      className="block rounded-2xl p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ border: "1.5px solid #E5E7EB", background: "#FAFAFA" }}>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1">
                          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                            style={{ background: `${ed.tagColor}18`, color: ed.tagColor }}>
                            {ed.tag}
                          </div>
                          <h3 className="font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.15rem", color: "#111827", lineHeight: 1.35 }}>
                            {ed.title}
                          </h3>
                          <p className="mb-4" style={{ color: "#6B7280", fontSize: "0.95rem", lineHeight: 1.65 }}>
                            {ed.excerpt}
                          </p>
                          <div className="flex items-center gap-5" style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>
                            <span className="flex items-center gap-1.5"><Calendar size={13} /> {ed.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={13} /> {ed.readTime}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm"
                            style={{ background: "rgba(56,181,74,0.1)", color: "#38B54A" }}>
                            Read <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Subscribe CTA ── */}
        <section style={{ background: "linear-gradient(135deg, #111827 0%, #1a2e1a 100%)", padding: "70px 0" }}>
          <div className="container">
            <div className="max-w-xl mx-auto text-center">
              <Mail size={40} className="mx-auto mb-5" style={{ color: "#38B54A" }} />
              <h2 className="font-bold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                Don't Miss the Next Edition
              </h2>
              <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                Subscribe free and get practical AI insights delivered to your inbox every week.
              </p>
              {subDone ? (
                <div className="flex items-center justify-center gap-3" style={{ color: "#38B54A" }}>
                  <CheckCircle size={24} />
                  <span className="font-semibold text-lg text-white">You're subscribed!</span>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email) subscribe.mutate({ email }); }}
                  className="flex gap-3">
                  <input
                    type="email" placeholder="Your email address" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="flex-1 px-5 py-4 rounded-xl text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", fontSize: "1rem" }}
                  />
                  <button type="submit" disabled={subscribe.isPending}
                    className="px-7 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #38B54A, #8B9E1A)", whiteSpace: "nowrap" }}>
                    {subscribe.isPending ? "..." : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
