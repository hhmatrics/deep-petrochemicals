import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { PRODUCTS } from "@/data/products";
import { COMPANY } from "@/data/company";
import {
  IconGauge,
  IconBadgeCheck,
  IconTruck,
  IconGlobe,
  IconFactory,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Operations & Technology — Reliable Petrochemical Supply",
  description:
    "How Deep Petrochemicals delivers consistent, on-spec product: quality control, dedicated storage and loading infrastructure, full batch traceability and export-ready logistics from Saykha GIDC, Bharuch.",
  alternates: { canonical: "/operations" },
};

const CAPABILITIES = [
  {
    icon: IconGauge,
    title: "Process & quality control",
    body: "Consistent, narrow-spec product supported by rigorous in-process and quality control.",
  },
  {
    icon: IconTruck,
    title: "Storage & loading",
    body: "Dedicated storage and loading infrastructure for bulk, ISO-tank and drum dispatch.",
  },
  {
    icon: IconBadgeCheck,
    title: "Full traceability",
    body: "Batch-level traceability from production through to delivery.",
  },
  {
    icon: IconGlobe,
    title: "Export-ready logistics",
    body: "Logistics set up to serve domestic and export customers reliably.",
  },
];

export default function OperationsPage() {
  const stats = [
    { value: String(PRODUCTS.length), label: "Core product lines" },
    { value: String(COMPANY.certifications.length), label: "ISO management systems" },
    { value: "48h", label: "Quote turnaround" },
    { value: ">99.5%", label: "Isobutylene purity" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Operations & Technology"
        title="Reliable supply, engineered for scale"
        intro="From production to dispatch, our operations are built around consistent quality, dependable logistics and responsive technical support."
        crumbs={[{ label: "Home", href: "/" }, { label: "Operations" }]}
      />

      {/* Capabilities */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div
              key={c.title}
              className="flex gap-4 rounded-2xl border border-ink-200 bg-paper p-6"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <c.icon />
              </span>
              <div>
                <h3 className="text-lg text-ink-900">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(70% 120% at 90% 0%, rgba(224,99,42,0.35), transparent 55%)," +
            "linear-gradient(135deg, #1c1a18 0%, #14100c 100%)",
        }}
      >
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              By the numbers
            </p>
            <h2 className="mt-2 text-3xl text-white sm:text-4xl">
              Consistency you can plan around
            </h2>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <dt className="font-display text-4xl font-extrabold text-white">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-ink-300">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Supply chain reliability */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">
              <IconFactory />
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl">Supply chain reliability</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-600">
              We support bulk, ISO-tank and drum supply with the storage and
              loading infrastructure to keep deliveries on schedule — so you can
              plan production with confidence.
            </p>
          </div>
          <ul className="grid gap-3">
            {[
              "Bulk, ISO-tank and drum options",
              "Dedicated storage and loading",
              "Batch-level traceability",
              "Domestic and export dispatch",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-ink-200 bg-paper px-5 py-4"
              >
                <IconBadgeCheck width={20} height={20} className="text-leaf-600" />
                <span className="text-ink-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
