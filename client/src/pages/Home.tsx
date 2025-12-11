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
        {/* Hero Section - 360learning.com inspired */}
        <section 
          ref={heroSection.elementRef as React.RefObject<HTMLElement>}
          className={`relative overflow-hidden bg-white py-20 md:py-32 transition-opacity duration-700 ${
            heroSection.isVisible ? 'animate-fade-in' : 'opacity-0-initial'
          }`}
        >
          <div className="container relative">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-8">
                <Sparkles className="text-green-600" size={16} />
                <span className="text-sm font-medium text-green-700">AI-Powered Career Transformation</span>
              </div>
              
              {/* Main Headline - 360learning style: centered, large, multi-line */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="block text-black">
                  The learning platform that
                </span>
                <span className="block text-black">
                  combines the{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    power of AI
                  </span>
                  {" "}with the
                </span>
                <span className="block text-black">
                  magic of collaborative learning
                </span>
              </h1>

              {/* CTA Buttons - 360learning style */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/onboarding">
                  <Button size="lg" className="bg-black hover:bg-black/90 text-white px-8">
                    I want a demo
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black/5 px-8">
                    See how it works
                  </Button>
                </Link>
              </div>

              {/* Product Screenshot/Demo - 360learning style */}
              <div className="relative mt-12">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <img 
                    src="/images/hero-ai-glow.jpg" 
                    alt="AI Learning Platform" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section 
          ref={socialProofSection.elementRef as React.RefObject<HTMLElement>}
          className={`py-12 bg-background transition-all duration-700 ${
            socialProofSection.isVisible ? 'animate-fade-in-up' : 'opacity-0-initial'
          }`}
        >
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground">
                Join <span className="font-bold text-primary">1,000+</span> learners to learn and grow your AI skills here
              </p>
            </div>
            
            {/* Partner logos placeholder */}
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <div className="text-2xl font-bold text-muted-foreground">Microsoft</div>
              <div className="text-2xl font-bold text-muted-foreground">Google</div>
              <div className="text-2xl font-bold text-muted-foreground">OpenAI</div>
              <div className="text-2xl font-bold text-muted-foreground">AWS</div>
            </div>
          </div>
        </section>

        {/* Three Column Features */}
        <section 
          ref={featuresSection.elementRef as React.RefObject<HTMLElement>}
          className="py-12 md:py-16 lg:py-20 bg-card/50"
        >
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {/* Learn */}
              <div className={`space-y-4 transition-all duration-700 ${
                featuresSection.isVisible ? 'animate-fade-in-up' : 'opacity-0-initial'
              }`}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center border border-green-500/30">
                  <BookOpen className="text-green-500" size={28} />
                </div>
                <h3 className="text-2xl font-bold">Learn</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Study all AI subjects by practicing with real-world projects and hands-on exercises. From fundamentals to advanced applications, master AI at your own pace.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={18} />
                    <span className="text-sm">10+ comprehensive courses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={18} />
                    <span className="text-sm">Interactive quizzes & projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={18} />
                    <span className="text-sm">Professional certificates</span>
                  </li>
                </ul>
                <Link href="/learn">
                  <Button variant="link" className="text-green-500 hover:text-green-600 p-0">
                    Explore courses <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>

              {/* Grow */}
              <div className={`space-y-4 transition-all duration-700 ${
                featuresSection.isVisible ? 'animate-fade-in-delay-1' : 'opacity-0-initial'
              }`}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center border border-teal-500/30">
                  <TrendingUp className="text-teal-500" size={28} />
                </div>
                <h3 className="text-2xl font-bold">Grow</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Boost your AI skills to new heights with hands-on mentorships, specialized live training, and community support from industry experts.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                      <Target className="text-teal-500" size={20} />
                    </div>
                    <span className="text-sm font-medium">1-on-1 Mentorship</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                      <Users className="text-teal-500" size={20} />
                    </div>
                    <span className="text-sm font-medium">Live Workshops</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                      <Award className="text-teal-500" size={20} />
                    </div>
                    <span className="text-sm font-medium">Certification Programs</span>
                  </div>
                </div>
                <Link href="/consult">
                  <Button variant="link" className="text-teal-500 hover:text-teal-600 p-0">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>

              {/* Opportunities */}
              <div className={`space-y-4 transition-all duration-700 ${
                featuresSection.isVisible ? 'animate-fade-in-delay-2' : 'opacity-0-initial'
              }`}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-yellow-500/20 flex items-center justify-center border border-cyan-500/30">
                  <Sparkles className="text-cyan-500" size={28} />
                </div>
                <h3 className="text-2xl font-bold">Opportunities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with your peers, access ready-to-use automation templates, and be inspired by AI experts in our vibrant community ecosystem.
                </p>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                    <div className="font-medium text-sm">Community Forum</div>
                    <div className="text-xs text-muted-foreground">Share insights & collaborate</div>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                    <div className="font-medium text-sm">AI Templates Library</div>
                    <div className="text-xs text-muted-foreground">50+ automation tools</div>
                  </div>
                </div>
                <Link href="/community">
                  <Button variant="link" className="text-cyan-500 hover:text-cyan-600 p-0">
                    Join community <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section 
          ref={statsSection.elementRef as React.RefObject<HTMLElement>}
          className={`py-12 md:py-16 bg-background transition-all duration-700 ${
            statsSection.isVisible ? 'animate-fade-in-up' : 'opacity-0-initial'
          }`}
        >
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center space-y-1 md:space-y-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">10+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Flagship Courses</div>
              </div>
              <div className="text-center space-y-1 md:space-y-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">1,000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center space-y-1 md:space-y-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-yellow-500 bg-clip-text text-transparent">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Business Partners</div>
              </div>
              <div className="text-center space-y-1 md:space-y-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">95%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Skills Assessment Quiz */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 mb-4">
                <Sparkles className="text-green-400" size={18} />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Personalized for You</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 px-4">Find Your Perfect Learning Path</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Take our quick 2-minute assessment and get personalized course recommendations tailored to your goals
              </p>
            </div>
            <AISkillsQuiz />
          </div>
        </section>

        {/* Featured Courses Preview */}
        <section 
          ref={coursesSection.elementRef as React.RefObject<HTMLElement>}
          className="py-12 md:py-16 lg:py-20 bg-card/30"
        >
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 px-4">Start Your Learning Journey</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Choose from our comprehensive AI courses designed for professionals, businesses, and organizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              {/* Course category cards */}
              <Card className={`border-2 hover:border-green-500/50 transition-all hover:shadow-lg group overflow-hidden ${
                coursesSection.isVisible ? 'animate-fade-in-up' : 'opacity-0-initial'
              }`}>
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src="/images/ai-workshop.jpg" 
                    alt="AI for Business" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full mb-2">
                      BUSINESS
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>AI for Business & Automation</CardTitle>
                  <CardDescription>
                    Master AI tools to automate workflows, boost productivity, and transform your business operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">5 courses • 20+ hours</span>
                    <Link href="/learn">
                      <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-600">
                        Explore <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-2 hover:border-teal-500/50 transition-all hover:shadow-lg group overflow-hidden ${
                coursesSection.isVisible ? 'animate-fade-in-delay-1' : 'opacity-0-initial'
              }`}>
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src="/images/team-collaboration.jpg" 
                    alt="AI for Education" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full mb-2">
                      EDUCATION
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>AI for Schools & Organizations</CardTitle>
                  <CardDescription>
                    Comprehensive AI literacy programs for educators, students, and institutional transformation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">3 courses • 15+ hours</span>
                    <Link href="/learn">
                      <Button variant="ghost" size="sm" className="text-teal-500 hover:text-teal-600">
                        Explore <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center px-4">
              <Link href="/learn">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white w-full sm:w-auto">
                  View All Courses
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
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

        {/* Demo Booking Form Section - 360learning style */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Headline and Benefits */}
              <div className="space-y-8">
                <div>
                  <div className="inline-block bg-blue-100 px-6 py-3 rounded-lg mb-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                      Discover the learning platform powered by collaborative learning.
                    </h2>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-black">A 15-minute discussion with an expert</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-black">100% tailored to your needs - with ❤️</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-black">No commitment. Free as can be.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Work Email"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600">
                      <option value="">Timeframe to buy an LMS</option>
                      <option value="immediate">Immediate (0-3 months)</option>
                      <option value="short">Short term (3-6 months)</option>
                      <option value="medium">Medium term (6-12 months)</option>
                      <option value="long">Long term (12+ months)</option>
                    </select>
                    <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600">
                      <option value="">Number of platform users</option>
                      <option value="small">1-50 users</option>
                      <option value="medium">51-200 users</option>
                      <option value="large">201-500 users</option>
                      <option value="enterprise">500+ users</option>
                    </select>
                  </div>
                  
                  <textarea
                    placeholder="Tell us more about your project"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  
                  <input
                    type="text"
                    placeholder="How did you hear about us?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold">
                    Book my demo
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By providing your contact info, you agree to receive communications from UpskillinTech. You can opt-out at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section 
          ref={ctaSection.elementRef as React.RefObject<HTMLElement>}
          className={`py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden transition-all duration-700 ${
            ctaSection.isVisible ? 'animate-fade-in-up' : 'opacity-0-initial'
          }`}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="container text-center relative z-10 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Are you ready to make a difference in the world?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-8 max-w-3xl mx-auto">
              The future of AI depends on you. Are you ready to get started?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg shadow-green-500/30 w-full sm:w-auto">
                  Start Learning Today
                  <Sparkles className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/consult">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
