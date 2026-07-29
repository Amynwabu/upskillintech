/**
 * TestimonialsSection - "What Participants Are Saying"
 * Design: Dark slate background, testimonial cards with avatars
 */

import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "The workshop gave me a practical way to use AI at work without feeling overwhelmed. I left with prompts I could use the same week.",
    name: "Workshop attendee",
    role: "Operations professional",
    company: "AI Skills Workshop",
    initials: "WA",
    color: "#859D30",
  },
  {
    quote: "The webinar made AI feel accessible. The examples were clear, grounded, and relevant to the work my team actually does.",
    name: "Webinar participant",
    role: "Team lead",
    company: "Live AI Webinar",
    initials: "WP",
    color: "#859D30",
  },
  {
    quote: "I appreciated the responsible approach. It was not hype; it was a clear framework for deciding when AI helps and when a human should lead.",
    name: "Community leader",
    role: "Programme coordinator",
    company: "Responsible AI Session",
    initials: "CL",
    color: "#859D30",
  },
  {
    quote: "The templates helped me move from experimenting with tools to building repeatable workflows for writing, planning, and reporting.",
    name: "Course participant",
    role: "Independent consultant",
    company: "AI Workflow Session",
    initials: "CP",
    color: "#859D30",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

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
        <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="section-label mb-3" style={{ color: "#859D30" }}>Social Proof</div>
          <h2 className="mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white", lineHeight: 1.2 }}>
            What Participants{" "}
            <span style={{ background: "linear-gradient(135deg, #859D30, #859D30)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Are Saying
            </span>
          </h2>
          <p className="text-lg" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>
            Short reflections from workshop attendees, webinar participants, and professionals learning practical AI adoption.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={`${t.name}-${t.company}`}
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
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} fill="#859D30" style={{ color: "#859D30" }} />
                ))}
              </div>

              <Quote size={20} className="mb-3 opacity-40" style={{ color: t.color }} />
              <p className="text-base mb-6 leading-relaxed" style={{ color: "#CBD5E1", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: t.color, fontFamily: "'Sora', sans-serif" }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>{t.role} - {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
