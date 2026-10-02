/** Corporate & Commercial services (Division B). */

export type CorporateService = {
  slug: "product-shoots" | "retainers" | "headshots-events";
  title: string;
  keyword: string;
  summary: string;
  metaDescription: string;
  outcomes: string[];
  process: { step: string; detail: string }[];
};

export const corporateServices: CorporateService[] = [
  {
    slug: "product-shoots",
    title: "Product shoots",
    keyword: "product photography Coimbatore",
    summary:
      "Catalogue, marketplace and campaign photography for manufacturers, textile brands and online sellers.",
    metaDescription:
      "Product photographer in Coimbatore for e-commerce listings, catalogues and campaigns. White-background, lifestyle and detail shots from a commercial photography studio.",
    outcomes: [
      "Marketplace-ready white-background images",
      "Lifestyle and in-use photographs for campaigns",
      "Detail and scale shots that answer buyer questions",
      "Consistent lighting across your whole catalogue",
    ],
    process: [
      { step: "Brief", detail: "We agree the shot list, channels and delivery formats per SKU." },
      { step: "Shoot", detail: "At our studio or on your factory floor, with samples checked in and out." },
      { step: "Deliver", detail: "Retouched files named by product code, sized for each channel." },
    ],
  },
  {
    slug: "retainers",
    title: "Monthly & quarterly retainers",
    keyword: "corporate photography retainer Coimbatore",
    summary:
      "A standing photography team for brands that launch products, run campaigns or post every week.",
    metaDescription:
      "Photography retainers for Coimbatore businesses: fixed monthly or quarterly coverage for new products, social media and events, with predictable invoicing.",
    outcomes: [
      "Reserved shoot days every month or quarter",
      "One visual standard across every launch",
      "Predictable monthly or quarterly invoicing",
      "Priority booking for events and urgent launches",
    ],
    process: [
      { step: "Scope", detail: "We agree frequency (monthly, quarterly or annual), deliverables and an invoice cycle." },
      { step: "Schedule", detail: "Shoot days are booked in advance around your launch calendar." },
      { step: "Review", detail: "We review each quarter and adjust the scope as your needs change." },
    ],
  },
  {
    slug: "headshots-events",
    title: "Headshots & corporate events",
    keyword: "corporate headshots Coimbatore",
    summary:
      "Team headshots, leadership portraits, conferences, launches and annual days, photographed on location.",
    metaDescription:
      "Corporate event photographer and headshots in Coimbatore: team portraits, leadership photos, conferences, product launches and annual days.",
    outcomes: [
      "Consistent team headshots for website and LinkedIn",
      "Leadership portraits for press and annual reports",
      "Conference, launch and annual-day coverage",
      "Delivery dates agreed before the shoot",
    ],
    process: [
      { step: "Plan", detail: "We confirm headcount, timings and a backdrop that fits your brand." },
      { step: "Shoot", detail: "A portable studio at your office keeps each person's time short." },
      { step: "Deliver", detail: "Retouched images, cropped for web, print and social profiles." },
    ],
  },
];

export function getCorporateService(slug: string) {
  return corporateServices.find((s) => s.slug === slug);
}
