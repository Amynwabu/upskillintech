import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BookOpen, 
  Zap, 
  Users, 
  Trophy, 
  Flame, 
  Target,
  ArrowRight,
  Play,
  Calendar,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  // Mock user data - in real app, this would come from context/API
  const userName = "Makzeon";
  const currentStreak = 7;
  const totalXP = 1250;
  const completedModules = 8;
  const totalModules = 15;
  const progress = (completedModules / totalModules) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-[76px] bg-[#F7F8FA]">
        <div className="container py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span style={{ background: "linear-gradient(135deg, #0D9488, #38B54A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{userName}</span>! 👋
            </h1>
            <p className="text-muted-foreground">Continue your AI journey and reach new milestones</p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Learning Progress</CardTitle>
                  <CardDescription>You're {Math.round(progress)}% through your current path</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                      <Flame size={24} />
                      {currentStreak}
                    </div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-2xl font-bold text-secondary">
                      <Trophy size={24} />
                      {totalXP}
                    </div>
                    <div className="text-xs text-muted-foreground">Total XP</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{completedModules} modules completed</span>
                <span>{totalModules - completedModules} remaining</span>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Next Module Widget */}
            <Card className="lg:col-span-2 border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-primary" size={24} />
                  <CardTitle>Next Module</CardTitle>
                </div>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">AI Workflow Automation Fundamentals</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to automate repetitive tasks using AI-powered tools and integrate them into your daily workflow.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>📚 Module 9 of 15</span>
                      <span>⏱️ 25 min</span>
                      <span>🎯 Intermediate</span>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Play className="mr-2" size={16} />
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* This Week's Template */}
            <Card className="border-2 hover:border-secondary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="text-secondary" size={24} />
                  <CardTitle>This Week's Template</CardTitle>
                </div>
                <CardDescription>Recommended for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center">
                    <Zap className="text-secondary" size={48} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Marketing Bot</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Automate your email campaigns with AI-powered personalization
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Use Template
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Widgets Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Community Highlights */}
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="text-accent" size={24} />
                  <CardTitle className="text-lg">Community Highlights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="text-primary mt-1" size={16} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Live Workshop: AI for SMEs</p>
                      <p className="text-xs text-muted-foreground">Tomorrow at 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <TrendingUp className="text-secondary mt-1" size={16} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New: AI Challenge Week</p>
                      <p className="text-xs text-muted-foreground">Join 500+ participants</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="text-primary" size={24} />
                  <CardTitle className="text-lg">Recent Achievements</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      🏆
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Week Warrior</p>
                      <p className="text-xs text-muted-foreground">7-day streak!</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      ⚡
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Quick Learner</p>
                      <p className="text-xs text-muted-foreground">5 modules in a week</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Daily Challenge */}
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="text-accent" size={24} />
                  <CardTitle className="text-lg">Today's Challenge</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg">
                    <h4 className="font-semibold mb-2">5-Minute AI Task</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Use ChatGPT to summarize a long article and extract key points
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>+50 XP</span>
                      <span>•</span>
                      <span>Beginner</span>
                    </div>
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Start Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{completedModules}</div>
                  <div className="text-sm text-muted-foreground">Modules Completed</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">3</div>
                  <div className="text-sm text-muted-foreground">Templates Used</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">12</div>
                  <div className="text-sm text-muted-foreground">Community Posts</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">5</div>
                  <div className="text-sm text-muted-foreground">Certifications</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
