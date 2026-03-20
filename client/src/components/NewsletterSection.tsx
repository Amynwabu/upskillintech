/**
 * NewsletterSection — UpskillinTech v3
 * Green → golden green → yellow gradient, dark text, larger form inputs
 */
import { useState } from "react";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

const perks = [
  "Weekly AI tool reviews",
  "Free workflow templates",
  "Exclusive training discounts",
  "Community event invites",
];

export default function NewsletterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const subscribeMutation = trpc.forms.subscribe.useMutation({
    onSuccess: () => {
      toast.success("You're subscribed! Check your inbox for a confirmation.");
      setName("");
      setEmail("");
    },
    onError: (err: { message?: string }) => toast.error(err.message || "Subscription failed. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate({ firstName: name, email });
  };

  return (
    <section id="lead-magnet" className="section-py" style={{ background: "linear-gradient(135deg, #38B54A 0%, #8B9E1A 50%, #E6B800 100%)" }}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.20)" }}>
              <Mail size={16} style={{ color: "#111827" }} />
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#111827" }}>
                Free Newsletter
              </span>
            </div>
            <h2 className="mb-4" style={{ color: "#111827" }}>
              Stay Ahead in the AI Era
            </h2>
            <p style={{ fontSize: "1.15rem", color: "rgba(0,0,0,0.65)", lineHeight: 1.7 }}>
              Subscribe to the UpskillinTech newsletter for AI insights, practical workflows, and strategies delivered to your inbox.
            </p>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.18)" }}>
                <CheckCircle size={15} style={{ color: "#111827", flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#111827" }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-xl px-5 py-4 outline-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                border: "none",
                color: "#111827",
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-xl px-5 py-4 outline-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                border: "none",
                color: "#111827",
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            <button
              type="submit"
              className="shrink-0 font-bold rounded-xl px-8 py-4 transition-all duration-200"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "1rem",
                background: "#111827",
                color: "#ffffff",
                border: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#1f2937"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#111827"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-center mt-4" style={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.55)" }}>
            No spam. Unsubscribe anytime. Join 1,000+ professionals already subscribed.
          </p>
        </div>
      </div>
    </section>
  );
}
