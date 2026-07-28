import { and, asc, eq, lte } from "drizzle-orm";
import {
  webinarEmailEvents,
  webinarEmailQueue,
  webinarRegistrations,
  webinars,
} from "../../drizzle/schema";
import { formatWebinarDate } from "../../shared/webinar";
import { getDb } from "../db";
import {
  getPostgresClient,
  usesPostgresWebinarStore,
} from "./postgresWebinarStore";

const brevoApiKey = process.env.BREVO_API_KEY;
let brevoSenderEmailPromise: Promise<string> | undefined;

type EmailType = typeof webinarEmailQueue.$inferSelect.emailType;
type WebinarEmailRecord = Pick<
  typeof webinars.$inferSelect,
  | "eventStartAt"
  | "timezone"
  | "meetingUrl"
  | "recordingAvailable"
  | "recordingUrl"
  | "masterclassUrl"
>;

function emailCopy(
  type: EmailType,
  firstName: string,
  webinar: WebinarEmailRecord
) {
  const date = formatWebinarDate(webinar.eventStartAt, webinar.timezone);
  const supportEmail =
    process.env.WEBINAR_SUPPORT_EMAIL ??
    process.env.EMAIL_REPLY_TO ??
    "hello@upskillintech.com";
  const joinUrl = webinar.meetingUrl;
  const joinButton = joinUrl
    ? `<p style="margin:28px 0"><a href="${joinUrl}" style="background:#0d9488;color:#fff;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:700">Join the webinar</a></p>`
    : "<p>Your secure joining link will be sent before the session.</p>";
  const copies: Record<
    EmailType,
    { subject: string; heading: string; body: string }
  > = {
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
  const text = `${copy.heading}\n\nHi ${firstName},\n\n${copy.body
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()}\n\nQuestions? ${supportEmail}`;
  const html = `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#172033"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="600" style="max-width:100%;background:#fff;border-radius:14px;overflow:hidden"><tr><td style="background:#082f49;padding:28px;color:#fff"><strong style="color:#5eead4;font-size:24px">UpskillinTech</strong></td></tr><tr><td style="padding:32px"><h1 style="font-size:26px;margin-top:0">${copy.heading}</h1><p>Hi ${firstName},</p>${copy.body}<p style="margin-top:32px;color:#64748b">Questions? Email <a href="mailto:${supportEmail}">${supportEmail}</a>.</p></td></tr></table></td></tr></table></body></html>`;
  return { ...copy, text, html };
}

async function sendBrevoEmail(input: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  if (!brevoApiKey) throw new Error("Brevo is not configured");
  const senderEmail = await getBrevoSenderEmail();
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        email: senderEmail,
        name: process.env.EMAIL_FROM_NAME ?? "UpskillinTech",
      },
      replyTo: process.env.EMAIL_REPLY_TO
        ? { email: process.env.EMAIL_REPLY_TO }
        : undefined,
      to: [{ email: input.to }],
      subject: input.subject,
      textContent: input.text,
      htmlContent: input.html,
    }),
  });
  const body = (await response.json().catch(() => ({}))) as {
    messageId?: string;
    message?: string;
  };
  if (!response.ok) {
    throw new Error(
      body.message || `Brevo delivery failed (${response.status})`
    );
  }
  return body.messageId ?? null;
}

