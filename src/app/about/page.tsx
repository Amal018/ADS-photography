import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Lcd, LCD_SETTINGS } from "@/components/motion/Lcd";
import { site } from "@/content/site";
import { slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Our Photo Studio in Coimbatore",
  description:
    "ADS Photography (formerly Annai Digital Studio) is a professional photo studio in Maniyakarampalayam, Coimbatore, with 20+ years of experience, led by art director and 10+ world record holder Anthony Raj J.",
  path: "/about",
});

const proprietor = {
  name: "Anthony Raj J",
  role: "Proprietor & Art Director",
  honours: ["President, Studio Owners Association, Coimbatore", "Holder of 10+ world records", "Art director"],
};

// Everything the studio offers, as listed on its Instagram.
const underOneRoof = [
  "Wedding photography",
  "Portraits",
  "Product photography",
  "Passport photos",
  "Customised gifts",
  "Photo frames",
  "Canvas prints",
  "Acrylic frames",
  "Flex printing",
];

export default function AboutPage() {
  // public/photos/about/studio (first file) and about/proprietor (first file).
  const [studio] = slots("about/studio", [{ id: "studio", category: "family", ratio: 4 / 5, alt: "The ADS Photography studio in Coimbatore" }], "the ADS Photography studio in Coimbatore");
  const [portrait] = slots("about/proprietor", [{ id: "proprietor", category: "family", ratio: 4 / 5, alt: `${proprietor.name}, ${proprietor.role.toLowerCase()} of ADS Photography` }], "ADS Photography, Coimbatore");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: proprietor.name,
          jobTitle: proprietor.role,
          worksFor: { "@id": `${site.url}/#business` },
          memberOf: { "@type": "Organization", name: "Studio Owners Association, Coimbatore" },
        }}
      />
      <PageHeader
        title="About the studio"
        intro={`A professional photo studio in Coimbatore with ${site.experience} of experience, photographing the city’s weddings, new arrivals, growing families and the products its businesses make.`}
      />

      <section aria-labelledby="story" className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <Reveal>
          <h2 id="story" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
            Our story
          </h2>
          <div className="mt-8 max-w-[58ch] space-y-5 text-lg text-ink-soft">
            <p className="text-[clamp(1.35rem,2.4vw,1.7rem)] font-medium leading-snug text-ink">
              Some moments deserve more than just a click.
            </p>
            <p>
              For {site.experience}, we have photographed Coimbatore’s celebrations from our studio
              opposite State Bank in Maniyakarampalayam, first as {site.formerName} and now as ADS
              Photography. Every smile, every celebration
              and every milestone deserves to be remembered beautifully, and that is the standard
              we hold every shoot to.
            </p>
            <p>
              Families come to us for weddings, maternity and baby shoots and portraits; businesses
              come for product photography. Once the photographs are made, we can print, frame and
              finish them here too, so your memories never have to leave the studio half-done.
            </p>
          </div>
        </Reveal>
        <Photo photo={studio} ratio={4 / 5} />
      </section>

      <section aria-labelledby="proprietor" className="bg-night text-on-night">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[minmax(0,0.8fr)_1.2fr] md:items-center md:gap-16">
          {/* Seen through the viewfinder: corner brackets, a locked focus point and the exposure line. */}
          <div className="relative p-4">
            {["left-0 top-0", "right-0 top-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((pos) => (
              <svg key={pos} viewBox="0 0 24 24" aria-hidden="true" className={`absolute size-7 text-white ${pos}`}>
                <path d="M1 12V1h11" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ))}
            <div className="relative">
              {portrait.src ? (
                <Photo photo={portrait} ratio={4 / 5} sizes="(min-width: 768px) 40vw, 100vw" />
              ) : (
                // No portrait yet: a monogram rather than a stand-in face.
                <div aria-hidden="true" className="flex aspect-[4/5] items-center justify-center bg-white/[0.04]">
                  <span className="display text-[clamp(5rem,14vw,9rem)] text-white/90">AR</span>
                </div>
              )}
              <svg viewBox="0 0 64 64" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] size-16 -translate-x-1/2 -translate-y-1/2 text-[#7dff9a]">
                <path d="M1 14V1h13M50 1h13v13M63 50v13H50M14 63H1V50" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="32" cy="32" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <p aria-hidden="true" className="readout mt-3 flex justify-between text-[0.65rem] text-on-night-soft">
              <span>{LCD_SETTINGS} · 1/250</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#1f9d45]" /> AF-S
              </span>
            </p>
          </div>
          <Reveal>
            <p className="readout text-xs tracking-[0.2em] text-on-night-soft">PROPRIETOR</p>
            <h2 id="proprietor" className="display mt-4 text-[clamp(2.4rem,5.5vw,4rem)]">
              {proprietor.name}
            </h2>
            <p className="mt-3 text-lg text-on-night-soft">{proprietor.role}</p>
            <Lcd className="mt-10">
              <p aria-hidden="true" className="flex justify-between text-[0.65rem] tracking-[0.18em] opacity-70">
                <span>SPEC SHEET</span>
                <span>{proprietor.honours.length} ENTRIES</span>
              </p>
              <ul className="mt-2">
                {proprietor.honours.map((h, i) => (
                  <li key={h} className="flex items-baseline gap-3 border-b border-[#1b2a1f]/15 py-3 font-semibold uppercase tracking-[0.04em] last:border-b-0">
                    <span aria-hidden="true" className="text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Lcd>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="services" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 id="services" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
            All under one roof
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-ink-soft">
            From the shoot to the frame on your wall: photography, prints and gifts from one studio
            in Coimbatore.
          </p>
        </Reveal>
        <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {underOneRoof.map((s, i) => (
            <li key={s} className="flex items-baseline gap-4 border-b border-line py-5 text-lg sm:pr-8">
              <span className="readout text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Come and say hello" text="Visit the studio opposite State Bank, Maniyakarampalayam, or message us to talk through your plans." />
    </>
  );
}
