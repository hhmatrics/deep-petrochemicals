import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { BLOG_SLUGS, getPost } from "@/data/blog";
import { getProduct } from "@/data/products";
import { articleJsonLd } from "@/lib/seo";
import { IconArrowRight } from "@/components/icons";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.related
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />

      <PageHeader
        eyebrow={post.category}
        title={post.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/blog" },
          { label: post.title },
        ]}
      >
        <p className="mt-4 flex items-center gap-3 text-sm text-ink-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readMinutes} min read</span>
        </p>
      </PageHeader>

      <article className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_18rem]">
        <div className="max-w-2xl">
          <p className="text-lg font-medium leading-relaxed text-ink-700">
            {post.excerpt}
          </p>
          {post.sections.map((s, i) => (
            <section key={i} className="mt-8">
              {s.heading ? (
                <h2 className="text-2xl">{s.heading}</h2>
              ) : null}
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-3 leading-relaxed text-ink-600">
                  {p}
                </p>
              ))}
              {s.bullets ? (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-ink-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {/* Sidebar: related products */}
        {related.length > 0 ? (
          <aside>
            <div className="sticky top-24 rounded-2xl border border-ink-200 bg-paper p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
                Related products
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="group inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
                    >
                      {p.name.includes("(") ? p.name.split(" (")[0] : p.name}
                      <IconArrowRight
                        width={16}
                        height={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
      </article>

      <CTASection />
    </>
  );
}
