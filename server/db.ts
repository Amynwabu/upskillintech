import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  instructors,
  courses, 
  courseModules, 
  courseReviews,
  enrollments, 
  userProgress, 
  achievements, 
  notifications,
  certificates,
  InsertCertificate,
  communityPosts,
  communityComments,
  postLikes,
  newsletterSubscribers,
  InsertNewsletterSubscriber
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// COURSE MANAGEMENT
// ============================================

export async function getAllCourses(filters?: {
  category?: string;
  level?: string;
  isPremium?: boolean;
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(courses).where(eq(courses.isPublished, true));

  const results = await query;
  
  // Apply filters in memory
  let filtered = results;
  if (filters?.category) {
    filtered = filtered.filter(c => c.category === filters.category);
  }
  if (filters?.level) {
    filtered = filtered.filter(c => c.level === filters.level);
  }
  if (filters?.isPremium !== undefined) {
    filtered = filtered.filter(c => c.isPremium === filters.isPremium);
  }

  return filtered;
}

export async function getCourseById(courseId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getCourseModules(courseId: number) {
  const db = await getDb();
  if (!db) return [];

  const modules = await db
    .select()
    .from(courseModules)
    .where(eq(courseModules.courseId, courseId));

  return modules.sort((a, b) => a.orderIndex - b.orderIndex);
}

export async function getModuleById(moduleId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(courseModules).where(eq(courseModules.id, moduleId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ============================================
// ENROLLMENT MANAGEMENT
// ============================================

export async function enrollUserInCourse(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if already enrolled
  const existing = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId))
    .where(eq(enrollments.courseId, courseId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Create new enrollment
  await db.insert(enrollments).values({
    userId,
    courseId,
    progress: 0,
    completedModules: 0,
  });

  // Update enrollment count
  const course = await getCourseById(courseId);
  if (course) {
    await db
      .update(courses)
      .set({ enrollmentCount: (course.enrollmentCount || 0) + 1 })
      .where(eq(courses.id, courseId));
  }

  const newEnrollment = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId))
    .where(eq(enrollments.courseId, courseId))
    .limit(1);

  return newEnrollment[0];
}

export async function getUserEnrollments(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const userEnrollments = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId));

  return userEnrollments;
}

export async function getEnrollment(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId))
    .where(eq(enrollments.courseId, courseId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

// ============================================
// PROGRESS TRACKING
// ============================================

export async function getUserProgress(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return [];

  const progress = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .where(eq(userProgress.courseId, courseId));

  return progress;
}

export async function getModuleProgress(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .where(eq(userProgress.moduleId, moduleId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function completeModule(userId: number, moduleId: number, courseId: number, xpEarned: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if already completed
  const existing = await getModuleProgress(userId, moduleId);
  if (existing?.completed) {
    return existing;
  }

  // Mark module as complete
  if (existing) {
    await db
      .update(userProgress)
      .set({
        completed: true,
        completedAt: new Date(),
        xpEarned,
      })
      .where(eq(userProgress.id, existing.id));
  } else {
    await db.insert(userProgress).values({
      userId,
      moduleId,
      courseId,
      completed: true,
      completedAt: new Date(),
      xpEarned,
    });
  }

  // Update user XP
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0) {
    await db
      .update(users)
      .set({
        totalXP: (user[0].totalXP || 0) + xpEarned,
        lastActivityDate: new Date(),
      })
      .where(eq(users.id, userId));
  }

  // Update enrollment progress
  const enrollment = await getEnrollment(userId, courseId);
  const allProgress = await getUserProgress(userId, courseId);
  const completedCount = allProgress.filter(p => p.completed).length;
  const course = await getCourseById(courseId);
  const totalModules = course?.totalModules || 0;
  const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  if (enrollment) {
    await db
      .update(enrollments)
      .set({
        completedModules: completedCount,
        progress: progressPercent,
        lastAccessedAt: new Date(),
        completedAt: progressPercent === 100 ? new Date() : null,
      })
      .where(eq(enrollments.id, enrollment.id));
  }

  const updatedProgress = await getModuleProgress(userId, moduleId);
  return updatedProgress;
}

// ============================================
// ACHIEVEMENTS
// ============================================

export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const userAchievements = await db
    .select()
    .from(achievements)
    .where(eq(achievements.userId, userId));

  return userAchievements.sort((a, b) => b.earnedAt.getTime() - a.earnedAt.getTime());
}

export async function awardAchievement(
  userId: number,
  type: string,
  title: string,
  description: string,
  icon: string,
  xpAwarded: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if user already has this achievement type
  const existing = await db
    .select()
    .from(achievements)
    .where(eq(achievements.userId, userId))
    .where(eq(achievements.type, type))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Award achievement
  await db.insert(achievements).values({
    userId,
    type,
    title,
    description,
    icon,
    xpAwarded,
  });

  // Update user XP
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0) {
    await db
      .update(users)
      .set({
        totalXP: (user[0].totalXP || 0) + xpAwarded,
      })
      .where(eq(users.id, userId));
  }

  const newAchievement = await db
    .select()
    .from(achievements)
    .where(eq(achievements.userId, userId))
    .where(eq(achievements.type, type))
    .limit(1);

  return newAchievement[0];
}

// ============================================
// NOTIFICATIONS
// ============================================

export async function createNotification(
  userId: number,
  type: "achievement" | "event" | "reply" | "challenge" | "system",
  title: string,
  message: string,
  link?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(notifications).values({
    userId,
    type,
    title,
    message,
    link: link || null,
    isRead: false,
  });
}

export async function getUserNotifications(userId: number, unreadOnly: boolean = false) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(notifications).where(eq(notifications.userId, userId));

  const results = await query;
  
  if (unreadOnly) {
    return results.filter(n => !n.isRead).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  return results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.id, notificationId));
}

