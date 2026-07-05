/**
 * TestimonialsSection — UpskillinTech v4 "Evergreen"
 * Credible, restrained quote cards on off-white: gold quote mark,
 * honest attributions, no decorative ratings.
 */
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "The workshop gave me a practical way to use AI at work without feeling overwhelmed. I left with prompts I could use the same week.",
    name: "Workshop attendee",
    role: "Operations professional",
    context: "AI Skills Workshop",
  },
  {
    quote:
      "The webinar made AI feel accessible. The examples were clear, grounded, and relevant to the work my team actually does.",
    name: "Webinar participant",
    role: "Team lead",
    context: "Live AI Webinar",
  },
  {
    quote:
      "I appreciated the responsible approach. It was not hype; it was a clear framework for deciding when AI helps and when a human should lead.",
    name: "Community leader",
    role: "Programme coordinator",
    context: "Responsible AI Session",
  },
  {
    quote:
      "The templates helped me move from experimenting with tools to building repeatable workflows for writing, planning, and reporting.",
    name: "Course participant",
    role: "Independent consultant",
    context: "AI Workflow Session",
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
    <section aria-label="Testimonials" className="section-py" style={{ background: "#F5FAF2", borderTop: "1px solid #E3EAE2", borderBottom: "1px solid #E3EAE2" }}>
      <div className="container" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label">What participants say</span>
          <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            Grounded, practical, and honest
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#5D6B60", lineHeight: 1.7 }}>
            Reflections from workshop attendees, webinar participants, and professionals
            learning practical AI adoption.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={t.context}
              className={`card-modern p-8 ${inView ? "animate-fade-up" : "opacity-0"}`}
              style={{
                animationDelay: `${i * 0.08}s`,
                animationFillMode: "forwards",
                margin: 0,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  color: "#D1A81D",
                  marginBottom: "0.75rem",
                }}
              >
                "
              </div>
              <blockquote style={{ margin: 0 }}>
                <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#17211A", fontFamily: "'DM Sans', sans-serif", marginBottom: "1.5rem" }}>
                  {t.quote}
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3" style={{ borderTop: "1px solid #EDF2EC", paddingTop: "1.25rem" }}>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#17211A" }}>{t.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#5D6B60", fontFamily: "'DM Sans', sans-serif", marginTop: "0.1rem" }}>
                    {t.role} · {t.context}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
