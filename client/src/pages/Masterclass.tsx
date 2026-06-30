import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Gift,
  Sparkles,
  Target,
  Users,
  UserSearch,
  ClipboardList,
  Paintbrush,
  MonitorSmartphone,
  CalendarCheck,
  Youtube,
  Megaphone,
  Bot,
  TrendingUp,
  MessageCircle,
  Smile,
  MousePointerClick,
  BadgeCheck,
  GraduationCap,
  Briefcase,
  Pencil,
  UserCheck,
  HelpCircle,
  Wrench,
  Lock,
  Coins,
  Lightbulb,
  ChartLine,
  Store,
  Clock3,
  Edit3,
  Video,
  Share2,
  Globe,
  Repeat,
  Mail,
  BarChart2,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";

const SYSTEM_PROMPT =
  "You are an AI productivity coach for UpskillinTech, an AI awareness and training platform founded by Dr. Amaka Adiuku. " +
  "Your role is to help professionals understand how AI can help them in their work, answer questions about AI tools, " +
  "productivity workflows, and responsible AI adoption. You give practical, jargon-free advice. " +
  "When relevant, mention UpskillinTech's masterclass, programmes, or community as next steps. " +
  "Keep replies concise and actionable.";

function ReserveSeatButton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const checkout = trpc.checkout.masterclass.useMutation({
    onSuccess: ({ url }) => { window.location.href = url; },
    onError: (err) => toast.error(err.message),
  });
  return (
    <button
      onClick={() => checkout.mutate()}
      disabled={checkout.isPending}
      className={className}
      style={style}
    >
      {checkout.isPending ? "Redirecting to payment…" : <>Reserve Your Seat — ₦50,000 / £50 <ArrowRight size={18} /></>}
    </button>
  );
}

function MasterclassChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: SYSTEM_PROMPT },
  ]);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: ({ reply }) => {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSend = (content: string) => {
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    chatMutation.mutate({ messages: newMessages });
  };

  return (
    <AIChatBox
      messages={messages}
      onSendMessage={handleSend}
      isLoading={chatMutation.isPending}
      placeholder="Ask anything about AI at work…"
      height="480px"
      emptyStateMessage="Ask me anything about AI productivity or this masterclass"
      suggestedPrompts={[
        "How can I use AI to save time on emails?",
        "What's a good first AI tool for a non-technical professional?",
        "How do I write better prompts for ChatGPT?",
        "Is it safe to use AI tools at work?",
      ]}
    />
  );
}

const modules = [
  { num: 1, icon: Target, color: "#0D9488", title: "Find Your Profitable Idea", desc: "Use AI to discover business ideas based on real pain points, market demand & opportunities." },
  { num: 2, icon: UserSearch, color: "#16A34A", title: "Understand Your Audience", desc: "Identify your ideal customers, their problems, needs and what they really want." },
  { num: 3, icon: ClipboardList, color: "#7C3AED", title: "Create Your Business Plan", desc: "Build a clear business proposal with services, pricing, marketing and growth strategy." },
  { num: 4, icon: Paintbrush, color: "#DB2777", title: "Build Your Brand", desc: "Create your business name, logo, tagline, story, mission and brand identity." },
  { num: 5, icon: MonitorSmartphone, color: "#7C3AED", title: "Launch Your Website", desc: "Design a professional website that builds credibility and attracts clients." },
  { num: 6, icon: CalendarCheck, color: "#0D9488", title: "Create 30 Days of Content", desc: "Get a full month of content ideas, captions, posts, emails & more in minutes." },
  { num: 7, icon: Youtube, color: "#DB2777", title: "Make AI Videos & Podcasts", desc: "Create videos, clone your voice, add subtitles and produce podcasts with AI." },
  { num: 8, icon: Megaphone, color: "#D97706", title: "Design Marketing Materials", desc: "Generate flyers, posters, ad creatives, carousels and promotional graphics." },
  { num: 9, icon: Bot, color: "#0D9488", title: "Automate & Schedule Content", desc: "Automate content creation, posting, follow-ups and lead management." },
  { num: 10, icon: TrendingUp, color: "#7C3AED", title: "Grow & Scale Your Business", desc: "Use AI insights, analytics and systems to grow your business consistently." },
];