export async function markAllNotificationsAsRead(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.userId, userId));
}

// ============================================
// USER PROFILE & STATS
// ============================================

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return user[0] || null;
}

export async function getUserStats(userId: number) {
  const user = await getUserProfile(userId);
  if (!user) return null;

  const db = await getDb();
  if (!db) return null;

  // Get completed courses count
  const completedEnrollments = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId));
  
  const coursesCompleted = completedEnrollments.filter(e => e.progress === 100).length;

  // Get total modules completed
  const completedProgress = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));
  
  const modulesCompleted = completedProgress.filter(p => p.completed).length;

  // Calculate total learning hours (estimate: 1 hour per module)
  const totalHours = modulesCompleted;

  // Get current streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let currentStreak = user.currentStreak || 0;
  const lastActive = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
  
  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    // If last active was yesterday, streak continues
    // If last active was today, use current streak
    // Otherwise, streak is broken
    if (daysDiff > 1) {
      currentStreak = 0;
    }
  }

  // Get achievements count
  const userAchievements = await db
    .select()
    .from(achievements)
    .where(eq(achievements.userId, userId));

  return {
    totalXP: user.totalXP || 0,
    level: Math.floor((user.totalXP || 0) / 1000) + 1, // 1000 XP per level
    currentStreak: currentStreak,
    longestStreak: user.longestStreak || 0,
    coursesCompleted,
    modulesCompleted,
    totalHours,
    achievementsCount: userAchievements.length,
  };
}

export async function updateUserProfile(
  userId: number,
  updates: {
    name?: string;
    bio?: string;
    avatar?: string;
  }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(users)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  return getUserProfile(userId);
}

export async function getUserActivityHistory(userId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) return [];

  // Get recent completed modules
  const recentProgress = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  const completed = recentProgress
    .filter(p => p.completed && p.completedAt)
    .sort((a, b) => {
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);

  // Fetch module and course details
  const activities = await Promise.all(
    completed.map(async (progress) => {
      const module = await getModuleById(progress.moduleId);
      const course = await getCourseById(progress.courseId);
      
      return {
        type: "module_completed" as const,
        id: progress.id,
        title: module?.title || "Unknown Module",
        courseTitle: course?.title || "Unknown Course",
        completedAt: progress.completedAt,
        xpEarned: progress.xpEarned || 0,
      };
    })
  );

  return activities;
}

