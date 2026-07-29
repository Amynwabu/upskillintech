import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Calendar, Clock, Users, ArrowLeft, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useNotifications } from "@/hooks/useNotifications";

const MASTERCLASS_TITLE = "Build, Brand & Grow with AI";
const MASTERCLASS_SUBTITLE = "Transform Your Knowledge into a Business, Brand & Revenue Stream";
const MASTERCLASS_TIME = "2PM – 4PM Europe/London";
const MASTERCLASS_DURATION = "2-hour live hands-on session";
const MASTERCLASS_PRICE = "£50 / ₦50,000";

const SESSIONS = [
  {
    label: "Session 1 — Saturday, 18 July 2026",
    webinarDate: "Saturday, 18 July 2026 - 2PM Europe/London",
    shortDate: "18 July 2026",
  },
  {
    label: "Session 2 — Saturday, 25 July 2026",
    webinarDate: "Saturday, 25 July 2026 - 2PM Europe/London",
    shortDate: "25 July 2026",
  },
];

const CURRICULUM = [
  { emoji: "💡", text: "Discover profitable business opportunities" },
  { emoji: "🎯", text: "Identify and attract your ideal audience" },
  { emoji: "📋", text: "Create a professional business plan" },
  { emoji: "🎨", text: "Build a memorable brand" },
  { emoji: "🌐", text: "Launch your website" },
  { emoji: "📅", text: "Generate 30 days of content in minutes" },
  { emoji: "🎥", text: "Create videos, podcasts and marketing assets" },
  { emoji: "⚙️", text: "Automate repetitive tasks and workflows" },
  { emoji: "📈", text: "Grow your business with AI" },
];

