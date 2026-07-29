import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Lightbulb,
  Repeat2,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const audiences = [
  {
    icon: UserRound,
    title: "Individuals",
    copy: "Use AI to organise tasks, learn faster, and improve everyday productivity.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Professionals",
    copy: "Build practical AI skills that improve performance and career opportunities.",
  },
  {
    icon: UsersRound,
    title: "Solopreneurs",
    copy: "Use AI to manage marketing, content, administration, and customer service.",
  },
  {
    icon: Building2,
    title: "Business Owners",
    copy: "Introduce AI automation that saves time, reduces costs, and supports growth.",
  },
];

const outcomes = [
  {
    icon: Sparkles,
    title: "Learn practical AI skills",
    copy: "Build confidence with useful tools and guidance designed for non-technical learners.",
  },
  {
    icon: Repeat2,
    title: "Automate repetitive work",
    copy: "Turn time-consuming everyday tasks into clear, reliable workflows.",
  },
  {
    icon: Lightbulb,
    title: "Build new opportunities",
    copy: "Apply AI to improve your career, services, business ideas, and income potential.",
  },
];

const services = [
  {
    title: "AI Training",
    copy: "Practical learning programmes that help you use AI confidently in life and work.",
    href: "/programs",
    cta: "Explore AI training",
  },
  {
    title: "AI for Business",
    copy: "Focused support for business owners and teams adopting AI responsibly.",
    href: "/enterprise",
    cta: "Discover AI for business",
  },
  {
    title: "AI Automation and Consultancy",
    copy: "Expert guidance to identify, design, and implement useful AI-powered workflows.",
    href: "/consult",
    cta: "Explore consultancy",
  },
];

export default function Home() {
  return (
    <div className="premium-dark-page min-h-screen">
      <Navbar />
      <main className="pt-[72px]">
        <section className="surface-dark premium-section border-b">
          <div className="container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
            <div className="max-w-2xl">
              <span className="section-label">Practical AI for everyone</span>
              <h1 className="mt-5 text-[#111111]">
                Practical AI Skills for Life, Work and Business
              </h1>
              <p className="mt-6 max-w-xl text-lg text-[#5f6368]">
                Learn how to use AI confidently, automate everyday tasks,
                improve productivity, and create new opportunities—without
                needing a technical background.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="btn-primary justify-center" href="/programs">
                  Start Your AI Journey <ArrowRight size={18} />
                </a>
                <a className="btn-outline justify-center" href="/programs">
                  Explore Our Programmes
                </a>
              </div>
            </div>
            <div className="premium-media overflow-hidden rounded-2xl border">
              <img
                src="/images/african-professional-practical-ai.webp"
                alt="Black African professional using AI for practical business planning"
                width={720}
                height={520}
                loading="eager"
                className="h-[340px] w-full object-cover sm:h-[460px]"
              />
            </div>
          </div>
        </section>

        <section className="surface-dark section-py" id="who-its-for">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="section-label">Designed around your goals</span>
              <h2 className="mt-4 text-[#111111]">
                AI Skills That Fit Your Life, Your Work and Your Goals
              </h2>
              <p className="mt-4 text-[#5f6368]">
                Whether you are an individual, professional, solopreneur, or
                business owner, UpskillinTech helps you move from AI curiosity
                to confident, practical adoption.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map(({ icon: Icon, title, copy }) => (
                <article className="brand-card" key={title}>
                  <div className="brand-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-surface-section section-py">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <span className="section-label">What you can achieve</span>
              <h2 className="mt-4 text-[#111111]">Put AI to practical use</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {outcomes.map(({ icon: Icon, title, copy }) => (
                <article className="brand-card" key={title}>
                  <div className="brand-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-dark section-py">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="section-label">How it works</span>
              <h2 className="mt-4 text-[#111111]">
                A clear path from learning to action
              </h2>
            </div>
            <ol className="grid gap-8 md:grid-cols-3">
              {[
                "Choose your goal",
                "Learn through practical guidance",
                "Apply AI to real work and life",
              ].map((step, index) => (
                <li className="text-center" key={step}>
                  <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#859d30] font-bold text-white">
                    {index + 1}
                  </span>
                  <h3>{step}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="premium-surface-section section-py">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <span className="section-label">Our services</span>
              <h2 className="mt-4 text-[#111111]">
                Practical support at every stage
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map(service => (
                <article className="brand-card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <a className="brand-link mt-auto" href={service.href}>
                    {service.cta} <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-light premium-light-section section-py">
          <div className="container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-2xl border border-[#e5e7eb]">
              <img
                src="/images/solopreneur-ai-productivity.webp"
                alt="Black female solopreneur using AI to organise business tasks from her home office"
                width={680}
                height={480}
                loading="lazy"
                className="h-[320px] w-full object-cover sm:h-[420px]"
              />
            </div>
            <div>
              <span className="section-label">Practical and accessible</span>
              <h2 className="mt-4 text-[#111111]">
                Guidance grounded in real work
              </h2>
              <p className="mt-4 text-[#5f6368]">
                UpskillinTech combines practical teaching, AI and automation
                expertise, and business experience to support people without
                technical backgrounds.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Clear, practical teaching",
                  "AI and automation expertise",
                  "Business-focused guidance",
                  "Accessible learner support",
                ].map(item => (
                  <li
                    className="flex items-center gap-3 text-[#111111]"
                    key={item}
                  >
                    <Check className="text-[#859d30]" size={19} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[#07100b] py-16 text-white sm:py-20">
          <div className="container text-center">
            <h2 className="text-white">Ready to Put AI to Work?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#e5e7eb]">
              Take the next step towards using AI confidently in your life,
              career, or business.
            </p>
            <a className="btn-primary mt-8 justify-center" href="/programs">
              Get Started <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
