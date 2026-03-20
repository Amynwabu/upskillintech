/**
 * Contact Page — /contact
 * Design: Green (#38B54A) + Golden Green (#8B9E1A) + Accent Yellow (#E6B800)
 * Typography: Sora (headings) + Inter (body)
 * Sections: Hero, Inquiry Categories (4 cards), Contact Form, Alternative Contact
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HelpCircle, Building2, Handshake, Mic,
  Mail, Linkedin, Youtube, Instagram,
  ArrowRight, Send, CheckCircle, MessageSquare,
  Twitter, Phone
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const inquiryCategories = [
  {
    icon: HelpCircle,
    title: "General Inquiry",
    tagline: "Questions about programs or community.",
    description:
      "For general questions about UpskillinTech programmes, resources, community activities, or learning pathways.",
    examples: [
      "Questions about programmes and enrolment",
      "Requests for information about learning pathways",
      "Inquiries about community participation",
      "General questions about UpskillinTech",
    ],
    cta: "Contact Us",
    color: "#38B54A",
    value: "General Inquiry",
  },
  {
    icon: Building2,
    title: "Enterprise Consultation",
    tagline: "AI training and consulting for organisations.",
    description:
      "For organisations and institutions interested in integrating AI into their teams, workflows, or operations.",
    examples: [
      "AI productivity training for teams",
      "AI adoption workshops for leadership",
      "AI workflow implementation support",
      "Organisational AI strategy development",
    ],
    cta: "Request Consultation",
    color: "#8B9E1A",
    value: "Enterprise Consultation",
  },
  {
    icon: Handshake,
    title: "Partnership Inquiry",
    tagline: "Collaboration with UpskillinTech.",
    description:
      "For educational institutions, organisations, and innovation communities interested in promoting AI literacy and responsible technology adoption.",
    examples: [
      "Educational collaborations",
      "Research initiatives",
      "Joint workshops or training programmes",
      "Community AI learning initiatives",
    ],
    cta: "Discuss Partnership",
    color: "#E6B800",
    value: "Partnership Inquiry",
  },
  {
    icon: Mic,
    title: "Speaking & Events",
    tagline: "Invitations for conferences or workshops.",
    description:
      "For event organisers inviting UpskillinTech to participate in conferences, workshops, and educational events focused on AI and the future of work.",
    examples: [
      "Keynote presentations",
      "AI literacy workshops",
      "Panel discussions",
      "Professional development sessions",
    ],
    cta: "Invite Speaker",
    color: "#38B54A",
    value: "Speaking & Events",
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Enterprise Consultation",
  "Partnership Inquiry",
  "Speaking & Events",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    inquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const contactMutation = trpc.forms.contact.useMutation({
    onSuccess: () => { setSubmitted(true); toast.success("Message sent! We'll be in touch soon."); },
    onError: (err: { message?: string }) => toast.error(err.message || "Failed to send message. Please try again."),
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
    setForm(f => ({ ...f, inquiryType: value }));
    // Smooth scroll to form
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const submitting = contactMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    contactMutation.mutate({
      name: form.name,
      email: form.email,
      organisation: form.organisation,
      inquiryType: form.inquiryType || selectedCategory || "General Inquiry",
      message: form.message,
    });
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 40%, #fffef0 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-8 right-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
        <div className="absolute bottom-4 left-12 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #E6B800 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center text-gray-900 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
            style={{ background: "rgba(255,255,255,0.2)" }}>
            <MessageSquare size={12} /> Get in Touch
          </div>
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl leading-tight mb-5">
            Contact UpskillinTech
          </h1>
          <p className="text-lg opacity-90 mb-3 max-w-2xl mx-auto leading-relaxed">
            We welcome inquiries from professionals, organisations, and partners
            interested in AI learning and collaboration.
          </p>
          <p className="text-base opacity-80 mb-8 max-w-xl mx-auto">
            Whether you are exploring a programme, seeking enterprise training,
            or interested in a partnership — we would be pleased to hear from you.
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm transition-all"
            style={{ background: "#E6B800", color: "#1C1C1C" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#d4a800")}
            onMouseLeave={e => (e.currentTarget.style.background = "#E6B800")}
          >
            Send an Inquiry <ArrowRight size={16} />
          </a>
        </div>

        {/* Who we welcome */}
        <div className="max-w-4xl mx-auto px-4 lg:px-8 mt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Professionals", desc: "Exploring AI programmes" },
              { label: "Organisations", desc: "Seeking AI training" },
              { label: "Institutions", desc: "Interested in collaboration" },
              { label: "Event Organisers", desc: "Inviting speakers" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl px-4 py-3 text-center text-gray-900"
                style={{ background: "rgba(56,181,74,0.10)" }}>
                <p className="font-poppins font-semibold text-sm">{item.label}</p>
                <p className="text-xs opacity-80 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry Categories ───────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#f8faf8" }}>
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
              style={{ background: "#f0faf0", color: "#38B54A" }}>How Can We Help?</span>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-4" style={{ color: "#1C1C1C" }}>
              Select Your Inquiry Type
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#555" }}>
              To ensure your request reaches the right team, select the category
              that best describes your inquiry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inquiryCategories.map((cat, i) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.value;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  style={{
                    borderColor: isSelected ? cat.color : "#e8e8e8",
                    boxShadow: isSelected ? `0 0 0 2px ${cat.color}40` : undefined,
                  }}
                  onClick={() => handleCategorySelect(cat.value)}
                >
                  <div className="h-1.5" style={{ background: cat.color }} />
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${cat.color}15` }}>
                      <Icon size={22} style={{ color: cat.color }} />
                    </div>
                    <h3 className="font-poppins font-bold text-base mb-1" style={{ color: "#1C1C1C" }}>{cat.title}</h3>
                    <p className="text-xs font-medium mb-3" style={{ color: cat.color }}>{cat.tagline}</p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>{cat.description}</p>
                    <ul className="space-y-1.5 mb-5">
                      {cat.examples.map((ex, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs" style={{ color: "#666" }}>
                          <CheckCircle size={12} className="mt-0.5 shrink-0" style={{ color: cat.color }} />
                          {ex}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="w-full py-2.5 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: isSelected ? cat.color : `${cat.color}15`,
                        color: isSelected ? "#fff" : cat.color,
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) {
                          e.currentTarget.style.background = cat.color;
                          e.currentTarget.style.color = "#fff";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) {
                          e.currentTarget.style.background = `${cat.color}15`;
                          e.currentTarget.style.color = cat.color;
                        }
                      }}
                    >
                      {isSelected ? "✓ Selected" : cat.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Form ─────────────────────────────────────────────────── */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — info */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
                style={{ background: "#f0faf0", color: "#38B54A" }}>Send a Message</span>
              <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-5" style={{ color: "#1C1C1C" }}>
                We'd Love to Hear From You
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#555" }}>
                Use the form to share your inquiry and a member of the UpskillinTech
                team will respond as soon as possible. We aim to respond to all
                inquiries within 2 business days.
              </p>

              {/* Response expectations */}
              <div className="rounded-2xl p-6 mb-8 border" style={{ borderColor: "#e8e8e8", background: "#f8faf8" }}>
                <h3 className="font-poppins font-semibold text-base mb-4" style={{ color: "#1C1C1C" }}>
                  What happens after you submit?
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Confirmation", desc: "You'll receive an on-screen confirmation that your message has been received." },
                    { step: "02", title: "Review", desc: "Our team reviews your inquiry and routes it to the appropriate person." },
                    { step: "03", title: "Response", desc: "A team member will respond within 2 business days with next steps." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-poppins font-bold text-xs text-white"
                        style={{ background: "#38B54A" }}>
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "#1C1C1C" }}>{item.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#666" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick contact info */}
              <div className="space-y-3">
                <a href="mailto:info@upskillintech.com"
                  className="flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md group"
                  style={{ borderColor: "#e8e8e8" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "#f0faf0" }}>
                    <Mail size={18} style={{ color: "#38B54A" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#888" }}>Email</p>
                    <p className="text-sm font-medium" style={{ color: "#1C1C1C" }}>info@upskillintech.com</p>
                  </div>
                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#38B54A" }} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md group"
                  style={{ borderColor: "#e8e8e8" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "#f0faf0" }}>
                    <Linkedin size={18} style={{ color: "#0077B5" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#888" }}>LinkedIn</p>
                    <p className="text-sm font-medium" style={{ color: "#1C1C1C" }}>UpskillinTech Official Page</p>
                  </div>
                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#38B54A" }} />
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div className="rounded-2xl border p-10 text-center" style={{ borderColor: "#e8e8e8" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "#f0faf0" }}>
                    <CheckCircle size={32} style={{ color: "#38B54A" }} />
                  </div>
                  <h3 className="font-poppins font-bold text-xl mb-3" style={{ color: "#1C1C1C" }}>
                    Message Received!
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#555" }}>
                    Thank you for reaching out. Your inquiry has been received and a
                    member of the UpskillinTech team will respond within 2 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", organisation: "", inquiryType: "", message: "" }); setSelectedCategory(null); }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
                    style={{ background: "#38B54A", color: "#fff" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#2ea040")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#38B54A")}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border p-8 shadow-sm" style={{ borderColor: "#e8e8e8" }}>
                  <h3 className="font-poppins font-bold text-xl mb-6" style={{ color: "#1C1C1C" }}>
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>
                        Name <span style={{ color: "#38B54A" }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
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

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>
                        Organisation <span className="font-normal" style={{ color: "#999" }}>(optional)</span>
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
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>
                        Inquiry Type
                      </label>
                      <select
                        value={form.inquiryType}
                        onChange={e => { setForm({ ...form, inquiryType: e.target.value }); setSelectedCategory(e.target.value); }}
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
                        style={{ borderColor: "#ddd", color: form.inquiryType ? "#1C1C1C" : "#999" }}
                        onFocus={e => (e.target.style.borderColor = "#38B54A")}
                        onBlur={e => (e.target.style.borderColor = "#ddd")}
                      >
                        <option value="">Select inquiry type</option>
                        {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#444" }}>
                        Message <span style={{ color: "#38B54A" }}>*</span>
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us how we can help you..."
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
                      {submitting ? "Sending…" : <><Send size={15} /> Send Message</>}
                    </button>

                    <p className="text-xs text-center" style={{ color: "#999" }}>
                      We'll respond within 2 business days.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Alternative Contact ───────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "#f8faf8" }}>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: "#f0faf0", color: "#38B54A" }}>Other Ways to Connect</span>
          <h2 className="font-poppins font-bold text-2xl lg:text-3xl mb-3" style={{ color: "#1C1C1C" }}>
            Find Us Online
          </h2>
          <p className="text-sm mb-10" style={{ color: "#666" }}>
            Connect with UpskillinTech across our social channels and platforms.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "info@upskillintech.com",
                href: "mailto:info@upskillintech.com",
                color: "#38B54A",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "UpskillinTech Page",
                href: "https://linkedin.com",
                color: "#0077B5",
              },
              {
                icon: Youtube,
                label: "YouTube",
                value: "UpskillinTech Channel",
                href: "https://youtube.com",
                color: "#FF0000",
              },
              {
                icon: Instagram,
                label: "Instagram",
                value: "@upskillintech",
                href: "https://instagram.com",
                color: "#E1306C",
              },
            ].map((channel, i) => {
              const Icon = channel.icon;
              return (
                <a
                  key={i}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "#e8e8e8" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${channel.color}15` }}>
                    <Icon size={22} style={{ color: channel.color }} />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-sm" style={{ color: "#1C1C1C" }}>{channel.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#777" }}>{channel.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Response time note */}
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm"
            style={{ background: "#f0faf0", color: "#38B54A" }}>
            <CheckCircle size={15} />
            We aim to respond to all inquiries within 2 business days.
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-14"
        style={{ background: "linear-gradient(135deg, #38B54A 0%, #8B9E1A 60%, #E6B800 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="font-poppins font-bold text-2xl lg:text-3xl mb-3">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-base opacity-90 mb-7 max-w-xl mx-auto">
            Whether you are an individual professional or an organisation,
            UpskillinTech has a path for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all"
              style={{ background: "#E6B800", color: "#1C1C1C" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4a800")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E6B800")}>
              Explore Programs <ArrowRight size={15} />
            </a>
            <a href="/enterprise"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm border-2 border-white text-white transition-all"
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#38B54A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}>
              Enterprise Solutions
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
