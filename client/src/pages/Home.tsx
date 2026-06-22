/**
 * Home — UpskillinTech v3.1
 * Mission: Independent AI Awareness Platform
 * "Share insights on AI productivity, AI tools, and the future of work
 *  to help professionals understand and adopt AI responsibly."
 *
 * Page narrative flow:
 *   Navbar → Hero → Audience → Problem → Solution → Ecosystem →
 *   Programs → Workflows → Enterprise → Community → Founder → Newsletter → FinalCTA → Footer
 */
import Navbar from "@/components/Navbar";
import WebinarPromoBanner from "@/components/WebinarPromoBanner";
import HeroSection from "@/components/HeroSection";
import AudienceSection from "@/components/AudienceSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import EcosystemSection from "@/components/EcosystemSection";
import AISkillsQuiz from "@/components/AISkillsQuiz";
import ProgramsSection from "@/components/ProgramsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkflowsSection from "@/components/WorkflowsSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import CommunitySection from "@/components/CommunitySection";
import FounderSection from "@/components/FounderSection";
import NewsletterSection from "@/components/NewsletterSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[76px]">
        <WebinarPromoBanner />

        {/* 1. Hero — Who we are & the invitation */}
        <HeroSection />

        {/* 2. Audience — Professionals, Leaders, Organisations */}
        <AudienceSection />

        {/* 3. Problem — Why AI feels overwhelming */}
        <ProblemSection />

        {/* 4. Solution — The structured approach (dark section) */}
        <SolutionSection />

        {/* 5. Ecosystem — Awareness → Learning → Application → Community */}
        <EcosystemSection />

        {/* 5b. Quiz — Personalised learning path recommender */}
        <section className="section-py" style={{ background: "#F7F8FA" }}>
          <div className="container">
            <div className="text-center mb-10">
              <span className="section-label">Find Your Path</span>
              <h2 className="mt-4 mb-4" style={{ color: "#111827" }}>Which AI programme is right for you?</h2>
              <p className="max-w-xl mx-auto" style={{ color: "#6B7280", fontSize: "1.05rem" }}>
                Answer 5 quick questions and get a personalised learning path recommendation.
              </p>
            </div>
            <AISkillsQuiz />
          </div>
        </section>

        {/* 6. Programs — Structured AI learning paths */}
        <ProgramsSection />

        {/* 7. Testimonials — Social proof from workshops and webinars */}
        <TestimonialsSection />

        {/* 7. Workflows — Practical AI automation templates */}
        <WorkflowsSection />

        {/* 8. Enterprise — Organisational AI adoption */}
        <EnterpriseSection />

        {/* 9. Community — The peer network */}
        <CommunitySection />

        {/* 10. Founder — Built on real AI expertise */}
        <FounderSection />

        {/* 11. Newsletter — Weekly AI insights */}
        <NewsletterSection />

        {/* 12. Final CTA */}
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
