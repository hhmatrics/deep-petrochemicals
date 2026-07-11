import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Reusable inner-page header: breadcrumb + eyebrow + H1 + intro, on a subtle
 * branded band. Used across Products, About, Operations, etc.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-ink-200 bg-gradient-to-b from-cream-100 to-cream">
      {crumbs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd(crumbs)),
          }}
        />
      ) : null}
      <div className="container-page py-12 sm:py-16">
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brand-600">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-ink-700">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 ? (
                    <span aria-hidden="true" className="text-ink-300">
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {intro ? (
          <div className="mt-4 max-w-2xl text-lg text-ink-600">{intro}</div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
