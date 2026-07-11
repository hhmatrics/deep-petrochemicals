/** Primary navigation structure (PROJECT_BRIEF.md §4.1). */
import { PRODUCTS } from "@/data/products";

export interface NavChild {
  label: string;
  href: string;
  desc?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products", desc: "Overview of our full range" },
      ...PRODUCTS.map((p) => ({
        label: p.name.includes("(") ? p.name.split(" (")[0] : p.name,
        href: `/products/${p.slug}`,
        desc: p.tagline,
      })),
    ],
  },
  { label: "Operations", href: "/operations" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact", href: "/contact" },
];

/** Footer link groups. */
export const FOOTER_PRODUCTS = PRODUCTS.map((p) => ({
  label: p.name.includes("(") ? p.name.split(" (")[0] : p.name,
  href: `/products/${p.slug}`,
}));

export const FOOTER_COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Operations & Technology", href: "/operations" },
  { label: "Sustainability & HSE", href: "/sustainability" },
  { label: "Quality & Certifications", href: "/quality" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_RESOURCES = [
  { label: "Request a Quote", href: "/request-a-quote" },
  { label: "Downloads / TDS", href: "/downloads" },
  { label: "Blog / Insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
];
