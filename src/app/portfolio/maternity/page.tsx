import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { CtaBand } from "@/components/CtaBand";
import { photosFor } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Maternity & Family Photography in Coimbatore",
  description:
    "Maternity, valaikaappu, newborn and family photography in Coimbatore by ADS Photography, at home, outdoors or in the studio.",
  path: "/portfolio/maternity",
});

export default function MaternityPage() {
  return (
    <>
      <PageHeader
        title="Maternity & family photography"
        intro="Maternity sessions, valaikaappu ceremonies, newborns and family portraits, at home, outdoors or in the studio."
      />
      <section className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <PortfolioGallery
          photos={photosFor("maternity", "family")}
          filters={[
            { id: "maternity", label: "Maternity" },
            { id: "family", label: "Family" },
          ]}
        />
        <p className="mt-8 max-w-[65ch] text-ink-soft">
          Planning ahead? Read{" "}
          <Link href="/blog/maternity-shoot-coimbatore" className="text-link text-ink">
            our guide to planning a maternity shoot in Coimbatore
          </Link>
          .
        </p>
      </section>
      <CtaBand
        title="Plan your session"
        text="Tell us your due date or ceremony date, and whether you’d like a studio, home or outdoor shoot."
        href="/contact?service=maternity"
        whatsappMessage="Hi ADS Photography, I'd like to plan a maternity/family shoot."
      />
    </>
  );
}
