import Navbar from "@/components/Navbar";
import WebinarPromoBanner from "@/components/WebinarPromoBanner";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import AudienceSection from "@/components/AudienceSection";
import UseCasesSection from "@/components/UseCasesSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ProgramsSection from "@/components/ProgramsSection";
import MasterclassPromo from "@/components/MasterclassPromo";
import WorkflowsSection from "@/components/WorkflowsSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import CommunitySection from "@/components/CommunitySection";
import FounderSection from "@/components/FounderSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import AISkillsQuiz from "@/components/AISkillsQuiz";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[92px]">
        <WebinarPromoBanner />
        <HeroSection />
        <TrustStrip />
        <AudienceSection />
        <UseCasesSection />
        <ProblemSection />
        <SolutionSection />
        <ProgramsSection />
        <MasterclassPromo />
        <WorkflowsSection />
        <EnterpriseSection />
        <CommunitySection />
        <FounderSection />
        <TestimonialsSection />
        <LeadMagnetSection />

        {/* AI Skills Quiz */}
        <section id="quiz" style={{ background: "#F9F8F6", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#0D9488", textTransform: "uppercase", letterSpacing: "0.08em" }}>Free Tool</span>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#111827", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
                Discover your AI level
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#6B7280", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
                5 quick questions. Get a personalised AI adoption path and programme recommendations for exactly where you are right now.
              </p>
            </div>
            <AISkillsQuiz />
          </div>
        </section>

        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
