/**
 * Case Studies Page — UpskillinTech
 * URL: /resources/case-studies
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Yellow (#E6B800)
 */
import { useState } from "react";
import { Link } from "wouter";
import { Briefcase, Users, Star, ChevronRight, ArrowRight, Clock, TrendingUp, CheckCircle2, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = [
  { id: "all", label: "All Case Studies" },
  { id: "professional", label: "Professionals" },
  { id: "organisation", label: "Organisations" },
  { id: "ministry", label: "Ministry & Education" },
];

const CASE_STUDIES = [
  {
    id: 1,
    category: "professional",
    categoryLabel: "Professional",
    icon: <Briefcase size={20} style={{ color: "#38B54A" }} />,
    name: "Sarah O.",
    role: "Senior Project Manager",
    industry: "Financial Services",
    location: "London, UK",
    headline: "From 60-Hour Weeks to 45 — How One PM Used AI to Reclaim Her Time",
    challenge: "Sarah was drowning in administrative work — meeting notes, status reports, stakeholder emails, and risk logs were consuming more than 15 hours of her week. She had no time for strategic thinking or team development.",
    solution: "After completing the AI-Enabled Professional Program, Sarah built a personal AI productivity system. She now uses AI to transcribe and summarise every meeting, draft status reports from bullet points, and generate first drafts of stakeholder communications.",
    results: [
      "Reduced admin time from 15 hours/week to under 4 hours",
      "Meeting summaries now generated in under 5 minutes",
      "Stakeholder reports drafted in 20 minutes instead of 2 hours",
      "Promoted to Programme Director within 8 months",
    ],
    quote: "I used to feel like I was always behind. Now I'm always ahead. AI didn't replace my thinking — it gave me time to actually think.",
    timeToResult: "6 weeks",
    color: "#38B54A",
  },
  {
    id: 2,
    category: "professional",
    categoryLabel: "Professional",
    icon: <Briefcase size={20} style={{ color: "#38B54A" }} />,
    name: "James A.",
    role: "Independent Consultant",
    industry: "Management Consulting",
    location: "Lagos, Nigeria",
    headline: "How a Consultant Doubled His Client Capacity Without Hiring",
    challenge: "James was capped at 3 clients at a time due to the research, report writing, and proposal work required. He wanted to scale but couldn't afford to hire without first increasing revenue.",
    solution: "James integrated AI into his research workflow, using AI to analyse industry reports, synthesise data, and generate first drafts of client deliverables. He also built an AI-powered proposal template system that reduced proposal creation from 8 hours to 2.",
    results: [
      "Scaled from 3 to 6 active clients simultaneously",
      "Proposal creation time reduced by 75%",
      "Research-to-insight time cut from 2 days to 4 hours",
      "Revenue increased by 85% in 12 months",
    ],
    quote: "I thought AI was for tech companies. Now I can't imagine running my consulting practice without it. It's like having a brilliant junior analyst available 24/7.",
    timeToResult: "8 weeks",
    color: "#38B54A",
  },
  {
    id: 3,
    category: "professional",
    categoryLabel: "Professional",
    icon: <Briefcase size={20} style={{ color: "#38B54A" }} />,
    name: "Dr. Priya M.",
    role: "University Lecturer",
    industry: "Higher Education",
    location: "Birmingham, UK",
    headline: "The Educator Who Used AI to Teach Better and Mark Faster",
    challenge: "Dr. Priya spent 30+ hours per term marking essays and providing feedback — time she wanted to spend on research and curriculum development. She was also struggling to create engaging, updated course materials.",
    solution: "After the AI Foundations program, Dr. Priya built an AI-assisted marking framework that generates structured feedback aligned to her rubric. She also uses AI to update lecture materials, create discussion prompts, and design assessments.",
    results: [
      "Marking time reduced by 60% per assessment cycle",
      "Student feedback quality improved (verified by student surveys)",
      "Course material updates now take 2 hours instead of 2 days",
      "Published 2 research papers in the time previously spent on admin",
    ],
    quote: "My students get better feedback faster, and I have time to actually research again. AI gave me back my academic identity.",
    timeToResult: "4 weeks",
    color: "#38B54A",
  },
  {
    id: 4,
    category: "organisation",
    categoryLabel: "Organisation",
    icon: <Users size={20} style={{ color: "#8B9E1A" }} />,
    name: "TechBridge Solutions",
    role: "50-person IT Services Company",
    industry: "Technology",
    location: "Nairobi, Kenya",
    headline: "How a 50-Person Tech Company Built an AI-First Culture in 90 Days",
    challenge: "TechBridge's leadership recognised that AI was transforming their industry but had no structured approach to adoption. Teams were experimenting individually with inconsistent results, and there was no shared framework or governance.",
    solution: "UpskillinTech delivered a company-wide AI integration programme over 12 weeks. This included AI literacy training for all staff, workflow design workshops for each department, and an AI governance framework for leadership.",
    results: [
      "85% of staff using AI tools consistently within 90 days",
      "Customer proposal turnaround reduced from 5 days to 1 day",
      "Internal reporting time reduced by 40% across departments",
      "Launched 2 new AI-enhanced service offerings within 6 months",
    ],
    quote: "We went from scattered AI experiments to a coherent AI strategy. UpskillinTech didn't just train our team — they helped us think differently about how we work.",
    timeToResult: "90 days",
    color: "#8B9E1A",
  },
  {
    id: 5,
    category: "organisation",
    categoryLabel: "Organisation",
    icon: <Users size={20} style={{ color: "#8B9E1A" }} />,
    name: "Meridian HR Group",
    role: "HR Consultancy",
    industry: "Human Resources",
    location: "Manchester, UK",
    headline: "How an HR Firm Used AI to Reduce Hiring Time by Half",
    challenge: "Meridian's recruiters were spending 70% of their time on CV screening, interview scheduling, and writing job descriptions — leaving little time for relationship-building and strategic advisory work.",
    solution: "UpskillinTech worked with Meridian to design AI-powered recruitment workflows. This included AI-assisted CV screening prompts, automated interview question generation, and AI-drafted job descriptions that reduced writing time from 2 hours to 20 minutes.",
    results: [
      "Time-to-hire reduced from 28 days to 14 days on average",
      "CV screening time reduced by 65%",
      "Job description writing time reduced by 85%",
      "Client satisfaction scores increased by 22%",
    ],
    quote: "Our consultants now spend their time on what actually matters — understanding clients and candidates. The AI handles the paperwork.",
    timeToResult: "6 weeks",
    color: "#8B9E1A",
  },
  {
    id: 6,
    category: "ministry",
    categoryLabel: "Ministry & Education",
    icon: <Star size={20} style={{ color: "#E6B800" }} />,
    name: "Pastor David K.",
    role: "Senior Pastor",
    industry: "Faith Community",
    location: "Houston, TX, USA",
    headline: "How a Busy Pastor Used AI to Preach Better and Serve More",
    challenge: "Pastor David was spending 15–20 hours per week on sermon preparation, newsletter writing, and administrative communications. He felt stretched thin and wanted to spend more time with his congregation.",
    solution: "Through the AI Leadership program, Pastor David learned to use AI for sermon research, outline generation, and communication drafting. He built a weekly workflow that reduced sermon prep from 15 hours to 6, while improving the depth and relevance of his messages.",
    results: [
      "Sermon preparation time reduced from 15 to 6 hours per week",
      "Weekly newsletter now produced in 45 minutes instead of 3 hours",
      "Pastoral visit time increased by 40% due to admin savings",
      "Congregation engagement scores improved significantly",
    ],
    quote: "I was sceptical at first — I thought AI would make my sermons feel less personal. The opposite happened. I have more time to pray, study, and listen to my congregation.",
    timeToResult: "3 weeks",
    color: "#E6B800",
  },
  {
    id: 7,
    category: "ministry",
    categoryLabel: "Ministry & Education",
    icon: <Star size={20} style={{ color: "#E6B800" }} />,
    name: "Bright Futures Academy",
    role: "Independent School",
    industry: "K-12 Education",
    location: "Accra, Ghana",
    headline: "How a School Used AI to Improve Student Outcomes and Teacher Wellbeing",
    challenge: "Teachers at Bright Futures were overwhelmed with lesson planning, marking, and parent communications. Teacher burnout was rising, and the school needed a sustainable solution that didn't require hiring more staff.",
    solution: "UpskillinTech delivered an AI integration workshop for all teaching staff. Teachers learned to use AI for lesson plan generation, differentiated learning materials, parent communication templates, and formative assessment design.",
    results: [
      "Lesson planning time reduced by 50% across all departments",
      "Teacher-reported stress levels decreased significantly",
      "Parent communication response time improved by 70%",
      "Student test scores improved by an average of 12% in one term",
    ],
    quote: "Our teachers are energised again. They're spending time teaching and connecting with students — not drowning in paperwork. AI changed the culture of our school.",
    timeToResult: "4 weeks",
    color: "#E6B800",
  },
];

const METRICS = [
  { value: "10+", label: "Hours Saved Per Week (avg.)" },
  { value: "75%", label: "Reduction in Admin Time" },
  { value: "6 wks", label: "Average Time to Results" },
  { value: "100%", label: "Would Recommend" },
];

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = activeCategory === "all" ? CASE_STUDIES : CASE_STUDIES.filter(cs => cs.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(56,181,74,0.10)", color: "#1C1C1C", border: "1px solid rgba(255,255,255,0.35)" }}>Case Studies</span>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>
              Real People. Real Results. Real AI Integration.
            </h1>
            <p className="text-lg mb-6" style={{ color: "#555" }}>
              Discover how professionals, organisations, and ministry leaders have transformed their work using AI — with specific results, timelines, and strategies.
            </p>
          </div>
        </div>
        {/* Metrics bar */}
        <div style={{ background: "linear-gradient(90deg, #8B9E1A 0%, #E6B800 100%)" }}>
          <div className="container py-4">
            <div className="flex flex-wrap gap-8 justify-center text-center">
              {METRICS.map(m => (
                <div key={m.label}>
                  <div className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{m.value}</div>
                  <div className="text-xs font-medium" style={{ color: "rgba(0,0,0,0.65)" }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Case Studies */}
      <section className="section-py" style={{ background: "#F7F8FA" }}>
        <div className="container">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="text-sm font-semibold px-5 py-2 rounded-full transition-all"
                style={{
                  background: activeCategory === cat.id ? "#38B54A" : "#fff",
                  color: activeCategory === cat.id ? "#fff" : "#4B5563",
                  border: activeCategory === cat.id ? "none" : "1px solid #E5E7EB",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {filtered.map((cs) => (
              <div key={cs.id} className="rounded-2xl overflow-hidden bg-white" style={{ border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div className="h-1.5" style={{ background: cs.color }} />
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Left: Identity */}
                    <div className="lg:w-56 shrink-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="rounded-xl p-2" style={{ background: `${cs.color}15` }}>{cs.icon}</div>
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: `${cs.color}12`, color: cs.color }}>{cs.categoryLabel}</span>
                      </div>
                      <div className="font-bold text-lg" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{cs.name}</div>
                      <div className="text-sm" style={{ color: "#6B7280" }}>{cs.role}</div>
                      <div className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{cs.industry} · {cs.location}</div>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: cs.color }}>
                        <Clock size={12} /> Results in {cs.timeToResult}
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 leading-snug" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{cs.headline}</h3>

                      {expanded === cs.id ? (
                        <div className="space-y-5">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#9CA3AF" }}>The Challenge</p>
                            <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{cs.challenge}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#9CA3AF" }}>The Solution</p>
                            <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{cs.solution}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#9CA3AF" }}>Results</p>
                            <ul className="space-y-1.5">
                              {cs.results.map(r => (
                                <li key={r} className="flex items-start gap-2 text-sm" style={{ color: "#4B5563" }}>
                                  <TrendingUp size={14} className="shrink-0 mt-0.5" style={{ color: cs.color }} />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <blockquote className="rounded-xl p-4 border-l-4" style={{ background: `${cs.color}08`, borderColor: cs.color }}>
                            <Quote size={16} className="mb-2" style={{ color: cs.color }} />
                            <p className="text-sm italic leading-relaxed" style={{ color: "#4B5563" }}>"{cs.quote}"</p>
                            <p className="text-xs font-semibold mt-2" style={{ color: cs.color }}>— {cs.name}, {cs.role}</p>
                          </blockquote>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{cs.challenge}</p>
                      )}

                      <button
                        onClick={() => setExpanded(expanded === cs.id ? null : cs.id)}
                        className="mt-4 text-sm font-semibold flex items-center gap-1"
                        style={{ color: cs.color }}
                      >
                        {expanded === cs.id ? "Show Less" : "Read Full Case Study"} <ChevronRight size={14} />
                      </button>
                    </div>

                    {/* Results summary (collapsed state) */}
                    {expanded !== cs.id && (
                      <div className="lg:w-48 shrink-0">
                        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9CA3AF" }}>Key Results</p>
                        <ul className="space-y-2">
                          {cs.results.slice(0, 3).map(r => (
                            <li key={r} className="flex items-start gap-2 text-xs" style={{ color: "#4B5563" }}>
                              <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: cs.color }} />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#fff" }}>
            Your Success Story Starts Here
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.70)" }}>
            Join the professionals and organisations already transforming how they work with AI. The AI-Enabled Professional Program gives you the skills, frameworks, and support to get real results.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#programs" className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-lg" style={{ background: "#E6B800", color: "#1C1C1C", fontFamily: "'Poppins', sans-serif" }}>
              <ArrowRight size={18} /> Join the Program
            </Link>
            <Link href="/resources" className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-lg border-2" style={{ borderColor: "rgba(255,255,255,0.30)", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
              ← Back to Resources
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
