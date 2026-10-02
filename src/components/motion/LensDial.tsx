"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Category filter as a lens focus ring: the ring of labels and its knurled
 * tick marks turn until the chosen category sits under the red index mark.
 * Each label is still an ordinary toggle button.
 */
export function LensDial<T extends string>({
  options,
  active,
  onSelect,
}: {
  options: { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
}) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [step, setStep] = useState(150);
  const index = Math.max(0, options.findIndex((o) => o.id === active));

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      setWidth(el.clientWidth);
      setStep(el.clientWidth < 480 ? 116 : 150);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const x = width / 2 - (index + 0.5) * step;

  return (
    <div
      ref={box}
      role="group"
      aria-label="Filter by category"
      className="relative overflow-hidden border-y border-line bg-stone [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <svg aria-hidden="true" viewBox="0 0 10 8" className="absolute left-1/2 top-0 z-10 h-2 w-2.5 -translate-x-1/2 fill-[#e0322a]">
        <path d="M0 0h10L5 8z" />
      </svg>
      <motion.div
        className="relative flex w-max"
        initial={false}
        animate={{ x: width ? x : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}
        style={{ opacity: width ? 1 : 0 }}
      >
        {/* Knurled grip: fine ticks with a longer mark under each stop. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2.5 bg-[repeating-linear-gradient(90deg,var(--color-ink-soft)_0_1px,transparent_1px_10px)] opacity-40"
        />
        {options.map((o, i) => {
          const distance = Math.abs(i - index);
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={o.id === active}
              onClick={() => onSelect(o.id)}
              className="relative flex min-h-16 shrink-0 cursor-pointer items-center justify-center pb-2 text-sm font-medium"
              style={{ width: step }}
            >
              <motion.span
                initial={false}
                animate={{
                  opacity: distance === 0 ? 1 : distance === 1 ? 0.6 : 0.42,
                  scale: distance === 0 ? 1.08 : 0.94,
                }}
                transition={{ duration: 0.3 }}
                className={distance === 0 ? "text-ink" : "text-ink-soft"}
              >
                {o.label}
              </motion.span>
              <span aria-hidden="true" className={`absolute bottom-0 left-1/2 h-4 w-px ${distance === 0 ? "bg-ink" : "bg-ink-soft/50"}`} />
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
