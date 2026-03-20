import { useState } from "react";
import { Link } from "wouter";
import { FileText, Download, Calendar, User, ArrowLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Research() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Machine Learning", "NLP", "Computer Vision", "Ethics & Policy", "Industry Applications"];

  const researchPapers = [
    {
      id: 1,
      title: "The Future of Large Language Models in Enterprise Applications",
      authors: ["Dr. Sarah Chen", "Prof. Michael Roberts"],
      date: "March 2026",
      category: "Machine Learning",
      abstract: "An in-depth analysis of how large language models are transforming enterprise workflows, with case studies from Fortune 500 companies implementing AI-powered automation.",
      downloadUrl: "#",
      readTime: "25 min read",
      citations: 45,
    },
    {
      id: 2,
      title: "Ethical Considerations in AI Deployment: A Framework for Responsible Innovation",
      authors: ["Dr. James Wilson", "Dr. Aisha Patel"],
      date: "February 2026",
      category: "Ethics & Policy",
      abstract: "This whitepaper presents a comprehensive framework for organizations to navigate ethical challenges in AI deployment, covering bias mitigation, transparency, and accountability.",
      downloadUrl: "#",
      readTime: "30 min read",
      citations: 67,
    },
    {
      id: 3,
      title: "Computer Vision in Healthcare: Diagnostic Accuracy and Clinical Integration",
      authors: ["Dr. Emily Thompson", "Dr. David Lee"],
      date: "January 2026",
      category: "Computer Vision",
      abstract: "Examining the latest advances in medical imaging AI, this research explores how computer vision models are achieving diagnostic accuracy comparable to expert radiologists.",
      downloadUrl: "#",
      readTime: "22 min read",
      citations: 89,
    },
    {
      id: 4,
      title: "Natural Language Processing for Customer Service Automation",
      authors: ["Prof. Robert Martinez", "Dr. Lisa Anderson"],
      date: "December 2025",
      category: "NLP",
      abstract: "A comprehensive study on implementing NLP-powered chatbots and virtual assistants, with performance metrics from real-world deployments across multiple industries.",
      downloadUrl: "#",
      readTime: "18 min read",
      citations: 52,
    },
    {
      id: 5,
      title: "AI-Driven Supply Chain Optimization: Case Studies and Best Practices",
      authors: ["Dr. Kevin Zhang", "Dr. Maria Garcia"],
      date: "November 2025",
      category: "Industry Applications",
      abstract: "This paper analyzes successful AI implementations in supply chain management, demonstrating cost reductions of up to 30% and efficiency improvements across logistics operations.",
      downloadUrl: "#",
      readTime: "28 min read",
      citations: 73,
    },
    {
      id: 6,
      title: "Transformer Architectures: Evolution and Future Directions",
      authors: ["Prof. Andrew Kim", "Dr. Rachel Brown"],
      date: "October 2025",
      category: "Machine Learning",
      abstract: "A technical deep-dive into transformer model architectures, exploring recent innovations and predicting future developments in attention mechanisms and model efficiency.",
      downloadUrl: "#",
      readTime: "35 min read",
      citations: 124,
    },
  ];

  const filteredPapers = researchPapers.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || paper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-[76px]">
      {/* Header */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 45%, #f0f9ff 100%)" }}>
        <div className="container">
          <Link href="/resources">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(56,181,74,0.10)] border border-[rgba(56,181,74,0.20)] mb-6">
              <FileText className="w-4 h-4 text-[#38B54A]" />
              <span className="text-sm font-medium text-[#38B54A]">Research & Whitepapers</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Research{" "}
              <span style={{ background: "linear-gradient(135deg, #0D9488, #38B54A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Library
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Explore cutting-edge research papers, whitepapers, and case studies from leading AI researchers and practitioners
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search research papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border bg-muted/30">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-[#38B54A] text-white"
                    : "bg-card border border-border hover:border-[rgba(56,181,74,0.5)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Research Papers Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredPapers.length} {filteredPapers.length === 1 ? "paper" : "papers"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="p-6 rounded-xl bg-card border border-border hover:border-[rgba(56,181,74,0.5)] hover:shadow-lg hover:shadow-[rgba(56,181,74,0.10)] transition-all"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(56,181,74,0.10)] border border-[rgba(56,181,74,0.20)] mb-4">
                  <span className="text-xs font-medium text-[#38B54A]">{paper.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 hover:text-[#38B54A] transition-colors">
                  {paper.title}
                </h3>

                {/* Authors and Date */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{paper.authors.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{paper.date}</span>
                  </div>
                </div>

                {/* Abstract */}
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {paper.abstract}
                </p>

                {/* Stats and Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{paper.readTime}</span>
                    <span>•</span>
                    <span>{paper.citations} citations</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                    <Button size="sm" className="btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No research papers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Contribute Your Research</h2>
            <p className="text-muted-foreground mb-8">
              Are you conducting AI research? We'd love to feature your work in our library
            </p>
            <Button size="lg" className="btn-primary">
              Submit Your Paper
            </Button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
