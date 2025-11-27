import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Heart, 
  Share2,
  Trophy,
  Flame,
  Clock,
  Video,
  Pin,
  TrendingUp
} from "lucide-react";

export default function Community() {
  const [selectedGroup, setSelectedGroup] = useState("all");

  const liveEvents = [
    {
      id: 1,
      title: "AI for SMEs: Workflow Automation Workshop",
      date: "Tomorrow",
      time: "2:00 PM EST",
      attendees: 156,
      category: "business",
      countdown: "18h 32m"
    },
    {
      id: 2,
      title: "Faith & Technology: Integrating AI in Ministry",
      date: "Friday",
      time: "6:00 PM EST",
      attendees: 89,
      category: "faith",
      countdown: "2d 20h"
    }
  ];

  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "SC",
      time: "2 hours ago",
      category: "business",
      isPinned: true,
      content: "Just automated our entire email marketing workflow using the Email Marketing Bot template! Saved 15 hours/week. Here's what I learned...",
      likes: 45,
      comments: 12,
      tags: ["automation", "success-story"]
    },
    {
      id: 2,
      author: "Michael Johnson",
      avatar: "MJ",
      time: "5 hours ago",
      category: "education",
      isPinned: false,
      content: "Looking for recommendations on AI tools for creating interactive lesson plans. What's working for other educators?",
      likes: 23,
      comments: 18,
      tags: ["education", "question"]
    },
    {
      id: 3,
      author: "Pastor David Lee",
      avatar: "DL",
      time: "1 day ago",
      category: "faith",
      isPinned: false,
      content: "Our church community engagement has increased 40% since implementing the Community Engagement Bot. Grateful for this platform! 🙏",
      likes: 67,
      comments: 24,
      tags: ["faith", "testimonial"]
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Emma Rodriguez", avatar: "ER", xp: 3450, streak: 28, badge: "🏆" },
    { rank: 2, name: "James Wilson", avatar: "JW", xp: 3210, streak: 21, badge: "🥈" },
    { rank: 3, name: "Aisha Patel", avatar: "AP", xp: 2980, streak: 19, badge: "🥉" },
    { rank: 4, name: "Carlos Martinez", avatar: "CM", xp: 2750, streak: 15, badge: "⭐" },
    { rank: 5, name: "Lisa Thompson", avatar: "LT", xp: 2640, streak: 14, badge: "⭐" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Community Hub
              </h1>
              <p className="text-muted-foreground text-lg">
                Connect, learn, and grow with AI enthusiasts worldwide. Share your success stories, ask questions, and collaborate with professionals across business, education, faith, and creative sectors.
              </p>
            </div>
            <div className="relative">
              <img
                src="/community-engagement.jpg"
                alt="Community members engaging and networking"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Live Events Banner */}
          <div className="mb-8">
            <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="text-primary" size={24} />
                    <CardTitle>Upcoming Live Events</CardTitle>
                  </div>
                  <img
                    src="/networking-event.jpg"
                    alt="Live networking event"
                    className="hidden md:block w-24 h-16 rounded-md object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {liveEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-background rounded-lg border-2 border-border hover:border-primary transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {event.date} at {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users size={14} />
                              {event.attendees} attending
                            </span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          <Clock size={12} className="mr-1" />
                          {event.countdown}
                        </Badge>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Join Event
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Group Tabs */}
              <Tabs value={selectedGroup} onValueChange={setSelectedGroup}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="faith">Faith</TabsTrigger>
                  <TabsTrigger value="creator">Creators</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedGroup} className="space-y-4 mt-4">
                  {posts
                    .filter(post => selectedGroup === "all" || post.category === selectedGroup)
                    .map((post) => (
                      <Card key={post.id} className={`${post.isPinned ? "border-2 border-accent" : ""}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-primary/20 text-primary">
                                  {post.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{post.author}</p>
                                <p className="text-sm text-muted-foreground">{post.time}</p>
                              </div>
                            </div>
                            {post.isPinned && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Pin size={12} />
                                Pinned
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <button className="flex items-center gap-2 hover:text-primary transition-colors">
                              <Heart size={16} />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-primary transition-colors">
                              <MessageSquare size={16} />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-primary transition-colors">
                              <Share2 size={16} />
                              Share
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>

              {/* Create Post */}
              <Card className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary/20 text-secondary">
                        You
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="flex-1 justify-start text-muted-foreground">
                      Share your AI journey...
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Trophy className="text-accent" size={24} />
                    <CardTitle>Top Contributors</CardTitle>
                  </div>
                  <CardDescription>This month's most active members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((user) => (
                      <div key={user.rank} className={`flex items-center gap-3 p-3 rounded-lg ${
                        user.rank <= 3 ? "bg-gradient-to-r from-primary/5 to-secondary/5" : "bg-muted"
                      }`}>
                        <div className="text-2xl">{user.badge}</div>
                        <Avatar>
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{user.name}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <TrendingUp size={10} />
                              {user.xp} XP
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame size={10} />
                              {user.streak}d
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Full Leaderboard
                  </Button>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">5,247</div>
                    <div className="text-sm text-muted-foreground">Active Members</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-secondary mb-1">342</div>
                      <div className="text-xs text-muted-foreground">Posts This Week</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-accent mb-1">28</div>
                      <div className="text-xs text-muted-foreground">Live Events</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2" size={16} />
                    Find a Mentor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2" size={16} />
                    Browse All Events
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2" size={16} />
                    Start Discussion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
