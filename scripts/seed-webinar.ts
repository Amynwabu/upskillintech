import "dotenv/config";
import { webinars } from "../drizzle/schema";
import { AI_EMPLOYEE_WEBINAR_PLACEHOLDER } from "../shared/webinar";
import { getDb } from "../server/db";

const db = await getDb();
if (!db) {
  throw new Error("DATABASE_URL is required to seed the webinar");
}

await db.insert(webinars).values({
  title: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.title,
  slug: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.slug,
  subtitle: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.subtitle,
  description: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.description,
  format: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.format,
  speakerName: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.speakerName,
  speakerTitle: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.speakerTitle,
  speakerBiography: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.speakerBiography,
  timezone: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.timezone,
  status: "draft",
  masterclassUrl: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.masterclassUrl,
}).onDuplicateKeyUpdate({
  set: {
    title: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.title,
    subtitle: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.subtitle,
    description: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.description,
    updatedAt: new Date(),
  },
});

console.info(
  `Seeded webinar "${AI_EMPLOYEE_WEBINAR_PLACEHOLDER.slug}" as a draft. Add dates and meeting details before publishing.`,
);

