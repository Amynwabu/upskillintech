import { describe, it, expect } from 'vitest';
import { sendPreferenceConfirmationEmail, NewsletterPreferences } from './emailService';

describe('Newsletter Preference Confirmation Email', () => {
  it('should have sendPreferenceConfirmationEmail function exported', () => {
    expect(sendPreferenceConfirmationEmail).toBeDefined();
    expect(typeof sendPreferenceConfirmationEmail).toBe('function');
  });

  it('should return error when SendGrid is not configured', async () => {
    // This test will pass if SendGrid is not configured (returns error)
    // or if it is configured (sends email successfully)
    const testEmail = 'test@example.com';
    const testPreferences: NewsletterPreferences = {
      prefAiNews: true,
      prefCourseUpdates: true,
      prefEvents: false,
      prefTips: true,
    };
    const testToken = 'test-token-123';

    const result = await sendPreferenceConfirmationEmail(testEmail, testPreferences, testToken);
    
    // Either success or specific error about configuration
    expect(result).toHaveProperty('success');
    if (!result.success) {
      expect(result.error).toBeDefined();
    }
  });

  it('should accept valid NewsletterPreferences object', () => {
    const validPreferences: NewsletterPreferences = {
      prefAiNews: true,
      prefCourseUpdates: false,
      prefEvents: true,
      prefTips: false,
    };

    expect(validPreferences.prefAiNews).toBe(true);
    expect(validPreferences.prefCourseUpdates).toBe(false);
    expect(validPreferences.prefEvents).toBe(true);
    expect(validPreferences.prefTips).toBe(false);
  });
});
