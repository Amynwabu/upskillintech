import { drizzle } from "drizzle-orm/mysql2";
import { courses, courseModules } from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const sampleCourses = [
  {
    title: "AI Fundamentals for Business Leaders",
    description: "Learn how AI can transform your business operations, from automation to decision-making. Perfect for executives and managers looking to implement AI strategies.",
    category: "business",
    level: "beginner",
    thumbnail: "/ai-business.jpg",
    instructorId: 1,
    price: 0,
    isPremium: false,
    totalModules: 8,
    estimatedHours: 12,
    rating: 95,
    enrollmentCount: 1247,
    isPublished: true,
  },
  {
    title: "Building AI-Powered Startups",
    description: "From idea to launch: learn how to build and scale AI-driven businesses. Includes case studies, funding strategies, and product development frameworks.",
    category: "business",
    level: "intermediate",
    thumbnail: "/ai-startup.jpg",
    instructorId: 1,
    price: 4900,
    isPremium: true,
    totalModules: 12,
    estimatedHours: 20,
    rating: 98,
    enrollmentCount: 856,
    isPublished: true,
  },
  {
    title: "AI Literacy for Educators",
    description: "Empower your teaching with AI tools. Learn how to integrate AI into curriculum, assess student work, and create engaging learning experiences.",
    category: "education",
    level: "beginner",
    thumbnail: "/ai-education.jpg",
    instructorId: 1,
    price: 0,
    isPremium: false,
    totalModules: 6,
    estimatedHours: 10,
    rating: 92,
    enrollmentCount: 2134,
    isPublished: true,
  },
  {
    title: "AI for Children: Fun Learning Adventures",
    description: "Interactive course designed for kids aged 8-14 to explore AI through games, projects, and creative activities. Parent-friendly content.",
    category: "education",
    level: "beginner",
    thumbnail: "/ai-kids.jpg",
    instructorId: 1,
    price: 2900,
    isPremium: false,
    totalModules: 10,
    estimatedHours: 15,
    rating: 96,
    enrollmentCount: 1689,
    isPublished: true,
  },
  {
    title: "AI in Ministry: Serving with Technology",
    description: "Discover how churches and faith-based organizations can use AI ethically to enhance outreach, administration, and community engagement.",
    category: "faith",
    level: "beginner",
    thumbnail: "/ai-faith.jpg",
    instructorId: 1,
    price: 0,
    isPremium: false,
    totalModules: 5,
    estimatedHours: 8,
    rating: 94,
    enrollmentCount: 567,
    isPublished: true,
  },
  {
    title: "Biblical Wisdom Meets AI Innovation",
    description: "Explore the intersection of faith and technology. Learn to navigate AI ethics, stewardship, and purpose-driven innovation from a Christian perspective.",
    category: "faith",
    level: "intermediate",
    thumbnail: "/ai-biblical.jpg",
    instructorId: 1,
    price: 3900,
    isPremium: true,
    totalModules: 8,
    estimatedHours: 14,
    rating: 97,
    enrollmentCount: 423,
    isPublished: true,
  },
  {
    title: "Content Creation with AI Tools",
    description: "Master AI-powered tools for video editing, graphic design, copywriting, and social media management. Perfect for creators and marketers.",
    category: "creator",
    level: "beginner",
    thumbnail: "/ai-content.jpg",
    instructorId: 1,
    price: 0,
    isPremium: false,
    totalModules: 9,
    estimatedHours: 16,
    rating: 93,
    enrollmentCount: 3421,
    isPublished: true,
  },
  {
    title: "AI-Powered Marketing Automation",
    description: "Build automated marketing funnels, personalize customer experiences, and scale your campaigns with AI. Includes hands-on projects with real tools.",
    category: "creator",
    level: "advanced",
    thumbnail: "/ai-marketing.jpg",
    instructorId: 1,
    price: 5900,
    isPremium: true,
    totalModules: 15,
    estimatedHours: 25,
    rating: 99,
    enrollmentCount: 1876,
    isPublished: true,
  },
  {
    title: "Workflow Automation for Small Businesses",
    description: "Automate repetitive tasks, streamline operations, and save hours every week. No coding required - perfect for solopreneurs and small teams.",
    category: "business",
    level: "beginner",
    thumbnail: "/ai-workflow.jpg",
    instructorId: 1,
    price: 0,
    isPremium: false,
    totalModules: 7,
    estimatedHours: 11,
    rating: 91,
    enrollmentCount: 2567,
    isPublished: true,
  },
  {
    title: "AI for Personal Well-being & Lifestyle",
    description: "Use AI to improve your health, productivity, and daily routines. Learn about AI fitness coaches, meal planners, and mindfulness tools.",
    category: "general",
    level: "beginner",
    thumbnail: "/ai-lifestyle.jpg",
    instructorId: 1,
    price: 0,
    isPremium: false,
    totalModules: 6,
    estimatedHours: 9,
    rating: 90,
    enrollmentCount: 1234,
    isPublished: true,
  },
];

const sampleModules = [
  // AI Fundamentals for Business Leaders (Course 1)
  { courseId: 1, title: "Introduction to AI in Business", description: "Understanding AI basics and business applications", orderIndex: 1, videoUrl: "https://example.com/video1", duration: 45, content: "Module content here", isLocked: false },
  { courseId: 1, title: "AI Strategy Development", description: "Creating an AI roadmap for your organization", orderIndex: 2, videoUrl: "https://example.com/video2", duration: 60, content: "Module content here", isLocked: false },
  { courseId: 1, title: "Data Preparation for AI", description: "Getting your data ready for AI implementation", orderIndex: 3, videoUrl: "https://example.com/video3", duration: 50, content: "Module content here", isLocked: false },
  
  // Building AI-Powered Startups (Course 2)
  { courseId: 2, title: "AI Startup Landscape", description: "Current trends and opportunities", orderIndex: 1, videoUrl: "https://example.com/video4", duration: 55, content: "Module content here", isLocked: false },
  { courseId: 2, title: "Product-Market Fit with AI", description: "Finding your niche in the AI market", orderIndex: 2, videoUrl: "https://example.com/video5", duration: 70, content: "Module content here", isLocked: false },
  { courseId: 2, title: "Funding Your AI Startup", description: "Pitching to investors and securing capital", orderIndex: 3, videoUrl: "https://example.com/video6", duration: 65, content: "Module content here", isLocked: false },
  
  // AI Literacy for Educators (Course 3)
  { courseId: 3, title: "AI Tools for Teachers", description: "Overview of educational AI platforms", orderIndex: 1, videoUrl: "https://example.com/video7", duration: 40, content: "Module content here", isLocked: false },
  { courseId: 3, title: "Designing AI-Enhanced Lessons", description: "Integrating AI into your curriculum", orderIndex: 2, videoUrl: "https://example.com/video8", duration: 55, content: "Module content here", isLocked: false },
  { courseId: 3, title: "AI Ethics in Education", description: "Responsible AI use in the classroom", orderIndex: 3, videoUrl: "https://example.com/video9", duration: 45, content: "Module content here", isLocked: false },
];

async function seed() {
  try {
    console.log("🌱 Seeding courses...");
    
    // Insert courses
    for (const course of sampleCourses) {
      await db.insert(courses).values(course);
      console.log(`✅ Created course: ${course.title}`);
    }
    
    // Insert modules
    for (const module of sampleModules) {
      await db.insert(courseModules).values(module);
    }
    console.log(`✅ Created ${sampleModules.length} course modules`);
    
    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
