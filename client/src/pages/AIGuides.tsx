/**
 * AI Guides Page — UpskillinTech
 * URL: /resources/ai-guides
 * Design: Green (#2ecc71) + Golden Green (#2ecc71) + Yellow (#2ecc71)
 */
import { useState } from "react";
import { Link } from "wouter";
import { Download, BookOpen, ChevronRight, CheckCircle2, ArrowRight, Zap, FileText, Lightbulb, Target, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const GUIDES = [
  {
    id: 1,
    icon: <Zap size={28} style={{ color: "#2ecc71" }} />,
    badge: "Most Downloaded",
    badgeColor: "#2ecc71",
    title: "AI Productivity Guide",
    subtitle: "Save 10+ Hours Every Week Using AI",
    desc: "A step-by-step framework for integrating AI into your daily work. Covers email management, meeting summaries, research acceleration, and decision support. Designed for professionals who want results — not just theory.",
    pages: "24 pages",
    level: "Beginner–Intermediate",
    includes: [
      "The 5-step AI productivity framework",
      "Time audit template for identifying AI opportunities",
      "10 ready-to-use workflow templates",
      "Recommended AI tools by task type",
      "Common mistakes and how to avoid them",
    ],
    format: "PDF + workbook template",
    bg: "#f4f4f4",
    border: "#2ecc71",
  },
  {
    id: 2,
    icon: <FileText size={28} style={{ color: "#2ecc71" }} />,
    badge: "Free Download",
    badgeColor: "#2ecc71",
    title: "50 AI Prompts Library",
    subtitle: "Curated Prompts for Real Professional Use",
    desc: "50 battle-tested prompts organised by use case — research, writing, strategy, decision-making, communication, and leadership. Each prompt includes context, instructions, and a real example output.",
    pages: "32 pages",
    level: "All Levels",
    includes: [
      "10 prompts for research and analysis",
      "10 prompts for professional writing",
      "10 prompts for strategic planning",
      "10 prompts for decision-making support",
      "10 prompts for leadership and communication",
    ],
    format: "PDF + Google Doc",
    bg: "#f4f4f4",
    border: "#2ecc71",
  },
  {
    id: 3,
    icon: <Target size={28} style={{ color: "#2ecc71" }} />,
    badge: "New",
    badgeColor: "#2ecc71",
    title: "AI Tools Guide 2025",
    subtitle: "The Right Tools for the Right Tasks",
    desc: "A curated overview of the most useful AI tools for professionals in 2025 — covering writing assistants, research tools, meeting tools, image generation, and automation platforms. Includes honest reviews and use-case recommendations.",
    pages: "18 pages",
    level: "Beginner",
    includes: [
      "Top 5 AI writing assistants compared",
      "Best AI tools for research and analysis",
      "AI meeting and productivity tools",
      "Free vs paid: what is worth it",
      "Tool selection framework by role",
    ],
    format: "PDF",
    bg: "#f4f4f4",
    border: "#2ecc71",
  },
  {
    id: 4,
    icon: <Lightbulb size={28} style={{ color: "#2ecc71" }} />,
    badge: "Advanced",
    badgeColor: "#2ecc71",
    title: "AI Workflow Playbook",
    subtitle: "Build Systems That Work While You Focus",
    desc: "Advanced workflows for professionals who want to go beyond individual tasks and build AI-powered systems. Covers project management, content creation pipelines, research workflows, and leadership communication frameworks.",
    pages: "40 pages",
    level: "Intermediate–Advanced",
    includes: [
      "6 complete AI workflow blueprints",
      "Step-by-step setup instructions",
      "Integration with common workplace tools",
      "Workflow audit and optimisation checklist",
      "Team rollout guide for managers",
    ],
    format: "PDF + workbook templates",
    bg: "#f4f4f4",
    border: "#2ecc71",
  },
];

const PROMPT_CATEGORIES = [
  {
    category: "Research & Analysis",
    color: "#2ecc71",
    prompts: [
      { title: "Deep Research Summary", prompt: "You are a research assistant. Summarise the key findings, main arguments, and practical implications of the following topic for a professional audience: [TOPIC]. Structure your response with: 1) Overview, 2) Key Findings, 3) Practical Implications, 4) Open Questions." },
      { title: "Competitive Analysis", prompt: "Analyse the competitive landscape for [COMPANY/PRODUCT] in [INDUSTRY]. Identify: 1) Top 5 competitors, 2) Their key strengths and weaknesses, 3) Market positioning, 4) Gaps and opportunities. Present as a structured analysis." },
      { title: "Data Interpretation", prompt: "I have the following data: [PASTE DATA]. Interpret this data for a non-technical audience. Identify: 1) The most important trends, 2) Surprising findings, 3) What this means for [CONTEXT], 4) Recommended next steps." },
    ],
  },
  {
    category: "Professional Writing",
    color: "#2ecc71",
    prompts: [
      { title: "Executive Summary", prompt: "Write a concise executive summary for the following report/document: [PASTE CONTENT]. The summary should be 200–300 words, highlight the key findings and recommendations, and be written for a senior leadership audience." },
      { title: "Email Drafting", prompt: "Write a professional email to [RECIPIENT ROLE] about [TOPIC]. The tone should be [formal/friendly/assertive]. Key points to include: [LIST POINTS]. End with a clear call to action: [CTA]. Keep it under 200 words." },
      { title: "Proposal Writing", prompt: "Draft a professional proposal for [PROJECT/SERVICE]. Include: 1) Problem statement, 2) Proposed solution, 3) Key benefits, 4) Timeline, 5) Investment/cost overview. Write for [TARGET AUDIENCE] and keep it persuasive but concise." },
    ],
  },
  {
    category: "Strategy & Planning",
    color: "#2ecc71",
    prompts: [
      { title: "Strategic Planning", prompt: "Help me develop a strategic plan for [GOAL/OBJECTIVE] over the next [TIMEFRAME]. Consider: 1) Current situation analysis, 2) Key opportunities and threats, 3) Strategic priorities, 4) Action steps with owners and timelines, 5) Success metrics." },
      { title: "Problem-Solving Framework", prompt: "I am facing the following challenge: [DESCRIBE PROBLEM]. Help me think through this systematically using: 1) Root cause analysis, 2) Possible solutions (at least 3), 3) Pros and cons of each solution, 4) Recommended approach with rationale." },
      { title: "Decision Support", prompt: "I need to make a decision about [DECISION]. The key options are: [LIST OPTIONS]. Help me evaluate each option against these criteria: [LIST CRITERIA]. Present a structured comparison and recommend the best option with reasoning." },
    ],
  },
  {
    category: "Leadership & Communication",
    color: "#2ecc71",
    prompts: [
      { title: "Team Communication", prompt: "Draft a clear, motivating message to my team about [TOPIC/CHANGE]. The message should: 1) Explain the context, 2) Address likely concerns, 3) Clarify what is expected, 4) End on an encouraging note. Tone: [professional/warm/direct]." },
      { title: "Feedback Framework", prompt: "Help me give constructive feedback to [ROLE] about [SITUATION]. Structure the feedback using the SBI model (Situation, Behaviour, Impact) and include: 1) What went well, 2) What needs to improve, 3) Specific suggestions, 4) Support offered." },
      { title: "Presentation Outline", prompt: "Create a compelling presentation outline for [TOPIC] to be delivered to [AUDIENCE] in [TIME LIMIT]. Include: 1) Opening hook, 2) Key sections with talking points, 3) Data/evidence suggestions, 4) Call to action, 5) Q&A preparation tips." },
    ],
  },
];

export default function AIGuides() {
  const [email, setEmail] = useState("");
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);

  const handleDownload = (e: React.FormEvent, guideTitle: string) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Please enter your email address."); return; }
    toast.success(`"${guideTitle}" is on its way!`, { description: "Check your inbox in the next few minutes." });
    setEmail("");
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      toast.success("Prompt copied to clipboard!", { description: "Paste it directly into your preferred AI assistant." });
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ background: "linear-gradient(135deg, #5EC96A 0%, #7BBF2A 50%, #A8C038 100%)" }}>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.20)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}>AI Guides</span>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>
              Practical AI Guides for Professionals Who Want Results
            </h1>
            <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.90)" }}>
              Download free guides, prompt libraries, and workflow playbooks designed to help you integrate AI into real work — not just experiment with it.
            </p>
            <div className="flex items-center gap-4 text-sm" style={{ color: "rgba(255,255,255,0.80)" }}>
              <span className="flex items-center gap-1"><BookOpen size={15} /> 4 Guides</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Download size={15} /> All Free</span>

            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="section-py" style={{ background: "#151B23" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Free Downloads</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6" }}>Download Your Free AI Guides</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#9CA3AF" }}>Each guide is packed with practical frameworks, templates, and examples you can use immediately.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {GUIDES.map((guide) => (
              <div key={guide.id} className="rounded-2xl p-8 flex flex-col" style={{ background: guide.bg, border: `2px solid ${guide.border}25`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="rounded-xl p-3" style={{ background: "#151B23", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>{guide.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: `${guide.badgeColor}18`, color: guide.badgeColor }}>{guide.badge}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#111111" }}>{guide.title}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: "#111111" }}>{guide.subtitle}</p>
                <p className="leading-relaxed mb-5" style={{ fontSize: "1.125rem", color: "#111111" }}>{guide.desc}</p>
                <div className="flex gap-4 text-xs mb-5" style={{ color: "#111111" }}>
                  <span className="flex items-center gap-1"><FileText size={12} /> {guide.pages}</span>
                  <span className="flex items-center gap-1"><Target size={12} /> {guide.level}</span>
                  <span className="flex items-center gap-1"><Download size={12} /> {guide.format}</span>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#111111" }}>What is Inside</p>
                  <ul className="space-y-1.5">
                    {guide.includes.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#111111" }}>
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: guide.border }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <form onSubmit={(e) => handleDownload(e, guide.title)} className="flex gap-2 mt-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{ border: `1.5px solid ${guide.border}40`, background: "#151B23" }}
                  />
                  <button type="submit" className="flex items-center gap-2 font-semibold px-4 py-2.5 rounded-lg text-sm whitespace-nowrap" style={{ background: guide.border, color: "#fff", fontFamily: "'Sora', sans-serif" }}>
                    <Download size={15} /> Download
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Library */}
      <section className="section-py" style={{ background: "#151B23" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Prompt Library</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6" }}>50 AI Prompts — Browse & Copy</h2>
            <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#9CA3AF" }}>Click any prompt to expand it, then copy and paste directly into your AI tool of choice.</p>
          </div>
          <div className="space-y-10">
            {PROMPT_CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-8 rounded-full" style={{ background: cat.color }} />
                  <h3 className="text-lg font-bold" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6" }}>{cat.category}</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {cat.prompts.map((p) => (
                    <div key={p.title} className="rounded-xl overflow-hidden" style={{ background: "#151B23", border: "1px solid #1F2937", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div className="h-1" style={{ background: cat.color }} />
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6" }}>{p.title}</h4>
                          <button
                            onClick={() => setExpandedPrompt(expandedPrompt === p.title ? null : p.title)}
                            className="text-xs font-semibold px-2 py-1 rounded-full ml-2 shrink-0"
                            style={{ background: `${cat.color}15`, color: cat.color }}
                          >
                            {expandedPrompt === p.title ? "Hide" : "View"}
                          </button>
                        </div>
                        {expandedPrompt === p.title && (
                          <div className="mb-3">
                            <p className="text-xs leading-relaxed p-3 rounded-lg" style={{ background: "#151B23", color: "#D1D5DB", fontFamily: "monospace" }}>{p.prompt}</p>
                          </div>
                        )}
                        <button
                          onClick={() => copyPrompt(p.prompt)}
                          className="w-full text-sm font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                          style={{ background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}30` }}
                        >
                          Copy Prompt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-sm mb-4" style={{ color: "#9CA3AF" }}>Want all 50 prompts in one place?</p>
            <form onSubmit={(e) => handleDownload(e, "50 AI Prompts Library")} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 rounded-lg px-4 py-3 text-sm outline-none" style={{ border: "2px solid #2ecc71" }} />
              <button type="submit" className="font-bold px-6 py-3 rounded-lg whitespace-nowrap flex items-center gap-2" style={{ background: "#2ecc71", color: "#fff", fontFamily: "'Sora', sans-serif" }}>
                <Download size={16} /> Download All 50
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}>Ready to Go Deeper?</h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>Guides are a great start — but the AI-Enabled Professional Program takes you from reading about AI to actually using it in your work every day.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#programs" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg" style={{ background: "#2ecc71", color: "#F3F4F6", fontFamily: "'Sora', sans-serif" }}>
              <ArrowRight size={18} /> Explore Programs
            </Link>
            <Link href="/resources" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg border-2" style={{ borderColor: "rgba(255,255,255,0.30)", color: "#fff", fontFamily: "'Sora', sans-serif" }}>
              ← Back to Resources
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
