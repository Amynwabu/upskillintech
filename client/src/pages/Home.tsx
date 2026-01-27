import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Zap, Users, Target, Sparkles, Award, TrendingUp, CheckCircle2 } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import AISkillsQuiz from "@/components/AISkillsQuiz";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  
  // Animation hooks for each section
  const heroSection = useIntersectionObserver({ threshold: 0.1 });
  const socialProofSection = useIntersectionObserver({ threshold: 0.2 });
  const featuresSection = useIntersectionObserver({ threshold: 0.1 });
  const statsSection = useIntersectionObserver({ threshold: 0.2 });
  const coursesSection = useIntersectionObserver({ threshold: 0.1 });
  const testimonialsSection = useIntersectionObserver({ threshold: 0.1 });
  const ctaSection = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section 
          ref={heroSection.elementRef as React.RefObject<HTMLElement>}
          className={`relative overflow-hidden bg-[#1c1d1f] transition-opacity duration-700 ${
            heroSection.isVisible ? 'animate-fade-in' : 'opacity-0-initial'
          }`}
          style={{ minHeight: '600px' }}
        >
          <div className="relative h-full">
            <div className="grid lg:grid-cols-2 h-full">
              <div className="relative z-10 flex items-center py-16 px-6 md:px-12 lg:px-16">
                <div className="max-w-2xl">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
                    Don't Just Adapt to the Future. <span className="text-teal-400">Lead It.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                    Master AI, automate your workflows, and career-proof your skills without the burnout. Expert-led training by Dr. Ndidiamaka Adiuku (PhD, Robotics & AI).
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link href="/learn">
                      <Button size="lg" className="bg-white hover:bg-gray-100 text-black px-8 font-semibold">
                        Start Learning
                      </Button>
                    </Link>
                    <Link href="/consulting">
                      <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 font-semibold">
                        Book a Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600"
                  style={{
                    clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                ></div>
                <div 
                  className="absolute inset-0 flex items-center justify-end"
                  style={{
                    clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  <img 
                    src="/hero-professional-woman.jpg" 
                    alt="Professional woman" 
                    className="h-full w-auto object-cover grayscale"
                    style={{ maxHeight: '600px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-card/50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Tech Training with Academic Rigor & Real-World Application</h2>
              <p className="text-muted-foreground leading-relaxed">
                In a world flooded with generic "tech gurus," UpskillinTech stands apart. We don't just teach you to click buttons; we teach you to think like a technologist.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Founded by Dr. Ndidiamaka Adiuku, a Research Fellow in AI and Robotics at Cranfield University, our mission is to demystify complex technology. Whether you are a business looking to integrate AI, a professional seeking a career pivot, or a faith-based organization streamlining administration, we bridge the gap between "technical theory" and "practical success."
              </p>
            </div>
          </div>
        </section>

        {/* The Problem/Solution Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Why UpskillinTech?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-2">The Problem</h3>
                  <p className="text-muted-foreground leading-relaxed">Technology is moving faster than ever. Professionals are burned out trying to keep up, and businesses are losing money on inefficient workflows.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">The Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">We provide targeted, bite-sized, and strategic training. We focus on AI Literacy and Process Automation—the skills that actually save you time and increase your income.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Snapshot */}
        <section className="py-12 md:py-16 lg:py-20 bg-card/50">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Services Snapshot</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI for Business & Career</h3>
                  <p className="text-muted-foreground leading-relaxed">Learn to use tools like ChatGPT, Copilot, and Automation platforms to reduce your workload by 30%.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Corporate & Group Training</h3>
                  <p className="text-muted-foreground leading-relaxed">Custom workshops for teams to boost productivity and foster innovation.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Faith-Based Tech Strategy</h3>
                  <p className="text-muted-foreground leading-relaxed">Unique consulting for churches and ministries to leverage technology for better administration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section 
          ref={testimonialsSection.elementRef as React.RefObject<HTMLElement>}
          className={`py-12 md:py-16 lg:py-20 bg-background transition-all duration-700 ${
            testimonialsSection.isVisible ? 'animate-fade-in-up' : 'opacity-0-initial'
          }`}
        >
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">Testimonials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-sm sm:text-base text-muted-foreground italic">
                      "An amazing AI learning platform, and so easy to use by people at all levels and anywhere in the world."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        SM
                      </div>
                      <div>
                        <div className="font-semibold text-sm sm:text-base">Sarah Mitchell</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Business Transformation Lead</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-sm sm:text-base text-muted-foreground italic">
                      "Everything you need to start learning AI is here, and there are many interesting courses that aren't found on the internet!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        JC
                      </div>
                      <div>
                        <div className="font-semibold text-sm sm:text-base">James Chen</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">AI Development Manager</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaSection.elementRef as React.RefObject<HTMLElement>}
          className={`py-16 md:py-20 bg-gradient-to-r from-green-500/10 via-teal-500/10 to-cyan-500/10 transition-all duration-700 ${
            ctaSection.isVisible ? 'animate-fade-in' : 'opacity-0-initial'
          }`}
        >
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners transforming their careers with AI skills. 
              Get personalized learning paths and hands-on projects.
            </p>
            {!isAuthenticated && (
              <Link href="/onboarding">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
