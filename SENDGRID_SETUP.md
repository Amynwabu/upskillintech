# SendGrid Email Integration Setup

The newsletter system is integrated with SendGrid to automatically send welcome emails to new subscribers. The integration is designed to fail gracefully—newsletter subscriptions will work even if SendGrid is not configured.

## Current Status

✅ SendGrid integration code is implemented  
✅ Newsletter subscriptions work without SendGrid  
⚠️ SendGrid API key needs to be configured to enable email sending

## How to Enable Email Sending

### Step 1: Create a SendGrid Account

1. Sign up for a free SendGrid account at https://sendgrid.com
   - Free tier includes 100 emails/day (sufficient for most use cases)
2. Complete email verification for your account

### Step 2: Verify a Sender Email Address

Before you can send emails, you must verify a sender email address:

1. Log in to SendGrid dashboard
2. Go to **Settings → Sender Authentication**
3. Click **Verify a Single Sender**
4. Fill in the form with your details:
   - From Name: `UpskillinTech Hub` (or your preferred name)
   - From Email Address: Your email (e.g., `noreply@yourdomain.com`)
   - Reply To: Your support email
   - Company details (required by SendGrid)
5. Click **Create** and check your email for verification link
6. Click the verification link to complete the process

### Step 3: Create an API Key

1. In SendGrid dashboard, go to **Settings → API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "UpskillinTech Newsletter")
4. Choose **Full Access** or at minimum select **Mail Send** permission
5. Click **Create & View**
6. **IMPORTANT:** Copy the API key immediately (you'll only see it once!)
   - The key should start with `SG.`
   - Example format: `SG.xxxxxxxxxxxxxxxxxxxxxxxx`

### Step 4: Add API Key to Your Project

#### Option A: Through Manus Management UI
1. Open your project in Manus
2. Go to **Settings → Secrets**
3. Add a new secret:
   - Key: `SENDGRID_API_KEY`
   - Value: Your SendGrid API key (starting with `SG.`)
4. Save the secret

#### Option B: Through Environment Variables (Local Development)
Add to your `.env` file:
```
SENDGRID_API_KEY=SG.your_actual_api_key_here
```

### Step 5: Configure Sender Email (Optional)

By default, emails are sent from `noreply@upskillintech.com`. To use a different sender email:

1. Add `SENDGRID_SENDER_EMAIL` environment variable:
   ```
   SENDGRID_SENDER_EMAIL=your-verified-email@yourdomain.com
   ```
2. Make sure this email is verified in SendGrid (Step 2)

### Step 6: Test Email Sending

1. Subscribe to the newsletter using your own email address
2. Check your inbox for the welcome email
3. If you don't receive it:
   - Check spam/junk folder
   - Check SendGrid dashboard → Activity for delivery status
   - Check server logs for error messages

## Email Template

The welcome email includes:
- Branded header with UpskillinTech Hub logo
- Personalized welcome message
- List of benefits (course updates, resources, events, offers)
- Call-to-action button to explore courses
- Professional HTML design with fallback plain text version
- Unsubscribe link (placeholder for now)

## Troubleshooting

### "API key does not start with SG."
- Make sure you copied the complete API key from SendGrid
- The key must start with `SG.` followed by a long string

### "The provided authorization grant is invalid"
- Your API key is incorrect or has been revoked
- Create a new API key in SendGrid and update the environment variable

### "Sender email not verified"
- You must verify your sender email address in SendGrid first
- Go to Settings → Sender Authentication → Verify a Single Sender

### Emails not being received
- Check SendGrid Activity dashboard for delivery status
- Verify the recipient email is correct
- Check spam/junk folder
- Ensure you haven't exceeded SendGrid's free tier limits (100/day)

### Newsletter works but no emails sent
- This is expected behavior when SendGrid is not configured
- Check server logs for warnings about email service not being configured
- The subscription will still be saved to the database

## Monitoring

Check server logs for email-related messages:
- `[EmailService] Welcome email sent successfully to {email}` - Success
- `[EmailService] Failed to send welcome email` - Error
- `[EmailService] SendGrid not configured` - API key missing

## Future Enhancements

Consider adding:
- Email templates for different types of notifications
- Bulk email sending for newsletters
- Email analytics and open/click tracking
- Unsubscribe link implementation
- Email scheduling for drip campaigns
- A/B testing for email content
