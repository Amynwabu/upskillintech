import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { sql, and, asc, desc, eq } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  courses,
  courseModules,
  courseReviews,
  enrollments,
  instructors,
  userProgress,
  users,
} from "../../drizzle/schema";

export const coursesRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          category: z
            .enum(["business", "education", "faith", "creator", "general"])
            .optional(),
          level: z
            .enum(["beginner", "intermediate", "advanced"])
            .optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const conditions = [eq(courses.isPublished, true)];
      if (input?.category) conditions.push(eq(courses.category, input.category));
      if (input?.level) conditions.push(eq(courses.level, input.level));

      return db
        .select()
        .from(courses)
        .where(and(...conditions))
        .orderBy(desc(courses.enrollmentCount));
    }),

  getWithDetails: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const [course] = await db
        .select()
        .from(courses)
        .where(eq(courses.id, input.id))
        .limit(1);

      if (!course) return null;

      const [modules, reviews, instructorRows] = await Promise.all([
        db
          .select()
          .from(courseModules)
          .where(eq(courseModules.courseId, input.id))
          .orderBy(asc(courseModules.orderIndex)),
        db
          .select()
          .from(courseReviews)
          .where(eq(courseReviews.courseId, input.id))
          .orderBy(desc(courseReviews.createdAt))
          .limit(20),
        db
          .select()
          .from(instructors)
          .where(eq(instructors.id, course.instructorId))
          .limit(1),
      ]);

      return {
        ...course,
        modules,
        reviews,
        instructor: instructorRows[0] ?? null,
      };
    }),

  getMyEnrollments: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const myEnrollments = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.userId, ctx.user.id))
      .orderBy(desc(enrollments.enrolledAt));

    if (myEnrollments.length === 0) return [];

    const courseIds = Array.from(new Set(myEnrollments.map((e) => e.courseId)));
    const courseRows = await Promise.all(
      courseIds.map((id) =>
        db.select().from(courses).where(eq(courses.id, id)).limit(1)
      )
    );
    const courseMap = new Map(
      courseRows.flatMap((rows) => rows.map((c) => [c.id, c]))
    );

    return myEnrollments.map((e) => ({
      ...e,
      course: courseMap.get(e.courseId) ?? null,
    }));
  }),

  enroll: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const existing = await db
        .select()
        .from(enrollments)
        .where(
          and(
            eq(enrollments.userId, ctx.user.id),
            eq(enrollments.courseId, input.courseId)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        return { success: true, alreadyEnrolled: true };
      }

      await db.insert(enrollments).values({
        userId: ctx.user.id,
        courseId: input.courseId,
        progress: 0,
        completedModules: 0,
      });

      // Increment enrollment count (non-critical)
      db.update(courses)
        .set({ enrollmentCount: sql`${courses.enrollmentCount} + 1` })
        .where(eq(courses.id, input.courseId))
        .catch((err) => console.warn("[Courses] Failed to update enrollment count:", err));

      return { success: true, alreadyEnrolled: false };
    }),

  getProgress: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { progress: 0, completedModules: [] };

      const [completedModules, enrollmentRows] = await Promise.all([
        db
          .select()
          .from(userProgress)
          .where(
            and(
              eq(userProgress.userId, ctx.user.id),
              eq(userProgress.courseId, input.courseId),
              eq(userProgress.completed, true)
            )
          ),
        db
          .select()
          .from(enrollments)
          .where(
            and(
              eq(enrollments.userId, ctx.user.id),
              eq(enrollments.courseId, input.courseId)
            )
          )
          .limit(1),
      ]);

      return {
        progress: enrollmentRows[0]?.progress ?? 0,
        completedModules,
      };
    }),

  completeModule: protectedProcedure
    .input(z.object({ courseId: z.number(), moduleId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const XP_PER_MODULE = 50;

      const existing = await db
        .select()
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, ctx.user.id),
            eq(userProgress.moduleId, input.moduleId),
            eq(userProgress.courseId, input.courseId)
          )
        )
        .limit(1);

      if (existing.length > 0 && existing[0].completed) {
        return { success: true, xpEarned: 0 };
      }

      if (existing.length > 0) {
        await db
          .update(userProgress)
          .set({ completed: true, completedAt: new Date(), xpEarned: XP_PER_MODULE })
          .where(eq(userProgress.id, existing[0].id));
      } else {
        await db.insert(userProgress).values({
          userId: ctx.user.id,
          moduleId: input.moduleId,
          courseId: input.courseId,
          completed: true,
          completedAt: new Date(),
          xpEarned: XP_PER_MODULE,
        });
      }

      // Recompute enrollment progress
      const [allCompleted, courseRows] = await Promise.all([
        db
          .select()
          .from(userProgress)
          .where(
            and(
              eq(userProgress.userId, ctx.user.id),
              eq(userProgress.courseId, input.courseId),
              eq(userProgress.completed, true)
            )
          ),
        db.select().from(courses).where(eq(courses.id, input.courseId)).limit(1),
      ]);

      const totalModules = courseRows[0]?.totalModules || 1;
      const completedCount = allCompleted.length;
      const progressPct = Math.min(100, Math.round((completedCount / totalModules) * 100));

      await db
        .update(enrollments)
        .set({
          completedModules: completedCount,
          progress: progressPct,
          lastAccessedAt: new Date(),
          ...(progressPct >= 100 ? { completedAt: new Date() } : {}),
        })
        .where(
          and(
            eq(enrollments.userId, ctx.user.id),
            eq(enrollments.courseId, input.courseId)
          )
        );

      // Increment user XP
      await db
        .update(users)
        .set({
          totalXP: sql`${users.totalXP} + ${XP_PER_MODULE}`,
          lastActivityDate: new Date(),
        })
        .where(eq(users.id, ctx.user.id));

      return { success: true, xpEarned: XP_PER_MODULE };
    }),
});
