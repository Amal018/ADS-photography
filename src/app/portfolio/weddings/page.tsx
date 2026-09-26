import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { CtaBand } from "@/components/CtaBand";
import { photosFor } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wedding Photography in Coimbatore",
  description:
    "Wedding photography in Coimbatore by ADS Photography: engagement, muhurtham, thali-tying and reception coverage for Tamil and Kongu weddings.",
  path: "/portfolio/weddings",
});

export default function WeddingsPage() {
  return (
    <>
      <PageHeader
        title="Wedding photography in Coimbatore"
        intro="From the nichayathartham to the reception: every ritual, every elder’s blessing, and the quiet moments in between."
      />
      <section className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <PortfolioGallery photos={photosFor("weddings")} />
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
