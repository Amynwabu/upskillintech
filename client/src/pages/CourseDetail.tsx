import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  Award,
  DollarSign
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function CourseDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const courseId = parseInt(params.id || "0");
  
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  const { data: courseDetails, isLoading } = trpc.courses.getWithDetails.useQuery({ id: courseId });
  const { data: enrollment } = trpc.courses.getMyEnrollments.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const enrollMutation = trpc.courses.enroll.useMutation({
    onSuccess: () => {
      toast.success("Successfully enrolled in course!");
      setLocation(`/learning/${courseId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isEnrolled = enrollment?.some(e => e.courseId === courseId);
  const userEnrollment = enrollment?.find(e => e.courseId === courseId);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to enroll in courses");
      return;
    }

    if (courseDetails?.isPremium) {
      // TODO: Implement Stripe checkout
      toast.info("Stripe checkout coming soon!");
    } else {
      enrollMutation.mutate({ courseId });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading course...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
            <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
            <Link href="/learn">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const avgRating = courseDetails.rating || 0;
  const ratingStars = Array.from({ length: 5 }, (_, i) => i < avgRating);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-[76px] pb-12">
        {/* Course Header */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Badge variant="secondary" className="mb-4">
                  {courseDetails.category}
                </Badge>
                <h1 className="text-4xl font-bold mb-4">{courseDetails.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {courseDetails.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {ratingStars.map((filled, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={filled ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}
                      />
                    ))}
                    <span className="ml-2 font-semibold">{avgRating}/5</span>
                    <span className="text-muted-foreground">({courseDetails.reviews?.length || 0} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={20} />
                    <span>{courseDetails.enrollmentCount} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={20} />
                    <span>{courseDetails.estimatedHours} hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen size={20} />
                    <span>{courseDetails.totalModules} modules</span>
                  </div>
                </div>

                {courseDetails.instructor && (
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {courseDetails.instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-semibold">{courseDetails.instructor.name}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enrollment Card */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    {isEnrolled ? (
                      <>
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Your Progress</p>
                          <Progress value={userEnrollment?.progress || 0} className="h-3 mb-2" />
                          <p className="text-sm font-semibold">{userEnrollment?.progress}% Complete</p>
                        </div>
                        <Link href={`/learning/${courseId}`}>
                          <Button className="w-full" size="lg">
                            <Play className="mr-2" size={20} />
                            Continue Learning
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        {courseDetails.isPremium ? (
                          <div className="mb-4">
                            <div className="flex items-center justify-center gap-2 text-3xl font-bold mb-2">
                              <DollarSign size={32} />
                              <span>{(courseDetails.price / 100).toFixed(2)}</span>
                            </div>
                            <p className="text-center text-sm text-muted-foreground">One-time payment</p>
                          </div>
                        ) : (
                          <div className="mb-4">
                            <p className="text-center text-3xl font-bold text-primary mb-2">FREE</p>
                            <p className="text-center text-sm text-muted-foreground">Full access included</p>
                          </div>
                        )}
                        <Button 
                          className="w-full" 
                          size="lg"
                          onClick={handleEnroll}
                          disabled={enrollMutation.isPending}
                        >
                          {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                        </Button>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={16} className="text-primary" />
                            <span>Lifetime access</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={16} className="text-primary" />
                            <span>Certificate of completion</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={16} className="text-primary" />
                            <span>Earn XP and achievements</span>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseDetails.modules?.slice(0, 6).map((module) => (
                      <div key={module.id} className="flex items-start gap-2">
                        <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{module.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {courseDetails.instructor && (
                <Card>
                  <CardHeader>
                    <CardTitle>About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                          {courseDetails.instructor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{courseDetails.instructor.name}</h3>
                        <p className="text-muted-foreground mb-4">{courseDetails.instructor.bio}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users size={16} />
                            <span>{courseDetails.instructor.totalStudents} students</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen size={16} />
                            <span>{courseDetails.instructor.totalCourses} courses</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star size={16} className="fill-yellow-500 text-yellow-500" />
                            <span>{courseDetails.instructor.rating}/5 rating</span>
                          </div>
                        </div>
                        {courseDetails.instructor.expertise && (
                          <div className="mt-4">
                            <p className="text-sm font-semibold mb-2">Expertise:</p>
                            <p className="text-sm text-muted-foreground">{courseDetails.instructor.expertise}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {courseDetails.totalModules} modules • {courseDetails.estimatedHours} hours total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {courseDetails.modules?.map((module, index) => (
                      <div
                        key={module.id}
                        className="border border-border rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              {index + 1}
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold">{module.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {module.duration} minutes
                              </p>
                            </div>
                          </div>
                          {expandedModules.includes(module.id) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                        {expandedModules.includes(module.id) && (
                          <div className="p-4 pt-0 border-t border-border bg-muted/30">
                            <p className="text-sm text-muted-foreground">
                              {module.description || "Module content details"}
                            </p>
                            {module.isLocked && !isEnrolled && (
                              <Badge variant="secondary" className="mt-2">
                                🔒 Enroll to unlock
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>
                    {courseDetails.reviews?.length || 0} reviews • {avgRating}/5 average rating
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {courseDetails.reviews && courseDetails.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {courseDetails.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6 last:border-0">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/20 text-primary">
                                U
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">Student</p>
                                {review.isVerifiedPurchase && (
                                  <Badge variant="secondary" className="text-xs">
                                    <CheckCircle2 size={12} className="mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      className={
                                        i < review.rating
                                          ? "fill-yellow-500 text-yellow-500"
                                          : "text-muted-foreground"
                                      }
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Star size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                      <p className="text-muted-foreground">
                        Be the first to review this course!
                      </p>
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
