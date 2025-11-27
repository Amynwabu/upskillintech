import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  TrendingUp,
  Send,
  Plus
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { toast } from "sonner";

export default function Community() {
  const [selectedGroup, setSelectedGroup] = useState<"all" | "business" | "faith" | "education" | "creators">("all");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState<"business" | "faith" | "education" | "creators">("business");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  
  const { isAuthenticated } = useAuth();
  const { socket, on, off } = useWebSocket();
  const utils = trpc.useUtils();

  // Fetch posts
  const { data: posts, isLoading } = trpc.community.getPosts.useQuery({
    category: selectedGroup === "all" ? undefined : selectedGroup,
    limit: 20,
    offset: 0,
  });

  // Create post mutation
  const createPostMutation = trpc.community.createPost.useMutation({
    onSuccess: () => {
      utils.community.getPosts.invalidate();
      setNewPostContent("");
      setIsCreatePostOpen(false);
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create post: ${error.message}`);
    },
  });

  // Like post mutation
  const likePostMutation = trpc.community.likePost.useMutation({
    onSuccess: () => {
      utils.community.getPosts.invalidate();
    },
  });

  // Add comment mutation
  const addCommentMutation = trpc.community.addComment.useMutation({
    onSuccess: (_, variables) => {
      utils.community.getComments.invalidate({ postId: variables.postId });
      setCommentInputs(prev => ({ ...prev, [variables.postId]: "" }));
      toast.success("Comment added!");
    },
  });

  // WebSocket real-time updates
  useEffect(() => {
    if (!socket) return;

    const handleNewPost = (data: any) => {
      toast.success(`New post from ${data.authorName}`);
      utils.community.getPosts.invalidate();
    };

    const handlePostLiked = (data: any) => {
      utils.community.getPosts.invalidate();
    };

    const handleNewComment = (data: any) => {
      utils.community.getComments.invalidate({ postId: data.postId });
    };

    on("new_post", handleNewPost);
    on("post_liked", handlePostLiked);
    on("new_comment", handleNewComment);

    return () => {
      off("new_post", handleNewPost);
      off("post_liked", handlePostLiked);
      off("new_comment", handleNewComment);
    };
  }, [socket, on, off, utils]);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast.error("Please enter post content");
      return;
    }

    createPostMutation.mutate({
      content: newPostContent,
      category: newPostCategory,
    });
  };

  const handleLikePost = (postId: number) => {
    if (!isAuthenticated) {
      toast.error("Please login to like posts");
      return;
    }
    likePostMutation.mutate({ postId });
  };

  const handleAddComment = (postId: number) => {
    const content = commentInputs[postId]?.trim();
    if (!content) {
      toast.error("Please enter a comment");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please login to comment");
      return;
    }

    addCommentMutation.mutate({ postId, content });
  };

  const toggleComments = (postId: number) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

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
                          <h3 className="font-semibold mb-1">{event.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          <Clock size={12} className="mr-1" />
                          {event.countdown}
                        </Badge>
                      </div>
                      <Button size="sm" className="w-full">
                        Join Event
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Group Tabs */}
              <Tabs value={selectedGroup} onValueChange={(v) => setSelectedGroup(v as any)}>
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="grid grid-cols-5 w-full max-w-2xl">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                    <TabsTrigger value="faith">Faith</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="creators">Creators</TabsTrigger>
                  </TabsList>
                  
                  {/* Create Post Button */}
                  <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                    <DialogTrigger asChild>
                      <Button disabled={!isAuthenticated}>
                        <Plus size={16} className="mr-2" />
                        Create Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Post</DialogTitle>
                        <DialogDescription>
                          Share your thoughts, questions, or success stories with the community.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Category</label>
                          <Tabs value={newPostCategory} onValueChange={(v) => setNewPostCategory(v as any)}>
                            <TabsList className="grid grid-cols-4 w-full">
                              <TabsTrigger value="business">Business</TabsTrigger>
                              <TabsTrigger value="faith">Faith</TabsTrigger>
                              <TabsTrigger value="education">Education</TabsTrigger>
                              <TabsTrigger value="creators">Creators</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Content</label>
                          <Textarea
                            placeholder="What's on your mind?"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            rows={6}
                            className="resize-none"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreatePost} disabled={createPostMutation.isPending}>
                          {createPostMutation.isPending ? "Posting..." : "Post"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Tabs>

              {/* Posts Feed */}
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading posts...</p>
                </div>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLikePost}
                    onComment={handleAddComment}
                    commentInput={commentInputs[post.id] || ""}
                    onCommentInputChange={(value) =>
                      setCommentInputs(prev => ({ ...prev, [post.id]: value }))
                    }
                    showComments={showComments[post.id] || false}
                    onToggleComments={() => toggleComments(post.id)}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MessageSquare size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Be the first to share something with the community!
                    </p>
                    {isAuthenticated && (
                      <Button onClick={() => setIsCreatePostOpen(true)}>
                        Create First Post
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Trophy className="text-accent" size={20} />
                    <CardTitle className="text-lg">Top Contributors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((user) => (
                      <div key={user.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors">
                        <span className="text-2xl">{user.badge}</span>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{user.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{user.xp} XP</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Flame size={12} className="text-orange-500" />
                              <span>{user.streak} days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Members</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Posts This Week</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Live Events</span>
                    <span className="font-semibold">8</span>
                  </div>
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

// Post Card Component
function PostCard({
  post,
  onLike,
  onComment,
  commentInput,
  onCommentInputChange,
  showComments,
  onToggleComments,
}: {
  post: any;
  onLike: (postId: number) => void;
  onComment: (postId: number) => void;
  commentInput: string;
  onCommentInputChange: (value: string) => void;
  showComments: boolean;
  onToggleComments: () => void;
}) {
  const { data: comments } = trpc.community.getComments.useQuery(
    { postId: post.id },
    { enabled: showComments }
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "business": return "bg-primary/10 text-primary";
      case "faith": return "bg-secondary/10 text-secondary";
      case "education": return "bg-accent/10 text-accent";
      case "creators": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{post.authorName?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.authorName || "Anonymous"}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Badge className={getCategoryColor(post.category)}>
            {post.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
        
        <div className="flex items-center gap-4 pt-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className="gap-2"
          >
            <Heart size={16} className={post.isLiked ? "fill-red-500 text-red-500" : ""} />
            <span>{post.likeCount || 0}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleComments}
            className="gap-2"
          >
            <MessageSquare size={16} />
            <span>{post.commentCount || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 size={16} />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t space-y-4">
            {/* Comment Input */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => onCommentInputChange(e.target.value)}
                rows={2}
                className="resize-none"
              />
              <Button onClick={() => onComment(post.id)} size="sm">
                <Send size={16} />
              </Button>
            </div>

            {/* Comments List */}
            {comments && comments.length > 0 && (
              <div className="space-y-3">
                {comments.map((comment: any) => (
                  <div key={comment.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {comment.authorName?.substring(0, 2).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{comment.authorName || "Anonymous"}</p>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
