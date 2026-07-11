# Deep Petrochemicals Limited — Website

Marketing and B2B enquiry website for **Deep Petrochemicals Limited**, a petrochemical
manufacturer at Saykha GIDC, Bharuch, Gujarat, India. Built to generate qualified
enquiries, establish credibility, and rank for product + location search terms.

Products: **Methanol · Isobutylene · MTBE · Specialty Chemicals**.

---

## Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + Turbopack |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config — no `tailwind.config.ts`) |
| Fonts | `next/font` — Inter (body) + Sora (display), self-hosted |
| Images | `next/image` (WebP/AVIF, lazy) |
| Rendering | Static Site Generation (SSG) — every page prerendered except the enquiry API |
| SEO | Metadata API, JSON-LD (Organization, LocalBusiness, Product, BreadcrumbList, BlogPosting), `sitemap.ts`, `robots.ts`, OG images |

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
npm install                    # install dependencies
cp .env.example .env.local     # then fill in values (see below)
npm run dev                    # start dev server → http://localhost:3000
```

**Scripts**

```bash
npm run dev      # local dev server (Turbopack)
npm run build    # production build (runs TypeScript + ESLint, prerenders all pages)
npm run start    # serve the production build
npm run lint     # ESLint
```

## Environment variables

All are **optional** — the site builds and runs without them. Copy `.env.example`
to `.env.local` (git-ignored) and fill in what you need.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for sitemap, robots, canonical tags and OG URLs. Set to the real domain. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits-only intl format (e.g. `918238441536`). When set, the contact + quote forms hand off to WhatsApp pre-filled with the enquiry, and the floating WhatsApp button appears. |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Apps Script Web-app URL that logs each enquiry to a Google Sheet. See [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md). |

## How enquiries work

The contact and quote forms POST to `app/api/enquiry/route.ts`, which validates input and
drops honeypot spam. Two independent, free channels:

1. **WhatsApp hand-off** *(instant, customer-facing)* — on submit the browser opens a
   WhatsApp chat to `NEXT_PUBLIC_WHATSAPP_NUMBER` with every filled field pre-formatted.
2. **Google Sheets** *(permanent lead log)* — each enquiry appends a row to your Sheet via
   a Google Apps Script web app (with optional email notification). Setup takes ~5 minutes.

If no channel is configured, submissions are validated and logged server-side (the API
honestly reports `delivered: false`).

## Content is data-driven

`data/` is the single source of truth — edit these, not the page markup:

| File | Controls |
|---|---|
| `data/company.ts` | Company facts, address, contact, certifications, HSE targets. Unknown facts use a `TBD` sentinel and are **hidden** until set (nothing false is ever rendered). |
| `data/products.ts` | The four products — grades, specs, applications, SEO titles. |
| `data/blog.ts` | Blog posts (slug → URL, auto-added to the build + sitemap). |
| `data/downloads.ts` | TDS library (PDFs go in `public/tds/`). |
| `data/nav.ts` | Header / footer navigation. |
| `app/globals.css` | Brand colours + typography (Tailwind v4 `@theme`). |

## Project structure

```
app/            App Router pages (home, products, about, operations, sustainability,
                contact, request-a-quote, blog, downloads, quality, legal, careers)
  api/enquiry/  Enquiry Route Handler (WhatsApp payload + Google Sheets delivery)
components/     Header, Footer, forms, home sections, shared UI + icons
data/           Single source of truth (see above)
lib/            seo.ts (JSON-LD), enquiry.ts, whatsapp.ts
public/         Logo, emblem, OG image, (TDS PDFs)
scripts/        google-sheets-webhook.gs (paste into Google Apps Script)
```

## Deployment

Standard Next.js build — deploy to Vercel or any Node host:

```bash
npm run build && npm run start
```

Set the environment variables on the host. See [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md)
for the full go-live checklist (domain, delivery, Search Console, Analytics, Google
Business Profile, brand assets).

## Further docs

- [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md) — connect enquiries to a Google Sheet.
- [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md) — pre-launch QA results + owner tasks.

---

© Deep Petrochemicals Limited. All rights reserved.
