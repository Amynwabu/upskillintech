import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts } from "./drizzle/schema";
import { eq } from "drizzle-orm";
import { readFileSync } from "fs";

const db = drizzle(process.env.DATABASE_URL!);

async function updateBlogContent() {
  console.log("Updating blog post content...");

  const articles = [
    {
      slug: "getting-started-with-ai",
      file: "/home/ubuntu/upskillintech-hub/blog-articles/getting-started-with-ai.md",
      readTime: 15
    },
    {
      slug: "ai-revolutionizing-business",
      file: "/home/ubuntu/upskillintech-hub/blog-articles/ai-revolutionizing-business.md",
      readTime: 18
    },
    {
      slug: "top-10-ai-tools",
      file: "/home/ubuntu/upskillintech-hub/blog-articles/top-10-ai-tools.md",
      readTime: 20
    },
    {
      slug: "future-ai-education",
      file: "/home/ubuntu/upskillintech-hub/blog-articles/future-ai-education.md",
      readTime: 17
    },
    {
      slug: "building-first-ai-app",
      file: "/home/ubuntu/upskillintech-hub/blog-articles/building-first-ai-app.md",
      readTime: 18
    }
  ];

  for (const article of articles) {
    try {
      const content = readFileSync(article.file, "utf-8");
      
      await db
        .update(blogPosts)
        .set({ 
          content: content,
          readTime: article.readTime
        })
        .where(eq(blogPosts.slug, article.slug));
      
      console.log(`✅ Updated: ${article.slug}`);
    } catch (error) {
      console.error(`❌ Error updating ${article.slug}:`, error);
    }
  }

  console.log("✅ Blog content update complete!");
  process.exit(0);
}

updateBlogContent().catch((error) => {
  console.error("Error updating blog content:", error);
  process.exit(1);
});
