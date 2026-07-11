/**
 * SINGLE SOURCE OF TRUTH for company facts (PROJECT_BRIEF.md §1).
 *
 * Rules:
 *  - CONFIRMED facts are hard-coded below.
 *  - MISSING facts use the `TBD` sentinel. NEVER replace TBD with an invented
 *    value — swap in the real value the owner provides. Components should call
 *    `isKnown()` / `orFallback()` so nothing false is ever rendered.
 *
 * Owner-confirmed decisions (2026-07-11):
 *  - Legal name: "Deep Petrochemicals Limited"
 *  - Single site (head office + plant both at Saykha GIDC, Bharuch). No Surat.
 */

/**
 * Absolute site origin for sitemap/robots/canonical/OG (must be absolute).
 * Override via NEXT_PUBLIC_SITE_URL at build/deploy time. Default is a best-guess
 * placeholder for the [TBD] domain — set the env var to the real domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.deeppetrochemicals.com";

/** Sentinel for facts the owner has not yet supplied. */
export const TBD = "__TBD__" as const;
export type Maybe<T> = T | typeof TBD;

export function isKnown<T>(v: Maybe<T>): v is T {
  return v !== TBD;
}

/** Returns the value if known, else the provided fallback string. */
export function orFallback<T>(v: Maybe<T>, fallback: string): T | string {
  return isKnown(v) ? v : fallback;
}

export const COMPANY = {
  // ---- Identity -----------------------------------------------------------
  legalName: "Deep Petrochemicals Limited",
  shortName: "Deep Petrochemicals",

  // ---- Location (single site: office + plant) -----------------------------
  address: {
    line1: "Plot No. C-261",
    area: "Saykha GIDC",
    taluka: "Vagra",
    district: "Bharuch",
    state: "Gujarat",
    country: "India",
    pin: TBD as Maybe<string>, // [TBD] Saykha GIDC PIN code
  },
  mapsUrl: "https://maps.app.goo.gl/RAhMjPcXCgfJAY1y8",
  // Exact plant coordinates (resolved from mapsUrl).
  geo: { lat: 21.7755661, lng: 72.8198548 },

  // ---- Contact ------------------------------------------------------------
  phone: TBD as Maybe<string>, // [TBD] +91-XXXXXXXXXX
  // Set here OR via NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (env wins).
  // Digits only, intl format e.g. 919825012345 (country code + number, no +/spaces).
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || TBD) as Maybe<string>,
  emailDomain: TBD as Maybe<string>, // [TBD] e.g. "deeppetrochemicals.com"
  // Real canonical origin — only emitted in JSON-LD when NEXT_PUBLIC_SITE_URL is set.
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "") as string,

  // ---- Company profile ----------------------------------------------------
  yearFounded: TBD as Maybe<number>, // [TBD]
  capacityMtpa: TBD as Maybe<number>, // [TBD] plant capacity in MTPA
  regionsServed: TBD as Maybe<string>, // [TBD] e.g. "India, Middle East, Southeast Asia"

  // ---- Certifications (claimed in source copy — confirm held vs planned) --
  certifications: ["ISO 9001", "ISO 14001", "ISO 45001"] as string[],

  // ---- Sustainability / HSE targets (confirmed) ---------------------------
  hse: {
    safetyTarget: "Target Zero incidents",
    co2Target: "30% CO₂ intensity reduction by 2030 (vs 2020 baseline)",
    compliance: ["MoEF&CC", "CPCB", "PESO", "OISD"],
  },

  // ---- Value props (confirmed from brief §4.5) ----------------------------
  valueProps: [
    {
      title: "Consistent Quality",
      body: "Narrow-spec products with batch-to-batch reliability.",
    },
    {
      title: "Technical Collaboration",
      body: "Co-develop grades tuned to your application.",
    },
    {
      title: "Responsive Service",
      body: "Dedicated account manager and 48-hour quote turnaround.",
    },
    {
      title: "Supply Reliability",
      body: "Bulk, ISO-tank and drum options with full traceability.",
    },
  ],

  social: {
    linkedin: TBD as Maybe<string>, // [TBD]
  },
} as const;

// ---- Derived email helpers -------------------------------------------------
function emailFor(mailbox: string): Maybe<string> {
  return isKnown(COMPANY.emailDomain)
    ? `${mailbox}@${COMPANY.emailDomain}`
    : TBD;
}

export const EMAILS = {
  sales: emailFor("sales"),
  procurement: emailFor("procurement"),
  corpcomm: emailFor("corpcomm"),
};

/** Full plant address as a single line (for footer, schema, etc.). */
export function fullAddress(): string {
  const a = COMPANY.address;
  const pin = isKnown(a.pin) ? ` - ${a.pin}` : "";
  return `${a.line1}, ${a.area}, Taluka ${a.taluka}, District ${a.district}, ${a.state}, ${a.country}${pin}`;
}
