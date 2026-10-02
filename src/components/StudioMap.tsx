"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { formattedAddress, mapEmbedSrc, mapLink, site } from "@/content/site";
import { PinIcon } from "./icons";

/**
 * Google Maps embed, loaded on request so the third-party iframe stays off the
 * critical path. Until the studio's coordinates are set in site.ts there is no
 * embed (no guessed pin), just a directions link that searches the address.
 */
export function StudioMap() {
  const [show, setShow] = useState(false);
  const embed = mapEmbedSrc();
  const link = mapLink();
  const reduce = useReducedMotion();

  if (show && embed) {
    return (
      <iframe
        title={`Map showing ${site.name} in ${site.address.locality}`}
        src={embed}
        className="block aspect-[4/3] w-full border border-line"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex aspect-[4/3] flex-col justify-between border border-line bg-stone p-6">
      <div className="flex gap-3">
        {/* The pin racks into focus, then a ring pulses out as focus locks. */}
        <motion.span
          className="relative mt-0.5 size-5 shrink-0 text-ink"
          initial={{ filter: "blur(6px)", scale: 1.6, opacity: 0.3 }}
          whileInView={{ filter: "blur(0px)", scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <PinIcon className="size-5" />
          <motion.span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full border border-ink"
            initial={{ scale: 0.4, opacity: 0 }}
            whileInView={reduce ? undefined : { scale: [0.4, 1.8], opacity: [0, 0.6, 0] }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.9, delay: 1 }}
          />
        </motion.span>
        <div>
          <p className="font-medium">The studio</p>
          <p className="mt-1 text-ink-soft">{formattedAddress()}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {embed ? (
          <button type="button" onClick={() => setShow(true)} className="btn btn-primary">
            Show map
          </button>
        ) : null}
        <a href={link} className={`btn ${embed ? "btn-secondary" : "btn-primary"}`} target="_blank" rel="noopener">
          Get directions
        </a>
      </div>
    </div>
  );
}
