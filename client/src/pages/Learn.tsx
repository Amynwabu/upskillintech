import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Users, Star, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function Learn() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();
  const { data: courses, isLoading } = trpc.courses.list.useQuery({
    category: selectedCategory as any,
    level: selectedLevel as any,
  });
  const { data: myEnrollments } = trpc.courses.getMyEnrollments.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const enrolledCourseIds = new Set(myEnrollments?.map(e => e.courseId) || []);

  const categories = [
    { value: undefined, label: "All Courses", icon: BookOpen },
    { value: "business", label: "Business", icon: TrendingUp },
    { value: "education", label: "Education", icon: Award },
    { value: "faith", label: "Faith", icon: Star },
    { value: "creator", label: "Creator", icon: Users },
  ];

  const levels = [
    { value: undefined, label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-[76px]">
        {/* Hero Section */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 45%, #f0f9ff 100%)" }}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="mb-6" style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "#111827" }}>
                  Learn AI, Transform Your Future
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Master AI skills with structured courses, hands-on projects, and expert guidance.
                  From AI literacy to business automation, we've got you covered.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                    <BookOpen className="text-primary" size={20} />
                    <span className="font-semibold">{courses?.length || 0} Courses</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Award className="text-accent" size={20} />
                    <span className="font-semibold">Certificates</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/training-diverse-team.jpg"
                  alt="Diverse team learning AI together"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="/group-discussion.jpg"
                  alt="Group discussion and collaborative learning"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b border-border">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Category Tabs */}
              <Tabs value={selectedCategory || "all"} onValueChange={(v) => setSelectedCategory(v === "all" ? undefined : v)} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-5 w-full md:w-auto">
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.label} value={cat.value || "all"} className="flex items-center gap-2">
                      <cat.icon size={16} />
                      <span className="hidden sm:inline">{cat.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Level Filter */}
              <div className="flex gap-2 flex-wrap">
                {levels.map((level) => (
                  <Button
                    key={level.label}
                    variant={selectedLevel === level.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(level.value)}
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* My Enrollments Section */}
        {isAuthenticated && myEnrollments && myEnrollments.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-primary" />
                Continue Learning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEnrollments.slice(0, 3).map((enrollment) => (
                  <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{enrollment.course?.title}</CardTitle>
                          <CardDescription>{enrollment.course?.category}</CardDescription>
                        </div>
                        <Badge variant="secondary">{enrollment.progress}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {enrollment.completedModules} of {enrollment.course?.totalModules} modules completed
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/learning/${enrollment.courseId}`} className="w-full">
                        <Button className="w-full">Continue Learning</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Course Catalog */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">
              {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Courses` : "All Courses"}
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => {
                  const isEnrolled = enrolledCourseIds.has(course.id);

                  return (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary">{course.category}</Badge>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-3">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen size={16} />
                              <span>{course.totalModules} modules</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{course.estimatedHours}h</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Link href={`/course/${course.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        {isEnrolled ? (
                          <Link href={`/learning/${course.id}`} className="flex-1">
                            <Button className="w-full">Continue</Button>
                          </Link>
                        ) : (
                          <Link href={`/course/${course.id}`} className="flex-1">
                            <Button className="w-full">Enroll Free</Button>
                          </Link>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more courses.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16" style={{ background: "#F7F8FA" }}>
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your career with AI skills.
              Get personalized learning paths and hands-on projects.
            </p>
            {!isAuthenticated && (
              <Link href="/onboarding">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
