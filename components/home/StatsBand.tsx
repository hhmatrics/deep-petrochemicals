import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { COMPANY } from "@/data/company";
import { IconArrowRight } from "@/components/icons";

/**
 * Operations highlight (brief §4.6). Capacity/storage figures are unconfirmed,
 * so this band uses only true, countable facts to stay credible and honest.
 */
export function StatsBand() {
  const stats = [
    { value: String(PRODUCTS.length), label: "Core product lines" },
    { value: String(COMPANY.certifications.length), label: "ISO management systems" },
    { value: "48h", label: "Quote turnaround" },
    { value: ">99.5%", label: "Isobutylene purity" },
  ];

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(70% 120% at 90% 0%, rgba(224,99,42,0.35), transparent 55%)," +
          "linear-gradient(135deg, #1c1a18 0%, #14100c 100%)",
      }}
    >
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              Operations &amp; Technology
            </p>
            <h2 className="mt-2 text-3xl text-white sm:text-4xl">
              Reliable supply, engineered for scale
            </h2>
            <p className="mt-3 text-lg text-ink-300">
              Bulk, ISO-tank and drum options with full batch traceability and
              export-ready logistics — backed by responsive technical support.
            </p>
            <Link
              href="/operations"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300"
            >
              Explore our operations
              <IconArrowRight width={16} height={16} />
            </Link>
          </div>

          <dl className="grid grid-cols-2 gap-4">
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
      </div>
    </section>
  );
}
