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
import HeroSection from "@/components/HeroSection";
import AudienceSection from "@/components/AudienceSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import EcosystemSection from "@/components/EcosystemSection";
import ProgramsSection from "@/components/ProgramsSection";
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

        {/* 6. Programs — Structured AI learning paths */}
        <ProgramsSection />

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
