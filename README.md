# IrisLabs — marketing site

Six-page marketing site for IrisLabs, a Mumbai-based AI/product studio.
Next.js 16 (App Router) · TypeScript · Tailwind v4 · deployed on Vercel.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # eslint
npx tsc --noEmit
```

## Routes

| Route | Contents |
|---|---|
| `/` | Hero, problem framing, pillars, work teaser, risk-reversal CTA |
| `/services` | All ten services by pillar, each with a scope terminal, plus process |
| `/work` | Live client projects grouped by stack |
| `/about` | Studio thesis, the three layers, principles, founder profiles |
| `/pricing` | Starting prices in USD/INR |
| `/contact` | Budget qualifier → booking form, FAQ |

## Architecture notes

- **Design tokens** live in `app/globals.css` as CSS custom properties (obsidian
  ground, gold signal). Tailwind v4 reads them via `@theme`.
- **Content is data-driven** — nearly all copy lives in `lib/data.ts`, so sections
  are presentation only.
- **Motion** is CSS/IntersectionObserver, no animation library, to stay inside the
  performance budget. `prefers-reduced-motion` is honoured throughout.
- **Page transitions** (`components/EyeTransition.tsx`) play an Eye-of-Horus
  motion graphic while the route resolves underneath — routing is never delayed
  by the animation.
- **Terminal blocks** (`components/Terminal.tsx`) are one shared component driven
  by scripts in `lib/data.ts`.

## Environment

Copy `.env.example` to `.env.local`. Both variables are optional in development.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends booking-form submissions by email |
| `BOOKING_NOTIFY_EMAIL` | Where those submissions are delivered |

## Known pre-production blockers

Audited 7 Sep 2026. These are open and tracked — see `docs/` for the PRDs.

1. **Booking form drops leads without `RESEND_API_KEY`.** The submission is only
   logged server-side, yet the visitor is told they'll be contacted.
2. **Rate limiting is in-process** and therefore ineffective on serverless.
3. **Sending domain unverified** — Resend `from:` is still `onboarding@resend.dev`.
4. **Five of twelve portfolio previews render blank.** The Shopify-hosted sites
   send `frame-ancestors 'none'`, so they refuse to embed.
5. **Domain not registered** — `irislabs.dev` is a placeholder in canonical URLs,
   sitemap, robots and JSON-LD.
6. **Contrast**: `--text-low` (3.67:1) and `--gold-dim` (4.04:1) fall below WCAG
   AA for small text.
