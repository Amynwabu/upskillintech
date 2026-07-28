import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  DollarSign,
  Mail,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import Logo from "@/components/Logo";
import WebinarCountdown from "@/components/webinar/WebinarCountdown";
import WebinarRegistrationForm from "@/components/webinar/WebinarRegistrationForm";
import { trpc } from "@/lib/trpc";
import {
  AI_EMPLOYEE_WEBINAR_PLACEHOLDER,
  AI_EMPLOYEE_WEBINAR_SLUG,
  formatWebinarDate,
} from "@shared/webinar";
import "./webinar.css";

const outcomes = [
  {
    icon: Bot,
    title: "Why AI Is Changing Business",
    description:
      "Understand Agentic AI and why businesses of every size use AI Employees to work smarter, save time and stay competitive.",
  },
  {
    icon: Workflow,
    title: "AI Teams That Work 24/7",
    description:
      "See how AI Employees can handle enquiries, content, appointments and admin tasks around the clock without increasing your workload.",
  },
  {
    icon: Code2,
    title: "Build Your First AI Employee—Live",
    description:
      "Watch the step-by-step build with no coding, technical experience or expensive software required.",
  },
  {
    icon: DollarSign,
    title: "Turn Ideas into Income",
    description:
      "Discover practical ways to start or grow a business, offer AI-powered services and create additional income opportunities.",
  },
];

const faqs = [
  [
    "Do I need coding experience?",
    "No. The webinar is beginner-friendly and uses practical no-code tools.",
  ],
  [
    "Is the webinar free?",
    "Yes. Registration for the live webinar is completely free.",
  ],
  [
    "Will the session be practical?",
    "Yes. You will see an AI employee workflow built and explained live.",
  ],
  [
    "How will I receive the joining link?",
    "Your confirmation and reminder emails will include the webinar access details.",
  ],
  [
    "Will there be a recording?",
    "The recording policy will be confirmed in the event details sent to registered attendees.",
  ],
];

