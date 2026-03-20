import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Search, 
  Zap, 
  Mail, 
  MessageSquare, 
  BarChart3, 
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Settings,
  Play
} from "lucide-react";

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: any;
  rating: number;
  users: number;
  price: string;
  integrations: string[];
}

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  const templates: Template[] = [
    {
      id: 1,
      title: "Email Marketing Bot",
      description: "Automate your email campaigns with AI-powered personalization and scheduling",
      category: "business",
      icon: Mail,
      rating: 4.8,
      users: 1250,
      price: "Free",
      integrations: ["Gmail", "Mailchimp", "HubSpot"]
    },
    {
      id: 2,
      title: "Social Media Manager",
      description: "Schedule posts, generate content, and analyze engagement across platforms",
      category: "business",
      icon: MessageSquare,
      rating: 4.6,
      users: 980,
      price: "$9/mo",
      integrations: ["Twitter", "LinkedIn", "Facebook"]
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "Real-time insights and data visualization for business metrics",
      category: "business",
      icon: BarChart3,
      rating: 4.9,
      users: 2100,
      price: "Free",
      integrations: ["Google Analytics", "Tableau", "Power BI"]
    },
    {
      id: 4,
      title: "Customer Service AI",
      description: "24/7 automated support with intelligent response generation",
      category: "business",
      icon: Users,
      rating: 4.7,
      users: 1560,
      price: "$19/mo",
      integrations: ["Zendesk", "Intercom", "Slack"]
    },
    {
      id: 5,
      title: "Lesson Plan Generator",
      description: "Create engaging lesson plans with AI-powered curriculum design",
      category: "education",
      icon: Zap,
      rating: 4.5,
      users: 750,
      price: "Free",
      integrations: ["Google Classroom", "Canvas", "Moodle"]
    },
    {
      id: 6,
      title: "Community Engagement Bot",
      description: "Automate outreach and member communication for faith communities",
      category: "faith",
      icon: MessageSquare,
      rating: 4.8,
      users: 420,
      price: "Free",
      integrations: ["Planning Center", "Church Community Builder"]
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setShowWizard(true);
    setWizardStep(1);
  };

  const wizardSteps = [
    { id: 1, title: "Choose Integration", description: "Select the tools you want to connect" },
    { id: 2, title: "Configure Settings", description: "Customize your automation preferences" },
    { id: 3, title: "Deploy & Test", description: "Launch your automated workflow" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-[76px]">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              AI Template Library
            </h1>
            <p className="text-muted-foreground">
              Ready-to-use automation templates with one-click setup
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="faith">Faith</TabsTrigger>
                  <TabsTrigger value="creator">Creator</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="border-2 hover:border-primary/50 transition-all group">
                  <CardHeader>
                    <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
                      <Icon className="text-primary" size={48} />
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{template.title}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="text-accent fill-accent" size={14} />
                            <span className="text-sm font-medium">{template.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{template.users} users</span>
                        </div>
                      </div>
                      <Badge variant={template.price === "Free" ? "secondary" : "default"}>
                        {template.price}
                      </Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Integrations:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.integrations.map((integration) => (
                          <Badge key={integration} variant="outline" className="text-xs">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Use Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Showcase Section */}
          <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2">
            <CardHeader>
              <CardTitle className="text-2xl">How Users Are Succeeding</CardTitle>
              <CardDescription>Real results from our template library</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-primary mb-2">85%</div>
                  <p className="text-sm text-muted-foreground">Time saved on repetitive tasks</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-secondary mb-2">3.2x</div>
                  <p className="text-sm text-muted-foreground">Increase in productivity</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-accent mb-2">$12K</div>
                  <p className="text-sm text-muted-foreground">Average annual savings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Setup Wizard Dialog */}
      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Setup: {selectedTemplate?.title}</DialogTitle>
            <DialogDescription>
              Step {wizardStep} of {wizardSteps.length}: {wizardSteps[wizardStep - 1]?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {wizardSteps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      wizardStep > step.id ? "bg-primary text-primary-foreground" :
                      wizardStep === step.id ? "bg-primary/20 border-2 border-primary text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {wizardStep > step.id ? <CheckCircle2 size={20} /> : step.id}
                    </div>
                    <p className="text-xs mt-2 text-center">{step.title}</p>
                  </div>
                  {index < wizardSteps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 ${
                      wizardStep > step.id ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Select Integration Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedTemplate?.integrations.map((integration) => (
                    <button
                      key={integration}
                      className="p-4 border-2 rounded-lg hover:border-primary transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="text-primary" size={24} />
                        <div>
                          <p className="font-medium">{integration}</p>
                          <p className="text-xs text-muted-foreground">Connect account</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Configure Your Automation</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Automation Name</label>
                    <Input placeholder="My Email Campaign" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Schedule</label>
                    <Input type="time" />
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm">
                      💡 <strong>Tip:</strong> Start with a simple schedule and adjust based on performance metrics.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4">
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <Play className="text-primary mx-auto mb-3" size={48} />
                  <h3 className="font-semibold text-lg mb-2">Ready to Deploy!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your automation is configured and ready to launch. You can test it first or deploy immediately.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Integration</p>
                    <p className="font-medium">{selectedTemplate?.integrations[0]}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Schedule</p>
                    <p className="font-medium">Daily at 9:00 AM</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => wizardStep > 1 && setWizardStep(wizardStep - 1)}
                disabled={wizardStep === 1}
              >
                Back
              </Button>
              
              {wizardStep < wizardSteps.length ? (
                <Button
                  onClick={() => setWizardStep(wizardStep + 1)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Next
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowWizard(false);
                    setWizardStep(1);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Deploy Automation
                  <CheckCircle2 className="ml-2" size={16} />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
