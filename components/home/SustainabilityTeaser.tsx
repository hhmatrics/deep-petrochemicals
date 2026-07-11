import Link from "next/link";
import { COMPANY } from "@/data/company";
import { IconArrowRight, IconLeaf, IconShield } from "@/components/icons";

/** Sustainability & HSE teaser (brief §4.7). Both targets are confirmed. */
export function SustainabilityTeaser() {
  return (
    <section className="bg-leaf-50">
      <div className="container-page py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-leaf-700">
              Sustainability &amp; HSE
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">
              Safety and stewardship, non-negotiable
            </h2>
            <p className="mt-3 text-lg text-ink-600">
              We operate to strict health, safety and environmental standards and
              are investing in a lower-carbon future.
            </p>
            <Link
              href="/sustainability"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700 hover:text-leaf-800"
            >
              Read our HSE commitments
              <IconArrowRight width={16} height={16} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-leaf-200 bg-paper p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                <IconShield />
              </span>
              <h3 className="mt-4 text-lg text-ink-900">
                {COMPANY.hse.safetyTarget}
              </h3>
              <p className="mt-2 text-sm text-ink-600">
                A relentless focus on process safety and incident-free operations.
              </p>
            </div>
            <div className="rounded-2xl border border-leaf-200 bg-paper p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                <IconLeaf />
              </span>
              <h3 className="mt-4 text-lg text-ink-900">30% lower CO₂ intensity</h3>
              <p className="mt-2 text-sm text-ink-600">
                Targeting a 30% CO₂ intensity reduction by 2030 vs a 2020
                baseline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
