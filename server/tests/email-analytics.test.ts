import { describe, it, expect } from "vitest";
import {
  getEmailAnalyticsSummary,
  getEmailEventsByDate,
  getEmailEventsByTemplate,
  getRecentEmailEvents,
} from "../db";

describe("Email Analytics", () => {
  describe("getEmailAnalyticsSummary", () => {
    it("should return summary with correct structure", async () => {
      const summary = await getEmailAnalyticsSummary(30);
      
      expect(summary).toBeDefined();
      expect(typeof summary.totalSent).toBe("number");
      expect(typeof summary.delivered).toBe("number");
      expect(typeof summary.opened).toBe("number");
      expect(typeof summary.clicked).toBe("number");
      expect(typeof summary.bounced).toBe("number");
      expect(typeof summary.unsubscribed).toBe("number");
      expect(typeof summary.spamReports).toBe("number");
      expect(typeof summary.openRate).toBe("number");
      expect(typeof summary.clickRate).toBe("number");
      expect(typeof summary.bounceRate).toBe("number");
    });

    it("should calculate rates between 0 and 100", async () => {
      const summary = await getEmailAnalyticsSummary(30);
      
      expect(summary.openRate).toBeGreaterThanOrEqual(0);
      expect(summary.openRate).toBeLessThanOrEqual(100);
      expect(summary.clickRate).toBeGreaterThanOrEqual(0);
      expect(summary.clickRate).toBeLessThanOrEqual(100);
      expect(summary.bounceRate).toBeGreaterThanOrEqual(0);
      expect(summary.bounceRate).toBeLessThanOrEqual(100);
    });

    it("should accept different day ranges", async () => {
      const summary7 = await getEmailAnalyticsSummary(7);
      const summary30 = await getEmailAnalyticsSummary(30);
      const summary90 = await getEmailAnalyticsSummary(90);
      
      // All should return valid summaries
      expect(summary7).toBeDefined();
      expect(summary30).toBeDefined();
      expect(summary90).toBeDefined();
    });
  });

  describe("getEmailEventsByDate", () => {
    it("should return events grouped by date as an array", async () => {
      const eventsByDate = await getEmailEventsByDate(30);
      
      expect(Array.isArray(eventsByDate)).toBe(true);
    });

    it("should have correct structure for date entries", async () => {
      const eventsByDate = await getEmailEventsByDate(30);
      
      if (eventsByDate.length > 0) {
        const firstDay = eventsByDate[0];
        expect(firstDay).toHaveProperty("date");
        expect(firstDay).toHaveProperty("delivered");
        expect(firstDay).toHaveProperty("opened");
        expect(firstDay).toHaveProperty("clicked");
        expect(firstDay).toHaveProperty("bounced");
      }
    });
  });

  describe("getEmailEventsByTemplate", () => {
    it("should return events grouped by template type as an array", async () => {
      const eventsByTemplate = await getEmailEventsByTemplate(30);
      
      expect(Array.isArray(eventsByTemplate)).toBe(true);
    });

    it("should have correct structure for template entries", async () => {
      const eventsByTemplate = await getEmailEventsByTemplate(30);
      
      if (eventsByTemplate.length > 0) {
        const firstTemplate = eventsByTemplate[0];
        expect(firstTemplate).toHaveProperty("templateType");
        expect(firstTemplate).toHaveProperty("count");
        expect(typeof firstTemplate.count).toBe("number");
      }
    });
  });

  describe("getRecentEmailEvents", () => {
    it("should return recent events as an array", async () => {
      const recentEvents = await getRecentEmailEvents(10);
      
      expect(Array.isArray(recentEvents)).toBe(true);
    });

    it("should respect the limit parameter", async () => {
      const events5 = await getRecentEmailEvents(5);
      const events20 = await getRecentEmailEvents(20);
      
      expect(events5.length).toBeLessThanOrEqual(5);
      expect(events20.length).toBeLessThanOrEqual(20);
    });

    it("should have correct structure for event entries", async () => {
      const recentEvents = await getRecentEmailEvents(10);
      
      if (recentEvents.length > 0) {
        const firstEvent = recentEvents[0];
        expect(firstEvent).toHaveProperty("id");
        expect(firstEvent).toHaveProperty("email");
        expect(firstEvent).toHaveProperty("eventType");
        expect(firstEvent).toHaveProperty("timestamp");
      }
    });

    it("should return events in descending order by timestamp", async () => {
      const recentEvents = await getRecentEmailEvents(10);
      
      if (recentEvents.length >= 2) {
        const timestamps = recentEvents.map(e => new Date(e.timestamp).getTime());
        for (let i = 1; i < timestamps.length; i++) {
          expect(timestamps[i - 1]).toBeGreaterThanOrEqual(timestamps[i]);
        }
      }
    });
  });
});
