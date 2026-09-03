# Stripe Checkout setup

UpskillinTech uses Stripe-hosted Checkout with dynamic payment methods. Stripe decides which enabled methods are eligible for the transaction, customer region, currency, amount, browser, and device. The application does not render placeholder methods or collect payment credentials.

## Local MySQL development environment

The isolated development database uses `docker-compose.dev.yml`, port `3307` by default, and the named volume `upskillintech_mysql_dev`. It does not stop, reuse, or delete databases belonging to other projects.

1. Install Docker Desktop from the official Docker distribution if `docker --version` is unavailable.
2. Copy `.env.example` to the ignored `.env` file.
3. Set unique development-only values for `MYSQL_PASSWORD` and `MYSQL_ROOT_PASSWORD` in `.env`.
4. Put the same application password in `DATABASE_URL`, for example `mysql://upskill:<local-password>@127.0.0.1:3307/upskillintech`.
5. Confirm port 3307 is free, then start MySQL:

```text
docker compose -f docker-compose.dev.yml up -d mysql
docker compose -f docker-compose.dev.yml ps
```

Do not use `docker compose down -v`; that deletes the local database volume.

After MySQL is healthy, run the data safety check before migration:

```text
pnpm db:preflight:payments
pnpm db:migrate
pnpm db:seed:payments
pnpm db:verify:payments
```

`db:preflight:payments` refuses non-local database hosts and reports duplicate/orphaned enrolments without deleting anything. `db:migrate` applies committed migrations without generating new migration files. The idempotent development seed creates a synthetic buyer, a £699 `AI Automation Masterclass`, a free course, and an already-enrolled test case. It must never be run against production.

The seeded masterclass must report:

```text
price: 69900
currency: gbp
isPremium: true
isPublished: true
```

The seed creates a database user for deterministic data tests; it does not bypass or replace the application's OAuth login. Interactive checkout still requires a user authenticated through the real application flow.

## Hosting environment

Set these values separately for test and production:

```text
STRIPE_ENABLED=true
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
APP_URL=https://upskillintech.com
DATABASE_URL=...
```

Never expose the secret or webhook signing key to Vite/client variables. This hosted Checkout implementation does not require a Stripe publishable key in the browser.

Apply database migration `drizzle/0012_secure_stripe_checkout.sql` before enabling payments.

For local webhook forwarding with the official Stripe CLI:

```text
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Put the temporary `whsec_...` printed by `stripe listen` in the local environment only. Do not commit it. In a separate terminal, start the application with test-mode configuration. Signature verification must remain enabled.

Validate that the local environment contains test-scoped—not live—Stripe settings:

```text
pnpm stripe:verify:test-env
```

If the CLI is absent, install it only from Stripe's official distribution. Set `STRIPE_SECRET_KEY` to a real `sk_test_...` key and reject any `sk_live_...` key during this phase. Start the app with `pnpm dev`, sign in using the normal authentication flow, and open `/checkout?courseId=<seeded-course-id>`.

## Webhook actions

| Stripe event | Application action |
| --- | --- |
| `checkout.session.completed` | Mark the order paid and enrol when `payment_status=paid`; otherwise mark processing |
| `checkout.session.async_payment_succeeded` | Validate amount/currency, mark paid, and enrol exactly once |
| `checkout.session.async_payment_failed` | Mark a pending/processing order failed |
| `checkout.session.expired` | Mark a pending/processing order cancelled |
| `payment_intent.processing` | Mark a pending order processing |
| `payment_intent.payment_failed` | Mark a pending/processing order failed |
| `payment_intent.canceled` | Mark a pending/processing order failed |
| `charge.refunded` | Persist refunded amount and mark partially refunded or refunded |

Every handled event is signature-verified. Processed event IDs are stored in `stripe_webhook_events`, and the `(userId, courseId)` enrolment key is unique. Invalid terminal-state regressions are ignored. Refunds do not currently revoke course access; that is an explicit business-policy decision to make separately.

## Stripe Dashboard setup

- Activate Cards and confirm Visa, Mastercard, and American Express support for the account.
- Enable Apple Pay and Google Pay. Stripe Checkout renders wallets only on compatible devices/browsers. Because payment is collected on Stripe's hosted domain, follow the Dashboard's domain instructions only if Stripe requests verification for your account or if the integration later moves to an embedded Payment Element.
- Request/activate PayPal if it is offered to this UK Stripe account.
- Activate Afterpay/Clearpay. Stripe localises the UK-facing hosted Checkout label and applies amount/currency eligibility.
- Activate Klarna. Klarna presents the financing choices for which the customer is eligible; UpskillinTech does not promise a particular plan.
- Confirm GBP settlement and the business/bank configuration.
- Configure the public business name, support details, and statement descriptor.
- Create a production webhook endpoint at `https://upskillintech.com/api/webhooks/stripe`.
- Subscribe it to `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`, `payment_intent.processing`, `payment_intent.payment_failed`, `payment_intent.canceled`, and `charge.refunded`.
- Copy that endpoint's signing secret into `STRIPE_WEBHOOK_SECRET` in the hosting environment.
- Complete the same configuration in test mode and test there before adding live keys.

## Test checklist

- Successful and declined card payments
- Apple Pay and Google Pay on supported test devices
- PayPal, Clearpay, and Klarna after each method is enabled in test mode
- Cancellation, asynchronous failure, and refresh of the confirmation page
- Duplicate button/network request and duplicate webhook delivery
- Mobile layout
- A £699.00 course and a second course with a different server-side database price

Use Stripe test payment methods only. Do not make a real £699 transaction for verification.

## Production launch checklist

- [ ] Database migration applied
- [ ] Stripe account verified
- [ ] Bank account configured
- [ ] GBP settlement confirmed
- [ ] Business information completed
- [ ] Statement descriptor configured
- [ ] Cards enabled
- [ ] Apple Pay enabled
- [ ] Google Pay enabled
- [ ] Clearpay enabled if approved
- [ ] Klarna enabled if approved
- [ ] PayPal enabled only if available
- [ ] Production domain configured
- [ ] Production webhook created
- [ ] Correct webhook events selected
- [ ] Live webhook secret configured
- [ ] Live Stripe secret key configured
- [ ] Test keys removed from the production environment
- [ ] Successful production smoke test planned
- [ ] Privacy policy available
- [ ] Terms and conditions available
- [ ] Refund and cancellation policy available
- [ ] Customer support details configured

### Required production migration sequence

Do not run the development seed against production. Before applying migration 0012 to production:

1. Create and verify a recoverable database backup.
2. Inspect duplicate enrolments and orphaned user/course references.
3. Resolve any findings through an approved data-repair process; never silently delete records.
4. Apply the migration.
5. Verify tables, columns, constraints, indexes, defaults, and timestamps.
6. Deploy the application.
7. Configure the live webhook and only its supported events.
8. Set live environment variables during the controlled launch window.
9. Enable Stripe and perform a small, controlled production smoke test.

Required production variable names, without values:

```text
STRIPE_ENABLED=true
STRIPE_SECRET_KEY=<live secret supplied during launch>
STRIPE_WEBHOOK_SECRET=<live webhook secret supplied during launch>
APP_URL=https://upskillintech.com
DATABASE_URL=<production database>
```

Do not enable live mode until every applicable item is complete and the test-mode end-to-end report passes.
