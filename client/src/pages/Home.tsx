/**
 * Home — UpskillinTech v3
 * 13 sections: Navbar, Hero, Problem, Method, Programs, Workflows,
 *              Enterprise, Resources, Community, Founder, Newsletter, FinalCTA, Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MethodSection from "@/components/MethodSection";
import ProgramsSection from "@/components/ProgramsSection";
import WorkflowsSection from "@/components/WorkflowsSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import ResourcesSection from "@/components/ResourcesSection";
import CommunitySection from "@/components/CommunitySection";
import FounderSection from "@/components/FounderSection";
import NewsletterSection from "@/components/NewsletterSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main className="flex-1 pt-[76px]">
        <HeroSection />
        <ProblemSection />
        <MethodSection />
        <ProgramsSection />
        <WorkflowsSection />
        <EnterpriseSection />
        <ResourcesSection />
        <CommunitySection />
        <FounderSection />
        <NewsletterSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
