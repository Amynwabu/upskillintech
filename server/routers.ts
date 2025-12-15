import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { sendPreferenceConfirmationEmail, generateWelcomeEmailHtml, generatePreferenceConfirmationHtml, sendWelcomeEmail, generatePasswordResetEmailHtml, sendPasswordResetEmail, generateEventRegistrationEmailHtml, sendEventRegistrationEmail, EventDetails } from "./emailService";

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
            `Congratulations! You have completed ${course?.title || 'the course'}`,
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

  // Community features
  community: router({
    getPosts: publicProcedure
      .input(
        z
          .object({
            category: z.enum(["all", "business", "faith", "education", "creators"]).optional(),
            limit: z.number().min(1).max(100).default(20),
            offset: z.number().min(0).default(0),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const category = input?.category === "all" ? undefined : input?.category;
        const posts = await db.getCommunityPosts({
          category,
          limit: input?.limit || 20,
          offset: input?.offset || 0,
        });
        return posts;
      }),

    createPost: protectedProcedure
      .input(
        z.object({
          content: z.string().min(1).max(5000),
          category: z.enum(["business", "faith", "education", "creators"]),
          attachments: z.array(z.string()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const user = await db.getUserProfile(ctx.user.id);
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const post = await db.createCommunityPost({
          userId: ctx.user.id,
          content: input.content,
          category: input.category,
          attachments: input.attachments ? JSON.stringify(input.attachments) : undefined,
        });

        // Broadcast new post via WebSocket
        const { broadcastCommunityUpdate } = await import("./websocket");
        broadcastCommunityUpdate("new_post", {
          ...post,
          authorName: user.name,
        });

        return post;
      }),

    likePost: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const hasLiked = await db.hasUserLikedPost(ctx.user.id, input.postId);
        const result = await db.likeCommunityPost(ctx.user.id, input.postId);

        // Broadcast like update via WebSocket
        const { broadcastCommunityUpdate } = await import("./websocket");
        broadcastCommunityUpdate("post_liked", {
          postId: input.postId,
          liked: !hasLiked,
          likeCount: result.likeCount,
        });

        return result;
      }),

    addComment: protectedProcedure
      .input(
        z.object({
          postId: z.number(),
          content: z.string().min(1).max(1000),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const user = await db.getUserProfile(ctx.user.id);
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const comment = await db.addCommunityComment({
          postId: input.postId,
          userId: ctx.user.id,
          content: input.content,
        });

        // Broadcast new comment via WebSocket
        const { broadcastCommunityUpdate } = await import("./websocket");
        broadcastCommunityUpdate("new_comment", {
          ...comment,
          authorName: user.name,
          postId: input.postId,
        });

        return comment;
      }),

    getComments: publicProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ input }) => {
        const comments = await db.getCommunityComments(input.postId);
        return comments;
      }),
  }),

  // Newsletter management
  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("Please enter a valid email address"),
        })
      )
      .mutation(async ({ input }) => {
        const result = await db.subscribeToNewsletter(input.email);
        return result;
      }),

    unsubscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
        })
      )
      .mutation(async ({ input }) => {
        await db.unsubscribeFromNewsletter(input.email);
        return { success: true, message: "Successfully unsubscribed from newsletter" };
      }),

    getSubscribers: protectedProcedure
      .input(
        z
          .object({
            status: z.enum(["active", "unsubscribed"]).optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const subscribers = await db.getNewsletterSubscribers(input?.status);
        return subscribers;
      }),

    // Get preferences by email or token
    getPreferences: publicProcedure
      .input(
        z.object({
          email: z.string().email().optional(),
          token: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        if (!input.email && !input.token) {
          throw new Error("Email or token is required");
        }
        const subscriber = await db.getNewsletterSubscriberByEmailOrToken(input.email, input.token);
        if (!subscriber) {
          throw new Error("Subscriber not found");
        }
        return {
          email: subscriber.email,
          prefAiNews: subscriber.prefAiNews,
          prefCourseUpdates: subscriber.prefCourseUpdates,
          prefEvents: subscriber.prefEvents,
          prefTips: subscriber.prefTips,
          status: subscriber.status,
        };
      }),

    // Update preferences
    updatePreferences: publicProcedure
      .input(
        z.object({
          email: z.string().email().optional(),
          token: z.string().optional(),
          prefAiNews: z.boolean(),
          prefCourseUpdates: z.boolean(),
          prefEvents: z.boolean(),
          prefTips: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        if (!input.email && !input.token) {
          throw new Error("Email or token is required");
        }
        const { email, token, ...preferences } = input;
        
        // Update preferences in database
        await db.updateNewsletterPreferences(email, token, preferences);
        
        // Get subscriber info to send confirmation email
        const subscriber = await db.getNewsletterSubscriberByEmailOrToken(email, token);
        if (subscriber && subscriber.email) {
          // Generate token if not exists for future preference management
          let preferencesToken = subscriber.preferencesToken;
          if (!preferencesToken) {
            preferencesToken = crypto.randomUUID();
            await db.updateNewsletterPreferencesToken(subscriber.email, preferencesToken);
          }
          
          // Send confirmation email
          await sendPreferenceConfirmationEmail(
            subscriber.email,
            {
              prefAiNews: preferences.prefAiNews,
              prefCourseUpdates: preferences.prefCourseUpdates,
              prefEvents: preferences.prefEvents,
              prefTips: preferences.prefTips,
            },
            preferencesToken
          );
        }
        
        return { success: true, message: "Preferences updated successfully" };
      }),

    // Generate preferences token for email-based access
    requestPreferencesLink: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
        })
      )
      .mutation(async ({ input }) => {
        const token = await db.generatePreferencesToken(input.email);
        if (!token) {
          throw new Error("Email not found in our newsletter list");
        }
        // In production, you would send this token via email
        // For now, we return it directly for testing
        return { success: true, message: "Preferences link sent to your email", token };
      }),
  }),

  // Blog management
  blog: router({
    getCategories: publicProcedure.query(async () => {
      return db.getBlogCategories();
    }),

    getPosts: publicProcedure
      .input(
        z.object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(50).default(10),
          categoryId: z.number().optional(),
          tag: z.string().optional(),
          searchQuery: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        return db.getBlogPosts(input);
      }),

    getPostBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await db.getBlogPostBySlug(input.slug);
        if (!post) {
          throw new Error("Blog post not found");
        }
        
        // Increment view count
        await db.incrementBlogPostViews(post.id);
        
        return post;
      }),

    getComments: publicProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ input }) => {
        return db.getBlogComments(input.postId);
      }),

    addComment: protectedProcedure
      .input(
        z.object({
          postId: z.number(),
          content: z.string().min(1).max(1000),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const commentId = await db.addBlogComment(input.postId, ctx.user.id, input.content);
        return { commentId };
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
        return db.getRelatedBlogPosts(input.postId, input.categoryId, input.limit);
      }),
  }),

  // Admin routes (admin-only access)
  admin: router({
    previewEmailTemplate: protectedProcedure
      .input(
        z.object({
          template: z.enum(["welcome", "preference_confirmation", "password_reset", "event_registration"]),
          preferences: z.object({
            prefAiNews: z.boolean(),
            prefCourseUpdates: z.boolean(),
            prefEvents: z.boolean(),
            prefTips: z.boolean(),
          }).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Check if user is admin
        if (ctx.user.role !== "admin") {
          throw new Error("Admin access required");
        }

        let html: string;
        if (input.template === "welcome") {
          html = generateWelcomeEmailHtml();
        } else if (input.template === "preference_confirmation") {
          const preferences = input.preferences || {
            prefAiNews: true,
            prefCourseUpdates: true,
            prefEvents: false,
            prefTips: true,
          };
          html = generatePreferenceConfirmationHtml(preferences);
        } else if (input.template === "password_reset") {
          html = generatePasswordResetEmailHtml();
        } else {
          html = generateEventRegistrationEmailHtml();
        }

        return { html };
      }),

    sendTestEmail: protectedProcedure
      .input(
        z.object({
          template: z.enum(["welcome", "preference_confirmation", "password_reset"]),
          recipientEmail: z.string().email(),
          preferences: z.object({
            prefAiNews: z.boolean(),
            prefCourseUpdates: z.boolean(),
            prefEvents: z.boolean(),
            prefTips: z.boolean(),
          }).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Check if user is admin
        if (ctx.user.role !== "admin") {
          throw new Error("Admin access required");
        }

        if (input.template === "welcome") {
          const result = await sendWelcomeEmail(input.recipientEmail);
          if (!result.success) {
            throw new Error(result.error || "Failed to send email");
          }
        } else if (input.template === "preference_confirmation") {
          const preferences = input.preferences || {
            prefAiNews: true,
            prefCourseUpdates: true,
            prefEvents: false,
            prefTips: true,
          };
          const result = await sendPreferenceConfirmationEmail(
            input.recipientEmail,
            preferences,
            "test-token-preview"
          );
          if (!result.success) {
            throw new Error(result.error || "Failed to send email");
          }
        } else if (input.template === "password_reset") {
          const result = await sendPasswordResetEmail(
            input.recipientEmail,
            "test-reset-token-preview"
          );
          if (!result.success) {
            throw new Error(result.error || "Failed to send email");
          }
        } else {
          const testEvent: EventDetails = {
            title: "AI Fundamentals Workshop",
            description: "Learn the basics of artificial intelligence and machine learning in this hands-on workshop.",
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            duration: 120,
            location: "Online via Zoom",
            hostName: "Dr. Sarah Chen",
            hostEmail: "sarah@upskillintech.com",
            eventType: "workshop",
            registrationId: "REG-TEST-001",
          };
          const result = await sendEventRegistrationEmail(input.recipientEmail, testEvent);
          if (!result.success) {
            throw new Error(result.error || "Failed to send email");
          }
        }

        return { success: true };
      }),

    getEmailAnalytics: protectedProcedure
      .input(
        z.object({
          days: z.number().min(1).max(365).default(30),
        })
      )
      .query(async ({ ctx, input }) => {
        // Check if user is admin
        if (ctx.user.role !== "admin") {
          throw new Error("Admin access required");
        }

        const { getEmailAnalyticsSummary, getEmailEventsByDate, getEmailEventsByTemplate, getRecentEmailEvents } = await import("./db");

        const [summary, eventsByDate, eventsByTemplate, recentEvents] = await Promise.all([
          getEmailAnalyticsSummary(input.days),
          getEmailEventsByDate(input.days),
          getEmailEventsByTemplate(input.days),
          getRecentEmailEvents(20),
        ]);

        return {
          summary,
          eventsByDate,
          eventsByTemplate,
          recentEvents,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
