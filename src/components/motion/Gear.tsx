"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import type { Gear } from "@/content/packages";

const ease = [0.16, 1, 0.3, 1] as const;
const LABEL: Record<Gear, string> = { camera: "CAMERA", video: "VIDEO", album: "ALBUM", drone: "DRONE" };

/**
 * A package card that unpacks its kit: hovering it (or, on touch screens,
 * scrolling it into view) lifts the gear out one piece at a time.
 */
export function GearCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const [touch, setTouch] = useState(false);
  useEffect(() => setTouch(!window.matchMedia("(hover: hover)").matches), []);

  return (
    <motion.li
      className={className}
      initial={reduce ? "unpacked" : "packed"}
      animate={reduce ? "unpacked" : undefined}
      whileHover={reduce || touch ? undefined : "unpacked"}
      whileInView={!reduce && touch ? "unpacked" : undefined}
      viewport={{ once: true, amount: 0.6 }}
      variants={{ packed: { y: 0 }, unpacked: { y: -4 } }}
      transition={{ duration: 0.4, ease }}
    >
      {children}
    </motion.li>
  );
}

/** The kit row inside a GearCard: an open case, and the gear rising out of it. */
export function Kit({ kit, size = "md" }: { kit: Gear[]; size?: "sm" | "md" }) {
  const reduce = useReducedMotion();
  const box = size === "sm" ? "size-11" : "size-14";
  return (
    <div className="relative">
      <motion.p
        aria-hidden="true"
        className="readout absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[0.65rem] tracking-[0.18em] text-muted"
        variants={{ packed: { opacity: 1 }, unpacked: { opacity: 0 } }}
        transition={{ duration: 0.2 }}
      >
        {kit.length} {kit.length === 1 ? "PIECE" : "PIECES"} IN THE KIT · <span className="hidden sm:inline">HOVER TO </span>UNPACK
      </motion.p>
      <ul className="flex items-end gap-4" aria-label={`Includes: ${kit.map((g) => LABEL[g].toLowerCase()).join(", ")}`}>
        {kit.map((g, i) => (
          <motion.li
            key={g}
            className="flex flex-col items-center gap-1.5"
            variants={{
              packed: { opacity: 0, y: 18, scale: 0.7 },
              unpacked: { opacity: 1, y: 0, scale: 1, transition: { delay: reduce ? 0 : i * 0.14, duration: 0.45, ease } },
            }}
            transition={{ duration: 0.2 }}
          >
            <svg viewBox="0 0 48 48" className={`${box} text-ink`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {g === "camera" ? <Camera delay={i * 0.14} /> : g === "video" ? <Video /> : g === "album" ? <Album delay={i * 0.14} /> : <Drone />}
            </svg>
            <span aria-hidden="true" className="readout text-[0.55rem] tracking-[0.16em] text-muted">
              {LABEL[g]}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// Each piece of gear animates on the card's "unpacked" state and rests on "packed".
const loop = (duration: number, extra: Transition = {}): Transition => ({ duration, repeat: Infinity, ease: "linear", ...extra });

/** A camera that fires its shutter once it is out of the case. */
function Camera({ delay }: { delay: number }) {
  const at = delay + 0.45;
  const blades: Variants = {
    packed: { scale: 0 },
    unpacked: { scale: [0, 1, 0], transition: { delay: at, duration: 0.32, times: [0, 0.45, 1] } },
  };
  return (
    <>
      <path d="M6 16h8l3-4h14l3 4h8v22H6z" />
      <circle cx="24" cy="26" r="8" />
      <circle cx="24" cy="26" r="4.5" strokeWidth="1" />
      <path d="M36 20h3" />
      {/* Shutter blades closing and opening */}
      <motion.g style={{ originX: "24px", originY: "26px" }} variants={blades}>
        <circle cx="24" cy="26" r="7" fill="currentColor" stroke="none" />
      </motion.g>
      {/* Flash */}
      <motion.circle
        cx="24"
        cy="26"
        r="22"
        fill="#fff8d6"
        stroke="none"
        variants={{ packed: { opacity: 0 }, unpacked: { opacity: [0, 0.85, 0], transition: { delay: at + 0.05, duration: 0.45 } } }}
      />
      {/* CLICK */}
      <motion.text
        x="24"
        y="7"
        textAnchor="middle"
        fontSize="6"
        fontFamily="ui-monospace, monospace"
        fill="#e0322a"
        stroke="none"
        variants={{ packed: { opacity: 0, y: 4 }, unpacked: { opacity: [0, 1, 1, 0], y: 0, transition: { delay: at, duration: 1.2, times: [0, 0.15, 0.7, 1] } } }}
      >
        CLICK
      </motion.text>
    </>
  );
}

/** A video camera: tape reels turning and the REC light blinking. */
function Video() {
  const spin: Variants = { packed: { rotate: 0 }, unpacked: { rotate: 360, transition: loop(1.6) } };
  return (
    <>
      <rect x="5" y="21" width="27" height="17" rx="2" />
      <path d="M32 26l11-5v17l-11-5z" />
      {[12, 25].map((cx) => (
        <motion.g key={cx} style={{ originX: `${cx}px`, originY: "13px" }} variants={spin}>
          <circle cx={cx} cy="13" r="6" />
          <path d={`M${cx} 8v10M${cx - 5} 13h10`} strokeWidth="1" />
        </motion.g>
      ))}
      <motion.circle
        cx="10"
        cy="26"
        r="1.8"
        fill="#e0322a"
        stroke="none"
        variants={{ packed: { opacity: 0.3 }, unpacked: { opacity: [1, 0.15, 1], transition: loop(1, { ease: "easeInOut" }) } }}
      />
    </>
  );
}

/** A photo album whose cover swings open. */
function Album({ delay }: { delay: number }) {
  return (
    <>
      <path d="M24 12v28" />
      <path d="M24 12c-5-3-12-3-18-1v28c6-2 13-2 18 1" />
      <path d="M10 18h9M10 23h9" strokeWidth="1" />
      {/* Right-hand page opening from the spine */}
      <motion.g
        style={{ originX: "24px", originY: "26px" }}
        variants={{ packed: { scaleX: 0.15 }, unpacked: { scaleX: 1, transition: { delay: delay + 0.35, duration: 0.6, ease } } }}
      >
        <path d="M24 12c5-3 12-3 18-1v28c-6-2-13-2-18 1" />
        <rect x="29" y="17" width="9" height="10" strokeWidth="1" />
      </motion.g>
    </>
  );
}

/** A drone hovering, propellers blurring. */
function Drone() {
  const prop: Variants = { packed: { scaleX: 1 }, unpacked: { scaleX: [1, 0.2, 1], transition: loop(0.18) } };
  const rotors: [number, number][] = [[9, 13], [39, 13], [9, 33], [39, 33]];
  return (
    <motion.g variants={{ packed: { y: 0 }, unpacked: { y: [0, -3, 0], transition: loop(1.4, { ease: "easeInOut" }) } }}>
      <rect x="18" y="19" width="12" height="10" rx="3" />
      <circle cx="24" cy="31" r="2" />
      {rotors.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x < 24 ? 18 : 30} ${y < 24 ? 20 : 28}L${x} ${y}`} />
          <motion.ellipse cx={x} cy={y - 3} rx="7" ry="1.2" style={{ originX: `${x}px`, originY: `${y - 3}px` }} variants={prop} />
          <path d={`M${x} ${y}v-3`} />
        </g>
      ))}
    </motion.g>
  );
}
