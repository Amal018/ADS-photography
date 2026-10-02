"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

const ROLL = 36;

/**
 * A film-roll frame counter in the corner of wide screens: reading down a
 * page winds the film on from frame 01 to 36.
 */
export function FrameCounter() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [frame, setFrame] = useState(1);
  const [end, setEnd] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setFrame(Math.min(ROLL, Math.max(1, Math.round(p * (ROLL - 1)) + 1)));
    // Step aside at the end of the roll so the footer's last line stays clear.
    setEnd(p > 0.985);
  });

  return (
    <div
      aria-hidden="true"
      className={`readout pointer-events-none fixed bottom-6 right-6 z-30 hidden items-center gap-2.5 border border-line bg-paper/90 px-3 py-2 text-[0.68rem] text-muted backdrop-blur-sm transition-opacity duration-300 lg:flex ${
        end ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="relative block h-3.5 w-3.5 overflow-hidden rounded-full border border-current">
        <motion.span
          className="absolute inset-0 origin-center"
          animate={reduce ? undefined : { rotate: frame * 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <span className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-current" />
        </motion.span>
      </span>
      <span className="text-ink">{String(frame).padStart(2, "0")}</span>
      <span>/ {ROLL}</span>
    </div>
  );
}
