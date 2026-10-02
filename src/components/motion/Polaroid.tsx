"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Photo } from "@/components/Photo";
import type { Photo as PhotoData } from "@/content/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A client review pinned up as an instant print: it drops in at a slight
 * angle, the photo develops from murky grey-green to full colour, and the
 * handwritten caption appears last.
 */
export function Polaroid({ photo, caption }: { photo: PhotoData; caption: string }) {
  const reduce = useReducedMotion();
  const t = (duration: number, delay = 0) => (reduce ? { duration: 0 } : { duration, delay, ease });

  return (
    <motion.div
      className="develop w-[min(78vw,300px)] bg-white p-3 pb-5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.08)]"
      initial={{ opacity: 0, y: -80, rotate: -14 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3.5 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 13 }}
    >
      <motion.div
        initial={{ filter: "grayscale(1) brightness(0.35) sepia(0.6) hue-rotate(40deg)" }}
        whileInView={{ filter: "grayscale(0) brightness(1) sepia(0) hue-rotate(0deg)" }}
        viewport={{ once: true }}
        transition={t(3.2, 0.5)}
      >
        <Photo photo={photo} ratio={1} sizes="300px" />
      </motion.div>
      <motion.p
        className="mt-4 text-center text-lg text-ink-soft [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={t(1, 2.4)}
      >
        {caption}
      </motion.p>
    </motion.div>
  );
}
