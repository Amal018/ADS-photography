"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A print in the developer tray: the photograph surfaces from a pale, flat,
 * colourless sheet under a red safelight, then comes up to full colour the
 * first time it scrolls into view.
 */
export function DevelopPhoto({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const timing = (duration: number, extra = 0) =>
    reduce ? { duration: 0 } : { duration, delay: delay + extra, ease };

  return (
    <motion.div
      className={`develop relative ${className}`}
      initial="latent"
      whileInView="developed"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div
        variants={{
          latent: { filter: "grayscale(1) contrast(0.45) brightness(1.55) blur(2px)" },
          developed: { filter: "grayscale(0) contrast(1) brightness(1) blur(0px)" },
        }}
        transition={timing(2.2)}
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="develop-safelight pointer-events-none absolute inset-0 bg-[#b3261e] mix-blend-multiply"
        variants={{ latent: { opacity: 0.32 }, developed: { opacity: 0 } }}
        transition={timing(1.6, 0.35)}
      />
    </motion.div>
  );
}
