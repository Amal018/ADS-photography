import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { packages } from "@/content/packages";
import { corporateServices } from "@/content/corporate";
import { site, whatsappLink } from "@/content/site";
import { StudioMap } from "@/components/StudioMap";
import { serviceOptions, type ServiceInterest } from "@/lib/inquiry";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Book a Photoshoot in Coimbatore",
  description:
    "Book a wedding, maternity, family or product photoshoot with ADS Photography in Coimbatore. Send an enquiry, WhatsApp us, or visit the studio.",
  path: "/contact",
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);

  const pkg = packages.find((p) => p.id === one("package"));
  const corporateService = corporateServices.find((s) => s.slug === one("service"));
  const isCorporate = one("type") === "corporate" || Boolean(corporateService);

  const requested = one("service");
  const defaultService: ServiceInterest | undefined = isCorporate
    ? "corporate"
    : serviceOptions.find((o) => o.value === requested)?.value;

  const defaultMessage = pkg
    ? `I'm interested in the ${pkg.name} package.`
    : corporateService
      ? `We're interested in ${corporateService.title.toLowerCase()}.`
      : undefined;

  return (
    <>
      <PageHeader
        dark={isCorporate}
        title={isCorporate ? "Request a quote" : "Book a shoot"}
        intro={
          isCorporate
            ? "Tell us what you need photographed and how often. We’ll reply with a scoped quote."
            : "Tell us the date, the place and the occasion. We’ll reply with availability and the package that fits."
        }
      />

      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.5fr_1fr]">
        <section aria-label="Enquiry form">
          {pkg ? (
            <p className="mb-8 inline-flex border border-line bg-stone px-4 py-1.5 text-sm font-medium">
              Enquiring about the {pkg.name} package
            </p>
          ) : null}
          <ContactForm
            defaultService={defaultService}
            packageId={pkg?.id}
            isCorporate={isCorporate}
            defaultMessage={defaultMessage}
          />
        </section>

        <aside aria-label="Other ways to reach us" className="space-y-8 lg:border-l lg:border-line lg:pl-12">
          <div>
            <h2 className="display text-3xl">Prefer to talk?</h2>
            <p className="mt-3 text-ink-soft">WhatsApp is the quickest way to reach us.</p>
            <a
              href={whatsappLink("Hi ADS Photography, I'd like to enquire about a shoot.")}
              className="btn btn-primary mt-6 w-full"
            >
              <WhatsAppIcon className="size-4" /> Chat on WhatsApp
            </a>
          </div>
          <address className="space-y-3 border-t border-line pt-8 not-italic text-ink-soft">
            <p className="flex gap-3">
              <PhoneIcon className="mt-1 size-4 shrink-0 text-muted" />
              <a href={site.phoneHref} className="text-link text-ink">
                {site.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <MailIcon className="mt-1 size-4 shrink-0 text-muted" />
              <a href={`mailto:${site.email}`} className="text-link text-ink">
                {site.email}
              </a>
            </p>
          </address>
          <StudioMap />
        </aside>
      </div>
    </>
  );
}
