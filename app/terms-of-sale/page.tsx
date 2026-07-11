import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Sale",
  description: `Terms of sale for ${COMPANY.legalName} — the basis on which we quote, sell and deliver our products.`,
  alternates: { canonical: "/terms-of-sale" },
};

const proseCls = "mt-3 leading-relaxed text-ink-600";
const h2Cls = "mt-10 text-2xl";

export default function TermsOfSalePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Sale"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Sale" }]}
      />

      <section className="container-page max-w-3xl py-16 sm:py-20">
        <p className="rounded-lg border border-dashed border-ink-300 bg-cream-100 px-4 py-3 text-sm text-ink-500">
          Template — commercial terms to be reviewed and finalised by{" "}
          {COMPANY.shortName} (and legal counsel) before launch.
        </p>

        <h2 className={h2Cls}>Quotations</h2>
        <p className={proseCls}>
          Quotations are provided for information and are valid for the period
          stated. Prices, availability and specifications are subject to
          confirmation at the time an order is accepted.
        </p>

        <h2 className={h2Cls}>Orders</h2>
        <p className={proseCls}>
          An order is binding once accepted in writing by {COMPANY.shortName}.
          Product is supplied to the agreed specification and grade.
        </p>

        <h2 className={h2Cls}>Delivery</h2>
        <p className={proseCls}>
          Delivery terms (including Incoterms), lead times and packaging — bulk,
          ISO-tank or drum — are agreed per order. We work to meet agreed delivery
          schedules but are not liable for delays outside our reasonable control.
        </p>

        <h2 className={h2Cls}>Quality & specifications</h2>
        <p className={proseCls}>
          Product conforms to the applicable technical data sheet and agreed
          specification. Technical data sheets are available on request.
        </p>

        <h2 className={h2Cls}>Payment</h2>
        <p className={proseCls}>
          Payment terms are agreed per customer and order. Title and risk pass as
          set out in the applicable Incoterms and order confirmation.
        </p>

        <h2 className={h2Cls}>Safety & handling</h2>
        <p className={proseCls}>
          Customers are responsible for the safe handling, storage and use of
          product in line with the relevant safety data sheet and applicable
          regulations.
        </p>

        <h2 className={h2Cls}>Contact</h2>
        <p className={proseCls}>
          For commercial terms and quotations, please{" "}
          <Link href="/contact" className="font-medium text-brand-600 underline">
            contact our sales team
          </Link>
          .
        </p>
      </section>
    </>
  );
}
