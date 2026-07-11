import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import type { Product } from "@/data/products";
import { IconArrowRight, IconAtom, IconDroplet, IconFlask, IconFuel } from "@/components/icons";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  methanol: IconDroplet,
  isobutylene: IconAtom,
  mtbe: IconFuel,
  "specialty-chemicals": IconFlask,
};

export function ProductCard({ product }: { product: Product }) {
  const Icon = ICONS[product.slug] ?? IconFlask;
  const shortName = product.name.includes("(")
    ? product.name.split(" (")[0]
    : product.name;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-ink-200 bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-ink-900/5"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon />
      </span>
      <h3 className="mt-5 text-lg text-ink-900">{shortName}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
        {product.tagline}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
        Learn more
        <IconArrowRight
          width={16}
          height={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
