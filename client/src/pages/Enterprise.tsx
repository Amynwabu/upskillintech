/**
 * Enterprise Page — /enterprise
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Accent Yellow (#E6B800)
 * Typography: Poppins (headings) + Inter (body)
 * Sections: Hero, Services, Industries, Engagement Model, Case Studies, Consultation CTA
 */

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Users, Lightbulb, Workflow, Building2, GraduationCap, Heart, Church,
  FlaskConical, CheckCircle, ArrowRight, Star, MessageSquare, Calendar,
  Mic, TrendingUp, Clock, BarChart3, Send, ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// Animated counter hook
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Intersection observer hook
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const services = [
  {
    icon: Users,
    title: "AI Productivity Training",
    tagline: "Develop AI skills for teams.",
    description:
      "Practical, hands-on training that helps your team understand how AI improves everyday work — from research and analysis to communication and documentation.",
    topics: [
      "AI literacy for professionals",
      "AI-assisted research and analysis",
      "AI-supported communication and documentation",
      "Productivity systems using AI tools",
    ],
    formats: ["Workshops", "Training sessions", "Customised team programmes"],
    color: "#38B54A",
  },
  {
    icon: Lightbulb,
    title: "AI Strategy Workshops",
    tagline: "Understand how AI affects your organisation.",
    description:
      "Leadership-focused workshops that help decision-makers understand AI implications, identify opportunities, and develop a responsible AI adoption strategy.",
    topics: [
      "AI trends affecting your industry",
      "Identifying opportunities for AI adoption",
      "Responsible AI use and governance",
      "Integrating AI into organisational strategy",
    ],
    formats: ["Half-day workshops", "Executive briefings", "Board presentations"],
    color: "#8B9E1A",
  },
  {
    icon: Workflow,
    title: "AI Workflow Implementation",
    tagline: "Design AI-powered productivity systems.",
    description:
      "Collaborative engagements that help your organisation design and implement practical AI-powered workflows — reducing repetitive tasks and enhancing decision-making.",
    topics: [
      "Meeting management: AI summary → action items → communication",
      "Research workflows: question → AI insights → structured report",
      "Content and documentation: idea → AI draft → final document",
      "Operational process automation and optimisation",
    ],
    formats: ["Process audits", "Workflow design sprints", "Implementation support"],
    color: "#E6B800",
  },
];

const industries = [
  {
    icon: Building2,
    title: "Corporate Organisations",
    description:
      "Teams seeking productivity improvements, workflow automation, and AI-enabled decision-making across departments.",
    examples: ["Finance teams", "Marketing departments", "Operations and logistics", "HR and talent management"],
  },
  {
    icon: GraduationCap,
    title: "Educational Institutions",
    description:
      "Universities, colleges, and schools exploring AI literacy, teaching innovation, and administrative efficiency.",
    examples: ["Higher education institutions", "Secondary schools", "Training providers", "Professional development bodies"],
  },
  {
    icon: Heart,
    title: "Nonprofit Organisations",
    description:
      "Organisations seeking to improve communication, reporting, and operational efficiency with limited resources.",
    examples: ["Charities and foundations", "Social enterprises", "Community development organisations", "Advocacy groups"],
  },
  {
    icon: Church,
    title: "Churches and Ministries",
    description:
      "Faith-based organisations exploring AI-supported teaching, administration, and community communication.",
    examples: ["Church administration", "Ministry communications", "Community outreach", "Faith-based education"],
  },
  {
    icon: FlaskConical,
    title: "Research Institutions",
    description:
      "Teams exploring AI-assisted knowledge discovery, literature review, and data analysis to accelerate research.",
    examples: ["Academic research teams", "Think tanks", "Policy institutes", "Innovation labs"],
  },
];

