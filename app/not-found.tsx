import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/" size="lg">
          Back to home
        </Button>
        <Button href="/products" variant="outline" size="lg">
          Browse products
        </Button>
      </div>
      <p className="mt-6 text-sm text-ink-500">
        Or visit the{" "}
        <Link href="/sitemap-page" className="font-medium text-brand-600 underline">
          site map
        </Link>
        .
      </p>
    </section>
  );
}
