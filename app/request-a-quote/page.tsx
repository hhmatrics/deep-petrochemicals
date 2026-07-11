import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { PRODUCT_SLUGS } from "@/data/products";
import { IconClock, IconHandshake, IconTruck, IconBadgeCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Request a Quote — Methanol, Isobutylene, MTBE & Specialty Chemicals",
  description:
    "Request a quote from Deep Petrochemicals for methanol, isobutylene, MTBE or specialty chemicals. Share your grade, volume and destination — we respond within 48 hours.",
  alternates: { canonical: "/request-a-quote" },
};

const POINTS = [
  { icon: IconClock, text: "48-hour response on every enquiry" },
  { icon: IconHandshake, text: "Technical support to match grade to application" },
  { icon: IconTruck, text: "Bulk, ISO-tank and drum supply options" },
  { icon: IconBadgeCheck, text: "ISO-certified, on-spec product" },
];

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const sp = await searchParams;
  const product =
    sp.product && PRODUCT_SLUGS.includes(sp.product) ? sp.product : "";

  return (
    <>
      <PageHeader
        eyebrow="Request a Quote"
        title="Get pricing and availability"
        intro="Tell us the product, grade and volume you need. Our sales team responds within 48 hours."
        crumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Info panel */}
          <div>
            <h2 className="text-2xl">Why buyers choose us</h2>
            <ul className="mt-6 space-y-4">
              {POINTS.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <p.icon width={18} height={18} />
                  </span>
                  <span className="text-ink-700">{p.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-leaf-200 bg-leaf-50 p-6">
              <p className="text-sm leading-relaxed text-leaf-900/80">
                Prefer to talk? Reach us through the details on our{" "}
                <a href="/contact" className="font-semibold text-leaf-700 underline">
                  contact page
                </a>
                . For technical data sheets, see{" "}
                <a href="/downloads" className="font-semibold text-leaf-700 underline">
                  downloads
                </a>
                .
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-ink-200 bg-paper p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl">Request a quote</h2>
            <p className="mt-2 text-sm text-ink-600">
              We&apos;ll get back to you with pricing and availability.
            </p>
            <div className="mt-6">
              <QuoteForm defaultProduct={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
