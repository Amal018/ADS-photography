import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Client Reviews of Our Coimbatore Photography Studio",
  description: "What families and businesses in Coimbatore say about working with ADS Photography.",
  path: "/testimonials",
});

const dateFmt = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" });

export default function TestimonialsPage() {
  const sorted = [...testimonials].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader title="Client reviews" intro="What families and businesses say after working with us." />
      <section aria-label="Reviews" className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
        {sorted.length ? (
          <ul className="divide-y divide-line border-y border-line">
            {sorted.map((t) => (
              <li key={`${t.name}-${t.date}`} className="py-10">
                <figure>
                  <blockquote className="text-[clamp(1.3rem,2.6vw,1.75rem)] font-medium leading-snug tracking-[-0.01em]">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 flex flex-wrap gap-x-4 text-sm text-ink-soft">
                    <span className="font-medium text-ink">{t.name}</span>
                    <span>{t.service}</span>
                    <time dateTime={t.date}>{dateFmt.format(new Date(t.date))}</time>
                    <span>via {t.source}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-line bg-stone px-6 py-14 text-center sm:px-10">
            <p className="display text-3xl">Reviews are on their way</p>
            <p className="mx-auto mt-4 max-w-[46ch] text-ink-soft">
              We’re gathering reviews from recent clients. Worked with us? We’d love to hear from
              you.
            </p>
            <div className="mt-8">
              {site.googleBusinessProfileUrl ? (
                <a href={site.googleBusinessProfileUrl} className="btn btn-primary" rel="noopener">
                  Leave a Google review
                </a>
              ) : (
                <Link href="/contact" className="btn btn-primary">
                  Share your feedback
                </Link>
              )}
            </div>
          </div>
        )}
      </section>
      <CtaBand title="Your turn" text="Tell us about your plans and we’ll take it from there." />
    </>
  );
}
