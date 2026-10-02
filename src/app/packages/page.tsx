import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon } from "@/components/icons";
import { formatPrice, inclusionsConfirmed, packages, startingPrice } from "@/content/packages";
import { pageMetadata } from "@/lib/seo";
import { Lens, LensCard } from "@/components/motion/Lens";

export const metadata = pageMetadata({
  title: "Wedding Photography Packages & Prices in Coimbatore",
  description:
    "Compare budget to luxury wedding photography packages in Coimbatore, plus maternity, baby and family shoot packages. Price details for candid wedding and pre-wedding photography on request.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        title="Photography packages"
        intro="Three ways to work with us, from an affordable intimate session to a multi-day wedding. Pick your lens: every package can be adjusted to your plans and budget."
      />

      <section aria-label="Packages" className="mx-auto mt-14 max-w-6xl px-5 sm:mt-20 sm:px-8">
        {!inclusionsConfirmed ? (
          <p className="mb-8 border border-line bg-stone px-4 py-3 text-sm text-ink-soft">
            Package details are being finalised. The inclusions below are an outline and will be
            confirmed with you when you enquire.
          </p>
        ) : null}
        <p className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-lg">
          <span className="font-medium">Customisable packages starting from {formatPrice(startingPrice)}.</span>
          <span className="text-ink-soft">Confirm the price for your date on request.</span>
        </p>
        <ol className="grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <LensCard
              key={pkg.id}
              className={`flex flex-col border p-7 sm:p-9 ${
                i === 1 ? "border-ink bg-white" : "border-line bg-white/60"
              }`}
            >
              <div className="mb-7 flex min-h-[5.5rem] items-center border-b border-line pb-6">
                <Lens lens={pkg.lens} />
              </div>
              <h2 className="display text-4xl">{pkg.name}</h2>
              <p className="mt-3 text-ink-soft">{pkg.description}</p>
              <p className="mt-7 border-t border-line pt-6 text-sm font-medium text-muted">
                {formatPrice(pkg.price)}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-soft">
                    <svg viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?package=${pkg.id}`}
                className={`btn mt-9 w-full ${i === 1 ? "btn-primary" : "btn-secondary"}`}
              >
                Enquire about {pkg.name} <ArrowIcon className="size-4" />
              </Link>
            </LensCard>
          ))}
        </ol>
        <p className="mt-10 max-w-[65ch] text-ink-soft">
          Need something different, like a second photographer, an extra day or an album upgrade? Ask
          us; packages are a starting point. Business or product work?{" "}
          <Link href="/corporate" className="text-link text-ink">
            See corporate services
          </Link>
          .
        </p>
      </section>

      <CtaBand title="Not sure which fits?" text="Tell us about your event and we’ll recommend a package." />
    </>
  );
}
