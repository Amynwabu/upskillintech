/**
 * TestimonialsSection — "What Participants Are Saying"
 * Design: Dark slate background, testimonial cards with avatars, company logos
 */

import { useRef, useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Before UpskillinTech I was overwhelmed by AI. Now I use AI daily in my workflow and I've saved at least 6 hours every week.",
    name: "Sarah Mitchell",
    role: "Business Transformation Lead",
    company: "Accenture",
    initials: "SM",
    color: "#0D9488",
  },
  {
    quote: "This program helped our entire team save hours weekly. The structured approach made all the difference — we went from random AI experiments to real workflows.",
    name: "James Chen",
    role: "Operations Manager",
    company: "Deloitte",
    initials: "JC",
    color: "#16A34A",
  },
  {
    quote: "As a pastor and community leader, I didn't think AI was for me. UpskillinTech changed that. I now use AI for sermon prep, admin, and community communications.",
    name: "Pastor David Okafor",
    role: "Community Leader",
    company: "Grace Community Church",
    initials: "DO",
    color: "#7C3AED",
  },
  {
    quote: "The AI workflow templates alone were worth the investment. Our consulting team now delivers reports 40% faster and clients are noticing the difference.",
    name: "Priya Sharma",
    role: "Senior Consultant",
    company: "McKinsey",
    initials: "PS",
    color: "#D97706",
  },
];

const companies = ["Microsoft", "Google", "Deloitte", "Accenture", "McKinsey", "IBM"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 lg:py-28" style={{ background: "#0F172A" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="section-label mb-3" style={{ color: "#0D9488" }}>Social Proof</div>
          <h2 className="mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white", lineHeight: 1.2 }}>
            What Participants{" "}
            <span style={{ background: "linear-gradient(135deg, #0D9488, #16A34A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Are Saying
            </span>
          </h2>
          <p className="text-lg" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>
            Real results from real professionals who've gone through the program.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-xl p-7 transition-all duration-300 hover:scale-[1.02] ${inView ? "animate-fade-up" : "opacity-0"}`}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTopColor: t.color,
                borderTopWidth: "3px",
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#D97706" style={{ color: "#D97706" }} />)}
              </div>

              {/* Quote */}
              <Quote size={20} className="mb-3 opacity-40" style={{ color: t.color }} />
              <p className="text-base mb-6 leading-relaxed" style={{ color: "#CBD5E1", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: t.color, fontFamily: "'Sora', sans-serif" }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-center text-sm mb-6" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
            PARTICIPANTS FROM LEADING ORGANIZATIONS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {companies.map((company) => (
              <div key={company} className="text-lg font-bold opacity-30 hover:opacity-60 transition-opacity" style={{ color: "white", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
