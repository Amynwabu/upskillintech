import { describe, it, expect } from 'vitest';
import { registerWebinar, getAllWebinarRegistrations } from './server/db';

describe('Webinar Registration System', () => {
  it('should register a new webinar attendee', async () => {
    const testRegistration = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+44 7700 900000',
      company: 'Test Company',
      role: 'Software Developer',
      webinarTitle: 'Build the Right AI Skillset',
      webinarDate: 'Saturday, 17 January 2026 - 7PM UK / 8PM Nigeria',
    };

    const result = await registerWebinar(testRegistration);
    
    expect(result).toBeDefined();
    expect(result.id).toBeGreaterThan(0);
  });

  it('should retrieve all webinar registrations', async () => {
    const registrations = await getAllWebinarRegistrations();
    
    expect(Array.isArray(registrations)).toBe(true);
    expect(registrations.length).toBeGreaterThanOrEqual(0);
    
    if (registrations.length > 0) {
      const firstReg = registrations[0];
      expect(firstReg).toHaveProperty('id');
      expect(firstReg).toHaveProperty('name');
      expect(firstReg).toHaveProperty('email');
      expect(firstReg).toHaveProperty('webinarTitle');
      expect(firstReg).toHaveProperty('webinarDate');
      expect(firstReg).toHaveProperty('createdAt');
    }
  });

  it('should handle registration with minimal required fields', async () => {
    const minimalRegistration = {
      name: 'Minimal User',
      email: 'minimal@example.com',
      webinarTitle: 'Build the Right AI Skillset',
      webinarDate: 'Saturday, 17 January 2026 - 7PM UK / 8PM Nigeria',
    };

    const result = await registerWebinar(minimalRegistration);
    
    expect(result).toBeDefined();
    expect(result.id).toBeGreaterThan(0);
  });
});
