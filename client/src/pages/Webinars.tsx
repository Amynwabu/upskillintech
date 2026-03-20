/**
 * Webinars Page — UpskillinTech
 * URL: /resources/webinars
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Yellow (#E6B800)
 */
import { useState } from "react";
import { Link } from "wouter";
import { Play, Calendar, Clock, Users, ArrowRight, ChevronRight, Mic, Video, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const UPCOMING = [
  {
    id: 1,
    title: "AI Strategy for Leaders: Building an AI-Ready Organisation",
    date: "April 10, 2025",
    time: "6:00 PM GMT",
    duration: "90 minutes",
    speaker: "Dr. Amaka Adiuku",
    speakerRole: "Founder, UpskillinTech",
    description: "A deep-dive session for executives, managers, and team leaders on how to develop and implement an AI strategy that actually works. Covers AI readiness assessment, change management, and building AI-fluent teams.",
    topics: ["AI readiness assessment framework", "Change management for AI adoption", "Building AI-fluent teams", "Common pitfalls and how to avoid them"],
    audience: "Leaders & Managers",
    seats: "Limited to 100 seats",
    color: "#38B54A",
  },
  {
    id: 2,
    title: "AI for Educators: Practical Tools for the Modern Classroom",
    date: "April 24, 2025",
    time: "5:00 PM GMT",
    duration: "60 minutes",
    speaker: "UpskillinTech Team",
    speakerRole: "AI Education Specialists",
    description: "Designed for teachers, trainers, and academic professionals who want to use AI to improve lesson planning, student feedback, and course design — without losing the human touch that makes great teaching.",
    topics: ["AI tools for lesson planning", "Automated feedback frameworks", "Ethical AI use in education", "Practical live demonstrations"],
    audience: "Educators & Trainers",
    seats: "Open registration",
    color: "#8B9E1A",
  },
  {
    id: 3,
    title: "AI Automation for Small Business Owners",
    date: "May 8, 2025",
    time: "6:00 PM GMT",
    duration: "75 minutes",
    speaker: "Dr. Amaka Adiuku",
    speakerRole: "Founder, UpskillinTech",
    description: "How small business owners can use AI to automate repetitive tasks, improve customer communication, and compete with larger companies — without a large tech budget or technical background.",
    topics: ["AI automation for customer service", "Marketing and content creation with AI", "Financial and admin AI tools", "Building your first AI workflow"],
    audience: "Entrepreneurs & SME Owners",
    seats: "Limited to 80 seats",
    color: "#E6B800",
  },
];

const PAST = [
  {
    id: 4,
    title: "AI Productivity Masterclass: Save 10 Hours a Week",
    date: "February 2025",
    duration: "90 minutes",
    speaker: "Dr. Amaka Adiuku",
    speakerRole: "Founder, UpskillinTech",
    views: "1,200+",
    description: "The most-watched UpskillinTech webinar. Dr. Amaka walks through the exact AI productivity system used by programme graduates to save 10+ hours every week — with live demonstrations and Q&A.",
    highlights: ["Live ChatGPT demonstration", "5-step productivity framework", "Real examples from graduates", "Q&A with Dr. Amaka"],
    color: "#38B54A",
  },
  {
    id: 5,
    title: "Building AI Workflows for Teams: A Practical Guide",
    date: "January 2025",
    duration: "75 minutes",
    speaker: "UpskillinTech Team",
    speakerRole: "AI Workflow Specialists",
    views: "850+",
    description: "A hands-on session covering how to design, test, and roll out AI workflows across a team. Includes templates, a live workflow build, and a framework for measuring impact.",
    highlights: ["Live workflow build", "Team rollout framework", "Downloadable templates", "Real case study walkthrough"],
    color: "#8B9E1A",
  },
  {
    id: 6,
    title: "AI for Ministry Leaders: Practical Applications for Church and Community",
    date: "December 2024",
    duration: "60 minutes",
    speaker: "Dr. Amaka Adiuku",
    speakerRole: "Founder, UpskillinTech",
    views: "620+",
    description: "Specifically designed for pastors, church administrators, and faith community leaders. Covers how AI can support sermon preparation, communication, administration, and community engagement.",
    highlights: ["Sermon preparation with AI", "Church communication templates", "Admin automation tools", "Ethical considerations for ministry AI use"],
    color: "#E6B800",
  },
  {
    id: 7,
    title: "AI Prompts That Actually Work: A Deep Dive",
    date: "November 2024",
    duration: "60 minutes",
    speaker: "UpskillinTech Team",
    speakerRole: "AI Education Specialists",
    views: "940+",
    description: "A practical session on writing effective AI prompts for real professional tasks. Includes live examples, common mistakes, and a walkthrough of the 50 AI Prompts Library.",
    highlights: ["Live prompt demonstrations", "Common prompt mistakes", "Prompt templates by use case", "Q&A session"],
    color: "#38B54A",
  },
  {
    id: 8,
    title: "AI Strategy 101: Where to Start and What to Avoid",
    date: "October 2024",
    duration: "90 minutes",
    speaker: "Dr. Amaka Adiuku",
    speakerRole: "Founder, UpskillinTech",
    views: "780+",
    description: "A foundational session for professionals and leaders who are new to AI strategy. Covers the AI landscape, common adoption mistakes, and a simple framework for getting started.",
    highlights: ["AI landscape overview", "Strategy framework", "Common adoption mistakes", "Getting started checklist"],
    color: "#8B9E1A",
  },
];

export default function Webinars() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedWebinar, setSelectedWebinar] = useState<number | null>(null);

  const handleRegister = (e: React.FormEvent, title: string) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) { toast.error("Please enter your name and email."); return; }
    toast.success(`You're registered for "${title}"!`, { description: "Check your inbox for the joining link." });
    setEmail(""); setName(""); setSelectedWebinar(null);
  };

  const handleWatch = (title: string) => {
    toast.info(`"${title}" recording`, { description: "Full recordings available to programme members. Join the community to access." });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(56,181,74,0.10)", color: "#1C1C1C", border: "1px solid rgba(255,255,255,0.35)" }}>Webinars</span>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>
              Learn Live. Watch On Demand. Grow Every Month.
            </h1>
            <p className="text-lg mb-6" style={{ color: "#555" }}>
              Join live masterclasses with Dr. Amaka Adiuku and the UpskillinTech team — or watch past recordings at your own pace. Every session is practical, specific, and immediately applicable.
            </p>
            <div className="flex items-center gap-4 text-sm" style={{ color: "#555" }}>
              <span className="flex items-center gap-1"><Video size={15} /> 8+ Recordings</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Calendar size={15} /> Monthly Live Sessions</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Users size={15} /> 4,000+ Attendees</span>
            </div>
          </div>
        </div>
        <div style={{ background: "linear-gradient(90deg, #8B9E1A 0%, #E6B800 100%)" }}>
          <div className="container py-4">
            <div className="flex flex-wrap gap-8 justify-center text-center">
              {[{ v: "8+", l: "Past Recordings" }, { v: "3", l: "Upcoming Sessions" }, { v: "4,000+", l: "Total Attendees" }, { v: "Free", l: "To Register" }].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{s.v}</div>
                  <div className="text-xs font-medium" style={{ color: "rgba(0,0,0,0.65)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Register Now</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>Upcoming Webinars</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#6B7280" }}>Secure your spot for our next live sessions — all free to attend.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {UPCOMING.map((w) => (
              <div key={w.id} className="rounded-2xl overflow-hidden flex flex-col" style={{ border: `2px solid ${w.color}25`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="h-2" style={{ background: w.color }} />
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4" style={{ background: `${w.color}12`, color: w.color }}>Upcoming</span>
                  <h3 className="text-lg font-bold mb-3 leading-snug" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{w.title}</h3>
                  <div className="flex flex-col gap-1.5 text-xs mb-4" style={{ color: "#6B7280" }}>
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {w.date} at {w.time}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {w.duration}</span>
                    <span className="flex items-center gap-1.5"><Mic size={12} /> {w.speaker} — {w.speakerRole}</span>
                    <span className="flex items-center gap-1.5"><Users size={12} /> {w.audience} · {w.seats}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#4B5563" }}>{w.description}</p>
                  <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#9CA3AF" }}>What You'll Learn</p>
                    <ul className="space-y-1">
                      {w.topics.map(t => (
                        <li key={t} className="flex items-start gap-2 text-xs" style={{ color: "#4B5563" }}>
                          <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: w.color }} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {selectedWebinar === w.id ? (
                    <form onSubmit={(e) => handleRegister(e, w.title)} className="flex flex-col gap-2">
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="rounded-lg px-3 py-2.5 text-sm outline-none" style={{ border: "1.5px solid #E5E7EB" }} />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="rounded-lg px-3 py-2.5 text-sm outline-none" style={{ border: "1.5px solid #E5E7EB" }} />
                      <button type="submit" className="w-full font-bold py-2.5 rounded-lg text-sm" style={{ background: w.color, color: "#fff", fontFamily: "'Sora', sans-serif" }}>
                        Confirm Registration
                      </button>
                      <button type="button" onClick={() => setSelectedWebinar(null)} className="text-xs text-center" style={{ color: "#9CA3AF" }}>Cancel</button>
                    </form>
                  ) : (
                    <button onClick={() => setSelectedWebinar(w.id)} className="w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2" style={{ background: w.color, color: "#fff", fontFamily: "'Sora', sans-serif" }}>
                      <Calendar size={16} /> Register Free
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Recordings */}
      <section className="section-py" style={{ background: "#F7F8FA" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">On Demand</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>Past Webinar Recordings</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#6B7280" }}>Missed a session? Watch the recordings from our most popular webinars.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PAST.map((w) => (
              <div key={w.id} className="rounded-xl bg-white flex flex-col" style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="h-1.5 rounded-t-xl" style={{ background: w.color }} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "#F7F8FA", color: "#6B7280", border: "1px solid #E5E7EB" }}>
                      {w.date}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "#9CA3AF" }}>
                      <Users size={12} /> {w.views} views
                    </span>
                  </div>
                  <h3 className="font-bold mb-2 leading-snug" style={{ fontFamily: "'Sora', sans-serif", color: "#1C1C1C" }}>{w.title}</h3>
                  <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "#6B7280" }}>
                    <span className="flex items-center gap-1"><Mic size={12} /> {w.speaker}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {w.duration}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#4B5563" }}>{w.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {w.highlights.map(h => (
                      <span key={h} className="text-xs px-2 py-1 rounded-full" style={{ background: `${w.color}10`, color: w.color, border: `1px solid ${w.color}25` }}>{h}</span>
                    ))}
                  </div>
                  <button onClick={() => handleWatch(w.title)} className="w-full font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm" style={{ background: `${w.color}12`, color: w.color, border: `1.5px solid ${w.color}30`, fontFamily: "'Sora', sans-serif" }}>
                    <Play size={15} /> Watch Recording
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>Never Miss a Webinar</h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>Get notified about upcoming sessions and receive recordings directly in your inbox.</p>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("You're on the list!", { description: "We'll notify you about upcoming webinars." }); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input type="email" placeholder="your@email.com" className="flex-1 rounded-lg px-4 py-3 text-sm outline-none" style={{ border: "none", color: "#1C1C1C" }} />
            <button type="submit" className="font-bold px-6 py-3 rounded-lg whitespace-nowrap" style={{ background: "#E6B800", color: "#1C1C1C", fontFamily: "'Sora', sans-serif" }}>
              Notify Me
            </button>
          </form>
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.60)" }}>
            ← Back to Resources Hub
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
