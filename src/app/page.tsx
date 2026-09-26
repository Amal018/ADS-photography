import Link from "next/link";
import { Photo } from "@/components/Photo";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { photos, type Photo as PhotoData } from "@/content/portfolio";
import { packages, formatPrice } from "@/content/packages";
import { posts } from "@/content/posts";
import { testimonials } from "@/content/testimonials";
import { whatsappLink } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Photography Studio in Coimbatore: Weddings, Maternity & Product Shoots",
    description:
      "ADS Photography is a photography studio in Coimbatore for weddings, maternity and family portraits, and corporate product shoots. Book a shoot or WhatsApp us.",
    path: "/",
  }),
  title: { absolute: "ADS Photography | Photography Studio in Coimbatore" },
};

const byId = (id: string) => photos.find((p) => p.id === id) as PhotoData;

const services = [
  { title: "Weddings", text: "Engagement to reception, every ritual covered.", href: "/portfolio/weddings", photo: byId("w1") },
  { title: "Maternity & family", text: "Maternity, valaikaappu, newborn and family sessions.", href: "/portfolio/maternity", photo: byId("m1") },
  { title: "Product", text: "Catalogue and marketplace imagery for brands.", href: "/corporate/product-shoots", photo: byId("p2") },
  { title: "Headshots & events", text: "Team portraits, launches and corporate events.", href: "/corporate/headshots-events", photo: byId("f2") },
];

export default function HomePage() {
  const testimonial = testimonials[0];
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:pb-28">
        <div>
          <h1 className="display rise text-[clamp(2.9rem,7.2vw,5.6rem)]">
            Photography studio in Coimbatore
          </h1>
          <p className="rise mt-7 max-w-[44ch] text-lg text-ink-soft sm:text-xl" style={{ ["--i" as string]: 1 }}>
            Weddings, maternity and family portraits, and product photography for Coimbatore
            businesses, made with care from the first call to the final album.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ ["--i" as string]: 2 }}>
            <Link href="/contact" className="btn btn-primary">
              Book a shoot <ArrowIcon className="size-4" />
            </Link>
            <a
              href={whatsappLink("Hi ADS Photography, I'd like to enquire about a shoot.")}
              className="btn btn-secondary"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </div>
          <ul className="rise mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-ink-soft" style={{ ["--i" as string]: 3 }}>
            <li><Link href="/portfolio" className="text-link">Portfolio</Link></li>
            <li><Link href="/packages" className="text-link">Packages</Link></li>
            <li><Link href="/corporate" className="text-link">For businesses</Link></li>
          </ul>
        </div>
        <div className="rise grid grid-cols-[1.35fr_1fr] gap-3 sm:gap-4" style={{ ["--i" as string]: 1 }}>
          <Photo photo={byId("w3")} ratio={0.66} priority sizes="(min-width: 1024px) 30vw, 58vw" className="row-span-2" />
          <Photo photo={byId("w4")} ratio={1} priority sizes="(min-width: 1024px) 22vw, 40vw" />
          <Photo photo={byId("f1")} ratio={1} sizes="(min-width: 1024px) 22vw, 40vw" />
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="services" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
              What we photograph
            </h2>
            <Link href="/portfolio" className="text-link">
              View the portfolio <ArrowIcon className="size-4" />
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.title}>
                <Link href={s.href} className="group block no-underline">
                  <Photo photo={s.photo} ratio={4 / 5} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
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
      <section aria-labelledby="work" className="bg-stone">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 id="work" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
            Selected work
          </h2>
          <div className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3">
            {["w2", "m2", "w5", "f3", "w6", "p3"].map((id) => (
              <div key={id} className="mb-3 break-inside-avoid sm:mb-4">
                <Photo photo={byId(id)} />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/portfolio" className="btn btn-secondary">
              Full portfolio <ArrowIcon className="size-4" />
            </Link>
            <Link href="/packages" className="btn btn-secondary">
              View pricing
            </Link>
          </div>
        </div>
      </section>

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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="packages" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
              Packages
            </h2>
            <Link href="/packages" className="text-link">
              Compare packages <ArrowIcon className="size-4" />
            </Link>
          </div>
          <ol className="mt-12 grid border-t border-line sm:grid-cols-3">
            {packages.map((pkg, i) => (
              <li
                key={pkg.id}
                className={`border-b border-line py-8 sm:border-b-0 sm:py-10 ${i > 0 ? "sm:border-l sm:pl-8" : ""} ${i < 2 ? "sm:pr-8" : ""}`}
              >
                <h3 className="display text-3xl">{pkg.name}</h3>
                <p className="mt-3 text-ink-soft">{pkg.description}</p>
                <p className="mt-6 text-sm font-medium text-muted">{formatPrice(pkg.price)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {testimonial ? (
        <section aria-label="Client review" className="bg-stone">
          <figure className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <blockquote className="display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-snug">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-6 text-ink-soft">
              {testimonial.name}, {testimonial.service}
            </figcaption>
            <Link href="/testimonials" className="text-link mt-6">
              More reviews
            </Link>
          </figure>
        </section>
      ) : null}

      {/* Journal */}
      <section aria-labelledby="journal" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="journal" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
              Journal
            </h2>
            <Link href="/blog" className="text-link">
              All articles <ArrowIcon className="size-4" />
            </Link>
          </div>
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
