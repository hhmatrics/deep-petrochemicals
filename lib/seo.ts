/**
 * Shared SEO helpers: JSON-LD structured data builders (PROJECT_BRIEF.md §7).
 * Only emits fields that are actually known — never fabricates missing facts.
 */
import { COMPANY, EMAILS, SITE_URL, isKnown } from "@/data/company";
import type { Product } from "@/data/products";

type Json = Record<string, unknown>;

/** BreadcrumbList structured data from a list of {label, href?} crumbs. */
export function breadcrumbJsonLd(
  crumbs: { label: string; href?: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };
}

/** Organization + LocalBusiness combined node for the site (used in root/home). */
export function organizationJsonLd(): Json {
  const a = COMPANY.address;
  const node: Json = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: COMPANY.legalName,
    description:
      "Petrochemical manufacturer producing methanol, isobutylene, MTBE and specialty chemicals at Saykha GIDC, Bharuch, Gujarat.",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.line1}, ${a.area}`,
      addressLocality: a.district,
      addressRegion: a.state,
      addressCountry: "IN",
      ...(isKnown(a.pin) ? { postalCode: a.pin } : {}),
    },
    hasMap: COMPANY.mapsUrl,
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    ...(COMPANY.siteUrl ? { url: COMPANY.siteUrl } : {}),
    ...(isKnown(COMPANY.phone) ? { telephone: COMPANY.phone } : {}),
    ...(isKnown(EMAILS.sales) ? { email: EMAILS.sales } : {}),
    ...(isKnown(COMPANY.yearFounded)
      ? { foundingDate: String(COMPANY.yearFounded) }
      : {}),
  };
  return node;
}

/** Product node for a product detail page. */
export function productJsonLd(product: Product): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.metaDescription,
    category: "Petrochemicals",
    brand: {
      "@type": "Brand",
      name: COMPANY.shortName,
    },
    manufacturer: {
      "@type": "Organization",
      name: COMPANY.legalName,
    },
  };
}

/** BlogPosting node for a blog article. */
export function articleJsonLd(article: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    url: `${SITE_URL}/blog/${article.slug}`,
    author: { "@type": "Organization", name: COMPANY.legalName },
    publisher: { "@type": "Organization", name: COMPANY.legalName },
  };
}

/** Render a JSON-LD object as a script tag payload string. */
export function jsonLdScript(data: Json): string {
  return JSON.stringify(data);
}
