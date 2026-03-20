/**
 * AI Workflow Library Page — UpskillinTech
 * URL: /resources/workflows
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Yellow (#E6B800)
 */
import { useState } from "react";
import { Link } from "wouter";
import { Zap, ChevronRight, ArrowRight, Clock, Users, Download, CheckCircle2, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "all", label: "All Workflows" },
  { id: "productivity", label: "Productivity" },
  { id: "meetings", label: "Meetings" },
  { id: "research", label: "Research" },
  { id: "content", label: "Content Creation" },
  { id: "leadership", label: "Leadership" },
];

const WORKFLOWS = [
  {
    id: 1,
    category: "meetings",
    categoryLabel: "Meetings",
    title: "Meeting-to-Action Workflow",
    subtitle: "Turn any meeting into a structured action plan in under 5 minutes",
    timeToComplete: "5 minutes",
    difficulty: "Beginner",
    toolsNeeded: ["ChatGPT or Claude", "Otter.ai or Fireflies (optional)"],
    color: "#38B54A",
    steps: [
      { label: "Record or Note", desc: "Record the meeting audio or take rough notes during the session. Use Otter.ai for automatic transcription." },
      { label: "Paste Transcript", desc: "Paste the transcript or notes into ChatGPT or Claude with the prompt: 'Summarise this meeting. Extract: 1) Key decisions, 2) Action items with owners, 3) Open questions.'" },
      { label: "AI Summary", desc: "AI generates a structured summary with decisions, action items, owners, and deadlines — ready to share with the team." },
      { label: "Review & Send", desc: "Review the summary in under 2 minutes, make any corrections, and send to all attendees via email or Slack." },
    ],
    prompt: "Summarise this meeting transcript. Extract and organise: 1) Key decisions made, 2) Action items with owners and deadlines, 3) Open questions that need follow-up, 4) Next meeting agenda suggestions. Format as a professional meeting summary.\n\n[PASTE TRANSCRIPT HERE]",
    outcomes: ["Meeting summaries in under 5 minutes", "Zero missed action items", "Clear accountability for every task", "Professional record of every meeting"],
    usedBy: "Project Managers, Team Leads, Executives",
  },
  {
    id: 2,
    category: "research",
    categoryLabel: "Research",
    title: "Research-to-Report Workflow",
    subtitle: "Go from a research question to a polished report in hours, not days",
    timeToComplete: "2–4 hours",
    difficulty: "Intermediate",
    toolsNeeded: ["ChatGPT or Claude", "Perplexity AI", "Google Docs"],
    color: "#8B9E1A",
    steps: [
      { label: "Define Question", desc: "Write a clear research question. Be specific: 'What are the top 5 AI productivity tools for HR professionals in 2025?' is better than 'AI tools.'" },
      { label: "AI Research", desc: "Use Perplexity AI or ChatGPT to gather initial research. Prompt: 'Research [TOPIC] and provide: key findings, main sources, statistics, and expert opinions.'" },
      { label: "Synthesise Findings", desc: "Paste all research into Claude and prompt: 'Synthesise these findings into a structured research brief with: executive summary, key themes, evidence, and implications.'" },
      { label: "Draft Report", desc: "Use the synthesised brief to generate a full report draft. Prompt: 'Write a professional [X-page] report on [TOPIC] based on this research brief. Include an introduction, findings, analysis, and recommendations.'" },
      { label: "Review & Refine", desc: "Review the draft, add your own analysis and context, verify key facts, and refine the language to match your voice and audience." },
    ],
    prompt: "You are a professional research analyst. Based on the following research notes, write a structured research report for [TARGET AUDIENCE]. Include: 1) Executive Summary (200 words), 2) Key Findings (with evidence), 3) Analysis and Implications, 4) Recommendations, 5) Conclusion. Maintain a professional, evidence-based tone.\n\n[PASTE RESEARCH NOTES HERE]",
    outcomes: ["Research reports in hours instead of days", "Comprehensive coverage of key themes", "Professional structure and formatting", "More time for analysis and insight"],
    usedBy: "Consultants, Academics, Analysts, Policy Professionals",
  },
  {
    id: 3,
    category: "content",
    categoryLabel: "Content Creation",
    title: "Content Creation Pipeline",
    subtitle: "Produce high-quality content consistently without burning out",
    timeToComplete: "1–2 hours per piece",
    difficulty: "Beginner",
    toolsNeeded: ["ChatGPT or Claude", "Grammarly (optional)", "Canva (optional)"],
    color: "#E6B800",
    steps: [
      { label: "Idea & Brief", desc: "Define your content goal: Who is it for? What should they feel, know, or do after reading? Write a 3-sentence brief." },
      { label: "AI Outline", desc: "Prompt AI: 'Create a detailed outline for a [blog post/newsletter/LinkedIn article] about [TOPIC] for [AUDIENCE]. Include: headline, 5 key sections with subpoints, and a CTA.'" },
      { label: "AI Draft", desc: "Use the outline to generate a first draft. Prompt: 'Write a [word count] [content type] based on this outline. Tone: [professional/conversational/inspiring]. Include specific examples and actionable advice.'" },
      { label: "Edit & Personalise", desc: "Add your personal voice, real examples, and specific insights. Remove generic phrases. This is where your expertise makes the content unique." },
      { label: "Final Polish", desc: "Run through Grammarly, check for clarity and flow, add a compelling headline and CTA, then publish or schedule." },
    ],
    prompt: "Write a [TYPE] about [TOPIC] for [AUDIENCE]. The tone should be [TONE]. The key message is: [KEY MESSAGE]. Include: a compelling opening, 3–4 main points with specific examples, actionable takeaways, and a clear call to action. Length: approximately [WORD COUNT] words.",
    outcomes: ["Consistent content output without burnout", "First drafts in 30 minutes instead of 3 hours", "Higher quality through structured editing", "More time for strategy and audience engagement"],
    usedBy: "Content Creators, Marketers, Communicators, Thought Leaders",
  },
  {
    id: 4,
    category: "productivity",
    categoryLabel: "Productivity",
    title: "Email Management Workflow",
    subtitle: "Clear your inbox and respond to every email professionally in less time",
    timeToComplete: "30 minutes/day",
    difficulty: "Beginner",
    toolsNeeded: ["ChatGPT or Claude", "Gmail or Outlook"],
    color: "#38B54A",
    steps: [
      { label: "Batch Emails", desc: "Set two dedicated email times per day (e.g., 9am and 4pm). Don't check email outside these windows. This alone saves 1–2 hours daily." },
      { label: "Categorise", desc: "Sort emails into: Respond Now, Delegate, File, Delete. Only 'Respond Now' emails need your attention in this session." },
      { label: "AI Draft", desc: "For complex emails, paste the email into ChatGPT with: 'Draft a professional response to this email. Tone: [professional/warm]. Key points to include: [LIST]. Keep it under 150 words.'" },
      { label: "Personalise & Send", desc: "Review the draft, add any personal context, adjust the tone if needed, and send. Most emails take under 2 minutes with this approach." },
    ],
    prompt: "Draft a professional email response to the following email. Tone: [TONE]. Key points to address: [LIST KEY POINTS]. Keep it concise (under 150 words), clear, and end with a specific next step or call to action.\n\n[PASTE ORIGINAL EMAIL HERE]",
    outcomes: ["Inbox zero achievable daily", "Professional responses in under 2 minutes", "Reduced email-related stress", "More focused work time"],
    usedBy: "All Professionals",
  },
  {
    id: 5,
    category: "leadership",
    categoryLabel: "Leadership",
    title: "Strategic Decision Workflow",
    subtitle: "Make better decisions faster with AI-assisted analysis",
    timeToComplete: "30–60 minutes",
    difficulty: "Intermediate",
    toolsNeeded: ["ChatGPT or Claude"],
    color: "#8B9E1A",
    steps: [
      { label: "Define Decision", desc: "Write a clear decision statement: 'Should we [ACTION] given [CONTEXT]?' Include the key constraints, stakeholders, and timeline." },
      { label: "AI Analysis", desc: "Prompt: 'I need to make the following decision: [DECISION]. Provide: 1) Key factors to consider, 2) Potential risks and benefits of each option, 3) Questions I should be asking, 4) Frameworks that apply.'" },
      { label: "Options Mapping", desc: "Use AI to map out all viable options. Prompt: 'Generate 5 possible approaches to [DECISION]. For each, outline the key steps, likely outcomes, and main risks.'" },
      { label: "Evaluation Matrix", desc: "Prompt: 'Create a decision matrix comparing these options against these criteria: [LIST CRITERIA]. Score each option 1–5 on each criterion and recommend the best option with reasoning.'" },
      { label: "Decision & Plan", desc: "Make your decision based on the analysis, then use AI to draft the implementation plan and communication to stakeholders." },
    ],
    prompt: "I need to make a strategic decision: [DECISION STATEMENT]. Context: [CONTEXT]. Key constraints: [CONSTRAINTS]. Options I'm considering: [OPTIONS]. Please: 1) Analyse each option against the criteria of [CRITERIA], 2) Identify risks I may have missed, 3) Recommend the best option with clear reasoning, 4) Suggest the first 3 implementation steps.",
    outcomes: ["More confident, evidence-based decisions", "Faster analysis of complex situations", "Reduced decision-making bias", "Clear rationale for stakeholder communication"],
    usedBy: "Executives, Managers, Team Leads, Consultants",
  },
  {
    id: 6,
    category: "research",
    categoryLabel: "Research",
    title: "Competitive Intelligence Workflow",
    subtitle: "Stay ahead of your market with regular AI-powered competitor analysis",
    timeToComplete: "1–2 hours/month",
    difficulty: "Intermediate",
    toolsNeeded: ["Perplexity AI", "ChatGPT or Claude"],
    color: "#E6B800",
    steps: [
      { label: "Define Scope", desc: "List your top 5 competitors and the specific areas to monitor: pricing, product updates, marketing, hiring, partnerships." },
      { label: "Gather Intelligence", desc: "Use Perplexity AI: 'What are the latest developments from [COMPETITOR] in the past 3 months? Focus on: product updates, pricing changes, marketing campaigns, and strategic moves.'" },
      { label: "Synthesise Insights", desc: "Paste all competitor data into Claude: 'Analyse this competitive intelligence. Identify: 1) Key trends across competitors, 2) Threats to our position, 3) Opportunities we could exploit.'" },
      { label: "Strategic Implications", desc: "Prompt: 'Based on this competitive analysis, what are the 3 most important strategic implications for [YOUR COMPANY]? What should we do in the next 30 days?'" },
      { label: "Brief & Share", desc: "Generate a concise competitive intelligence brief for leadership. Prompt: 'Write a 1-page competitive intelligence brief summarising these findings for a senior leadership audience.'" },
    ],
    prompt: "Conduct a competitive analysis of [COMPETITOR] for [YOUR COMPANY] in [INDUSTRY]. Analyse: 1) Their key strengths and recent wins, 2) Weaknesses and vulnerabilities, 3) Recent strategic moves, 4) How they position against us, 5) What we should do in response. Be specific and evidence-based.",
    outcomes: ["Monthly competitive intelligence in 2 hours", "Early warning on competitor moves", "Evidence-based strategic responses", "Leadership briefings in under 1 hour"],
    usedBy: "Strategy Teams, Marketing Leaders, Business Owners",
  },
];

