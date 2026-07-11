import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { IconArrowRight } from "@/components/icons";

/** Products snapshot (brief §4.4): 4 cards linking to product pages. */
export function ProductsSnapshot() {
  return (
    <section className="container-page py-20 sm:py-24">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Products &amp; Solutions
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl">
            A focused range of essential petrochemicals
          </h2>
          <p className="mt-3 text-lg text-ink-600">
            Consistent, narrow-spec products for downstream synthesis, fuel
            blending and specialty applications.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          View all products
          <IconArrowRight width={16} height={16} />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
