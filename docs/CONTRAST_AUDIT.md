# Colour and contrast audit

This audit records the intended main surface treatment for every routed page.
Shared navigation and footer surfaces use the explicit dark-background logo.
The audit is source-based; automated type/build checks do not replace manual
visual testing with real content and assistive technology.

## Shared rules

| Surface | Heading | Body | Secondary/muted | Border |
|---|---|---|---|---|
| White/light | `#000000` | `#111111` | `#374151` / `#4B5563` | `#DCE4E6` |
| Dark/deep | `#FFFFFF` | `#D7DEE5` | `#B5C0C9` | `#29323D` |

The brand teal `#439288` has a 3.68:1 ratio against white. It is therefore
reserved for accents, icons and large bold branded CTA text. Compact shared
controls use the darker `#34766E`, which has a 5.30:1 ratio against white.

## Route review

| Route or page | Main surface | Treatment |
|---|---|---|
| `/` Home | Mixed dark and light sections | Semantic light sections and dark global text rules |
| `/about` | Dark | White headings, soft-white body |
| `/contact` | Dark | White headings, soft-white body, explicit controls |
| `/resources` | Dark | White headings, soft-white cards/content |
| `/resources/blog` | Dark with light badges | Dark text explicitly assigned to light badges |
| `/resources/ai-guides` | Dark | White headings, soft-white body |
| `/resources/case-studies` | Dark | White headings, soft-white body |
| `/resources/webinars` | Dark | White headings, soft-white body |
| `/resources/workflows` | Dark | White headings, soft-white body |
| `/resources/research` | Dark | White headings, soft-white body |
| `/resources/templates` | Dark | White headings, soft-white body |
| `/blog/:slug` | Dark | White headings, soft-white body |
| `/programs` | Dark | White headings, soft-white body |
| `/masterclass`, `/masterclasses` | Dark | White headings, soft-white body |
| `/challenge` | Dark | White headings, soft-white body |
| `/enterprise` | Dark | White headings, soft-white body |
| `/learn` | Application dark | Shared dark card and foreground tokens |
| `/learn/:pathId` | Application dark | Shared dark card and foreground tokens |
| `/learn/:courseId/player` | Application dark | Shared dark card and foreground tokens |
| `/courses/:id` | Application dark | Shared dark card and foreground tokens |
| `/community` | Dark | White headings, soft-white body |
| `/events` | Dark | White headings, soft-white body |
| `/consult` | Dark | White headings, soft-white body |
| `/transform` | Dark | White headings, soft-white body |
| `/newsletter` | Dark with light cards | Light cards now use black/near-black text |
| `/newsletter/archive` | Dark with light cards | Light cards now use black/near-black text |
| `/newsletter/preferences` | Application dark | Shared form and dark surface tokens |
| `/newsletter/:slug` | Dark with light related cards | Light cards now use black/near-black text |
| `/webinar/ai-employee` | Mixed | Explicit webinar light/dark tokens |
| `/webinars/:slug` | Mixed | Explicit webinar light/dark tokens |
| Webinar confirmation | Light | Near-black text and accessible form/control colours |
| Webinar privacy | Light | Black headings and near-black body |
| Webinar unsubscribe | Light | Black labels and near-black body |
| `/dashboard` | Dark application/sidebar | Explicit dark sidebar logo and foregrounds |
| `/profile` | Dark application | Shared dark card and foreground tokens |
| `/onboarding` | Dark application | Shared controls and form tokens |
| `/admin/emails` | Dark application | Shared cards, tables, dialogs and popovers |
| `/admin/email-analytics` | Dark application | Shared cards, tables and muted text |
| `/admin/webinar-registrations` | Light admin | Explicit light cards, table and controls |
| `/privacy` | Dark | Corrected soft-white legal copy |
| `/terms` | Dark | Removed dark grey text from dark background |
| `/cookies` | Dark | Semantic dark legal surface |
| `/404` | Light | White card with black/near-black text |

## Shared component review

- `Navbar`: deep background, solid white wordmark, white links, teal active state.
- Mobile navigation: deep background, white labels, readable muted section labels.
- `Footer`: deep background, solid white wordmark, white headings and
  `#D7DEE5` links.
- `DashboardLayout`: dark sidebar with explicit white logo variant.
- Cards: semantic `surface-light` and `surface-dark` variants override inherited
  foregrounds.
- Forms: white inputs use `#111111`; placeholders use `#6B7280`; focus uses the
  approved teal.
- Selects/dropdowns/dialogs: default to dark popovers with white foregrounds;
  light admin triggers inherit explicit dark text.
- Tables: light admin tables inherit black headings and near-black cell text.
- Accordions: inherit the explicit semantic surface in which they are placed.

