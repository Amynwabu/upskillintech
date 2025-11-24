import { drizzle } from "drizzle-orm/mysql2";
import { instructors, courseReviews } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const instructorsData = [
  {
    userId: 1,
    name: "Dr. Sarah Johnson",
    bio: "AI researcher and educator with 15+ years of experience in machine learning and business transformation. Former lead AI consultant at Fortune 500 companies.",
    expertise: "Machine Learning, Business AI Strategy, Automation",
    credentials: "PhD in Computer Science (MIT), Certified AI Strategist",
    avatar: null,
    rating: 48, // 4.8 out of 5
    totalStudents: 5230,
    totalCourses: 8,
  },
  {
    userId: 1,
    name: "Marcus Chen",
    bio: "Tech entrepreneur and AI evangelist passionate about making AI accessible to everyone. Founded 3 successful AI startups and now dedicated to education.",
    expertise: "AI for Entrepreneurs, Startup Strategy, Product Development",
    credentials: "MBA (Stanford), Serial Entrepreneur, TEDx Speaker",
    avatar: null,
    rating: 47, // 4.7 out of 5
    totalStudents: 3890,
    totalCourses: 6,
  },
  {
    userId: 1,
    name: "Rev. David Thompson",
    bio: "Pastor and technology advocate bridging faith and innovation. Helping churches and ministries leverage AI for greater community impact.",
    expertise: "AI in Ministry, Digital Evangelism, Community Engagement",
    credentials: "Master of Divinity, Certified Digital Ministry Consultant",
    avatar: null,
    rating: 50, // 5.0 out of 5
    totalStudents: 1240,
    totalCourses: 4,
  },
];

async function seedInstructors() {
  try {
    console.log("Seeding instructors...");
    
    for (const instructor of instructorsData) {
      await db.insert(instructors).values(instructor);
      console.log(`✓ Added instructor: ${instructor.name}`);
    }

    console.log("\n✅ Successfully seeded instructors!");
  } catch (error) {
    console.error("Error seeding instructors:", error);
    process.exit(1);
  }
}

seedInstructors();
