import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { ArrowIcon } from "@/components/icons";
import { corporateServices } from "@/content/corporate";
import { photosFor } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product Photography & Corporate Photography in Coimbatore",
  description:
    "Product photography, monthly retainers, headshots and event coverage for Coimbatore businesses. Request a corporate quote from ADS Photography.",
  path: "/corporate",
});

export default function CorporatePage() {
  const product = photosFor("product");
  return (
    <>
      <PageHeader
        dark
        title="Photography for businesses"
        intro="Product photography in Coimbatore for manufacturers, textile brands and online sellers, plus retainers, headshots and event coverage. Consistent images, delivered on a schedule you can plan around."
      >
        <Link href="/contact?type=corporate" className="btn btn-light">
          Request a quote <ArrowIcon className="size-4" />
        </Link>
      </PageHeader>

      <section aria-labelledby="services" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 id="services" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
          Services
        </h2>
        <ul className="mt-10 border-t border-line">
          {corporateServices.map((s) => (
            <li key={s.slug} className="border-b border-line">
              <Link
                href={`/corporate/${s.slug}`}
                className="group grid gap-2 py-8 no-underline sm:grid-cols-[16rem_1fr_auto] sm:items-center sm:gap-10"
              >
                <span className="text-xl font-medium text-ink">{s.title}</span>
                <span className="max-w-[60ch] text-ink-soft">{s.summary}</span>
                <ArrowIcon className="hidden size-5 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="retainer" className="bg-stone">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="retainer" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
              How a retainer works
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg text-ink-soft">
              Instead of booking and briefing a new shoot for every launch, you reserve regular
              shoot days on a monthly, quarterly or annual plan. Your products, team and events are
              photographed to one consistent standard, and invoicing is predictable.
            </p>
            <dl className="mt-9 grid gap-6 sm:grid-cols-3">
              {[
                ["Frequency", "Monthly, quarterly or annual"],
                ["Scope", "Agreed shoot days and deliverables"],
                ["Invoicing", "A fixed cycle that suits your accounts"],
              ].map(([term, detail]) => (
                <div key={term}>
                  <dt className="text-sm font-medium text-ink">{term}</dt>
                  <dd className="mt-1 text-sm text-ink-soft">{detail}</dd>
                </div>
              ))}
            </dl>
            <Link href="/corporate/retainers" className="text-link mt-9">
              Retainer details <ArrowIcon className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.slice(0, 2).map((p) => (
              <Photo key={p.id} photo={p} ratio={4 / 5} sizes="(min-width: 1024px) 25vw, 50vw" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="clients" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
        <h2 id="clients" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
          Clients &amp; case studies
        </h2>
        {/* PLACEHOLDER: add client logos (with permission) and short case studies here. */}
        <p className="mt-5 max-w-[60ch] text-lg text-ink-soft">
          Case studies are being prepared. Ask us for samples relevant to your industry when you
          request a quote.
        </p>
      </section>

      <CtaBand
        title="Request a corporate quote"
        text="Tell us what you need photographed, how often, and where the images will be used. We’ll send a scoped quote."
        href="/contact?type=corporate"
        cta="Request a quote"
        whatsappMessage="Hi ADS Photography, I'd like a quote for corporate/product photography."
      />
    </>
  );
}
