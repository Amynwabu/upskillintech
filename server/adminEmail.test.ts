import { describe, it, expect } from 'vitest';
import { generateWelcomeEmailHtml, generatePreferenceConfirmationHtml } from './emailService';

describe('Admin Email Panel - Template Generation', () => {
  it('should generate welcome email HTML', () => {
    const html = generateWelcomeEmailHtml();
    
    expect(html).toBeDefined();
    expect(typeof html).toBe('string');
    expect(html.length).toBeGreaterThan(0);
    expect(html).toContain('Welcome to UpskillinTech');
    expect(html).toContain('Start Learning Now');
    expect(html).toContain('1,000+ learners');
  });

  it('should generate preference confirmation email HTML with all preferences enabled', () => {
    const preferences = {
      prefAiNews: true,
      prefCourseUpdates: true,
      prefEvents: true,
      prefTips: true,
    };
    
    const html = generatePreferenceConfirmationHtml(preferences);
    
    expect(html).toBeDefined();
    expect(typeof html).toBe('string');
    expect(html).toContain('Preferences Updated');
    expect(html).toContain('AI News & Insights');
    expect(html).toContain('Course Updates');
    expect(html).toContain('Events & Webinars');
    expect(html).toContain('Tips & Tutorials');
  });

  it('should generate preference confirmation email HTML with some preferences disabled', () => {
    const preferences = {
      prefAiNews: true,
      prefCourseUpdates: false,
      prefEvents: true,
      prefTips: false,
    };
    
    const html = generatePreferenceConfirmationHtml(preferences);
    
    expect(html).toBeDefined();
    expect(html).toContain('AI News & Insights');
    expect(html).toContain('Events & Webinars');
    // Should not contain disabled preferences with checkmarks
    expect(html).not.toContain('✓</span>\\n            <span style="color: #374151;">Course Updates');
  });

  it('should generate preference confirmation email HTML with no preferences', () => {
    const preferences = {
      prefAiNews: false,
      prefCourseUpdates: false,
      prefEvents: false,
      prefTips: false,
    };
    
    const html = generatePreferenceConfirmationHtml(preferences);
    
    expect(html).toBeDefined();
    expect(html).toContain('No categories selected');
  });

  it('should include manage preferences link in preference confirmation email', () => {
    const preferences = {
      prefAiNews: true,
      prefCourseUpdates: true,
      prefEvents: false,
      prefTips: true,
    };
    
    const html = generatePreferenceConfirmationHtml(preferences);
    
    expect(html).toContain('Manage Preferences');
    expect(html).toContain('/newsletter/preferences');
  });

  it('should include security warning in preference confirmation email', () => {
    const preferences = {
      prefAiNews: true,
      prefCourseUpdates: true,
      prefEvents: false,
      prefTips: true,
    };
    
    const html = generatePreferenceConfirmationHtml(preferences);
    
    expect(html).toContain("Didn't make this change?");
    expect(html).toContain('support@upskillintech.com');
  });
});

// Password Reset Email Template Tests
describe("generatePasswordResetEmailHtml", () => {
  it("should generate valid HTML with default reset link", async () => {
    const { generatePasswordResetEmailHtml } = await import("./emailService");
    const html = generatePasswordResetEmailHtml();
    
    expect(html).toContain("Password Reset Request");
    expect(html).toContain("Reset My Password");
    expect(html).toContain("PREVIEW_TOKEN");
    expect(html).toContain("1 hour");
    expect(html).toContain("Didn't request this?");
  });

  it("should include custom reset link when provided", async () => {
    const { generatePasswordResetEmailHtml } = await import("./emailService");
    const customLink = "https://example.com/reset?token=abc123";
    const html = generatePasswordResetEmailHtml(customLink);
    
    expect(html).toContain(customLink);
    expect(html).not.toContain("PREVIEW_TOKEN");
  });

  it("should include security warning section", async () => {
    const { generatePasswordResetEmailHtml } = await import("./emailService");
    const html = generatePasswordResetEmailHtml();
    
    expect(html).toContain("Didn't request this?");
    expect(html).toContain("safely ignore this email");
  });
});


// Event Registration Email Template Tests
describe("generateEventRegistrationEmailHtml", () => {
  it("should generate valid HTML with default event details", async () => {
    const { generateEventRegistrationEmailHtml } = await import("./emailService");
    const html = generateEventRegistrationEmailHtml();
    
    expect(html).toContain("You're Registered!");
    expect(html).toContain("AI Fundamentals Workshop");
    expect(html).toContain("Dr. Sarah Chen");
    expect(html).toContain("Online via Zoom");
    expect(html).toContain("120 minutes");
  });

  it("should include custom event details when provided", async () => {
    const { generateEventRegistrationEmailHtml, EventDetails } = await import("./emailService");
    const customEvent = {
      title: "Advanced ML Workshop",
      description: "Deep dive into machine learning algorithms",
      date: new Date("2025-02-15T14:00:00Z"),
      duration: 180,
      location: "New York, NY",
      hostName: "Prof. John Smith",
      hostEmail: "john@example.com",
      eventType: "conference" as const,
      registrationId: "REG-CUSTOM-123",
    };
    const html = generateEventRegistrationEmailHtml(customEvent);
    
    expect(html).toContain("Advanced ML Workshop");
    expect(html).toContain("Prof. John Smith");
    expect(html).toContain("New York, NY");
    expect(html).toContain("180 minutes");
    expect(html).toContain("REG-CUSTOM-123");
  });

  it("should include calendar invite attachment note", async () => {
    const { generateEventRegistrationEmailHtml } = await import("./emailService");
    const html = generateEventRegistrationEmailHtml();
    
    expect(html).toContain("calendar invite");
    expect(html).toContain(".ics file");
  });
});

describe("generateICSCalendarInvite", () => {
  it("should generate valid ICS format", async () => {
    const { generateICSCalendarInvite } = await import("./emailService");
    const event = {
      title: "Test Workshop",
      description: "Test description",
      date: new Date("2025-02-15T14:00:00Z"),
      duration: 60,
      location: "Online",
      hostName: "Test Host",
      hostEmail: "host@test.com",
      eventType: "workshop" as const,
      registrationId: "REG-TEST-001",
    };
    const ics = generateICSCalendarInvite(event);
    
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("END:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain("SUMMARY:Test Workshop");
    expect(ics).toContain("LOCATION:Online");
    expect(ics).toContain("ORGANIZER;CN=Test Host");
  });

  it("should include 30-minute reminder alarm", async () => {
    const { generateICSCalendarInvite } = await import("./emailService");
    const event = {
      title: "Test Event",
      description: "Test",
      date: new Date(),
      duration: 60,
      location: "Online",
      hostName: "Host",
      eventType: "webinar" as const,
    };
    const ics = generateICSCalendarInvite(event);
    
    expect(ics).toContain("BEGIN:VALARM");
    expect(ics).toContain("TRIGGER:-PT30M");
    expect(ics).toContain("END:VALARM");
  });
});
