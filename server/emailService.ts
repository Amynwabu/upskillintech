import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL || 'noreply@upskillintech.com';
const SENDER_NAME = 'UpskillinTech';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.warn('[EmailService] SendGrid API key not configured. Email sending will be disabled.');
}

/**
 * Send welcome email to new newsletter subscriber
 */
export async function sendWelcomeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  if (!SENDGRID_API_KEY) {
    console.warn('[EmailService] Cannot send email: SendGrid not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const msg = {
      to: email,
      from: {
        email: SENDER_EMAIL,
        name: SENDER_NAME,
      },
      subject: 'Welcome to UpskillinTech Newsletter! 🚀',
      text: `Welcome to UpskillinTech!

Thank you for subscribing to our newsletter. You're now part of a community of 1,000+ learners transforming their skills with AI.

Here's what you can expect:
• Latest AI course updates and new releases
• Exclusive learning resources and tips
• Community events and live workshops
• Special offers for premium courses

Ready to start your AI journey? Visit our platform to explore our courses:
https://upskillintech.com

If you have any questions, feel free to reply to this email.

Best regards,
The UpskillinTech Team

---
You're receiving this email because you subscribed to our newsletter. If you wish to unsubscribe, click here: [unsubscribe link]`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to UpskillinTech</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #10b981; font-size: 32px; font-weight: bold;">UpskillinTech</h1>
              <p style="margin: 10px 0 0; color: #94a3b8; font-size: 16px;">Transform Skills. Power Growth. Live AI.</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 24px; font-weight: bold;">Welcome to Our Community! 🚀</h2>
              
              <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to our newsletter. You're now part of a community of <strong>1,000+ learners</strong> transforming their skills with AI.
              </p>
              
              <div style="margin: 30px 0; padding: 20px; background-color: #f1f5f9; border-left: 4px solid #10b981; border-radius: 4px;">
                <h3 style="margin: 0 0 12px; color: #1e293b; font-size: 18px; font-weight: 600;">What You'll Receive:</h3>
                <ul style="margin: 0; padding-left: 20px; color: #475569;">
                  <li style="margin-bottom: 8px;">Latest AI course updates and new releases</li>
                  <li style="margin-bottom: 8px;">Exclusive learning resources and tips</li>
                  <li style="margin-bottom: 8px;">Community events and live workshops</li>
                  <li style="margin-bottom: 8px;">Special offers for premium courses</li>
                </ul>
              </div>
              
              <p style="margin: 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                Ready to start your AI journey? Explore our comprehensive courses designed for professionals, businesses, and organizations.
              </p>
              
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://upskillintech.com" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Explore Courses</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                Have questions? Feel free to reply to this email—we're here to help!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 10px; color: #64748b; font-size: 14px;">
                Best regards,<br>
                <strong>The UpskillinTech Team</strong>
              </p>
              <p style="margin: 20px 0 0; color: #94a3b8; font-size: 12px;">
                You're receiving this email because you subscribed to our newsletter.<br>
                <a href="{{unsubscribe_url}}" style="color: #10b981; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };

    await sgMail.send(msg);
    console.log(`[EmailService] Welcome email sent successfully to ${email}`);
    return { success: true };
  } catch (error: any) {
    console.error('[EmailService] Failed to send welcome email:', error.response?.body || error.message);
    return { 
      success: false, 
      error: error.response?.body?.errors?.[0]?.message || error.message 
    };
  }
}

/**
 * Validate SendGrid configuration
 */
export async function validateSendGridConfig(): Promise<{ valid: boolean; error?: string }> {
  if (!SENDGRID_API_KEY) {
    return { valid: false, error: 'SendGrid API key not configured' };
  }

  try {
    // Test API key by attempting to retrieve account details
    // This is a lightweight check that doesn't send actual emails
    const response = await fetch('https://api.sendgrid.com/v3/user/profile', {
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      },
    });

    if (response.ok) {
      return { valid: true };
    } else {
      const error = await response.text();
      return { valid: false, error: `Invalid API key: ${error}` };
    }
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}


