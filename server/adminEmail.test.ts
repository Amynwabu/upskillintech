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
