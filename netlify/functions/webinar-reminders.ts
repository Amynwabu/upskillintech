import type { Config, Context } from "@netlify/functions";
import { processWebinarEmailQueue } from "../../server/webinar/webinarEmailService";

export default async function handler(_request: Request, _context: Context) {
  try {
    const batchSize = Number(process.env.WEBINAR_EMAIL_BATCH_SIZE ?? 25);
    const result = await processWebinarEmailQueue(batchSize);
    console.info("[WebinarReminders] Processing complete", result);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    console.error(
      "[WebinarReminders] Processing failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    // A successful response prevents Netlify from retrying the whole batch and
    // duplicating messages; individual queue items own their retry state.
    return Response.json({ ok: false, processed: 0 }, { status: 200 });
  }
}

export const config: Config = {
  schedule: "*/10 * * * *",
};

