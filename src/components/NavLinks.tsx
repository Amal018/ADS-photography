"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { isCurrent, type NavItem } from "@/content/site";

const linkClass =
  "relative py-2 text-[0.95rem] text-ink-soft no-underline transition-colors hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100";

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-7">
      {items.map((item) => (
        <li key={item.href}>
          {item.children ? (
            <Dropdown item={item} pathname={pathname} />
          ) : (
            <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined} className={linkClass}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

/** A nav link with a submenu: opens on hover, or from its arrow button for touch and keyboard. */
function Dropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = `submenu-${item.label.toLowerCase()}`;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        box.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div
      ref={box}
      className="relative flex items-center gap-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined} className={linkClass}>
        {item.label}
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${item.label} pages`}
        onClick={() => setOpen((o) => !o)}
        className="grid size-7 cursor-pointer place-items-center text-ink-soft transition-colors hover:text-ink"
      >
        <svg
          viewBox="0 0 24 24"
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            // pt bridges the gap so the menu stays open while the pointer moves down to it.
            className="absolute left-0 top-full z-50 min-w-56 pt-3"
          >
            <li className="border border-line bg-paper p-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]">
              <ul>
                {item.children!.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      aria-current={pathname === child.href ? "page" : undefined}
                      className="block px-3 py-2.5 text-[0.95rem] text-ink no-underline transition-colors hover:bg-stone aria-[current=page]:bg-stone"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
