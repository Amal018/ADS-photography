/**
 * Single source of truth for studio facts.
 *
 * Contact details are placeholders until `detailsConfirmed` is set to true.
 * While it is false, the address, phone and map are left out of the
 * LocalBusiness structured data and the map card says "to be confirmed", so
 * search engines never see invented details. Keep name, address and phone
 * identical to the Google Business Profile listing (NAP consistency is a
 * local-SEO ranking signal).
 */

export const site = {
  name: "ADS Photography",
  /** The studio's former name, still on its Google Maps listing. */
  formerName: "Annai Digital Studio",
  description:
    "ADS Photography is a professional photographer and photo studio in Coimbatore, Tamil Nadu, for candid weddings, maternity and baby photoshoots, family portraits and product photography.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ads-photography.vercel.app").replace(/\/$/, ""),

  /** Phone and address are the studio's real details (from its Instagram). */
  detailsConfirmed: true,

  /** Years in business, as the studio states it. */
  experience: "20+ years",

  phone: "+91 98423 43219",
  phoneHref: "tel:+919842343219",
  whatsapp: "919842343219", // digits only, country code first, used for wa.me links
  email: "annaidigitalantony@gmail.com",
  address: {
    street: "511-1, Rabindranath Tagore Road, Opposite State Bank, Maniyakarampalayam, Ganapathy",
    locality: "Coimbatore",
    region: "Tamil Nadu",
    postalCode: "641006",
    country: "IN",
  },
  // The pin on the studio's Google Maps listing (listed as Annai Digital Studio).
  geo: { lat: 11.0475463, lng: 76.971946 } as { lat: number; lng: number } | null,
  hours: "Mo-Su 09:00-21:00",
  hoursText: "Open 9am – 9pm, every day. Call us anytime.",
  /** Shown as the price range in search results. */
  priceRange: "From ₹5,000",
  googleBusinessProfileUrl: "", // PLACEHOLDER: paste the Google Business Profile share link
  instagram: "https://www.instagram.com/ads_.photography_/",
  // PLACEHOLDER: confirm these are the towns the studio actually serves.
  areaServed: ["Coimbatore", "Pollachi", "Tirupur", "Mettupalayam", "Erode"],
};

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${text}`;
}

export function mapEmbedSrc() {
  if (!site.geo) return null;
  return `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`;
}

/** Directions link: the exact pin once geo is set, otherwise a search for the address. */
export function mapLink() {
  const query = site.geo ? `${site.geo.lat},${site.geo.lng}` : `${site.name}, ${formattedAddress()}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function formattedAddress() {
  const a = site.address;
  return [a.street, a.locality, [a.region, a.postalCode].filter(Boolean).join(" ")].join(", ");
}

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/portfolio",
    label: "Moments",
    children: [
      { href: "/portfolio/weddings", label: "Weddings" },
      { href: "/portfolio/maternity", label: "Maternity & family" },
    ],
  },
  { href: "/packages", label: "Packages" },
  { href: "/corporate", label: "Corporate" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

/** Whether a nav link is the current section; Home matches only itself. */
export const isCurrent = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);
