"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

/**
 * Navigating between pages fires the shutter: two blades snap shut over the
 * old page and part again on the new one. It never runs on the first load
 * (the homepage has its own iris intro) or for reduced-motion visitors.
 */
export function PageShutter() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const first = useRef(true);
  const closed = useMotionValue(0);
  const top = useTransform(closed, [0, 1], ["-100%", "0%"]);
  const bottom = useTransform(closed, [0, 1], ["100%", "0%"]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;
    closed.jump(1);
    const controls = animate(closed, 0, { duration: 0.55, delay: 0.06, ease: [0.7, 0, 0.2, 1] });
    return () => controls.stop();
  }, [pathname, reduce, closed]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[65] overflow-hidden">
      <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-night" style={{ y: top }} />
      <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-night" style={{ y: bottom }} />
    </div>
  );
}
