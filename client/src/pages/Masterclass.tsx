import { Link } from "wouter";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  MessageSquare,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

function ReserveSeatButton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const checkout = trpc.checkout.masterclass.useMutation({
    onSuccess: ({ url }) => { window.location.href = url; },
    onError: (err) => toast.error(err.message),
  });
  return (
    <button
      onClick={() => checkout.mutate()}
      disabled={checkout.isPending}
      className={className}
      style={style}
    >
      {checkout.isPending ? "Redirecting to payment…" : <>Reserve Your Seat — £50 / ₦50,000 <ArrowRight size={18} /></>}
    </button>
  );
}

const sessions = [
  {
    title: "AI Productivity for Busy Professionals",
    date: "Next live session",
    duration: "90 minutes",
    outcome: "Build a repeatable AI workflow for writing, planning, research, and daily admin.",
  },
  {
    title: "Prompting That Produces Useful Work",
    date: "On demand",
    duration: "60 minutes",
    outcome: "Learn the prompt patterns that turn rough ideas into structured outputs.",
  },
  {
    title: "Responsible AI Adoption at Work",
    date: "On demand",
    duration: "75 minutes",
    outcome: "Know when to use AI, when not to use it, and how to keep humans in the loop.",
  },
];

const takeaways = [
  "A practical AI productivity workflow you can reuse every week",
  "Prompt templates for research, email, planning, and reporting",
  "A simple framework for responsible AI use at work",
  "Live examples with ChatGPT and everyday professional tasks",
  "Access to recordings and follow-up resources after the session",
  "Clear next steps for joining a programme or community cohort",
];

const audience = [
  "Professionals who want to save time with AI",
  "Managers and team leads exploring AI adoption",
  "Educators, founders, consultants, and community leaders",
  "Beginners who want practical examples without technical jargon",
];

