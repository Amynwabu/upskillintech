import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Play,
  BookOpen,
  FileText,
  Award,
  Sparkles,
  Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function LearningPlayer() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const courseId = parseInt(params.courseId || "0");

  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [notes, setNotes] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [videoWatched, setVideoWatched] = useState(false);

  const { data: courseDetails } = trpc.courses.getWithDetails.useQuery({ id: courseId });
  const { data: progressData } = trpc.courses.getProgress.useQuery({ courseId });
  
  const completeModuleMutation = trpc.courses.completeModule.useMutation({
    onSuccess: (data) => {
      toast.success(`Module completed! +${data.xpEarned} XP`, {
        icon: <Sparkles className="text-yellow-500" />,
      });
      setVideoWatched(false);
      setQuizSubmitted(false);
      setQuizAnswers({});
      setNotes("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const modules = courseDetails?.modules || [];
  const currentModule = modules[currentModuleIndex];
  const completedModuleIds = new Set(progressData?.completedModules.map(m => m.moduleId) || []);
  const isCurrentModuleCompleted = currentModule ? completedModuleIds.has(currentModule.id) : false;

  // Sample quiz data (in real app, this would come from database)
  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary benefit of AI automation in business?",
      options: [
        "Increased manual work",
        "Reduced efficiency and productivity",
        "Streamlined workflows and time savings",
        "Higher operational costs",
      ],
      correctAnswer: 2,
      explanation: "AI automation streamlines workflows, reduces repetitive tasks, and significantly improves productivity while lowering costs.",
    },
    {
      id: 2,
      question: "Which AI tool is best for content creation?",
      options: [
        "Spreadsheet software",
        "ChatGPT or similar language models",
        "Basic calculators",
        "Email clients",
      ],
      correctAnswer: 1,
      explanation: "Language models like ChatGPT excel at generating various types of content including articles, emails, and creative writing.",
    },
    {
      id: 3,
      question: "What should be your first step when implementing AI in your organization?",
      options: [
        "Buy the most expensive AI tools",
        "Identify specific problems AI can solve",
        "Replace all employees immediately",
        "Ignore training and education",
      ],
      correctAnswer: 1,
      explanation: "Successful AI implementation starts with identifying specific business problems and use cases where AI can provide value.",
    },
  ];

  const handleQuizSubmit = () => {
    let correct = 0;
    quizQuestions.forEach((q) => {
      if (parseInt(quizAnswers[q.id]) === q.correctAnswer) {
        correct++;
      }
    });
    const score = Math.round((correct / quizQuestions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 70) {
      toast.success(`Quiz passed! Score: ${score}%`);
    } else {
      toast.error(`Quiz failed. Score: ${score}%. You need 70% to pass.`);
    }
  };

  const handleCompleteModule = () => {
    if (!currentModule) return;

    if (!videoWatched) {
      toast.error("Please watch the video before completing this module");
      return;
    }

    if (!quizSubmitted || quizScore < 70) {
      toast.error("Please complete and pass the quiz (70% or higher) before completing this module");
      return;
    }

    completeModuleMutation.mutate({
      courseId,
      moduleId: currentModule.id,
    });
  };

  const handleNextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setVideoWatched(false);
      setQuizSubmitted(false);
      setQuizAnswers({});
      setNotes("");
    }
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setVideoWatched(false);
      setQuizSubmitted(false);
      setQuizAnswers({});
      setNotes("");
    }
  };

  const progressPercentage = progressData?.progress || 0;
  const canCompleteModule = videoWatched && quizSubmitted && quizScore >= 70 && !isCurrentModuleCompleted;

  if (!courseDetails || !currentModule) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading course...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-[76px]">
        <div className="flex h-[calc(100vh-5rem)]">
          {/* Sidebar - Module Navigation */}
          <aside className="w-80 border-r border-border bg-muted/30 overflow-y-auto">
            <div className="p-4 border-b border-border bg-background">
              <Link href={`/course/${courseId}`}>
                <Button variant="ghost" size="sm" className="mb-2">
                  <ChevronLeft size={16} className="mr-1" />
                  Back to Course
                </Button>
              </Link>
              <h2 className="font-bold text-lg mb-2">{courseDetails.title}</h2>
              <div className="space-y-2">
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {progressData?.completedModules.length || 0} / {modules.length} modules
                  </span>
                  <span className="font-semibold">{progressPercentage}%</span>
                </div>
              </div>
            </div>

            <div className="p-2">
              {modules.map((module, index) => {
                const isCompleted = completedModuleIds.has(module.id);
                const isCurrent = index === currentModuleIndex;
                const isLocked = index > 0 && !completedModuleIds.has(modules[index - 1].id);

                return (
                  <button
                    key={module.id}
                    onClick={() => !isLocked && setCurrentModuleIndex(index)}
                    disabled={isLocked}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                        ? "bg-primary/10 hover:bg-primary/20"
                        : isLocked
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isCompleted ? (
                          <CheckCircle2 size={20} className="text-primary" />
                        ) : isLocked ? (
                          <Lock size={20} className="text-muted-foreground" />
                        ) : (
                          <Circle size={20} className="text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">Module {index + 1}</span>
                          {isCompleted && (
                            <Badge variant="secondary" className="text-xs">
                              +50 XP
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium line-clamp-2">{module.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{module.duration} min</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="container max-w-5xl py-6">
              {/* Video Player */}
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center relative">
                    {/* Placeholder for video player - in production, use YouTube embed or video.js */}
                    <div className="text-white text-center">
                      <Play size={64} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold mb-2">{currentModule.title}</p>
                      <p className="text-sm opacity-75">Video Player Placeholder</p>
                      <Button
                        onClick={() => setVideoWatched(true)}
                        className="mt-4"
                        variant="secondary"
                      >
                        {videoWatched ? "Video Watched ✓" : "Mark Video as Watched"}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-1">{currentModule.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Module {currentModuleIndex + 1} of {modules.length} • {currentModule.duration} minutes
                        </p>
                      </div>
                      {isCurrentModuleCompleted && (
                        <Badge variant="default" className="bg-primary">
                          <CheckCircle2 size={16} className="mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabbed Content */}
              <Tabs defaultValue="overview" className="mb-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">
                    <BookOpen size={16} className="mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="quiz">
                    <Award size={16} className="mr-2" />
                    Quiz
                  </TabsTrigger>
                  <TabsTrigger value="notes">
                    <FileText size={16} className="mr-2" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="resources">
                    <Sparkles size={16} className="mr-2" />
                    Resources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Module Overview</CardTitle>
                      <CardDescription>What you'll learn in this module</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {currentModule.description || "This module covers essential concepts and practical applications."}
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Key Takeaways:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>Understand core AI concepts and terminology</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>Learn practical applications in real-world scenarios</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>Gain hands-on experience with AI tools</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quiz">
                  <Card>
                    <CardHeader>
                      <CardTitle>Module Quiz</CardTitle>
                      <CardDescription>
                        Test your knowledge (70% required to pass)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!quizSubmitted ? (
                        <div className="space-y-6">
                          {quizQuestions.map((q, index) => (
                            <div key={q.id} className="space-y-3">
                              <h4 className="font-semibold">
                                {index + 1}. {q.question}
                              </h4>
                              <RadioGroup
                                value={quizAnswers[q.id]}
                                onValueChange={(value) =>
                                  setQuizAnswers({ ...quizAnswers, [q.id]: value })
                                }
                              >
                                {q.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem value={optIndex.toString()} id={`q${q.id}-${optIndex}`} />
                                    <Label htmlFor={`q${q.id}-${optIndex}`} className="cursor-pointer">
                                      {option}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          ))}
                          <Button
                            onClick={handleQuizSubmit}
                            disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                            className="w-full"
                          >
                            Submit Quiz
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className={`p-4 rounded-lg ${quizScore >= 70 ? "bg-primary/10" : "bg-destructive/10"}`}>
                            <h3 className="font-bold text-lg mb-2">
                              Quiz Score: {quizScore}%
                            </h3>
                            <p className={quizScore >= 70 ? "text-primary" : "text-destructive"}>
                              {quizScore >= 70
                                ? "Congratulations! You passed the quiz."
                                : "You need 70% or higher to pass. Please review the material and try again."}
                            </p>
                          </div>

                          {quizQuestions.map((q, index) => {
                            const userAnswer = parseInt(quizAnswers[q.id]);
                            const isCorrect = userAnswer === q.correctAnswer;

                            return (
                              <div key={q.id} className="space-y-2">
                                <h4 className="font-semibold">
                                  {index + 1}. {q.question}
                                </h4>
                                <div className="space-y-2">
                                  {q.options.map((option, optIndex) => (
                                    <div
                                      key={optIndex}
                                      className={`p-3 rounded-lg border ${
                                        optIndex === q.correctAnswer
                                          ? "border-primary bg-primary/10"
                                          : optIndex === userAnswer && !isCorrect
                                          ? "border-destructive bg-destructive/10"
                                          : "border-border"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        {optIndex === q.correctAnswer && (
                                          <CheckCircle2 size={16} className="text-primary" />
                                        )}
                                        {optIndex === userAnswer && !isCorrect && (
                                          <Circle size={16} className="text-destructive" />
                                        )}
                                        <span>{option}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground italic">
                                  {q.explanation}
                                </p>
                              </div>
                            );
                          })}

                          <Button
                            onClick={() => {
                              setQuizSubmitted(false);
                              setQuizAnswers({});
                            }}
                            variant="outline"
                            className="w-full"
                          >
                            Retake Quiz
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Notes</CardTitle>
                      <CardDescription>Take notes as you learn</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Write your notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[300px]"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Notes are automatically saved
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources">
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Resources</CardTitle>
                      <CardDescription>Supplementary materials and links</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <a
                          href="#"
                          className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText size={20} className="text-primary" />
                            <div>
                              <p className="font-semibold">Module Slides (PDF)</p>
                              <p className="text-sm text-muted-foreground">Download presentation slides</p>
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen size={20} className="text-secondary" />
                            <div>
                              <p className="font-semibold">Recommended Reading</p>
                              <p className="text-sm text-muted-foreground">External articles and guides</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation and Completion */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={handlePreviousModule}
                      disabled={currentModuleIndex === 0}
                      variant="outline"
                    >
                      <ChevronLeft size={16} className="mr-1" />
                      Previous Module
                    </Button>

                    <div className="flex gap-2">
                      {!isCurrentModuleCompleted && (
                        <Button
                          onClick={handleCompleteModule}
                          disabled={!canCompleteModule || completeModuleMutation.isPending}
                          className="bg-primary"
                        >
                          <CheckCircle2 size={16} className="mr-2" />
                          {completeModuleMutation.isPending ? "Completing..." : "Mark as Complete"}
                        </Button>
                      )}

                      <Button
                        onClick={handleNextModule}
                        disabled={currentModuleIndex === modules.length - 1}
                      >
                        Next Module
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </div>

                  {!videoWatched && (
                    <p className="text-sm text-muted-foreground mt-3 text-center">
                      Watch the video and pass the quiz to complete this module
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
