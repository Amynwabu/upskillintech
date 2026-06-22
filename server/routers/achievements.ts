import { desc, eq } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { achievements } from "../../drizzle/schema";

export const achievementsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, ctx.user.id))
      .orderBy(desc(achievements.earnedAt));
  }),
});
