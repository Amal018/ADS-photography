import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon } from "@/components/icons";
import { corporateServices, getCorporateService } from "@/content/corporate";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return corporateServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getCorporateService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} in Coimbatore`,
    description: service.metaDescription,
    path: `/corporate/${service.slug}`,
  });
}

export default async function CorporateServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getCorporateService((await params).slug);
  if (!service) notFound();
  const others = corporateServices.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader dark title={`${service.title} in Coimbatore`} intro={service.summary}>
        <Link href={`/contact?type=corporate&service=${service.slug}`} className="btn btn-light">
          Request a quote <ArrowIcon className="size-4" />
        </Link>
      </PageHeader>

      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
        <section aria-labelledby="deliver">
          <h2 id="deliver" className="display text-[clamp(1.9rem,3.6vw,2.75rem)]">
            What you get
          </h2>
          <ul className="mt-7 space-y-4">
            {service.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-lg text-ink-soft">
                <svg viewBox="0 0 20 20" className="mt-1.5 size-4 shrink-0 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                {o}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="process">
          <h2 id="process" className="display text-[clamp(1.9rem,3.6vw,2.75rem)]">
            How it works
          </h2>
          <ol className="mt-7 border-t border-line">
            {service.process.map((p) => (
              <li key={p.step} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5">
                <p className="font-medium">{p.step}</p>
                <p className="text-ink-soft">{p.detail}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {service.slug === "product-shoots" ? (
          <p className="mb-12 text-ink-soft">
            Selling online? Read{" "}
            <Link href="/blog/product-photography-coimbatore" className="text-link text-ink">
              product photography for Coimbatore brands and online sellers
            </Link>
            .
          </p>
        ) : null}
        <nav aria-label="Other corporate services" className="border-t border-line pt-8">
          <p className="text-sm font-medium text-muted">Also for businesses</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/corporate/${s.slug}`} className="btn btn-secondary">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <CtaBand
        title="Request a corporate quote"
        text="Share the scope, the quantities and your deadlines. We’ll reply with a quote."
        href={`/contact?type=corporate&service=${service.slug}`}
        cta="Request a quote"
        whatsappMessage={`Hi ADS Photography, I'd like a quote for ${service.title.toLowerCase()}.`}
      />
    </>
  );
}
