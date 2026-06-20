import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useNotifications } from "@/hooks/useNotifications";

const MASTERCLASS_TITLE = "AI Master Class: Build Practical AI Skills for Work";
const MASTERCLASS_PRICE = "£50 / ₦50,000";
const MASTERCLASS_TIME = "7PM UK Time | 8PM Nigeria Time";
const MASTERCLASS_DURATION = "90-minute live session";

const SESSIONS = [
  {
    label: "Session 1 — Saturday, 18 July 2026",
    webinarDate: "Saturday, 18 July 2026 - 7PM UK / 8PM Nigeria",
    shortDate: "Saturday, 18 July 2026",
  },
  {
    label: "Session 2 — Saturday, 25 July 2026",
    webinarDate: "Saturday, 25 July 2026 - 7PM UK / 8PM Nigeria",
    shortDate: "Saturday, 25 July 2026",
  },
];

export default function WebinarRegistration() {
  const { showNotification } = useNotifications();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSession, setSelectedSession] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });

  const registerMutation = trpc.webinar.register.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      showNotification("Registration Confirmed!", "Check your email for the Zoom link and session details.", "success");
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white/95 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-teal-600" />
            </div>
            <CardTitle className="text-3xl font-bold">You're Registered!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for registering for the AI Master Class with Dr. Amaka Adiuku.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">What's Next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>Check your email for the Zoom link and calendar invite</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>Mark your calendar for {session.shortDate}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a reminder email 24 hours before the session</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>Your 1-to-1 consultation with Dr. Amaka will be scheduled after the session</span>
                </li>
              </ul>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Can't find the email? Check your spam folder or contact us at{" "}
              <a href="mailto:amaka.adiuku@gmail.com" className="text-teal-600 hover:underline">
                amaka.adiuku@gmail.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto box-border w-full max-w-7xl overflow-hidden px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Flyer */}
          <div className="order-2 lg:order-1">
            <img
              src="/webinar-ai-skillset.png"
              alt="AI Master Class with Dr. Amaka Adiuku"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-6 rounded-xl bg-white/10 border border-white/20 p-5 text-white space-y-3">
              <p className="font-semibold text-base">What's included:</p>
              {[
                "Live 90-minute masterclass with Dr. Amaka Adiuku",
                "Practical AI workflow templates you keep forever",
                "Live Q&A during the session",
                "Recording access for 30 days",
                "1-to-1 follow-up consultation included",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div className="order-1 lg:order-2">
            <Card className="bg-white/95 backdrop-blur shadow-2xl">
              <CardHeader className="space-y-3">
                <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium w-fit">
                  AI Master Class — July 2026
                </div>
                <CardTitle className="text-3xl font-bold">Reserve Your Seat</CardTitle>
                <CardDescription className="text-base">
                  Secure your place for this live session with Dr. Amaka Adiuku
                </CardDescription>

                {/* Session picker */}
                <div className="pt-2 space-y-2">
                  <Label className="text-sm font-semibold">Choose your session *</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {SESSIONS.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSession(i)}
                        className="flex items-center gap-3 rounded-lg border p-3 text-left transition-all text-sm"
                        style={{
                          borderColor: selectedSession === i ? "#0D9488" : "#E5E7EB",
                          background: selectedSession === i ? "rgba(13,148,136,0.06)" : "#fff",
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                          style={{ borderColor: selectedSession === i ? "#0D9488" : "#D1D5DB" }}
                        >
                          {selectedSession === i && (
                            <div className="w-2 h-2 rounded-full bg-teal-600" />
                          )}
                        </div>
                        <span className="font-medium">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="font-medium">{MASTERCLASS_TIME}</div>
                      <div className="text-muted-foreground">{MASTERCLASS_DURATION}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="font-medium">Limited Spots Available</div>
                      <div className="text-muted-foreground">
                        {MASTERCLASS_PRICE} · includes 1-to-1 consultation
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="Your phone number" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Organisation (Optional)</Label>
                    <Input id="company" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Current Role (Optional)</Label>
                    <Input id="role" name="role" placeholder="e.g., Marketing Manager, Educator" value={formData.role} onChange={handleChange} />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-6 text-lg"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Registering..." : `Reserve Seat — ${MASTERCLASS_PRICE}`}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By registering, you'll receive the Zoom link and event updates via email.
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
