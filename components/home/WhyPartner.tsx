import type { ComponentType, SVGProps } from "react";
import { COMPANY } from "@/data/company";
import {
  IconBadgeCheck,
  IconHandshake,
  IconClock,
  IconShield,
} from "@/components/icons";

const ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  IconBadgeCheck,
  IconHandshake,
  IconClock,
  IconShield,
];

/** Why partner with us (brief §4.5): 4 value props from company data. */
export function WhyPartner() {
  return (
    <section className="bg-cream-100">
      <div className="container-page py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Why partner with us
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl">
            Built for demanding industrial buyers
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY.valueProps.map((vp, i) => {
            const Icon = ICONS[i] ?? IconBadgeCheck;
            return (
              <div
                key={vp.title}
                className="rounded-2xl border border-ink-200 bg-paper p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">
                  <Icon />
                </span>
                <h3 className="mt-4 text-lg text-ink-900">{vp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {vp.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
