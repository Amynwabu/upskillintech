import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { sql } from "drizzle-orm";
import { requireLocalDevelopmentDatabase } from "./payment-db-safety";

async function main() {
  const db = drizzle(requireLocalDevelopmentDatabase());
  const duplicateEnrollments = await db.execute(sql`
    SELECT userId, courseId, COUNT(*) AS duplicateCount
    FROM enrollments GROUP BY userId, courseId HAVING COUNT(*) > 1
  `);
  const orphanedEnrollmentUsers = await db.execute(sql`
    SELECT e.id FROM enrollments e LEFT JOIN users u ON u.id = e.userId WHERE u.id IS NULL
  `);
  const orphanedEnrollmentCourses = await db.execute(sql`
    SELECT e.id FROM enrollments e LEFT JOIN courses c ON c.id = e.courseId WHERE c.id IS NULL
  `);

  const counts = {
    duplicateEnrollments: (duplicateEnrollments[0] as unknown[]).length,
    orphanedEnrollmentUsers: (orphanedEnrollmentUsers[0] as unknown[]).length,
    orphanedEnrollmentCourses: (orphanedEnrollmentCourses[0] as unknown[]).length,
  };
  console.log("Payment migration preflight", counts);
  if (Object.values(counts).some(count => count > 0)) {
    throw new Error("Preflight found duplicate or orphaned enrolment data. Review it manually before migration.");
  }
}

main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
