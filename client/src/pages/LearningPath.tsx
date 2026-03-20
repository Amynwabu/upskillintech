import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  CheckCircle2, 
  Circle, 
  Play, 
  BookOpen, 
  Award,
  ArrowRight,
  Lightbulb,
  Lock
} from "lucide-react";

interface Module {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

export default function LearningPath() {
  const [selectedModule, setSelectedModule] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string>("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const modules: Module[] = [
    { id: 1, title: "Introduction to AI", duration: "15 min", completed: true, locked: false },
    { id: 2, title: "AI in Business Applications", duration: "20 min", completed: true, locked: false },
    { id: 3, title: "Understanding Machine Learning", duration: "25 min", completed: true, locked: false },
    { id: 4, title: "AI Workflow Automation Fundamentals", duration: "25 min", completed: false, locked: false },
    { id: 5, title: "Prompt Engineering Basics", duration: "30 min", completed: false, locked: false },
    { id: 6, title: "AI Tools for Productivity", duration: "20 min", completed: false, locked: true },
    { id: 7, title: "Building AI-Powered Solutions", duration: "35 min", completed: false, locked: true },
    { id: 8, title: "Ethics and Responsible AI", duration: "25 min", completed: false, locked: true },
  ];

  const completedCount = modules.filter(m => m.completed).length;
  const progress = (completedCount / modules.length) * 100;

  const currentModule = modules.find(m => m.id === selectedModule);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleCompleteModule = () => {
    setShowQuiz(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-[76px]">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              AI Business Fundamentals
            </h1>
            <p className="text-muted-foreground mb-4">
              Master the essentials of AI integration for business growth
            </p>
            <div className="flex items-center gap-4">
              <Progress value={progress} className="flex-1 h-3" />
              <span className="text-sm font-medium">{completedCount}/{modules.length} Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Module List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Modules</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => !module.locked && setSelectedModule(module.id)}
                        disabled={module.locked}
                        className={`w-full text-left p-4 border-l-4 transition-all ${
                          selectedModule === module.id
                            ? "border-l-primary bg-primary/5"
                            : "border-l-transparent hover:bg-muted"
                        } ${module.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {module.completed ? (
                              <CheckCircle2 className="text-primary" size={20} />
                            ) : module.locked ? (
                              <Lock className="text-muted-foreground" size={20} />
                            ) : (
                              <Circle className="text-muted-foreground" size={20} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${module.locked ? "text-muted-foreground" : ""}`}>
                              {module.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{module.duration}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Badge */}
              {completedCount >= 3 && (
                <Card className="mt-4 border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Award className="text-primary mx-auto mb-2" size={48} />
                      <h3 className="font-semibold mb-1">Achievement Unlocked!</h3>
                      <p className="text-sm text-muted-foreground">AI Fundamentals Badge</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Main Panel - Lesson Content */}
            <div className="lg:col-span-3">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{currentModule?.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span>⏱️ {currentModule?.duration}</span>
                        <span>📚 Module {currentModule?.id} of {modules.length}</span>
                        <span>🎯 Intermediate</span>
                      </CardDescription>
                    </div>
                    {currentModule?.completed && (
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle2 size={20} />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Video Player Placeholder */}
                  <div className="w-full aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Play className="text-primary" size={40} />
                      </div>
                      <p className="text-muted-foreground">Video Lesson: {currentModule?.title}</p>
                    </div>
                  </div>

                  {/* Lesson Notes */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <BookOpen className="text-primary" size={20} />
                        Lesson Overview
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        In this module, you'll learn how to automate repetitive tasks using AI-powered tools and integrate them into your daily workflow. We'll cover practical examples from marketing automation to customer service bots.
                      </p>
                    </div>

                    <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="text-accent" size={18} />
                        Key Takeaways
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>✓ Understand the fundamentals of AI workflow automation</li>
                        <li>✓ Identify repetitive tasks suitable for automation</li>
                        <li>✓ Learn to integrate AI tools with existing systems</li>
                        <li>✓ Apply best practices for automation implementation</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Resources & Templates</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-start">
                          📄 Lesson Transcript
                        </Button>
                        <Button variant="outline" className="justify-start">
                          📊 Workflow Templates
                        </Button>
                        <Button variant="outline" className="justify-start">
                          🔗 Tool Integration Guide
                        </Button>
                        <Button variant="outline" className="justify-start">
                          💡 Case Studies
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-6">
                    {!currentModule?.completed && (
                      <Button 
                        onClick={handleCompleteModule}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Complete Module & Take Quiz
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1">
                      Apply This Lesson
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Quiz Dialog */}
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Module Quiz</DialogTitle>
            <DialogDescription>
              Test your understanding of {currentModule?.title}
            </DialogDescription>
          </DialogHeader>
          
          {!quizSubmitted ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">
                  Question 1: Which of the following is the best use case for AI workflow automation?
                </h3>
                <RadioGroup value={quizAnswer} onValueChange={setQuizAnswer}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border">
                      <RadioGroupItem value="a" id="a" />
                      <Label htmlFor="a" className="flex-1 cursor-pointer">
                        Complex creative decision-making requiring human intuition
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border">
                      <RadioGroupItem value="b" id="b" />
                      <Label htmlFor="b" className="flex-1 cursor-pointer">
                        Repetitive data entry and email categorization tasks
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border">
                      <RadioGroupItem value="c" id="c" />
                      <Label htmlFor="c" className="flex-1 cursor-pointer">
                        One-time strategic planning sessions
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                onClick={handleQuizSubmit}
                disabled={!quizAnswer}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Answer
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg text-center">
                <CheckCircle2 className="text-primary mx-auto mb-3" size={48} />
                <h3 className="font-semibold text-lg mb-2">Correct! Well done! 🎉</h3>
                <p className="text-muted-foreground">
                  You've successfully completed this module. Repetitive tasks like data entry and email categorization are perfect for AI automation.
                </p>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Recommended Next Steps:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Continue to Module {(currentModule?.id || 0) + 1}</li>
                  <li>✓ Apply this lesson using our Email Automation template</li>
                  <li>✓ Share your progress in the community</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    setShowQuiz(false);
                    setQuizSubmitted(false);
                    setQuizAnswer("");
                    if (currentModule && currentModule.id < modules.length) {
                      setSelectedModule(currentModule.id + 1);
                    }
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Next Module
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowQuiz(false);
                    setQuizSubmitted(false);
                    setQuizAnswer("");
                  }}
                  className="flex-1"
                >
                  Review Lesson
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
