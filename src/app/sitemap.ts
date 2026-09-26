import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { posts } from "@/content/posts";
import { corporateServices } from "@/content/corporate";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/portfolio", priority: 0.9 },
    { path: "/portfolio/weddings", priority: 0.9 },
    { path: "/portfolio/maternity", priority: 0.8 },
    { path: "/packages", priority: 0.9 },
    { path: "/corporate", priority: 0.8 },
    { path: "/about", priority: 0.5 },
    { path: "/blog", priority: 0.6 },
    { path: "/testimonials", priority: 0.5 },
    { path: "/contact", priority: 0.8 },
  ];
  return [
    ...staticRoutes.map(({ path, priority }) => ({ url: `${site.url}${path}`, priority })),
    ...corporateServices.map((s) => ({ url: `${site.url}/corporate/${s.slug}`, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}
