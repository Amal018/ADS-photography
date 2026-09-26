import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { CtaBand } from "@/components/CtaBand";
import { categories, photos } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio: Wedding Photography in Coimbatore",
  description:
    "Browse wedding, maternity, family and product photography by ADS Photography, a photography studio in Coimbatore.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Portfolio"
        intro="Wedding photography in Coimbatore, alongside maternity, family and product work. Filter by the kind of shoot you’re planning."
      >
        <Link href="/portfolio/weddings" className="btn btn-secondary">
          Weddings
        </Link>
        <Link href="/portfolio/maternity" className="btn btn-secondary">
          Maternity &amp; family
        </Link>
      </PageHeader>
      <section className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <PortfolioGallery photos={photos} filters={categories.map(({ id, label }) => ({ id, label }))} />
      </section>
      <CtaBand
        title="Like what you see?"
        text="See what each package includes, or send us your date and we’ll check availability."
        href="/packages"
        cta="View pricing"
      />
    </>
  );
}