const audience = [
  { icon: Briefcase, label: "Coaches & Consultants" },
  { icon: Users, label: "Entrepreneurs & Business Owners" },
  { icon: GraduationCap, label: "Educators & Trainers" },
  { icon: Pencil, label: "Freelancers & Creators" },
  { icon: UserCheck, label: "Professionals & Job Seekers" },
];

const reassurance = [
  { icon: Smile, title: "Beginner Friendly", desc: "Step-by-step guidance" },
  { icon: MousePointerClick, title: "Easy to Use Tools", desc: "Simple, practical & effective" },
  { icon: BadgeCheck, title: "Results Focused", desc: "Real outcomes you can see" },
];

const painCategories = [
  {
    label: "Getting started with AI",
    color: "#534AB7",
    bg: "#EEEDFE",
    textColor: "#3C3489",
    items: [
      { icon: HelpCircle, title: "Don't know where to begin?", desc: "AI feels overwhelming. Too many tools, too much noise. We give you a clear, structured starting point." },
      { icon: Wrench, title: "Not sure which AI tool fits your business?", desc: "ChatGPT, Claude, Gemini, Copilot — we cut through the confusion and match tools to your specific needs." },
      { icon: Lock, title: "Worried AI is too technical for you?", desc: "No coding, no jargon. If you can type a message, you can use AI. We prove it live in every session." },
      { icon: Coins, title: "Paying for AI tools but seeing no results?", desc: "Subscriptions without strategy waste money. Learn how to get real ROI from tools you may already pay for." },
    ],
  },
  {
    label: "Business growth & strategy",
    color: "#0D9488",
    bg: "#E1F5EE",
    textColor: "#085041",
    items: [
      { icon: Lightbulb, title: "Have a business idea but no roadmap?", desc: "Use AI as your strategic thinking partner to validate ideas, plan next steps, and build with confidence." },
      { icon: ChartLine, title: "Struggling to grow or attract customers?", desc: "AI can analyse your market, write your pitch, and help you target the right audience — faster than ever." },
      { icon: Users, title: "Can't compete with bigger businesses?", desc: "AI levels the playing field. A small team can now produce output that rivals large companies." },
      { icon: Store, title: "No time to research your market?", desc: "AI does market research, competitor analysis, and trend spotting in minutes — not days." },
    ],
  },
  {
    label: "Content & marketing",
    color: "#993C1D",
    bg: "#FAECE7",
    textColor: "#712B13",
    items: [
      { icon: Edit3, title: "Struggling with content creation?", desc: "From captions to blog posts to newsletters — AI handles the blank page so you stay consistent." },
      { icon: Video, title: "No budget for video or graphic design?", desc: "Create professional video ads, reels, and branded visuals using AI — no designer or camera crew needed." },
      { icon: Share2, title: "Posting on social media with no strategy?", desc: "Build a full content calendar, write posts in your voice, and schedule weeks of content in one sitting." },
      { icon: Globe, title: "No website or an outdated one?", desc: "Build or refresh your website with AI — no developers, no big bills, no technical skills needed." },
    ],
  },
  {
    label: "Productivity & operations",
    color: "#854F0B",
    bg: "#FAEEDA",
    textColor: "#633806",
    items: [
      { icon: Repeat, title: "Drowning in repetitive tasks?", desc: "Automate admin, emails, data entry, and scheduling so you focus on what actually moves the needle." },
      { icon: Clock3, title: "Working long hours but still falling behind?", desc: "AI multiplies your output. Get more done in less time without burning out." },
      { icon: Mail, title: "Emails and proposals taking too long?", desc: "Draft professional emails, proposals, and client responses in seconds with the right prompts." },
      { icon: BarChart2, title: "No system for tracking business performance?", desc: "AI helps you build simple dashboards, analyse your numbers, and spot what's working." },
    ],
  },
];

