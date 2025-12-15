import { Request, Response } from "express";
import { getDb } from "../db";
import { emailEvents } from "../../drizzle/schema";

/**
 * SendGrid Event Webhook
 * Receives email events (opens, clicks, bounces, etc.) from SendGrid
 * 
 * To set up in SendGrid:
 * 1. Go to Settings > Mail Settings > Event Webhook
 * 2. Set HTTP Post URL to: https://your-domain.com/api/webhooks/sendgrid
 * 3. Select events to track: Processed, Dropped, Delivered, Deferred, Bounce, Open, Click, Spam Report, Unsubscribe
 * 4. Enable the webhook
 */

interface SendGridEvent {
  email: string;
  timestamp: number;
  "smtp-id"?: string;
  event: string;
  category?: string[];
  sg_event_id?: string;
  sg_message_id?: string;
  response?: string;
  attempt?: string;
  useragent?: string;
  ip?: string;
  url?: string;
  reason?: string;
  status?: string;
  asm_group_id?: number;
  // Custom args we add when sending emails
  template_type?: string;
}

// Map SendGrid event types to our enum values
const eventTypeMap: Record<string, string> = {
  processed: "processed",
  dropped: "dropped",
  delivered: "delivered",
  deferred: "deferred",
  bounce: "bounce",
  open: "open",
  click: "click",
  spamreport: "spamreport",
  unsubscribe: "unsubscribe",
  group_unsubscribe: "group_unsubscribe",
  group_resubscribe: "group_resubscribe",
};

export async function handleSendGridWebhook(req: Request, res: Response) {
  try {
    const events: SendGridEvent[] = req.body;
    
    if (!Array.isArray(events)) {
      console.error("[SendGrid Webhook] Invalid payload: expected array");
      return res.status(400).json({ error: "Invalid payload" });
    }

    console.log(`[SendGrid Webhook] Received ${events.length} events`);

    const db = await getDb();
    if (!db) {
      console.error("[SendGrid Webhook] Database not available");
      return res.status(500).json({ error: "Database not available" });
    }

    const insertPromises = events.map(async (event) => {
      const eventType = eventTypeMap[event.event];
      
      if (!eventType) {
        console.warn(`[SendGrid Webhook] Unknown event type: ${event.event}`);
        return null;
      }

      try {
        await db.insert(emailEvents).values({
          messageId: event.sg_message_id || event["smtp-id"] || `unknown-${Date.now()}`,
          email: event.email,
          eventType: eventType as any,
          templateType: event.template_type || null,
          url: event.url || null,
          userAgent: event.useragent || null,
          ip: event.ip || null,
          reason: event.reason || null,
          timestamp: new Date(event.timestamp * 1000),
        });
        return true;
      } catch (error) {
        console.error(`[SendGrid Webhook] Failed to insert event:`, error);
        return null;
      }
    });

    const results = await Promise.all(insertPromises);
    const successCount = results.filter(Boolean).length;

    console.log(`[SendGrid Webhook] Successfully stored ${successCount}/${events.length} events`);

    return res.json({ success: true, stored: successCount });
  } catch (error) {
    console.error("[SendGrid Webhook] Error processing events:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
