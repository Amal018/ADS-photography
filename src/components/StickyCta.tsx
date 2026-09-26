"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

/**
 * Mobile-only bottom bar: the spec's always-available "Book a shoot" CTA.
 * It appears once the visitor has scrolled past the first screen, so it never
 * covers the opening content or repeats the buttons already in view.
 */
export function StickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex gap-2">
        <Link href="/contact" className="btn btn-primary flex-1">
          Book a shoot
        </Link>
        <a
          href={whatsappLink("Hi ADS Photography, I'd like to enquire about a shoot.")}
          className="btn btn-secondary px-4"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="size-5" />
        </a>
      </div>
    </div>
  );
}
