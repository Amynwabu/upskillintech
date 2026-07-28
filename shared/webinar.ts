import { z } from "zod";

export const AI_EMPLOYEE_WEBINAR_SLUG = "build-your-first-ai-employee";

export const webinarRegistrationSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(100),
  lastName: z.string().trim().min(1, "Enter your last name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  organisation: z.string().trim().max(255).optional().or(z.literal("")),
  role: z.string().trim().min(1, "Tell us your current role").max(255),
  automationGoal: z.string().trim().max(2000).optional().or(z.literal("")),
  eventConsent: z.literal(true, {
    error: "Event communication consent is required",
  }),
  marketingConsent: z.boolean().default(false),
  utmSource: z.string().max(255).optional(),
  utmMedium: z.string().max(255).optional(),
  utmCampaign: z.string().max(255).optional(),
  utmContent: z.string().max(255).optional(),
  utmTerm: z.string().max(255).optional(),
  referrerUrl: z.string().max(2000).optional(),
  landingPage: z.string().max(2000).optional(),
  website: z.string().max(0, "Unable to submit this registration").optional(),
});

export type WebinarRegistrationInput = z.infer<typeof webinarRegistrationSchema>;

export const webinarStatusSchema = z.enum([
  "draft",
  "published",
  "registration_closed",
  "live",
  "completed",
  "cancelled",
]);

export type WebinarStatus = z.infer<typeof webinarStatusSchema>;

export type PublicWebinar = {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  format: string;
  speakerName: string | null;
  speakerTitle: string | null;
  speakerBiography: string | null;
  speakerImageUrl: string | null;
  eventStartAt: Date | null;
  eventEndAt: Date | null;
  registrationOpensAt: Date | null;
  registrationClosesAt: Date | null;
  timezone: string;
  maximumAttendees: number | null;
  status: WebinarStatus;
  recordingAvailable: boolean;
  masterclassUrl: string | null;
};

export const AI_EMPLOYEE_WEBINAR_PLACEHOLDER: PublicWebinar = {
  id: 0,
  title: "Build Your First AI Employee That Works 24/7—Without Coding",
  slug: AI_EMPLOYEE_WEBINAR_SLUG,
  subtitle: "Agentic AI for Everyone",
  description:
    "In one practical session, learn how to design an AI employee that supports customers, organises information and automates repetitive work without traditional coding.",
  format: "Free live online webinar",
  speakerName: "UpskillinTech",
  speakerTitle: "Practical AI education and transformation",
  speakerBiography:
    "The final speaker profile and photograph will be published when the event schedule is confirmed.",
  speakerImageUrl: null,
  eventStartAt: null,
  eventEndAt: null,
  registrationOpensAt: null,
  registrationClosesAt: null,
  timezone: "Europe/London",
  maximumAttendees: null,
  status: "draft",
  recordingAvailable: false,
  masterclassUrl: "/masterclass",
};

export function normaliseEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getWebinarPhase(webinar: PublicWebinar, now = new Date()) {
  if (webinar.status === "cancelled") return "cancelled" as const;
  if (webinar.status === "completed") return "completed" as const;
  if (webinar.status === "live") return "live" as const;
  if (!webinar.eventStartAt) return "date_pending" as const;
  if (webinar.eventEndAt && now >= webinar.eventEndAt) return "completed" as const;
  if (now >= webinar.eventStartAt) return "live" as const;
  if (
    webinar.status === "registration_closed" ||
    (webinar.registrationClosesAt && now > webinar.registrationClosesAt)
  ) return "registration_closed" as const;
  if (webinar.registrationOpensAt && now < webinar.registrationOpensAt) {
    return "registration_not_open" as const;
  }
  if (webinar.status !== "published") return "date_pending" as const;
  return "registration_open" as const;
}

export function formatWebinarDate(
  date: Date | string | null,
  timezone = "Europe/London",
) {
  if (!date) return "Date and time to be announced";
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
  }).format(new Date(date));
}
