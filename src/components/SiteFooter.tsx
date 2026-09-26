import Link from "next/link";
import { formattedAddress, nav, site, whatsappLink } from "@/content/site";
import { corporateServices } from "@/content/corporate";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const linkClass = "text-on-night-soft no-underline transition-colors hover:text-on-night";
  return (
    <footer className="border-t border-white/10 bg-night pb-24 text-on-night sm:pb-0">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Wordmark light />
          <p className="mt-5 max-w-[34ch] text-on-night-soft">
            Photography studio in Coimbatore for weddings, maternity, families and businesses.
          </p>
          {/* NAP: keep identical to the Google Business Profile listing. */}
          <address className="mt-6 space-y-1.5 not-italic text-on-night-soft">
            <p>{formattedAddress()}</p>
            <p>
              <a href={site.phoneHref} className={linkClass}>
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </p>
          </address>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={whatsappLink()} className="text-link text-on-night">
              WhatsApp
            </a>
            {site.googleBusinessProfileUrl ? (
              <a href={site.googleBusinessProfileUrl} className="text-link text-on-night" rel="noopener">
                Google reviews
              </a>
            ) : null}
            {site.instagram ? (
              <a href={site.instagram} className="text-link text-on-night" rel="noopener">
                Instagram
              </a>
            ) : null}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-medium text-on-night">Studio</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/testimonials" className={linkClass}>
                Testimonials
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Corporate">
          <p className="text-sm font-medium text-on-night">For businesses</p>
          <ul className="mt-4 space-y-2.5">
            {corporateServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/corporate/${s.slug}`} className={linkClass}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/10 px-5 py-6 text-sm text-on-night-soft sm:px-8">
        <p>
          © {year} {site.name}
        </p>
        <p>Coimbatore, Tamil Nadu</p>
      </div>
    </footer>
  );
}
