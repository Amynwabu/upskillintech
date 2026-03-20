/**
 * Newsletter Landing Page — /newsletter
 * Sections: Hero, What You'll Receive, Latest Edition, Past Editions, Subscribe
 */
import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Mail, BookOpen, Zap, Users, Calendar, Clock, ArrowRight,
  CheckCircle, Lightbulb, BarChart2, Globe, Bell
} from "lucide-react";

const EDITIONS = [
  {
    slug: "most-professionals-are-using-ai-wrong",
    title: "Most Professionals Are Using AI Wrong",
    excerpt: "Most people treat AI like a search engine. The real power is using AI for thinking, strategy, and workflow automation — and it changes everything.",
    date: "March 2026",
    readTime: "5 min read",
    tag: "Featured Insight",
    tagColor: "#38B54A",
  },
  {
    slug: "5-ai-workflows-that-save-professionals-10-hours-a-week",
    title: "5 AI Workflows That Save Professionals 10 Hours a Week",
    excerpt: "Practical, copy-paste AI workflows for meetings, research, content creation, email management, and client reporting — tested by real professionals.",
    date: "February 2026",
    readTime: "7 min read",
    tag: "Workflow Guide",
    tagColor: "#8B9E1A",
  },
  {
    slug: "the-ai-leadership-gap-why-managers-need-ai-skills-now",
    title: "The AI Leadership Gap: Why Managers Need AI Skills Now",
    excerpt: "Teams are adopting AI faster than their managers. Here's why leaders who don't upskill now will find themselves managing workflows they don't understand.",
    date: "January 2026",
    readTime: "6 min read",
    tag: "Leadership",
    tagColor: "#D97706",
  },
  {
    slug: "how-to-build-your-first-ai-powered-productivity-system",
    title: "How to Build Your First AI-Powered Productivity System",
    excerpt: "A step-by-step guide to building a personal AI productivity stack — from choosing the right tools to creating workflows that actually stick.",
    date: "December 2025",
    readTime: "8 min read",
    tag: "Beginner Guide",
    tagColor: "#7C3AED",
  },
  {
    slug: "ai-tools-for-educators-and-community-leaders",
    title: "AI Tools for Educators and Community Leaders",
    excerpt: "From lesson planning to community outreach, these AI tools are transforming how educators and leaders serve their communities more effectively.",
    date: "November 2025",
    readTime: "5 min read",
    tag: "Education & Leadership",
    tagColor: "#0891B2",
  },
];

const BENEFITS = [
  { icon: Zap, title: "AI Productivity Strategies", desc: "Practical techniques to save 5–10 hours per week using AI tools in your daily workflow." },
  { icon: BookOpen, title: "AI Workflow Examples", desc: "Step-by-step workflows you can copy, adapt, and implement immediately in your work." },
  { icon: Lightbulb, title: "AI Tool Insights", desc: "Honest reviews and comparisons of the latest AI tools — what works, what doesn't, and why." },
  { icon: BarChart2, title: "AI Leadership Perspectives", desc: "Strategic insights for leaders navigating AI adoption in their teams and organisations." },
  { icon: Users, title: "Community Updates", desc: "News from the UpskillinTech community — events, masterclasses, and member spotlights." },
  { icon: Globe, title: "Webinar Announcements", desc: "Early access to upcoming live sessions, recordings, and exclusive community events." },
];

