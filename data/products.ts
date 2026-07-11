/**
 * SINGLE SOURCE OF TRUTH for the product line (PROJECT_BRIEF.md §2).
 * Drives: nav dropdown, products overview, 4 detail pages, homepage snapshot,
 * quote-form dropdown, Product JSON-LD, and per-page SEO metadata.
 *
 * All product facts below are confirmed by the brief + address docs.
 * Do NOT add capacity/price numbers here — those are unconfirmed.
 */

export interface ProductGrade {
  grade: string;
  keySpec: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Chemical formula, if applicable (rendered with subscripts handled in UI). */
  formula?: string;
  /** One-line summary for cards and nav. */
  tagline: string;
  /** Intro paragraph(s) for the detail page. */
  description: string;
  grades: ProductGrade[];
  applications: string[];
  /** SEO */
  metaTitle: string;
  metaDescription: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "methanol",
    name: "Methanol",
    formula: "CH3OH",
    tagline: "AA & Fuel Grade methanol for feedstock, solvents and fuel blending.",
    description:
      "Methanol is a versatile chemical feedstock and clean-burning fuel component. Our methanol is produced to tight specifications for downstream synthesis and energy applications, supplied in bulk with full batch traceability.",
    grades: [
      { grade: "AA Grade", keySpec: "High purity for chemical synthesis" },
      { grade: "Fuel Grade", keySpec: "Optimised for blending and energy use" },
    ],
    applications: [
      "Formaldehyde production",
      "Acetic acid manufacture",
      "MTBE feedstock",
      "Industrial solvents",
      "Fuel blending",
    ],
    metaTitle:
      "Methanol Supplier in Gujarat | AA & Fuel Grade | Deep Petrochemicals",
    metaDescription:
      "AA Grade and Fuel Grade methanol (CH3OH) from Deep Petrochemicals, Saykha GIDC, Bharuch. Bulk supply for formaldehyde, acetic acid, MTBE feedstock, solvents and fuel blending.",
  },
  {
    slug: "isobutylene",
    name: "Isobutylene",
    formula: "C4H8",
    tagline: "High-purity (>99.5%) isobutylene for butyl rubber and MTBE.",
    description:
      "Isobutylene is a key building block for synthetic rubber, fuel additives and specialty polymers. We supply high-purity isobutylene engineered for demanding polymerisation and downstream chemistry.",
    grades: [
      { grade: "High Purity", keySpec: "Purity > 99.5%" },
    ],
    applications: [
      "Butyl rubber production",
      "MTBE production",
      "Polyisobutylene",
      "Antioxidants",
    ],
    metaTitle:
      "Isobutylene Supplier India | High Purity >99.5% | Deep Petrochemicals",
    metaDescription:
      "High-purity isobutylene (C4H8, >99.5%) from Deep Petrochemicals, Bharuch, Gujarat. For butyl rubber, MTBE production, polyisobutylene and antioxidants. Bulk supply.",
  },
  {
    slug: "mtbe",
    name: "Methyl Tertiary Butyl Ether (MTBE)",
    formula: "C5H12O",
    tagline: "Fuel & Industrial Grade MTBE — octane enhancer and oxygenate.",
    description:
      "MTBE is a high-octane gasoline blending component and versatile solvent. Our MTBE meets fuel-oxygenate and industrial specifications, delivered reliably for refiners and formulators.",
    grades: [
      { grade: "Fuel Grade", keySpec: "Gasoline octane enhancement" },
      { grade: "Industrial Grade", keySpec: "Solvent and process applications" },
    ],
    applications: [
      "Gasoline octane enhancer",
      "Fuel oxygenate",
      "Chemical solvent",
    ],
    metaTitle:
      "MTBE Supplier Gujarat | Fuel & Industrial Grade | Deep Petrochemicals",
    metaDescription:
      "Fuel Grade and Industrial Grade MTBE from Deep Petrochemicals, Saykha GIDC, Bharuch. Gasoline octane enhancer, oxygenate and solvent. Reliable bulk supply across India.",
  },
  {
    slug: "specialty-chemicals",
    name: "Specialty Chemicals",
    tagline: "Custom synthesis and made-to-order pharma intermediates.",
    description:
      "Beyond our core products, we offer custom synthesis and made-to-order specialty chemicals, including pharma intermediates. Our technical team co-develops on-spec grades to match your process requirements.",
    grades: [
      { grade: "On-spec", keySpec: "Manufactured to your specification" },
      { grade: "Made-to-order", keySpec: "Custom synthesis programs" },
    ],
    applications: [
      "Custom synthesis",
      "Pharmaceutical intermediates",
      "Specialty applications",
    ],
    metaTitle:
      "Specialty Chemicals & Custom Synthesis | Deep Petrochemicals, Bharuch",
    metaDescription:
      "Custom synthesis and made-to-order specialty chemicals and pharma intermediates from Deep Petrochemicals, Bharuch, Gujarat. On-spec grades developed with our technical team.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug);

/** Industries served (brief §4.8) — used on homepage + applications sections. */
export const INDUSTRIES = [
  "Plastics",
  "Automotive",
  "Construction",
  "Textiles",
  "Pharmaceuticals",
  "Fuel blending",
];
