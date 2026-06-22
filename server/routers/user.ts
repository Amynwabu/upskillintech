import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  achievements,
  certificates,
  enrollments,
  users,
  userProgress,
  courseModules,
} from "../../drizzle/schema";

export const userRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, ctx.user.id))
      .limit(1);

    return user ?? null;
  }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      return {
        totalXP: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        coursesCompleted: 0,
        totalHours: 0,
        achievementsCount: 0,
      };
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, ctx.user.id))
      .limit(1);

    const [completedEnrollments, achievementRows] = await Promise.all([
      db
        .select()
        .from(enrollments)
        .where(
          and(
            eq(enrollments.userId, ctx.user.id),
            eq(enrollments.progress, 100)
          )
        ),
      db
        .select()
        .from(achievements)
        .where(eq(achievements.userId, ctx.user.id)),
    ]);

    const totalXP = user?.totalXP ?? 0;
    const level = Math.max(1, Math.floor(totalXP / 1000) + 1);

    return {
      totalXP,
      level,
      currentStreak: user?.currentStreak ?? 0,
      longestStreak: user?.longestStreak ?? 0,
      coursesCompleted: completedEnrollments.length,
      totalHours: Math.round((completedEnrollments.length * 2 + achievementRows.length) / 1),
      achievementsCount: achievementRows.length,
    };
  }),

  getActivityHistory: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(10) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      const progress = await db
        .select()
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, ctx.user.id),
            eq(userProgress.completed, true)
          )
        )
        .orderBy(desc(userProgress.completedAt))
        .limit(input.limit);

      if (progress.length === 0) return [];

      const moduleIds = Array.from(new Set(progress.map((p) => p.moduleId)));
      const moduleRows = await Promise.all(
        moduleIds.map((id) =>
          db.select().from(courseModules).where(eq(courseModules.id, id)).limit(1)
        )
      );
      const moduleMap = new Map(
        moduleRows.flatMap((rows) => rows.map((m) => [m.id, m]))
      );

      return progress.map((p) => {
        const mod = moduleMap.get(p.moduleId);
        return {
          id: p.id,
          title: mod?.title ?? "Module",
          courseTitle: `Course ${p.courseId}`,
          xpEarned: p.xpEarned,
          completedAt: p.completedAt,
        };
      });
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        bio: z.string().optional(),
        avatar: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false };

      await db
        .update(users)
        .set({
          ...(input.name !== undefined ? { name: input.name } : {}),
          ...(input.bio !== undefined ? { bio: input.bio } : {}),
          ...(input.avatar !== undefined ? { avatar: input.avatar } : {}),
        })
        .where(eq(users.id, ctx.user.id));

      return { success: true };
    }),
});
