import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/data/company";

/**
 * Header brand lockup: emblem (cropped from the logo, mint background keyed out)
 * + Sora wordmark echoing the logo's orange/green.
 * NOTE: still an interim asset — awaiting the clean purchased/de-watermarked SVG.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${COMPANY.legalName} — home`}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <Image
        src="/deeppetrochemicals-emblem.png"
        alt={`${COMPANY.legalName} logo`}
        width={88}
        height={91}
        priority
        className="h-10 w-auto object-contain sm:h-11"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-brand-700 sm:text-xl">
          Deep Petrochemicals
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-leaf-600">
          Limited
        </span>
      </span>
    </Link>
  );
}
