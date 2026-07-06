# Contributing to UpskillinTech

Thanks for your interest in contributing! This document covers the basics for
getting a change from your machine into the project.

## Getting set up

1. Fork and clone the repository.
2. Install dependencies: `pnpm install`
3. Copy the environment template: `cp .env.example .env` and fill in the
   values you need (most features work without payment/email keys in
   development — `STRIPE_ENABLED=false` keeps checkout stubbed).
4. Start the dev server: `pnpm dev`

## Before you open a pull request

Run the same checks CI runs:

```bash
pnpm check          # TypeScript type-check
pnpm test           # Vitest test suite
pnpm build:netlify  # Production client build
```

All three must pass — CI runs them on every push and pull request.

## Guidelines

- Keep pull requests focused: one feature or fix per PR.
- Match the existing code style (Prettier is configured — run `pnpm format`).
- Frontend components live in `client/src/components`, pages in
  `client/src/pages`, backend routers in `server/routers`.
- Add or update tests in `server/**` for backend changes (payment, email,
  and enrolment flows especially).
- Write clear commit messages describing *why* the change is needed.

## Reporting issues

Open a GitHub issue with steps to reproduce, expected behaviour, and actual
behaviour. Screenshots help for UI issues.

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](./LICENSE).
