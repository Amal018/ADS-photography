"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const MARKS = ["0.5", "0.7", "1", "2", "5", "∞"];

/**
 * The 404 number, shot out of focus: it hunts for focus along the lens's
 * distance scale and never quite finds it. Hovering racks it sharp.
 */
export function OutOfFocus() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="select-none">
      <motion.p
        className="display text-[clamp(7rem,26vw,16rem)] leading-none"
        initial={{ filter: "blur(18px)", opacity: 0.4 }}
        animate={reduce ? { filter: "blur(6px)", opacity: 1 } : { filter: ["blur(18px)", "blur(3px)", "blur(9px)", "blur(6px)"], opacity: 1 }}
        whileHover={{ filter: "blur(0px)" }}
        transition={{ duration: reduce ? 0 : 2.4, ease }}
      >
        404
      </motion.p>
      {/* Focus distance scale with the needle searching */}
      <div className="readout mt-8 max-w-md">
        <div className="relative h-6 border-b border-line">
          {MARKS.map((m, i) => (
            <span key={m} className="absolute bottom-0 h-2 w-px bg-ink-soft" style={{ left: `${(i / (MARKS.length - 1)) * 100}%` }} />
          ))}
          <motion.span
            className="absolute -bottom-1 h-5 w-0.5 -translate-x-1/2 bg-[#e0322a]"
            initial={{ left: "0%" }}
            animate={reduce ? { left: "62%" } : { left: ["0%", "88%", "35%", "62%"] }}
            transition={{ duration: reduce ? 0 : 2.4, ease }}
          />
        </div>
        <div className="relative mt-2 h-4 text-[0.65rem] text-muted">
          {MARKS.map((m, i) => (
            <span key={m} className="absolute -translate-x-1/2" style={{ left: `${(i / (MARKS.length - 1)) * 100}%` }}>
              {m}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[0.65rem] tracking-[0.18em] text-muted">AF · NO FOCUS LOCK</p>
      </div>
    </div>
  );
}
