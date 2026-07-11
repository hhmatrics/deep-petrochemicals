import type { ComponentType, SVGProps } from "react";
import { INDUSTRIES } from "@/data/products";
import {
  IconLayers,
  IconCar,
  IconBuilding,
  IconShirt,
  IconPill,
  IconFlame,
} from "@/components/icons";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Plastics: IconLayers,
  Automotive: IconCar,
  Construction: IconBuilding,
  Textiles: IconShirt,
  Pharmaceuticals: IconPill,
  "Fuel blending": IconFlame,
};

/** Applications / industries served (brief §4.8). */
export function Industries() {
  return (
    <section className="container-page py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          Applications
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl">Industries we serve</h2>
        <p className="mt-3 text-lg text-ink-600">
          Our products are essential feedstocks and inputs across the value chain.
        </p>
      </div>

      <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {INDUSTRIES.map((name) => {
          const Icon = ICONS[name] ?? IconLayers;
          return (
            <li
              key={name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-ink-200 bg-paper px-4 py-8 text-center transition-colors hover:border-brand-300"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon />
              </span>
              <span className="text-sm font-semibold text-ink-800">{name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
