import { describe, expect, it } from "vitest";
import type { Webinar } from "../../drizzle/schema";
import {
  AI_EMPLOYEE_WEBINAR_PLACEHOLDER,
  formatWebinarDate,
  getWebinarPhase,
  webinarRegistrationSchema,
} from "../../shared/webinar";
import { generateWebinarIcs } from "./webinarCalendarService";
import { buildWebinarEmailSchedule } from "./webinarService";

const validRegistration = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  role: "Founder",
  eventConsent: true,
  marketingConsent: false,
};

function webinar(overrides: Partial<Webinar> = {}): Webinar {
  return {
    id: 1,
    title: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.title,
    slug: AI_EMPLOYEE_WEBINAR_PLACEHOLDER.slug,
    subtitle: null,
    description: "Practical AI webinar",
    format: "Free live online webinar",
    speakerName: null,
    speakerTitle: null,
    speakerBiography: null,
    speakerImageUrl: null,
    eventStartAt: new Date("2026-09-10T17:00:00.000Z"),
    eventEndAt: new Date("2026-09-10T18:30:00.000Z"),
    registrationOpensAt: new Date("2026-08-01T00:00:00.000Z"),
    registrationClosesAt: new Date("2026-09-10T16:30:00.000Z"),
    timezone: "Europe/London",
    meetingProvider: null,
    meetingUrl: null,
    meetingId: null,
    meetingPassword: null,
    maximumAttendees: null,
    status: "published",
    recordingAvailable: false,
    recordingUrl: null,
    masterclassUrl: "/masterclass",
    confirmationEmailEnabled: true,
    twoDayReminderEnabled: true,
    oneHourReminderEnabled: true,
    followUpEnabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

describe("webinar registration validation", () => {
  it("accepts a valid registration and optional marketing consent", () => {
    expect(webinarRegistrationSchema.safeParse(validRegistration).success).toBe(true);
    expect(webinarRegistrationSchema.parse({ ...validRegistration, marketingConsent: true }).marketingConsent).toBe(true);
  });

  it.each([
    ["first name", { ...validRegistration, firstName: "" }],
    ["email", { ...validRegistration, email: "" }],
    ["valid email", { ...validRegistration, email: "not-an-email" }],
    ["event consent", { ...validRegistration, eventConsent: false }],
  ])("rejects missing or invalid %s", (_label, input) => {
    expect(webinarRegistrationSchema.safeParse(input).success).toBe(false);
  });

  it("rejects honeypot content", () => {
    expect(webinarRegistrationSchema.safeParse({ ...validRegistration, website: "spam" }).success).toBe(false);
  });
});

describe("webinar scheduling", () => {
  it("queues confirmation and future reminders at the correct UTC times", () => {
    const jobs = buildWebinarEmailSchedule(webinar(), new Date("2026-09-01T10:00:00.000Z"));
    expect(jobs.map(job => job.emailType)).toEqual([
      "confirmation", "reminder_2_days", "reminder_1_hour", "follow_up_attended",
    ]);
    expect(jobs[1].scheduledFor.toISOString()).toBe("2026-09-08T17:00:00.000Z");
    expect(jobs[2].scheduledFor.toISOString()).toBe("2026-09-10T16:00:00.000Z");
  });

  it("does not create reminders scheduled in the past", () => {
    const jobs = buildWebinarEmailSchedule(webinar(), new Date("2026-09-10T16:30:00.000Z"));
    expect(jobs.map(job => job.emailType)).toEqual(["confirmation", "follow_up_attended"]);
  });
});

describe("webinar timing and calendar", () => {
  it("handles registration opening and closing states", () => {
    const publicEvent = { ...AI_EMPLOYEE_WEBINAR_PLACEHOLDER, ...webinar() };
    expect(getWebinarPhase(publicEvent, new Date("2026-07-01T00:00:00.000Z"))).toBe("registration_not_open");
    expect(getWebinarPhase(publicEvent, new Date("2026-09-10T16:45:00.000Z"))).toBe("registration_closed");
  });

  it("formats Europe/London winter and summer time without hard-coded offsets", () => {
    expect(formatWebinarDate("2026-01-10T18:00:00.000Z")).toContain("18:00");
    expect(formatWebinarDate("2026-07-10T18:00:00.000Z")).toContain("19:00");
  });

  it("generates UTC calendar data with a stable event identifier", () => {
    const event = { ...AI_EMPLOYEE_WEBINAR_PLACEHOLDER, ...webinar() };
    const ics = generateWebinarIcs(event);
    expect(ics).toContain("DTSTART:20260910T170000Z");
    expect(ics).toContain(`UID:webinar-${event.slug}@upskillintech.com`);
    expect(ics).toContain("BEGIN:VALARM");
  });
});

