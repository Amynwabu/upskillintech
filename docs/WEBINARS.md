# Webinar system

The webinar feature extends the existing React, Wouter, tRPC, Drizzle/MySQL,
SendGrid and Netlify architecture. It does not introduce a second application,
router, ORM or email provider.

## Public routes

- `/webinar/ai-employee` — short canonical campaign route
- `/webinars/build-your-first-ai-employee` — reusable slug route
- `/webinars/:slug/registered` — confirmation page using a browser-session token
- `/webinars/:slug/privacy` — webinar data-use notice
- `/webinars/:slug/unsubscribe?token=...` — secure preferences and cancellation

The existing Netlify SPA redirect supports direct access and refreshes.

## Database

Migration `drizzle/0011_abnormal_lady_mastermind.sql` creates `webinars`,
`webinar_email_queue`, and `webinar_email_events`, then extends the existing
`webinar_registrations` table without deleting legacy data.

```bash
pnpm db:migrate
pnpm db:seed:webinar
```

The seed is idempotent and creates the AI Employee webinar as a **draft** with
no fabricated date or meeting credentials. Before publishing, set:

- `eventStartAt` and `eventEndAt` in UTC
- registration opening and closing timestamps
- `Europe/London` as the event timezone
- speaker name, title, biography and photograph
- capacity, meeting provider and private meeting URL
- support and Masterclass URLs
- recording policy
- status to `published`

## Registration and communication

The browser and server validate the form. The server normalises email addresses,
rate-limits repeated attempts, ignores a hidden honeypot, hashes rather than
stores the request address, and enforces one active email registration per
webinar. Event consent and optional marketing consent are stored separately.

Registration, email queue creation and audit event creation occur in one
transaction. Confirmation is queued immediately. The 48-hour and one-hour
reminders are queued only when their scheduled time is still in the future.

The Netlify function `webinar-reminders` runs every ten minutes, claims due
records, sends through SendGrid and retries failures up to three times. Pending
messages are cancelled when a registration is cancelled.

## Environment variables

Set these in Netlify, never in `netlify.toml` or source control:

- `DATABASE_URL`
- `SITE_URL`
- `SENDGRID_API_KEY`
- `SENDGRID_SENDER_EMAIL` (legacy-compatible sender setting)
- `EMAIL_FROM_NAME`
- `EMAIL_FROM_ADDRESS`
- `EMAIL_REPLY_TO`
- `WEBINAR_SUPPORT_EMAIL`
- `WEBINAR_IP_HASH_SALT`
- `WEBINAR_EMAIL_BATCH_SIZE` (optional; defaults to 25)
- `WEBINAR_ADMIN_EMAIL` (operational contact only)
- `EMAIL_WEBHOOK_SECRET` (when delivery webhooks are configured)

The SendGrid sender address must be verified before production email will work.

## Local development and verification

```bash
pnpm install
pnpm db:migrate
pnpm db:seed:webinar
pnpm dev
pnpm test
pnpm check
pnpm build
```

Without `DATABASE_URL`, the public landing page uses safe draft content so it
can be designed locally; registration remains closed and no data is accepted.

To invoke the reminder processor locally with Netlify CLI:

```bash
pnpm exec netlify functions:invoke webinar-reminders
```

Use a test database and verified sandbox recipient when testing email.

## Administration and export

Admin procedures reuse the existing authenticated admin role. They provide
registration search/filter data, attendance changes, confirmation resend and a
CSV export. Spreadsheet formula prefixes (`=`, `+`, `-`, `@`) are neutralised.

## Creating a new webinar

1. Insert one row in `webinars` with a unique slug.
2. Set timezone-aware UTC timestamps and its IANA display timezone.
3. Keep the record in `draft` until the date, speaker, meeting and privacy
   details are complete.
4. Publish the record and use `/webinars/:slug`.
5. No page duplication is required; the public route loads content by slug.

If a webinar date changes, update future pending queue records to the new
48-hour and one-hour times before announcing the change. A dedicated reschedule
admin control is a future enhancement.

## Troubleshooting failed email

1. Check that the SendGrid key and verified sender are configured in Netlify.
2. Filter queue items with `status = failed` and inspect `lastError`.
3. Confirm that the registration has not been cancelled.
4. Reset an approved item to `pending` with `attemptCount = 0`, or use the admin
   resend-confirmation action.
5. Never log email bodies, API keys, meeting passwords or full recipient lists.

