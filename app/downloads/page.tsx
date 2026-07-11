import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { TDS_LIBRARY } from "@/data/downloads";
import { IconArrowRight, IconBadgeCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Downloads — Technical Data Sheets & Product Portfolio",
  description:
    "Download technical data sheets (TDS) for methanol, isobutylene, MTBE and specialty chemicals from Deep Petrochemicals, or request our full product portfolio.",
  alternates: { canonical: "/downloads" },
};

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
    </svg>
  );
}

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Downloads"
        title="Technical data sheets & portfolio"
        intro="Access product technical data sheets, or request our full product portfolio for your procurement team."
        crumbs={[{ label: "Home", href: "/" }, { label: "Downloads" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl">Technical Data Sheets (TDS)</h2>
        <p className="mt-2 text-ink-600">
          Detailed specifications for each product. Where a TDS isn&apos;t yet
          published online, request it and we&apos;ll send it directly.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {TDS_LIBRARY.map((d) => {
            return (
              <li
                key={d.productSlug}
                className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-paper p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <IconBadgeCheck />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{d.title}</p>
                    <p className="text-xs uppercase tracking-wide text-ink-500">
                      PDF · {d.type}
                    </p>
                  </div>
                </div>
                {d.file ? (
                  <a
                    href={d.file}
                    download
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                  >
                    <DownloadIcon />
                    Download
                  </a>
                ) : (
                  <Link
                    href={`/request-a-quote?product=${d.productSlug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-ink-300 px-4 py-2 text-sm font-semibold text-ink-700 hover:border-brand-500 hover:text-brand-600"
                  >
                    On request
                    <IconArrowRight width={16} height={16} />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Product Portfolio (gated) */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-ink-200 bg-gradient-to-br from-cream-100 to-cream p-8 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl">Full product portfolio</h2>
              <p className="mt-3 text-ink-600">
                A single document covering our full range, grades and capabilities
                — ideal for procurement and technical evaluation. Share a few
                details and we&apos;ll send it to you.
              </p>
            </div>
            <Link
              href="/request-a-quote"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
            >
              Request the portfolio
              <IconArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
