import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { courses, enrollments, instructors, users } from "../drizzle/schema";
import { requireLocalDevelopmentDatabase } from "./payment-db-safety";

const TEST_OPEN_ID = "dev-stripe-test-buyer";
const INSTRUCTOR_NAME = "UpskillinTech Test Instructor";

async function main() {
  const db = drizzle(requireLocalDevelopmentDatabase());
  await db.insert(users).values({
    openId: TEST_OPEN_ID,
    name: "Stripe Test Buyer",
    email: "stripe-test@example.invalid",
    loginMethod: "development-seed",
  }).onDuplicateKeyUpdate({ set: { name: "Stripe Test Buyer", email: "stripe-test@example.invalid" } });
  const [user] = await db.select().from(users).where(eq(users.openId, TEST_OPEN_ID)).limit(1);

  let [instructor] = await db.select().from(instructors).where(eq(instructors.name, INSTRUCTOR_NAME)).limit(1);
  if (!instructor) {
    await db.insert(instructors).values({ userId: user.id, name: INSTRUCTOR_NAME });
    [instructor] = await db.select().from(instructors).where(eq(instructors.name, INSTRUCTOR_NAME)).limit(1);
  }

  const offerings = [
    { title: "AI Automation Masterclass", price: 69900, isPremium: true, isPublished: true },
    { title: "Payment Test Free Course", price: 0, isPremium: false, isPublished: true },
    { title: "Payment Test Already Enrolled Course", price: 4900, isPremium: true, isPublished: true },
  ];
  for (const offering of offerings) {
    const values = {
      ...offering,
      description: "Development-only payment validation course.",
      category: "business" as const,
      level: "beginner" as const,
      instructorId: instructor.id,
      currency: "gbp",
    };
    const [existing] = await db.select().from(courses).where(eq(courses.title, offering.title)).limit(1);
    if (existing) await db.update(courses).set(values).where(eq(courses.id, existing.id));
    else await db.insert(courses).values(values);
  }

  const [alreadyOwned] = await db.select().from(courses).where(eq(courses.title, "Payment Test Already Enrolled Course")).limit(1);
  const [existingEnrollment] = await db.select().from(enrollments).where(and(eq(enrollments.userId, user.id), eq(enrollments.courseId, alreadyOwned.id))).limit(1);
  if (!existingEnrollment) await db.insert(enrollments).values({ userId: user.id, courseId: alreadyOwned.id });

  const [masterclass] = await db.select().from(courses).where(eq(courses.title, "AI Automation Masterclass")).limit(1);
  console.log("Payment development seed ready", { userId: user.id, courseId: masterclass.id, price: masterclass.price, currency: masterclass.currency });
}

main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
