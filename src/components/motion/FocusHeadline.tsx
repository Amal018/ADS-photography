"use client";

import { motion, useReducedMotion } from "framer-motion";

declare global {
  interface Window {
    __adsShutter?: "play" | "seen";
  }
}

/**
 * The hero headline pulls into focus word by word: each word starts soft,
 * spread and faint, then racks sharp, like a lens finding its subject.
 */
export function FocusHeadline({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  // Wait for the iris to open when the shutter intro is playing.
  const start = typeof window !== "undefined" && window.__adsShutter === "play" ? 0.85 : 0.1;
  const words = text.split(" ");

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="reveal inline-block"
          initial={{ opacity: 0, filter: "blur(14px)", letterSpacing: "0.12em" }}
          animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "-0.035em" }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 1.1, delay: start + i * 0.09, ease: [0.16, 1, 0.3, 1] }
          }
        >
          {word}
          {i < words.length - 1 ? " " : null}
        </motion.span>
      ))}
    </h1>
  );
}
