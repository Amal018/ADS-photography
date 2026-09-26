/**
 * Portfolio images.
 *
 * To add a real photo: put a WebP (under 200KB, around 1600px on the long
 * edge) in /public/portfolio/<category>/ and set `src` to its public path.
 * Entries without a `src` render as labelled placeholder frames.
 * Alt text should describe the subject and the location (SEO + accessibility).
 */

export type Category = "weddings" | "maternity" | "family" | "product";

export const categories: { id: Category; label: string; href?: string }[] = [
  { id: "weddings", label: "Weddings", href: "/portfolio/weddings" },
  { id: "maternity", label: "Maternity", href: "/portfolio/maternity" },
  { id: "family", label: "Family", href: "/portfolio/maternity" },
  { id: "product", label: "Product", href: "/corporate/product-shoots" },
];

export type Photo = {
  id: string;
  category: Category;
  alt: string;
  /** width / height */
  ratio: number;
  src?: string;
};

export const photos: Photo[] = [
  { id: "w1", category: "weddings", ratio: 4 / 5, alt: "Bride and groom exchanging garlands at a temple wedding in Coimbatore" },
  { id: "w2", category: "weddings", ratio: 3 / 2, alt: "Wedding guests showering rice on a couple during a Kongu wedding ceremony" },
  { id: "w3", category: "weddings", ratio: 2 / 3, alt: "Portrait of a bride in a silk saree before her wedding in Coimbatore" },
  { id: "w4", category: "weddings", ratio: 1, alt: "Close-up of the thali being tied during a Tamil wedding" },
  { id: "w5", category: "weddings", ratio: 3 / 2, alt: "Couple portrait at sunset near the Western Ghats outside Coimbatore" },
  { id: "w6", category: "weddings", ratio: 4 / 5, alt: "Reception stage portrait of a newly married couple in Coimbatore" },
  { id: "m1", category: "maternity", ratio: 2 / 3, alt: "Maternity portrait of an expecting mother in natural light in Coimbatore" },
  { id: "m2", category: "maternity", ratio: 3 / 2, alt: "Expecting couple walking in a garden during a maternity shoot" },
  { id: "m3", category: "maternity", ratio: 4 / 5, alt: "Valaikaappu ceremony portrait with bangles, Coimbatore" },
  { id: "f1", category: "family", ratio: 3 / 2, alt: "Three-generation family portrait at home in Coimbatore" },
  { id: "f2", category: "family", ratio: 4 / 5, alt: "Newborn portrait with parents' hands in the studio" },
  { id: "f3", category: "family", ratio: 1, alt: "Siblings laughing during an outdoor family shoot in Coimbatore" },
  { id: "p1", category: "product", ratio: 1, alt: "Studio product photograph of a cotton saree on a plain backdrop" },
  { id: "p2", category: "product", ratio: 4 / 5, alt: "Product shot of a stainless steel kitchen appliance for an e-commerce listing" },
  { id: "p3", category: "product", ratio: 3 / 2, alt: "Flat-lay product photograph of packaged food for a Coimbatore brand" },
];

export function photosFor(...cats: Category[]) {
  return photos.filter((p) => cats.includes(p.category));
}
