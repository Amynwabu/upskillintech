/**
 * Individual Newsletter Article Page — /newsletter/:slug
 * Full article content with breadcrumb, body sections, CTA, and related articles
 */
import { useState } from "react";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  ChevronRight, Calendar, Clock, Mail, ArrowRight,
  CheckCircle, Zap, BookOpen, Users, Lightbulb, BarChart2
} from "lucide-react";

// ─── Article data ───────────────────────────────────────────────────────────
const ARTICLES: Record<string, {
  title: string; date: string; readTime: string; author: string;
  tag: string; tagColor: string;
  sections: { type: "insight" | "tip" | "tool" | "workflow" | "community" | "resource"; title: string; content: string; }[];
  relatedSlugs: string[];
}> = {
  "most-professionals-are-using-ai-wrong": {
    title: "Most Professionals Are Using AI Wrong",
    date: "March 2026", readTime: "5 min read", author: "UpskillinTech Team",
    tag: "Featured Insight", tagColor: "#38B54A",
    sections: [
      {
        type: "insight",
        title: "Featured Insight: The Search Engine Trap",
        content: `Most professionals who use AI are stuck in what we call the "search engine trap." They type a question, get an answer, and move on. It's faster than Googling, sure — but it barely scratches the surface of what AI can actually do for your work.\n\nThe real power of AI isn't in answering questions. It's in thinking alongside you. When you use AI as a thinking partner — to stress-test your ideas, challenge your assumptions, explore scenarios, and structure your reasoning — you unlock a completely different level of productivity.\n\nHere's the shift: instead of asking "What is X?", start asking "Help me think through X. What am I missing? What are the risks? What would a sceptic say?" That single change in how you prompt AI will transform your output quality.`,
      },
      {
        type: "tip",
        title: "Practical AI Tip: The 3-Layer Prompt Framework",
        content: `Most AI prompts fail because they're too shallow. The 3-Layer Prompt Framework fixes this:\n\n**Layer 1 — Context:** Tell the AI who you are and what you're working on. ("I'm a project manager preparing a stakeholder update for a delayed software project.")\n\n**Layer 2 — Task:** Be specific about what you need. ("Draft a 3-paragraph executive summary that acknowledges the delay, explains the cause, and outlines the recovery plan.")\n\n**Layer 3 — Constraints:** Add guardrails. ("Keep it under 200 words. Use professional but direct language. Avoid jargon.")\n\nThis framework alone will make your AI outputs 10× more useful. Try it today on your next task.`,
      },
      {
        type: "tool",
        title: "Tool Spotlight: Claude 3.5 Sonnet for Deep Work",
        content: `This month's tool spotlight is Claude 3.5 Sonnet by Anthropic. While ChatGPT gets most of the attention, Claude consistently outperforms on tasks requiring nuanced reasoning, long-form writing, and careful analysis.\n\n**Best use cases:** Complex document analysis, writing first drafts of reports and proposals, strategic thinking exercises, and summarising long research papers.\n\n**Pro tip:** Claude handles very long context windows exceptionally well. You can paste an entire 50-page report and ask it to extract the five most important insights for your specific role. This alone can save 2–3 hours per week on research and reading.`,
      },
      {
        type: "workflow",
        title: "Workflow of the Month: The Weekly Review System",
        content: `Every Sunday evening, spend 20 minutes with this AI-powered weekly review:\n\n1. **Brain dump** — Open a new chat and type everything on your mind: unfinished tasks, worries, ideas, upcoming deadlines. Don't filter.\n\n2. **AI organisation** — Prompt: "Organise this brain dump into: (a) urgent actions for this week, (b) important but not urgent items, (c) ideas to explore later, (d) things I can delegate or delete."\n\n3. **Priority check** — Prompt: "Based on my goals [paste your top 3 goals], which of these items will have the highest impact? What should I focus on first?"\n\n4. **Week plan** — Prompt: "Create a realistic daily plan for this week, blocking 2-hour deep work sessions in the morning and leaving afternoons for meetings and admin."\n\nProfessionals who use this system report saving 5–8 hours per week by eliminating decision fatigue and staying focused on what actually matters.`,
      },
      {
        type: "community",
        title: "Community Update: March Masterclass Recap",
        content: `Last week's masterclass on "AI for Client Communication" drew over 200 professionals from across Africa, the UK, and North America. The session covered how to use AI to draft client proposals, handle objections, and write follow-up emails that actually get responses.\n\nThe most popular takeaway? A simple prompt template for turning rough meeting notes into polished client summaries in under 3 minutes. We've added it to the AI Workflow Library — check it out at upskillintech.com/resources/workflows.\n\nNext masterclass: **"AI for Data Analysis Without Coding"** — April 10th, 6pm GMT. Register free at upskillintech.com/community.`,
      },
      {
        type: "resource",
        title: "Recommended Resource: Free AI Productivity Guide",
        content: `If you're just getting started with AI in your professional life, our free guide "The AI-Enabled Professional Starter Kit" is the best place to begin. It covers:\n\n- The 5 AI tools every professional needs in 2026\n- 10 ready-to-use prompt templates for common work tasks\n- A 30-day AI integration roadmap\n- How to measure your AI productivity gains\n\nDownload it free at upskillintech.com/resources/ai-guides. Over 2,000 professionals have already used it to kickstart their AI journey.`,
      },
    ],
    relatedSlugs: [
      "5-ai-workflows-that-save-professionals-10-hours-a-week",
      "how-to-build-your-first-ai-powered-productivity-system",
      "the-ai-leadership-gap-why-managers-need-ai-skills-now",
    ],
  },

  "5-ai-workflows-that-save-professionals-10-hours-a-week": {
    title: "5 AI Workflows That Save Professionals 10 Hours a Week",
    date: "February 2026", readTime: "7 min read", author: "UpskillinTech Team",
    tag: "Workflow Guide", tagColor: "#8B9E1A",
    sections: [
      {
        type: "insight",
        title: "Featured Insight: The 10-Hour Opportunity",
        content: `The average knowledge worker spends 28% of their workday on email, 20% on searching for information, and 14% on meetings. That's over 60% of your time on tasks that AI can dramatically accelerate — or eliminate entirely.\n\nThe five workflows below are used by professionals in our community who have reclaimed 10+ hours per week. They're not theoretical — they're battle-tested systems that work across industries, roles, and experience levels with AI.`,
      },
      {
        type: "workflow",
        title: "Workflow 1: The Meeting Intelligence System",
        content: `**Time saved: 45 min per meeting**\n\n1. Record your meeting with Otter.ai or Fireflies (free tiers available)\n2. After the meeting, paste the transcript into ChatGPT\n3. Prompt: "Extract: (1) key decisions made, (2) action items with owners, (3) open questions, (4) a 3-sentence executive summary"\n4. Copy the output into Notion or your project management tool\n\nFor a 1-hour meeting, this replaces 45 minutes of note-taking and follow-up writing.`,
      },
      {
        type: "workflow",
        title: "Workflow 2: The Research Accelerator",
        content: `**Time saved: 2 hours per research task**\n\n1. Use Perplexity AI to get a research overview with cited sources\n2. Open the top 3 sources and paste the key sections into Claude\n3. Prompt: "I'm a [your role] preparing [deliverable]. Synthesise these sources into the 5 most important insights relevant to my context. Flag any contradictions."\n4. Use the synthesis as the foundation for your report or presentation\n\nThis workflow turns a 3-hour research task into a 45-minute one.`,
      },
      {
        type: "workflow",
        title: "Workflow 3: The Email Triage System",
        content: `**Time saved: 1.5 hours per day**\n\n1. At the start of each day, copy your 10 most important emails into a single ChatGPT prompt\n2. Prompt: "For each email, suggest: (1) a one-sentence summary, (2) the required action, (3) a draft reply if needed. Prioritise by urgency."\n3. Review the suggestions, edit as needed, and send\n4. Use the saved time for deep work\n\nCombined with inbox zero principles, this system eliminates email anxiety entirely.`,
      },
      {
        type: "tip",
        title: "Practical AI Tip: Batch Your AI Tasks",
        content: `One of the biggest productivity mistakes professionals make with AI is context-switching — opening a new AI chat for every small task throughout the day.\n\nInstead, batch your AI tasks. Set aside two 30-minute "AI sessions" per day — one in the morning and one in the afternoon. During each session, work through your list of AI-assisted tasks in one focused block.\n\nThis reduces the cognitive overhead of switching between AI and your normal workflow, and you'll find your prompts get better when you're in "AI mode" rather than jumping in and out.`,
      },
      {
        type: "resource",
        title: "Recommended Resource: AI Workflow Library",
        content: `All five workflows mentioned in this edition — plus 20 more — are available in full detail in the UpskillinTech AI Workflow Library. Each workflow includes the exact prompts to use, the tools required, and a time-saving estimate.\n\nVisit upskillintech.com/resources/workflows to access the full library. It's free and updated monthly with new workflows from our professional community.`,
      },
    ],
    relatedSlugs: [
      "most-professionals-are-using-ai-wrong",
      "how-to-build-your-first-ai-powered-productivity-system",
      "ai-tools-for-educators-and-community-leaders",
    ],
  },

  "the-ai-leadership-gap-why-managers-need-ai-skills-now": {
    title: "The AI Leadership Gap: Why Managers Need AI Skills Now",
    date: "January 2026", readTime: "6 min read", author: "UpskillinTech Team",
    tag: "Leadership", tagColor: "#D97706",
    sections: [
      {
        type: "insight",
        title: "Featured Insight: The Invisible Leadership Crisis",
        content: `There's a quiet crisis unfolding in organisations right now. Junior team members are using AI to produce work in 2 hours that used to take 2 days. They're automating their own workflows, writing better reports, and solving problems faster than ever before.\n\nMeanwhile, their managers — the people responsible for reviewing, guiding, and evaluating this work — often have no idea how it was produced. They can't tell the difference between AI-assisted excellence and AI-generated mediocrity. They're managing workflows they don't understand.\n\nThis is the AI Leadership Gap, and it's growing every month.`,
      },
      {
        type: "tip",
        title: "Practical AI Tip: The Leader's AI Audit",
        content: `Before you can lead AI adoption in your team, you need to understand where AI is already being used — and where it should be.\n\nSpend 30 minutes this week doing a simple AI audit:\n\n1. List the 10 most time-consuming tasks in your team\n2. For each task, ask: "Could AI do 50% of this work in half the time?"\n3. Identify the top 3 tasks where AI could have the biggest impact\n4. Assign one team member to test an AI workflow for each task over the next two weeks\n\nThis simple audit has helped dozens of managers in our community identify 15–20 hours of weekly team time that could be reclaimed through AI.`,
      },
      {
        type: "tool",
        title: "Tool Spotlight: Notion AI for Team Knowledge Management",
        content: `For leaders managing teams and projects, Notion AI is one of the most underrated tools available. It turns your team's Notion workspace into an intelligent knowledge base.\n\n**Key features for leaders:**\n- Auto-summarise long meeting notes into action items\n- Answer questions about past projects using your team's documentation\n- Draft project briefs, status updates, and performance reviews\n- Translate complex technical content into plain language for stakeholders\n\nIf your team already uses Notion, enabling Notion AI costs $8/month per user and typically pays for itself in the first week.`,
      },
      {
        type: "workflow",
        title: "Workflow of the Month: The AI-Assisted Performance Review",
        content: `Performance reviews are one of the most time-consuming leadership tasks. This workflow cuts the time in half:\n\n1. Collect your notes on the team member's work over the review period\n2. Prompt ChatGPT: "I'm writing a performance review for a [role] who has [achievements]. Help me structure a balanced review covering: strengths, areas for growth, specific examples, and development goals."\n3. Edit the draft to add your personal observations and specific examples\n4. Use the final draft as the basis for your review conversation\n\nThis workflow doesn't replace your judgment — it gives you a structured starting point so you spend your time on the parts that require your expertise.`,
      },
      {
        type: "community",
        title: "Community Update: AI Leadership Cohort",
        content: `We're launching a dedicated AI Leadership cohort in April 2026 for managers, directors, and executives who want to lead AI adoption in their organisations.\n\nThe 6-week programme covers: understanding AI capabilities and limitations, building an AI strategy for your team, managing AI-assisted workflows, ethical AI use in the workplace, and measuring AI ROI.\n\nEarly bird places are limited. Register your interest at upskillintech.com/programs.`,
      },
      {
        type: "resource",
        title: "Recommended Resource: AI Leadership Framework",
        content: `Download our free "AI Leadership Framework" guide — a practical toolkit for managers navigating AI adoption in their teams. It includes a team AI readiness assessment, a 90-day AI integration roadmap, conversation guides for introducing AI to resistant team members, and a metrics dashboard template for tracking AI productivity gains.\n\nAvailable free at upskillintech.com/resources/ai-guides.`,
      },
    ],
    relatedSlugs: [
      "most-professionals-are-using-ai-wrong",
      "5-ai-workflows-that-save-professionals-10-hours-a-week",
      "how-to-build-your-first-ai-powered-productivity-system",
    ],
  },

  "how-to-build-your-first-ai-powered-productivity-system": {
    title: "How to Build Your First AI-Powered Productivity System",
    date: "December 2025", readTime: "8 min read", author: "UpskillinTech Team",
    tag: "Beginner Guide", tagColor: "#7C3AED",
    sections: [
      {
        type: "insight",
        title: "Featured Insight: Systems Beat Willpower Every Time",
        content: `The biggest mistake people make when starting with AI is treating it like a magic button — something you reach for when you're stuck or when you remember it exists. That approach produces inconsistent results and eventually leads to abandonment.\n\nThe professionals who get the most from AI don't have better tools. They have better systems. They've built AI into their daily workflow so that using it is automatic, not optional.\n\nThis edition walks you through building your first AI productivity system from scratch — one that fits your role, your tools, and your work style.`,
      },
      {
        type: "tip",
        title: "Practical AI Tip: Start With Your Biggest Time Drain",
        content: `Don't try to AI-ify everything at once. Start with the single task that takes the most time and produces the least joy.\n\nFor most professionals, this is one of: writing (reports, emails, proposals), research (gathering and synthesising information), or meeting follow-up (notes, action items, summaries).\n\nPick one. Build a reliable AI workflow for that one task. Use it every day for two weeks. Once it's a habit, add the next task. This approach builds sustainable AI habits rather than short-lived experiments.`,
      },
      {
        type: "workflow",
        title: "Workflow of the Month: Building Your AI Stack",
        content: `A basic AI productivity stack for professionals:\n\n**Thinking & Writing:** ChatGPT or Claude — for drafting, editing, brainstorming, and analysis\n\n**Research:** Perplexity AI — for real-time research with cited sources\n\n**Meetings:** Otter.ai or Fireflies — for transcription and meeting summaries\n\n**Knowledge Management:** Notion AI — for organising and retrieving information\n\n**Image & Presentation:** Canva AI or Gamma — for visual content creation\n\nTotal cost: £30–50/month. Time saved: 10–15 hours/week. ROI: immediate.\n\nStart with just ChatGPT and Perplexity. Master those two before adding anything else.`,
      },
      {
        type: "tool",
        title: "Tool Spotlight: Perplexity AI for Research",
        content: `Perplexity AI is the tool most professionals wish they'd discovered sooner. Unlike ChatGPT, Perplexity searches the web in real time and cites its sources — making it perfect for research tasks where accuracy matters.\n\n**Best use cases:** Market research, competitor analysis, fact-checking, staying current on industry news, and answering questions that require up-to-date information.\n\n**Pro tip:** Use the "Focus" feature to restrict searches to academic papers, news, or specific websites. For professional research, "Academic" mode surfaces peer-reviewed sources that ChatGPT would never find.`,
      },
      {
        type: "community",
        title: "Community Update: January Cohort Results",
        content: `The January AI-Enabled Professional cohort wrapped up last week with remarkable results. Participants reported an average of 8.5 hours saved per week after completing the 6-week programme. Three participants used their new AI skills to launch side projects. Two received promotions after demonstrating AI-driven productivity improvements to their managers.\n\nThe next cohort starts in March. Places are limited to 50 participants to maintain the quality of coaching and community support. Register at upskillintech.com/programs.`,
      },
      {
        type: "resource",
        title: "Recommended Resource: 30-Day AI Integration Roadmap",
        content: `Our free "30-Day AI Integration Roadmap" is the most popular resource we've ever published. It gives you a day-by-day plan for building AI into your professional life — starting from zero and ending with a fully integrated AI workflow system.\n\nWeek 1: Foundation tools and basic prompting\nWeek 2: Your first AI workflows\nWeek 3: Advanced prompting and automation\nWeek 4: Measuring results and optimising your system\n\nDownload it free at upskillintech.com/resources/ai-guides.`,
      },
    ],
    relatedSlugs: [
      "most-professionals-are-using-ai-wrong",
      "5-ai-workflows-that-save-professionals-10-hours-a-week",
      "ai-tools-for-educators-and-community-leaders",
    ],
  },

  "ai-tools-for-educators-and-community-leaders": {
    title: "AI Tools for Educators and Community Leaders",
    date: "November 2025", readTime: "5 min read", author: "UpskillinTech Team",
    tag: "Education & Leadership", tagColor: "#0891B2",
    sections: [
      {
        type: "insight",
        title: "Featured Insight: AI Is Transforming Community Impact",
        content: `Educators and community leaders are some of the most time-poor professionals in the world. They're doing the most important work — shaping minds, building communities, serving people — with the fewest resources.\n\nAI is changing that. The tools available today can multiply the impact of a single educator or community leader by 3–5×, freeing them from administrative burden and giving them more time for the human work that only they can do.\n\nThis edition is dedicated to the educators, pastors, community organisers, and social leaders in our community. Your work matters — and AI can help you do more of it.`,
      },
      {
        type: "tip",
        title: "Practical AI Tip: The Lesson Plan Generator",
        content: `For educators, AI can transform lesson planning from a 3-hour task to a 20-minute one.\n\nPrompt template: "I'm a [subject] teacher for [age group/level]. Create a 60-minute lesson plan on [topic] that includes: a 5-minute hook activity, 20 minutes of direct instruction, 25 minutes of student practice, and 10 minutes of reflection. Include differentiation strategies for advanced and struggling learners."\n\nThis single prompt produces a complete lesson plan that you can adapt and personalise. Most teachers who use this report saving 5–8 hours per week on planning alone.`,
      },
      {
        type: "tool",
        title: "Tool Spotlight: Canva AI for Community Communications",
        content: `For community leaders who need to produce professional-looking communications without a design budget, Canva AI is a game-changer.\n\n**Key features:** AI-generated social media graphics, presentation templates, flyer designs, and newsletter layouts — all created from a text description in under 2 minutes.\n\n**For churches and community organisations:** Use Canva AI to create weekly bulletins, event posters, social media content, and annual reports at a fraction of the time and cost of hiring a designer.\n\nThe free tier is surprisingly powerful. The Pro plan (£10/month) unlocks AI features that are worth every penny for active community communicators.`,
      },
      {
        type: "workflow",
        title: "Workflow of the Month: The Community Outreach System",
        content: `This workflow helps community leaders reach more people with less effort:\n\n1. **Content planning** — Prompt ChatGPT: "Create a 4-week social media content calendar for a [type of community organisation] focused on [mission/theme]. Include post ideas for Facebook, Instagram, and WhatsApp."\n\n2. **Content creation** — For each post idea, prompt: "Write a [platform] post about [topic] in a warm, community-focused tone. Include a call to action to [desired action]."\n\n3. **Scheduling** — Use Buffer or Later (free tiers available) to schedule posts in advance\n\n4. **Engagement** — Use AI to draft responses to common questions and comments\n\nThis system takes 2 hours to set up and saves 5–6 hours per week on community communications.`,
      },
      {
        type: "community",
        title: "Community Update: AI for Faith Communities",
        content: `We're excited to announce a new programme specifically designed for pastors, church leaders, and faith community organisers: "AI for Faith Communities."\n\nThe programme covers: using AI for sermon preparation and research, AI-powered pastoral care communications, building community engagement systems, and using AI for outreach and evangelism.\n\nThe first cohort starts in February 2026. Register your interest at upskillintech.com/programs.`,
      },
      {
        type: "resource",
        title: "Recommended Resource: AI for Educators Guide",
        content: `Our free "AI for Educators" guide is specifically designed for teachers, trainers, and community educators. It includes 20 ready-to-use prompt templates for lesson planning, assessment creation, parent communication, and student feedback.\n\nDownload it free at upskillintech.com/resources/ai-guides. We've also created a dedicated section in the AI Workflow Library with workflows specifically for educational contexts.`,
      },
    ],
    relatedSlugs: [
      "the-ai-leadership-gap-why-managers-need-ai-skills-now",
      "how-to-build-your-first-ai-powered-productivity-system",
      "most-professionals-are-using-ai-wrong",
    ],
  },
};

