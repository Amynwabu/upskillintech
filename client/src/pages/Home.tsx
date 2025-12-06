import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Zap, Users, Target, Sparkles, Award, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section - TheConstruct.ai inspired */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="container relative py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 z-10">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="block text-white/90 italic text-3xl md:text-4xl font-light mb-2">
                      Where Your
                    </span>
                    <span className="block bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      AI Journey
                    </span>
                    <span className="block text-white italic text-3xl md:text-4xl font-light mt-2">
                      Happens
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 max-w-lg">
                    Learn, Grow, and Transform with AI
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/learn">
                    <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 shadow-lg shadow-green-500/30">
                      Get started for FREE
                    </Button>
                  </Link>
                  {isAuthenticated ? (
                    <Link href="/profile">
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Log in
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative lg:block hidden">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20 border-2 border-green-500/20">
                  <img 
                    src="/images/hero-ai-training.jpg" 
                    alt="Professional AI Training Workshop" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" className="text-background"/>
            </svg>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-12 bg-background">
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
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Learn */}
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center border border-green-500/30">
                  <BookOpen className="text-green-500" size={32} />
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
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center border border-teal-500/30">
                  <TrendingUp className="text-teal-500" size={32} />
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
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-yellow-500/20 flex items-center justify-center border border-cyan-500/30">
                  <Sparkles className="text-cyan-500" size={32} />
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
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">10+</div>
                <div className="text-sm text-muted-foreground">Flagship Courses</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">1,000+</div>
                <div className="text-sm text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-yellow-500 bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-muted-foreground">Business Partners</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Preview */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Learning Journey</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from our comprehensive AI courses designed for professionals, businesses, and organizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Course category cards */}
              <Card className="border-2 hover:border-green-500/50 transition-all hover:shadow-lg group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
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

              <Card className="border-2 hover:border-teal-500/50 transition-all hover:shadow-lg group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
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

            <div className="text-center">
              <Link href="/learn">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                  View All Courses
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground italic">
                      "An amazing AI learning platform, and so easy to use by people at all levels and anywhere in the world."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                        SM
                      </div>
                      <div>
                        <div className="font-semibold">Sarah Mitchell</div>
                        <div className="text-sm text-muted-foreground">Business Transformation Lead</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground italic">
                      "Everything you need to start learning AI is here, and there are many interesting courses that aren't found on the internet!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        JC
                      </div>
                      <div>
                        <div className="font-semibold">James Chen</div>
                        <div className="text-sm text-muted-foreground">AI Development Manager</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="container text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Are you ready to make a difference in the world?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              The future of AI depends on you. Are you ready to get started?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg shadow-green-500/30">
                  Start Learning Today
                  <Sparkles className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/consult">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
