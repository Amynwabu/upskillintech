import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Compass, BookOpen, Zap, Wrench, Rocket } from "lucide-react";

const questions = [
  {
    id: "q1",
    question: "How would you describe your current experience with AI tools?",
    options: [
      { value: "a", text: "I've heard of them but haven't really tried any" },
      { value: "b", text: "I've tried ChatGPT or similar once or twice" },
      { value: "c", text: "I use AI tools occasionally for specific tasks" },
      { value: "d", text: "I use AI regularly and have built some workflows" },
      { value: "e", text: "AI is central to how I work — I train others too" },
    ],
  },
  {
    id: "q2",
    question: "What is your biggest goal with AI right now?",
    options: [
      { value: "a", text: "Understand what AI actually is and what it can do for me" },
      { value: "b", text: "Try a few practical tools and build some confidence" },
      { value: "c", text: "Use AI to save time on specific tasks at work or in business" },
      { value: "d", text: "Build repeatable AI workflows and automate more of my work" },
      { value: "e", text: "Lead AI adoption in my team, organisation, or community" },
    ],
  },
  {
    id: "q3",
    question: "Which best describes your situation?",
    options: [
      { value: "a", text: "Individual — I want AI for everyday productivity and learning" },
      { value: "b", text: "Solopreneur — I'm building a business on my own" },
      { value: "c", text: "Professional — I work in a company or organisation" },
      { value: "d", text: "Business owner — I have a team and want AI across operations" },
      { value: "e", text: "Leader — I want to drive AI adoption for a team or community" },
    ],
  },
  {
    id: "q4",
    question: "What is your biggest concern about using AI?",
    options: [
      { value: "a", text: "I don't know where to begin — it all feels overwhelming" },
      { value: "b", text: "I worry it's too technical or complicated for me" },
      { value: "c", text: "I'm not sure which tools are right for my work" },
      { value: "d", text: "I want to use it more but haven't built consistent habits" },
      { value: "e", text: "I need to help others adopt it responsibly and safely" },
    ],
  },
  {
    id: "q5",
    question: "How much time can you dedicate to building AI skills each week?",
    options: [
      { value: "a", text: "Just 20–30 minutes — I want to start small" },
      { value: "b", text: "About an hour a week" },
      { value: "c", text: "A few hours — I'm committed to learning properly" },
      { value: "d", text: "As much as it takes — this is a priority for me" },
      { value: "e", text: "I'm already investing significant time — I need advanced support" },
    ],
  },
];

const levels = [
  {
    id: "curious",
    title: "AI Curious",
    icon: Compass,
    color: "#0D9488",
    gradient: "linear-gradient(135deg, #0D9488, #0F766E)",
    desc: "You're at the start of your AI journey — curious but not sure where to begin. That's exactly the right place to be.",
    next: "Start with the AI Everyday Starter Kit (free), then join the 7-Day AI Challenge to build your first practical habits.",
    programmes: ["AI Starter Bootcamp", "7-Day AI Everyday Challenge", "Free AI Starter Kit"],
    cta: "Get the Free Starter Kit",
    ctaHref: "#lead-magnet",
  },
  {
    id: "beginner",
    title: "AI Beginner",
    icon: BookOpen,
    color: "#16A34A",
    gradient: "linear-gradient(135deg, #16A34A, #15803D)",
    desc: "You've dipped your toes in but haven't found a consistent practice yet. You're ready to move from dabbling to doing.",
    next: "The AI Starter Bootcamp will build your confidence fast with structured, beginner-friendly sessions.",
    programmes: ["AI Starter Bootcamp", "7-Day AI Everyday Challenge", "AI Productivity for Everyday Work"],
    cta: "Explore the Bootcamp",
    ctaHref: "/programs",
  },
  {
    id: "active",
    title: "AI Active User",
    icon: Zap,
    color: "#D97706",
    gradient: "linear-gradient(135deg, #D97706, #B45309)",
    desc: "You're using AI regularly but in an ad-hoc way. You're ready to go deeper — with structure, strategy, and real productivity gains.",
    next: "AI Productivity for Everyday Work will help you turn occasional use into consistent time savings.",
    programmes: ["AI Productivity for Everyday Work", "AI Automation Sprint", "Workflow Templates"],
    cta: "Explore Programmes",
    ctaHref: "/programs",
  },
  {
    id: "builder",
    title: "AI Workflow Builder",
    icon: Wrench,
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #6D28D9)",
    desc: "You're building workflows and getting real results. Now it's time to automate, scale, and get more out of every tool.",
    next: "The AI Automation Sprint will help you systematise what's working and build the workflows that save the most time.",
    programmes: ["AI Automation Sprint", "AI Adoption for Leaders & Teams", "1-on-1 Consultation"],
    cta: "Book a Consultation",
    ctaHref: "/contact",
  },
  {
    id: "leader",
    title: "AI Adoption Leader",
    icon: Rocket,
    color: "#DB2777",
    gradient: "linear-gradient(135deg, #DB2777, #BE185D)",
    desc: "You're ahead of most people — and you're thinking about how to bring others along. Your focus is adoption, governance, and impact.",
    next: "AI Adoption for Leaders & Teams is designed exactly for you. Let's build a roadmap for your organisation.",
    programmes: ["AI Adoption for Leaders & Teams", "Enterprise Solutions", "Discovery Call with Dr. Amaka"],
    cta: "Explore Enterprise Solutions",
    ctaHref: "/enterprise",
  },
];

