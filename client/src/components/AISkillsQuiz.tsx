import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SocialShareButtons from "@/components/SocialShareButtons";
import { 
  quizQuestions, 
  learningPaths, 
  calculateLearningPath,
  type LearningPath 
} from "@/data/quizData";
import { 
  BookOpen, 
  Zap, 
  Rocket, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Link } from "wouter";

const iconMap = {
  BookOpen,
  Zap,
  Rocket,
  Briefcase
};

export default function AISkillsQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedPath, setRecommendedPath] = useState<LearningPath | null>(null);

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentStep === quizQuestions.length - 1;
  const canProceed = answers[currentQuestion?.id];

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate and show results
      const pathId = calculateLearningPath(answers);
      setRecommendedPath(learningPaths[pathId]);
      setShowResults(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setRecommendedPath(null);
  };

  if (showResults && recommendedPath) {
    const IconComponent = iconMap[recommendedPath.icon as keyof typeof iconMap];
    
    return (
      <Card className="w-full max-w-3xl mx-auto border-2 border-primary/20 shadow-xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <div>
            <CardTitle className="text-3xl mb-2">Your Personalized Learning Path</CardTitle>
            <CardDescription className="text-base">
              Based on your responses, we recommend the following path
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Recommended Path Card */}
          <div className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${recommendedPath.color} text-white`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-2">
                    {recommendedPath.level}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{recommendedPath.title}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {recommendedPath.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Recommended Courses for You
            </h4>
            <div className="space-y-2">
              {recommendedPath.recommendedCourses.map((course, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium">{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/learn" className="flex-1">
              <Button size="lg" className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                Start Learning Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleRestart}
              className="flex-1"
            >
              Retake Quiz
            </Button>
          </div>

          {/* Social Share Buttons */}
          <div className="pt-6 border-t border-border">
            <SocialShareButtons learningPath={recommendedPath} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-2 border-primary/20 shadow-xl">
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl">AI Skills Assessment</CardTitle>
          <CardDescription>
            Answer {quizQuestions.length} quick questions to get your personalized learning path
          </CardDescription>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentStep + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
          {currentQuestion.description && (
            <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
          )}
        </div>

        {/* Options */}
        <RadioGroup 
          value={answers[currentQuestion.id] || ""} 
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {currentQuestion.options.map((option) => (
            <div key={option.id} className="relative">
              <RadioGroupItem
                value={option.value}
                id={option.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={option.id}
                className="flex items-center gap-3 p-4 rounded-lg border-2 border-border bg-background cursor-pointer transition-all hover:border-primary/50 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-muted-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100"></div>
                </div>
                <span className="text-sm font-medium">{option.text}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
          >
            {isLastQuestion ? "See Results" : "Next"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
