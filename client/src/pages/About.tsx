/**
 * About Page — UpskillinTech
 * URL: /about
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Yellow (#E6B800) + Dark (#1C1C1C)
 * Font: Sora (headings) + Inter (body)
 * 8 Sections: Hero, Mission, Founder, Vision, Ecosystem, Partnerships, Impact, Final CTA
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Brain, Zap, Users, Lightbulb, BookOpen, Target, Globe, Handshake,
  ArrowRight, CheckCircle2, Award, Microscope, Network, Building2,
  TrendingUp, GraduationCap, ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

// ─── Animated Counter ────────────────────────────────────────────────────────
function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MISSION_PILLARS = [
  { icon: <BookOpen size={24} />, label: "Understand AI", desc: "Build foundational AI literacy for professionals at every level — from awareness to confident application.", color: "#38B54A" },
  { icon: <Zap size={24} />, label: "Integrate AI", desc: "Embed AI into real workflows and daily work processes — not just as a tool, but as a productivity system.", color: "#8B9E1A" },
  { icon: <TrendingUp size={24} />, label: "Build Productivity", desc: "Develop AI-powered productivity systems that save hours every week and improve decision quality.", color: "#E6B800" },
  { icon: <Target size={24} />, label: "Lead Responsibly", desc: "Equip leaders to guide their teams and organisations through AI adoption with clarity and confidence.", color: "#38B54A" },
];

const FOUNDER_EXPERTISE = [
  { icon: <Brain size={22} />, label: "AI Expertise", desc: "Research and development in artificial intelligence and machine learning systems, with a focus on practical applications in professional environments.", color: "#38B54A" },
  { icon: <Microscope size={22} />, label: "Robotics & Automation", desc: "Work in robotics and autonomous systems, exploring how intelligent systems perceive and interact with complex environments.", color: "#8B9E1A" },
  { icon: <Award size={22} />, label: "Research Leadership", desc: "Experience leading research initiatives and developing AI-driven solutions that bridge academic rigour with industry relevance.", color: "#E6B800" },
  { icon: <Handshake size={22} />, label: "Industry Collaboration", desc: "Collaboration with organisations and research partners to develop practical AI applications that create measurable impact.", color: "#38B54A" },
];

const VISION_POINTS = [
  { icon: <Zap size={20} />, label: "Work Smarter with AI", desc: "Every professional equipped with the AI skills to multiply their output and reduce time on low-value tasks." },
  { icon: <Lightbulb size={20} />, label: "Innovate Responsibly", desc: "A culture of thoughtful AI adoption — where innovation is guided by ethics, equity, and human-centred values." },
  { icon: <Target size={20} />, label: "Lead Effectively", desc: "Leaders who understand AI deeply enough to make confident decisions, guide their teams, and shape AI strategy." },
];

const ECOSYSTEM_STAGES = [
  { step: "01", label: "Awareness", desc: "Articles, videos, and insights on AI — building foundational understanding of what AI is and how it applies to real work.", icon: <BookOpen size={28} />, color: "#38B54A" },
  { step: "02", label: "Learning", desc: "Structured programmes that build AI capability — from foundations to advanced workflows and leadership applications.", icon: <GraduationCap size={28} />, color: "#8B9E1A" },
  { step: "03", label: "Application", desc: "Real-world workflows and productivity systems — turning knowledge into daily practice that saves time and improves decisions.", icon: <Zap size={28} />, color: "#E6B800" },
  { step: "04", label: "Community", desc: "A network of professionals and leaders exploring AI together — sharing wins, workflows, and accountability.", icon: <Users size={28} />, color: "#38B54A" },
];

const PARTNERSHIP_TYPES = [
  { icon: <GraduationCap size={20} />, label: "AI Training Programmes", desc: "Co-develop and deliver AI literacy and productivity programmes for your institution or organisation." },
  { icon: <Microscope size={20} />, label: "Research Collaboration", desc: "Partner on AI research initiatives that bridge academic insight with practical, real-world application." },
  { icon: <Globe size={20} />, label: "AI Literacy Initiatives", desc: "Institutional programmes designed to build AI literacy at scale — for students, staff, or community members." },
  { icon: <Network size={20} />, label: "Community Technology", desc: "Technology and AI programmes for community organisations, faith communities, and social enterprises." },
];

const IMPACT_STATS = [
  { value: 1000, suffix: "+", label: "Professionals Trained", desc: "Individuals who have completed UpskillinTech programmes or attended live sessions." },
  { value: 50, suffix: "+", label: "Organisations Engaged", desc: "Businesses, institutions, and community organisations supported with AI training and strategy." },
  { value: 2500, suffix: "+", label: "Community Members", desc: "Professionals and leaders in the UpskillinTech network, sharing AI insights and workflows." },
  { value: 95, suffix: "%", label: "Satisfaction Rate", desc: "Of programme graduates report improved AI confidence and measurable productivity gains." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container relative z-10 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5" style={{ background: "rgba(56,181,74,0.10)", color: "#1C1C1C", border: "1px solid rgba(255,255,255,0.35)" }}>About UpskillinTech</span>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>
                Enabling People and Organizations to Thrive in the Age of AI
              </h1>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#555" }}>
                UpskillinTech helps professionals, leaders, and organisations integrate AI into real work, decision-making, and productivity systems — not just as a concept, but as a daily practice.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/#programs" className="font-bold px-6 py-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: "#1C1C1C", color: "#1C1C1C", fontFamily: "'Sora', sans-serif", textDecoration: "none" }}>
                  <ArrowRight size={16} /> Explore Programs
                </Link>
                <Link href="/#community" className="font-bold px-6 py-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: "rgba(56,181,74,0.10)", color: "#1C1C1C", border: "1.5px solid rgba(255,255,255,0.40)", fontFamily: "'Sora', sans-serif", textDecoration: "none" }}>
                  <Users size={16} /> Join Community
                </Link>
              </div>
            </div>
            {/* Ecosystem visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-80 h-80">
                {/* Central circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-center" style={{ background: "rgba(56,181,74,0.10)", border: "2px solid rgba(255,255,255,0.40)" }}>
                    <Brain size={32} style={{ color: "#1C1C1C" }} />
                    <span className="text-xs font-bold mt-1" style={{ color: "#1C1C1C", fontFamily: "'Sora', sans-serif" }}>AI-Enabled</span>
                  </div>
                </div>
                {/* Orbit nodes */}
                {[
                  { label: "Learn", icon: <BookOpen size={18} />, angle: 0 },
                  { label: "Apply", icon: <Zap size={18} />, angle: 90 },
                  { label: "Lead", icon: <Target size={18} />, angle: 180 },
                  { label: "Grow", icon: <TrendingUp size={18} />, angle: 270 },
                ].map(({ label, icon, angle }) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + 40 * Math.cos(rad);
                  const y = 50 + 40 * Math.sin(rad);
                  return (
                    <div key={label} className="absolute flex flex-col items-center" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                      <div className="w-14 h-14 rounded-full flex flex-col items-center justify-center" style={{ background: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.50)" }}>
                        <div style={{ color: "#1C1C1C" }}>{icon}</div>
                        <span className="text-xs font-bold" style={{ color: "#1C1C1C", fontFamily: "'Sora', sans-serif" }}>{label}</span>
                      </div>
                    </div>
                  );
                })}
                {/* Orbit ring */}
                <div className="absolute inset-4 rounded-full" style={{ border: "1.5px dashed rgba(255,255,255,0.30)" }} />
              </div>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div style={{ background: "linear-gradient(90deg, #8B9E1A 0%, #E6B800 100%)" }}>
          <div className="container py-4">
            <div className="flex flex-wrap gap-8 justify-center text-center">
              {[{ v: "1,000+", l: "Professionals Trained" }, { v: "50+", l: "Organisations Engaged" }, { v: "2,500+", l: "Community Members" }, { v: "95%", l: "Satisfaction Rate" }].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{s.v}</div>
                  <div className="text-xs font-medium" style={{ color: "rgba(0,0,0,0.65)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MISSION ──────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Our Mission</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-6" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>
                Bridging the Gap Between AI Awareness and AI Productivity
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#4B5563" }}>
                Most professionals know AI exists. Very few know how to make it work for them. UpskillinTech exists to close that gap — not through theory, but through structured, practical learning that changes how people work every day.
              </p>
              <p className="leading-relaxed" style={{ color: "#6B7280" }}>
                We believe that AI literacy is not a technical skill — it is a professional skill. And like every professional skill, it can be taught, practised, and mastered by anyone willing to invest the time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {MISSION_PILLARS.map((p) => (
                <div key={p.label} className="p-5 rounded-2xl" style={{ border: `2px solid ${p.color}20`, background: `${p.color}06` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: `${p.color}15`, color: p.color }}>
                    {p.icon}
                  </div>
                  <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{p.label}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FOUNDER ──────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#F7F8FA" }}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-label">Founder</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>Meet Dr. Amaka Adiuku</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left: Photo + credentials */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative mb-6">
                <div className="w-52 h-52 rounded-2xl overflow-hidden" style={{ border: "4px solid #38B54A" }}>
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/93064684/acUjws9faR2fssir6ETEdK/founder-portrait_b3a8b2b1.webp"
                    alt="Dr. Amaka Adiuku"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      const parent = el.parentElement!;
                      parent.style.background = "linear-gradient(135deg, #38B54A, #E6B800)";
                      parent.style.display = "flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      parent.innerHTML = '<span style="font-size:4rem;font-weight:900;color:#fff;font-family:Poppins,sans-serif">DA</span>';
                    }}
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#E6B800", color: "#1C1C1C", fontFamily: "'Sora', sans-serif" }}>
                  Founder & CEO
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>Dr. Amaka Adiuku</h3>
              <p className="text-sm mb-4" style={{ color: "#38B54A", fontFamily: "'Sora', sans-serif" }}>Lecturer in AI | Robotics Researcher | Educator</p>
              <div className="flex flex-wrap gap-2">
                {["AI Research", "Robotics", "Education", "Industry Collaboration"].map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: "#38B54A12", color: "#38B54A", border: "1px solid #38B54A25" }}>{tag}</span>
                ))}
              </div>
            </div>
            {/* Right: Bio + expertise blocks */}
            <div>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                UpskillinTech is founded by Dr. Amaka Adiuku, whose work combines artificial intelligence, robotics, and real-world industry applications. Her experience spans research, education, and industry collaboration — enabling the UpskillinTech platform to deliver practical AI learning grounded in real-world impact.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "#6B7280" }}>
                Dr. Adiuku's approach to AI education is shaped by a conviction that practical application matters more than theoretical awareness. Every UpskillinTech programme reflects this philosophy: structured, actionable, and designed to produce measurable change in how professionals work.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {FOUNDER_EXPERTISE.map((e) => (
                  <div key={e.label} className="p-4 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${e.color}12`, color: e.color }}>{e.icon}</div>
                      <h4 className="font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{e.label}</h4>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VISION ───────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(56,181,74,0.15)", color: "#38B54A", border: "1px solid rgba(56,181,74,0.25)" }}>Our Vision</span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>
                A World Where AI Empowers Every Professional
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                UpskillinTech envisions a world where individuals, leaders, and organisations confidently integrate artificial intelligence into their work and decision-making — not as an experiment, but as a natural extension of how they operate.
              </p>
              <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                We aim to become a global platform that enables people to work smarter, innovate responsibly, and lead effectively in an AI-driven world — regardless of their technical background or industry.
              </p>
            </div>
            <div className="space-y-5">
              {VISION_POINTS.map((v, i) => (
                <div key={v.label} className="flex gap-5 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: i === 0 ? "#38B54A20" : i === 1 ? "#8B9E1A20" : "#E6B80020", color: i === 0 ? "#38B54A" : i === 1 ? "#8B9E1A" : "#E6B800" }}>
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>{v.label}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. ECOSYSTEM ────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-label">Platform Structure</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>The UpskillinTech Ecosystem</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#6B7280" }}>
              A four-stage journey from AI awareness to community — designed to take professionals from curious to capable.
            </p>
          </div>
          {/* Flow diagram */}
          <div className="grid md:grid-cols-4 gap-0 relative">
            {ECOSYSTEM_STAGES.map((stage, i) => (
              <div key={stage.label} className="relative flex flex-col items-center text-center px-4">
                {/* Connector line */}
                {i < ECOSYSTEM_STAGES.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 z-0" style={{ background: "linear-gradient(90deg, #38B54A, #E6B800)" }} />
                )}
                <div className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${stage.color}12`, border: `2px solid ${stage.color}30`, color: stage.color }}>
                  {stage.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white" style={{ background: stage.color, fontFamily: "'Sora', sans-serif" }}>{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{stage.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{stage.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/#programs" className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm" style={{ background: "#38B54A", color: "#fff", fontFamily: "'Sora', sans-serif", textDecoration: "none" }}>
              Explore Programs <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERSHIPS ─────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#F7F8FA" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Partnerships</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-6" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>
                Collaborating to Advance AI Literacy
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#4B5563" }}>
                UpskillinTech collaborates with educational institutions, organisations, and industry partners committed to advancing AI literacy and responsible technology adoption.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "#6B7280" }}>
                We believe that AI transformation is most effective when it is community-driven. Our partnerships extend the reach of AI education to professionals and organisations who need it most.
              </p>
              <button
                onClick={() => toast.info("Partnership enquiries", { description: "Email us at partnerships@upskillintech.com to discuss collaboration opportunities." })}
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm"
                style={{ background: "#38B54A", color: "#fff", fontFamily: "'Sora', sans-serif" }}
              >
                <Handshake size={16} /> Partner With Us
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PARTNERSHIP_TYPES.map((p) => (
                <div key={p.label} className="p-5 rounded-2xl bg-white" style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "#38B54A12", color: "#38B54A" }}>{p.icon}</div>
                  <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{p.label}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Partner logos placeholder */}
          <div className="mt-14 pt-10 border-t" style={{ borderColor: "#E5E7EB" }}>
            <p className="text-center text-sm font-semibold mb-6" style={{ color: "#9CA3AF", fontFamily: "'Sora', sans-serif" }}>TRUSTED BY ORGANISATIONS AND INSTITUTIONS</p>
            <div className="flex flex-wrap gap-6 justify-center items-center">
              {["Educational Institution", "Research Partner", "Corporate Partner", "Community Organisation", "Faith Community"].map((org) => (
                <div key={org} className="px-6 py-3 rounded-xl text-sm font-semibold" style={{ background: "#fff", border: "1.5px solid #E5E7EB", color: "#9CA3AF", fontFamily: "'Sora', sans-serif" }}>
                  {org}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. IMPACT ───────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.20)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}>Our Impact</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>
              Real Impact, Measurable Results
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
              UpskillinTech programmes and initiatives support professionals, leaders, and organisations across industries and communities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="p-6 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}>
                <div className="text-4xl font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.90)" }}>{s.label}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { icon: <Users size={22} />, title: "Professionals", desc: "Building AI productivity skills that save hours every week and improve the quality of their work and decisions." },
              { icon: <GraduationCap size={22} />, title: "Educators & Leaders", desc: "Integrating AI into teaching, community development, and leadership — with tools and frameworks designed for their context." },
              { icon: <Building2 size={22} />, title: "Organisations", desc: "Exploring AI adoption strategies that align with their goals, culture, and capacity — supported by practical training and guidance." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl flex gap-4" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.20)", color: "#fff" }}>{item.icon}</div>
                <div>
                  <h4 className="font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5" style={{ background: "rgba(56,181,74,0.15)", color: "#38B54A", border: "1px solid rgba(56,181,74,0.25)" }}>Join the Journey</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>
            Join the UpskillinTech Journey
          </h2>
          <p className="text-lg mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            Artificial intelligence is transforming the way people work and lead. UpskillinTech exists to help individuals and organisations become AI-enabled and prepared for the future.
          </p>
          <p className="mb-10" style={{ color: "rgba(255,255,255,0.50)" }}>
            Whether you are a professional looking to save time, a leader building an AI-ready team, or an organisation developing an AI strategy — UpskillinTech has a path for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#programs" className="font-bold px-8 py-4 rounded-lg flex items-center gap-2" style={{ background: "#38B54A", color: "#fff", fontFamily: "'Sora', sans-serif", textDecoration: "none" }}>
              <ArrowRight size={18} /> Explore Programs
            </Link>
            <Link href="/#community" className="font-bold px-8 py-4 rounded-lg flex items-center gap-2" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.20)", fontFamily: "'Sora', sans-serif", textDecoration: "none" }}>
              <Users size={18} /> Join the Community
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
