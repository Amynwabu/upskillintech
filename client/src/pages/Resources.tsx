import { Link } from "wouter";
import { BookOpen, FileText, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Resources() {
  const resourceCategories = [
    {
      title: "Blog",
      description: "Insights, tutorials, and best practices for AI implementation and career development",
      icon: BookOpen,
      href: "/blog",
      gradient: "from-blue-500 to-cyan-500",
      stats: "50+ Articles",
    },
    {
      title: "Research",
      description: "In-depth research papers, case studies, and whitepapers on AI trends and applications",
      icon: FileText,
      href: "/resources/research",
      gradient: "from-purple-500 to-pink-500",
      stats: "20+ Papers",
    },
    {
      title: "Events",
      description: "Upcoming workshops, webinars, and conferences to accelerate your AI journey",
      icon: Calendar,
      href: "/resources/events",
      gradient: "from-green-500 to-teal-500",
      stats: "15+ Events",
    },
  ];

  return (
        <>
                <Navigation />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Knowledge Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI Learning{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Explore our curated collection of blogs, research papers, and events to stay ahead in the AI revolution
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resourceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.href} href={category.href}>
                  <div className="group relative h-full">
                    {/* Card */}
                    <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
                      {/* Icon with gradient background */}
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.gradient} mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                      <p className="text-muted-foreground mb-6 min-h-[60px]">
                        {category.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-primary">
                          {category.stats}
                        </span>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Bottom gradient line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Explore Our Resources?</h2>
              <p className="text-muted-foreground">
                Stay informed, inspired, and ahead of the curve with expert insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-2">🎯 Practical Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Real-world applications and actionable strategies you can implement immediately
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-2">📊 Data-Driven Research</h3>
                <p className="text-sm text-muted-foreground">
                  Evidence-based findings from industry experts and academic institutions
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-2">🚀 Latest Trends</h3>
                <p className="text-sm text-muted-foreground">
                  Stay updated with emerging AI technologies and best practices
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-2">🤝 Community Events</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with peers and learn from industry leaders at our events
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of professionals transforming their careers with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Explore Courses
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  Read Latest Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
        <Footer />
              </>
          );
}
