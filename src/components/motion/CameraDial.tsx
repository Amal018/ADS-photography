"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { Lcd, LcdArrow, LCD_SETTINGS, lcdButtonClass } from "./Lcd";

const STEP = 40; // degrees between stops, like the detents on a mode dial
const SIZE = 216;

/**
 * Category filter as a DSLR mode dial seen from above. Roll it like the real
 * thing: drag it round, scroll the mouse wheel over it, use the arrow keys,
 * or tap a mode. It clicks into the nearest detent under the index mark, and
 * the top LCD beside it reads out the mode and how many frames it holds.
 */
export function CameraDial<T extends string>({
  options,
  active,
  onSelect,
  counts,
}: {
  options: { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
  /** Photos per option, shown on the LCD. */
  counts: Record<string, number>;
}) {
  const reduce = useReducedMotion();
  const dial = useRef<HTMLDivElement>(null);
  const index = Math.max(0, options.findIndex((o) => o.id === active));
  const rotation = useMotionValue(-index * STEP);
  const [live, setLive] = useState(index);
  const drag = useRef<{ startAngle: number; startRot: number; moved: boolean } | null>(null);
  const last = options.length - 1;
  // Where the dial is heading, so quick repeated presses each move one more stop.
  const target = useRef(index);

  // The mode under the index mark while the dial turns, for the detent tick and LCD.
  useMotionValueEvent(rotation, "change", (r) => {
    const i = Math.min(last, Math.max(0, Math.round(-r / STEP)));
    if (i !== live) {
      setLive(i);
      if (drag.current) navigator.vibrate?.(4);
    }
  });

  function settle(i: number) {
    const to = Math.min(last, Math.max(0, i));
    target.current = to;
    animate(rotation, -to * STEP, reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 22 });
    onSelect(options[to].id);
  }

  // Follow outside changes (e.g. a #hash deep link).
  useEffect(() => {
    target.current = index;
    if (!drag.current) animate(rotation, -index * STEP, reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 22 });
  }, [index, reduce, rotation]);

  // Wheel over the dial rolls it one detent per notch instead of scrolling the page.
  useEffect(() => {
    const el = dial.current;
    if (!el) return;
    let cooldown = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now < cooldown || Math.abs(e.deltaY) < 4) return;
      cooldown = now + 140;
      const current = Math.round(-rotation.get() / STEP);
      settle(current + (e.deltaY > 0 ? 1 : -1));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  const angleAt = (e: React.PointerEvent) => {
    const r = dial.current!.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    rotation.stop();
    drag.current = { startAngle: angleAt(e), startRot: rotation.get(), moved: false };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    let delta = angleAt(e) - d.startAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    if (Math.abs(delta) > 2) d.moved = true;
    // A little give past the end stops, like a dial against its limit.
    const min = -last * STEP - 12;
    rotation.set(Math.min(12, Math.max(min, d.startRot + delta)));
  }

  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.moved) {
      settle(Math.round(-rotation.get() / STEP));
      return;
    }
    // A tap: jump to the mode label that was tapped, if any.
    const tapped = (e.target as HTMLElement).closest<HTMLElement>("[data-stop]");
    settle(tapped ? Number(tapped.dataset.stop) : index);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in map) settle(index + map[e.key]);
    else if (e.key === "Home") settle(0);
    else if (e.key === "End") settle(last);
    else return;
    e.preventDefault();
  }

  const shown = options[live];
  const knurl = useTransform(rotation, (r) => `rotate(${r}deg)`);

  return (
    <div className="flex flex-wrap items-center gap-8 sm:gap-12">
      {/* The dial */}
      <div className="relative select-none" style={{ width: SIZE, height: SIZE + 18 }}>
        {/* Index mark on the camera body */}
        <span aria-hidden="true" className="absolute left-1/2 top-0 z-10 h-3.5 w-1 -translate-x-1/2 rounded-full bg-[#e0322a]" />
        <div
          ref={dial}
          role="slider"
          tabIndex={0}
          aria-label="Moments category dial"
          aria-valuemin={0}
          aria-valuemax={last}
          aria-valuenow={index}
          aria-valuetext={options[index].label}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
          className="absolute left-0 top-[18px] cursor-grab touch-none rounded-full outline-offset-4 active:cursor-grabbing"
          style={{ width: SIZE, height: SIZE }}
        >
          {/* Base shadow */}
          <span aria-hidden="true" className="absolute inset-0 translate-y-1.5 rounded-full bg-black/25 blur-md" />
          <motion.div className="absolute inset-0 rounded-full" style={{ transform: knurl }}>
            {/* Knurled grip around the edge */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg, #2a2a2a 0deg 2.2deg, #4a4a4a 2.2deg 3.6deg, #1a1a1a 3.6deg 5deg)",
              }}
            />
            {/* Top face */}
            <span
              aria-hidden="true"
              className="absolute inset-[11px] rounded-full shadow-[inset_0_2px_3px_rgba(255,255,255,0.18),inset_0_-3px_6px_rgba(0,0,0,0.6)]"
              style={{ background: "radial-gradient(circle at 38% 30%, #3b3b3b, #161616 62%, #0d0d0d)" }}
            />
            {/* Brushed-metal centre */}
            <span
              aria-hidden="true"
              className="absolute inset-[38%] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              style={{ background: "repeating-conic-gradient(#5a5a5a 0deg 6deg, #4a4a4a 6deg 12deg)" }}
            />
            {/* Mode labels around the rim, plus decorative detent dots */}
            {options.map((o, i) => (
              <span
                key={o.id}
                data-stop={i}
                className="absolute left-1/2 top-1/2 flex h-[42%] w-14 origin-top cursor-pointer justify-center"
                style={{ transform: `translateX(-50%) rotate(${i * STEP + 180}deg)` }}
              >
                <span
                  className={`readout absolute bottom-[14%] rotate-180 text-[0.78rem] font-semibold tracking-[0.08em] transition-colors duration-200 ${
                    i === live ? "text-white" : "text-[#9a9a9a]"
                  }`}
                >
                  {shortLabel(o.label)}
                </span>
              </span>
            ))}
            {Array.from({ length: 9 }, (_, k) => (
              <span
                key={`dot-${k}`}
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[47%] w-px origin-top"
                style={{ transform: `translateX(-50%) rotate(${(last + 1 + k) * STEP + 180}deg)` }}
              >
                <span className="absolute bottom-[18%] left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#5c5c5c]" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Top LCD readout */}
      <Lcd className="min-w-[13rem] flex-1 sm:max-w-xs">
        <div aria-hidden="true" className="flex items-center justify-between text-[0.65rem] tracking-[0.18em] opacity-70">
          <span>MODE</span>
          <span>{LCD_SETTINGS}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <LcdButton label="Previous category" onClick={() => settle(target.current === 0 ? last : target.current - 1)}>
            <LcdArrow dir="prev" />
          </LcdButton>
          <motion.p
            key={shown.id}
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="flex-1 text-center text-xl font-semibold uppercase tracking-[0.06em]"
          >
            {shown.label}
          </motion.p>
          <LcdButton label="Next category" onClick={() => settle(target.current === last ? 0 : target.current + 1)}>
            <LcdArrow dir="next" />
          </LcdButton>
        </div>
        <div aria-hidden="true" className="mt-3 flex items-center justify-between text-xs tracking-[0.12em]">
          <span>[{String(counts[shown.id] ?? 0).padStart(3, "0")}] FRAMES</span>
          <span className="flex gap-1">
            {options.map((o, i) => (
              <span key={o.id} className={`h-1.5 w-3 ${i === live ? "bg-[#1b2a1f]" : "bg-[#1b2a1f]/20"}`} />
            ))}
          </span>
        </div>
      </Lcd>
      <p className="w-full text-sm text-muted">Roll the dial (drag, scroll or use the arrow keys), or press the arrows on the display, to change the category.</p>
    </div>
  );
}

/** A rubber camera button set into the LCD bezel. */
function LcdButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      className={lcdButtonClass}
    >
      {children}
    </motion.button>
  );
}

/** "All work" → "ALL", "Weddings" → "WED": the short codes printed on a dial. */
function shortLabel(label: string) {
  return label.split(" ")[0].slice(0, 3).toUpperCase();
}
