import { drizzle } from "drizzle-orm/mysql2";
import { blogCategories, blogPosts } from "./drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seedBlog() {
  console.log("Seeding blog data...");

  // Insert categories
  await db.insert(blogCategories).values([
    { name: "AI Fundamentals", slug: "ai-fundamentals", description: "Learn the basics of artificial intelligence" },
    { name: "Business AI", slug: "business-ai", description: "AI applications for business growth" },
    { name: "AI Tools & Tech", slug: "ai-tools-tech", description: "Latest AI tools and technologies" },
    { name: "Industry Insights", slug: "industry-insights", description: "Expert insights on AI trends" },
  ]);

  console.log("Categories seeded!");

  // Insert blog posts
  await db.insert(blogPosts).values([
    {
      title: "Getting Started with AI: A Beginner's Guide",
      slug: "getting-started-with-ai",
      excerpt: "Discover the fundamentals of artificial intelligence and how it's transforming industries worldwide.",
      content: "Artificial Intelligence is no longer a futuristic concept—it's here, and it's reshaping how we work, learn, and live. Whether you're a business owner, educator, or curious individual, understanding AI basics is essential in today's digital landscape.\n\nIn this comprehensive guide, we'll explore what AI really means, the different types of AI systems, and how you can start your AI journey today. From machine learning to neural networks, we break down complex concepts into digestible insights.\n\nThe key to success with AI isn't about becoming a programmer overnight. It's about understanding the possibilities, identifying opportunities in your field, and learning how to leverage AI tools effectively. Let's dive into the exciting world of artificial intelligence together.",
      coverImage: "/images/ai-training.jpg",
      authorId: 1,
      categoryId: 1,
      tags: "AI,Beginners,Machine Learning",
      publishedAt: new Date("2024-01-15"),
      views: 1250,
      readTime: 8,
      isPublished: true,
    },
    {
      title: "How AI is Revolutionizing Business Operations",
      slug: "ai-revolutionizing-business",
      excerpt: "Explore real-world examples of how companies are using AI to automate workflows and boost productivity.",
      content: "Businesses across all sectors are discovering the transformative power of AI. From automating repetitive tasks to generating deep customer insights, AI is becoming the competitive advantage that separates industry leaders from followers.\n\nIn this article, we examine case studies from companies that have successfully integrated AI into their operations. You'll learn about practical applications like chatbots for customer service, predictive analytics for inventory management, and AI-powered marketing automation.\n\nThe future of business isn't just about adopting technology—it's about strategic AI integration that amplifies human capabilities and drives sustainable growth. Discover how your organization can start this journey today.",
      coverImage: "/images/ai-automation.jpg",
      authorId: 1,
      categoryId: 2,
      tags: "Business,Automation,Productivity",
      publishedAt: new Date("2024-01-20"),
      views: 980,
      readTime: 10,
      isPublished: true,
    },
    {
      title: "Top 10 AI Tools Every Professional Should Know",
      slug: "top-10-ai-tools",
      excerpt: "A curated list of the most powerful AI tools that can supercharge your workflow and creativity.",
      content: "The AI tool landscape is vast and growing every day. From writing assistants to image generators, there's an AI solution for almost every professional need. But which tools are truly worth your time?\n\nWe've compiled a list of the top 10 AI tools that are making waves across industries. Each tool is evaluated based on ease of use, practical applications, and real-world impact. Whether you're in marketing, design, development, or education, you'll find tools that can transform your daily workflow.\n\nThe best part? Most of these tools offer free tiers or trials, making it easy to experiment and find what works best for you. Let's explore the AI toolkit that will define the future of work.",
      coverImage: "/images/ai-transformation.jpg",
      authorId: 1,
      categoryId: 3,
      tags: "Tools,Software,Productivity",
      publishedAt: new Date("2024-01-25"),
      views: 1540,
      readTime: 12,
      isPublished: true,
    },
    {
      title: "The Future of AI in Education",
      slug: "future-ai-education",
      excerpt: "How artificial intelligence is personalizing learning experiences and empowering educators worldwide.",
      content: "Education is undergoing a profound transformation powered by AI. Personalized learning paths, intelligent tutoring systems, and automated grading are just the beginning of what's possible.\n\nThis article explores how AI is making education more accessible, adaptive, and effective. We look at real implementations in schools and universities, examining both the opportunities and challenges of AI-powered education.\n\nThe goal isn't to replace teachers—it's to empower them with tools that allow for more meaningful student interactions and truly personalized learning experiences. Join us as we explore the classroom of tomorrow.",
      coverImage: "/images/mentorship.jpg",
      authorId: 1,
      categoryId: 4,
      tags: "Education,Learning,Innovation",
      publishedAt: new Date("2024-02-01"),
      views: 720,
      readTime: 9,
      isPublished: true,
    },
    {
      title: "Building Your First AI-Powered Application",
      slug: "building-first-ai-app",
      excerpt: "A step-by-step guide to creating your own AI application, even if you're not a developer.",
      content: "You don't need to be a coding expert to build AI-powered applications anymore. With no-code and low-code platforms, anyone with a creative idea can bring AI solutions to life.\n\nThis practical guide walks you through the entire process of building your first AI app. From defining your use case to selecting the right tools and deploying your solution, we cover everything you need to know.\n\nWe'll use real examples and provide templates you can customize for your own projects. By the end of this guide, you'll have a working AI application and the confidence to build more. Let's turn your AI ideas into reality.",
      coverImage: "/images/community.jpg",
      authorId: 1,
      categoryId: 3,
      tags: "Development,Tutorial,No-Code",
      publishedAt: new Date("2024-02-05"),
      views: 890,
      readTime: 15,
      isPublished: true,
    },
  ]);

  console.log("Blog posts seeded!");
  console.log("✅ Blog seeding complete!");
  process.exit(0);
}

seedBlog().catch((error) => {
  console.error("Error seeding blog:", error);
  process.exit(1);
});