export async function updateUserStreak(userId: number) {
  const db = await getDb();
  if (!db) return;

  const user = await getUserProfile(userId);
  if (!user) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActive = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
  
  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Already active today, no change
      return;
    } else if (daysDiff === 1) {
      // Active yesterday, increment streak
      const newStreak = (user.currentStreak || 0) + 1;
      const longestStreak = Math.max(newStreak, user.longestStreak || 0);
      
      await db
        .update(users)
        .set({
          currentStreak: newStreak,
          longestStreak: longestStreak,
          lastActivityDate: today,
        })
        .where(eq(users.id, userId));
    } else {
      // Streak broken, reset to 1
      await db
        .update(users)
        .set({
          currentStreak: 1,
          lastActivityDate: today,
        })
        .where(eq(users.id, userId));
    }
  } else {
    // First activity
    await db
      .update(users)
      .set({
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: today,
      })
      .where(eq(users.id, userId));
  }
}

// ============================================
// INSTRUCTORS
// ============================================

export async function getInstructorById(instructorId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(instructors).where(eq(instructors.id, instructorId)).limit(1);
  return result[0] || null;
}

// ============================================
// COURSE REVIEWS
// ============================================

export async function getCourseReviews(courseId: number, limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];

  const reviews = await db
    .select()
    .from(courseReviews)
    .where(eq(courseReviews.courseId, courseId));

  // Sort by creation date descending
  const sorted = reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  // Apply pagination
  return sorted.slice(offset, offset + limit);
}

export async function addCourseReview(
  courseId: number,
  userId: number,
  rating: number,
  comment: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if user already reviewed this course
  const existing = await db
    .select()
    .from(courseReviews)
    .where(eq(courseReviews.courseId, courseId))
    .where(eq(courseReviews.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("You have already reviewed this course");
  }

  // Check if user is enrolled (verified purchase)
  const enrollment = await getEnrollment(userId, courseId);
  const isVerified = enrollment !== null;

  // Add review
  await db.insert(courseReviews).values({
    courseId,
    userId,
    rating,
    comment,
    isVerifiedPurchase: isVerified,
  });

  // Update course average rating
  const allReviews = await getCourseReviews(courseId, 1000);
  if (allReviews.length > 0) {
    const avgRating = Math.round(
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    );
    
    await db
      .update(courses)
      .set({ rating: avgRating })
      .where(eq(courses.id, courseId));
  }

  const newReview = await db
    .select()
    .from(courseReviews)
    .where(eq(courseReviews.courseId, courseId))
    .where(eq(courseReviews.userId, userId))
    .limit(1);

  return newReview[0];
}

export async function getCourseWithDetails(courseId: number) {
  const db = await getDb();
  if (!db) return null;

  const course = await getCourseById(courseId);
  if (!course) return null;

  const modules = await getCourseModules(courseId);
  const instructor = await getInstructorById(course.instructorId);
  const reviews = await getCourseReviews(courseId, 5);

  return {
    ...course,
    modules,
    instructor,
    reviews,
  };
}

// ============================================
// CERTIFICATES
// ============================================

export async function createCertificate(data: InsertCertificate) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(certificates).values(data).$returningId();
  return result;
}

export async function getUserCertificates(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const userCertificates = await db
    .select()
    .from(certificates)
    .where(eq(certificates.userId, userId));

  return userCertificates.sort((a, b) => b.issuedAt.getTime() - a.issuedAt.getTime());
}

export async function getCertificateById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(certificates)
    .where(eq(certificates.id, id))
    .limit(1);

  return result[0] || null;
}

export async function getCertificateByCertificateId(certificateId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(certificates)
    .where(eq(certificates.certificateId, certificateId))
    .limit(1);

  return result[0] || null;
}

export async function checkCertificateExists(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(certificates)
    .where(eq(certificates.userId, userId))
    .where(eq(certificates.courseId, courseId))
    .limit(1);

  return result[0] || null;
}

