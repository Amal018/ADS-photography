"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Photo } from "@/components/Photo";
import { ArrowIcon } from "@/components/icons";
import type { Photo as PhotoData } from "@/content/portfolio";

const ease = [0.16, 1, 0.3, 1] as const;
const FIRST_FRAME = 24;
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Selected work as a strip of film off the contact sheet. On wide screens the
 * page scroll pulls the strip sideways past a pinned frame; on phones (and for
 * reduced motion) it is a strip you swipe. The editor's grease-pencil circle
 * marks the pick and follows whichever frame you look at.
 */
export function ContactSheet({ photos, titleId }: { photos: PhotoData[]; titleId: string }) {
  const reduce = useReducedMotion();
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [current, setCurrent] = useState(1);
  const restingPick = Math.min(1, photos.length - 1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPinned(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useIsoLayoutEffect(() => {
    if (!pinned || !track.current) return;
    const el = track.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(progress, (p) => -p * distance);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (pinned) setCurrent(Math.min(photos.length, Math.floor(p * photos.length) + 1));
  });

  const strip = (
    <motion.div
      ref={track}
      style={pinned ? { x } : undefined}
      className={`relative flex w-max gap-3 bg-[#141414] px-[max(1.25rem,calc((100vw-72rem)/2+2rem))] py-12 [--fh:300px] sm:[--fh:360px] md:[--fh:min(46vh,520px)] ${
        pinned ? "" : "snap-x snap-mandatory"
      }`}
      onPointerLeave={() => setPick(null)}
    >
      <div aria-hidden="true" className="sprockets absolute inset-x-0 top-3" />
      <div aria-hidden="true" className="sprockets absolute inset-x-0 bottom-3" />
      {photos.map((photo, i) => (
        <Link
          key={photo.id}
          href="/portfolio"
          aria-label={`${photo.alt}. See all moments`}
          className="relative block h-[var(--fh)] shrink-0 snap-center no-underline outline-offset-4 first:snap-start"
          style={{ aspectRatio: photo.ratio }}
          onPointerEnter={() => setPick(i)}
          onFocus={() => setPick(i)}
          onBlur={() => setPick(null)}
        >
          <Photo photo={photo} ratio={photo.ratio} className="h-full w-full" sizes="(min-width: 768px) 40vw, 80vw" />
          <span aria-hidden="true" className="edge-print absolute -bottom-[22px] left-1 flex w-full justify-between pr-2">
            <span>{FIRST_FRAME + i}</span>
            <span>▸ {FIRST_FRAME + i}A</span>
          </span>
          <GreasePencil active={(pick ?? restingPick) === i} reduce={!!reduce} />
        </Link>
      ))}
    </motion.div>
  );

  const title = (
    <h2 id={titleId} className="display text-[clamp(2.1rem,4.5vw,3.25rem)]">
      Selected work
    </h2>
  );

  const footer = (
    <div className="flex flex-wrap gap-3">
      <Link href="/portfolio" className="btn btn-light">
        All moments <ArrowIcon className="size-4" />
      </Link>
      <Link href="/packages" className="btn btn-ghost-light">
        View pricing
      </Link>
    </div>
  );

  const counter = (
    <p aria-hidden="true" className="readout flex items-center gap-4 text-xs text-on-night-soft">
      <span>ROLL 07 · PORTRA 400</span>
      {pinned ? (
        <span className="text-on-night">
          {String(current).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
      ) : null}
    </p>
  );

  if (!pinned) {
    return (
      <div ref={outer} className="py-20 sm:py-28">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-5 sm:px-8">
          {title}
          {counter}
        </div>
        <div className="mt-12 overflow-x-auto overscroll-x-contain [scrollbar-width:none]">{strip}</div>
        <div className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">{footer}</div>
      </div>
    );
  }

  return (
    <div ref={outer} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden pb-8 pt-24">
        <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-4 px-8">
          {title}
          {counter}
        </div>
        {strip}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-8">
          {footer}
          <div aria-hidden="true" className="h-px w-40 bg-white/20">
            <motion.div className="h-full origin-left bg-white" style={{ scaleX: progress }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** A hand-drawn red loop, the way an editor marks a keeper on a proof. */
function GreasePencil({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-[7%] size-[114%] overflow-visible"
    >
      <motion.path
        d="M14 22 C34 4, 82 2, 93 34 C102 64, 78 95, 46 96 C16 97, 2 70, 5 44 C7 28, 20 14, 42 8"
        fill="none"
        stroke="#e0322a"
        strokeWidth="3.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : active
              ? { pathLength: { duration: 0.65, ease }, opacity: { duration: 0.1 } }
              : { duration: 0.25 }
        }
      />
    </svg>
  );
}
