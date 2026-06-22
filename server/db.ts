import { and, desc, eq, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, emailEvents, newsletterSubscribers, users, webinarRegistrations } from "../drizzle/schema";
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

export async function createWebinarRegistration(data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  role?: string | null;
  webinarTitle: string;
  webinarDate: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(webinarRegistrations).values({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    company: data.company ?? null,
    role: data.role ?? null,
    webinarTitle: data.webinarTitle,
    webinarDate: data.webinarDate,
  });
}

export async function getAllWebinarRegistrations() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(webinarRegistrations)
    .orderBy(desc(webinarRegistrations.createdAt));
}

export async function markWebinarReminderSent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(webinarRegistrations)
    .set({ reminderSent: true })
    .where(eq(webinarRegistrations.id, id));
}

export async function markConfirmationSent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(webinarRegistrations)
    .set({ confirmationSent: true })
    .where(eq(webinarRegistrations.id, id));
}

export async function registerWebinar(data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  role?: string | null;
  webinarTitle: string;
  webinarDate: string;
}): Promise<{ id: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(webinarRegistrations).values({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    company: data.company ?? null,
    role: data.role ?? null,
    webinarTitle: data.webinarTitle,
    webinarDate: data.webinarDate,
  });
  return { id: (result as any).insertId ?? 0 };
}

export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) return { success: false, message: "Database not available" };

  const [existing] = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, email))
    .limit(1);

  if (existing) {
    if (existing.status === "unsubscribed") {
      await db
        .update(newsletterSubscribers)
        .set({ status: "active", unsubscribedAt: null, subscribedAt: new Date() })
        .where(eq(newsletterSubscribers.email, email));
      return { success: true, message: "Successfully resubscribed" };
    }
    return { success: true, message: "Email already subscribed" };
  }

  await db.insert(newsletterSubscribers).values({ email });
  return { success: true, message: "Successfully subscribed" };
}

export async function unsubscribeFromNewsletter(
  email: string
): Promise<{ success: boolean }> {
  const db = await getDb();
  if (!db) return { success: false };
  await db
    .update(newsletterSubscribers)
    .set({ status: "unsubscribed", unsubscribedAt: new Date() })
    .where(eq(newsletterSubscribers.email, email));
  return { success: true };
}

export async function getNewsletterSubscribers(status?: string) {
  const db = await getDb();
  if (!db) return [];
  if (status) {
    return db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, status as "active" | "unsubscribed"));
  }
  return db.select().from(newsletterSubscribers);
}

export async function getEmailAnalyticsSummary(days: number) {
  const db = await getDb();
  const zero = { totalSent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0, spamReports: 0, openRate: 0, clickRate: 0, bounceRate: 0 };
  if (!db) return zero;

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const events = await db
    .select()
    .from(emailEvents)
    .where(gte(emailEvents.timestamp, since));

  const counts = {
    processed: 0, delivered: 0, open: 0, click: 0, bounce: 0,
    unsubscribe: 0, spamreport: 0,
  } as Record<string, number>;

  for (const e of events) {
    counts[e.eventType] = (counts[e.eventType] ?? 0) + 1;
  }

  const totalSent = counts.processed ?? 0;
  const delivered = counts.delivered ?? 0;
  const opened = counts.open ?? 0;
  const clicked = counts.click ?? 0;
  const bounced = counts.bounce ?? 0;
  const unsubscribed = counts.unsubscribe ?? 0;
  const spamReports = counts.spamreport ?? 0;

  const openRate = delivered > 0 ? Math.round((opened / delivered) * 100) : 0;
  const clickRate = delivered > 0 ? Math.round((clicked / delivered) * 100) : 0;
  const bounceRate = totalSent > 0 ? Math.round((bounced / totalSent) * 100) : 0;

  return { totalSent, delivered, opened, clicked, bounced, unsubscribed, spamReports, openRate, clickRate, bounceRate };
}

export async function getEmailEventsByDate(days: number) {
  const db = await getDb();
  if (!db) return [];

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const events = await db
    .select()
    .from(emailEvents)
    .where(gte(emailEvents.timestamp, since))
    .orderBy(desc(emailEvents.timestamp));

  const byDate = new Map<string, { date: string; delivered: number; opened: number; clicked: number; bounced: number }>();
  for (const e of events) {
    const date = e.timestamp.toISOString().slice(0, 10);
    if (!byDate.has(date)) byDate.set(date, { date, delivered: 0, opened: 0, clicked: 0, bounced: 0 });
    const entry = byDate.get(date)!;
    if (e.eventType === "delivered") entry.delivered++;
    else if (e.eventType === "open") entry.opened++;
    else if (e.eventType === "click") entry.clicked++;
    else if (e.eventType === "bounce") entry.bounced++;
  }

  return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export async function getEmailEventsByTemplate(days: number) {
  const db = await getDb();
  if (!db) return [];

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const events = await db
    .select()
    .from(emailEvents)
    .where(and(gte(emailEvents.timestamp, since)));

  const byTemplate = new Map<string, number>();
  for (const e of events) {
    const key = e.templateType ?? "unknown";
    byTemplate.set(key, (byTemplate.get(key) ?? 0) + 1);
  }

  return Array.from(byTemplate.entries()).map(([templateType, count]) => ({ templateType, count }));
}

export async function getRecentEmailEvents(limit: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      id: emailEvents.id,
      email: emailEvents.email,
      eventType: emailEvents.eventType,
      templateType: emailEvents.templateType,
      timestamp: emailEvents.timestamp,
    })
    .from(emailEvents)
    .orderBy(desc(emailEvents.timestamp))
    .limit(limit);
}
