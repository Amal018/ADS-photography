import Link from "next/link";
import { Lcd, LcdArrow, LCD_SETTINGS, lcdButtonClass } from "./Lcd";

// The gallery pages in dial order; the arrows step through them like the dial does.
const modes = [
  { href: "/portfolio", label: "All work" },
  { href: "/portfolio/weddings", label: "Weddings" },
  { href: "/portfolio/maternity", label: "Maternity & family" },
];

/**
 * The mode dial's LCD for a single-category gallery page: the same readout,
 * with its arrows moving between the gallery pages.
 */
export function ModeReadout({ href, frames }: { href: string; frames: number }) {
  const i = Math.max(0, modes.findIndex((m) => m.href === href));
  const prev = modes[(i - 1 + modes.length) % modes.length];
  const next = modes[(i + 1) % modes.length];

  return (
    <Lcd className="max-w-md">
      <div aria-hidden="true" className="flex items-center justify-between text-[0.65rem] tracking-[0.18em] opacity-70">
        <span>MODE</span>
        <span>{LCD_SETTINGS}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Link href={prev.href} aria-label={`Previous: ${prev.label}`} className={lcdButtonClass}>
          <LcdArrow dir="prev" />
        </Link>
        <p className="flex-1 text-center text-xl font-semibold uppercase tracking-[0.06em]">{modes[i].label}</p>
        <Link href={next.href} aria-label={`Next: ${next.label}`} className={lcdButtonClass}>
          <LcdArrow dir="next" />
        </Link>
      </div>
      <div aria-hidden="true" className="mt-3 flex items-center justify-between text-xs tracking-[0.12em]">
        <span>[{String(frames).padStart(3, "0")}] FRAMES</span>
        <span className="flex gap-1">
          {modes.map((m, k) => (
            <span key={m.href} className={`h-1.5 w-3 ${k === i ? "bg-[#1b2a1f]" : "bg-[#1b2a1f]/20"}`} />
          ))}
        </span>
      </div>
    </Lcd>
  );
}
