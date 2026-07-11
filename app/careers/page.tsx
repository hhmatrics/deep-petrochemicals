import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Careers",
  description: `Careers at ${COMPANY.legalName}, Saykha GIDC, Bharuch. Register your interest in roles across operations, quality, engineering and commercial functions.`,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build your career with us"
        intro={`Join a team focused on quality, safety and reliability at ${COMPANY.address.area}, ${COMPANY.address.district}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section className="container-page max-w-3xl py-16 sm:py-20">
        <h2 className="text-2xl">Current openings</h2>
        <p className="mt-3 leading-relaxed text-ink-600">
          We don&apos;t have specific vacancies listed online right now. We&apos;re
          always interested in hearing from talented people across operations,
          quality, engineering, HSE and commercial functions.
        </p>
        <p className="mt-3 leading-relaxed text-ink-600">
          To register your interest, send us a message and attach your details —
          we&apos;ll be in touch if a suitable role opens up.
        </p>
        <div className="mt-8">
          <Button href="/contact" size="lg">
            Register your interest
          </Button>
        </div>
      </section>
    </>
  );
}
