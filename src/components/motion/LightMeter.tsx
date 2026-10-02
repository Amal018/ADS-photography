"use client";

import { motion, useReducedMotion } from "framer-motion";

const STOPS = [-2, -1, 0, 1, 2];
const at = (s: number) => `${((s + 2) / 4) * 100}%`;

/**
 * A camera's exposure scale. The needle swings in from the left and settles
 * on the stop for this package: more coverage, more exposure.
 */
export function LightMeter({ stop, label }: { stop: number; label: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="readout mt-6 select-none text-[0.62rem] text-muted" role="img" aria-label={label}>
      <p aria-hidden="true" className="mb-1.5 tracking-[0.18em]">COVERAGE</p>
      <div className="relative mx-1 h-5">
        <div className="absolute inset-x-0 bottom-0 h-px bg-line" />
        {Array.from({ length: 17 }, (_, i) => (
          <span
            key={i}
            className={`absolute bottom-0 w-px -translate-x-1/2 ${i % 4 === 0 ? "h-3 bg-ink-soft" : "h-1.5 bg-line"}`}
            style={{ left: `${(i / 16) * 100}%` }}
          />
        ))}
        <motion.span
          className="absolute -top-1 -translate-x-1/2"
          initial={{ left: at(-2), opacity: 0 }}
          whileInView={{ left: at(stop), opacity: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 9, delay: 0.25 }}
        >
          <svg viewBox="0 0 10 8" className="block h-2 w-2.5 fill-[#e0322a]" aria-hidden="true">
            <path d="M0 0h10L5 8z" />
          </svg>
        </motion.span>
      </div>
      <div className="relative mx-1 mt-1.5 h-3">
        {STOPS.map((s) => (
          <span key={s} className={`absolute -translate-x-1/2 ${s === stop ? "text-ink" : ""}`} style={{ left: at(s) }}>
            {s > 0 ? `+${s}` : s === 0 ? "0" : `−${-s}`}
          </span>
        ))}
      </div>
    </div>
  );
}
