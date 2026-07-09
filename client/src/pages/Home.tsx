import Navbar from "@/components/Navbar";
import WebinarPromoBanner from "@/components/WebinarPromoBanner";
import HeroSection from "@/components/HeroSection";
import AudienceSection from "@/components/AudienceSection";
import SolutionSection from "@/components/SolutionSection";
import ProgramsSection from "@/components/ProgramsSection";
import MasterclassPromo from "@/components/MasterclassPromo";
import FreeWebinarsSection from "@/components/FreeWebinarsSection";
import FounderSection from "@/components/FounderSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <WebinarPromoBanner />
        <HeroSection />
        <AudienceSection />
        <SolutionSection />
        <ProgramsSection />
        <MasterclassPromo />
        <FreeWebinarsSection />
        <FounderSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
