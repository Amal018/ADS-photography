import { site } from "@/content/site";

/** Text wordmark used until the studio supplies a logo. */
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-baseline gap-2 ${light ? "text-on-night" : "text-ink"}`} aria-label={site.name}>
      <span className="display text-[1.7rem] leading-none tracking-[0.02em]">ADS</span>
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.28em] opacity-80">Photography</span>
    </span>
  );
}
