import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Formula } from "@/components/Formula";
import { IconArrowRight } from "@/components/icons";
import { PRODUCTS, PRODUCT_SLUGS, getProduct } from "@/data/products";
import { productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: { absolute: product.metaTitle },
    description: product.metaDescription,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-leaf-600"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const shortName = product.name.includes("(")
    ? product.name.split(" (")[0]
    : product.name;
  const related = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />

      <PageHeader
        eyebrow="Product"
        title={
          <span className="inline-flex flex-wrap items-baseline gap-3">
            {shortName}
            {product.formula ? (
              <span className="font-sans text-2xl font-semibold text-ink-400">
                <Formula value={product.formula} />
              </span>
            ) : null}
          </span>
        }
        intro={product.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: shortName },
        ]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl">Overview</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-600">
              {product.description}
            </p>

            {/* Grades */}
            <h2 className="mt-12 text-2xl">Grades &amp; specifications</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-cream-100 text-ink-700">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Grade</th>
                    <th className="px-5 py-3 font-semibold">Key specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {product.grades.map((g) => (
                    <tr key={g.grade} className="bg-paper">
                      <td className="px-5 py-3 font-semibold text-ink-900">
                        {g.grade}
                      </td>
                      <td className="px-5 py-3 text-ink-600">{g.keySpec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-ink-500">
              Detailed technical data sheets available on request.
            </p>

            {/* Applications */}
            <h2 className="mt-12 text-2xl">Applications</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.applications.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2.5 rounded-lg border border-ink-200 bg-paper px-4 py-3"
                >
                  <Check />
                  <span className="text-sm text-ink-700">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-ink-200 bg-paper p-6 shadow-sm">
              <h2 className="text-lg">Request {shortName}</h2>
              <p className="mt-2 text-sm text-ink-600">
                Get pricing and availability for your required grade and volume.
                We respond within 48 hours.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button
                  href={`/request-a-quote?product=${product.slug}`}
                  size="md"
                  className="w-full"
                >
                  Request a Quote
                </Button>
                <Button
                  href="/downloads"
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Download TDS
                </Button>
              </div>

              <dl className="mt-6 space-y-3 border-t border-ink-100 pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-500">Grades</dt>
                  <dd className="text-right font-medium text-ink-900">
                    {product.grades.map((g) => g.grade).join(", ")}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-500">Supply</dt>
                  <dd className="text-right font-medium text-ink-900">
                    Bulk · ISO-tank · drum
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Related products */}
      <section className="bg-cream-100">
        <div className="container-page py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl">Other products</h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View all
              <IconArrowRight width={16} height={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Need ${shortName} for your process?`}
        body="Share your grade and volume requirements — our technical team will respond within 48 hours."
      />
    </>
  );
}
