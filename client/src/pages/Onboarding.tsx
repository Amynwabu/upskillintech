import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Briefcase, GraduationCap, Heart, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

type Domain = "business" | "education" | "faith" | "creator" | null;
type TimeCommitment = "5-10min" | "30min" | "1hour" | "2hours" | null;
type Interest = "automation" | "learning" | "consulting" | "community" | null;

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState<Domain>(null);
  const [timeCommitment, setTimeCommitment] = useState<TimeCommitment>(null);
  const [interest, setInterest] = useState<Interest>(null);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const domains = [
    {
      id: "business" as const,
      icon: Briefcase,
      title: "Business",
      description: "AI for workflow automation, productivity, and growth"
    },
    {
      id: "education" as const,
      icon: GraduationCap,
      title: "Education",
      description: "AI literacy for schools, teachers, and students"
    },
    {
      id: "faith" as const,
      icon: Heart,
      title: "Faith & Ministry",
      description: "AI integration for churches and community engagement"
    },
    {
      id: "creator" as const,
      icon: Sparkles,
      title: "Creator",
      description: "AI tools for content creation and entrepreneurship"
    }
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding and redirect to dashboard
      setLocation("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return domain !== null;
    if (step === 2) return timeCommitment !== null;
    if (step === 3) return interest !== null;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Start Your AI Journey</h1>
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Domain Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Choose Your Domain</CardTitle>
              <CardDescription>
                Select the area where you want to apply AI skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domains.map((d) => {
                  const Icon = d.icon;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDomain(d.id)}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        domain === d.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`mb-4 ${domain === d.id ? "text-primary" : "text-muted-foreground"}`} size={32} />
                      <h3 className="font-semibold text-lg mb-2">{d.title}</h3>
                      <p className="text-sm text-muted-foreground">{d.description}</p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Time Commitment */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How much time can you commit?</CardTitle>
              <CardDescription>
                We'll personalize your learning path based on your availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={timeCommitment || ""} onValueChange={(v) => setTimeCommitment(v as TimeCommitment)}>
                <div className="space-y-3">
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${timeCommitment === "5-10min" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="5-10min" id="5-10min" />
                    <Label htmlFor="5-10min" className="flex-1 cursor-pointer">
                      <div className="font-semibold">5-10 minutes daily</div>
                      <div className="text-sm text-muted-foreground">Quick micro-learning sessions</div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${timeCommitment === "30min" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="30min" id="30min" />
                    <Label htmlFor="30min" className="flex-1 cursor-pointer">
                      <div className="font-semibold">30 minutes daily</div>
                      <div className="text-sm text-muted-foreground">Balanced learning with practice</div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${timeCommitment === "1hour" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="1hour" id="1hour" />
                    <Label htmlFor="1hour" className="flex-1 cursor-pointer">
                      <div className="font-semibold">1 hour daily</div>
                      <div className="text-sm text-muted-foreground">Deep learning with projects</div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${timeCommitment === "2hours" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="2hours" id="2hours" />
                    <Label htmlFor="2hours" className="flex-1 cursor-pointer">
                      <div className="font-semibold">2+ hours daily</div>
                      <div className="text-sm text-muted-foreground">Intensive bootcamp style</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Interest Area */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What interests you most?</CardTitle>
              <CardDescription>
                This helps us recommend the best starting point for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={interest || ""} onValueChange={(v) => setInterest(v as Interest)}>
                <div className="space-y-3">
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${interest === "automation" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="automation" id="automation" />
                    <Label htmlFor="automation" className="flex-1 cursor-pointer">
                      <div className="font-semibold">AI Automation & Tools</div>
                      <div className="text-sm text-muted-foreground">Ready-to-use templates and workflows</div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${interest === "learning" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="learning" id="learning" />
                    <Label htmlFor="learning" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Structured Learning Paths</div>
                      <div className="text-sm text-muted-foreground">Courses, certifications, and skill building</div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${interest === "consulting" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="consulting" id="consulting" />
                    <Label htmlFor="consulting" className="flex-1 cursor-pointer">
                      <div className="font-semibold">AI Consulting & Integration</div>
                      <div className="text-sm text-muted-foreground">Custom solutions for organizations</div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${interest === "community" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="community" id="community" />
                    <Label htmlFor="community" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Community & Networking</div>
                      <div className="text-sm text-muted-foreground">Connect with experts and peers</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {step === totalSteps ? "Complete" : "Next"}
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
