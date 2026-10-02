import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { CtaBand } from "@/components/CtaBand";
import { gallery } from "@/lib/photos";
import { ModeReadout } from "@/components/motion/ModeReadout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Best Wedding Photographers in Coimbatore",
  description:
    "Candid wedding and marriage photography in Coimbatore by ADS Photography: engagement and pre-wedding photoshoots, muhurtham, thali-tying and reception coverage for Tamil and Kongu weddings.",
  path: "/portfolio/weddings",
});

export default function WeddingsPage() {
  const photos = gallery("weddings");
  return (
    <>
      <PageHeader
        title="Candid wedding photography in Coimbatore"
        intro="Marriage photography from the engagement photoshoot and nichayathartham to the reception: every ritual, every elder’s blessing, and the quiet moments in between."
      />
      <section className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <ModeReadout href="/portfolio/weddings" frames={photos.length} />
        <PortfolioGallery photos={photos} />
        <p className="mt-8 max-w-[65ch] text-ink-soft">
          Planning your coverage? Read{" "}
          <Link href="/blog/wedding-photographer-coimbatore" className="text-link text-ink">
            how to choose a wedding photographer in Coimbatore
          </Link>
          .
        </p>
      </section>
      <CtaBand
        title="Check your wedding date"
        text="Share your dates, venues and muhurtham timings. We’ll reply with availability and a package suggestion."
        href="/contact?service=wedding"
        whatsappMessage="Hi ADS Photography, I'd like to check availability for our wedding."
      />
    </>
  );
}
