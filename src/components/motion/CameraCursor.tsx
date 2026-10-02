"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Mode = "idle" | "link" | "view" | "hidden";

/**
 * Desktop-only focus ring that trails the pointer. Over a photograph it opens
 * up and reads VIEW; over links and buttons it closes to a small dot. Touch
 * devices and reduced-motion visitors never see it, and the system cursor
 * stays in place everywhere except over photographs.
 */
export function CameraCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.dataset.cameraCursor = "";
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      const viewable = t?.closest("[data-cursor='view'], a .photo, button .photo");
      setMode(viewable ? "view" : t?.closest("a, button, select, label, [role='button']") ? "link" : "idle");
    };
    const onLeave = () => setMode("hidden");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      delete document.documentElement.dataset.cameraCursor;
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = { idle: 34, link: 10, view: 88, hidden: 34 }[mode];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white text-white"
        animate={{
          width: size,
          height: size,
          opacity: mode === "hidden" ? 0 : 1,
          backgroundColor: mode === "link" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <motion.span
          className="readout text-[0.62rem] font-medium tracking-[0.2em]"
          animate={{ opacity: mode === "view" ? 1 : 0, scale: mode === "view" ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          VIEW
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
