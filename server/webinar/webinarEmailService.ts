import sgMail from "@sendgrid/mail";
import { and, asc, eq, lte } from "drizzle-orm";
import {
  webinarEmailEvents,
  webinarEmailQueue,
  webinarRegistrations,
  webinars,
} from "../../drizzle/schema";
import { formatWebinarDate } from "../../shared/webinar";
import { getDb } from "../db";

const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) sgMail.setApiKey(apiKey);

type EmailType = typeof webinarEmailQueue.$inferSelect.emailType;

function emailCopy(
  type: EmailType,
  firstName: string,
  webinar: typeof webinars.$inferSelect,
) {
  const date = formatWebinarDate(webinar.eventStartAt, webinar.timezone);
  const supportEmail =
    process.env.WEBINAR_SUPPORT_EMAIL ?? process.env.EMAIL_REPLY_TO ?? "hello@upskillintech.com";
  const joinUrl = webinar.meetingUrl;
  const joinButton = joinUrl
    ? `<p style="margin:28px 0"><a href="${joinUrl}" style="background:#0d9488;color:#fff;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:700">Join the webinar</a></p>`
    : "<p>Your secure joining link will be sent before the session.</p>";
  const copies: Record<EmailType, { subject: string; heading: string; body: string }> = {
    confirmation: {
      subject: "You’re registered: Build Your First AI Employee",
      heading: "Your free seat is reserved",
      body: `<p>Thanks for registering. We’ll show you how to identify a repetitive task, design an AI employee workflow and connect it to practical business tools.</p><p><strong>${date}</strong></p><p>Bring one repetitive task you would love to automate and join from a laptop where possible.</p>`,
    },
    reminder_2_days: {
      subject: "Two days to go: Your AI Employee webinar",
      heading: "Your practical AI session is nearly here",
      body: `<p>In two days, you’ll learn what AI employees are, how to select an automation opportunity and how a real workflow connects forms, data and email.</p><p><strong>${date}</strong></p>${joinButton}`,
    },
    reminder_1_hour: {
      subject: "We start in one hour—join the AI Employee webinar",
      heading: "We start in one hour",
      body: `<p><strong>${date}</strong></p>${joinButton}<p>Join five minutes early, use a laptop if possible and bring one automation idea.</p>`,
    },
    webinar_live: {
      subject: "We’re live: Join the AI Employee webinar",
      heading: "The webinar is live",
      body: `${joinButton}<p>Join us now for the practical demonstration.</p>`,
    },
    follow_up_attended: {
      subject: "Your AI Employee webinar resources and next steps",
      heading: "Thank you for joining us",
      body: `<p>Thank you for taking part. Your next step is to turn one workflow into a reliable AI-powered system.</p>${webinar.recordingAvailable && webinar.recordingUrl ? `<p><a href="${webinar.recordingUrl}">Watch the recording</a></p>` : ""}<p><a href="${webinar.masterclassUrl ?? "/masterclass"}">Explore the UpskillinTech Masterclass</a></p>`,
    },
    follow_up_no_show: {
      subject: "Sorry we missed you—here is your webinar recap",
      heading: "Sorry we missed you",
      body: `<p>The session covered practical workflow design, AI employee guardrails and ways to connect AI to everyday business tools.</p>${webinar.recordingAvailable && webinar.recordingUrl ? `<p><a href="${webinar.recordingUrl}">Watch the recording</a></p>` : ""}<p><a href="${webinar.masterclassUrl ?? "/masterclass"}">Explore the UpskillinTech Masterclass</a></p>`,
    },
  };
  const copy = copies[type];
  const text = `${copy.heading}\n\nHi ${firstName},\n\n${copy.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}\n\nQuestions? ${supportEmail}`;
  const html = `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#172033"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="600" style="max-width:100%;background:#fff;border-radius:14px;overflow:hidden"><tr><td style="background:#082f49;padding:28px;color:#fff"><strong style="color:#5eead4;font-size:24px">UpskillinTech</strong></td></tr><tr><td style="padding:32px"><h1 style="font-size:26px;margin-top:0">${copy.heading}</h1><p>Hi ${firstName},</p>${copy.body}<p style="margin-top:32px;color:#64748b">Questions? Email <a href="mailto:${supportEmail}">${supportEmail}</a>.</p></td></tr></table></td></tr></table></body></html>`;
  return { ...copy, text, html };
}

