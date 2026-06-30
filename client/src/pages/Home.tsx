import Navbar from "@/components/Navbar";
import WebinarPromoBanner from "@/components/WebinarPromoBanner";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import AudienceSection from "@/components/AudienceSection";
import UseCasesSection from "@/components/UseCasesSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ProgramsSection from "@/components/ProgramsSection";
import WorkflowsSection from "@/components/WorkflowsSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import CommunitySection from "@/components/CommunitySection";
import FounderSection from "@/components/FounderSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[76px]">
        <WebinarPromoBanner />
        <HeroSection />
        <TrustStrip />
        <AudienceSection />
        <UseCasesSection />
        <ProblemSection />
        <SolutionSection />
        <ProgramsSection />
        <WorkflowsSection />
        <EnterpriseSection />
        <CommunitySection />
        <FounderSection />
        <TestimonialsSection />
        <LeadMagnetSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