// ============================================
// COMMUNITY FUNCTIONS
// ============================================

export async function getCommunityPosts(filters?: { category?: string; limit?: number }) {
  const db = await getDb();
  if (!db) return [];

  let query = db
    .select()
    .from(communityPosts);

  const results = await query;
  
  // Apply filters in memory and sort
  let filtered = results;
  if (filters?.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Sort by pinned first, then by creation date
  filtered.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }

  // Fetch user names for each post
  const postsWithUsers = await Promise.all(
    filtered.map(async (post) => {
      const user = await getUserProfile(post.userId);
      return {
        ...post,
        userName: user?.name || "Anonymous",
      };
    })
  );

  return postsWithUsers;
}

export async function createCommunityPost(data: {
  userId: number;
  category: string;
  content: string;
  attachments?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [post] = await db.insert(communityPosts).values(data).returning();
  return post;
}

export async function likeCommunityPost(postId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if already liked
  const existing = await db
    .select()
    .from(postLikes)
    .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
    .limit(1);

  if (existing.length > 0) {
    // Unlike
    await db.delete(postLikes).where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));
    
    const post = await db.select().from(communityPosts).where(eq(communityPosts.id, postId)).limit(1);
    if (post.length > 0) {
      await db
        .update(communityPosts)
        .set({ likesCount: Math.max(0, (post[0].likesCount || 0) - 1) })
        .where(eq(communityPosts.id, postId));
    }
    
    return { liked: false };
  } else {
    // Like
    await db.insert(postLikes).values({ postId, userId });
    
    const post = await db.select().from(communityPosts).where(eq(communityPosts.id, postId)).limit(1);
    if (post.length > 0) {
      await db
        .update(communityPosts)
        .set({ likesCount: (post[0].likesCount || 0) + 1 })
        .where(eq(communityPosts.id, postId));
    }
    
    return { liked: true };
  }
}

export async function addCommunityComment(data: {
  postId: number;
  userId: number;
  content: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [comment] = await db.insert(communityComments).values(data).returning();
  
  // Increment comments count
  const post = await db.select().from(communityPosts).where(eq(communityPosts.id, data.postId)).limit(1);
  if (post.length > 0) {
    await db
      .update(communityPosts)
      .set({ commentsCount: (post[0].commentsCount || 0) + 1 })
      .where(eq(communityPosts.id, data.postId));
  }

  return comment;
}

export async function getCommunityComments(postId: number) {
  const db = await getDb();
  if (!db) return [];

  const comments = await db
    .select()
    .from(communityComments)
    .where(eq(communityComments.postId, postId));

  // Fetch user names for each comment
  const commentsWithUsers = await Promise.all(
    comments.map(async (comment) => {
      const user = await getUserProfile(comment.userId);
      return {
        ...comment,
        userName: user?.name || "Anonymous",
      };
    })
  );

  return commentsWithUsers.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export async function hasUserLikedPost(postId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;

  const result = await db
    .select()
    .from(postLikes)
    .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
    .limit(1);
    
  return result.length > 0;
}


// ============================================
// NEWSLETTER MANAGEMENT
// ============================================

export async function subscribeToNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    // Check if email already exists
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    let isNewSubscriber = false;
    let isResubscribe = false;

    if (existing.length > 0) {
      const subscriber = existing[0];
      
      // If previously unsubscribed, reactivate
      if (subscriber.status === "unsubscribed") {
        await db
          .update(newsletterSubscribers)
          .set({
            status: "active",
            subscribedAt: new Date(),
            unsubscribedAt: null,
          })
          .where(eq(newsletterSubscribers.id, subscriber.id));
        
        isResubscribe = true;
      } else {
        // Already subscribed
        return { success: true, message: "You're already subscribed to our newsletter!" };
      }
    } else {
      // Create new subscription
      await db.insert(newsletterSubscribers).values({
        email,
        status: "active",
      });
      isNewSubscriber = true;
    }

    // Send welcome email (non-blocking - don't fail subscription if email fails)
    if (isNewSubscriber || isResubscribe) {
      // Import dynamically to avoid circular dependencies
      import('./emailService').then(async ({ sendWelcomeEmail }) => {
        const emailResult = await sendWelcomeEmail(email);
        if (emailResult.success) {
          console.log(`[Newsletter] Welcome email sent to ${email}`);
        } else {
          console.warn(`[Newsletter] Failed to send welcome email to ${email}:`, emailResult.error);
        }
      }).catch(err => {
        console.error('[Newsletter] Error importing email service:', err);
      });
    }

    const message = isResubscribe 
      ? "Successfully resubscribed to newsletter!" 
      : "Successfully subscribed to newsletter!";
    
    return { success: true, message };
  } catch (error) {
    console.error("[Newsletter] Subscription error:", error);
    throw new Error("Failed to subscribe to newsletter");
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .update(newsletterSubscribers)
    .set({
      status: "unsubscribed",
      unsubscribedAt: new Date(),
    })
    .where(eq(newsletterSubscribers.email, email));

  return result;
}

export async function getNewsletterSubscribers(status?: "active" | "unsubscribed") {
  const db = await getDb();
  if (!db) return [];

  if (status) {
    return await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, status));
  }

  return await db.select().from(newsletterSubscribers);
}