export default function WebinarRegistration() {
  const { showNotification } = useNotifications();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSession, setSelectedSession] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", role: "" });

  const registerMutation = trpc.webinar.register.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      showNotification("Registration Confirmed!", "Check your email for your joining details.", "success");
    },
    onError: (error) => {
      showNotification("Registration Failed", error.message || "Please try again later.", "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const session = SESSIONS[selectedSession];
    registerMutation.mutate({
      ...formData,
      webinarTitle: MASTERCLASS_TITLE,
      webinarDate: session.webinarDate,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    const session = SESSIONS[selectedSession];
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #859D30 0%, #111827 60%)" }}>
        <Card className="max-w-2xl w-full bg-[#07100B]/97 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(133, 157, 48,0.12)" }}>
              <CheckCircle2 className="w-12 h-12" style={{ color: "#859D30" }} />
            </div>
            <CardTitle className="text-3xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6" }}>
              You're Registered!
            </CardTitle>
            <CardDescription className="text-base" style={{ color: "#9CA3AF" }}>
              You've secured your seat for <strong>{MASTERCLASS_TITLE}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl p-5 space-y-3" style={{ background: "#07100B", border: "1px solid #1F2937" }}>
              <div className="flex items-center gap-2 font-semibold" style={{ color: "#F3F4F6", fontFamily: "'Sora', sans-serif" }}>
                <Calendar className="w-4 h-4" style={{ color: "#859D30" }} /> {session.shortDate} · 2PM – 4PM Europe/London
              </div>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>What happens next:</p>
              <ul className="space-y-2">
                {[
                  "Check your email for the Zoom link and calendar invite",
                  `Mark your calendar: ${session.label}`,
                  "You'll receive a reminder 24 hours before the session",
                  "Your free 1-on-1 AI Transformation Session will be booked after the class",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#D1D5DB" }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#859D30" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
              Can't find the email? Check your spam folder or contact{" "}
              <a href="mailto:amaka.adiuku@gmail.com" style={{ color: "#859D30" }}>amaka.adiuku@gmail.com</a>
            </p>
            <Link href="/masterclass" className="block text-center text-sm font-semibold" style={{ color: "#859D30" }}>
              ← Back to Masterclass page
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #07100B 0%, #111827 50%, #07100B 100%)" }}>
      {/* Back link */}
      <div className="container pt-6">
        <Link href="/masterclass" className="inline-flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Back to Masterclass
        </Link>
      </div>

      <div className="container py-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 items-start max-w-6xl mx-auto">

          {/* ── Left: Masterclass info ── */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(133, 157, 48,0.20)", border: "1px solid rgba(133, 157, 48,0.35)" }}>
              <Sparkles size={14} style={{ color: "#859D30" }} />
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#5EEAD4" }}>
                AI Transformation Master Class — July 2026
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: "#ffffff" }}>
                {MASTERCLASS_TITLE}
              </h1>
              <p className="mt-3 text-lg" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>
                {MASTERCLASS_SUBTITLE}
              </p>
            </div>

            {/* Session dates */}
            <div className="flex flex-col sm:flex-row gap-3">
              {SESSIONS.map((s) => (
                <div key={s.shortDate} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <Calendar size={16} style={{ color: "#859D30", flexShrink: 0 }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#ffffff", fontFamily: "'Sora', sans-serif" }}>{s.shortDate}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.50)" }}>{MASTERCLASS_TIME}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* What you will learn */}
            <div>
              <h2 className="mb-5" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#ffffff" }}>
                What You Will Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {CURRICULUM.map((item) => (
                  <div key={item.text} className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <span className="text-xl leading-none mt-0.5">{item.emoji}</span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.55 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 1-on-1 bonus */}
            <div className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "rgba(133, 157, 48,0.10)", border: "1px solid rgba(133, 157, 48,0.25)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(133, 157, 48,0.20)" }}>
                <Gift size={20} style={{ color: "#859D30" }} />
              </div>
              <div>
                <div className="font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", color: "#859D30" }}>Exclusive Bonus — Included Free</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.70)", lineHeight: 1.6 }}>
                  Every participant gets a free 1-on-1 AI Transformation Session — a personalised session tailored to your business, career, and goals.
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Registration form ── */}
          <div>
            <Card className="shadow-2xl" style={{ background: "rgba(255,255,255,0.97)" }}>
              <CardHeader className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold w-fit" style={{ background: "rgba(133, 157, 48,0.12)", color: "#859D30", fontFamily: "'Sora', sans-serif" }}>
                  Limited Seats Available
                </div>
                <CardTitle style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.6rem", color: "#F3F4F6" }}>
                  Reserve Your Seat
                </CardTitle>
                <CardDescription style={{ color: "#9CA3AF" }}>
                  Secure your place for a live, hands-on session
                </CardDescription>

                {/* Session picker */}
                <div className="pt-1 space-y-2">
                  <Label className="text-sm font-semibold" style={{ color: "#D1D5DB" }}>Choose your session *</Label>
                  <div className="space-y-2">
                    {SESSIONS.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSession(i)}
                        className="w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all text-sm"
                        style={{
                          borderColor: selectedSession === i ? "#859D30" : "#E5E7EB",
                          background: selectedSession === i ? "rgba(133, 157, 48,0.06)" : "#fff",
                        }}
                      >
                        <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center" style={{ borderColor: selectedSession === i ? "#859D30" : "#D1D5DB" }}>
                          {selectedSession === i && <div className="w-2 h-2 rounded-full" style={{ background: "#859D30" }} />}
                        </div>
                        <div>
                          <div className="font-semibold" style={{ color: "#F3F4F6", fontFamily: "'Sora', sans-serif" }}>{s.label}</div>
                          <div className="text-xs" style={{ color: "#9CA3AF" }}>{MASTERCLASS_TIME} · {MASTERCLASS_DURATION}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 pt-1 rounded-xl p-3" style={{ background: "#07100B", border: "1px solid #1F2937" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(133, 157, 48,0.12)" }}>
                    <Users size={16} style={{ color: "#859D30" }} />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold" style={{ color: "#F3F4F6" }}>{MASTERCLASS_PRICE}</div>
                    <div style={{ color: "#9CA3AF" }}>Includes free 1-on-1 session</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" placeholder="e.g. Amaka Obi" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number <span style={{ color: "#9CA3AF" }}>(optional)</span></Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+44 or +234" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company">Company / Organisation <span style={{ color: "#9CA3AF" }}>(optional)</span></Label>
                    <Input id="company" name="company" placeholder="Your company" value={formData.company} onChange={handleChange} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="role">Current Role <span style={{ color: "#9CA3AF" }}>(optional)</span></Label>
                    <Input id="role" name="role" placeholder="e.g. Marketing Manager, Founder" value={formData.role} onChange={handleChange} />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-white font-bold py-6 text-base"
                    style={{ background: "linear-gradient(135deg, #859D30 0%, #859D30 100%)", border: "none", fontFamily: "'Sora', sans-serif" }}
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Registering…" : `Reserve My Seat — ${MASTERCLASS_PRICE}`}
                  </Button>

                  <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                    By registering you'll receive the Zoom link and session updates by email.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
