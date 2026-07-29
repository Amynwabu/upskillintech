import { Link } from "wouter";
import { ArrowRight, MessageCircle, Network, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Community() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <section className="px-6 py-28 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#859D30]">
            UpskillinTech Community
          </p>
          <h1 className="mx-auto max-w-4xl font-bold text-5xl md:text-7xl">
            Learn practical AI with people who are building, too.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            Join professionals, founders and educators sharing useful workflows,
            thoughtful questions and real progress.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-[#F4F7EA]0 px-6 py-3 font-bold text-slate-950"
          >
            Join the community <ArrowRight size={18} />
          </Link>
        </section>
        <section className="mx-auto grid max-w-5xl gap-5 px-6 pb-28 md:grid-cols-3">
          {[
            [Users, "Welcoming network", "Meet people applying AI across business, education and community work."],
            [MessageCircle, "Practical conversation", "Discuss tools, workflows and lessons without unnecessary jargon."],
            [Network, "Shared opportunities", "Discover events, collaborations and ways to keep learning together."],
          ].map(([Icon, title, copy]) => (
            <article className="rounded-2xl border border-white/10 bg-white/5 p-7" key={String(title)}>
              <Icon className="text-[#859D30]" size={26} />
              <h2 className="mt-5 text-xl font-bold">{String(title)}</h2>
              <p className="mt-3 leading-7 text-slate-400">{String(copy)}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
