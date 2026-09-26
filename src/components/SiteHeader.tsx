import Link from "next/link";
import { nav, site } from "@/content/site";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  return (
    <>
      <a
        href="#main"
        className="btn btn-primary fixed left-4 top-3 z-50 -translate-y-24 focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="no-underline" aria-label={`${site.name}, home`}>
            <Wordmark />
          </Link>
          <nav aria-label="Main" className="hidden lg:block">
            <NavLinks items={nav.filter((n) => n.href !== "/contact")} />
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-primary hidden min-h-11 px-5 sm:inline-flex">
              Book a shoot
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