async function sendQueueItem(item: typeof webinarEmailQueue.$inferSelect) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [record] = await db
    .select({ registration: webinarRegistrations, webinar: webinars })
    .from(webinarRegistrations)
    .innerJoin(webinars, eq(webinarRegistrations.webinarId, webinars.id))
    .where(eq(webinarRegistrations.id, item.registrationId))
    .limit(1);
  if (!record || record.registration.registrationStatus === "cancelled") {
    await db.update(webinarEmailQueue).set({ status: "cancelled" }).where(eq(webinarEmailQueue.id, item.id));
    return "cancelled" as const;
  }
  if (!apiKey) throw new Error("SendGrid is not configured");
  const content = emailCopy(
    item.emailType,
    record.registration.firstName ?? record.registration.name ?? "there",
    record.webinar,
  );
  const [response] = await sgMail.send({
    to: record.registration.email,
    from: {
      email: process.env.EMAIL_FROM_ADDRESS ?? process.env.SENDGRID_SENDER_EMAIL ?? "noreply@upskillintech.com",
      name: process.env.EMAIL_FROM_NAME ?? "UpskillinTech",
    },
    replyTo: process.env.EMAIL_REPLY_TO,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
  return response.headers["x-message-id"]?.toString() ?? null;
}

export async function processWebinarEmailQueue(batchSize = 25) {
  const db = await getDb();
  if (!db) return { processed: 0, sent: 0, failed: 0, skipped: 0 };
  const due = await db
    .select()
    .from(webinarEmailQueue)
    .where(
      and(
        eq(webinarEmailQueue.status, "pending"),
        lte(webinarEmailQueue.scheduledFor, new Date()),
      ),
    )
    .orderBy(asc(webinarEmailQueue.scheduledFor))
    .limit(Math.min(Math.max(batchSize, 1), 50));
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const item of due) {
    const claimedAt = new Date();
    const claim = await db
      .update(webinarEmailQueue)
      .set({
        status: "processing",
        processingStartedAt: claimedAt,
        attemptCount: item.attemptCount + 1,
      })
      .where(
        and(
          eq(webinarEmailQueue.id, item.id),
          eq(webinarEmailQueue.status, "pending"),
        ),
      );
    const affectedRows = Number(
      (claim as unknown as [{ affectedRows: number }])[0]?.affectedRows ?? 0,
    );
    if (!affectedRows) {
      skipped += 1;
      continue;
    }
    await db.insert(webinarEmailEvents).values({
      emailQueueId: item.id,
      registrationId: item.registrationId,
      webinarId: item.webinarId,
      eventType: "processing",
    });
    try {
      const messageId = await sendQueueItem(item);
      if (messageId === "cancelled") {
        skipped += 1;
        continue;
      }
      await db.update(webinarEmailQueue).set({
        status: "sent",
        sentAt: new Date(),
        providerMessageId: messageId,
        lastError: null,
      }).where(eq(webinarEmailQueue.id, item.id));
      await db.insert(webinarEmailEvents).values({
        emailQueueId: item.id,
        registrationId: item.registrationId,
        webinarId: item.webinarId,
        eventType: "sent",
        providerEventId: messageId,
      });
      if (item.emailType === "confirmation") {
        await db.update(webinarRegistrations).set({ confirmationSent: true }).where(eq(webinarRegistrations.id, item.registrationId));
      }
      sent += 1;
    } catch (error) {
      const attempts = item.attemptCount + 1;
      const lastError = error instanceof Error ? error.message.slice(0, 1000) : "Email delivery failed";
      await db.update(webinarEmailQueue).set({
        status: attempts >= 3 ? "failed" : "pending",
        scheduledFor: attempts >= 3
          ? item.scheduledFor
          : new Date(Date.now() + attempts * 10 * 60 * 1000),
        failedAt: attempts >= 3 ? new Date() : null,
        lastError,
      }).where(eq(webinarEmailQueue.id, item.id));
      await db.insert(webinarEmailEvents).values({
        emailQueueId: item.id,
        registrationId: item.registrationId,
        webinarId: item.webinarId,
        eventType: "failed",
        eventData: { attempt: attempts, willRetry: attempts < 3 },
      });
      failed += 1;
    }
  }
  return { processed: due.length, sent, failed, skipped };
}