const engagementModels = [
  {
    icon: MessageSquare,
    title: "Workshops",
    description:
      "Short, interactive sessions introducing AI productivity systems and practical tools. Ideal for teams looking to build foundational AI awareness quickly.",
    duration: "Half-day or full-day",
    ideal: "Teams of 10–50",
    outcomes: ["AI awareness", "Practical tool exposure", "Workflow ideas"],
  },
  {
    icon: GraduationCap,
    title: "Training Programmes",
    description:
      "Structured learning experiences for teams and departments, delivered over multiple sessions with practical exercises and real-world application.",
    duration: "4–8 weeks",
    ideal: "Departments and teams",
    outcomes: ["AI skills development", "Workflow integration", "Measurable productivity gains"],
  },
  {
    icon: Lightbulb,
    title: "Strategic Consulting",
    description:
      "Collaborative engagements that help organisations explore AI adoption strategies, identify opportunities, and design AI-powered workflow systems.",
    duration: "Ongoing or project-based",
    ideal: "Leadership teams",
    outcomes: ["AI strategy", "Workflow design", "Implementation roadmap"],
  },
  {
    icon: Mic,
    title: "Speaking Engagements",
    description:
      "Presentations and keynote sessions exploring AI transformation, the future of work, and practical AI adoption for conferences and events.",
    duration: "30–90 minutes",
    ideal: "Conferences and events",
    outcomes: ["Thought leadership", "AI awareness", "Audience engagement"],
  },
];

const caseStudies = [
  {
    category: "Professional Productivity",
    icon: TrendingUp,
    title: "Reducing Documentation Time by 60%",
    organisation: "Professional Services Team",
    industry: "Corporate",
    challenge:
      "A professional services team was spending 40% of their working week on documentation, reporting, and internal communications — leaving little time for high-value client work.",
    approach:
      "UpskillinTech delivered a two-day AI Productivity Training workshop followed by a workflow implementation sprint. The team learned to use AI tools for meeting summaries, report drafting, and email communication.",
    results: [
      "60% reduction in time spent on documentation",
      "Team members saving 8–10 hours per week",
      "Improved quality and consistency of client reports",
      "Increased team confidence in using AI tools",
    ],
    quote:
      "The training completely changed how we work. What used to take a full day now takes a couple of hours.",
    author: "Operations Manager",
    color: "#38B54A",
  },
  {
    category: "Organisational Transformation",
    icon: BarChart3,
    title: "Building an AI-Ready Organisation",
    organisation: "Mid-Size Educational Institution",
    industry: "Education",
    challenge:
      "An educational institution wanted to integrate AI into their administrative and teaching processes but lacked a clear strategy and the internal capability to lead the change.",
    approach:
      "UpskillinTech delivered an AI Strategy Workshop for the leadership team, followed by a structured AI Productivity Training programme for administrative staff and educators.",
    results: [
      "Leadership team developed a 12-month AI adoption roadmap",
      "Administrative staff reduced reporting time by 45%",
      "Educators began integrating AI into lesson planning and feedback",
      "Institution established an internal AI champion network",
    ],
    quote:
      "UpskillinTech helped us move from AI curiosity to a clear, confident strategy. Our team now leads AI adoption rather than reacting to it.",
    author: "Head of Operations",
    color: "#8B9E1A",
  },
  {
    category: "Leadership and Education",
    icon: Clock,
    title: "AI Literacy for Faith Community Leaders",
    organisation: "Regional Church Network",
    industry: "Faith Community",
    challenge:
      "A regional church network wanted to help their leaders and administrators understand how AI could support ministry operations, community communication, and pastoral care — without compromising their values.",
    approach:
      "UpskillinTech designed a bespoke AI Literacy Workshop series for church leaders and administrators, focusing on practical, values-aligned AI applications for communication, administration, and community engagement.",
    results: [
      "Leaders gained confidence in understanding and discussing AI",
      "Administrative teams reduced communication preparation time by 50%",
      "Network developed AI usage guidelines aligned with their values",
      "Expanded community outreach through AI-supported content creation",
    ],
    quote:
      "UpskillinTech understood our context and values. The training was practical, relevant, and helped us use AI in a way that felt right for our community.",
    author: "Network Director",
    color: "#E6B800",
  },
];

const inquiryTypes = [
  "AI Productivity Training",
  "AI Strategy Workshop",
  "AI Workflow Implementation",
  "Speaking Engagement",
  "General Enquiry",
];

