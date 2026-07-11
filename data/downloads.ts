import { PRODUCTS } from "@/data/products";

export interface DownloadItem {
  title: string;
  productSlug: string;
  type: "TDS" | "SDS" | "Brochure";
  /**
   * Path to the PDF in /public (e.g. "/tds/methanol-tds.pdf"), or null if not yet
   * available. When null, the UI offers "on request" instead of a dead link.
   * Drop real PDFs into public/tds/ and set the path here.
   */
  file: string | null;
}

const shortName = (name: string) =>
  name.includes("(") ? name.split(" (")[0] : name;

/** Technical Data Sheets — one per product (ungated, good for SEO once files exist). */
export const TDS_LIBRARY: DownloadItem[] = PRODUCTS.map((p) => ({
  title: `${shortName(p.name)} — Technical Data Sheet`,
  productSlug: p.slug,
  type: "TDS",
  file: null, // [TBD] add PDF to public/tds/ and set path
}));