export default function Masterclass() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <main className="flex-1 pt-[76px]">
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F0FDFA 0%, #F7FEF7 45%, #FFF7D6 100%)" }}>
          <div className="absolute top-[-160px] right-[-120px] rounded-full pointer-events-none" style={{ width: 420, height: 420, background: "rgba(13,148,136,0.08)" }} />
          <div className="absolute bottom-[-140px] left-[-120px] rounded-full pointer-events-none" style={{ width: 360, height: 360, background: "rgba(230,184,0,0.14)" }} />

          <div className="container relative z-10 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(13,148,136,0.10)", border: "1px solid rgba(13,148,136,0.20)" }}>
                  <Sparkles size={16} style={{ color: "#0D9488" }} />
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#0D9488" }}>Free AI Masterclass</span>
                </div>
                <h1 className="mb-6" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#111827", fontSize: "clamp(2.5rem, 5vw, 4.75rem)", lineHeight: 1.05 }}>
                  Build Practical AI Skills for Work
                </h1>
                <p className="mb-6" style={{ fontSize: "1.2rem", lineHeight: 1.75, color: "#374151" }}>
                  Join Dr. Amaka Adiuku for a practical masterclass on using AI to save time, improve your workflow, and adopt AI responsibly without overwhelm.
                </p>
                <div className="flex flex-wrap gap-3 mb-8" style={{ color: "#4B5563" }}>
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.75)" }}><Calendar size={15} /> Monthly live sessions</span>
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.75)" }}><Clock size={15} /> 60-90 minutes</span>
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.75)" }}><Users size={15} /> Beginners welcome</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <ReserveSeatButton
                    className="btn-primary justify-center inline-flex items-center gap-2"
                    style={{ fontSize: "1.05rem", padding: "1rem 2rem", background: "#0D9488" }}
                  />
                  <Link href="/resources/webinars" className="btn-outline justify-center" style={{ fontSize: "1.05rem", padding: "1rem 2rem" }}>
                    Watch Past Sessions
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.18)" }}>
                  <img
                    src="/upskilling-professionals.png"
                    alt="Black and mixed professionals collaborating in an AI masterclass"
                    className="w-full h-auto"
                    style={{ display: "block" }}
                  />
                </div>
                <div className="absolute left-5 bottom-5 rounded-2xl px-5 py-4" style={{ background: "rgba(255,255,255,0.96)", boxShadow: "0 10px 28px rgba(0,0,0,0.16)" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", color: "#0D9488", fontWeight: 800, fontSize: "1.35rem" }}>500+</div>
                  <div style={{ color: "#6B7280", fontSize: "0.85rem" }}>Professionals trained</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-py" style={{ background: "#ffffff" }}>
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-1">
                <span className="section-label">What You Will Learn</span>
                <h2 className="mt-4 mb-4" style={{ color: "#111827" }}>A focused session with usable outcomes</h2>
                <p style={{ color: "#6B7280", lineHeight: 1.75, fontSize: "1.05rem" }}>
                  This is designed as a working session, not a theory lecture. You will leave with examples, templates, and a clear next action.
                </p>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                {takeaways.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl p-4" style={{ background: "#F8FAFC", border: "1px solid #E5E7EB" }}>
                    <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: "#0D9488" }} />
                    <span style={{ color: "#374151", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-py" style={{ background: "#F7F8FA" }}>
          <div className="container">
            <div className="text-center mb-12">
              <span className="section-label">Masterclass Library</span>
              <h2 className="mt-4 mb-4">Live and On-Demand Sessions</h2>
              <p className="max-w-2xl mx-auto" style={{ color: "#6B7280", fontSize: "1.1rem" }}>
                Start with the next live session or catch up through practical recordings.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <div key={session.title} className="rounded-2xl p-6 flex flex-col" style={{ background: "#ffffff", border: "1px solid #E5E7EB", boxShadow: "0 8px 28px rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: "rgba(13,148,136,0.10)", color: "#0D9488" }}>{session.date}</span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "#6B7280" }}><Clock size={13} /> {session.duration}</span>
                  </div>
                  <h3 className="mb-3" style={{ fontFamily: "'Sora', sans-serif", color: "#111827", fontSize: "1.2rem" }}>{session.title}</h3>
                  <p className="mb-6 flex-1" style={{ color: "#6B7280", lineHeight: 1.65 }}>{session.outcome}</p>
                  <Link href="/resources/webinars" className="inline-flex items-center gap-2 font-semibold" style={{ color: "#0D9488", textDecoration: "none", fontFamily: "'Sora', sans-serif" }}>
                    View Details <ArrowRight size={15} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-py" style={{ background: "#111827" }}>
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="section-label" style={{ color: "#0D9488" }}>Who It Is For</span>
                <h2 className="mt-4 mb-6" style={{ color: "#ffffff" }}>For professionals who need clarity, not hype</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {audience.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="shrink-0 mt-1" style={{ color: "#0D9488" }} />
                      <span style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <h3 className="mb-5" style={{ fontFamily: "'Sora', sans-serif", color: "#ffffff", fontSize: "1.6rem" }}>Included when you register</h3>
                <div className="space-y-4">
                  {[
                    { icon: PlayCircle, title: "Live masterclass access", text: "Join the session and ask questions in real time." },
                    { icon: Download, title: "Prompt and workflow resources", text: "Get the practical templates referenced during the session." },
                    { icon: MessageSquare, title: "Follow-up guidance", text: "Know what to do next based on your role and goals." },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(13,148,136,0.16)" }}>
                          <Icon size={20} style={{ color: "#0D9488" }} />
                        </div>
                        <div>
                          <div className="font-bold mb-1" style={{ color: "#ffffff", fontFamily: "'Sora', sans-serif" }}>{item.title}</div>
                          <div style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.6 }}>{item.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-py" style={{ background: "linear-gradient(135deg, #0D9488 0%, #16A34A 100%)" }}>
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="mb-4" style={{ color: "#ffffff" }}>Ready for the next AI masterclass?</h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.1rem", lineHeight: 1.7 }}>
              Reserve a seat, get the joining details, and start building practical AI skills you can use immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ReserveSeatButton
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold cursor-pointer border-0"
                style={{ background: "#ffffff", color: "#0D9488", fontFamily: "'Sora', sans-serif" }}
              />
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold" style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#ffffff", textDecoration: "none", fontFamily: "'Sora', sans-serif" }}>
                Ask a Question
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
