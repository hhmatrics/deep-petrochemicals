import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { PRODUCT_SLUGS } from "@/data/products";
import { BLOG_SLUGS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/products", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/operations", priority: 0.7, freq: "monthly" },
    { path: "/sustainability", priority: 0.7, freq: "monthly" },
    { path: "/quality", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/request-a-quote", priority: 0.8, freq: "monthly" },
    { path: "/downloads", priority: 0.6, freq: "monthly" },
    { path: "/blog", priority: 0.6, freq: "weekly" },
    { path: "/careers", priority: 0.4, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.3, freq: "yearly" },
    { path: "/terms-of-sale", priority: 0.3, freq: "yearly" },
  ];

  const productRoutes = PRODUCT_SLUGS.map((slug) => ({
    path: `/products/${slug}`,
    priority: 0.9,
    freq: "monthly" as const,
  }));

  const blogRoutes = BLOG_SLUGS.map((slug) => ({
    path: `/blog/${slug}`,
    priority: 0.6,
    freq: "monthly" as const,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