export default function Masterclass() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <main className="flex-1 pt-[72px]">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #F0FDFA 0%, #F7FEF7 45%, #FFF7D6 100%)" }}
        >
          <div className="absolute top-[-160px] right-[-120px] rounded-full pointer-events-none" style={{ width: 420, height: 420, background: "rgba(13,148,136,0.08)" }} />
          <div className="absolute bottom-[-140px] left-[-120px] rounded-full pointer-events-none" style={{ width: 360, height: 360, background: "rgba(230,184,0,0.14)" }} />

          <div className="container relative z-10 py-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(13,148,136,0.10)", border: "1px solid rgba(13,148,136,0.20)" }}>
                <Sparkles size={16} style={{ color: "#0D9488" }} />
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#0D9488" }}>
                  AI Transformation Master Class · July 2025
                </span>
              </div>
              <h1 className="mb-6" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#F3F4F6", fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.08 }}>
                From Idea to Income — Build a Real Business with AI in 10 Steps
              </h1>
              <p className="mb-8" style={{ fontSize: "1.2rem", lineHeight: 1.75, color: "#D1D5DB" }}>
                Join Dr. Amaka Adiuku for a hands-on Master Class where you'll use AI to find your idea, build your
                brand, launch your website, create a month of content, and start growing — step by step, with no
                technical background required.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-9" style={{ color: "#D1D5DB" }}>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.75)" }}>
                  <Calendar size={15} /> Last two Saturdays of July
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.75)" }}>
                  <Clock size={15} /> Live, hands-on sessions
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.75)" }}>
                  <Gift size={15} /> Includes a free 1-on-1 session
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <ReserveSeatButton
                  className="btn-primary justify-center inline-flex items-center gap-2"
                  style={{ fontSize: "1.05rem", padding: "1rem 2.25rem", background: "#0D9488", boxShadow: "0 4px 14px rgba(13,148,136,0.25)" }}
                />
                <a href="mailto:hello@upskillintech.com" className="btn-outline justify-center" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem", borderColor: "#0D9488", color: "#0D9488" }}>
                  Ask a Question
                </a>
              </div>

              {/* Pricing strip */}
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <div className="rounded-2xl px-6 py-4 text-center" style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 10px 28px rgba(0,0,0,0.08)" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#0D9488" }}>₦50,000</div>
                  <div style={{ fontSize: "0.85rem", color: "#9CA3AF" }}>Nigeria</div>
                </div>
                <div className="rounded-2xl px-6 py-4 text-center" style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 10px 28px rgba(0,0,0,0.08)" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#0D9488" }}>£50</div>
                  <div style={{ fontSize: "0.85rem", color: "#9CA3AF" }}>UK / International</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ──────────────────────────────────────────────── */}
        <section style={{ background: "#151B23", borderBottom: "1px solid #1F2937", borderTop: "1px solid #1F2937", padding: "2.5rem 0" }}>
          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem 4rem", alignItems: "center" }}>
              {[
                { num: "16", label: "Real business struggles we solve" },
                { num: "10", label: "Hands-on modules across 2 Saturdays" },
                { num: "1:1", label: "AI Transformation Consultation included" },
                { num: "Free", label: "Webinar to try before you invest" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2rem)", color: "#0D9488", lineHeight: 1.1 }}>{s.num}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9CA3AF", marginTop: "0.2rem", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Free Webinar ─────────────────────────────────────────────── */}
        <section className="section-py" style={{ background: "#151B23" }}>
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #0D9488", boxShadow: "0 12px 40px rgba(13,148,136,0.12)" }}>
                <div style={{ background: "#0D9488", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.4rem 1rem" }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#ffffff", letterSpacing: "0.05em" }}>FREE — Week 3 of July</span>
                  </div>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "rgba(255,255,255,0.9)" }}>Start here before the Master Class</span>
                </div>
                <div style={{ background: "#151B23", padding: "2rem 2rem 2.5rem" }}>
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#F3F4F6", marginBottom: "0.75rem", lineHeight: 1.25 }}>
                        Free AI Literacy Webinar
                      </h2>
                      <p style={{ color: "#D1D5DB", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                        Your live introduction to AI in the real world. See exactly what's possible for your business — in under 3 hours, with Dr. Amaka Adiuku.
                      </p>
                      <a
                        href="mailto:hello@upskillintech.com?subject=Webinar Registration"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.5rem",
                          background: "#0D9488", color: "#ffffff", borderRadius: "0.75rem",
                          padding: "0.875rem 1.75rem", fontFamily: "'Sora', sans-serif",
                          fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
                        }}
                      >
                        Save my free spot <ArrowRight size={16} />
                      </a>
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {[
                        "Live demos with Claude & Gemini side by side",
                        "Idea generation, content creation & visual design",
                        "Task automation & productivity tools",
                        "Real business examples (catering, fashion, education & more)",
                        "Live Q&A with Dr. Amaka Adiuku",
                      ].map((item) => (
                        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                          <CheckCircle2 size={17} style={{ color: "#0D9488", flexShrink: 0, marginTop: "2px" }} />
                          <span style={{ fontSize: "0.95rem", color: "#D1D5DB", lineHeight: 1.55 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who It's For / Audience chips ────────────────────────────── */}
        <section className="section-py" style={{ background: "#151B23" }}>
          <div className="container max-w-4xl mx-auto text-center">
            <span className="section-label mb-3">Who This Is For</span>
            <h2 className="mt-4 mb-4" style={{ color: "#F3F4F6" }}>Built for African & diaspora professionals ready to grow</h2>
            <p style={{ color: "#9CA3AF", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Whether you're in Nigeria or the UK, employed or self-employed — if you're ready to move from AI curiosity to real results, this is for you.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.625rem", marginBottom: "2rem" }}>
              {["Educators & coaches", "Entrepreneurs", "Freelancers", "Small business owners", "Corporate professionals", "Nigerian & UK diaspora", "Anyone ready to grow"].map((chip) => (
                <span key={chip} style={{ fontSize: "0.875rem", padding: "0.4rem 1rem", borderRadius: "20px", border: "1px solid #D1D5DB", color: "#D1D5DB", background: "#151B23" }}>{chip}</span>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              {audience.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(13,148,136,0.07)", borderRadius: "0.75rem", padding: "0.625rem 1.25rem" }}>
                    <Icon size={16} style={{ color: "#0D9488" }} />
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#0D9488" }}>{a.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Pain Points ──────────────────────────────────────────────── */}
        <section className="section-py" style={{ background: "#F3F1EE" }}>
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-label mb-3">Sound familiar?</span>
              <h2 className="mt-4 mb-4" style={{ color: "#F3F4F6" }}>If any of these sound like you, this programme was made for you</h2>
              <p style={{ color: "#9CA3AF", fontSize: "1.05rem", lineHeight: 1.7 }}>
                We solve 16 real business struggles — with AI, live, in the room.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {painCategories.map((cat) => (
                <div key={cat.label}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", padding: "0.3rem 0.875rem", borderRadius: "8px", background: cat.bg, color: cat.textColor, whiteSpace: "nowrap" }}>{cat.label}</span>
                    <div style={{ flex: 1, height: "1px", background: "#D1D5DB" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
                    {cat.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} style={{ background: "#151B23", border: "1px solid #1F2937", borderRadius: "12px", padding: "1rem 1.125rem", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                          <Icon size={20} style={{ color: cat.color, flexShrink: 0, marginTop: "2px" }} />
                          <div>
                            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#F3F4F6", marginBottom: "0.25rem" }}>{item.title}</div>
                            <div style={{ fontSize: "0.8125rem", color: "#9CA3AF", lineHeight: 1.55 }}>{item.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mid-page CTA ─────────────────────────────────────────────── */}
        <section style={{ background: "#151B23", borderTop: "1px solid #1F2937", borderBottom: "1px solid #1F2937", padding: "2rem 0" }}>
          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#F3F4F6", marginBottom: "0.25rem" }}>Ready to solve these problems — in July?</div>
                <div style={{ fontSize: "0.9rem", color: "#9CA3AF" }}>Join the free webinar first, then decide if the Master Class is right for you.</div>
              </div>
              <ReserveSeatButton
                className="btn-primary inline-flex items-center gap-2"
                style={{ fontSize: "0.95rem", padding: "0.875rem 1.75rem" }}
              />
            </div>
          </div>
        </section>

        {/* ── 10 Modules ───────────────────────────────────────────────── */}
        <section className="section-py" style={{ background: "#151B23" }}>
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="section-label" style={{ color: "#0D9488", background: "rgba(13,148,136,0.10)", borderColor: "rgba(13,148,136,0.20)" }}>The Curriculum</span>
              <h2 className="mt-4 mb-4" style={{ color: "#F3F4F6" }}>What You Will Learn &amp; Do</h2>
              <p style={{ color: "#9CA3AF", lineHeight: 1.75, fontSize: "1.05rem" }}>
                Ten practical steps that take you from a raw idea to a real, AI-powered business — built live, in the room, with Dr. Amaka.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.num} className="relative rounded-2xl p-6 flex flex-col" style={{ background: "#151B23", border: "1px solid #1F2937", boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ background: m.color, fontFamily: "'Sora', sans-serif", fontSize: "0.85rem", boxShadow: "0 4px 10px rgba(0,0,0,0.18)" }}>
                      {m.num}
                    </div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${m.color}14` }}>
                      <Icon size={26} style={{ color: m.color }} />
                    </div>
                    <h3 className="mb-2" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6", fontSize: "1.02rem", lineHeight: 1.3 }}>{m.title}</h3>
                    <p className="text-sm flex-1" style={{ color: "#9CA3AF", lineHeight: 1.6 }}>{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Who It's For / No Tech Skills / 1-on-1 ──────────────────── */}
        <section className="section-py" style={{ background: "#151B23" }}>
          <div className="container">
            <div className="grid lg:grid-cols-[1.1fr_1.1fr_1fr] gap-6 items-stretch">
              <div className="rounded-2xl p-7" style={{ background: "#151B23", border: "1px solid #1F2937" }}>
                <span className="section-label mb-4 inline-block" style={{ color: "#7C3AED", background: "rgba(124,58,237,0.10)", borderColor: "rgba(124,58,237,0.20)" }}>Who Is This For</span>
                <h3 className="mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6", fontSize: "1.3rem" }}>Built for people ready to build</h3>
                <div className="grid grid-cols-1 gap-4">
                  {audience.map((a) => {
                    const Icon = a.icon;
                    return (
                      <div key={a.label} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.10)" }}>
                          <Icon size={18} style={{ color: "#7C3AED" }} />
                        </div>
                        <span style={{ color: "#D1D5DB", fontWeight: 500 }}>{a.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "#151B23", border: "1px solid #1F2937" }}>
                <span className="section-label mb-4 inline-block" style={{ color: "#16A34A", background: "rgba(22,163,74,0.10)", borderColor: "rgba(22,163,74,0.20)" }}>No Tech Skills? No Problem!</span>
                <h3 className="mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6", fontSize: "1.3rem" }}>Designed for true beginners</h3>
                <div className="grid grid-cols-1 gap-4">
                  {reassurance.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.title} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(22,163,74,0.10)" }}>
                          <Icon size={18} style={{ color: "#16A34A" }} />
                        </div>
                        <div>
                          <div className="font-bold" style={{ color: "#F3F4F6", fontFamily: "'Sora', sans-serif", fontSize: "0.95rem" }}>{r.title}</div>
                          <div className="text-sm" style={{ color: "#9CA3AF" }}>{r.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl p-7 flex flex-col" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(230,184,0,0.18)" }}>
                  <Gift size={22} style={{ color: "#E6B800" }} />
                </div>
                <h3 className="mb-3" style={{ fontFamily: "'Sora', sans-serif", color: "#ffffff", fontSize: "1.25rem", lineHeight: 1.3 }}>Exclusive 1-on-1 Transformation Session</h3>
                <p className="mb-6 flex-1" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>
                  Every participant gets a customised training session for their business, career, family and goals — included with your registration.
                </p>
                <div className="flex items-center gap-2" style={{ color: "#E6B800" }}>
                  <MessageCircle size={16} />
                  <span className="text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>Included with every seat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI Chat Widget ────────────────────────────────────────────── */}
        <section className="section-py" style={{ background: "#151B23" }}>
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">Try It Now</span>
              <h2 className="mt-4 mb-4" style={{ color: "#F3F4F6" }}>Ask our AI productivity coach</h2>
              <p style={{ color: "#9CA3AF", fontSize: "1.05rem", lineHeight: 1.7 }}>
                Not sure if this masterclass is for you? Ask a question and get instant, practical guidance on AI at work.
              </p>
            </div>
            <MasterclassChat />
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <section className="section-py" style={{ background: "linear-gradient(135deg, #0D9488 0%, #16A34A 100%)" }}>
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="mb-4" style={{ color: "#ffffff" }}>Ready to build your AI-powered business?</h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", lineHeight: 1.7 }}>
              Reserve your seat for the Master Class — last two Saturdays of July — and get your free 1-on-1 Transformation Session.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <ReserveSeatButton
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold cursor-pointer border-0"
                style={{ background: "#151B23", color: "#0D9488", fontFamily: "'Sora', sans-serif" }}
              />
              <a
                href="mailto:hello@upskillintech.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold"
                style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#ffffff", textDecoration: "none", fontFamily: "'Sora', sans-serif" }}
              >
                Ask a Question
              </a>
            </div>
            <p className="flex items-center justify-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle2 size={15} /> Includes a free 1-on-1 AI Transformation Consultation · Think. Create. Build. Grow.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
