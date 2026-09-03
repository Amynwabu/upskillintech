import "dotenv/config";
import { and, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { courses, enrollments, users } from "../drizzle/schema";
import { requireLocalDevelopmentDatabase } from "./payment-db-safety";

async function main() {
  const db = drizzle(requireLocalDevelopmentDatabase());
  const [tables] = await db.execute(sql`
    SELECT TABLE_NAME FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN ('orders', 'stripe_webhook_events')
  `);
  const [constraints] = await db.execute(sql`
    SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN ('orders', 'enrollments')
  `);
  const [indexes] = await db.execute(sql`
    SELECT DISTINCT TABLE_NAME, INDEX_NAME FROM information_schema.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN ('orders', 'enrollments', 'stripe_webhook_events')
  `);
  const [course] = await db.select().from(courses).where(eq(courses.title, "AI Automation Masterclass")).limit(1);
  const [user] = await db.select().from(users).where(eq(users.openId, "dev-stripe-test-buyer")).limit(1);
  if (!course || !user) throw new Error("Run db:seed:payments before verification.");
  if (course.price !== 69900 || course.currency !== "gbp" || !course.isPremium || !course.isPublished) {
    throw new Error("The £699 test course is not configured correctly.");
  }

  const [ownedCourse] = await db.select().from(courses).where(eq(courses.title, "Payment Test Already Enrolled Course")).limit(1);
  if (!ownedCourse) throw new Error("The already-enrolled test course is missing.");
  const [owned] = await db.select().from(enrollments).where(and(eq(enrollments.userId, user.id), eq(enrollments.courseId, ownedCourse.id))).limit(1);
  let duplicateRejected = false;
  try {
    await db.insert(enrollments).values({ userId: user.id, courseId: ownedCourse.id });
  } catch {
    duplicateRejected = true;
  }
  if (!duplicateRejected) throw new Error("Database accepted a duplicate enrolment.");

  console.log("Payment database verification", {
    tables: tables as unknown[],
    constraintCount: (constraints as unknown[]).length,
    indexCount: (indexes as unknown[]).length,
    course: { id: course.id, price: course.price, currency: course.currency, premium: course.isPremium, published: course.isPublished },
    duplicateEnrollmentRejected: true,
  });
}

main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
