import { useState } from "react";
import { Link } from "wouter";
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

/** The 10-module curriculum, straight from the masterclass brief */
const modules = [
  {
    num: 1,
    icon: Target,
    color: "#0D9488",
    title: "Find Your Profitable Idea",
    desc: "Use AI to discover business ideas based on real pain points, market demand & opportunities.",
  },
  {
    num: 2,
    icon: UserSearch,
    color: "#16A34A",
    title: "Understand Your Audience",
    desc: "Identify your ideal customers, their problems, needs and what they really want.",
  },
  {
    num: 3,
    icon: ClipboardList,
    color: "#7C3AED",
    title: "Create Your Business Plan",
    desc: "Build a clear business proposal with services, pricing, marketing and growth strategy.",
  },
  {
    num: 4,
    icon: Paintbrush,
    color: "#DB2777",
    title: "Build Your Brand",
    desc: "Create your business name, logo, tagline, story, mission and brand identity.",
  },
  {
    num: 5,
    icon: MonitorSmartphone,
    color: "#7C3AED",
    title: "Launch Your Website",
    desc: "Design a professional website that builds credibility and attracts clients.",
  },
  {
    num: 6,
    icon: CalendarCheck,
    color: "#0D9488",
    title: "Create 30 Days of Content",
    desc: "Get a full month of content ideas, captions, posts, emails & more in minutes.",
  },
  {
    num: 7,
    icon: Youtube,
    color: "#DB2777",
    title: "Make AI Videos & Podcasts",
    desc: "Create videos, clone your voice, add subtitles and produce podcasts with AI.",
  },
  {
    num: 8,
    icon: Megaphone,
    color: "#D97706",
    title: "Design Marketing Materials",
    desc: "Generate flyers, posters, ad creatives, carousels and promotional graphics.",
  },
  {
    num: 9,
    icon: Bot,
    color: "#0D9488",
    title: "Automate & Schedule Content",
    desc: "Automate content creation, posting, follow-ups and lead management.",
  },
  {
    num: 10,
    icon: TrendingUp,
    color: "#7C3AED",
    title: "Grow & Scale Your Business",
    desc: "Use AI insights, analytics and systems to grow your business consistently.",
  },
];

/** Who the masterclass is for */
const audience = [
  { icon: Briefcase, label: "Coaches & Consultants" },
  { icon: Users, label: "Entrepreneurs & Business Owners" },
  { icon: GraduationCap, label: "Educators & Trainers" },
  { icon: Pencil, label: "Freelancers & Creators" },
  { icon: UserCheck, label: "Professionals & Job Seekers" },
];

/** "No tech skills? No problem!" reassurance row */
const reassurance = [
  { icon: Smile, title: "Beginner Friendly", desc: "Step-by-step guidance" },
  { icon: MousePointerClick, title: "Easy to Use Tools", desc: "Simple, practical & effective" },
  { icon: BadgeCheck, title: "Results Focused", desc: "Real outcomes you can see" },
];

