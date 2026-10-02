import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

const roles = ["Founder & lead photographer", "Photographer", "Editor & album designer"];

export const metadata = pageMetadata({
  title: "About Our Photo Studio in Coimbatore",
  description:
    "Meet ADS Photography, a professional photographer and indoor photo studio in Coimbatore for candid weddings, maternity, baby and family portraits, and product photography.",
  path: "/about",
});

/** PLACEHOLDER copy is marked below. Replace it with the studio's real story and team. */
function ToWrite({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-dashed border-[#bdbdbd] px-4 py-3 text-base text-muted">
      <span className="font-medium text-ink-soft">To be written: </span>
      {children}
    </p>
  );
}

export default function AboutPage() {
  // public/photos/about/studio (first file) and about/team (one per role, in file-name order).
  const [studio] = slots("about/studio", [{ id: "studio", category: "family", ratio: 4 / 5, alt: "The ADS Photography studio in Coimbatore" }], "the ADS Photography studio in Coimbatore");
  const team = slots(
    "about/team",
    roles.map((role, i) => ({ id: `team-${i}`, category: "family" as const, ratio: 4 / 5, alt: `Portrait of the ADS Photography ${role.toLowerCase()}` })),
    "ADS Photography team, Coimbatore",
  );
  return (
    <>
      <PageHeader
        title="About the studio"
        intro="A professional photo studio in Coimbatore photographing the city’s milestones: weddings, new arrivals and growing families, and the products its businesses make."
      />

      <section aria-labelledby="story" className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div>
          <h2 id="story" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
            Our story
          </h2>
          <div className="mt-8 space-y-4">
            <ToWrite>How ADS Photography started, and what “ADS” stands for.</ToWrite>
            <ToWrite>What the studio believes makes a photograph worth keeping.</ToWrite>
            <ToWrite>The kinds of families and businesses you most enjoy working with.</ToWrite>
          </div>
        </div>
        <Photo photo={studio} ratio={4 / 5} />
      </section>

      <section aria-labelledby="team" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 id="team" className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
            The team
          </h2>
          <ul className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, i) => (
              <li key={role}>
                <Photo
                  photo={team[i]}
                  ratio={4 / 5}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <p className="mt-5 text-lg font-medium">Name to be added</p>
                <p className="text-ink-soft">{role}</p>
                <div className="mt-4">
                  <ToWrite>A two-line bio.</ToWrite>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Come and say hello" text="Visit the studio, or message us to talk through your plans." />
    </>
  );
}
