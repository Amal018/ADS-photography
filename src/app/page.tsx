import Link from "next/link";
import { Photo } from "@/components/Photo";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { photos, type Photo as PhotoData } from "@/content/portfolio";
import { packages, formatPrice, startingPrice } from "@/content/packages";
import { posts } from "@/content/posts";
import { testimonials } from "@/content/testimonials";
import { site, whatsappLink } from "@/content/site";
import { namedSlot, photosIn, slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { ShutterIntro } from "@/components/motion/ShutterIntro";
import { FocusHeadline } from "@/components/motion/FocusHeadline";
import { Viewfinder } from "@/components/motion/Viewfinder";
import { DevelopPhoto } from "@/components/motion/DevelopPhoto";
import { ContactSheet } from "@/components/motion/ContactSheet";
import { Reveal } from "@/components/motion/Reveal";
import { ShutterButton } from "@/components/motion/ShutterButton";
import { BeforeAfter } from "@/components/motion/BeforeAfter";
import { Polaroid } from "@/components/motion/Polaroid";
import { Lens } from "@/components/motion/Lens";
import { JsonLd } from "@/components/JsonLd";
import { faqs, faqSchema } from "@/content/faq";

export const metadata = {
  ...pageMetadata({
    title: "Best Photographer in Coimbatore",
    description:
      "Professional photography services in Coimbatore for candid weddings, maternity, baby and newborn shoots, family portraits and product photography. View our portfolio & packages today.",
    path: "/",
  }),
  title: { absolute: "Best Photographer in Coimbatore | ADS Photography" },
};

const byId = (id: string) => photos.find((p) => p.id === id) as PhotoData;
const topic = "photographed by ADS Photography in Coimbatore";

// Photos come from public/photos/home/<section>; see public/photos/README.txt.
function homePhotos() {
  const work = photosIn("home/selected-work", "weddings", { topic });
  return {
    hero: slots("home/hero", [byId("w3"), byId("w4"), byId("f1")], topic),
    services: [
      { title: "Candid weddings", text: "Engagement, pre-wedding, marriage and reception photography.", href: "/portfolio/weddings", photo: namedSlot("home/services", "weddings", byId("w1"), topic) },
      { title: "Maternity & baby", text: "Maternity, valaikaappu, newborn, kids and family portraits.", href: "/portfolio/maternity", photo: namedSlot("home/services", "maternity", byId("m1"), topic) },
      { title: "Product", text: "Commercial product photography for catalogues and marketplaces.", href: "/corporate/product-shoots", photo: namedSlot("home/services", "product", byId("p2"), topic) },
      { title: "Headshots & events", text: "Team portraits, launches and corporate event photography.", href: "/corporate/headshots-events", photo: namedSlot("home/services", "headshots", byId("f2"), topic) },
    ],
    work: work.length ? work : ["w2", "m2", "w5", "f3", "w6", "p3"].map(byId),
  };
}

// Drop "before-…" and "after-…" files into public/photos/home/before-after for
// the comparison slider. Until then, development shows a demo built from the
// lead hero photo, and the live site leaves the section out.
function beforeAfter(fallback: PhotoData) {
  const pair = photosIn("home/before-after", "weddings", { topic });
  const before = pair.find((p) => p.name.toLowerCase().startsWith("before"));
  const after = pair.find((p) => p.name.toLowerCase().startsWith("after"));
  if (before && after) return { before, after, simulated: false };
  if (process.env.NODE_ENV !== "production" && fallback.src) return { after: fallback, simulated: true };
  return null;
}

// The review's Polaroid shows work from the same kind of shoot.
const reviewPhoto = { Wedding: 0, Maternity: 1, Family: 1, Corporate: 2 } as const;

export default function HomePage() {
  const testimonial = testimonials[0];
  const { hero, services, work } = homePhotos();
  const compare = beforeAfter(hero[0]);
  return (
    <>
      <ShutterIntro />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:pb-28">
        <div>
          <FocusHeadline
            text="Best photography services in Coimbatore"
            className="display text-[clamp(2.2rem,8.6vw,4.9rem)]"
          />
          <p className="rise mt-7 max-w-[44ch] text-lg text-ink-soft sm:text-xl" style={{ ["--i" as string]: 1 }}>
            A professional photo studio in Coimbatore with 20+ years of experience in candid
            weddings, maternity and baby photoshoots, family portraits and product photography,
            made with care from the first call to the final album.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ ["--i" as string]: 2 }}>
            <ShutterButton href="/contact" className="btn btn-primary">
              Book a shoot <ArrowIcon className="size-4" />
            </ShutterButton>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Hi ADS Photography, I'd like to enquire about a shoot.")}
                className="btn btn-secondary"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
              <a
                href={site.phoneHref}
                className="btn btn-secondary w-12 px-0"
                aria-label={`Call ${site.phone}`}
                title={`Call ${site.phone}`}
              >
                <PhoneIcon className="size-4" />
              </a>
            </div>
          </div>
          <ul className="rise mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-ink-soft" style={{ ["--i" as string]: 3 }}>
            <li><Link href="/portfolio" className="text-link">Moments</Link></li>
            <li><Link href="/packages" className="text-link">Packages</Link></li>
            <li><Link href="/corporate" className="text-link">For businesses</Link></li>
          </ul>
        </div>
        <Viewfinder className="rise">
          <div className="grid grid-cols-[1.35fr_1fr] gap-3 sm:gap-4">
            <Photo photo={hero[0]} ratio={0.66} priority sizes="(min-width: 1024px) 30vw, 58vw" className="row-span-2" />
            <Photo photo={hero[1]} ratio={1} priority sizes="(min-width: 1024px) 22vw, 40vw" />
            <Photo photo={hero[2]} ratio={1} priority sizes="(min-width: 1024px) 22vw, 40vw" />
          </div>
        </Viewfinder>
      </section>

      {/* Services */}
      <section aria-labelledby="services" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="services" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
              Photography services in Coimbatore
            </h2>
            <Link href="/portfolio" className="text-link">
              See all moments <ArrowIcon className="size-4" />
            </Link>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.title}>
                <Link href={s.href} className="group block no-underline">
                  <DevelopPhoto delay={i * 0.15}>
                    <Photo photo={s.photo} ratio={4 / 5} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  </DevelopPhoto>
                  <h3 className="mt-5 flex items-center justify-between text-lg font-medium text-ink">
                    {s.title}
                    <ArrowIcon className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink" />
                  </h3>
                  <p className="mt-1 text-ink-soft">{s.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected work */}
      <section aria-labelledby="work" className="bg-night text-on-night">
        <ContactSheet photos={work} titleId="work" />
      </section>

      {compare ? (
        <section aria-labelledby="edit" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end lg:gap-16">
            <Reveal>
              <h2 id="edit" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
                Finished by hand
              </h2>
              <p className="mt-5 max-w-[40ch] text-lg text-ink-soft">
                Every photograph is colour-graded and retouched one by one. Drag across the frame
                to compare the file as it left the camera with the image you receive.
              </p>
            </Reveal>
            <BeforeAfter before={compare.before} after={compare.after} simulated={compare.simulated} />
          </div>
        </section>
      ) : null}

      {/* Two divisions */}
      <section aria-labelledby="divisions" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 id="divisions" className="sr-only">
          How we work
        </h2>
        <div className="grid gap-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
          <div className="md:pr-14">
            <h3 className="display text-[clamp(1.9rem,3.6vw,2.75rem)]">Events &amp; portraits</h3>
            <p className="mt-4 max-w-[44ch] text-lg text-ink-soft">
              For couples and families: weddings, maternity, valaikaappu and family sessions, with
              packages from intimate ceremonies to multi-day celebrations.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/portfolio/weddings" className="text-link">Weddings</Link>
              <Link href="/portfolio/maternity" className="text-link">Maternity &amp; family</Link>
              <Link href="/packages" className="text-link">Packages</Link>
            </div>
          </div>
          <div className="md:pl-14">
            <h3 className="display text-[clamp(1.9rem,3.6vw,2.75rem)]">Corporate &amp; commercial</h3>
            <p className="mt-4 max-w-[44ch] text-lg text-ink-soft">
              For brands and manufacturers: product photography, monthly or quarterly retainers,
              team headshots and event coverage.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/corporate/product-shoots" className="text-link">Product shoots</Link>
              <Link href="/corporate/retainers" className="text-link">Retainers</Link>
              <Link href="/corporate" className="text-link">Request a quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section aria-labelledby="packages" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="packages" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
              Photography packages
            </h2>
            <p className="w-full text-lg text-ink-soft sm:order-last">
              Customisable packages starting from {formatPrice(startingPrice)}. Confirm the price for your date on request.
            </p>
            <Link href="/packages" className="text-link">
              Compare packages <ArrowIcon className="size-4" />
            </Link>
          </Reveal>
          <ol className="mt-12 grid border-t border-line sm:grid-cols-3">
            {packages.map((pkg, i) => (
              <li
                key={pkg.id}
                className={`border-b border-line py-8 sm:border-b-0 sm:py-10 ${i > 0 ? "sm:border-l sm:pl-8" : ""} ${i < 2 ? "sm:pr-8" : ""}`}
              >
                <Reveal delay={i * 0.1}>
                  <div className="mb-5">
                    <Lens lens={pkg.lens} size="sm" standalone />
                  </div>
                  <h3 className="display text-3xl">{pkg.name}</h3>
                  <p className="mt-3 text-ink-soft">{pkg.description}</p>
                  <p className="mt-6 text-sm font-medium text-muted">{formatPrice(pkg.price)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {testimonial ? (
        <section aria-label="Client review" className="overflow-hidden bg-stone">
          <figure className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[auto_1fr] md:gap-20">
            <div className="justify-self-center">
              <Polaroid
                photo={services[reviewPhoto[testimonial.service]].photo}
                caption={`${testimonial.name.split(" ")[0]} · ${testimonial.service.toLowerCase()}`}
              />
            </div>
            <Reveal>
              <blockquote className="text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-snug tracking-[-0.01em]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-ink-soft">
                {testimonial.name}, {testimonial.service}
              </figcaption>
              <Link href="/testimonials" className="text-link mt-6">
                More reviews
              </Link>
            </Reveal>
          </figure>
        </section>
      ) : null}

      {/* FAQ: long-tail questions, also published as FAQPage structured data */}
      <section aria-labelledby="faq" className="border-t border-line">
        <JsonLd data={faqSchema()} />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <h2 id="faq" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
              Questions, answered
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg text-ink-soft">
              Prices, packages and the areas we cover as a photographer in Coimbatore.
            </p>
          </Reveal>
          <div className="border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <span aria-hidden="true" className="relative mt-2 size-3.5 shrink-0">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <div className="pb-6 pr-10 text-ink-soft">
                  <p>{f.a}</p>
                  {f.link ? (
                    <Link href={f.link.href} className="text-link mt-3 text-ink">
                      {f.link.label} <ArrowIcon className="size-4" />
                    </Link>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Journal */}
      <section aria-labelledby="journal" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="journal" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
              Journal
            </h2>
            <Link href="/blog" className="text-link">
              All articles <ArrowIcon className="size-4" />
            </Link>
          </Reveal>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug} className="border-t border-line pt-6">
                <Link href={`/blog/${post.slug}`} className="group block no-underline">
                  <h3 className="text-xl font-medium leading-snug text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-ink-soft">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Let’s plan your shoot"
        text="Tell us the date, the place and the occasion. We’ll reply with availability and the package that fits."
        className=""
      />
    </>
  );
}