export default function Newsletter() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFirstName("");
      setEmail("");
      setRole("");
    },
    onError: (err) => {
      toast.error(err.message || "Subscription failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email address."); return; }
    subscribe.mutate({ firstName, email, role });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main className="flex-1 pt-[76px]">

        {/* ── Hero ── */}
        <section style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 60%, #fffef0 100%)", padding: "80px 0 60px" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
                style={{ background: "rgba(56,181,74,0.12)", color: "#38B54A" }}>
                <Mail size={16} />
                Free Weekly Newsletter
              </div>
              <h1 className="font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#111827", lineHeight: 1.15 }}>
                The UpskillinTech Newsletter
              </h1>
              <p className="mb-4 text-lg" style={{ color: "#374151", lineHeight: 1.75 }}>
                Practical AI insights, workflows, tools, and strategies to help professionals, leaders, and organisations thrive in an AI-powered world.
              </p>
              <p className="mb-8" style={{ color: "#6B7280", fontSize: "1rem" }}>
                Delivered every week. No spam. Join <strong>1,000+ professionals</strong> already subscribed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#subscribe"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #38B54A, #8B9E1A)", fontSize: "1.05rem" }}>
                  <Mail size={18} /> Subscribe Free
                </a>
                <a href="#latest"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                  style={{ border: "2px solid #38B54A", color: "#38B54A", background: "white", fontSize: "1.05rem" }}>
                  <BookOpen size={18} /> Read Latest Edition
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── What You'll Receive ── */}
        <section style={{ background: "#ffffff", padding: "80px 0" }}>
          <div className="container">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                style={{ background: "rgba(56,181,74,0.1)", color: "#38B54A" }}>What's Inside</span>
              <h2 className="font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#111827" }}>
                What You'll Receive Every Week
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: "#6B7280" }}>
                Each edition is packed with actionable insights you can apply immediately — no fluff, no theory, just practical AI knowledge.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1"
                    style={{ border: "1.5px solid #E5E7EB", background: "#FAFAFA" }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(56,181,74,0.12)" }}>
                      <Icon size={22} style={{ color: "#38B54A" }} />
                    </div>
                    <h3 className="font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", color: "#111827" }}>
                      {b.title}
                    </h3>
                    <p style={{ color: "#6B7280", fontSize: "0.95rem", lineHeight: 1.65 }}>{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Latest Edition ── */}
        <section id="latest" style={{ background: "#F9FAFB", padding: "80px 0" }}>
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                style={{ background: "rgba(56,181,74,0.1)", color: "#38B54A" }}>Latest Edition</span>
              <h2 className="font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#111827" }}>
                This Week's Edition
              </h2>
            </div>
            <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-lg"
              style={{ border: "1.5px solid #E5E7EB", background: "#ffffff" }}>
              <div className="p-2" style={{ background: "linear-gradient(135deg, #38B54A, #8B9E1A)" }}>
                <div className="flex items-center gap-2 px-4 py-1">
                  <Bell size={14} className="text-white opacity-80" />
                  <span className="text-white text-sm font-medium opacity-90">Latest Edition — March 2026</span>
                </div>
              </div>
              <div className="p-10">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ background: "rgba(56,181,74,0.12)", color: "#38B54A" }}>
                  {EDITIONS[0].tag}
                </div>
                <h3 className="font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#111827", lineHeight: 1.3 }}>
                  {EDITIONS[0].title}
                </h3>
                <p className="mb-6 text-lg" style={{ color: "#4B5563", lineHeight: 1.75 }}>
                  {EDITIONS[0].excerpt}
                </p>
                <div className="flex items-center gap-6 mb-8" style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {EDITIONS[0].date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {EDITIONS[0].readTime}</span>
                </div>
                <Link href={`/newsletter/${EDITIONS[0].slug}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #38B54A, #8B9E1A)", fontSize: "1.05rem" }}>
                  Read This Edition <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Past Editions ── */}
        <section style={{ background: "#ffffff", padding: "80px 0" }}>
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
                  style={{ background: "rgba(56,181,74,0.1)", color: "#38B54A" }}>Past Editions</span>
                <h2 className="font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#111827" }}>
                  Explore Previous Issues
                </h2>
              </div>
              <Link href="/newsletter/archive"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200"
                style={{ border: "1.5px solid #38B54A", color: "#38B54A", background: "white", fontSize: "0.95rem" }}>
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EDITIONS.slice(1).map((ed) => (
                <Link key={ed.slug} href={`/newsletter/${ed.slug}`}
                  className="block rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                  style={{ border: "1.5px solid #E5E7EB", background: "#FAFAFA" }}>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ background: `${ed.tagColor}18`, color: ed.tagColor }}>
                    {ed.tag}
                  </div>
                  <h3 className="font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", color: "#111827", lineHeight: 1.4 }}>
                    {ed.title}
                  </h3>
                  <p className="mb-5" style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.65 }}>
                    {ed.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4" style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {ed.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {ed.readTime}</span>
                    </div>
                    <span className="flex items-center gap-1 font-semibold text-sm" style={{ color: "#38B54A" }}>
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/newsletter/archive"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                style={{ border: "1.5px solid #38B54A", color: "#38B54A", background: "white" }}>
                View Full Archive <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Subscribe Section ── */}
        <section id="subscribe" style={{ background: "linear-gradient(135deg, #111827 0%, #1a2e1a 100%)", padding: "80px 0" }}>
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(56,181,74,0.2)" }}>
                <Mail size={28} style={{ color: "#38B54A" }} />
              </div>
              <h2 className="font-bold mb-4 text-white" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                Stay Updated with UpskillinTech
              </h2>
              <p className="mb-10 text-lg" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
                Join 1,000+ professionals receiving weekly AI insights, practical workflows, and strategies every week — completely free.
              </p>

              {submitted ? (
                <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(56,181,74,0.15)", border: "1.5px solid rgba(56,181,74,0.3)" }}>
                  <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "#38B54A" }} />
                  <h3 className="font-bold text-white text-2xl mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Thank you for subscribing!
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                    You will now receive practical insights on AI productivity, workflows, and innovation directly to your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl text-white outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", fontSize: "1rem" }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-5 py-4 rounded-xl text-white outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", fontSize: "1rem" }}
                    />
                  </div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl mb-5 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", color: role ? "#fff" : "rgba(255,255,255,0.45)", fontSize: "1rem" }}
                  >
                    <option value="" style={{ background: "#111827" }}>Your Role (optional)</option>
                    <option value="professional" style={{ background: "#111827" }}>Working Professional</option>
                    <option value="manager" style={{ background: "#111827" }}>Manager / Team Lead</option>
                    <option value="executive" style={{ background: "#111827" }}>Executive / Director</option>
                    <option value="educator" style={{ background: "#111827" }}>Educator / Trainer</option>
                    <option value="entrepreneur" style={{ background: "#111827" }}>Entrepreneur / Founder</option>
                    <option value="student" style={{ background: "#111827" }}>Student</option>
                    <option value="other" style={{ background: "#111827" }}>Other</option>
                  </select>
                  <button
                    type="submit"
                    disabled={subscribe.isPending}
                    className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #38B54A, #8B9E1A)" }}
                  >
                    {subscribe.isPending ? "Subscribing..." : "Subscribe Free — It's Weekly & Free"}
                  </button>
                  <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                    No spam. Unsubscribe anytime. Your data is safe with us.
                  </p>
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