/**
 * Get newsletter subscriber by email or preferences token
 */
export async function getNewsletterSubscriberByEmailOrToken(email?: string, token?: string) {
  const db = await getDb();
  if (!db) return null;

  if (email) {
    const result = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);
    return result[0] || null;
  }

  if (token) {
    const result = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.preferencesToken, token))
      .limit(1);
    return result[0] || null;
  }

  return null;
}

/**
 * Update newsletter preferences
 */
export async function updateNewsletterPreferences(
  email: string | undefined,
  token: string | undefined,
  preferences: {
    prefAiNews: boolean;
    prefCourseUpdates: boolean;
    prefEvents: boolean;
    prefTips: boolean;
  }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const condition = email
    ? eq(newsletterSubscribers.email, email)
    : token
    ? eq(newsletterSubscribers.preferencesToken, token)
    : null;

  if (!condition) throw new Error("Email or token is required");

  await db
    .update(newsletterSubscribers)
    .set({
      prefAiNews: preferences.prefAiNews,
      prefCourseUpdates: preferences.prefCourseUpdates,
      prefEvents: preferences.prefEvents,
      prefTips: preferences.prefTips,
    })
    .where(condition);
}

/**
 * Update preferences token for a subscriber
 */
export async function updateNewsletterPreferencesToken(email: string, token: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(newsletterSubscribers)
    .set({ preferencesToken: token })
    .where(eq(newsletterSubscribers.email, email));
}

/**
 * Generate a preferences token for email-based access
 */
export async function generatePreferencesToken(email: string): Promise<string | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if subscriber exists
  const existing = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, email))
    .limit(1);

  if (existing.length === 0) return null;

  // Generate a random token
  const token = crypto.randomUUID().replace(/-/g, "");

  // Update the subscriber with the new token
  await db
    .update(newsletterSubscribers)
    .set({ preferencesToken: token })
    .where(eq(newsletterSubscribers.email, email));

  return token;
}


// ==================== Blog Functions ====================

/**
 * Get all blog categories
 */
export async function getBlogCategories() {
  const db = await getDb();
  if (!db) return [];
  
  const { blogCategories } = await import("../drizzle/schema");
  return db.select().from(blogCategories).orderBy(blogCategories.name);
}

/**
 * Get all published blog posts with pagination and filtering
 */
