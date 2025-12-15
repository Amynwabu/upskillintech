import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL || 'noreply@upskillintech.com';
const SENDER_NAME = 'UpskillinTech Hub';

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
      subject: 'Welcome to UpskillinTech Hub Newsletter! 🚀',
      text: `Welcome to UpskillinTech Hub!

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
The UpskillinTech Hub Team

---
You're receiving this email because you subscribed to our newsletter. If you wish to unsubscribe, click here: [unsubscribe link]`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to UpskillinTech Hub</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #10b981; font-size: 32px; font-weight: bold;">UpskillinTech Hub</h1>
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
                <strong>The UpskillinTech Hub Team</strong>
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