export default function WorkflowsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedWorkflow, setExpandedWorkflow] = useState<number | null>(null);

  const filtered = activeCategory === "all" ? WORKFLOWS : WORKFLOWS.filter(w => w.category === activeCategory);

  const copyPrompt = (prompt: string, title: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      toast.success(`Prompt copied!`, { description: `Paste the "${title}" prompt into your AI tool.` });
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(56,181,74,0.10)", color: "#1C1C1C", border: "1px solid rgba(255,255,255,0.35)" }}>Workflow Library</span>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>
              AI Workflows That Work in the Real World
            </h1>
            <p className="text-lg mb-6" style={{ color: "#555" }}>
              Step-by-step AI workflows used by UpskillinTech graduates across meetings, research, content creation, and leadership. Each workflow includes the exact prompts to use.
            </p>
            <div className="flex items-center gap-4 text-sm" style={{ color: "#555" }}>
              <span className="flex items-center gap-1"><Zap size={15} /> 6 Workflows</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Copy size={15} /> Copy-Paste Prompts</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Users size={15} /> Used by 1,000+ Professionals</span>
            </div>
          </div>
        </div>
        <div style={{ background: "linear-gradient(90deg, #8B9E1A 0%, #E6B800 100%)" }}>
          <div className="container py-4">
            <div className="flex flex-wrap gap-8 justify-center text-center">
              {[{ v: "6", l: "Workflow Templates" }, { v: "24+", l: "Copy-Paste Prompts" }, { v: "5 min", l: "Fastest Workflow" }, { v: "Free", l: "All Workflows" }].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{s.v}</div>
                  <div className="text-xs font-medium" style={{ color: "rgba(0,0,0,0.65)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Library */}
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
            {filtered.map((wf) => (
              <div key={wf.id} className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div className="h-1.5" style={{ background: wf.color }} />
                <div className="p-8">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: `${wf.color}12`, color: wf.color }}>{wf.categoryLabel}</span>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#F7F8FA", color: "#6B7280", border: "1px solid #E5E7EB" }}>{wf.difficulty}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{wf.title}</h3>
                      <p className="text-sm" style={{ color: "#6B7280" }}>{wf.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs shrink-0" style={{ color: "#9CA3AF" }}>
                      <span className="flex items-center gap-1"><Clock size={12} /> {wf.timeToComplete}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {wf.usedBy}</span>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {wf.steps.map((step, si) => (
                        <div key={step.label} className="flex items-center gap-2 shrink-0">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "#021301" }}>
                              {si + 1}
                            </div>
                            <span className="text-xs font-semibold mt-1 text-center max-w-[80px]" style={{ color: "#1C1C1C", fontFamily: "'Poppins', sans-serif" }}>{step.label}</span>
                          </div>
                          {si < wf.steps.length - 1 && (
                            <span className="text-lg font-bold mb-4" style={{ color: "#E6B800" }}>→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded content */}
                  {expandedWorkflow === wf.id && (
                    <div className="space-y-6 border-t pt-6" style={{ borderColor: "#F3F4F6" }}>
                      {/* Step details */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#9CA3AF" }}>Step-by-Step Instructions</p>
                        <div className="space-y-3">
                          {wf.steps.map((step, si) => (
                            <div key={step.label} className="flex gap-4 p-4 rounded-xl" style={{ background: "#F7F8FA" }}>
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: wf.color }}>
                                {si + 1}
                              </div>
                              <div>
                                <p className="font-semibold text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#1C1C1C" }}>{step.label}</p>
                                <p className="text-sm" style={{ color: "#4B5563" }}>{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prompt */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Copy-Paste Prompt</p>
                          <button onClick={() => copyPrompt(wf.prompt, wf.title)} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: `${wf.color}12`, color: wf.color }}>
                            <Copy size={12} /> Copy Prompt
                          </button>
                        </div>
                        <div className="p-4 rounded-xl text-xs leading-relaxed font-mono" style={{ background: "#1C1C1C", color: "#A3E635", border: "1px solid #333" }}>
                          {wf.prompt}
                        </div>
                      </div>

                      {/* Tools + Outcomes */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9CA3AF" }}>Tools Needed</p>
                          <ul className="space-y-1.5">
                            {wf.toolsNeeded.map(t => (
                              <li key={t} className="flex items-center gap-2 text-sm" style={{ color: "#4B5563" }}>
                                <CheckCircle2 size={13} style={{ color: wf.color }} /> {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9CA3AF" }}>Expected Outcomes</p>
                          <ul className="space-y-1.5">
                            {wf.outcomes.map(o => (
                              <li key={o} className="flex items-start gap-2 text-sm" style={{ color: "#4B5563" }}>
                                <Zap size={13} className="shrink-0 mt-0.5" style={{ color: wf.color }} /> {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t" style={{ borderColor: "#F3F4F6" }}>
                    <button
                      onClick={() => setExpandedWorkflow(expandedWorkflow === wf.id ? null : wf.id)}
                      className="text-sm font-semibold flex items-center gap-1"
                      style={{ color: wf.color }}
                    >
                      {expandedWorkflow === wf.id ? "Show Less" : "View Full Workflow + Prompt"} <ChevronRight size={14} />
                    </button>
                    {expandedWorkflow === wf.id && (
                      <button onClick={() => copyPrompt(wf.prompt, wf.title)} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "#6B7280" }}>
                        <Copy size={13} /> Copy Prompt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: "#fff" }}>
            Get the Complete AI Workflow Playbook
          </h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>
            Download all 6 workflows plus 10 bonus workflows in a single PDF — with step-by-step instructions, prompts, and Notion templates.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Playbook on its way!", { description: "Check your inbox for the AI Workflow Playbook." }); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input type="email" placeholder="your@email.com" className="flex-1 rounded-lg px-4 py-3 text-sm outline-none" style={{ border: "none", color: "#1C1C1C" }} />
            <button type="submit" className="font-bold px-6 py-3 rounded-lg whitespace-nowrap flex items-center gap-2" style={{ background: "#E6B800", color: "#1C1C1C", fontFamily: "'Poppins', sans-serif" }}>
              <Download size={16} /> Download Playbook
            </button>
          </form>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#programs" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#38B54A" }}>
              <ArrowRight size={15} /> Explore Programs
            </Link>
            <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.60)" }}>
              ← Back to Resources
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