export async function getBlogPosts(options: {
  page?: number;
  limit?: number;
  categoryId?: number;
  tag?: string;
  searchQuery?: string;
}) {
  const db = await getDb();
  if (!db) return { posts: [], total: 0 };
  
  const { blogPosts, blogCategories, users } = await import("../drizzle/schema");
  const { eq, and, like, or, desc, sql } = await import("drizzle-orm");
  
  const page = options.page || 1;
  const limit = options.limit || 10;
  const offset = (page - 1) * limit;
  
  // Build where conditions
  const conditions = [eq(blogPosts.isPublished, true)];
  
  if (options.categoryId) {
    conditions.push(eq(blogPosts.categoryId, options.categoryId));
  }
  
  if (options.tag) {
    conditions.push(like(blogPosts.tags, `%${options.tag}%`));
  }
  
  if (options.searchQuery) {
    conditions.push(
      or(
        like(blogPosts.title, `%${options.searchQuery}%`),
        like(blogPosts.excerpt, `%${options.searchQuery}%`)
      )!
    );
  }
  
  const whereClause = conditions.length > 1 ? and(...conditions) : conditions[0];
  
  // Get total count
  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogPosts)
    .where(whereClause);
  
  const total = Number(countResult?.count || 0);
  
  // Get posts with author and category info
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      coverImage: blogPosts.coverImage,
      authorId: blogPosts.authorId,
      authorName: users.name,
      authorAvatar: users.avatar,
      categoryId: blogPosts.categoryId,
      categoryName: blogCategories.name,
      categorySlug: blogCategories.slug,
      tags: blogPosts.tags,
      publishedAt: blogPosts.publishedAt,
      views: blogPosts.views,
      readTime: blogPosts.readTime,
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(whereClause)
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit)
    .offset(offset);
  
  return { posts, total, page, limit };
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  
  const { blogPosts, blogCategories, users } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const [post] = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      content: blogPosts.content,
      coverImage: blogPosts.coverImage,
      authorId: blogPosts.authorId,
      authorName: users.name,
      authorAvatar: users.avatar,
      authorBio: users.bio,
      categoryId: blogPosts.categoryId,
      categoryName: blogCategories.name,
      categorySlug: blogCategories.slug,
      tags: blogPosts.tags,
      publishedAt: blogPosts.publishedAt,
      views: blogPosts.views,
      readTime: blogPosts.readTime,
      createdAt: blogPosts.createdAt,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(eq(blogPosts.slug, slug));
  
  return post || null;
}

/**
 * Increment view count for a blog post
 */
export async function incrementBlogPostViews(postId: number) {
  const db = await getDb();
  if (!db) return;
  
  const { blogPosts } = await import("../drizzle/schema");
  const { eq, sql } = await import("drizzle-orm");
  
  await db
    .update(blogPosts)
    .set({ views: sql`${blogPosts.views} + 1` })
    .where(eq(blogPosts.id, postId));
}

/**
 * Get comments for a blog post
 */
export async function getBlogComments(postId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const { blogComments, users } = await import("../drizzle/schema");
  const { eq, desc } = await import("drizzle-orm");
  
  return db
    .select({
      id: blogComments.id,
      postId: blogComments.postId,
      userId: blogComments.userId,
      userName: users.name,
      userAvatar: users.avatar,
      content: blogComments.content,
      createdAt: blogComments.createdAt,
    })
    .from(blogComments)
    .leftJoin(users, eq(blogComments.userId, users.id))
    .where(eq(blogComments.postId, postId))
    .orderBy(desc(blogComments.createdAt));
}

/**
 * Add a comment to a blog post
 */
export async function addBlogComment(postId: number, userId: number, content: string) {
  const db = await getDb();
  if (!db) return null;
  
  const { blogComments } = await import("../drizzle/schema");
  
  const [result] = await db.insert(blogComments).values({
    postId,
    userId,
    content,
  });
  
  return result.insertId;
}

/**
 * Get related blog posts (same category, excluding current post)
 */
export async function getRelatedBlogPosts(postId: number, categoryId: number, limit: number = 3) {
  const db = await getDb();
  if (!db) return [];
  
  const { blogPosts, users } = await import("../drizzle/schema");
  const { eq, and, ne, desc } = await import("drizzle-orm");
  
  return db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      coverImage: blogPosts.coverImage,
      authorName: users.name,
      publishedAt: blogPosts.publishedAt,
      readTime: blogPosts.readTime,
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .where(
      and(
        eq(blogPosts.categoryId, categoryId),
        ne(blogPosts.id, postId),
        eq(blogPosts.isPublished, true)
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit);
}
