import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { posts } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Journal: Photography Guides for Coimbatore",
  description:
    "Guides to wedding, maternity and product photography in Coimbatore, plus the best local photo spots, from ADS Photography.",
  path: "/blog",
});

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader title="Journal" intro="Practical guides for planning a shoot in and around Coimbatore." />
      <section aria-label="Articles" className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <ul className="divide-y divide-line border-b border-line">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block py-10 no-underline">
                <time dateTime={post.date} className="text-sm text-muted">
                  {dateFmt.format(new Date(post.date))}
                </time>
                <h2 className="display mt-2 text-[clamp(1.7rem,3.4vw,2.4rem)] text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[6px]">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-[65ch] text-ink-soft">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
