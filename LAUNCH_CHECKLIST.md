# Deep Petrochemicals — Launch Checklist

The site is **build-clean and QA-passed**. Everything below is what the *owner* must
supply or configure before / at go-live. No code changes are required for the env-var
items — the app reads them at build/runtime.

---

## Phase 8 QA — results (all passing ✅)

| Check | Result |
|---|---|
| Production build (`npm run build`) | ✅ Clean — 28 routes, TypeScript + ESLint pass |
| Static generation | ✅ 24 pages prerendered (SSG); only `/api/enquiry` + `/request-a-quote` are dynamic |
| Internal links (22 pages crawled) | ✅ No broken links |
| Mobile responsive (390px, real emulation) | ✅ No horizontal overflow; menu + layout clean |
| Mobile hamburger menu | ✅ Opens/closes correctly (verified in browser) |
| Contact & quote forms | ✅ Submit end-to-end, show success state |
| Enquiry API (`/api/enquiry`) | ✅ Validates required fields, honeypot spam trap |
| Heading structure | ✅ Exactly one `<h1>` per page |
| Image accessibility | ✅ No raw `<img>`; all via `next/image`; alt text present |
| Form labels | ✅ All inputs have associated `<label htmlFor>` |
| Focus states | ✅ Global `:focus-visible` ring on all interactive elements |
| JSON-LD | ✅ Organization + LocalBusiness (home), Product (products), BlogPosting + BreadcrumbList |
| Canonicals | ✅ Unique absolute canonical per page |
| `robots.txt` / `sitemap.xml` | ✅ Serve correctly; `/api` + `/styleguide` disallowed; styleguide `noindex` |
| 404 page | ✅ Returns proper 404 status with branded page |
| Image optimization | ✅ `next/image` WebP/AVIF pipeline active |

---

## 1. Must-do before launch (blocking)

- [ ] **Set the real domain.** In production env: `NEXT_PUBLIC_SITE_URL=https://www.<realdomain>`
      (currently placeholder `https://www.deeppetrochemicals.com`). This drives canonicals,
      sitemap, robots host, and OG URLs.
- [ ] **Enable enquiry delivery** (see `.env.example`):
  - **Google Sheets** (free, unlimited) — every enquiry appends a row to your Sheet
    (optional email notification per submission too). Follow `GOOGLE_SHEETS_SETUP.md`,
    then set `GOOGLE_SHEETS_WEBHOOK_URL`.
  - Until it's set, submissions are accepted + logged but **not persisted** (the API
    reports `delivered:false` honestly).
- [ ] **SSL / HTTPS** — ensure the host serves the site over HTTPS with a valid cert.

## 2. Owner facts still needed (replace placeholders in `data/company.ts`)

These are `TBD` sentinels today — nothing false renders, but these sections stay generic
until filled:

- [ ] Plant capacity (MTPA)
- [ ] Year founded
- [ ] Regions / countries served
- [ ] Phone number (enables click-to-call)
- [ ] Email domain (enables sales@ / procurement@ / corpcomm@ addresses)
- [ ] Saykha GIDC PIN code
- [ ] Which ISO certifications are actually **held** vs. **in progress**

## 3. Brand assets

- [ ] Final **logo as SVG** (purchased / de-watermarked) — replaces the interim keyed PNG
      lockup in `public/`.
- [ ] Real **Saykha plant hero photo** (optional) — currently a branded gradient placeholder.
- [ ] Product **TDS PDFs** → drop into `public/tds/` and set the `file` path in
      `data/downloads.ts` (they show "on request" until then).

## 4. Search / analytics setup (post-deploy)

- [ ] **Google Search Console** — verify the domain, submit `https://<domain>/sitemap.xml`.
- [ ] **Google Analytics 4** — create property; wire the ID (fires only after cookie consent).
- [ ] **Google Business Profile** — claim/verify the Saykha GIDC location for local SEO
      (matches the LocalBusiness JSON-LD + GeoCoordinates already embedded).

## 5. Nice-to-have

- [ ] Run a Lighthouse pass against the production URL (local build is already fast/SSG).
- [ ] Confirm OG card render via a social debugger (LinkedIn preview) once live.
- [ ] Legal review of `/privacy-policy` and `/terms-of-sale` (currently review-pending templates).

---

**Deploy command:** `npm run build` → `npm run start` (or deploy to Vercel/host of choice;
the app is a standard Next.js App Router build).
