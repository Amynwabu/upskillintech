import { describe, it, expect } from 'vitest';
import * as db from './db';

describe('Newsletter Database Functions', () => {
  it('should subscribe a new email to newsletter', async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    
    const result = await db.subscribeToNewsletter(testEmail);

    expect(result.success).toBe(true);
    expect(result.message).toContain('Successfully subscribed');
  });

  it('should handle duplicate email subscriptions gracefully', async () => {
    const testEmail = `duplicate-${Date.now()}@example.com`;
    
    // First subscription
    await db.subscribeToNewsletter(testEmail);

    // Second subscription with same email
    const result = await db.subscribeToNewsletter(testEmail);

    expect(result.success).toBe(true);
    expect(result.message).toContain('already subscribed');
  });

  it('should reactivate unsubscribed email', async () => {
    const testEmail = `reactivate-${Date.now()}@example.com`;
    
    // Subscribe
    await db.subscribeToNewsletter(testEmail);

    // Unsubscribe
    await db.unsubscribeFromNewsletter(testEmail);

    // Resubscribe
    const result = await db.subscribeToNewsletter(testEmail);

    expect(result.success).toBe(true);
    expect(result.message).toContain('resubscribed');
  });

  it('should unsubscribe an email from newsletter', async () => {
    const testEmail = `unsubscribe-${Date.now()}@example.com`;
    
    // First subscribe
    await db.subscribeToNewsletter(testEmail);

    // Then unsubscribe
    const result = await db.unsubscribeFromNewsletter(testEmail);

    expect(result).toBeDefined();
  });

  it('should get newsletter subscribers', async () => {
    const subscribers = await db.getNewsletterSubscribers();
    
    expect(Array.isArray(subscribers)).toBe(true);
  });

  it('should filter subscribers by status', async () => {
    const activeSubscribers = await db.getNewsletterSubscribers('active');
    
    expect(Array.isArray(activeSubscribers)).toBe(true);
    activeSubscribers.forEach(sub => {
      expect(sub.status).toBe('active');
    });
  });
});
