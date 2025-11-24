import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  courses, 
  courseModules, 
  enrollments, 
  userProgress, 
  achievements, 
  notifications 
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
