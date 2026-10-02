export type Gear = "camera" | "video" | "album" | "drone";

/** Package data model (build spec §4.1). */
export type Package = {
  id: "essential" | "signature" | "luxury";
  name: "Essential" | "Signature" | "Luxury";
  division: "events";
  description: string;
  includes: string[];
  /** Price in rupees. `null` until the studio confirms figures (spec §8, decision 1). */
  price: number | null;
  /** The gear that "unpacks" from the card on the site, in order. Keep it in step with `includes`. */
  kit: Gear[];
};

// PLACEHOLDER: the inclusions below are a DRAFT outline, not confirmed
// offers. The packages page labels them as such. Replace them with what the
// studio actually offers, set `price`, then set `inclusionsConfirmed` to true.
export const inclusionsConfirmed = false;

export const packages: Package[] = [
  {
    id: "essential",
    name: "Essential",
    division: "events",
    description: "Focused coverage for intimate ceremonies, maternity and family sessions.",
    kit: ["camera"],
    includes: [
      "One photographer",
      "Up to 4 hours of coverage",
      "Edited high-resolution images, delivered online",
      "One location",
    ],
    price: null,
  },
  {
    id: "signature",
    name: "Signature",
    division: "events",
    description: "Full-day wedding coverage, from getting ready to the reception.",
    kit: ["camera", "video", "album"],
    includes: [
      "Two photographers",
      "Full-day coverage",
      "Edited high-resolution images, delivered online",
      "Highlight video",
      "Printed album",
      "Pre-wedding or couple session",
    ],
    price: null,
  },
  {
    id: "luxury",
    name: "Luxury",
    division: "events",
    description: "Multi-day celebrations covered end to end, with film.",
    kit: ["camera", "video", "drone", "album"],
    includes: [
      "Photo and video team",
      "Multi-day coverage",
      "Cinematic highlight film",
      "Drone aerial coverage",
      "Premium printed albums",
      "Pre-wedding session at a location of your choice",
    ],
    price: null,
  },
];

/** Every package is customisable; this is the lowest price a shoot starts from. */
export const startingPrice = 5000;

export function formatPrice(price: number | null) {
  if (price === null) return "Confirm price on request";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