export default function WebinarAiEmployee({
  params,
}: {
  params?: { slug?: string };
}) {
  const slug = params?.slug ?? AI_EMPLOYEE_WEBINAR_SLUG;
  const query = trpc.webinar.bySlug.useQuery({ slug }, { retry: false });
  const webinar = query.data ?? AI_EMPLOYEE_WEBINAR_PLACEHOLDER;

  useEffect(() => {
    document.title =
      "Build Your First AI Employee Without Coding | Free UpskillinTech Webinar";
    const description =
      "Learn how to build an AI employee that handles repetitive work without traditional coding in this free live UpskillinTech webinar.";
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    if (webinar.eventStartAt && webinar.eventEndAt) {
      const schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.id = "webinar-event-schema";
      schema.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: webinar.title,
        description: webinar.description,
        startDate: new Date(webinar.eventStartAt).toISOString(),
        endDate: new Date(webinar.eventEndAt).toISOString(),
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        organizer: {
          "@type": "Organization",
          name: "UpskillinTech",
          url: "https://upskillintech.com",
        },
      });
      document.getElementById(schema.id)?.remove();
      document.head.appendChild(schema);
      return () => schema.remove();
    }
  }, [webinar]);

  const scrollToForm = () =>
    document
      .getElementById("webinar-register")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  const date = formatWebinarDate(webinar.eventStartAt, webinar.timezone);

  return (
    <div className="webinar-page webinar-page--simple">
      <a className="webinar-skip" href="#webinar-main">
        Skip to webinar content
      </a>

      <header className="webinar-simple-header">
        <div className="webinar-shell webinar-simple-header__inner">
          <Logo variant="dark-background" />
          <span className="webinar-simple-header__label">
            {webinar.eventStartAt ? date : "Free Live Webinar"}
          </span>
          <button
            className="webinar-button webinar-button--primary"
            onClick={scrollToForm}
          >
            Reserve My Seat
          </button>
        </div>
      </header>

      <main id="webinar-main">
        <section className="webinar-hero">
          <div className="webinar-shell webinar-hero__grid">
            <div className="webinar-hero__copy">
              <div className="webinar-eyebrow">
                <Sparkles size={17} /> Agentic AI for Everyone
              </div>
              <h1>
                Build Your First <em>AI Employee</em> That Works 24/7—Without
                Coding
              </h1>
              <p className="webinar-hero__lead">
                Discover how to build an AI-powered digital employee that can
                manage enquiries, organise information, follow up with leads and
                automate repetitive business tasks—even while you sleep.
              </p>
              <div className="webinar-pills">
                {[
                  "No coding required",
                  "Beginner-friendly",
                  "Live practical demonstration",
                  "Free registration",
                ].map(item => (
                  <span key={item}>
                    <Check size={15} /> {item}
                  </span>
                ))}
              </div>
              <div className="webinar-event-card">
                <Clock3 size={22} />
                <div>
                  <small>Live online</small>
                  <strong>{date}</strong>
                </div>
              </div>
              <WebinarCountdown webinar={webinar} />
              <button
                className="webinar-button webinar-button--primary"
                onClick={scrollToForm}
              >
                Reserve My Free Seat <ArrowRight size={19} />
              </button>
              <p className="webinar-hero__note">
                Registration takes less than one minute.
              </p>
            </div>

            <div
              className="webinar-hero__visual"
              aria-label="AI employee workflow preview"
            >
              <div className="webinar-orbit webinar-orbit--one" />
              <div className="webinar-orbit webinar-orbit--two" />
              <div className="webinar-ai-card">
                <div className="webinar-ai-card__top">
                  <span>
                    <Bot size={20} /> AI employee
                  </span>
                  <b>Always on</b>
                </div>
                <div className="webinar-ai-card__core">
                  <Sparkles size={42} />
                  <strong>RoboForge Assistant</strong>
                  <span>Understanding a new enquiry…</span>
                </div>
                <div className="webinar-ai-card__steps">
                  {[
                    "Enquiry understood",
                    "Programme matched",
                    "Reply prepared",
                  ].map((step, index) => (
                    <div key={step}>
                      <CheckCircle2 size={18} />
                      <span>{step}</span>
                      <small>0{index + 1}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="webinar-floating-card webinar-floating-card--left">
                <Mail size={18} /> Personal reply ready
              </div>
              <div className="webinar-floating-card webinar-floating-card--right">
                <ShieldCheck size={18} /> Human review built in
              </div>
            </div>
          </div>
        </section>

        <section className="webinar-simple-section">
          <div className="webinar-shell">
            <div className="webinar-simple-heading">
              <h2>What You&apos;ll Learn in This FREE Live Workshop</h2>
            </div>
            <div className="webinar-simple-outcomes">
              {outcomes.map(({ icon: Icon, title, description }) => (
                <article key={title}>
                  <Icon size={25} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="webinar-register"
          className="webinar-simple-section webinar-simple-register"
        >
          <div className="webinar-shell">
            <div className="webinar-simple-heading">
              <h2>Reserve Your Free Seat</h2>
              <p>
                Complete the form below to receive your confirmation and webinar
                access details.
              </p>
            </div>
            <WebinarRegistrationForm webinar={webinar} />
          </div>
        </section>

        <section className="webinar-simple-section">
          <div className="webinar-shell webinar-faq">
            <div className="webinar-simple-heading">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div>
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span>+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="webinar-simple-final">
          <div className="webinar-shell">
            <h2>Ready to Build Your First AI Employee?</h2>
            <p>
              Reserve your free seat and learn how to automate real work without
              traditional coding.
            </p>
            <button
              className="webinar-button webinar-button--primary"
              onClick={scrollToForm}
            >
              Reserve My Seat <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      <footer className="webinar-simple-footer">
        <div className="webinar-shell webinar-simple-footer__inner">
          <Logo variant="dark-background" />
          <div>
            <Link href="/webinar/ai-employee/privacy">Privacy</Link>
            <a href="mailto:hello@upskillintech.com">
              <Mail size={15} /> hello@upskillintech.com
            </a>
          </div>
          <small>© {new Date().getFullYear()} UpskillinTech</small>
        </div>
      </footer>

      <button className="webinar-mobile-cta" onClick={scrollToForm}>
        Reserve My Seat
      </button>
    </div>
  );
}
