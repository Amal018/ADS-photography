"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import type { Photo as PhotoData } from "@/content/portfolio";

// A flat, ungraded look for the demo when only the finished photo exists.
const FLAT = "saturate(0.5) contrast(0.74) brightness(1.1) sepia(0.12)";

/**
 * Drag the handle (or use the arrow keys) to compare the photo as it left the
 * camera with the finished edit. On first view the handle sweeps once to
 * show that it moves.
 */
export function BeforeAfter({
  before,
  after,
  simulated = false,
}: {
  before?: PhotoData;
  after: PhotoData;
  /** No real before file: show the finished photo with a flat grade instead. */
  simulated?: boolean;
}) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: 0.5 });
  const pos = useMotionValue(50);
  const [value, setValue] = useState(50);
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const dragging = useRef(false);

  useMotionValueEvent(pos, "change", (p) => setValue(Math.round(p)));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(pos, [50, 78, 24, 50], { duration: 2.4, ease: "easeInOut", delay: 0.3 });
    return () => controls.stop();
  }, [inView, reduce, pos]);

  function moveTo(clientX: number) {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    pos.stop();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }

  const beforeSrc = before?.src ?? after.src;

  return (
    <div
      ref={box}
      className="relative select-none overflow-hidden bg-placeholder"
      style={{ aspectRatio: Math.max(after.ratio, 1.2), touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) moveTo(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {after.src ? (
        <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover object-[center_22%]" />
      ) : null}
      {beforeSrc ? (
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <Image
            src={beforeSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover object-[center_22%]"
            style={simulated ? { filter: FLAT } : undefined}
          />
        </motion.div>
      ) : null}

      <span className="readout pointer-events-none absolute left-3 top-3 bg-night/75 px-2 py-1 text-[0.65rem] text-on-night">
        {simulated ? "FLAT · DEMO" : "RAW"}
      </span>
      <span className="readout pointer-events-none absolute right-3 top-3 bg-paper/85 px-2 py-1 text-[0.65rem] text-ink">
        EDITED
      </span>

      <motion.div className="pointer-events-none absolute inset-y-0 -ml-px w-0.5 bg-white" style={{ left }}>
        <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-night/40 text-white backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </motion.div>

      {/* Keyboard and screen-reader control; pointer dragging is handled above. */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => {
          pos.stop();
          pos.set(Number(e.target.value));
        }}
        onPointerDown={(e) => e.preventDefault()}
        aria-label="Compare the photo before and after editing"
        className="peer absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
      <span className="pointer-events-none absolute inset-0 -outline-offset-4 outline-white peer-focus-visible:outline-2" />
    </div>
  );
}
