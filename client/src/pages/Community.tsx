/**
 * Community Page — /community
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Accent Yellow (#E6B800)
 * Typography: Poppins (headings) + Inter (body)
 * Sections: Hero, What You Get, Masterclasses, Peer Network, Events, Join CTA
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, Users, Calendar, Zap, MessageSquare,
  BookOpen, Award, Globe, CheckCircle, Play,
  Linkedin, Youtube, Instagram, Star, Clock, MapPin
} from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Monthly Masterclasses",
    desc: "Live sessions on specific AI tools, workflows, and productivity strategies — hosted by Dr. Amaka Adiuku and guest practitioners.",
    color: "#38B54A",
  },
  {
    icon: Zap,
    title: "Workflow Sharing",
    desc: "Access and contribute to a growing library of real AI workflows shared by community members across different industries and roles.",
    color: "#8B9E1A",
  },
  {
    icon: Users,
    title: "Peer Network",
    desc: "Connect with AI-curious professionals from across Africa and the diaspora. Share challenges, wins, and insights with people on the same journey.",
    color: "#E6B800",
  },
  {
    icon: MessageSquare,
    title: "Community Discussions",
    desc: "Ongoing conversations about AI tools, news, and practical applications in a focused, professional community space.",
    color: "#38B54A",
  },
  {
    icon: Calendar,
    title: "Events & Webinars",
    desc: "Priority access to UpskillinTech events, webinars, and workshops — including early registration and member-only sessions.",
    color: "#8B9E1A",
  },
  {
    icon: Award,
    title: "Learning Resources",
    desc: "Exclusive guides, templates, prompt libraries, and AI workflow resources available only to community members.",
    color: "#E6B800",
  },
];

const masterclasses = [
  {
    title: "Using ChatGPT for Professional Research",
    date: "Monthly — 1st Thursday",
    time: "6:00 PM WAT / 7:00 PM CAT",
    host: "Dr. Amaka Adiuku",
    desc: "A practical walkthrough of using ChatGPT to conduct research, synthesise information, and produce structured reports faster.",
    tags: ["ChatGPT", "Research", "Productivity"],
    status: "Upcoming",
  },
  {
    title: "Building Your Personal AI Productivity System",
    date: "Monthly — 3rd Thursday",
    time: "6:00 PM WAT / 7:00 PM CAT",
    host: "Dr. Amaka Adiuku",
    desc: "Design a complete AI-powered productivity system tailored to your role — covering task management, communication, and decision-making.",
    tags: ["Productivity", "Workflows", "AI Tools"],
    status: "Upcoming",
  },
  {
    title: "AI for Educators: Lesson Planning & Feedback",
    date: "Quarterly",
    time: "6:00 PM WAT / 7:00 PM CAT",
    host: "Guest Educator",
    desc: "How teachers and trainers can use AI to design better lessons, provide faster feedback, and personalise learning experiences.",
    tags: ["Education", "Teaching", "AI Tools"],
    status: "Recorded",
  },
  {
    title: "AI for Church & Ministry Administration",
    date: "Quarterly",
    time: "6:00 PM WAT / 7:00 PM CAT",
    host: "Dr. Amaka Adiuku",
    desc: "Practical AI applications for church communications, sermon preparation, event management, and community outreach.",
    tags: ["Ministry", "Church", "Administration"],
    status: "Recorded",
  },
];

const upcomingEvents = [
  {
    title: "UpskillinTech AI Summit 2025",
    type: "Conference",
    date: "October 2025",
    location: "Lagos, Nigeria + Online",
    desc: "A full-day event bringing together AI practitioners, professionals, and leaders to explore the future of AI in African workplaces.",
    color: "#38B54A",
  },
  {
    title: "AI for Organisations Workshop",
    type: "Workshop",
    date: "Monthly",
    location: "Online (Zoom)",
    desc: "A half-day workshop for HR managers, operations leaders, and executives exploring how to integrate AI into their organisational workflows.",
    color: "#8B9E1A",
  },
  {
    title: "AI Literacy for Faith Communities",
    type: "Webinar",
    date: "Quarterly",
    location: "Online (Zoom)",
    desc: "A focused webinar for pastors, church administrators, and ministry leaders on responsible and practical AI use in faith communities.",
    color: "#E6B800",
  },
];

const testimonials = [
  {
    name: "Chioma Eze",
    role: "HR Professional",
    company: "Port Harcourt, Nigeria",
    quote: "The UpskillinTech community is unlike any other. The masterclasses are practical, the peer discussions are insightful, and I've made real connections with professionals on the same AI journey.",
    rating: 5,
  },
  {
    name: "Samuel Oduya",
    role: "Secondary School Principal",
    company: "Accra, Ghana",
    quote: "The monthly masterclasses have been transformative. I've implemented AI workflows in my school's administration that have saved us hours every week.",
    rating: 5,
  },
  {
    name: "Grace Mwangi",
    role: "Nonprofit Manager",
    company: "Nairobi, Kenya",
    quote: "Being part of this community has accelerated my AI learning more than any course. The workflow sharing alone is worth it.",
    rating: 5,
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "recorded">("upcoming");

  const filteredMasterclasses = masterclasses.filter(m =>
    activeTab === "upcoming" ? m.status === "Upcoming" : m.status === "Recorded"
  );

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
            <Users size={12} /> UpskillinTech Community
          </div>
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl leading-tight mb-5">
            Join the UpskillinTech Community
          </h1>
          <p className="text-lg opacity-90 mb-4 max-w-2xl mx-auto leading-relaxed">
            A growing network of AI-curious professionals, educators, leaders,
            and changemakers committed to using AI to do better work.
          </p>
          <p className="text-base opacity-80 mb-8 max-w-xl mx-auto">
            Monthly masterclasses. Workflow sharing. Peer networking.
            Events and webinars. All in one community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm transition-all"
              style={{ background: "#E6B800", color: "#1C1C1C" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4a800")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E6B800")}>
              Join the Community <ArrowRight size={16} />
            </a>
            <a href="#masterclasses"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm border-2 border-green-600 text-gray-900 transition-all"
              onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.color = "#38B54A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#38B54A"; }}>
              See Masterclasses
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-5xl mx-auto px-4 lg:px-8 mt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { value: "500+", label: "Community Members" },
              { value: "24+", label: "Masterclasses Hosted" },
              { value: "12+", label: "Countries Represented" },
              { value: "Free", label: "To Join" },
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

      {/* ── What You Get ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>Community Benefits</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              What You Get as a Member
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#555" }}>
              The UpskillinTech community is designed to support your AI learning
              journey with practical resources, real connections, and regular learning opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="rounded-2xl border p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                  style={{ borderColor: "#e8e8e8" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${b.color}15` }}>
                    <Icon size={22} style={{ color: b.color }} />
                  </div>
                  <h3 className="font-poppins font-bold text-base mb-2" style={{ color: "#1C1C1C" }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Masterclasses ────────────────────────────────────────────────── */}
      <section id="masterclasses" className="section-py" style={{ background: "#f8faf8" }}>
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>Monthly Masterclasses</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              Learn. Apply. Grow.
            </h2>
            <p className="text-base max-w-xl mx-auto mb-6" style={{ color: "#555" }}>
              Live monthly sessions on practical AI topics — hosted by Dr. Amaka Adiuku
              and guest practitioners. All sessions are recorded for community members.
            </p>
            {/* Tabs */}
            <div className="inline-flex rounded-xl overflow-hidden border" style={{ borderColor: "#e8e8e8" }}>
              {(["upcoming", "recorded"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-6 py-2.5 text-sm font-semibold capitalize transition-all"
                  style={{
                    background: activeTab === tab ? "#38B54A" : "#fff",
                    color: activeTab === tab ? "#fff" : "#555",
                  }}>
                  {tab === "upcoming" ? "Upcoming Sessions" : "Past Recordings"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredMasterclasses.map((mc, i) => (
              <div key={i} className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all"
                style={{ borderColor: "#e8e8e8" }}>
                <div className="h-1.5" style={{ background: "linear-gradient(90deg, #38B54A, #8B9E1A)" }} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-poppins font-bold text-base" style={{ color: "#1C1C1C" }}>{mc.title}</h3>
                    <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: mc.status === "Upcoming" ? "#f0faf0" : "#f5f5f5",
                        color: mc.status === "Upcoming" ? "#38B54A" : "#888",
                      }}>
                      {mc.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>{mc.desc}</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#666" }}>
                      <Calendar size={12} style={{ color: "#38B54A" }} /> {mc.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#666" }}>
                      <Clock size={12} style={{ color: "#38B54A" }} /> {mc.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#666" }}>
                      <Users size={12} style={{ color: "#38B54A" }} /> Hosted by {mc.host}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mc.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#f0faf0", color: "#38B54A" }}>{tag}</span>
                    ))}
                  </div>
                  <a href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all"
                    style={{ color: "#38B54A" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#8B9E1A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#38B54A")}>
                    {mc.status === "Upcoming" ? "Register for Session" : "Watch Recording"}
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>Events & Webinars</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              Upcoming Events
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#555" }}>
              Community members get priority access and early registration for all
              UpskillinTech events, workshops, and webinars.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="rounded-2xl border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                style={{ borderColor: "#e8e8e8" }}>
                <div className="h-2" style={{ background: ev.color }} />
                <div className="p-6">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block"
                    style={{ background: `${ev.color}15`, color: ev.color }}>{ev.type}</span>
                  <h3 className="font-poppins font-bold text-base mb-2" style={{ color: "#1C1C1C" }}>{ev.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>{ev.desc}</p>
                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#666" }}>
                      <Calendar size={12} style={{ color: ev.color }} /> {ev.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#666" }}>
                      <MapPin size={12} style={{ color: ev.color }} /> {ev.location}
                    </div>
                  </div>
                  <a href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: ev.color }}>
                    Register Interest <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "rgba(56,181,74,0.2)", color: "#38B54A" }}>Community Voices</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4 text-white">
              What Members Are Saying
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
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

      {/* ── Join CTA ─────────────────────────────────────────────────────── */}
      <section className="section-py"
        style={{ background: "linear-gradient(135deg, #38B54A 0%, #8B9E1A 60%, #E6B800 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="font-poppins font-bold text-2xl lg:text-3xl mb-3">
            Ready to Join the Community?
          </h2>
          <p className="text-base opacity-90 mb-4 max-w-xl mx-auto">
            Connect with professionals across Africa and the diaspora who are
            using AI to transform how they work. Monthly masterclasses, workflow
            sharing, and a supportive peer network — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Monthly Masterclasses", "Workflow Library", "Peer Network", "Events Access"].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                <CheckCircle size={12} /> {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm transition-all"
              style={{ background: "#E6B800", color: "#1C1C1C" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4a800")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E6B800")}>
              Join the Community <ArrowRight size={15} />
            </a>
            <a href="/programs"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm border-2 border-white text-white transition-all"
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#38B54A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}>
              Explore Programmes
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
