import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { CTASection } from "@/components/CTASection";
import { PRODUCTS } from "@/data/products";
import { INDUSTRIES } from "@/data/products";

export const metadata: Metadata = {
  title: "Products & Solutions — Methanol, Isobutylene, MTBE & Specialty Chemicals",
  description:
    "Explore Deep Petrochemicals' product range: AA & Fuel Grade methanol, high-purity isobutylene, Fuel & Industrial Grade MTBE, and made-to-order specialty chemicals. Bulk supply from Bharuch, Gujarat.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products & Solutions"
        title="A focused range of essential petrochemicals"
        intro="Consistent, narrow-spec products for downstream synthesis, fuel blending and specialty applications — each backed by technical support and reliable bulk logistics."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-ink-200 bg-paper p-8 sm:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl">Serving industry across the value chain</h2>
            <p className="mt-3 text-ink-600">
              Our products are essential feedstocks and inputs for manufacturers
              in these sectors and more.
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {INDUSTRIES.map((name) => (
              <li
                key={name}
                className="rounded-full border border-ink-200 bg-cream px-4 py-1.5 text-sm font-medium text-ink-700"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
