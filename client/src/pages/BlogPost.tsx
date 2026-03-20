import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, Eye, ArrowLeft, User, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState("");

  const { data: post, isLoading } = trpc.blog.getPostBySlug.useQuery({ slug });
  const { data: comments } = trpc.blog.getComments.useQuery(
    { postId: post?.id || 0 },
    { enabled: !!post?.id }
  );
  const { data: relatedPosts } = trpc.blog.getRelatedPosts.useQuery(
    { postId: post?.id || 0, categoryId: post?.categoryId || 0, limit: 3 },
    { enabled: !!post?.id && !!post?.categoryId }
  );

  const addCommentMutation = trpc.blog.addComment.useMutation({
    onSuccess: () => {
      toast.success("Comment posted successfully!");
      setComment("");
      // Invalidate comments query to refresh
      trpc.useUtils().blog.getComments.invalidate({ postId: post?.id || 0 });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to post comment");
    },
  });

  const handleSubmitComment = () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    if (!post?.id) return;
    
    addCommentMutation.mutate({
      postId: post.id,
      content: comment.trim(),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-[76px]">
          <div className="container py-16">
            <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
              <div className="h-96 bg-slate-800 rounded-2xl"></div>
              <div className="h-8 bg-slate-800 rounded w-3/4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-800 rounded"></div>
                <div className="h-4 bg-slate-800 rounded"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-[76px]">
          <div className="container py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2" size={20} />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-[76px]">
        {/* Back Button */}
        <div className="container py-6">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft size={20} />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Hero Section with Cover Image */}
        <section className="relative">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {post.categoryName}
                    </span>
                  </div>
                </div>
              )}

              {/* Title and Meta */}
              <div className="space-y-6 mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Draft"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={18} />
                    <span>{post.views} views</span>
                  </div>
                </div>

                {/* Author Bio */}
                <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        {post.authorName?.charAt(0) || "A"}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{post.authorName || "Anonymous"}</h3>
                        {post.authorBio && (
                          <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index} className="mb-4 text-lg leading-relaxed">{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                  {post.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-16 bg-slate-900/50">
            <div className="container">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <Card className="group hover:border-primary/50 transition-all cursor-pointer h-full">
                        {relatedPost.coverImage && (
                          <div className="h-40 overflow-hidden rounded-t-lg">
                            <img
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardContent className="p-4 space-y-2">
                          <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock size={12} />
                            <span>{relatedPost.readTime} min</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <MessageCircle size={32} />
                Comments ({comments?.length || 0})
              </h2>

              {/* Add Comment Form */}
              {isAuthenticated ? (
                <Card className="mb-8 border-2 border-primary/20">
                  <CardContent className="p-6 space-y-4">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSubmitComment}
                        disabled={addCommentMutation.isPending || !comment.trim()}
                        className="gap-2"
                      >
                        {addCommentMutation.isPending ? "Posting..." : "Post Comment"}
                        <Send size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-8 border-2 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">Please log in to leave a comment</p>
                    <Button>Log In</Button>
                  </CardContent>
                </Card>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments && comments.length > 0 ? (
                  comments.map((comment) => (
                    <Card key={comment.id} className="border-2 border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold flex-shrink-0">
                            {comment.userName?.charAt(0) || "U"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold">{comment.userName || "Anonymous"}</span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-muted-foreground">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