export default function Enterprise() {
  const { ref: statsRef, inView: statsInView } = useInView();
  const orgsCount = useCountUp(50, 2000, statsInView);
  const profCount = useCountUp(1000, 2000, statsInView);
  const satisfactionCount = useCountUp(95, 2000, statsInView);
  const hoursCount = useCountUp(8, 2000, statsInView);

  const [form, setForm] = useState({
    name: "", email: "", organisation: "", role: "", inquiryType: "", message: "",
  });
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const consultMutation = trpc.forms.consultation.useMutation({
    onSuccess: () => {
      toast.success("Thank you! We'll be in touch within 2 business days.");
      setForm({ name: "", email: "", organisation: "", role: "", inquiryType: "", message: "" });
    },
    onError: (err: { message?: string }) => toast.error(err.message || "Submission failed. Please try again."),
  });
  const submitting = consultMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.organisation) {
      toast.error("Please fill in all required fields.");
      return;
    }
    consultMutation.mutate({
      name: form.name,
      email: form.email,
      organisation: form.organisation,
      role: form.role,
      message: form.message,
    });
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-0 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #E6B800 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center pb-0">
          {/* Left */}
          <div className="text-gray-900 py-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
              style={{ background: "rgba(255,255,255,0.2)", color: "#1C1C1C" }}>
              Enterprise AI Solutions
            </div>
            <h1 className="font-poppins font-bold text-4xl lg:text-5xl leading-tight mb-6">
              Helping Organisations<br />Become AI-Enabled
            </h1>
            <p className="text-lg opacity-90 mb-4 leading-relaxed">
              UpskillinTech helps teams and leaders integrate AI into workflows,
              decision-making, and productivity systems — not just as a concept,
              but as a daily operational practice.
            </p>
            <p className="text-base opacity-80 mb-8 leading-relaxed">
              Our enterprise programmes combine AI literacy, practical workflows,
              and strategic insights to support responsible and effective AI adoption
              across your organisation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all"
                style={{ background: "#E6B800", color: "#1C1C1C" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#d4a800")}
                onMouseLeave={e => (e.currentTarget.style.background = "#E6B800")}
              >
                Request Consultation <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm border-2 border-green-600 text-gray-900 transition-all hover:bg-white"
                style={{}}
                onMouseEnter={e => { e.currentTarget.style.color = "#38B54A"; e.currentTarget.style.background = "#f0fdf4"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#38B54A"; e.currentTarget.style.background = "transparent"; }}
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Right — enterprise image */}
          <div className="relative hidden lg:flex justify-end items-end">
            <div className="relative rounded-t-2xl overflow-hidden shadow-2xl" style={{ width: "100%", maxWidth: 520, height: 420 }}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Enterprise AI training workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(56,181,74,0.4) 0%, transparent 60%)" }} />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#38B54A" }}>
                  <Building2 size={18} color="#fff" />
                </div>
                <div>
                  <p className="font-poppins font-bold text-sm" style={{ color: "#1C1C1C" }}>50+ Organisations</p>
                  <p className="text-xs" style={{ color: "#666" }}>Engaged with UpskillinTech</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className="max-w-6xl mx-auto px-4 lg:px-8 mt-0">
          <div className="rounded-t-2xl grid grid-cols-2 lg:grid-cols-4 gap-0 overflow-hidden"
            style={{ background: "linear-gradient(90deg, #8B9E1A 0%, #A8C038 50%, #E6B800 100%)" }}>
            {[
              { value: `${orgsCount}+`, label: "Organisations Engaged" },
              { value: `${profCount}+`, label: "Professionals Trained" },
              { value: `${satisfactionCount}%`, label: "Satisfaction Rate" },
              { value: `${hoursCount}+`, label: "Hours Saved Per Week" },
            ].map((stat, i) => (
              <div key={i} className="py-5 px-6 text-center border-r border-green-600/20 last:border-0">
                <p className="font-poppins font-bold text-2xl lg:text-3xl" style={{ color: "#1C1C1C" }}>{stat.value}</p>
                <p className="text-xs font-medium mt-1" style={{ color: "#2a2a2a" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>Enterprise Services</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              What We Offer Organisations
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#555" }}>
              Three core service areas designed to build AI capability, develop strategy,
              and implement practical AI-powered systems across your organisation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isExpanded = expandedService === i;
              return (
                <div key={i} className="rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl"
                  style={{ borderColor: "#e8e8e8" }}>
                  {/* Top accent */}
                  <div className="h-1.5" style={{ background: service.color }} />
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${service.color}15` }}>
                      <Icon size={26} style={{ color: service.color }} />
                    </div>
                    <h3 className="font-poppins font-bold text-xl mb-2" style={{ color: "#1C1C1C" }}>{service.title}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: service.color }}>{service.tagline}</p>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#555" }}>{service.description}</p>

                    {/* Topics */}
                    <ul className="space-y-2 mb-5">
                      {service.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#444" }}>
                          <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: service.color }} />
                          {topic}
                        </li>
                      ))}
                    </ul>

                    {/* Formats toggle */}
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : i)}
                      className="flex items-center gap-1 text-xs font-semibold mb-3 transition-colors"
                      style={{ color: service.color }}
                    >
                      Delivery Formats <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    {isExpanded && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {service.formats.map((f, k) => (
                          <span key={k} className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{ background: `${service.color}15`, color: service.color }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    )}

                    <a href="#consultation"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                      style={{ color: service.color }}>
                      Request This Service <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────────── */}
      <section id="industries" className="section-py" style={{ background: "#f8faf8" }}>
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>Industries We Serve</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              Working Across Sectors
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#555" }}>
              UpskillinTech works with a wide range of organisations exploring AI integration —
              from corporate teams to faith communities and research institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              const colors = ["#38B54A", "#8B9E1A", "#E6B800", "#38B54A", "#8B9E1A"];
              const color = colors[i % colors.length];
              return (
                <div key={i} className="bg-white rounded-2xl p-7 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "#e8e8e8" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}15` }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="font-poppins font-bold text-lg mb-2" style={{ color: "#1C1C1C" }}>{industry.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>{industry.description}</p>
                  <div className="space-y-1.5">
                    {industry.examples.map((ex, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs" style={{ color: "#777" }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Engagement Models ────────────────────────────────────────────── */}
      <section id="engagement" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>How We Work</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              How We Work With Organisations
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#555" }}>
              Flexible engagement models designed to meet your organisation where it is —
              whether you need a quick introduction or a deep strategic partnership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {engagementModels.map((model, i) => {
              const Icon = model.icon;
              const colors = ["#38B54A", "#8B9E1A", "#E6B800", "#38B54A"];
              const color = colors[i % colors.length];
              return (
                <div key={i} className="flex gap-6 p-7 rounded-2xl border transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: "#e8e8e8" }}>
                  <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}15` }}>
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins font-bold text-lg mb-1" style={{ color: "#1C1C1C" }}>{model.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>{model.description}</p>
                    <div className="flex flex-wrap gap-4 mb-4 text-xs" style={{ color: "#777" }}>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} style={{ color }} /> {model.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} style={{ color }} /> {model.ideal}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {model.outcomes.map((o, j) => (
                        <span key={j} className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: `${color}15`, color }}>
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Case Studies ─────────────────────────────────────────────────── */}
      <section id="case-studies" className="section-py" style={{ background: "#1C1C1C" }}>
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "rgba(56,181,74,0.15)", color: "#38B54A" }}>Real Applications</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4 text-white">
              Organisations Transforming with AI
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#aaa" }}>
              Real-world examples of how organisations are integrating AI into their
              workflows, leadership, and operations with UpskillinTech support.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => {
              const Icon = cs.icon;
              return (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#2a2a2a" }}>
                  {/* Top accent */}
                  <div className="h-1.5" style={{ background: cs.color }} />
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${cs.color}20` }}>
                        <Icon size={18} style={{ color: cs.color }} />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: cs.color }}>{cs.category}</span>
                    </div>
                    <h3 className="font-poppins font-bold text-lg mb-1 text-white">{cs.title}</h3>
                    <p className="text-xs mb-4" style={{ color: "#888" }}>
                      {cs.organisation} · {cs.industry}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.color }}>Challenge</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#bbb" }}>{cs.challenge}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.color }}>Results</p>
                      <ul className="space-y-1.5">
                        {cs.results.map((r, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#bbb" }}>
                            <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: cs.color }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quote */}
                    <div className="rounded-xl p-4 mt-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <Star size={14} style={{ color: cs.color }} className="mb-2" />
                      <p className="text-sm italic leading-relaxed mb-2" style={{ color: "#ddd" }}>
                        "{cs.quote}"
                      </p>
                      <p className="text-xs font-semibold" style={{ color: cs.color }}>— {cs.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Consultation CTA + Form ───────────────────────────────────────── */}
      <section id="consultation" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — copy */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
                style={{ background: "#f0faf0", color: "#38B54A" }}>Request a Consultation</span>
              <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-5" style={{ color: "#1C1C1C" }}>
                Explore AI Opportunities for Your Organisation
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#555" }}>
                Schedule a consultation to discuss how UpskillinTech can support your team.
                During this discussion, we will understand your organisational goals,
                identify potential AI opportunities, and recommend appropriate programmes or workshops.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { step: "01", title: "Share Your Goals", desc: "Tell us about your organisation, team, and what you want to achieve with AI." },
                  { step: "02", title: "Identify Opportunities", desc: "We'll explore where AI can add the most value in your workflows and operations." },
                  { step: "03", title: "Recommend a Path", desc: "We'll recommend the most appropriate programme, workshop, or engagement model." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-sm text-white"
                      style={{ background: "#38B54A" }}>
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color: "#1C1C1C" }}>{item.title}</p>
                      <p className="text-sm" style={{ color: "#666" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="rounded-xl p-5 border" style={{ borderColor: "#e8e8e8", background: "#f8faf8" }}>
                <p className="font-semibold text-sm mb-3" style={{ color: "#1C1C1C" }}>What to expect:</p>
                {[
                  "Response within 2 business days",
                  "No obligation — just a conversation",
                  "Tailored recommendations for your context",
                  "Flexible engagement models to suit your budget",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm mb-2" style={{ color: "#555" }}>
                    <CheckCircle size={14} style={{ color: "#38B54A" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="rounded-2xl border p-8 shadow-sm" style={{ borderColor: "#e8e8e8" }}>
              <h3 className="font-poppins font-bold text-xl mb-6" style={{ color: "#1C1C1C" }}>
                Request a Consultation
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>
                      Name <span style={{ color: "#38B54A" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2"
                      style={{ borderColor: "#ddd", color: "#1C1C1C" }}
                      onFocus={e => (e.target.style.borderColor = "#38B54A")}
                      onBlur={e => (e.target.style.borderColor = "#ddd")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>
                      Email <span style={{ color: "#38B54A" }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
                      style={{ borderColor: "#ddd", color: "#1C1C1C" }}
                      onFocus={e => (e.target.style.borderColor = "#38B54A")}
                      onBlur={e => (e.target.style.borderColor = "#ddd")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>
                    Organisation <span style={{ color: "#38B54A" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your organisation name"
                    value={form.organisation}
                    onChange={e => setForm({ ...form, organisation: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
                    style={{ borderColor: "#ddd", color: "#1C1C1C" }}
                    onFocus={e => (e.target.style.borderColor = "#38B54A")}
                    onBlur={e => (e.target.style.borderColor = "#ddd")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>Role</label>
                  <input
                    type="text"
                    placeholder="e.g. CEO, Head of Operations, HR Manager"
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
                    style={{ borderColor: "#ddd", color: "#1C1C1C" }}
                    onFocus={e => (e.target.style.borderColor = "#38B54A")}
                    onBlur={e => (e.target.style.borderColor = "#ddd")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>Enquiry Type</label>
                  <select
                    value={form.inquiryType}
                    onChange={e => setForm({ ...form, inquiryType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
                    style={{ borderColor: "#ddd", color: form.inquiryType ? "#1C1C1C" : "#999" }}
                    onFocus={e => (e.target.style.borderColor = "#38B54A")}
                    onBlur={e => (e.target.style.borderColor = "#ddd")}
                  >
                    <option value="">Select enquiry type</option>
                    {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>
                    Message <span style={{ color: "#38B54A" }}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your organisation and what you'd like to explore..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all resize-none"
                    style={{ borderColor: "#ddd", color: "#1C1C1C" }}
                    onFocus={e => (e.target.style.borderColor = "#38B54A")}
                    onBlur={e => (e.target.style.borderColor = "#ddd")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all disabled:opacity-60"
                  style={{ background: "#38B54A", color: "#fff" }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = "#2ea040"; }}
                  onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = "#38B54A"; }}
                >
                  {submitting ? "Sending…" : <><Send size={15} /> Request Consultation</>}
                </button>

                <p className="text-xs text-center" style={{ color: "#999" }}>
                  We'll respond within 2 business days. No obligation.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "linear-gradient(135deg, #38B54A 0%, #8B9E1A 60%, #E6B800 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4">
            Ready to Build an AI-Enabled Organisation?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join the organisations already working with UpskillinTech to integrate AI
            into their workflows, teams, and strategy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#consultation"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm transition-all"
              style={{ background: "#E6B800", color: "#1C1C1C" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4a800")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E6B800")}>
              Request Consultation <ArrowRight size={16} />
            </a>
            <a href="/resources/case-studies"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm border-2 border-white text-white transition-all"
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#38B54A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}>
              View Case Studies
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
