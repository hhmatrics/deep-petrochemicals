import Link from "next/link";
import {
  COMPANY,
  EMAILS,
  fullAddress,
  isKnown,
} from "@/data/company";
import {
  FOOTER_COMPANY,
  FOOTER_PRODUCTS,
  FOOTER_RESOURCES,
} from "@/data/nav";

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-400">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-ink-300 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink-900 text-ink-200">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact / NAP */}
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-bold text-white">
              {COMPANY.legalName}
            </p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-ink-300">
              {fullAddress()}
            </address>

            <dl className="mt-4 space-y-1.5 text-sm">
              {isKnown(COMPANY.phone) ? (
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-ink-300 hover:text-white"
                    >
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {isKnown(EMAILS.sales) ? (
                <div>
                  <dt className="sr-only">Sales email</dt>
                  <dd>
                    <a
                      href={`mailto:${EMAILS.sales}`}
                      className="text-ink-300 hover:text-white"
                    >
                      {EMAILS.sales}
                    </a>
                  </dd>
                </div>
              ) : null}
              {isKnown(EMAILS.procurement) ? (
                <div>
                  <dt className="sr-only">Procurement email</dt>
                  <dd>
                    <a
                      href={`mailto:${EMAILS.procurement}`}
                      className="text-ink-300 hover:text-white"
                    >
                      {EMAILS.procurement}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <a
              href={COMPANY.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-leaf-400 hover:text-leaf-300"
            >
              View on Google Maps
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          <FooterCol title="Products" links={FOOTER_PRODUCTS} />
          <FooterCol title="Company" links={FOOTER_COMPANY} />
          <FooterCol title="Resources" links={FOOTER_RESOURCES} />
        </div>

        {/* Newsletter + certifications */}
        <div className="mt-12 grid gap-8 border-t border-ink-800 pt-8 lg:grid-cols-2 lg:items-center">
          <form
            className="flex max-w-md gap-2"
            aria-label="Enquiry newsletter signup"
          >
            <input
              type="email"
              required
              placeholder="Your work email"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-lg border border-ink-700 bg-ink-800 px-4 py-2.5 text-sm text-white placeholder:text-ink-400 focus:border-brand-500"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Subscribe
            </button>
          </form>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {COMPANY.certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-md border border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-300"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-ink-400 sm:flex-row">
          <p>
            © {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-sale" className="hover:text-white">
                Terms of Sale
              </Link>
            </li>
            <li>
              <Link href="/sitemap-page" className="hover:text-white">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