export default function Masterclass() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <main className="flex-1 pt-[76px]">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #F0FDFA 0%, #F7FEF7 45%, #FFF7D6 100%)" }}
        >
          <div
            className="absolute top-[-160px] right-[-120px] rounded-full pointer-events-none"
            style={{ width: 420, height: 420, background: "rgba(13,148,136,0.08)" }}
          />
          <div
            className="absolute bottom-[-140px] left-[-120px] rounded-full pointer-events-none"
            style={{ width: 360, height: 360, background: "rgba(230,184,0,0.14)" }}
          />

          <div className="container relative z-10 py-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: "rgba(13,148,136,0.10)", border: "1px solid rgba(13,148,136,0.20)" }}
              >
                <Sparkles size={16} style={{ color: "#0D9488" }} />
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#0D9488" }}>
                  AI Transformation Master Class
                </span>
              </div>
              <h1
                className="mb-6"
                style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#111827", fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.08 }}
              >
                From Idea to Income — Build a Real Business with AI in 10 Steps
              </h1>
              <p className="mb-8" style={{ fontSize: "1.2rem", lineHeight: 1.75, color: "#374151" }}>
                Join Dr. Amaka Adiuku for a hands-on Master Class where you'll use AI to find your idea, build your
                brand, launch your website, create a month of content, and start growing — step by step, with no
                technical background required.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-9" style={{ color: "#4B5563" }}>
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
                <Link href="/contact" className="btn-outline justify-center" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem", borderColor: "#0D9488", color: "#0D9488" }}>
                  Ask a Question
                </Link>
              </div>

              {/* Pricing strip */}
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <div className="rounded-2xl px-6 py-4 text-center" style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 10px 28px rgba(0,0,0,0.08)" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#0D9488" }}>₦50,000</div>
                  <div style={{ fontSize: "0.85rem", color: "#6B7280" }}>Nigeria</div>
                </div>
                <div className="rounded-2xl px-6 py-4 text-center" style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 10px 28px rgba(0,0,0,0.08)" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#0D9488" }}>£50</div>
                  <div style={{ fontSize: "0.85rem", color: "#6B7280" }}>UK / International</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What You Will Learn & Do — the 10 modules ───────────────── */}
        <section className="section-py" style={{ background: "#ffffff" }}>
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="section-label" style={{ color: "#0D9488", background: "rgba(13,148,136,0.10)", borderColor: "rgba(13,148,136,0.20)" }}>
                The Curriculum
              </span>
              <h2 className="mt-4 mb-4" style={{ color: "#111827" }}>What You Will Learn &amp; Do</h2>
              <p style={{ color: "#6B7280", lineHeight: 1.75, fontSize: "1.05rem" }}>
                Ten practical steps that take you from a raw idea to a real, AI-powered business — built live, in
                the room, with Dr. Amaka.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.num}
                    className="relative rounded-2xl p-6 flex flex-col"
                    style={{ background: "#ffffff", border: "1px solid #E5E7EB", boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}
                  >
                    <div
                      className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ background: m.color, fontFamily: "'Sora', sans-serif", fontSize: "0.85rem", boxShadow: "0 4px 10px rgba(0,0,0,0.18)" }}
                    >
                      {m.num}
                    </div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: `${m.color}14` }}
                    >
                      <Icon size={26} style={{ color: m.color }} />
                    </div>
                    <h3 className="mb-2" style={{ fontFamily: "'Sora', sans-serif", color: "#111827", fontSize: "1.02rem", lineHeight: 1.3 }}>
                      {m.title}
                    </h3>
                    <p className="text-sm flex-1" style={{ color: "#6B7280", lineHeight: 1.6 }}>
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Who It's For / No Tech Skills / 1-on-1 bonus ────────────── */}
        <section className="section-py" style={{ background: "#F7F8FA" }}>
          <div className="container">
            <div className="grid lg:grid-cols-[1.1fr_1.1fr_1fr] gap-6 items-stretch">
              {/* Who is this for */}
              <div className="rounded-2xl p-7" style={{ background: "#ffffff", border: "1px solid #E5E7EB" }}>
                <span className="section-label mb-4 inline-block" style={{ color: "#7C3AED", background: "rgba(124,58,237,0.10)", borderColor: "rgba(124,58,237,0.20)" }}>
                  Who Is This For
                </span>
                <h3 className="mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#111827", fontSize: "1.3rem" }}>
                  Built for people ready to build
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {audience.map((a) => {
                    const Icon = a.icon;
                    return (
                      <div key={a.label} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.10)" }}>
                          <Icon size={18} style={{ color: "#7C3AED" }} />
                        </div>
                        <span style={{ color: "#374151", fontWeight: 500 }}>{a.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* No tech skills, no problem */}
              <div className="rounded-2xl p-7" style={{ background: "#ffffff", border: "1px solid #E5E7EB" }}>
                <span className="section-label mb-4 inline-block" style={{ color: "#16A34A", background: "rgba(22,163,74,0.10)", borderColor: "rgba(22,163,74,0.20)" }}>
                  No Tech Skills? No Problem!
                </span>
                <h3 className="mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#111827", fontSize: "1.3rem" }}>
                  Designed for true beginners
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {reassurance.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.title} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(22,163,74,0.10)" }}>
                          <Icon size={18} style={{ color: "#16A34A" }} />
                        </div>
                        <div>
                          <div className="font-bold" style={{ color: "#111827", fontFamily: "'Sora', sans-serif", fontSize: "0.95rem" }}>{r.title}</div>
                          <div className="text-sm" style={{ color: "#6B7280" }}>{r.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 1-on-1 bonus — dark highlight card */}
              <div
                className="rounded-2xl p-7 flex flex-col"
                style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(230,184,0,0.18)" }}>
                  <Gift size={22} style={{ color: "#E6B800" }} />
                </div>
                <h3 className="mb-3" style={{ fontFamily: "'Sora', sans-serif", color: "#ffffff", fontSize: "1.25rem", lineHeight: 1.3 }}>
                  Exclusive 1-on-1 Transformation Session
                </h3>
                <p className="mb-6 flex-1" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>
                  Every participant gets a customised training session for their business, career, family and goals
                  — included with your registration.
                </p>
                <div className="flex items-center gap-2" style={{ color: "#E6B800" }}>
                  <MessageCircle size={16} />
                  <span className="text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Included with every seat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI Chat Widget ────────────────────────────────────────────── */}
        <section className="section-py" style={{ background: "#ffffff" }}>
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">Try It Now</span>
              <h2 className="mt-4 mb-4" style={{ color: "#111827" }}>Ask our AI productivity coach</h2>
              <p style={{ color: "#6B7280", fontSize: "1.05rem", lineHeight: 1.7 }}>
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
              Reserve your seat for the Master Class — last two Saturdays of July — and get your free 1-on-1
              Transformation Session.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <ReserveSeatButton
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold cursor-pointer border-0"
                style={{ background: "#ffffff", color: "#0D9488", fontFamily: "'Sora', sans-serif" }}
              />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold"
                style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#ffffff", textDecoration: "none", fontFamily: "'Sora', sans-serif" }}
              >
                Ask a Question
              </Link>
            </div>
            <p className="flex items-center justify-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle2 size={15} /> Includes a free 1-on-1 AI Transformation Consultation
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
