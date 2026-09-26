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
  description:
    "ADS Photography is a Coimbatore photography studio for weddings, maternity and family portraits, and corporate product shoots.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ads-photography.vercel.app").replace(/\/$/, ""),

  /** Flip to true once the real details below are filled in. */
  detailsConfirmed: false,

  // PLACEHOLDER: contact details
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  whatsapp: "910000000000", // digits only, country code first, used for wa.me links
  email: "hello@example.com",
  address: {
    street: "Street address to be confirmed", // PLACEHOLDER
    locality: "Coimbatore",
    region: "Tamil Nadu",
    postalCode: "", // PLACEHOLDER
    country: "IN",
  },
  // PLACEHOLDER: the studio's exact coordinates (right-click the pin in Google Maps to copy them).
  geo: null as { lat: number; lng: number } | null,
  hours: "", // PLACEHOLDER, e.g. "Mo-Sa 10:00-19:00"
  googleBusinessProfileUrl: "", // PLACEHOLDER: paste the Google Business Profile share link
  instagram: "", // PLACEHOLDER
  // PLACEHOLDER: add the surrounding towns the studio actually serves.
  areaServed: ["Coimbatore"],
};

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${text}`;
}

export function mapEmbedSrc() {
  if (!site.geo) return null;
  return `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`;
}

export function mapLink() {
  if (!site.geo) return null;
  return `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`;
}

export function formattedAddress() {
  const a = site.address;
  return [a.street, a.locality, [a.region, a.postalCode].filter(Boolean).join(" ")].join(", ");
}

export const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/packages", label: "Packages" },
  { href: "/corporate", label: "Corporate" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;
