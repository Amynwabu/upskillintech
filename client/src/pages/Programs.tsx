/**
 * Programs Page — /programs
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Accent Yellow (#E6B800)
 * Typography: Poppins (headings) + Inter (body)
 * Sections: Hero, 4 Programme Cards, How It Works, Testimonials, FAQ, Final CTA
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, CheckCircle, Clock, Users, BookOpen,
  Zap, Award, ChevronDown, ChevronUp, Star, Play,
  Target, TrendingUp, Briefcase, GraduationCap, Church, Building2
} from "lucide-react";
import { toast } from "sonner";

const programs = [
  {
    id: "ai-enabled-professional",
    badge: "Most Popular",
    badgeColor: "#E6B800",
    icon: TrendingUp,
    color: "#38B54A",
    title: "AI-Enabled Professional",
    tagline: "Use AI in your daily work.",
    description:
      "The flagship programme for professionals who want to integrate AI into their daily workflows, decision-making, and productivity systems. Learn to use AI tools effectively — not just as a novelty, but as a core part of how you work.",
    duration: "8 weeks",
    format: "Online, self-paced with live sessions",
    audience: "Working professionals across all industries",
    outcomes: [
      "Build a personal AI productivity system",
      "Automate repetitive tasks using AI tools",
      "Use AI for research, writing, and analysis",
      "Design AI-powered workflows for your role",
      "Save 5–10 hours per week through AI integration",
    ],
    modules: [
      { num: "01", title: "AI Foundations for Professionals", desc: "Understanding AI, key tools, and how to evaluate them for your context." },
      { num: "02", title: "AI for Research & Analysis", desc: "Using AI to gather, synthesise, and present information faster." },
      { num: "03", title: "AI for Writing & Communication", desc: "Drafting, editing, and refining professional communications with AI." },
      { num: "04", title: "Building Your AI Workflow", desc: "Designing a personal productivity system powered by AI tools." },
      { num: "05", title: "AI for Decision-Making", desc: "Leveraging AI insights to support better, faster decisions." },
      { num: "06", title: "Advanced AI Integration", desc: "Connecting multiple AI tools into seamless, automated workflows." },
    ],
    price: "Join Programme",
    highlight: true,
  },
  {
    id: "ai-foundations",
    badge: "Beginner Friendly",
    badgeColor: "#38B54A",
    icon: BookOpen,
    color: "#8B9E1A",
    title: "AI Foundations",
    tagline: "Start your AI journey.",
    description:
      "A foundational programme for individuals who are new to AI and want to build confidence and understanding before diving into advanced tools. Ideal for those who feel overwhelmed by AI and want a clear, structured starting point.",
    duration: "4 weeks",
    format: "Online, self-paced",
    audience: "Beginners, students, and career changers",
    outcomes: [
      "Understand what AI is and how it works",
      "Explore the most useful AI tools available today",
      "Use AI for basic productivity tasks",
      "Develop confidence in discussing and using AI",
      "Identify where AI can help in your personal and professional life",
    ],
    modules: [
      { num: "01", title: "What Is AI? A Practical Introduction", desc: "Demystifying AI — what it is, what it isn't, and why it matters." },
      { num: "02", title: "Exploring AI Tools", desc: "Hands-on exploration of the most accessible and useful AI tools." },
      { num: "03", title: "AI for Everyday Tasks", desc: "Using AI to improve writing, research, and daily productivity." },
      { num: "04", title: "Your AI Learning Path", desc: "Building a personalised plan for continued AI learning and growth." },
    ],
    price: "Join Programme",
    highlight: false,
  },
  {
    id: "ai-leadership",
    badge: "For Leaders",
    badgeColor: "#8B9E1A",
    icon: Briefcase,
    color: "#E6B800",
    title: "AI Leadership",
    tagline: "AI for educators, pastors, and leaders.",
    description:
      "Designed for leaders in education, faith communities, and organisations who need to understand AI's implications, lead AI adoption, and develop responsible AI strategies for their teams and communities.",
    duration: "6 weeks",
    format: "Online with group coaching sessions",
    audience: "Educators, pastors, managers, and community leaders",
    outcomes: [
      "Understand AI's impact on your sector",
      "Lead AI adoption conversations with confidence",
      "Develop a responsible AI strategy for your organisation",
      "Use AI to enhance teaching, preaching, and leadership",
      "Build an AI-ready culture within your team or community",
    ],
    modules: [
      { num: "01", title: "AI and the Future of Leadership", desc: "How AI is reshaping leadership roles, decision-making, and strategy." },
      { num: "02", title: "AI in Education & Ministry", desc: "Practical AI applications for teaching, pastoral care, and community engagement." },
      { num: "03", title: "Responsible AI Adoption", desc: "Ethics, governance, and values-aligned AI use for leaders." },
      { num: "04", title: "Building an AI Strategy", desc: "Developing a clear, actionable AI adoption plan for your context." },
      { num: "05", title: "Leading AI Change", desc: "Managing resistance, building buy-in, and sustaining AI momentum." },
      { num: "06", title: "AI Leadership in Practice", desc: "Case studies, reflection, and your personal AI leadership roadmap." },
    ],
    price: "Join Programme",
    highlight: false,
  },
  {
    id: "webinars",
    badge: "Free & Paid",
    badgeColor: "#38B54A",
    icon: Play,
    color: "#38B54A",
    title: "Webinars & Masterclasses",
    tagline: "Build AI productivity systems.",
    description:
      "Live and recorded webinars covering specific AI tools, workflows, and productivity strategies. Perfect for professionals who want focused, practical learning on a specific topic without committing to a full programme.",
    duration: "60–90 minutes per session",
    format: "Live online + recorded replay",
    audience: "All professionals and learners",
    outcomes: [
      "Learn a specific AI tool or workflow in depth",
      "Get live Q&A with AI practitioners",
      "Access recordings to revisit at any time",
      "Network with other AI-curious professionals",
      "Stay current with the latest AI developments",
    ],
    modules: [
      { num: "01", title: "AI Tools Deep Dives", desc: "In-depth sessions on specific tools: ChatGPT, Gemini, Perplexity, Notion AI, and more." },
      { num: "02", title: "AI Workflow Masterclasses", desc: "Step-by-step walkthroughs of real AI-powered productivity workflows." },
      { num: "03", title: "AI for Specific Roles", desc: "Targeted sessions for educators, managers, healthcare workers, and more." },
      { num: "04", title: "AI Trends & Updates", desc: "Monthly sessions on the latest AI developments and what they mean for professionals." },
    ],
    price: "Register Free",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Do I need any technical background to join?",
    a: "No technical background is required. All UpskillinTech programmes are designed for working professionals, not developers or engineers. If you can use a smartphone and a laptop, you have everything you need.",
  },
  {
    q: "How much time do I need to commit each week?",
    a: "The AI-Enabled Professional programme requires approximately 3–5 hours per week. AI Foundations requires 2–3 hours per week. AI Leadership requires 3–4 hours per week, including group coaching sessions.",
  },
  {
    q: "Are the programmes self-paced or do they have fixed schedules?",
    a: "Most programmes are primarily self-paced with optional live sessions. The AI Leadership programme includes scheduled group coaching calls. Webinars have fixed dates but are recorded for replay.",
  },
  {
    q: "What AI tools will I learn to use?",
    a: "Programmes cover a range of tools including ChatGPT, Gemini, Claude, Perplexity, Notion AI, Microsoft Copilot, and others. The focus is on practical application rather than any single tool.",
  },
  {
    q: "Is there a certificate upon completion?",
    a: "Yes. Participants who complete a programme receive a UpskillinTech certificate of completion, which can be shared on LinkedIn and added to your professional profile.",
  },
  {
    q: "Can my organisation enrol multiple team members?",
    a: "Yes. UpskillinTech offers group enrolment and enterprise training packages for teams and organisations. Contact us via the Enterprise page or send an inquiry through the Contact page.",
  },
];

const testimonials = [
  {
    name: "Amara Osei",
    role: "Marketing Manager",
    company: "Lagos, Nigeria",
    quote: "The AI-Enabled Professional programme completely transformed how I work. I now use AI for research, drafting, and analysis — saving at least 8 hours every week.",
    rating: 5,
  },
  {
    name: "David Kimani",
    role: "Secondary School Teacher",
    company: "Nairobi, Kenya",
    quote: "AI Foundations gave me the confidence I needed. I went from being scared of AI to using it every day in my lesson planning and student feedback.",
    rating: 5,
  },
  {
    name: "Pastor James Adeyemi",
    role: "Senior Pastor",
    company: "Abuja, Nigeria",
    quote: "The AI Leadership programme helped me understand how to use AI responsibly in ministry. Our communications and administrative processes are now much more efficient.",
    rating: 5,
  },
];

export default function Programs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedProgram, setExpandedProgram] = useState<string | null>("ai-enabled-professional");

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #E6B800 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center text-gray-900 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
            style={{ background: "rgba(255,255,255,0.2)" }}>
            <GraduationCap size={12} /> UpskillinTech Programmes
          </div>
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl leading-tight mb-5">
            Learn AI. Apply It. Transform Your Work.
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Practical, structured programmes that help professionals, leaders, and
            organisations integrate AI into real work — not just theory.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#programmes"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm transition-all"
              style={{ background: "#E6B800", color: "#1C1C1C" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4a800")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E6B800")}>
              Explore Programmes <ArrowRight size={16} />
            </a>
            <a href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm border-2 border-green-600 text-gray-900 transition-all"
              onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.color = "#38B54A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#38B54A"; }}>
              Talk to Us
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-5xl mx-auto px-4 lg:px-8 mt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { value: "1,000+", label: "Professionals Trained" },
              { value: "4", label: "Programmes Available" },
              { value: "95%", label: "Satisfaction Rate" },
              { value: "8hrs", label: "Avg. Time Saved / Week" },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl px-4 py-3 text-center text-gray-900"
                style={{ background: "rgba(56,181,74,0.10)" }}>
                <p className="font-poppins font-bold text-xl" style={{ color: "#E6B800" }}>{stat.value}</p>
                <p className="text-xs opacity-80 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programme Cards ───────────────────────────────────────────────── */}
      <section id="programmes" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>Our Programmes</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              Choose Your Learning Path
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#555" }}>
              Whether you are just starting out or ready to lead AI transformation,
              there is a programme designed for your level and goals.
            </p>
          </div>

          <div className="space-y-6">
            {programs.map((prog) => {
              const Icon = prog.icon;
              const isExpanded = expandedProgram === prog.id;
              return (
                <div key={prog.id}
                  className="rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isExpanded ? prog.color : "#e8e8e8",
                    boxShadow: isExpanded ? `0 4px 24px ${prog.color}20` : "0 1px 4px rgba(0,0,0,0.06)",
                  }}>
                  {/* Card header */}
                  <div
                    className="flex items-start gap-4 p-6 cursor-pointer"
                    style={{ background: isExpanded ? `${prog.color}08` : "#fff" }}
                    onClick={() => setExpandedProgram(isExpanded ? null : prog.id)}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${prog.color}15` }}>
                      <Icon size={22} style={{ color: prog.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-poppins font-bold text-lg" style={{ color: "#1C1C1C" }}>{prog.title}</h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${prog.badgeColor}20`, color: prog.badgeColor }}>
                          {prog.badge}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2" style={{ color: prog.color }}>{prog.tagline}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{prog.description}</p>
                      <div className="flex flex-wrap gap-4 mt-3">
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: "#666" }}>
                          <Clock size={12} style={{ color: prog.color }} /> {prog.duration}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: "#666" }}>
                          <Users size={12} style={{ color: prog.color }} /> {prog.audience}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: "#666" }}>
                          <BookOpen size={12} style={{ color: prog.color }} /> {prog.format}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      <a
                        href="/contact"
                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: prog.color, color: "#fff" }}
                        onClick={e => e.stopPropagation()}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                      >
                        {prog.price} <ArrowRight size={12} />
                      </a>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                        style={{ background: `${prog.color}15` }}>
                        {isExpanded
                          ? <ChevronUp size={16} style={{ color: prog.color }} />
                          : <ChevronDown size={16} style={{ color: prog.color }} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t" style={{ borderColor: `${prog.color}20` }}>
                      <div className="grid md:grid-cols-2 gap-8 pt-6">
                        {/* Outcomes */}
                        <div>
                          <h4 className="font-poppins font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: "#1C1C1C" }}>
                            <Target size={15} style={{ color: prog.color }} /> What You Will Achieve
                          </h4>
                          <ul className="space-y-2.5">
                            {prog.outcomes.map((outcome, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#444" }}>
                                <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: prog.color }} />
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Modules */}
                        <div>
                          <h4 className="font-poppins font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: "#1C1C1C" }}>
                            <BookOpen size={15} style={{ color: prog.color }} /> Programme Modules
                          </h4>
                          <div className="space-y-3">
                            {prog.modules.map((mod, i) => (
                              <div key={i} className="flex gap-3">
                                <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                  style={{ background: prog.color }}>
                                  {mod.num}
                                </span>
                                <div>
                                  <p className="text-sm font-semibold" style={{ color: "#1C1C1C" }}>{mod.title}</p>
                                  <p className="text-xs mt-0.5" style={{ color: "#666" }}>{mod.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Mobile CTA */}
                      <div className="mt-6 sm:hidden">
                        <a href="/contact"
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all"
                          style={{ background: prog.color, color: "#fff" }}>
                          {prog.price} <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#f8faf8" }}>
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>How It Works</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              Your Path to AI Proficiency
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#555" }}>
              A simple, structured process from enrolment to AI-enabled professional.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Target, title: "Choose Your Programme", desc: "Select the programme that matches your current level and goals.", color: "#38B54A" },
              { step: "02", icon: BookOpen, title: "Learn at Your Pace", desc: "Work through structured modules with videos, exercises, and resources.", color: "#8B9E1A" },
              { step: "03", icon: Zap, title: "Apply in Real Work", desc: "Implement what you learn directly in your daily workflows and tasks.", color: "#E6B800" },
              { step: "04", icon: Award, title: "Get Certified", desc: "Complete the programme and receive your UpskillinTech certificate.", color: "#38B54A" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                      style={{ background: `${item.color}15` }}>
                      <Icon size={28} style={{ color: item.color }} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: item.color }}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-poppins font-semibold text-base mb-2" style={{ color: "#1C1C1C" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "rgba(56,181,74,0.2)", color: "#38B54A" }}>What Professionals Say</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4 text-white">
              Real Results from Real Professionals
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#E6B800" style={{ color: "#E6B800" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "rgba(255,255,255,0.8)" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #38B54A, #8B9E1A)" }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>FAQ</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border overflow-hidden transition-all"
                style={{ borderColor: openFaq === i ? "#38B54A" : "#e8e8e8" }}>
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  style={{ background: openFaq === i ? "#f0faf0" : "#fff" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-poppins font-semibold text-sm" style={{ color: "#1C1C1C" }}>{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={16} style={{ color: "#38B54A", flexShrink: 0 }} />
                    : <ChevronDown size={16} style={{ color: "#999", flexShrink: 0 }} />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="section-py"
        style={{ background: "linear-gradient(135deg, #38B54A 0%, #8B9E1A 60%, #E6B800 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="font-poppins font-bold text-2xl lg:text-3xl mb-3">
            Ready to Become AI-Enabled?
          </h2>
          <p className="text-base opacity-90 mb-7 max-w-xl mx-auto">
            Join over 1,000 professionals who have transformed how they work
            using AI. Your journey starts here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm transition-all"
              style={{ background: "#E6B800", color: "#1C1C1C" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4a800")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E6B800")}>
              Enrol Now <ArrowRight size={15} />
            </a>
            <a href="/enterprise"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm border-2 border-white text-white transition-all"
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#38B54A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}>
              Enterprise Training
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
