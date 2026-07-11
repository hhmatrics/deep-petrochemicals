import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/** Reusable conversion band (brief §4.9). Used on home + inner pages. */
export function CTASection({
  title = "Need a technical data sheet or a quote?",
  body = "Talk to our sales team — we respond to enquiries within 48 hours.",
  primaryLabel = "Request a Quote",
  primaryHref = "/request-a-quote",
  secondaryLabel = "Contact Sales",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-ink-900">
      <div className="container-page py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-ink-300">{body}</p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-4">
            <Button href={primaryHref} size="lg">
              {primaryLabel}
            </Button>
            <Button
              href={secondaryHref}
              size="lg"
              variant="outline"
              className="border-ink-600 bg-transparent text-white hover:border-brand-400 hover:text-brand-400"
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
