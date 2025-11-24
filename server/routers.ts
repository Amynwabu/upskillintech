import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Course management
  courses: router({
    list: publicProcedure
      .input(
        z
          .object({
            category: z.enum(["business", "education", "faith", "creator", "general"]).optional(),
            level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
            isPremium: z.boolean().optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const courses = await db.getAllCourses(input);
        return courses;
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const course = await db.getCourseById(input.id);
        if (!course) {
          throw new Error("Course not found");
        }
        const modules = await db.getCourseModules(input.id);
        return { ...course, modules };
      }),

    enroll: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const enrollment = await db.enrollUserInCourse(ctx.user.id, input.courseId);
        
        // Create notification
        const course = await db.getCourseById(input.courseId);
        if (course) {
          await db.createNotification(
            ctx.user.id,
            "system",
            "Enrollment Successful",
            `You've successfully enrolled in ${course.title}`,
            `/learning/${input.courseId}`
          );
        }
        
        return enrollment;
      }),

    getMyEnrollments: protectedProcedure.query(async ({ ctx }) => {
      const enrollments = await db.getUserEnrollments(ctx.user.id);
      
      // Fetch course details for each enrollment
      const enrollmentsWithCourses = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await db.getCourseById(enrollment.courseId);
          return { ...enrollment, course };
        })
      );
      
      return enrollmentsWithCourses;
    }),

    getProgress: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ ctx, input }) => {
        const progress = await db.getUserProgress(ctx.user.id, input.courseId);
        const enrollment = await db.getEnrollment(ctx.user.id, input.courseId);
        return { progress, enrollment };
      }),

    completeModule: protectedProcedure
      .input(
        z.object({
          moduleId: z.number(),
          courseId: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const xpEarned = 50; // Base XP for completing a module
        
        const progress = await db.completeModule(
          ctx.user.id,
          input.moduleId,
          input.courseId,
          xpEarned
        );
        
        // Check for achievements
        const allProgress = await db.getUserProgress(ctx.user.id, input.courseId);
        const completedCount = allProgress.filter(p => p.completed).length;
        
        // Award achievement for completing 3 modules
        if (completedCount === 3) {
          await db.awardAchievement(
            ctx.user.id,
            "first_three_modules",
            "Getting Started",
            "Completed your first 3 modules",
            "🎯",
            100
          );
          
          await db.createNotification(
            ctx.user.id,
            "achievement",
            "Achievement Unlocked!",
            "You've earned the 'Getting Started' badge for completing 3 modules",
            "/dashboard"
          );
        }
        
        // Award achievement for completing a course
        const enrollment = await db.getEnrollment(ctx.user.id, input.courseId);
        if (enrollment?.progress === 100) {
          const course = await db.getCourseById(input.courseId);
          await db.awardAchievement(
            ctx.user.id,
            `course_complete_${input.courseId}`,
            "Course Completed",
            `Completed ${course?.title}`,
            "🏆",
            200
          );
          
          await db.createNotification(
            ctx.user.id,
            "achievement",
            "Course Completed!",
            `Congratulations! You have completed ${course?.title}`,
            `/learning/${input.courseId}`
          );
        }
        
        return { progress, xpEarned };
      }),

    getModuleContent: protectedProcedure
      .input(z.object({ moduleId: z.number(), courseId: z.number() }))
      .query(async ({ ctx, input }) => {
        // Check if user is enrolled
        const enrollment = await db.getEnrollment(ctx.user.id, input.courseId);
        if (!enrollment) {
          throw new Error("You must enroll in this course first");
        }
        
        const module = await db.getModuleById(input.moduleId);
        if (!module) {
          throw new Error("Module not found");
        }
        
        const progress = await db.getModuleProgress(ctx.user.id, input.moduleId);
        
        return { module, progress };
      }),

    getWithDetails: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const courseDetails = await db.getCourseWithDetails(input.id);
        return courseDetails;
      }),

    getReviews: publicProcedure
      .input(
        z.object({
          courseId: z.number(),
          limit: z.number().optional(),
          offset: z.number().optional(),
        })
      )
      .query(async ({ input }) => {
        const reviews = await db.getCourseReviews(
          input.courseId,
          input.limit || 10,
          input.offset || 0
        );
        return reviews;
      }),

    addReview: protectedProcedure
      .input(
        z.object({
          courseId: z.number(),
          rating: z.number().min(1).max(5),
          comment: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const review = await db.addCourseReview(
          input.courseId,
          ctx.user.id,
          input.rating,
          input.comment
        );
        return review;
      }),
  }),

  // Notifications
  notifications: router({
    list: protectedProcedure
      .input(z.object({ unreadOnly: z.boolean().optional() }).optional())
      .query(async ({ ctx, input }) => {
        const notifications = await db.getUserNotifications(
          ctx.user.id,
          input?.unreadOnly || false
        );
        return notifications;
      }),

    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markNotificationAsRead(input.id);
        return { success: true };
      }),

    markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
        await db.markAllNotificationsAsRead(ctx.user.id);
        return { success: true };
      }),
  }),

  // Achievements
  achievements: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const achievements = await db.getUserAchievements(ctx.user.id);
      return achievements;
    }),
  }),

  // User Profile
  user: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const profile = await db.getUserProfile(ctx.user.id);
      return profile;
    }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
      const stats = await db.getUserStats(ctx.user.id);
      return stats;
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
        const updatedProfile = await db.updateUserProfile(ctx.user.id, input);
        return updatedProfile;
      }),

    getActivityHistory: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ ctx, input }) => {
        const activities = await db.getUserActivityHistory(
          ctx.user.id,
          input?.limit || 10
        );
        return activities;
      }),
  }),

  certificates: router({
    generate: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // Check if user completed the course
        const enrollment = await db.getEnrollment(ctx.user.id, input.courseId);
        if (!enrollment || enrollment.progress !== 100) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You must complete all modules before generating a certificate",
          });
        }

        // Check if certificate already exists
        const existing = await db.checkCertificateExists(ctx.user.id, input.courseId);
        if (existing) {
          return existing;
        }

        // Get course and instructor details
        const course = await db.getCourseById(input.courseId);
        if (!course) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Course not found",
          });
        }

        const instructor = course.instructorId
          ? await db.getInstructorById(course.instructorId)
          : null;

        const user = await db.getUserProfile(ctx.user.id);
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        // Generate certificate
        const { generateCertificateId, generateCertificatePDF } = await import("./certificateGenerator");
        const certificateId = generateCertificateId(ctx.user.id, input.courseId);
        
        const pdfBuffer = await generateCertificatePDF({
          certificateId,
          studentName: user.name || "Student",
          courseName: course.title,
          instructorName: instructor?.name,
          completionDate: enrollment.completedAt || new Date(),
        });

        // Save PDF to storage (for now, we'll store as base64 data URL)
        const pdfBase64 = pdfBuffer.toString("base64");
        const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;

        // Create certificate record
        const certificateData = {
          userId: ctx.user.id,
          courseId: input.courseId,
          certificateId,
          studentName: user.name || "Student",
          courseName: course.title,
          instructorName: instructor?.name || null,
          completionDate: enrollment.completedAt || new Date(),
          pdfUrl: pdfDataUrl,
        };

        await db.createCertificate(certificateData);

        // Create notification
        await db.createNotification(
          ctx.user.id,
          "achievement",
          "Certificate Earned!",
          `Your certificate for ${course.title} is ready to download`,
          `/profile`
        );

        const certificate = await db.checkCertificateExists(ctx.user.id, input.courseId);
        return certificate;
      }),

    getMyCertificates: protectedProcedure.query(async ({ ctx }) => {
      const certificates = await db.getUserCertificates(ctx.user.id);
      return certificates;
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const certificate = await db.getCertificateById(input.id);
        if (!certificate || certificate.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Certificate not found",
          });
        }
        return certificate;
      }),

    download: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const certificate = await db.getCertificateById(input.id);
        if (!certificate || certificate.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Certificate not found",
          });
        }
        return {
          pdfUrl: certificate.pdfUrl,
          filename: `${certificate.certificateId}.pdf`,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
