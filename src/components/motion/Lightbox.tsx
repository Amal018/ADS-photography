"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Photo as PhotoData } from "@/content/portfolio";

const ease = [0.7, 0, 0.2, 1] as const;
const label: Record<PhotoData["category"], string> = {
  weddings: "WEDDING",
  maternity: "MATERNITY",
  family: "FAMILY",
  product: "PRODUCT",
};

/**
 * Full-screen viewer that opens like a lens: a circular aperture grows from
 * the photo you clicked. Arrow keys, on-screen buttons or a swipe move
 * between photos; Escape or the close button shuts it again.
 */
export function Lightbox({
  photos,
  open,
  onIndex,
  onClose,
}: {
  photos: PhotoData[];
  open: { index: number; origin: { x: number; y: number } } | null;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const count = photos.length;
  const go = (delta: number) => {
    if (!open || count < 2) return;
    setDirection(delta);
    onIndex((open.index + delta + count) % count);
  };

  const isOpen = open !== null;
  const goRef = useRef(go);
  goRef.current = go;
  const closeFn = useRef(onClose);
  closeFn.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFn.current();
      else if (e.key === "ArrowRight") goRef.current(1);
      else if (e.key === "ArrowLeft") goRef.current(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Keep focus inside the viewer.
        const items = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  if (!mounted) return null;

  const photo = open ? photos[open.index] : undefined;
  const at = open ? `${open.origin.x}% ${open.origin.y}%` : "50% 50%";

  return createPortal(
    <AnimatePresence>
      {open && photo ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[80] flex flex-col bg-night text-on-night"
          initial={reduce ? { opacity: 0 } : { clipPath: `circle(0% at ${at})` }}
          animate={reduce ? { opacity: 1 } : { clipPath: `circle(150% at ${at})` }}
          exit={reduce ? { opacity: 0 } : { clipPath: `circle(0% at ${at})` }}
          transition={{ duration: reduce ? 0.15 : 0.7, ease }}
        >
          <div className="readout flex items-center justify-between gap-4 px-5 py-4 text-xs text-on-night-soft sm:px-8">
            <span>
              {label[photo.category]} · <span className="text-on-night">{String(open.index + 1).padStart(2, "0")}</span> /{" "}
              {String(count).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="flex size-11 cursor-pointer items-center justify-center border border-white/30 transition-colors hover:border-white"
              aria-label="Close viewer"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={photo.id}
                custom={direction}
                className="absolute inset-0 px-5 sm:px-20"
                variants={{
                  enter: (d: number) => ({ x: d * 80, opacity: 0, filter: "blur(10px)" }),
                  center: { x: 0, opacity: 1, filter: "blur(0px)" },
                  exit: (d: number) => ({ x: d * -80, opacity: 0, filter: "blur(10px)" }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
              >
                <div className="relative size-full">
                  <Image src={photo.src!} alt={photo.alt} fill sizes="100vw" className="pointer-events-none object-contain" />
                </div>
              </motion.div>
            </AnimatePresence>

            {count > 1 ? (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            ) : null}
          </div>

          <p className="px-5 py-5 text-center text-sm text-on-night-soft sm:px-8">{photo.alt}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/30 bg-night/50 transition-colors hover:border-white sm:flex ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
