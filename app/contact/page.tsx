import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import {
  COMPANY,
  EMAILS,
  fullAddress,
  isKnown,
} from "@/data/company";
import { IconMapPin, IconPhone, IconMail } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us — Deep Petrochemicals, Saykha GIDC, Bharuch",
  description:
    "Contact Deep Petrochemicals Limited at Saykha GIDC, Bharuch, Gujarat. Send an enquiry for methanol, isobutylene, MTBE or specialty chemicals — we respond within 48 hours.",
  alternates: { canonical: "/contact" },
};

// Exact plant coordinates (resolved from COMPANY.mapsUrl). Keyless Google embed.
const mapEmbed =
  "https://www.google.com/maps?q=21.7755661,72.8198548&z=15&output=embed";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Talk to our team"
        intro="Tell us what you need — grade, volume and destination — and our team will get back to you within 48 hours."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Details */}
          <div>
            <h2 className="text-2xl">Head office &amp; plant</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-3">
                <IconMapPin className="mt-0.5 shrink-0 text-brand-600" />
                <div>
                  <p className="font-semibold text-ink-900">{COMPANY.legalName}</p>
                  <address className="mt-1 not-italic text-ink-600">
                    {fullAddress()}
                  </address>
                  <a
                    href={COMPANY.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
                  >
                    Get directions →
                  </a>
                </div>
              </li>

              {isKnown(COMPANY.phone) ? (
                <li className="flex gap-3">
                  <IconPhone className="mt-0.5 shrink-0 text-brand-600" />
                  <div>
                    <p className="font-semibold text-ink-900">Phone</p>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-ink-600 hover:text-brand-600"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </li>
              ) : null}

              <li className="flex gap-3">
                <IconMail className="mt-0.5 shrink-0 text-brand-600" />
                <div>
                  <p className="font-semibold text-ink-900">Email</p>
                  {isKnown(EMAILS.sales) ? (
                    <ul className="mt-1 space-y-1 text-ink-600">
                      <li>
                        Sales:{" "}
                        <a
                          href={`mailto:${EMAILS.sales}`}
                          className="text-brand-600 hover:text-brand-700"
                        >
                          {EMAILS.sales}
                        </a>
                      </li>
                      <li>
                        Procurement:{" "}
                        <a
                          href={`mailto:${EMAILS.procurement}`}
                          className="text-brand-600 hover:text-brand-700"
                        >
                          {EMAILS.procurement}
                        </a>
                      </li>
                      <li>
                        Media / IR:{" "}
                        <a
                          href={`mailto:${EMAILS.corpcomm}`}
                          className="text-brand-600 hover:text-brand-700"
                        >
                          {EMAILS.corpcomm}
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <p className="mt-1 text-sm text-ink-500">
                      Please use the enquiry form — direct email addresses will be
                      published shortly.
                    </p>
                  )}
                </div>
              </li>
            </ul>

            {/* Map */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-ink-200">
              <iframe
                title={`Map to ${COMPANY.shortName}, Saykha GIDC, Bharuch`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-ink-200 bg-paper p-6 sm:p-8">
            <h2 className="text-2xl">Send an enquiry</h2>
            <p className="mt-2 text-sm text-ink-600">
              Fields marked <span className="text-brand-600">*</span> are required.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