const ALL_EDITIONS = [
  { slug: "most-professionals-are-using-ai-wrong", title: "Most Professionals Are Using AI Wrong", date: "March 2026", readTime: "5 min read", tag: "Featured Insight", tagColor: "#38B54A" },
  { slug: "5-ai-workflows-that-save-professionals-10-hours-a-week", title: "5 AI Workflows That Save Professionals 10 Hours a Week", date: "February 2026", readTime: "7 min read", tag: "Workflow Guide", tagColor: "#8B9E1A" },
  { slug: "the-ai-leadership-gap-why-managers-need-ai-skills-now", title: "The AI Leadership Gap: Why Managers Need AI Skills Now", date: "January 2026", readTime: "6 min read", tag: "Leadership", tagColor: "#D97706" },
  { slug: "how-to-build-your-first-ai-powered-productivity-system", title: "How to Build Your First AI-Powered Productivity System", date: "December 2025", readTime: "8 min read", tag: "Beginner Guide", tagColor: "#7C3AED" },
  { slug: "ai-tools-for-educators-and-community-leaders", title: "AI Tools for Educators and Community Leaders", date: "November 2025", readTime: "5 min read", tag: "Education & Leadership", tagColor: "#0891B2" },
];

const SECTION_ICONS: Record<string, React.ElementType> = {
  insight: Lightbulb, tip: Zap, tool: BarChart2, workflow: BookOpen, community: Users, resource: Mail,
};
const SECTION_COLORS: Record<string, string> = {
  insight: "#38B54A", tip: "#E6B800", tool: "#8B9E1A", workflow: "#7C3AED", community: "#0891B2", resource: "#D97706",
};

