import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon } from "@/components/icons";
import { getPost, posts } from "@/content/posts";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const base = pageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}` });
  return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: post.date } };
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@id": `${site.url}/#business` },
          about: post.keyword,
        }}
      />
      <article className="mx-auto max-w-3xl px-5 pt-12 sm:px-8 sm:pt-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted no-underline hover:text-ink">
          <ArrowIcon className="size-4 rotate-180" /> Journal
        </Link>
        <header className="mt-8 border-b border-line pb-10">
          <h1 className="display text-[clamp(1.9rem,5vw,3.25rem)]">{post.title}</h1>
          <p className="mt-5 text-xl text-ink-soft">{post.description}</p>
          <p className="mt-6 text-sm text-muted">
            <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time> · {site.name}
          </p>
        </header>
        <div className="prose-ads mt-6 text-lg leading-relaxed text-ink-soft [&_h2]:text-ink">
          {post.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "list")
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{block.text}</p>;
          })}
        </div>
        <p className="mt-12">
          <Link href={post.related.href} className="btn btn-secondary">
            {post.related.label} <ArrowIcon className="size-4" />
          </Link>
        </p>
      </article>
      <CtaBand
        title="Plan your shoot with us"
        text="Send us your date and what you have in mind. We’ll reply with availability."
      />
    </>
  );
}
