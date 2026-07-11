import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PRODUCTS } from "@/data/products";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Site Map",
  description:
    "A complete map of the Deep Petrochemicals website — products, company pages, resources and legal.",
  alternates: { canonical: "/sitemap-page" },
};

const short = (name: string) =>
  name.includes("(") ? name.split(" (")[0] : name;

const GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Operations & Technology", href: "/operations" },
      { label: "Sustainability & HSE", href: "/sustainability" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "All Products", href: "/products" },
      ...PRODUCTS.map((p) => ({ label: short(p.name), href: `/products/${p.slug}` })),
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Request a Quote", href: "/request-a-quote" },
      { label: "Downloads / TDS", href: "/downloads" },
      { label: "Insights", href: "/blog" },
      ...BLOG_POSTS.map((p) => ({ label: p.title, href: `/blog/${p.slug}` })),
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Sale", href: "/terms-of-sale" },
    ],
  },
];

export default function HtmlSitemapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Site Map"
        title="Explore the site"
        crumbs={[{ label: "Home", href: "/" }, { label: "Site Map" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
                {g.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink-700 hover:text-brand-600">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
