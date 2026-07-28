import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, index, json, uniqueIndex } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  domain: mysqlEnum("domain", ["business", "education", "faith", "creator"]),
  timeCommitment: varchar("timeCommitment", { length: 20 }),
  interest: varchar("interest", { length: 50 }),
  totalXP: int("totalXP").default(0).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastActivityDate: timestamp("lastActivityDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Instructors table
 */
export const instructors = mysqlTable("instructors", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  bio: text("bio"),
  expertise: text("expertise"),
  credentials: text("credentials"),
  avatar: text("avatar"),
  rating: int("rating").default(0),
  totalStudents: int("totalStudents").default(0).notNull(),
  totalCourses: int("totalCourses").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Instructor = typeof instructors.$inferSelect;
export type InsertInstructor = typeof instructors.$inferInsert;

/**
 * Courses table
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["business", "education", "faith", "creator", "general"]).notNull(),
  level: mysqlEnum("level", ["beginner", "intermediate", "advanced"]).notNull(),
  thumbnail: text("thumbnail"),
  instructorId: int("instructorId").notNull(),
  price: int("price").default(0).notNull(),
  isPremium: boolean("isPremium").default(false).notNull(),
  totalModules: int("totalModules").default(0).notNull(),
  estimatedHours: int("estimatedHours").default(0).notNull(),
  rating: int("rating").default(0),
  enrollmentCount: int("enrollmentCount").default(0).notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Course reviews
 */
export const courseReviews = mysqlTable("course_reviews", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  userId: int("userId").notNull(),
  rating: int("rating").notNull(),
  comment: text("comment"),
  isVerifiedPurchase: boolean("isVerifiedPurchase").default(false).notNull(),
  helpfulCount: int("helpfulCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CourseReview = typeof courseReviews.$inferSelect;
export type InsertCourseReview = typeof courseReviews.$inferInsert;

/**
 * Course modules
 */
export const courseModules = mysqlTable("course_modules", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  orderIndex: int("orderIndex").notNull(),
  videoUrl: text("videoUrl"),
  duration: int("duration").default(0).notNull(),
  content: text("content"),
  isLocked: boolean("isLocked").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CourseModule = typeof courseModules.$inferSelect;
export type InsertCourseModule = typeof courseModules.$inferInsert;

/**
 * User course enrollments
 */
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  progress: int("progress").default(0).notNull(),
  completedModules: int("completedModules").default(0).notNull(),
  lastAccessedAt: timestamp("lastAccessedAt"),
  completedAt: timestamp("completedAt"),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

/**
 * User progress tracking
 */
export const userProgress = mysqlTable("user_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  courseId: int("courseId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  xpEarned: int("xpEarned").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * User achievements and badges
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  xpAwarded: int("xpAwarded").default(0).notNull(),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

/**
 * Automation templates
 */
export const templates = mysqlTable("templates", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["business", "education", "faith", "creator", "general"]).notNull(),
  thumbnail: text("thumbnail"),
  price: int("price").default(0).notNull(),
  isFree: boolean("isFree").default(true).notNull(),
  rating: int("rating").default(0),
  usageCount: int("usageCount").default(0).notNull(),
  integrations: text("integrations"),
  setupSteps: text("setupSteps"),
  createdBy: int("createdBy").notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Template = typeof templates.$inferSelect;
export type InsertTemplate = typeof templates.$inferInsert;

/**
 * Template deployments
 */
export const templateDeployments = mysqlTable("template_deployments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  templateId: int("templateId").notNull(),
  status: mysqlEnum("status", ["active", "paused", "stopped"]).default("active").notNull(),
  configuration: text("configuration"),
  deployedAt: timestamp("deployedAt").defaultNow().notNull(),
  lastUsedAt: timestamp("lastUsedAt"),
});

export type TemplateDeployment = typeof templateDeployments.$inferSelect;
export type InsertTemplateDeployment = typeof templateDeployments.$inferInsert;

/**
 * Blog categories
 */
export const blogCategories = mysqlTable("blog_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlogCategory = typeof blogCategories.$inferSelect;
export type InsertBlogCategory = typeof blogCategories.$inferInsert;

/**
 * Blog posts
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: text("coverImage"),
  authorId: int("authorId").notNull(),
  categoryId: int("categoryId").notNull(),
  tags: text("tags"),
  publishedAt: timestamp("publishedAt"),
  views: int("views").default(0).notNull(),
  readTime: int("readTime").default(5).notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Blog comments
 */
export const blogComments = mysqlTable("blog_comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogComment = typeof blogComments.$inferSelect;
export type InsertBlogComment = typeof blogComments.$inferInsert;

/**
 * Marketplace products (DEPRECATED - Replaced by Blog)
 */
/* export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["tool", "template", "course", "certification", "ebook", "plugin"]).notNull(),
  thumbnail: text("thumbnail"),
  price: int("price").notNull(),
  stripePriceId: varchar("stripePriceId", { length: 255 }),
  stripeProductId: varchar("stripeProductId", { length: 255 }),
  type: mysqlEnum("type", ["digital", "service", "subscription"]).notNull(),
  downloadUrl: text("downloadUrl"),
  rating: int("rating").default(0),
  salesCount: int("salesCount").default(0).notNull(),
  sellerId: int("sellerId").notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert; */

/**
 * Orders (DEPRECATED - Replaced by Blog)
 */
/* export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  totalAmount: int("totalAmount").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  items: text("items"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert; */

/**
 * Notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["achievement", "event", "reply", "challenge", "system"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  link: text("link"),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Community posts
 */
export const communityPosts = mysqlTable("community_posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  category: mysqlEnum("category", ["business", "education", "faith", "creator", "general"]).notNull(),
  content: text("content").notNull(),
  attachments: text("attachments"),
  tags: text("tags"),
  isPinned: boolean("isPinned").default(false).notNull(),
  likeCount: int("likeCount").default(0).notNull(),
  commentCount: int("commentCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = typeof communityPosts.$inferInsert;

/**
 * Community comments
 */
export const communityComments = mysqlTable("community_comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CommunityComment = typeof communityComments.$inferSelect;
export type InsertCommunityComment = typeof communityComments.$inferInsert;

/**
 * Post likes
 */
export const postLikes = mysqlTable("post_likes", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PostLike = typeof postLikes.$inferSelect;
export type InsertPostLike = typeof postLikes.$inferInsert;

/**
 * Live events
 */
export const liveEvents = mysqlTable("live_events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["business", "education", "faith", "creator", "general"]).notNull(),
  eventDate: timestamp("eventDate").notNull(),
  duration: int("duration").default(60).notNull(),
  meetingLink: text("meetingLink"),
  thumbnail: text("thumbnail"),
  hostId: int("hostId").notNull(),
  attendeeCount: int("attendeeCount").default(0).notNull(),
  maxAttendees: int("maxAttendees"),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LiveEvent = typeof liveEvents.$inferSelect;
export type InsertLiveEvent = typeof liveEvents.$inferInsert;

/**
 * Event RSVPs
 */
export const eventRsvps = mysqlTable("event_rsvps", {
  id: int("id").autoincrement().primaryKey(),
  eventId: int("eventId").notNull(),
  userId: int("userId").notNull(),
  status: mysqlEnum("status", ["going", "interested", "not_going"]).default("going").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EventRsvp = typeof eventRsvps.$inferSelect;
export type InsertEventRsvp = typeof eventRsvps.$inferInsert;

/**
 * Consultation bookings
 */
export const consultations = mysqlTable("consultations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  consultantId: int("consultantId").notNull(),
  serviceType: varchar("serviceType", { length: 100 }).notNull(),
  scheduledDate: timestamp("scheduledDate").notNull(),
  duration: int("duration").default(60).notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  meetingLink: text("meetingLink"),
  notes: text("notes"),
  amount: int("amount"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Consultation = typeof consultations.$inferSelect;
export type InsertConsultation = typeof consultations.$inferInsert;

/**
 * Certificates
 */
export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  certificateId: varchar("certificateId", { length: 100 }).notNull().unique(),
  studentName: varchar("studentName", { length: 255 }).notNull(),
  courseName: varchar("courseName", { length: 255 }).notNull(),
  instructorName: varchar("instructorName", { length: 255 }),
  completionDate: timestamp("completionDate").notNull(),
  pdfUrl: text("pdfUrl"),
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = typeof certificates.$inferInsert;

/**
 * Newsletter subscribers
 */
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  status: mysqlEnum("status", ["active", "unsubscribed"]).default("active").notNull(),
  // Content category preferences
  prefAiNews: boolean("prefAiNews").default(true).notNull(),
  prefCourseUpdates: boolean("prefCourseUpdates").default(true).notNull(),
  prefEvents: boolean("prefEvents").default(true).notNull(),
  prefTips: boolean("prefTips").default(true).notNull(),
  // Preference management token for email-based access
  preferencesToken: varchar("preferencesToken", { length: 64 }),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;


/**
 * Email Events - for tracking email analytics (opens, clicks, bounces, etc.)
 */
export const emailEvents = mysqlTable("email_events", {
  id: int("id").autoincrement().primaryKey(),
  messageId: varchar("messageId", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  eventType: mysqlEnum("eventType", [
    "processed",
    "dropped",
    "delivered",
    "deferred",
    "bounce",
    "open",
    "click",
    "spamreport",
    "unsubscribe",
    "group_unsubscribe",
    "group_resubscribe"
  ]).notNull(),
  templateType: varchar("templateType", { length: 50 }), // welcome, preference_confirmation, password_reset, event_registration
  url: text("url"), // For click events
  userAgent: text("userAgent"),
  ip: varchar("ip", { length: 45 }),
  reason: text("reason"), // For bounce/drop events
  timestamp: timestamp("timestamp").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailEvent = typeof emailEvents.$inferSelect;
export type InsertEmailEvent = typeof emailEvents.$inferInsert;


// Email Campaigns
export const emailCampaigns = mysqlTable("email_campaigns", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  templateType: varchar("templateType", { length: 50 }).notNull(), // newsletter, announcement, promotion, event_invite, custom
  htmlContent: text("htmlContent").notNull(),
  textContent: text("textContent"),
  recipientFilter: varchar("recipientFilter", { length: 50 }).notNull(), // all, ai_news, course_updates, events, tips
  status: varchar("status", { length: 20 }).notNull().default("draft"), // draft, scheduled, sending, sent, cancelled, failed
  scheduledAt: timestamp("scheduledAt"),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  totalRecipients: int("totalRecipients").default(0).notNull(),
  sentCount: int("sentCount").default(0).notNull(),
  failedCount: int("failedCount").default(0).notNull(),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type InsertEmailCampaign = typeof emailCampaigns.$inferInsert;

// Campaign Recipients
export const campaignRecipients = mysqlTable("campaign_recipients", {
  id: int("id").primaryKey().autoincrement(),
  campaignId: int("campaignId").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, sent, failed, bounced
  messageId: varchar("messageId", { length: 255 }),
  sentAt: timestamp("sentAt"),
  error: text("error"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CampaignRecipient = typeof campaignRecipients.$inferSelect;
export type InsertCampaignRecipient = typeof campaignRecipients.$inferInsert;


// Reusable webinar catalogue
export const webinars = mysqlTable("webinars", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 500 }),
  description: text("description"),
  format: varchar("format", { length: 100 }).notNull().default("Free live online webinar"),
  speakerName: varchar("speakerName", { length: 255 }),
  speakerTitle: varchar("speakerTitle", { length: 255 }),
  speakerBiography: text("speakerBiography"),
  speakerImageUrl: text("speakerImageUrl"),
  eventStartAt: timestamp("eventStartAt"),
  eventEndAt: timestamp("eventEndAt"),
  registrationOpensAt: timestamp("registrationOpensAt"),
  registrationClosesAt: timestamp("registrationClosesAt"),
  timezone: varchar("timezone", { length: 100 }).notNull().default("Europe/London"),
  meetingProvider: varchar("meetingProvider", { length: 100 }),
  meetingUrl: text("meetingUrl"),
  meetingId: varchar("meetingId", { length: 255 }),
  meetingPassword: varchar("meetingPassword", { length: 255 }),
  maximumAttendees: int("maximumAttendees"),
  status: mysqlEnum("status", ["draft", "published", "registration_closed", "live", "completed", "cancelled"]).default("draft").notNull(),
  recordingAvailable: boolean("recordingAvailable").default(false).notNull(),
  recordingUrl: text("recordingUrl"),
  masterclassUrl: text("masterclassUrl"),
  confirmationEmailEnabled: boolean("confirmationEmailEnabled").default(true).notNull(),
  twoDayReminderEnabled: boolean("twoDayReminderEnabled").default(true).notNull(),
  oneHourReminderEnabled: boolean("oneHourReminderEnabled").default(true).notNull(),
  followUpEnabled: boolean("followUpEnabled").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  slugUnique: uniqueIndex("webinars_slug_unique").on(table.slug),
  statusStartIdx: index("webinars_status_start_idx").on(table.status, table.eventStartAt),
}));

// Webinar registrations. Legacy display fields remain nullable for safe migration
// of registrations created by the previous single-event implementation.
export const webinarRegistrations = mysqlTable("webinar_registrations", {
  id: int("id").primaryKey().autoincrement(),
  webinarId: int("webinarId").references(() => webinars.id, { onDelete: "cascade" }),
  firstName: varchar("firstName", { length: 100 }),
  lastName: varchar("lastName", { length: 100 }),
  email: varchar("email", { length: 320 }).notNull(),
  emailNormalised: varchar("emailNormalised", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  organisation: varchar("organisation", { length: 255 }),
  role: varchar("role", { length: 255 }),
  automationGoal: text("automationGoal"),
  eventConsent: boolean("eventConsent").default(false).notNull(),
  eventConsentAt: timestamp("eventConsentAt"),
  marketingConsent: boolean("marketingConsent").default(false).notNull(),
  marketingConsentAt: timestamp("marketingConsentAt"),
  registrationStatus: mysqlEnum("registrationStatus", ["registered", "waitlisted", "cancelled", "attended", "no_show"]).default("registered").notNull(),
  utmSource: varchar("utmSource", { length: 255 }),
  utmMedium: varchar("utmMedium", { length: 255 }),
  utmCampaign: varchar("utmCampaign", { length: 255 }),
  utmContent: varchar("utmContent", { length: 255 }),
  utmTerm: varchar("utmTerm", { length: 255 }),
  referrerUrl: text("referrerUrl"),
  landingPage: text("landingPage"),
  userAgent: varchar("userAgent", { length: 500 }),
  ipHash: varchar("ipHash", { length: 64 }),
  unsubscribeToken: varchar("unsubscribeToken", { length: 128 }),
  confirmationToken: varchar("confirmationToken", { length: 128 }),
  // Legacy columns retained during the backwards-compatible migration.
  name: varchar("name", { length: 255 }),
  company: varchar("company", { length: 255 }),
  webinarTitle: varchar("webinarTitle", { length: 500 }),
  webinarDate: varchar("webinarDate", { length: 100 }),
  confirmationSent: boolean("confirmationSent").default(false).notNull(),
  attended: boolean("attended").default(false).notNull(),
  reminderSent: boolean("reminderSent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  webinarEmailUnique: uniqueIndex("webinar_registration_email_unique").on(table.webinarId, table.emailNormalised),
  webinarStatusIdx: index("webinar_registration_status_idx").on(table.webinarId, table.registrationStatus),
  createdAtIdx: index("webinar_registration_created_idx").on(table.createdAt),
  unsubscribeTokenUnique: uniqueIndex("webinar_registration_unsubscribe_unique").on(table.unsubscribeToken),
  confirmationTokenUnique: uniqueIndex("webinar_registration_confirmation_unique").on(table.confirmationToken),
}));

export type WebinarRegistration = typeof webinarRegistrations.$inferSelect;
export type InsertWebinarRegistration = typeof webinarRegistrations.$inferInsert;

export const webinarEmailQueue = mysqlTable("webinar_email_queue", {
  id: int("id").primaryKey().autoincrement(),
  webinarId: int("webinarId").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  registrationId: int("registrationId").notNull().references(() => webinarRegistrations.id, { onDelete: "cascade" }),
  emailType: mysqlEnum("emailType", ["confirmation", "reminder_2_days", "reminder_1_hour", "webinar_live", "follow_up_attended", "follow_up_no_show"]).notNull(),
  scheduledFor: timestamp("scheduledFor").notNull(),
  status: mysqlEnum("status", ["pending", "processing", "sent", "delivered", "failed", "cancelled"]).default("pending").notNull(),
  attemptCount: int("attemptCount").default(0).notNull(),
  provider: varchar("provider", { length: 50 }).default("sendgrid"),
  providerMessageId: varchar("providerMessageId", { length: 255 }),
  lastError: text("lastError"),
  processingStartedAt: timestamp("processingStartedAt"),
  sentAt: timestamp("sentAt"),
  deliveredAt: timestamp("deliveredAt"),
  failedAt: timestamp("failedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  registrationTypeUnique: uniqueIndex("webinar_email_registration_type_unique").on(table.registrationId, table.emailType),
  dueQueueIdx: index("webinar_email_due_idx").on(table.status, table.scheduledFor),
  webinarIdx: index("webinar_email_webinar_idx").on(table.webinarId),
  registrationIdx: index("webinar_email_registration_idx").on(table.registrationId),
  typeIdx: index("webinar_email_type_idx").on(table.emailType),
}));

export const webinarEmailEvents = mysqlTable("webinar_email_events", {
  id: int("id").primaryKey().autoincrement(),
  emailQueueId: int("emailQueueId").references(() => webinarEmailQueue.id, { onDelete: "set null" }),
  registrationId: int("registrationId").notNull().references(() => webinarRegistrations.id, { onDelete: "cascade" }),
  webinarId: int("webinarId").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  eventType: mysqlEnum("eventType", ["queued", "processing", "sent", "delivered", "opened", "clicked", "bounced", "complained", "failed", "unsubscribed"]).notNull(),
  providerEventId: varchar("providerEventId", { length: 255 }),
  eventData: json("eventData"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => ({
  queueIdx: index("webinar_event_queue_idx").on(table.emailQueueId),
  registrationIdx: index("webinar_event_registration_idx").on(table.registrationId),
  webinarIdx: index("webinar_event_webinar_idx").on(table.webinarId),
  providerEventUnique: uniqueIndex("webinar_event_provider_unique").on(table.providerEventId),
}));

export type Webinar = typeof webinars.$inferSelect;
export type InsertWebinar = typeof webinars.$inferInsert;
export type WebinarEmailQueueItem = typeof webinarEmailQueue.$inferSelect;
export type WebinarEmailEvent = typeof webinarEmailEvents.$inferSelect;
