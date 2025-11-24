import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ArrowRight, BookOpen, Zap, Users, ShoppingBag, Sparkles, Target, TrendingUp } from "lucide-react";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  useSmoothScroll();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
          <div className="container py-20 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                    Transform Skills.
                  </span>
                  <br />
                  <span className="text-foreground">Power Growth.</span>
                  <br />
                  <span className="text-foreground">Live AI.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Your bridge from AI awareness to AI integration. Helping businesses adopt AI, automate workflows, and upskill teams with practical tools and training.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Your AI Journey
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button size="lg" variant="outline">
                    Explore Courses
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/images/hero-training.jpg" 
                  alt="AI Training Workshop" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">Flagship Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">500+</div>
                <div className="text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">50+</div>
                <div className="text-muted-foreground">Business Partners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Offerings Preview */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Complete AI Ecosystem</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From learning to implementation, we provide everything you need to thrive in the AI era.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <CardTitle>Learn</CardTitle>
                  <CardDescription>
                    Structured courses, certifications, and live workshops for individuals and organizations.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-secondary transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Zap className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Apply</CardTitle>
                  <CardDescription>
                    Ready-to-use automation templates, AI tools, and practical business solutions.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Target className="text-accent" size={24} />
                  </div>
                  <CardTitle>Consult</CardTitle>
                  <CardDescription>
                    Partner with us to design and integrate custom AI systems and strategies.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="text-primary" size={24} />
                  </div>
                  <CardTitle>Community</CardTitle>
                  <CardDescription>
                    Connect with AI experts, join live events, and grow with like-minded innovators.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Future with AI?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals and businesses already leveraging AI to drive growth and innovation.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Get Started Today
              <Sparkles className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

        {/* Learn Section */}
        <section id="learn" className="py-20 bg-card">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Learn</span> AI Skills
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Structured courses, certifications, and live workshops designed for individuals and organizations at every level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="/images/mentorship.jpg" 
                  alt="AI Mentorship" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">AI Literacy Programs</h3>
                    <p className="text-white/90">For children, adults, organizations, and governments</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="text-primary" size={24} />
                      Flagship Courses
                    </CardTitle>
                    <CardDescription>
                      Comprehensive AI training covering business applications, automation, entrepreneurship, and personal development.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ AI in Business & Workflow Automation</li>
                      <li>✓ Building AI-Powered Startups</li>
                      <li>✓ AI for Well-being & Lifestyle</li>
                      <li>✓ AI Integration for Churches & Ministries</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="text-secondary" size={24} />
                      Live Workshops & Bootcamps
                    </CardTitle>
                    <CardDescription>
                      Interactive sessions with hands-on projects and real-world applications.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore All Courses
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>

        {/* Apply Section */}
        <section id="apply" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Apply</span> AI Solutions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready-to-use automation templates and AI tools to transform your workflows and boost productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Automation Templates</h3>
                <p className="text-muted-foreground">
                  Pre-built AI solutions designed for immediate implementation in your business operations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="border-2 hover:border-secondary transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">Marketing Bots</CardTitle>
                      <CardDescription className="text-sm">
                        Automate social media, email campaigns, and content creation
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-secondary transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">Task Assistants</CardTitle>
                      <CardDescription className="text-sm">
                        Intelligent workflow automation for daily operations
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-secondary transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">Analytics Dashboards</CardTitle>
                      <CardDescription className="text-sm">
                        Real-time insights and data visualization tools
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-secondary transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Service AI</CardTitle>
                      <CardDescription className="text-sm">
                        24/7 automated support and engagement systems
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="/images/ai-automation.jpg" 
                  alt="AI Automation" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" variant="outline">
                Browse Templates
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>

        {/* Consult Section */}
        <section id="consult" className="py-20 bg-card">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Consult</span> & Transform
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Partner with us to design and integrate custom AI systems tailored to your organization's unique needs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden order-2 lg:order-1">
                <img 
                  src="/images/ai-transformation.jpg" 
                  alt="AI Transformation" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>

              <div className="space-y-6 order-1 lg:order-2">
                <h3 className="text-2xl font-bold">AI Transformation Programs</h3>
                <p className="text-muted-foreground">
                  Comprehensive consulting services to help your organization navigate the AI revolution with confidence.
                </p>

                <div className="space-y-4">
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="text-primary" size={20} />
                        For SMEs & Enterprises
                      </CardTitle>
                      <CardDescription>
                        Strategic AI integration, workflow optimization, and digital transformation roadmaps
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-secondary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BookOpen className="text-secondary" size={20} />
                        For Schools & Education
                      </CardTitle>
                      <CardDescription>
                        AI curriculum development, teacher training, and student engagement programs
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-accent">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Sparkles className="text-accent" size={20} />
                        For Ministries & Churches
                      </CardTitle>
                      <CardDescription>
                        Faith-integrated AI solutions for community engagement and operational excellence
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                  Schedule Consultation
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Community</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with AI experts, tool creators, and learners. Collaborate, learn, and grow together in our vibrant ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="/images/community.jpg" 
                  alt="Community Engagement" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Global AI Network</h3>
                    <p className="text-white/90">Thousands of innovators, creators, and learners worldwide</p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="/images/networking.jpg" 
                  alt="Professional Networking" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Expert Mentorship</h3>
                    <p className="text-white/90">One-on-one guidance from industry professionals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="text-primary" size={24} />
                  </div>
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>
                    Ask questions, share insights, and collaborate on projects with fellow AI enthusiasts.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-secondary transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Sparkles className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Live Events</CardTitle>
                  <CardDescription>
                    Join webinars, workshops, and AI challenge events to learn and network in real-time.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Target className="text-accent" size={24} />
                  </div>
                  <CardTitle>AI Mentors</CardTitle>
                  <CardDescription>
                    Get personalized guidance from certified AI professionals and industry experts.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Join the Community
                <Users className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section id="marketplace" className="py-20 bg-card">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Marketplace</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover premium AI tools, templates, and resources. Monetize your expertise by selling your own creations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="text-accent" size={48} />
                  </div>
                  <CardTitle className="text-lg">AI Tools & Plugins</CardTitle>
                  <CardDescription>
                    Pre-built solutions ready to integrate into your workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">50+ Tools</span>
                    <Button size="sm" variant="outline">Browse</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-secondary transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="text-secondary" size={48} />
                  </div>
                  <CardTitle className="text-lg">Templates & Guides</CardTitle>
                  <CardDescription>
                    Downloadable templates for automation and workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">100+ Templates</span>
                    <Button size="sm" variant="outline">Browse</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="text-primary" size={48} />
                  </div>
                  <CardTitle className="text-lg">eBooks & Courses</CardTitle>
                  <CardDescription>
                    In-depth learning materials and certification programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">25+ Resources</span>
                    <Button size="sm" variant="outline">Browse</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="text-accent" size={48} />
                  </div>
                  <CardTitle className="text-lg">Sell Your Creations</CardTitle>
                  <CardDescription>
                    Monetize your AI expertise and tools on our platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Join Sellers</span>
                    <Button size="sm" variant="outline">Start</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Become a Marketplace Creator</h3>
                  <p className="text-muted-foreground mb-6">
                    Share your AI tools, templates, and knowledge with our global community. Earn revenue while helping others succeed in their AI journey.
                  </p>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>Set your own pricing and licensing terms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="text-secondary text-xs">✓</span>
                      </div>
                      <span>Reach thousands of potential customers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent text-xs">✓</span>
                      </div>
                      <span>Get support from our creator community</span>
                    </li>
                  </ul>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Apply as Creator
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-6 bg-background rounded-xl border border-border">
                      <div className="text-3xl font-bold text-primary mb-2">85%</div>
                      <div className="text-sm text-muted-foreground">Creator Revenue Share</div>
                    </div>
                    <div className="text-center p-6 bg-background rounded-xl border border-border">
                      <div className="text-3xl font-bold text-secondary mb-2">200+</div>
                      <div className="text-sm text-muted-foreground">Active Creators</div>
                    </div>
                    <div className="text-center p-6 bg-background rounded-xl border border-border">
                      <div className="text-3xl font-bold text-accent mb-2">$50K+</div>
                      <div className="text-sm text-muted-foreground">Monthly Sales</div>
                    </div>
                    <div className="text-center p-6 bg-background rounded-xl border border-border">
                      <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                      <div className="text-sm text-muted-foreground">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Future with AI?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals and businesses already leveraging AI to drive growth and innovation.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Get Started Today
              <Sparkles className="ml-2" size={20} />
            </Button>
          </div>
        </section>
