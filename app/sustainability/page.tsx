import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { COMPANY } from "@/data/company";
import {
  IconShield,
  IconLeaf,
  IconRecycle,
  IconUsers,
  IconBadgeCheck,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Sustainability & HSE — Safety, Environment & Compliance",
  description:
    "Deep Petrochemicals' HSE commitments: Target Zero incidents, a 30% CO₂ intensity reduction by 2030 vs 2020, circular-economy investment, and compliance with MoEF&CC, CPCB, PESO and OISD guidelines.",
  alternates: { canonical: "/sustainability" },
};

export default function SustainabilityPage() {
  const commitments = [
    {
      icon: IconShield,
      title: "Safety first",
      body: COMPANY.hse.safetyTarget +
        " — a relentless focus on process safety and incident-free operations.",
    },
    {
      icon: IconLeaf,
      title: "Emissions reduction",
      body: "Targeting a 30% CO₂ intensity reduction by 2030 against a 2020 baseline.",
    },
    {
      icon: IconRecycle,
      title: "Circular economy",
      body: "Investing in chemical recycling and bio-based feedstock pathways.",
    },
    {
      icon: IconUsers,
      title: "Community",
      body: "Regular safety drills, environmental monitoring and local engagement.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Sustainability & HSE"
        title="Safety and stewardship, non-negotiable"
        intro="We operate to strict health, safety and environmental standards — and we're investing in a lower-carbon, more circular future."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sustainability" }]}
      />

      {/* Commitments */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {commitments.map((c) => (
            <div
              key={c.title}
              className="flex gap-4 rounded-2xl border border-leaf-200 bg-leaf-50 p-6"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper text-leaf-700">
                <c.icon />
              </span>
              <div>
                <h3 className="text-lg text-ink-900">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emissions target highlight */}
      <section className="bg-leaf-800 text-white">
        <div className="container-page py-16 sm:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
            <p className="font-display text-6xl font-extrabold text-white sm:text-7xl">
              30%
            </p>
            <div className="max-w-2xl">
              <h2 className="text-2xl text-white sm:text-3xl">
                Lower CO₂ intensity by 2030
              </h2>
              <p className="mt-2 text-lg text-leaf-100">
                Measured against a 2020 baseline — part of a broader commitment to
                reduce the environmental footprint of everything we make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Regulatory compliance
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl">
            Operating within India&apos;s HSE framework
          </h2>
          <p className="mt-3 text-lg text-ink-600">
            We align our operations with the guidelines of India&apos;s principal
            environmental and industrial-safety authorities.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY.hse.compliance.map((body) => (
            <li
              key={body}
              className="flex items-center gap-3 rounded-xl border border-ink-200 bg-paper px-5 py-4"
            >
              <IconBadgeCheck width={20} height={20} className="text-leaf-600" />
              <span className="font-semibold text-ink-800">{body}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-500">
          MoEF&amp;CC — Ministry of Environment, Forest &amp; Climate Change · CPCB
          — Central Pollution Control Board · PESO — Petroleum &amp; Explosives
          Safety Organisation · OISD — Oil Industry Safety Directorate.
        </p>
      </section>

      <CTASection
        title="Partner with a responsible supplier"
        body="Talk to us about your quality, safety and sustainability requirements."
      />
    </>
  );
}
