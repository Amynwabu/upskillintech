import { useState } from "react";
import { CheckCircle2, ArrowRight, Mail, PenLine, Search, FileText, Zap, BookOpen, Wrench, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const days = [
  {
    day: 1,
    title: "AI for Email",
    tagline: "Write better emails in half the time",
    icon: Mail,
    color: "#859D30",
    task: "Use ChatGPT or Claude to write 3 real emails you need to send today — a professional follow-up, a customer response, and one you've been procrastinating on.",
    prompt: "\"Write a professional follow-up email to [name] after [meeting/event]. Keep it warm, concise, and include a clear next step.\"",
    outcome: "You'll never stare at a blank email again.",
    tips: ["Start with your most dreaded email", "Edit the AI's output — don't just copy", "Notice how much faster it is"],
  },
  {
    day: 2,
    title: "AI for Weekly Planning",
    tagline: "Plan your whole week in 10 minutes",
    icon: Calendar,
    color: "#859D30",
    task: "Use AI to plan your upcoming week. List your priorities, tasks, and goals — then ask AI to turn them into a structured, realistic weekly plan.",
    prompt: "\"Here are my priorities this week: [list]. Help me create a realistic day-by-day plan with time blocks, accounting for energy levels and urgent vs important tasks.\"",
    outcome: "You'll start the week with clarity instead of chaos.",
    tips: ["Be specific about your priorities", "Ask AI to flag what can be delegated", "Revisit mid-week and adjust"],
  },
  {
    day: 3,
    title: "AI for Social Media Content",
    tagline: "Create a week of content in one sitting",
    icon: PenLine,
    color: "#859D30",
    task: "Use AI to generate 5 social media posts in your voice — one for each working day. Choose your platform (LinkedIn, Instagram, or X) and a topic relevant to your work or business.",
    prompt: "\"I run [business/role]. Create 5 LinkedIn posts for this week — each one should be practical, engaging, and written in a confident, conversational tone. Topics: [list topics].\"",
    outcome: "A full week of content drafted before lunch.",
    tips: ["Give AI your existing posts as style examples", "Mix types: tips, questions, stories", "Personalise the output with your own examples"],
  },
  {
    day: 4,
    title: "AI for Research",
    tagline: "Learn anything faster with AI",
    icon: Search,
    color: "#859D30",
    task: "Pick a topic you need to understand better — for work, a decision, or a project. Use AI to get a structured summary, pros and cons, and key questions to consider.",
    prompt: "\"Explain [topic] in plain English. Include: what it is, why it matters, key pros and cons, common mistakes people make, and 5 questions I should ask before [decision/action].\"",
    outcome: "Research that used to take hours done in minutes.",
    tips: ["Be specific about your context and use case", "Ask follow-up questions", "Ask AI to cite what it's less sure about"],
  },
  {
    day: 5,
    title: "AI for Business Documents",
    tagline: "Draft proposals, reports, and SOPs — fast",
    icon: FileText,
    color: "#859D30",
    task: "Use AI to draft a real business document — a proposal, SOP, meeting agenda, project brief, or report. Choose one you've been putting off.",
    prompt: "\"Write a [document type] for [context]. Include: overview, objectives, key sections, and a clear next step. Tone should be professional but readable.\"",
    outcome: "The document you've been avoiding — done today.",
    tips: ["Provide context: who is the audience?", "Ask AI to suggest headings first", "Iterate: ask it to make sections shorter or longer"],
  },
  {
    day: 6,
    title: "AI for Document Analysis",
    tagline: "Understand any document in minutes",
    icon: BookOpen,
    color: "#859D30",
    task: "Upload or paste a long document — a report, contract, policy, article, or proposal — and ask AI to summarise it, extract key points, and identify what you need to act on.",
    prompt: "\"Here is a document: [paste or describe it]. Please: 1) Summarise in 5 bullet points, 2) List any action items or deadlines, 3) Flag anything I should question or investigate further.\"",
    outcome: "Never read a 40-page report from scratch again.",
    tips: ["Use Claude for long documents (100K context)", "Ask for the 3 most important takeaways", "Ask what's missing or unclear"],
  },
  {
    day: 7,
    title: "Build Your AI Toolkit",
    tagline: "Design your personal AI workflow",
    icon: Wrench,
    color: "#859D30",
    task: "Reflect on the past 6 days. Choose the 3 tasks where AI saved you the most time. Then build a simple personal AI workflow: which tools, which prompts, which habits will you keep?",
    prompt: "\"Based on these 3 tasks where AI helped me most: [list], help me design a simple weekly AI routine. What tools should I use, what prompts should I save, and how should I build this into my day?\"",
    outcome: "A personalised AI practice you'll actually stick with.",
    tips: ["Save your best prompts somewhere accessible", "Block 20 minutes a day for AI practice", "Teach one thing you learned to someone else"],
  },
];

export default function Challenge() {
  const [activeDay, setActiveDay] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[72px]">

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #859D30 0%, #859D30 60%, #859D30 100%)", padding: "5rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.15)", borderRadius: "2rem", padding: "0.4rem 1rem", marginBottom: "1.5rem" }}>
              <Zap size={14} color="#859D30" />
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Free 7-Day Challenge</span>
            </div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#ffffff", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              7-Day AI Everyday Challenge
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.15rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 560, margin: "0 auto 2.5rem" }}>
              One practical AI task a day for 7 days. No technical skills required. By the end, you'll have real AI habits that save you hours every week.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="#day-1"
                onClick={() => setActiveDay(0)}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#859D30", color: "#F3F4F6", borderRadius: "0.75rem", padding: "0.9rem 1.75rem", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}
              >
                Start Day 1 <ArrowRight size={15} />
              </a>
              <a
                href="#lead-magnet"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: "0.75rem", padding: "0.9rem 1.75rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.3)" }}
              >
                Get the Free Starter Kit
              </a>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: "#0F172A", padding: "1.5rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
            {[
              { value: "7", label: "Daily challenges" },
              { value: "20 min", label: "Per day" },
              { value: "0", label: "Tech skills needed" },
              { value: "100%", label: "Free" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#859D30" }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Days */}
        <section id="day-1" style={{ background: "#07100B", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#859D30", textTransform: "uppercase", letterSpacing: "0.08em" }}>The Challenge</span>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#F3F4F6", marginTop: "0.5rem" }}>
                One task. One day. Real results.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#9CA3AF", marginTop: "0.75rem" }}>
                Click any day to see the full task, suggested prompt, and pro tips.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {days.map((d, i) => {
                const Icon = d.icon;
                const isOpen = activeDay === i;
                return (
                  <div
                    key={d.day}
                    style={{ borderRadius: "1rem", border: `1.5px solid ${isOpen ? d.color : "#E5E7EB"}`, background: "#07100B", overflow: "hidden", transition: "border-color 0.2s" }}
                  >
                    <button
                      onClick={() => setActiveDay(isOpen ? null : i)}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: isOpen ? d.color : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
                        <Icon size={20} color={isOpen ? "#fff" : d.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: d.color, textTransform: "uppercase", letterSpacing: "0.07em" }}>Day {d.day}</div>
                        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F3F4F6" }}>{d.title}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9CA3AF" }}>{d.tagline}</div>
                      </div>
                      <div style={{ color: d.color, fontSize: "1.2rem", fontWeight: 700, flexShrink: 0 }}>{isOpen ? "−" : "+"}</div>
                    </button>

                    {isOpen && (
                      <div style={{ padding: "0 1.5rem 1.5rem", borderTop: `1px solid #F3F4F6` }}>
                        <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                          <div style={{ background: "#07100B", borderRadius: "0.75rem", padding: "1.25rem" }}>
                            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#D1D5DB", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Your task</div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "#D1D5DB", lineHeight: 1.65 }}>{d.task}</p>
                          </div>

                          <div style={{ background: "#0F172A", borderRadius: "0.75rem", padding: "1.25rem" }}>
                            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#859D30", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Try this prompt</div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, fontStyle: "italic" }}>{d.prompt}</p>
                          </div>

                          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <div style={{ flex: 1, minWidth: 200 }}>
                              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#D1D5DB", marginBottom: "0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Pro tips</div>
                              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", margin: 0, padding: 0, listStyle: "none" }}>
                                {d.tips.map((t) => (
                                  <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                                    <CheckCircle2 size={15} color={d.color} style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#D1D5DB", lineHeight: 1.5 }}>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div style={{ borderRadius: "0.75rem", padding: "1rem 1.25rem", background: `${d.color}12`, border: `1px solid ${d.color}30`, alignSelf: "flex-start" }}>
                              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: d.color, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3rem" }}>Outcome</div>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#D1D5DB", lineHeight: 1.5, fontWeight: 500 }}>{d.outcome}</p>
                            </div>
                          </div>

                          {i < days.length - 1 && (
                            <button
                              onClick={() => setActiveDay(i + 1)}
                              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: d.color, color: "#fff", borderRadius: "0.625rem", padding: "0.625rem 1.25rem", border: "none", cursor: "pointer", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.85rem", alignSelf: "flex-start" }}
                            >
                              Next: Day {d.day + 1} <ArrowRight size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#07100B", padding: "4rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#F3F4F6", marginBottom: "1rem" }}>
              Ready to go deeper?
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#9CA3AF", lineHeight: 1.7, marginBottom: "2rem" }}>
              The 7-Day Challenge is just the beginning. Join the AI Starter Bootcamp to build structured AI skills with community support and expert guidance.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/programs" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#859D30", color: "#fff", borderRadius: "0.75rem", padding: "0.9rem 1.75rem", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
                Explore Programmes <ArrowRight size={15} />
              </a>
              <a href="#lead-magnet" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#859D30", borderRadius: "0.75rem", padding: "0.9rem 1.75rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", border: "1.5px solid #859D30" }}>
                Get the Free Starter Kit
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
