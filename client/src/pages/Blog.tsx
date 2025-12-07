import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Calendar, Clock, Eye, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: categories } = trpc.blog.getCategories.useQuery();
  const { data: postsData, isLoading } = trpc.blog.getPosts.useQuery({
    page,
    limit: 9,
    categoryId: selectedCategory,
    searchQuery: searchQuery || undefined,
  });

  const posts = postsData?.posts || [];
  const totalPages = Math.ceil((postsData?.total || 0) / (postsData?.limit || 9));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 pt-16">
        {/* Hero Section with Futuristic Gradient */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, #10b981 1px, transparent 1px),
                linear-gradient(to bottom, #10b981 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

          <div className="container relative py-20 md:py-32">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                <Sparkles size={16} />
                <span className="text-sm font-medium">AI Insights & Innovation</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-white">Explore the Future of</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  AI & Technology
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
                Discover cutting-edge insights, tutorials, and stories from the forefront of artificial intelligence
              </p>

              {/* Futuristic Search Bar */}
              <div className="max-w-2xl mx-auto mt-8">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg blur opacity-30 group-hover:opacity-50 transition"></div>
                  <div className="relative flex items-center bg-slate-900 rounded-lg border border-slate-700">
                    <Search className="absolute left-4 text-slate-400" size={20} />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-6 bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
            </svg>
          </div>
        </section>

        {/* Category Filter Chips with Neon Glow */}
        <section className="py-8 border-b border-border">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === undefined ? "default" : "outline"}
                onClick={() => setSelectedCategory(undefined)}
                className={selectedCategory === undefined ? "bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50" : ""}
              >
                All Articles
              </Button>
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50" : "hover:border-primary/50"}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid with Holographic Cards */}
        <section className="py-16">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="h-48 bg-slate-800"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                      <div className="h-20 bg-slate-800 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                  <Search className="text-slate-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="group overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                      {/* Cover Image with Gradient Overlay */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Sparkles className="text-primary/30" size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground backdrop-blur-sm">
                            {post.categoryName}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{post.readTime} min read</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            <span>{post.views}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-muted-foreground line-clamp-3 text-sm">
                          {post.excerpt}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                            {post.authorName?.charAt(0) || "A"}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{post.authorName || "Anonymous"}</p>
                          </div>
                          <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    onClick={() => setPage(i + 1)}
                    className={page === i + 1 ? "bg-gradient-to-r from-primary to-secondary" : ""}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
