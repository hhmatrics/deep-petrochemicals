import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { COMPANY } from "@/data/company";
import { IconBadgeCheck, IconGauge, IconShield } from "@/components/icons";

export const metadata: Metadata = {
  title: "Quality & Certifications — ISO 9001, 14001 & 45001",
  description:
    "Deep Petrochemicals' approach to quality: ISO 9001, ISO 14001 and ISO 45001 management systems, narrow-spec consistency, batch traceability and technical data sheets on request.",
  alternates: { canonical: "/quality" },
};

const CERT_DETAILS: Record<string, string> = {
  "ISO 9001": "Quality management — consistent, on-spec product and continual improvement.",
  "ISO 14001": "Environmental management — reducing the impact of our operations.",
  "ISO 45001": "Occupational health & safety management — protecting our people.",
};

export default function QualityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality & Certifications"
        title="Quality built into every batch"
        intro="Our management systems and quality controls are designed to deliver narrow-spec, batch-to-batch consistency you can rely on."
        crumbs={[{ label: "Home", href: "/" }, { label: "Quality" }]}
      />

      {/* Certifications */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Certifications
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Internationally recognised standards</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {COMPANY.certifications.map((c) => (
            <div key={c} className="rounded-2xl border border-ink-200 bg-paper p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <IconBadgeCheck />
              </span>
              <h3 className="mt-4 text-lg text-ink-900">{c}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {CERT_DETAILS[c] ?? "Certified management system."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quality assurance */}
      <section className="bg-cream-100">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4 rounded-2xl border border-ink-200 bg-paper p-6">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">
                <IconGauge />
              </span>
              <div>
                <h3 className="text-lg text-ink-900">Narrow-spec consistency</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  Products are manufactured and released to tight specifications for
                  batch-to-batch reliability.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-ink-200 bg-paper p-6">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">
                <IconShield />
              </span>
              <div>
                <h3 className="text-lg text-ink-900">Full traceability</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  Batch-level traceability from production through to delivery.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
            <h3 className="text-xl text-ink-900">Technical data sheets</h3>
            <p className="mt-2 text-ink-700">
              Detailed specifications for each product are available in our{" "}
              <Link href="/downloads" className="font-semibold text-brand-700 underline">
                downloads library
              </Link>{" "}
              or on request.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
