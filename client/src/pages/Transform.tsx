import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Zap,
  Search,
  Filter,
  Star,
  Users,
  Play,
  Check,
  Rocket,
  Bot,
  Mail,
  Calendar,
  BarChart,
  MessageSquare,
  FileText,
  Briefcase
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function Transform() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showDeployModal, setShowDeployModal] = useState(false);

  // Sample templates data (will be replaced with tRPC query)
  const templates = [
    {
      id: 1,
      title: "AI Email Assistant",
      description: "Automate email responses with intelligent AI that learns your writing style",
      category: "business",
      icon: Mail,
      rating: 5,
      users: 1250,
      integrations: ["Gmail", "Outlook", "Slack"],
      isPremium: false,
    },
    {
      id: 2,
      title: "Social Media Content Generator",
      description: "Create engaging social media posts across all platforms with AI",
      category: "creator",
      icon: MessageSquare,
      rating: 5,
      users: 890,
      integrations: ["Twitter", "LinkedIn", "Facebook"],
      isPremium: false,
    },
    {
      id: 3,
      title: "Church Sermon Planner",
      description: "AI-powered sermon planning with scripture references and themes",
      category: "faith",
      icon: FileText,
      rating: 5,
      users: 450,
      integrations: ["Google Calendar", "Planning Center"],
      isPremium: true,
    },
    {
      id: 4,
      title: "Student Progress Tracker",
      description: "Track student learning progress with AI-powered insights",
      category: "education",
      icon: BarChart,
      rating: 4,
      users: 670,
      integrations: ["Google Classroom", "Canvas"],
      isPremium: false,
    },
    {
      id: 5,
      title: "Business Analytics Dashboard",
      description: "Real-time business metrics and AI-powered predictions",
      category: "business",
      icon: Briefcase,
      rating: 5,
      users: 1100,
      integrations: ["Salesforce", "HubSpot", "Google Analytics"],
      isPremium: true,
    },
    {
      id: 6,
      title: "AI Meeting Scheduler",
      description: "Automatically schedule meetings based on availability and preferences",
      category: "business",
      icon: Calendar,
      rating: 5,
      users: 980,
      integrations: ["Google Calendar", "Outlook", "Zoom"],
      isPremium: false,
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeploy = (template: any) => {
    setSelectedTemplate(template);
    setShowDeployModal(true);
  };

  const confirmDeploy = () => {
    toast.success(`${selectedTemplate?.title} deployed successfully!`);
    setShowDeployModal(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-[76px] pb-12">
        {/* Hero Section */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 45%, #f0f9ff 100%)" }}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4" variant="secondary">
                  <Zap className="mr-1" size={14} />
                  Ready-to-Use AI Tools
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Apply AI to Your Work
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Choose from our library of automation templates, customize them to your needs,
                  and deploy in minutes. No coding required.
                </p>
                {/* Search Bar */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <Input
                      placeholder="Search templates..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter size={20} className="mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/ai-collaboration.jpg"
                  alt="Professionals collaborating with AI technology"
                  className="rounded-lg shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-8 border-b">
          <div className="container">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="faith">Faith</TabsTrigger>
                <TabsTrigger value="creator">Creator</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "all" ? "All Templates" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Templates`}
                </h2>
                <p className="text-muted-foreground">
                  {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} available
                </p>
              </div>
            </div>

            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Icon className="text-primary" size={24} />
                          </div>
                          {template.isPremium && (
                            <Badge variant="secondary">Premium</Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Stats */}
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="text-yellow-500 fill-yellow-500" size={16} />
                              <span className="font-medium">{template.rating}.0</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users size={16} />
                              <span>{template.users.toLocaleString()} users</span>
                            </div>
                          </div>

                          {/* Integrations */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Integrates with:</p>
                            <div className="flex flex-wrap gap-1">
                              {template.integrations.map((integration) => (
                                <Badge key={integration} variant="outline" className="text-xs">
                                  {integration}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              className="flex-1"
                              onClick={() => handleDeploy(template)}
                            >
                              <Rocket size={16} className="mr-2" />
                              {template.isPremium ? "Buy & Deploy" : "Deploy Now"}
                            </Button>
                            <Button variant="outline" size="icon">
                              <Play size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bot size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or category filter
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Deploy AI automation in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Template</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our library and select the perfect automation for your needs
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Configure Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your tools and customize the automation to match your workflow
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Deploy & Monitor</h3>
                <p className="text-sm text-muted-foreground">
                  Launch your automation and track its performance in real-time
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Deploy Modal */}
      <Dialog open={showDeployModal} onOpenChange={setShowDeployModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deploy {selectedTemplate?.title}</DialogTitle>
            <DialogDescription>
              Configure your automation settings and connect your integrations
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-semibold mb-2">Required Integrations:</h4>
              <div className="space-y-2">
                {selectedTemplate?.integrations.map((integration: string) => (
                  <div key={integration} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{integration}</span>
                    <Button size="sm" variant="outline">
                      <Check size={16} className="mr-2" />
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={confirmDeploy} className="flex-1">
                <Rocket size={16} className="mr-2" />
                Deploy Now
              </Button>
              <Button variant="outline" onClick={() => setShowDeployModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
