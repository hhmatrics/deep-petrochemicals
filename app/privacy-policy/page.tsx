import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${COMPANY.legalName} — how we collect, use and protect information submitted through our website.`,
  alternates: { canonical: "/privacy-policy" },
};

const proseCls = "mt-3 leading-relaxed text-ink-600";
const h2Cls = "mt-10 text-2xl";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="container-page max-w-3xl py-16 sm:py-20">
        <p className="rounded-lg border border-dashed border-ink-300 bg-cream-100 px-4 py-3 text-sm text-ink-500">
          Template — to be reviewed and finalised by {COMPANY.shortName} before
          launch.
        </p>

        <h2 className={h2Cls}>Information we collect</h2>
        <p className={proseCls}>
          When you submit an enquiry or quote request, we collect the details you
          provide — such as your name, company, email, phone number and message —
          so we can respond. We may also collect standard technical data (such as
          IP address and browser type) and anonymous usage analytics.
        </p>

        <h2 className={h2Cls}>How we use information</h2>
        <p className={proseCls}>
          We use the information you provide to respond to enquiries, prepare
          quotes, fulfil orders and improve our website and services. We do not
          sell your personal information.
        </p>

        <h2 className={h2Cls}>Cookies</h2>
        <p className={proseCls}>
          Our website uses cookies to improve your experience and to understand
          how the site is used. You can control cookies through the consent banner
          and your browser settings.
        </p>

        <h2 className={h2Cls}>Data sharing</h2>
        <p className={proseCls}>
          We may share information with service providers who help us operate the
          website and communicate with you (for example, form and email
          providers), under appropriate confidentiality obligations.
        </p>

        <h2 className={h2Cls}>Your rights</h2>
        <p className={proseCls}>
          You may request access to, correction of, or deletion of your personal
          information. To make a request, please{" "}
          <Link href="/contact" className="font-medium text-brand-600 underline">
            contact us
          </Link>
          .
        </p>

        <h2 className={h2Cls}>Contact</h2>
        <p className={proseCls}>
          For any privacy questions, reach us via our{" "}
          <Link href="/contact" className="font-medium text-brand-600 underline">
            contact page
          </Link>
          .
        </p>
      </section>
    </>
  );
}