async function getBrevoSenderEmail() {
  const configured =
    process.env.EMAIL_FROM_ADDRESS ?? process.env.BREVO_SENDER_EMAIL;
  if (configured) return configured;
  if (!brevoApiKey) throw new Error("Brevo is not configured");

  brevoSenderEmailPromise ??= fetch("https://api.brevo.com/v3/senders", {
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
    },
  }).then(async response => {
    const body = (await response.json().catch(() => ({}))) as {
      senders?: Array<{ email?: string; active?: boolean }>;
      message?: string;
    };
    if (!response.ok) {
      throw new Error(
        body.message || `Brevo sender lookup failed (${response.status})`
      );
    }
    const sender = body.senders?.find(
      candidate => candidate.active && candidate.email
    );
    if (!sender?.email) {
      throw new Error(
        "Brevo has no active sender. Configure BREVO_SENDER_EMAIL or verify a sender in Brevo."
      );
    }
    return sender.email;
  });

  return brevoSenderEmailPromise;
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
    await db
      .update(webinarEmailQueue)
      .set({ status: "cancelled" })
      .where(eq(webinarEmailQueue.id, item.id));
    return "cancelled" as const;
  }
  const content = emailCopy(
    item.emailType,
    record.registration.firstName ?? record.registration.name ?? "there",
    record.webinar
  );
  return sendBrevoEmail({
    to: record.registration.email,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
}

export async function processWebinarEmailQueue(batchSize = 25) {
  if (usesPostgresWebinarStore()) {
    return processPostgresWebinarEmailQueue(batchSize);
  }
  const db = await getDb();
  if (!db) return { processed: 0, sent: 0, failed: 0, skipped: 0 };
  const due = await db
    .select()
    .from(webinarEmailQueue)
    .where(
      and(
        eq(webinarEmailQueue.status, "pending"),
        lte(webinarEmailQueue.scheduledFor, new Date())
      )
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
          eq(webinarEmailQueue.status, "pending")
        )
      );
    const affectedRows = Number(
      (claim as unknown as [{ affectedRows: number }])[0]?.affectedRows ?? 0
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
      await db
        .update(webinarEmailQueue)
        .set({
          status: "sent",
          sentAt: new Date(),
          providerMessageId: messageId,
          lastError: null,
        })
        .where(eq(webinarEmailQueue.id, item.id));
      await db.insert(webinarEmailEvents).values({
        emailQueueId: item.id,
        registrationId: item.registrationId,
        webinarId: item.webinarId,
        eventType: "sent",
        providerEventId: messageId,
      });
      if (item.emailType === "confirmation") {
        await db
          .update(webinarRegistrations)
          .set({ confirmationSent: true })
          .where(eq(webinarRegistrations.id, item.registrationId));
      }
      sent += 1;
    } catch (error) {
      const attempts = item.attemptCount + 1;
      const lastError =
        error instanceof Error
          ? error.message.slice(0, 1000)
          : "Email delivery failed";
      await db
        .update(webinarEmailQueue)
        .set({
          status: attempts >= 3 ? "failed" : "pending",
          scheduledFor:
            attempts >= 3
              ? item.scheduledFor
              : new Date(Date.now() + attempts * 10 * 60 * 1000),
          failedAt: attempts >= 3 ? new Date() : null,
          lastError,
        })
        .where(eq(webinarEmailQueue.id, item.id));
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

async function processPostgresWebinarEmailQueue(batchSize: number) {
  const sql = getPostgresClient();
  if (!sql) return { processed: 0, sent: 0, failed: 0, skipped: 0 };
  const limit = Math.min(Math.max(batchSize, 1), 50);
  const claimed = await sql`
    with due as (
      select id
      from webinar_email_queue
      where status = 'pending'
        and scheduled_for <= now()
        and attempt_count < 3
      order by scheduled_for
      for update skip locked
      limit ${limit}
    )
    update webinar_email_queue q
    set status = 'processing',
        processing_started_at = now(),
        attempt_count = q.attempt_count + 1,
        updated_at = now()
    from due
    where q.id = due.id
    returning q.*
  `;
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const item of claimed) {
    try {
      const records = await sql`
        select r.email, r.first_name, r.full_name, r.registration_status,
               w.event_start_at, w.timezone, w.meeting_url,
               w.recording_available, w.recording_url, w.masterclass_url
        from webinar_registrations r
        join webinars w on w.id = r.webinar_id
        where r.id = ${item.registration_id}
        limit 1
      `;
      const record = records[0];
      if (!record || record.registration_status === "cancelled") {
        await sql`
          update webinar_email_queue
          set status = 'cancelled', updated_at = now()
          where id = ${item.id}
        `;
        skipped += 1;
        continue;
      }
      const webinar: WebinarEmailRecord = {
        eventStartAt: record.event_start_at
          ? new Date(record.event_start_at)
          : null,
        timezone: record.timezone,
        meetingUrl: record.meeting_url,
        recordingAvailable: Boolean(record.recording_available),
        recordingUrl: record.recording_url,
        masterclassUrl: record.masterclass_url,
      };
      const content = emailCopy(
        item.email_type as EmailType,
        record.first_name ?? record.full_name ?? "there",
        webinar
      );
      const messageId = await sendBrevoEmail({
        to: record.email,
        subject: content.subject,
        text: content.text,
        html: content.html,
      });
      await sql.begin(async tx => {
        await tx`
          update webinar_email_queue
          set status = 'sent', sent_at = now(),
              provider_message_id = ${messageId}, last_error = null,
              updated_at = now()
          where id = ${item.id}
        `;
        await tx`
          insert into webinar_email_events (
            email_queue_id, registration_id, webinar_id, event_type,
            provider_event_id
          ) values (
            ${item.id}, ${item.registration_id}, ${item.webinar_id}, 'sent',
            ${messageId}
          )
        `;
        if (item.email_type === "confirmation") {
          await tx`
            update webinar_registrations set confirmation_sent = true,
              updated_at = now()
            where id = ${item.registration_id}
          `;
        }
      });
      sent += 1;
    } catch (error) {
      const attempts = Number(item.attempt_count);
      const lastError =
        error instanceof Error
          ? error.message.slice(0, 1000)
          : "Email delivery failed";
      await sql.begin(async tx => {
        await tx`
          update webinar_email_queue
          set status = ${attempts >= 3 ? "failed" : "pending"},
              scheduled_for = ${
                attempts >= 3
                  ? item.scheduled_for
                  : new Date(Date.now() + attempts * 10 * 60 * 1000)
              },
              failed_at = ${attempts >= 3 ? new Date() : null},
              last_error = ${lastError},
              updated_at = now()
          where id = ${item.id}
        `;
        await tx`
          insert into webinar_email_events (
            email_queue_id, registration_id, webinar_id, event_type, event_data
          ) values (
            ${item.id}, ${item.registration_id}, ${item.webinar_id}, 'failed',
            ${tx.json({ attempt: attempts, willRetry: attempts < 3 })}
          )
        `;
      });
      failed += 1;
    }
  }
  return { processed: claimed.length, sent, failed, skipped };
}