export default function NewsletterArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? ARTICLES[slug] : null;

  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => { setSubDone(true); setEmail(""); },
    onError: (err: { message?: string }) => toast.error(err.message || "Subscription failed."),
  });

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <main className="flex-1 pt-[76px] flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#111827" }}>Edition Not Found</h1>
            <p className="text-lg mb-8" style={{ color: "#6B7280" }}>This newsletter edition doesn't exist or has been moved.</p>
            <Link href="/newsletter" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "#38B54A" }}>
              ← Back to Newsletter
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = article.relatedSlugs.map(s => ALL_EDITIONS.find(e => e.slug === s)).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main className="flex-1 pt-[76px]">

        {/* ── Breadcrumb ── */}
        <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "14px 0" }}>
          <div className="container">
            <div className="flex items-center gap-2 text-sm" style={{ color: "#6B7280" }}>
              <Link href="/resources" style={{ color: "#38B54A", textDecoration: "none" }}>Resources</Link>
              <ChevronRight size={14} />
              <Link href="/newsletter" style={{ color: "#38B54A", textDecoration: "none" }}>Newsletter</Link>
              <ChevronRight size={14} />
              <span style={{ color: "#374151" }}>{article.title}</span>
            </div>
          </div>
        </div>

        {/* ── Article Header ── */}
        <section style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 60%, #fffef0 100%)", padding: "60px 0 50px" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-5"
                style={{ background: `${article.tagColor}18`, color: article.tagColor }}>
                {article.tag}
              </div>
              <h1 className="font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#111827", lineHeight: 1.2 }}>
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5" style={{ color: "#6B7280", fontSize: "0.95rem" }}>
                <span className="flex items-center gap-1.5"><Users size={15} /> {article.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={15} /> {article.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={15} /> {article.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Article Body ── */}
        <section style={{ background: "#ffffff", padding: "60px 0" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {article.sections.map((section, i) => {
                const Icon = SECTION_ICONS[section.type] || Lightbulb;
                const color = SECTION_COLORS[section.type] || "#38B54A";
                return (
                  <div key={i} className="mb-10 rounded-2xl p-8"
                    style={{ border: `1.5px solid ${color}30`, background: `${color}08` }}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}20` }}>
                        <Icon size={20} style={{ color }} />
                      </div>
                      <h2 className="font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.15rem", color: "#111827" }}>
                        {section.title}
                      </h2>
                    </div>
                    <div style={{ color: "#374151", lineHeight: 1.8, fontSize: "1rem" }}>
                      {section.content.split("\n\n").map((para, j) => (
                        <p key={j} className="mb-4" dangerouslySetInnerHTML={{
                          __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section style={{ background: "#F9FAFB", padding: "60px 0" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl p-10 text-center" style={{ background: "linear-gradient(135deg, #111827, #1a2e1a)" }}>
                <h3 className="font-bold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.6rem" }}>
                  Explore UpskillinTech
                </h3>
                <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem" }}>
                  Ready to go deeper? Join a programme, connect with the community, or subscribe for weekly insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/programs"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #38B54A, #8B9E1A)" }}>
                    Explore Programs <ArrowRight size={16} />
                  </Link>
                  <Link href="/community"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all"
                    style={{ border: "1.5px solid rgba(255,255,255,0.3)", color: "white" }}>
                    Join Community <ArrowRight size={16} />
                  </Link>
                  <Link href="/newsletter"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all"
                    style={{ border: "1.5px solid rgba(255,255,255,0.3)", color: "white" }}>
                    <Mail size={16} /> Subscribe
                  </Link>
                </div>
              </div>

              {/* Mini subscribe form */}
              <div className="mt-8 rounded-2xl p-8" style={{ border: "1.5px solid #E5E7EB", background: "#fff" }}>
                <h4 className="font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", color: "#111827" }}>
                  Enjoyed this edition?
                </h4>
                <p className="mb-5" style={{ color: "#6B7280", fontSize: "0.95rem" }}>Subscribe to get the next one delivered straight to your inbox.</p>
                {subDone ? (
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle size={20} />
                    <span className="font-semibold">You're subscribed! Check your inbox.</span>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (email) subscribe.mutate({ email }); }}
                    className="flex gap-3">
                    <input
                      type="email" placeholder="Your email address" value={email}
                      onChange={(e) => setEmail(e.target.value)} required
                      className="flex-1 px-4 py-3 rounded-xl outline-none"
                      style={{ border: "1.5px solid #E5E7EB", fontSize: "0.95rem" }}
                    />
                    <button type="submit" disabled={subscribe.isPending}
                      className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
                      style={{ background: "#38B54A", whiteSpace: "nowrap" }}>
                      {subscribe.isPending ? "..." : "Subscribe"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Articles ── */}
        {relatedArticles.length > 0 && (
          <section style={{ background: "#ffffff", padding: "60px 0" }}>
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h3 className="font-bold mb-8" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.5rem", color: "#111827" }}>
                  Related Editions
                </h3>
                <div className="grid sm:grid-cols-3 gap-5">
                  {relatedArticles.map((rel) => rel && (
                    <Link key={rel.slug} href={`/newsletter/${rel.slug}`}
                      className="block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                      style={{ border: "1.5px solid #E5E7EB", background: "#FAFAFA" }}>
                      <div className="inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                        style={{ background: `${rel.tagColor}18`, color: rel.tagColor }}>
                        {rel.tag}
                      </div>
                      <h4 className="font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem", color: "#111827", lineHeight: 1.4 }}>
                        {rel.title}
                      </h4>
                      <div className="flex items-center gap-3" style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>
                        <span>{rel.date}</span>
                        <span>{rel.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
