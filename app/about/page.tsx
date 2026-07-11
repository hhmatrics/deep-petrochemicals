import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { COMPANY } from "@/data/company";
import {
  IconBadgeCheck,
  IconHandshake,
  IconTruck,
  IconShield,
  IconUsers,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us — Petrochemical Manufacturer at Saykha GIDC, Bharuch",
  description:
    "Deep Petrochemicals Limited is a petrochemical manufacturer at Saykha GIDC, Bharuch, Gujarat, producing methanol, isobutylene, MTBE and specialty chemicals with ISO-certified processes and responsible operations.",
  alternates: { canonical: "/about" },
};

const STRENGTHS = [
  {
    icon: IconBadgeCheck,
    title: "Quality Assurance",
    body: "ISO 9001, 14001 and 45001 management systems underpin narrow-spec, batch-to-batch consistency.",
  },
  {
    icon: IconTruck,
    title: "Reliable Supply",
    body: "Bulk, ISO-tank and drum options with full traceability and export-ready logistics.",
  },
  {
    icon: IconHandshake,
    title: "Technical Collaboration",
    body: "We co-develop grades for your application, backed by responsive technical support.",
  },
  {
    icon: IconShield,
    title: "Responsible Operations",
    body: "Health, safety and environmental performance are built into how we operate.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Building blocks for industry, made responsibly"
        intro={`${COMPANY.legalName} manufactures essential petrochemicals at ${COMPANY.address.area}, ${COMPANY.address.district}, Gujarat — with a focus on consistent quality, reliable supply and safe, compliant operations.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Who we are + Mission */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl">Who we are</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              We produce methanol, isobutylene, MTBE and specialty chemicals that
              serve as feedstocks and inputs across the plastics, automotive,
              construction, textiles, pharmaceutical and fuel-blending sectors.
            </p>
            <p className="mt-4 leading-relaxed text-ink-600">
              Our approach is straightforward: supply consistent, on-spec product,
              collaborate closely with customers on their requirements, and operate
              to strict safety and environmental standards.
            </p>
          </div>
          <div className="rounded-2xl border border-leaf-200 bg-leaf-50 p-8">
            <h2 className="text-xl text-leaf-800">Our mission</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-700">
              To deliver safe, sustainable and innovative petrochemical solutions
              that enable modern life while protecting people and the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Core strengths */}
      <section className="bg-cream-100">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Core strengths
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">What sets us apart</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STRENGTHS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-ink-200 bg-paper p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <s.icon />
                </span>
                <h3 className="mt-4 text-lg text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-page py-16 sm:py-20">
        <div className="rounded-2xl border border-ink-200 bg-paper p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl">Certifications</h2>
              <p className="mt-3 text-ink-600">
                Our processes are aligned to internationally recognised quality,
                environmental and occupational health &amp; safety standards.
              </p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {COMPANY.certifications.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800"
                >
                  <IconBadgeCheck width={18} height={18} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership (placeholder — no data yet) */}
      <section className="bg-cream-100">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Leadership
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Guided by experience</h2>
          </div>
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-dashed border-ink-300 bg-paper p-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-500">
              <IconUsers />
            </span>
            <p className="text-sm text-ink-500">
              Leadership profiles (names, roles and photographs) will be published
              here once provided.
            </p>
          </div>
        </div>
      </section>

      {/* CSR */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-leaf-700">
              Community &amp; CSR
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Committed to our community</h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-600">
            We engage with the communities around our operations through safety
            drills, environmental monitoring and local initiatives — reflecting
            our belief that responsible manufacturing extends beyond the plant
            gate.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
