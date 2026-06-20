import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, ne } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  blogCategories,
  blogComments,
  blogPosts,
  users,
} from "../../drizzle/schema";

export const blogRouter = router({
  getPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const [post] = await db
        .select()
        .from(blogPosts)
        .where(
          and(eq(blogPosts.slug, input.slug), eq(blogPosts.isPublished, true))
        )
        .limit(1);

      if (!post) return null;

      const [authorRows, categoryRows] = await Promise.all([
        db.select().from(users).where(eq(users.id, post.authorId)).limit(1),
        db
          .select()
          .from(blogCategories)
          .where(eq(blogCategories.id, post.categoryId))
          .limit(1),
      ]);

      // Increment view count (non-blocking)
      db.update(blogPosts)
        .set({ views: post.views + 1 })
        .where(eq(blogPosts.id, post.id))
        .catch((err) => console.warn("[Blog] Failed to increment views:", err));

      return {
        ...post,
        authorName: authorRows[0]?.name ?? null,
        authorBio: authorRows[0]?.bio ?? null,
        categoryName: categoryRows[0]?.name ?? null,
      };
    }),

  getComments: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const comments = await db
        .select()
        .from(blogComments)
        .where(eq(blogComments.postId, input.postId))
        .orderBy(desc(blogComments.createdAt));

      if (comments.length === 0) return [];

      const userIds = Array.from(new Set(comments.map((c) => c.userId)));
      const userRows = await Promise.all(
        userIds.map((id) =>
          db.select().from(users).where(eq(users.id, id)).limit(1)
        )
      );
      const userMap = new Map(
        userRows.flatMap((rows) => rows.map((u) => [u.id, u]))
      );

      return comments.map((c) => ({
        ...c,
        userName: userMap.get(c.userId)?.name ?? null,
      }));
    }),

  getRelatedPosts: publicProcedure
    .input(
      z.object({
        postId: z.number(),
        categoryId: z.number(),
        limit: z.number().min(1).max(10).default(3),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      return db
        .select({
          id: blogPosts.id,
          slug: blogPosts.slug,
          title: blogPosts.title,
          excerpt: blogPosts.excerpt,
          coverImage: blogPosts.coverImage,
          readTime: blogPosts.readTime,
        })
        .from(blogPosts)
        .where(
          and(
            eq(blogPosts.categoryId, input.categoryId),
            eq(blogPosts.isPublished, true),
            ne(blogPosts.id, input.postId)
          )
        )
        .orderBy(desc(blogPosts.publishedAt))
        .limit(input.limit);
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        content: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      await db.insert(blogComments).values({
        postId: input.postId,
        userId: ctx.user.id,
        content: input.content,
      });

      return { success: true };
    }),
});