function scoreToLevel(answers: Record<string, string>): number {
  const vals = Object.values(answers);
  const score = vals.reduce((sum, v) => sum + ["a", "b", "c", "d", "e"].indexOf(v), 0);
  const avg = score / vals.length;
  if (avg < 0.8) return 0;
  if (avg < 1.6) return 1;
  if (avg < 2.4) return 2;
  if (avg < 3.2) return 3;
  return 4;
}

export default function AISkillsQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<(typeof levels)[0] | null>(null);

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const selected = answers[q?.id];

  const handleSelect = (val: string) => setAnswers((p) => ({ ...p, [q.id]: val }));

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setResult(levels[scoreToLevel(answers)]);
    }
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleRestart = () => { setStep(0); setAnswers({}); setResult(null); };

  if (result) {
    const Icon = result.icon;
    return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", border: "1px solid #E5E7EB" }}>
          {/* Result header */}
          <div style={{ background: result.gradient, padding: "2.5rem 2rem", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <Icon size={34} color="#fff" />
            </div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Your AI Starting Point
            </div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#ffffff", marginBottom: "0.75rem" }}>
              {result.title}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.65, maxWidth: 480, margin: "0 auto" }}>
              {result.desc}
            </p>
          </div>

          {/* Recommended path */}
          <div style={{ background: "#ffffff", padding: "2rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#111827", marginBottom: "0.5rem" }}>
                Your recommended next step
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "#4B5563", lineHeight: 1.65 }}>
                {result.next}
              </p>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#111827", marginBottom: "0.75rem" }}>
                Recommended for you
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {result.programmes.map((p, i) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "#F9F8F6", borderRadius: "0.625rem", padding: "0.625rem 0.875rem" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: result.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "#fff" }}>{i + 1}</span>
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#374151", fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a
                href={result.ctaHref}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: result.color, color: "#fff", borderRadius: "0.75rem",
                  padding: "0.875rem 1.5rem", fontFamily: "'Sora', sans-serif",
                  fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
                }}
              >
                {result.cta} <ArrowRight size={15} />
              </a>
              <button
                onClick={handleRestart}
                style={{
                  background: "transparent", border: "1.5px solid #D1D5DB", color: "#374151",
                  borderRadius: "0.75rem", padding: "0.875rem 1.5rem",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
                }}
              >
                Retake quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #E5E7EB", background: "#ffffff" }}>
        {/* Progress */}
        <div style={{ padding: "1.5rem 2rem 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#6B7280" }}>
              Question {step + 1} of {questions.length}
            </span>
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#0D9488" }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{ height: 4, background: "#F3F4F6", borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #0D9488, #16A34A)", borderRadius: 2, transition: "width 0.3s" }} />
          </div>
        </div>

        {/* Question */}
        <div style={{ padding: "1.75rem 2rem 0" }}>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#111827", lineHeight: 1.4, marginBottom: "1.5rem" }}>
            {q.question}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
            {q.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  textAlign: "left", padding: "0.875rem 1rem", borderRadius: "0.75rem", cursor: "pointer",
                  border: selected === opt.value ? "2px solid #0D9488" : "1.5px solid #E5E7EB",
                  background: selected === opt.value ? "rgba(13,148,136,0.06)" : "#ffffff",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: selected === opt.value ? "#0D9488" : "#374151",
                  fontWeight: selected === opt.value ? 600 : 400,
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  transition: "all 0.15s",
                }}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  border: selected === opt.value ? "2px solid #0D9488" : "2px solid #D1D5DB",
                  background: selected === opt.value ? "#0D9488" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {selected === opt.value && <CheckCircle2 size={12} color="#fff" />}
                </span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: "0 2rem 2rem", display: "flex", gap: "0.75rem" }}>
          {step > 0 && (
            <button
              onClick={handleBack}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "transparent", border: "1.5px solid #E5E7EB", color: "#374151",
                borderRadius: "0.75rem", padding: "0.875rem 1.25rem",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
              }}
            >
              <ArrowLeft size={15} /> Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              background: selected ? "#0D9488" : "#E5E7EB", color: selected ? "#fff" : "#9CA3AF",
              borderRadius: "0.75rem", padding: "0.875rem 1.25rem", border: "none",
              fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.9rem",
              cursor: selected ? "pointer" : "not-allowed", transition: "background 0.15s",
            }}
          >
            {step === questions.length - 1 ? "See My AI Level" : "Next"} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
