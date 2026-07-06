import { describe, it, expect } from 'vitest';
import { validateSendGridConfig, sendWelcomeEmail } from './emailService';

// Integration suite: needs a real SendGrid API key. Skipped in CI and local
// environments where SENDGRID_API_KEY is not set.
const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY);

describe.skipIf(!hasSendGrid)('SendGrid Email Service', () => {
  it('should validate SendGrid API key configuration', async () => {
    const result = await validateSendGridConfig();
    
    expect(result.valid).toBe(true);
    if (!result.valid) {
      console.error('SendGrid validation error:', result.error);
    }
  }, 10000); // 10 second timeout for API call

  it('should have SendGrid API key configured', () => {
    expect(process.env.SENDGRID_API_KEY).toBeDefined();
    expect(process.env.SENDGRID_API_KEY).not.toBe('');
  });
});
