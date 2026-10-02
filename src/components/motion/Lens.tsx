"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Package } from "@/content/packages";

const ease = [0.16, 1, 0.3, 1] as const;
// Barrel length in the drawing for each focal length: longer lens, longer barrel.
const BARREL: Record<Package["lens"]["focal"], number> = { 35: 46, 50: 62, 85: 86 };
const ZOOM = 16;

/**
 * A package card that behaves like picking a lens: on hover it lifts a little
 * and the lens drawing inside it zooms out to its longer length.
 */
export function LensCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className={className}
      initial="short"
      whileInView="rest"
      whileHover={reduce ? undefined : "zoom"}
      viewport={{ once: true, amount: 0.4 }}
      variants={{ short: { y: 0 }, rest: { y: 0 }, zoom: { y: -6 } }}
      transition={{ duration: 0.4, ease }}
    >
      {children}
    </motion.li>
  );
}

/**
 * A side view of a camera lens with its focal length. Inside a LensCard it
 * follows the card's hover; on its own (`standalone`) it extends once when it
 * scrolls into view.
 */
export function Lens({ lens, size = "md", standalone = false }: { lens: Package["lens"]; size?: "sm" | "md"; standalone?: boolean }) {
  const reduce = useReducedMotion();
  const length = BARREL[lens.focal];
  const t = reduce ? { duration: 0 } : { duration: 0.7, ease };
  const barrel: Variants = { short: { width: 24 }, rest: { width: length }, zoom: { width: length + ZOOM } };
  const front: Variants = { short: { x: 24 }, rest: { x: length }, zoom: { x: length + ZOOM } };
  const ring: Variants = { short: { x: 10 }, rest: { x: length * 0.45 }, zoom: { x: length * 0.45 + ZOOM / 2 } };
  const own = standalone ? { initial: "short", whileInView: "rest", viewport: { once: true, amount: 0.6 } } : {};

  return (
    <div className={`flex items-center ${size === "sm" ? "gap-3" : "gap-5"}`}>
      <motion.svg
        viewBox="0 0 132 40"
        className={size === "sm" ? "h-6 w-[79px] shrink-0" : "h-10 w-[132px] shrink-0"}
        aria-hidden="true"
        {...own}
      >
        {/* Mount that meets the camera */}
        <rect x="0" y="9" width="8" height="22" rx="1" fill="#3a3a3a" />
        <rect x="6" y="6" width="3" height="28" fill="#5a5a5a" />
        {/* Barrel */}
        <motion.rect x="9" y="5" height="30" rx="2" fill="#1a1a1a" variants={barrel} transition={t} />
        {/* Knurled focus ring */}
        <motion.g variants={ring} transition={t}>
          <rect x="9" y="4" width="16" height="32" rx="1.5" fill="#2b2b2b" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={10 + i * 2} y="5" width="1" height="30" fill="#484848" />
          ))}
        </motion.g>
        {/* Front element */}
        <motion.g variants={front} transition={t}>
          <rect x="5" y="3" width="6" height="34" rx="1.5" fill="#111" />
          <rect x="9" y="7" width="3" height="26" rx="1.5" fill="#e0322a" opacity="0.9" />
          <ellipse cx="13" cy="20" rx="3" ry="12" fill="url(#lens-glass)" />
        </motion.g>
        <defs>
          <linearGradient id="lens-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7fa8c9" />
            <stop offset="0.5" stopColor="#24384d" />
            <stop offset="1" stopColor="#6b4f8a" />
          </linearGradient>
        </defs>
      </motion.svg>
      <div className="readout leading-tight">
        <p className={size === "sm" ? "text-sm font-semibold text-ink" : "text-xl font-semibold text-ink"}>{lens.focal}mm</p>
        <p className={`${size === "sm" ? "text-[0.6rem]" : "text-[0.68rem]"} tracking-[0.16em] text-muted`}>
          {lens.kind.toUpperCase()}
          {size === "md" ? <span className="tracking-normal normal-case"> · {lens.note}</span> : null}
        </p>
      </div>
    </div>
  );
}
