import { desc, eq } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { certificates } from "../../drizzle/schema";

export const certificatesRouter = router({
  getMyCertificates: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(certificates)
      .where(eq(certificates.userId, ctx.user.id))
      .orderBy(desc(certificates.issuedAt));
  }),
});
