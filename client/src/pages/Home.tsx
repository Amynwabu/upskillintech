/**
 * Home — UpskillinTech v4 "Evergreen"
 * Consolidated homepage: fewer, stronger sections with a clear rhythm.
 * Hero → proof → audience → method → programmes (+ masterclass) →
 * organisations → community → founder → testimonials → free tools → close.
 */
import Navbar from "@/components/Navbar";
import WebinarPromoBanner from "@/components/WebinarPromoBanner";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import AudienceSection from "@/components/AudienceSection";
import SolutionSection from "@/components/SolutionSection";
import ProgramsSection from "@/components/ProgramsSection";
import MasterclassPromo from "@/components/MasterclassPromo";
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
      <main className="flex-1 pt-[72px]">
        <WebinarPromoBanner />
        <HeroSection />
        <TrustStrip />
        <AudienceSection />
        <SolutionSection />
        <ProgramsSection />
        <MasterclassPromo />
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
