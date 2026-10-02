/**
 * The camera's green top-plate LCD, shared by the mode dial, the gallery
 * pages and the About page so every readout on the site looks the same.
 */
export const LCD_SETTINGS = "ISO 200 · f/1.8";

export const lcdButtonClass =
  "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#1b2a1f] text-[#c9d4c3] no-underline shadow-[0_2px_0_#0c140f,inset_0_1px_0_rgba(255,255,255,0.15)] transition-colors hover:bg-[#2a3d2f] active:translate-y-px active:shadow-none";

export function Lcd({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`readout rounded-md border border-[#1f2a22] bg-[#c9d4c3] px-5 py-4 text-[#1b2a1f] shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}

export function LcdArrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
