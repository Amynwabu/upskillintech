import type { PublicWebinar } from "../../shared/webinar";

function icsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function generateWebinarIcs(
  webinar: PublicWebinar,
  meetingUrl?: string | null,
) {
  if (!webinar.eventStartAt || !webinar.eventEndAt) {
    throw new Error("WEBINAR_DATE_NOT_SET");
  }
  const siteUrl = process.env.SITE_URL ?? "https://upskillintech.com";
  const canonicalUrl = `${siteUrl}/webinars/${webinar.slug}`;
  const location = meetingUrl ?? "Online — joining details are sent to registered participants";
  const now = new Date();
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UpskillinTech//Webinar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:webinar-${webinar.slug}@upskillintech.com`,
    `DTSTAMP:${icsDate(now)}`,
    `DTSTART:${icsDate(new Date(webinar.eventStartAt))}`,
    `DTEND:${icsDate(new Date(webinar.eventEndAt))}`,
    `SUMMARY:${escapeIcs(webinar.title)}`,
    `DESCRIPTION:${escapeIcs(`${webinar.description ?? ""}\n\n${canonicalUrl}`)}`,
    `LOCATION:${escapeIcs(location)}`,
    "ORGANIZER;CN=UpskillinTech:mailto:hello@upskillintech.com",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:UpskillinTech webinar starts in 30 minutes",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function calendarLinks(webinar: PublicWebinar) {
  if (!webinar.eventStartAt || !webinar.eventEndAt) return null;
  const start = icsDate(new Date(webinar.eventStartAt));
  const end = icsDate(new Date(webinar.eventEndAt));
  const siteUrl = process.env.SITE_URL ?? "https://upskillintech.com";
  const details = `${webinar.description ?? ""}\n\n${siteUrl}/webinars/${webinar.slug}`;
  const google = new URL("https://calendar.google.com/calendar/render");
  google.searchParams.set("action", "TEMPLATE");
  google.searchParams.set("text", webinar.title);
  google.searchParams.set("dates", `${start}/${end}`);
  google.searchParams.set("details", details);
  google.searchParams.set("location", "Online");

  const outlook = new URL("https://outlook.live.com/calendar/0/deeplink/compose");
  outlook.searchParams.set("path", "/calendar/action/compose");
  outlook.searchParams.set("rru", "addevent");
  outlook.searchParams.set("subject", webinar.title);
  outlook.searchParams.set("startdt", new Date(webinar.eventStartAt).toISOString());
  outlook.searchParams.set("enddt", new Date(webinar.eventEndAt).toISOString());
  outlook.searchParams.set("body", details);
  outlook.searchParams.set("location", "Online");
  return { google: google.toString(), outlook: outlook.toString() };
}

