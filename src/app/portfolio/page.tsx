import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { CtaBand } from "@/components/CtaBand";
import { categories } from "@/content/portfolio";
import { gallery } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photography Portfolio: Weddings, Baby & Product",
  description:
    "Browse candid wedding, maternity, baby, family portrait and product photography by ADS Photography, a professional photo studio in Coimbatore.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Portfolio"
        intro="Candid wedding photography in Coimbatore, alongside maternity, baby, family portrait and product work. Filter by the kind of shoot you’re planning."
      >
        <Link href="/portfolio/weddings" className="btn btn-secondary">
          Weddings
        </Link>
        <Link href="/portfolio/maternity" className="btn btn-secondary">
          Maternity &amp; family
        </Link>
      </PageHeader>
      <section className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <PortfolioGallery photos={categories.flatMap(({ id }) => gallery(id))} filters={categories.map(({ id, label }) => ({ id, label }))} />
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
