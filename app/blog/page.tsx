import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { BLOG_POSTS } from "@/data/blog";
import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Insights — Petrochemical Industry Articles",
  description:
    "Insights from Deep Petrochemicals on methanol, MTBE, isobutylene and specialty chemicals — applications, comparisons and industry know-how.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Petrochemical insights & know-how"
        intro="Practical articles on our products, their applications and the wider industry."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-ink-200 bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-ink-900/5"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-ink-500">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700">
                  {post.category}
                </span>
                <span>{post.readMinutes} min read</span>
              </div>
              <h2 className="mt-4 text-lg text-ink-900 group-hover:text-brand-700">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <time className="text-xs text-ink-500" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Read
                  <IconArrowRight
                    width={16}
                    height={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
