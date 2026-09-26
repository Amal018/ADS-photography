"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav, whatsappLink } from "@/content/site";
import { MenuIcon, WhatsAppIcon } from "./icons";

export function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  // Close after navigating, on Escape, or on a click outside the menu.
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) ref.current.open = false;
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={ref} className="relative lg:hidden">
      <summary
        className="grid size-11 cursor-pointer list-none place-items-center border border-line text-ink [&::-webkit-details-marker]:hidden"
        aria-label="Menu"
      >
        <MenuIcon className="size-5" />
      </summary>
      <nav
        aria-label="Mobile"
        className="absolute right-0 top-14 w-[min(86vw,20rem)] border border-line bg-paper p-3"
      >
        <ul className="flex flex-col">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                className="block px-3 py-3 text-lg text-ink no-underline hover:bg-stone aria-[current=page]:bg-stone"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink("Hi ADS Photography, I'd like to enquire about a shoot.")}
          className="btn btn-secondary mt-3 w-full"
        >
          <WhatsAppIcon className="size-4" /> WhatsApp us
        </a>
      </nav>
    </details>
  );
}
