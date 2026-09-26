import { site } from "@/content/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as raw JSON; escape "<" so content can never close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** LocalBusiness schema. Contact, address and geo are only published once confirmed. */
export function localBusinessSchema() {
  const sameAs = [site.googleBusinessProfileUrl, site.instagram].filter(Boolean);
  const confirmed = site.detailsConfirmed;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    ...(confirmed
      ? {
          telephone: site.phone,
          email: site.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
          ...(site.geo
            ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } }
            : {}),
          ...(site.hours ? { openingHours: site.hours } : {}),
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
