import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useNotifications } from "@/hooks/useNotifications";

export default function WebinarRegistration() {
  const { showNotification } = useNotifications();
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      showNotification("Registration Successful!", "Check your email for the Zoom link and webinar details.", "success");
    },
    onError: (error) => {
      showNotification("Registration Failed", error.message || "Please try again later.", "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      ...formData,
      webinarTitle: "Build the Right AI Skillset",
      webinarDate: "Saturday, 17 January 2026 - 7PM UK / 8PM Nigeria",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white/95 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-teal-600" />
            </div>
            <CardTitle className="text-3xl font-bold">You're Registered!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for registering for "Build the Right AI Skillset" webinar.
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
                  <span>Mark your calendar for Saturday, 17 January 2026</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a reminder email 24 hours before the webinar</span>
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
      {/* Hero Section with Flyer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Webinar Flyer */}
          <div className="order-2 lg:order-1">
            <img
              src="/webinar-ai-skillset.png"
              alt="Build the Right AI Skillset Webinar"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>

          {/* Registration Form */}
          <div className="order-1 lg:order-2">
            <Card className="bg-white/95 backdrop-blur shadow-2xl">
              <CardHeader className="space-y-3">
                <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium w-fit">
                  ✨ AI-Powered Career Transformation
                </div>
                <CardTitle className="text-3xl font-bold">
                  Register for Free Webinar
                </CardTitle>
                <CardDescription className="text-base">
                  Secure your spot for this exclusive live session with Dr. Amaka Adiuku
                </CardDescription>

                {/* Event Details */}
                <div className="grid grid-cols-1 gap-3 pt-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="font-medium">Saturday, 17 January 2026</div>
                      <div className="text-muted-foreground">Mark your calendar</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="font-medium">7PM UK Time | 8PM Nigeria Time</div>
                      <div className="text-muted-foreground">90-minute live session</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="font-medium">Limited Spots Available</div>
                      <div className="text-muted-foreground">Register now to secure your seat</div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization (Optional)</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Current Role (Optional)</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="e.g., Marketing Manager, Software Developer"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-6 text-lg"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Registering..." : "Secure Your Free Slot Now"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By registering, you'll receive the Zoom link and event updates via email.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card className="mt-6 bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "What AI can do for you",
                    "Use AI in daily work",
                    "Kick-start your niche with AI",
                    "Launch into jobs: from AI-ready CVs to applications and interviews that win the right roles",
                    "Free tools you can use immediately",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