/**
 * Send preference confirmation email after user updates their newsletter preferences
 */
export interface NewsletterPreferences {
  prefAiNews: boolean;
  prefCourseUpdates: boolean;
  prefEvents: boolean;
  prefTips: boolean;
}

export async function sendPreferenceConfirmationEmail(
  email: string,
  preferences: NewsletterPreferences,
  preferencesToken: string
): Promise<{ success: boolean; error?: string }> {
  if (!SENDGRID_API_KEY) {
    console.warn('[EmailService] Cannot send email: SendGrid not configured');
    return { success: false, error: 'Email service not configured' };
  }

  // Build the list of selected preferences
  const selectedPreferences: string[] = [];
  if (preferences.prefAiNews) selectedPreferences.push('AI News & Insights');
  if (preferences.prefCourseUpdates) selectedPreferences.push('Course Updates');
  if (preferences.prefEvents) selectedPreferences.push('Events & Webinars');
  if (preferences.prefTips) selectedPreferences.push('Tips & Tutorials');

  const preferencesListText = selectedPreferences.length > 0 
    ? selectedPreferences.join(', ') 
    : 'No categories selected';

  const preferencesListHtml = selectedPreferences.length > 0
    ? selectedPreferences.map(p => `<li style="margin-bottom: 8px; color: #10b981;">✓ ${p}</li>`).join('')
    : '<li style="color: #94a3b8;">No categories selected</li>';

  const preferencesUrl = `https://upskillintech.com/newsletter/preferences?token=${preferencesToken}`;

  try {
    const msg = {
      to: email,
      from: {
        email: SENDER_EMAIL,
        name: SENDER_NAME,
      },
      subject: 'Your Newsletter Preferences Have Been Updated ✅',
      text: `Your Newsletter Preferences Have Been Updated

Hi there!

We've successfully updated your newsletter preferences. Here's a summary of what you'll receive:

Selected Categories:
${selectedPreferences.length > 0 ? selectedPreferences.map(p => `• ${p}`).join('\n') : '• No categories selected'}

You can update your preferences anytime by visiting:
${preferencesUrl}

If you didn't make this change, please contact us immediately.

Best regards,
The UpskillinTech Team

---
You're receiving this email because you updated your newsletter preferences.
To unsubscribe from all emails, visit: ${preferencesUrl}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Preferences Updated</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #10b981; font-size: 32px; font-weight: bold;">UpskillinTech</h1>
              <p style="margin: 10px 0 0; color: #94a3b8; font-size: 16px;">Transform Skills. Power Growth. Live AI.</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); border-radius: 50%; line-height: 60px; font-size: 30px;">
                  ✅
                </div>
              </div>
              
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 24px; font-weight: bold; text-align: center;">Preferences Updated Successfully!</h2>
              
              <p style="margin: 0 0 24px; color: #475569; font-size: 16px; line-height: 1.6; text-align: center;">
                We've updated your newsletter preferences. Here's what you'll receive from us:
              </p>
              
              <div style="margin: 30px 0; padding: 24px; background-color: #f1f5f9; border-radius: 8px;">
                <h3 style="margin: 0 0 16px; color: #1e293b; font-size: 18px; font-weight: 600;">Your Selected Categories:</h3>
                <ul style="margin: 0; padding-left: 20px; list-style: none;">
                  ${preferencesListHtml}
                </ul>
              </div>
              
              <p style="margin: 24px 0; color: #475569; font-size: 16px; line-height: 1.6; text-align: center;">
                Want to make changes? You can update your preferences anytime.
              </p>
              
              <table role="presentation" style="margin: 30px auto;">
                <tr>
                  <td align="center">
                    <a href="${preferencesUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Manage Preferences</a>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; padding: 16px; background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                  <strong>Didn't make this change?</strong><br>
                  If you didn't update your preferences, please contact us immediately at support@upskillintech.com
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 10px; color: #64748b; font-size: 14px;">
                Best regards,<br>
                <strong>The UpskillinTech Team</strong>
              </p>
              <p style="margin: 20px 0 0; color: #94a3b8; font-size: 12px;">
                You're receiving this email because you updated your newsletter preferences.<br>
                <a href="${preferencesUrl}" style="color: #10b981; text-decoration: underline;">Manage Preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };

    await sgMail.send(msg);
    console.log(`[EmailService] Preference confirmation email sent successfully to ${email}`);
    return { success: true };
  } catch (error: any) {
    console.error('[EmailService] Failed to send preference confirmation email:', error.response?.body || error.message);
    return { 
      success: false, 
      error: error.response?.body?.errors?.[0]?.message || error.message 
    };
  }
}


/**
 * Generate welcome email HTML template for preview
 */
export function generateWelcomeEmailHtml(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to UpskillinTech</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to UpskillinTech! 🚀</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to our newsletter. You're now part of a community of <strong>1,000+ learners</strong> transforming their skills with AI.
              </p>
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Here's what you can expect:
              </p>
              <ul style="margin: 0 0 30px; padding-left: 20px; color: #374151; font-size: 16px; line-height: 1.8;">
                <li>Latest AI course updates and new releases</li>
                <li>Exclusive learning resources and tips</li>
                <li>Community events and live workshops</li>
                <li>Special offers for premium courses</li>
              </ul>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://upskillintech.com" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Start Learning Now
                </a>
              </div>
              <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                If you have any questions, feel free to reply to this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2024 UpskillinTech. All rights reserved.
              </p>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                <a href="#" style="color: #10b981; text-decoration: none;">Manage Preferences</a> · 
                <a href="#" style="color: #10b981; text-decoration: none;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generate preference confirmation email HTML template for preview
 */
export function generatePreferenceConfirmationHtml(preferences: NewsletterPreferences): string {
  const selectedCategories = [];
  if (preferences.prefAiNews) selectedCategories.push("AI News & Insights");
  if (preferences.prefCourseUpdates) selectedCategories.push("Course Updates");
  if (preferences.prefEvents) selectedCategories.push("Events & Webinars");
  if (preferences.prefTips) selectedCategories.push("Tips & Tutorials");

  const categoriesHtml = selectedCategories.length > 0
    ? selectedCategories.map(cat => `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #10b981; margin-right: 8px;">✓</span>
            <span style="color: #374151;">${cat}</span>
          </td>
        </tr>
      `).join('')
    : `<tr><td style="padding: 12px 16px; color: #6b7280;">No categories selected</td></tr>`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Preferences Updated</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Preferences Updated ✓</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Your newsletter preferences have been successfully updated. Here's a summary of your current selections:
              </p>
              
              <!-- Categories Table -->
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; background-color: #f9fafb; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">
                    Your Selected Categories
                  </td>
                </tr>
                ${categoriesHtml}
              </table>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://upskillintech.com/newsletter/preferences?token=PREVIEW_TOKEN" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Manage Preferences
                </a>
              </div>
              
              <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; padding: 16px; background-color: #fef3c7; border-radius: 8px;">
                <strong>Didn't make this change?</strong> If you didn't update your preferences, please contact us immediately at support@upskillintech.com
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2024 UpskillinTech. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}


/**
 * Generate password reset email HTML template for preview
 */
export function generatePasswordResetEmailHtml(resetLink?: string): string {
  const link = resetLink || "https://upskillintech.com/reset-password?token=PREVIEW_TOKEN";
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 12px 12px 0 0;">
              <div style="width: 64px; height: 64px; margin: 0 auto 16px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 32px;">🔐</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Password Reset Request</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password for your UpskillinTech account. If you made this request, click the button below to create a new password.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${link}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Reset My Password
                </a>
              </div>
              
              <p style="margin: 20px 0; color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
                This link will expire in <strong>1 hour</strong> for security reasons.
              </p>
              
              <!-- Security Notice -->
              <div style="margin: 30px 0; padding: 16px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>⚠️ Didn't request this?</strong><br>
                  If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                </p>
              </div>
              
              <!-- Alternative Link -->
              <p style="margin: 20px 0 0; color: #6b7280; font-size: 12px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${link}" style="color: #10b981; word-break: break-all;">${link}</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2024 UpskillinTech. All rights reserved.
              </p>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                This is an automated message. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
): Promise<{ success: boolean; error?: string }> {
  if (!SENDGRID_API_KEY) {
    console.warn('[EmailService] Cannot send email: SendGrid not configured');
    return { success: false, error: 'Email service not configured' };
  }

  const resetLink = `https://upskillintech.com/reset-password?token=${resetToken}`;
  const html = generatePasswordResetEmailHtml(resetLink);

  try {
    const msg = {
      to: email,
      from: {
        email: SENDER_EMAIL,
        name: SENDER_NAME,
      },
      subject: 'Reset Your UpskillinTech Password',
      text: `Password Reset Request

We received a request to reset your password for your UpskillinTech account.

Click the link below to create a new password:
${resetLink}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

---
© 2024 UpskillinTech. All rights reserved.
This is an automated message. Please do not reply to this email.`,
      html,
    };

    await sgMail.send(msg);
    console.log(`[EmailService] Password reset email sent to ${email}`);
    return { success: true };
  } catch (error: any) {
    console.error('[EmailService] Failed to send password reset email:', error?.response?.body || error);
    return { 
      success: false, 
      error: error?.response?.body?.errors?.[0]?.message || 'Failed to send email' 
    };
  }
}


/**
 * Event details interface for registration emails
 */
export interface EventDetails {
  title: string;
  description: string;
  date: Date;
  duration: number; // in minutes
  location: string;
  hostName: string;
  hostEmail?: string;
  eventType: "workshop" | "webinar" | "conference" | "meetup";
  registrationId?: string;
  zoomLink?: string;
}

/**
 * Generate ICS calendar invite content
 */
export function generateICSCalendarInvite(event: EventDetails): string {
  const startDate = event.date;
  const endDate = new Date(startDate.getTime() + event.duration * 60000);
  
  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const uid = event.registrationId || `event-${Date.now()}@upskillintech.com`;
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UpskillinTech//Event Registration//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.location}
ORGANIZER;CN=${event.hostName}:mailto:${event.hostEmail || 'events@upskillintech.com'}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder: ${event.title} starts in 30 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

/**
 * Generate event registration confirmation email HTML
 */
export function generateEventRegistrationEmailHtml(event?: EventDetails): string {
  const defaultEvent: EventDetails = {
    title: "AI Fundamentals Workshop",
    description: "Learn the basics of artificial intelligence and machine learning in this hands-on workshop.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    duration: 120,
    location: "Online via Zoom",
    hostName: "Dr. Sarah Chen",
    hostEmail: "sarah@upskillintech.com",
    eventType: "workshop",
    registrationId: "REG-PREVIEW-001",
  };
  
  const e = event || defaultEvent;
  const eventDate = new Date(e.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZoneName: 'short'
  });
  
  const eventTypeEmoji = {
    workshop: "🛠️",
    webinar: "📺",
    conference: "🎤",
    meetup: "👥",
  };
  
  const eventTypeLabel = {
    workshop: "Workshop",
    webinar: "Webinar",
    conference: "Conference",
    meetup: "Meetup",
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Registration Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); border-radius: 12px 12px 0 0;">
              <div style="width: 64px; height: 64px; margin: 0 auto 16px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 32px;">🎉</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">You're Registered!</h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Your spot has been confirmed</p>
            </td>
          </tr>
          <!-- Event Details Card -->
          <tr>
            <td style="padding: 30px 40px;">
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
                <div style="display: flex; align-items: center; margin-bottom: 16px;">
                  <span style="font-size: 24px; margin-right: 12px;">${eventTypeEmoji[e.eventType]}</span>
                  <span style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${eventTypeLabel[e.eventType]}</span>
                </div>
                <h2 style="margin: 0 0 16px; color: #1e293b; font-size: 20px; font-weight: 700;">${e.title}</h2>
                <p style="margin: 0 0 20px; color: #64748b; font-size: 14px; line-height: 1.6;">${e.description}</p>
                
                <!-- Event Info Grid -->
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-top: 1px solid #e2e8f0;">
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 18px; margin-right: 12px;">📅</span>
                        <div>
                          <div style="color: #64748b; font-size: 12px; font-weight: 500;">DATE</div>
                          <div style="color: #1e293b; font-size: 14px; font-weight: 600;">${formattedDate}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-top: 1px solid #e2e8f0;">
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 18px; margin-right: 12px;">⏰</span>
                        <div>
                          <div style="color: #64748b; font-size: 12px; font-weight: 500;">TIME</div>
                          <div style="color: #1e293b; font-size: 14px; font-weight: 600;">${formattedTime} (${e.duration} minutes)</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-top: 1px solid #e2e8f0;">
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 18px; margin-right: 12px;">📍</span>
                        <div>
                          <div style="color: #64748b; font-size: 12px; font-weight: 500;">LOCATION</div>
                          <div style="color: #1e293b; font-size: 14px; font-weight: 600;">${e.location}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-top: 1px solid #e2e8f0;">
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 18px; margin-right: 12px;">👤</span>
                        <div>
                          <div style="color: #64748b; font-size: 12px; font-weight: 500;">HOST</div>
                          <div style="color: #1e293b; font-size: 14px; font-weight: 600;">${e.hostName}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  ${e.zoomLink ? `
                  <tr>
                    <td style="padding: 12px 0; border-top: 1px solid #e2e8f0;">
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 18px; margin-right: 12px;">🔗</span>
                        <div style="flex: 1;">
                          <div style="color: #64748b; font-size: 12px; font-weight: 500;">JOIN LINK</div>
                          <a href="${e.zoomLink}" style="color: #2563eb; font-size: 14px; font-weight: 600; text-decoration: none;">${e.zoomLink}</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </td>
          </tr>
          <!-- Calendar Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <p style="margin: 0 0 16px; color: #64748b; font-size: 14px;">
                📎 A calendar invite (.ics file) is attached to this email
              </p>
              <a href="https://upskillintech.com/events" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                View All Events
              </a>
            </td>
          </tr>
          <!-- What to Expect -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
                <h3 style="margin: 0 0 8px; color: #92400e; font-size: 14px; font-weight: 600;">📝 What to Expect</h3>
                <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 13px; line-height: 1.6;">
                  <li>You'll receive a reminder email 24 hours before the event</li>
                  <li>Join link will be sent 30 minutes before start time</li>
                  <li>Have questions ready for the Q&A session</li>
                </ul>
              </div>
            </td>
          </tr>
          <!-- Registration ID -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Registration ID: <strong>${e.registrationId || 'N/A'}</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2024 UpskillinTech. All rights reserved.
              </p>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                Need to cancel? <a href="https://upskillintech.com/events/cancel" style="color: #8b5cf6;">Manage your registration</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send event registration confirmation email with calendar invite
 */
export async function sendEventRegistrationEmail(
  email: string,
  event: EventDetails
): Promise<{ success: boolean; error?: string }> {
  if (!SENDGRID_API_KEY) {
    console.warn('[EmailService] Cannot send email: SendGrid not configured');
    return { success: false, error: 'Email service not configured' };
  }

  const html = generateEventRegistrationEmailHtml(event);
  const icsContent = generateICSCalendarInvite(event);
  const icsBase64 = Buffer.from(icsContent).toString('base64');

  try {
    // Use host email for webinar registrations, otherwise use default sender
    const senderEmail = event.eventType === 'webinar' && event.hostEmail 
      ? event.hostEmail 
      : SENDER_EMAIL;
    const senderName = event.eventType === 'webinar' && event.hostName
      ? event.hostName
      : SENDER_NAME;

    const msg = {
      to: email,
      from: {
        email: senderEmail,
        name: senderName,
      },
      subject: `You're Registered: ${event.title}`,
      text: `Event Registration Confirmed!

You're registered for: ${event.title}

Event Details:
- Date: ${event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Time: ${event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
- Duration: ${event.duration} minutes
- Location: ${event.location}
- Host: ${event.hostName}

${event.description}

Registration ID: ${event.registrationId || 'N/A'}

A calendar invite is attached to this email.

---
© 2024 UpskillinTech. All rights reserved.`,
      html,
      attachments: [
        {
          content: icsBase64,
          filename: `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`,
          type: 'text/calendar',
          disposition: 'attachment',
        },
      ],
    };

    await sgMail.send(msg);
    console.log(`[EmailService] Event registration email sent to ${email} for "${event.title}"`);
    return { success: true };
  } catch (error: any) {
    console.error('[EmailService] Failed to send event registration email:', error?.response?.body || error);
    return { 
      success: false, 
      error: error?.response?.body?.errors?.[0]?.message || 'Failed to send email' 
    };
  }
}


/**
 * Send 24-hour reminder email for webinar
 */
export async function sendWebinarReminderEmail(
  email: string,
  name: string,
  webinarDetails: {
    title: string;
    date: string;
    time: string;
    zoomLink: string;
  }
): Promise<{ success: boolean; error?: string }> {
  if (!SENDGRID_API_KEY) {
    console.warn('[EmailService] Cannot send email: SendGrid not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const msg = {
      to: email,
      from: {
        email: 'amaka.adiuku@gmail.com',
        name: 'Dr. Amaka Adiuku',
      },
      subject: '⏰ Reminder: Your Webinar Starts Tomorrow!',
      text: `Hi ${name},

This is a friendly reminder that you're registered for our webinar tomorrow!

Webinar: ${webinarDetails.title}
Date: ${webinarDetails.date}
Time: ${webinarDetails.time}
Duration: 90 minutes

Join Zoom Meeting:
${webinarDetails.zoomLink}

What to Prepare:
• A quiet space for learning
• Notebook for taking notes
• Questions you'd like to ask

We're excited to see you there!

If you have any questions before the webinar, feel free to reply to this email.

Best regards,
Dr. Amaka Adiuku
UpskillinTech

---
© 2026 UpskillinTech. All rights reserved.`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webinar Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);">
              <div style="font-size: 48px; margin-bottom: 16px;">⏰</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Webinar Tomorrow!</h1>
              <p style="margin: 12px 0 0; color: #f0fdf4; font-size: 16px;">Don't miss your exclusive AI learning session</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px; color: #e2e8f0; font-size: 18px; line-height: 1.6;">
                Hi <strong style="color: #10b981;">${name}</strong>,
              </p>
              
              <p style="margin: 0 0 32px; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                This is a friendly reminder that you're registered for our webinar <strong>tomorrow</strong>! We're excited to have you join us.
              </p>
              
              <!-- Webinar Details Card -->
              <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 2px solid #10b981; border-radius: 12px;">
                <h2 style="margin: 0 0 20px; color: #10b981; font-size: 22px; font-weight: bold;">${webinarDetails.title}</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 80px;">📅 Date:</td>
                    <td style="padding: 8px 0; color: #e2e8f0; font-size: 16px; font-weight: 600;">${webinarDetails.date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">⏰ Time:</td>
                    <td style="padding: 8px 0; color: #e2e8f0; font-size: 16px; font-weight: 600;">${webinarDetails.time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">⌛ Duration:</td>
                    <td style="padding: 8px 0; color: #e2e8f0; font-size: 16px; font-weight: 600;">90 minutes</td>
                  </tr>
                </table>
              </div>
              
              <!-- Zoom Link Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${webinarDetails.zoomLink}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                  Join Zoom Meeting
                </a>
              </div>
              
              <!-- Preparation Tips -->
              <div style="margin: 32px 0; padding: 24px; background-color: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; border-radius: 8px;">
                <h3 style="margin: 0 0 16px; color: #10b981; font-size: 18px; font-weight: 600;">What to Prepare:</h3>
                <ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 15px; line-height: 1.8;">
                  <li>A quiet space for learning</li>
                  <li>Notebook for taking notes</li>
                  <li>Questions you'd like to ask</li>
                </ul>
              </div>
              
              <p style="margin: 32px 0 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                We're excited to see you there! If you have any questions before the webinar, feel free to reply to this email.
              </p>
              
              <p style="margin: 24px 0 0; color: #e2e8f0; font-size: 16px;">
                Best regards,<br>
                <strong style="color: #10b981;">Dr. Amaka Adiuku</strong><br>
                <span style="color: #94a3b8;">UpskillinTech</span>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #0f172a; border-top: 1px solid #334155;">
              <p style="margin: 0; color: #64748b; font-size: 13px;">
                © 2026 UpskillinTech. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    };

    await sgMail.send(msg);
    console.log(`[EmailService] Webinar reminder email sent to ${email}`);
    return { success: true };
  } catch (error: any) {
    console.error('[EmailService] Failed to send webinar reminder email:', error?.response?.body || error);
    return { 
      success: false, 
      error: error?.response?.body?.errors?.[0]?.message || 'Failed to send email' 
    };
  }
}


/**
 * Send admin notification email when someone registers for webinar
 */
export async function sendWebinarRegistrationNotification(
  registrationData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    role?: string;
    registrationId: number;
    registeredAt: Date;
  }
): Promise<{ success: boolean; error?: string }> {
  if (!SENDGRID_API_KEY) {
    console.warn('[EmailService] Cannot send email: SendGrid not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const msg = {
      to: 'amaka.adiuku@gmail.com',
      from: {
        email: SENDER_EMAIL,
        name: SENDER_NAME,
      },
      subject: `🎉 New Webinar Registration: ${registrationData.name}`,
      text: `New Webinar Registration

Someone just registered for your webinar "Build the Right AI Skillset"!

Registration Details:
- Name: ${registrationData.name}
- Email: ${registrationData.email}
- Phone: ${registrationData.phone || 'Not provided'}
- Company: ${registrationData.company || 'Not provided'}
- Role: ${registrationData.role || 'Not provided'}
- Registration ID: REG-${registrationData.registrationId}
- Registered At: ${registrationData.registeredAt.toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })}

View all registrations in your admin dashboard:
https://upskillintech.com/admin/webinar-registrations

---
© 2026 UpskillinTech. All rights reserved.`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Webinar Registration</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);">
              <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold;">New Webinar Registration!</h1>
              <p style="margin: 8px 0 0; color: #f0fdf4; font-size: 15px;">Someone just signed up for your AI webinar</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 24px; color: #1e293b; font-size: 20px; font-weight: 600;">Registration Details</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Name</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 15px; font-weight: 600;">${registrationData.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Email</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <a href="mailto:${registrationData.email}" style="color: #10b981; font-size: 15px; text-decoration: none;">${registrationData.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Phone</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 15px;">${registrationData.phone || '<span style="color: #94a3b8;">Not provided</span>'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Company</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 15px;">${registrationData.company || '<span style="color: #94a3b8;">Not provided</span>'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Role</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 15px;">${registrationData.role || '<span style="color: #94a3b8;">Not provided</span>'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Registration ID</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 15px; font-weight: 600;">REG-${registrationData.registrationId}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Registered At</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <span style="color: #1e293b; font-size: 15px;">${registrationData.registeredAt.toLocaleString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </td>
                </tr>
              </table>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://upskillintech.com/admin/webinar-registrations" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                  View All Registrations
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 13px;">
                © 2026 UpskillinTech. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    };

    await sgMail.send(msg);
    console.log(`[EmailService] Admin notification sent for registration ${registrationData.registrationId}`);
    return { success: true };
  } catch (error: any) {
    console.error('[EmailService] Failed to send admin notification:', error?.response?.body || error);
    return { 
      success: false, 
      error: error?.response?.body?.errors?.[0]?.message || 'Failed to send email' 
    };
  }
}
