"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * A link that behaves like a shutter release: pressing it travels down a
 * little, the frame flashes white, and then the page changes. Modifier
 * clicks (new tab, etc.) and reduced-motion visitors get an ordinary link.
 */
export function ShutterButton({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [flash, setFlash] = useState(false);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setFlash(true);
    setTimeout(() => router.push(href), 240);
    setTimeout(() => setFlash(false), 700);
  }

  return (
    <>
      <motion.span className="inline-flex" whileTap={reduce ? undefined : { scale: 0.94, y: 2 }}>
        <Link href={href} className={className} onClick={onClick}>
          <span aria-hidden="true" className="relative mr-0.5 inline-block size-3 rounded-full border-2 border-current">
            <motion.span
              className="absolute inset-[2px] rounded-full bg-current"
              animate={flash ? { scale: [1, 0.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </span>
          {children}
        </Link>
      </motion.span>
      <AnimatePresence>
        {flash ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[66] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.2, 1], ease: "easeOut" }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
