import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { formsRouter } from "./routers/forms";
import { webinarRouter } from "./routers/webinar";
import { notificationsRouter } from "./routers/notifications";
import { newsletterRouter } from "./routers/newsletter";
import { coursesRouter } from "./routers/courses";
import { userRouter } from "./routers/user";
import { achievementsRouter } from "./routers/achievements";
import { certificatesRouter } from "./routers/certificates";
import { blogRouter } from "./routers/blog";
import { adminRouter } from "./routers/admin";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Form submissions (contact, lead magnet, consultation, enrollment, community)
  forms: formsRouter,

  // Newsletter: subscription + preference management
  newsletter: newsletterRouter,

  // Webinar registration & admin export
  webinar: webinarRouter,

  // In-app notifications
  notifications: notificationsRouter,

  // Learning platform
  courses: coursesRouter,

  // User profile, stats, activity
  user: userRouter,

  // Badges and XP
  achievements: achievementsRouter,

  // Completion certificates
  certificates: certificatesRouter,

  // Blog posts and comments
  blog: blogRouter,

  // Admin: email templates, analytics
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
