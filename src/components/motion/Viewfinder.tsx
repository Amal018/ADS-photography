"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const BOX = 64;

/**
 * Frames the hero photographs the way the camera sees them: corner brackets,
 * an autofocus point that follows the pointer and locks when it settles, and
 * the exposure readout along the bottom of the finder.
 */
export function Viewfinder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const [visible, setVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [frame, setFrame] = useState(36);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Without a mouse, focus once on the lead photograph and lock.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: fine)").matches) return;
    const { width, height } = el.getBoundingClientRect();
    x.jump(width * 0.3 - BOX / 2);
    y.jump(height * 0.42 - BOX / 2);
    const t1 = setTimeout(() => setVisible(true), 1600);
    const t2 = setTimeout(() => setLocked(true), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [x, y]);

  useEffect(() => () => clearTimeout(idle.current), []);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - BOX / 2);
    y.set(e.clientY - r.top - BOX / 2);
    setVisible(true);
    setLocked(false);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setLocked(true), 260);
  }

  function onLeave() {
    clearTimeout(idle.current);
    setVisible(false);
    setLocked(false);
  }

  // A click is a frame taken: the counter advances and the finder blinks.
  const blink = useMotionValue(0);
  function onShoot() {
    setFrame((f) => (f > 1 ? f - 1 : 36));
    if (!reduce) animate(blink, [0.9, 0], { duration: 0.35, ease: "easeOut" });
  }

  return (
    <div className={className}>
      <div
        ref={ref}
        className="relative"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerDown={onShoot}
      >
        {children}

        <div aria-hidden="true" className="pointer-events-none absolute -inset-3 sm:-inset-4">
          {/* Corner brackets */}
          {(["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"] as const).map(
            (pos, i) => (
              <motion.svg
                key={pos}
                viewBox="0 0 24 24"
                className={`absolute size-6 text-ink ${pos}`}
                initial={{ opacity: 0, scale: 1.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 1.1 + i * 0.06, ease }}
              >
                <path d="M1 12V1h11" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </motion.svg>
            ),
          )}
        </div>

        {/* Autofocus point */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10"
          style={{ x: sx, y: sy, width: BOX, height: BOX }}
          initial={false}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative size-full"
            animate={locked && !reduce ? { scale: [1.25, 0.94, 1] } : { scale: 1 }}
            transition={{ duration: 0.38, ease }}
          >
            <svg viewBox="0 0 64 64" className="size-full drop-shadow-[0_0_2px_rgba(0,0,0,0.55)]">
              <path
                d="M1 14V1h13M50 1h13v13M63 50v13H50M14 63H1V50"
                fill="none"
                stroke={locked ? "#7dff9a" : "#ffffff"}
                strokeWidth="2"
                style={{ transition: "stroke 160ms" }}
              />
              <circle cx="32" cy="32" r="2.5" fill={locked ? "#7dff9a" : "#ffffff"} />
            </svg>
          </motion.div>
        </motion.div>

        {/* Exposure blink when a frame is "taken" */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-white"
          style={{ opacity: blink }}
        />
      </div>

      {/* Exposure readout */}
      <motion.div
        aria-hidden="true"
        className="readout mt-7 flex items-center justify-between gap-4 border-t border-line pt-3 text-[0.7rem] text-muted sm:text-xs"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 1.35, ease }}
      >
        <span className="flex gap-3 sm:gap-5">
          <span>ISO 200</span>
          <span>f/1.8</span>
          <span>1/250</span>
          <span className="hidden sm:inline">±0.0</span>
        </span>
        <span className="flex items-center gap-3 sm:gap-5">
          <span className="flex items-center gap-1.5">
            <span
              className={`inline-block size-1.5 rounded-full transition-colors duration-150 ${locked ? "bg-[#1f9d45]" : "bg-line"}`}
            />
            AF-S
          </span>
          <span className="text-ink">[{String(frame).padStart(3, "0")}]</span>
        </span>
      </motion.div>
    </div>
  );
}
