import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Flame, 
  Zap, 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Calendar,
  CheckCircle2,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Download, FileText } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: profile } = trpc.user.getProfile.useQuery();
  const { data: stats } = trpc.user.getStats.useQuery();
  const { data: achievements } = trpc.achievements.list.useQuery();
  const { data: enrollments } = trpc.courses.getMyEnrollments.useQuery();
  const { data: activityHistory } = trpc.user.getActivityHistory.useQuery({ limit: 10 });
  const { data: certificates } = trpc.certificates.getMyCertificates.useQuery();

  const completedCourses = enrollments?.filter(e => e.progress === 100) || [];
  const inProgressCourses = enrollments?.filter(e => e.progress > 0 && e.progress < 100) || [];

  // Calculate XP progress to next level
  const currentLevel = stats?.level || 1;
  const currentXP = stats?.totalXP || 0;
  const xpForCurrentLevel = (currentLevel - 1) * 1000;
  const xpForNextLevel = currentLevel * 1000;
  const xpProgress = currentXP - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const xpPercentage = (xpProgress / xpNeeded) * 100;

  // Generate streak calendar (last 30 days)
  const generateStreakCalendar = () => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const isActive = i < (stats?.currentStreak || 0);
      days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isActive,
      });
    }
    return days;
  };

  const streakDays = generateStreakCalendar();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-[76px] pb-12">
        <div className="container">
          {/* Profile Header */}
          <div className="mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-3xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{user?.name || "User"}</h1>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        Level {currentLevel}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{profile?.bio || "AI Learner | Transforming Skills"}</p>
                    
                    {/* XP Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Zap className="text-accent" size={16} />
                          <span className="font-semibold">{currentXP} XP</span>
                        </span>
                        <span className="text-muted-foreground">
                          {xpNeeded - xpProgress} XP to Level {currentLevel + 1}
                        </span>
                      </div>
                      <Progress value={xpPercentage} className="h-3" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-3xl font-bold">{stats?.currentStreak || 0}</p>
                    <p className="text-xs text-muted-foreground">days</p>
                  </div>
                  <Flame className="text-orange-500" size={40} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Courses Completed</p>
                    <p className="text-3xl font-bold">{stats?.coursesCompleted || 0}</p>
                    <p className="text-xs text-muted-foreground">certificates earned</p>
                  </div>
                  <Trophy className="text-accent" size={40} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Learning Hours</p>
                    <p className="text-3xl font-bold">{stats?.totalHours || 0}</p>
                    <p className="text-xs text-muted-foreground">hours invested</p>
                  </div>
                  <Clock className="text-primary" size={40} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                    <p className="text-3xl font-bold">{stats?.achievementsCount || 0}</p>
                    <p className="text-xs text-muted-foreground">badges unlocked</p>
                  </div>
                  <Award className="text-secondary" size={40} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Learning Streak Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="text-primary" />
                    Learning Streak
                  </CardTitle>
                  <CardDescription>
                    Your current streak: {stats?.currentStreak || 0} days | Longest streak: {stats?.longestStreak || 0} days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-10 gap-2">
                    {streakDays.map((day, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded flex items-center justify-center text-xs ${
                          day.isActive
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "bg-muted text-muted-foreground"
                        }`}
                        title={day.date}
                      >
                        {day.isActive ? <Flame size={16} /> : "·"}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* In Progress Courses */}
              {inProgressCourses.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="text-secondary" />
                      Continue Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inProgressCourses.slice(0, 3).map((enrollment) => (
                        <div key={enrollment.id} className="flex items-center gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold">{enrollment.course?.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={enrollment.progress} className="flex-1 h-2" />
                              <span className="text-sm text-muted-foreground">{enrollment.progress}%</span>
                            </div>
                          </div>
                          <Link href={`/learning/${enrollment.courseId}`}>
                            <Button size="sm">Continue</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Achievements */}
              {achievements && achievements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="text-accent" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {achievements.slice(0, 4).map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="text-4xl mb-2">{achievement.icon}</div>
                          <h4 className="font-semibold text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                          <Badge variant="secondary" className="mt-2">
                            +{achievement.xpAwarded} XP
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>All Achievements</CardTitle>
                  <CardDescription>
                    {stats?.achievementsCount || 0} badges unlocked
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {achievements && achievements.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="text-5xl mb-3">{achievement.icon}</div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                          <Badge variant="secondary" className="mt-3">
                            +{achievement.xpAwarded} XP
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(achievement.earnedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Award size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No achievements yet</h3>
                      <p className="text-muted-foreground">
                        Complete modules and courses to unlock badges!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              {/* Completed Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary" />
                    Completed Courses ({completedCourses.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {completedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {completedCourses.map((enrollment) => (
                        <div
                          key={enrollment.id}
                          className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary transition-colors"
                        >
                          <CheckCircle2 className="text-primary mt-1" size={24} />
                          <div className="flex-1">
                            <h4 className="font-semibold">{enrollment.course?.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Completed {enrollment.completedAt ? new Date(enrollment.completedAt).toLocaleDateString() : "recently"}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{enrollment.course?.category}</Badge>
                              <Star className="text-yellow-500 fill-yellow-500" size={14} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No completed courses yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* In Progress Courses */}
              {inProgressCourses.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="text-secondary" />
                      In Progress ({inProgressCourses.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inProgressCourses.map((enrollment) => (
                        <div
                          key={enrollment.id}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold">{enrollment.course?.title}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={enrollment.progress} className="flex-1 h-2" />
                              <span className="text-sm font-medium">{enrollment.progress}%</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {enrollment.completedModules} of {enrollment.course?.totalModules} modules
                            </p>
                          </div>
                          <Link href={`/learning/${enrollment.courseId}`}>
                            <Button>Continue</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="text-primary" />
                    My Certificates
                  </CardTitle>
                  <CardDescription>
                    Certificates earned from completed courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {certificates && certificates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certificates.map((cert) => (
                        <Card key={cert.id} className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-primary/10">
                                <FileText className="text-primary" size={32} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-1">{cert.courseName}</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Completed on {new Date(cert.completionDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge variant="secondary" className="text-xs">
                                    ID: {cert.certificateId}
                                  </Badge>
                                </div>
                                {cert.instructorName && (
                                  <p className="text-xs text-muted-foreground mb-3">
                                    Instructor: {cert.instructorName}
                                  </p>
                                )}
                                <a
                                  href={cert.pdfUrl || '#'}
                                  download={`${cert.certificateId}.pdf`}
                                  className="inline-block"
                                >
                                  <Button size="sm" className="w-full">
                                    <Download size={16} className="mr-2" />
                                    Download Certificate
                                  </Button>
                                </a>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Award size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Complete a course to earn your first certificate!
                      </p>
                      <Link href="/learn">
                        <Button>Browse Courses</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  {activityHistory && activityHistory.length > 0 ? (
                    <div className="space-y-4">
                      {activityHistory.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                        >
                          <CheckCircle2 className="text-primary mt-1" size={20} />
                          <div className="flex-1">
                            <h4 className="font-semibold">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">{activity.courseTitle}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">+{activity.xpEarned} XP</Badge>
                              <span className="text-xs text-muted-foreground">
                                {activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : "Recently"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <TrendingUp size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
                      <p className="text-muted-foreground">
                        Start learning to see your progress here!
                      </p>
                      <Link href="/learn">
                        <Button className="mt-4">Browse Courses</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
