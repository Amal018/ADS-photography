/**
 * Homepage FAQ. Each question targets a long-tail search (price, area, location,
 * studio), and the same text is published as FAQPage structured data.
 *
 * PLACEHOLDER: these answers are a DRAFT. Check every one against what the
 * studio actually offers (especially the areas and towns covered) before
 * launch, and keep them in plain, honest language: Google shows these answers
 * directly in search results.
 */
export type Faq = { q: string; a: string; link?: { href: string; label: string } };

export const faqs: Faq[] = [
  {
    q: "How much does candid wedding photography cost in Coimbatore?",
    a: "It depends on the hours of coverage, the number of photographers and whether you want an album. Our Essential, Signature and Luxury packages cover everything from an intimate ceremony to a multi-day wedding. Send us your date and we’ll share the price details for the package that fits.",
    link: { href: "/packages", label: "Compare wedding photography packages" },
  },
  {
    q: "Do you offer budget wedding photography packages?",
    a: "Yes. The Essential package is our most affordable option, with focused coverage for smaller ceremonies, maternity and family sessions, and every package can be adjusted to your plans and budget.",
    link: { href: "/packages", label: "See the packages" },
  },
  {
    q: "What are your pre-wedding and engagement photoshoot charges?",
    a: "Pre-wedding and engagement shoots are priced by location, travel and the hours you need. Tell us where you’d like to shoot and we’ll reply with a quote, or add the shoot to your wedding package.",
    link: { href: "/contact?service=wedding", label: "Ask for a pre-wedding quote" },
  },
  {
    q: "Where are the best pre-wedding photoshoot locations near Coimbatore?",
    a: "Popular choices include the Valankulam and Ukkadam lakefronts, the tree-lined roads of Race Course, the temple streets of Perur, the Pollachi countryside and the Western Ghats foothills towards Siruvani.",
    link: { href: "/blog/best-photo-spots-coimbatore", label: "Read our guide to photo spots" },
  },
  {
    q: "Do you have an indoor photoshoot studio in Coimbatore?",
    a: "Yes. Maternity, baby, newborn and family portraits, headshots and product shoots can all be photographed indoors in our studio, with outdoor portrait sessions and home shoots also available.",
  },
  {
    q: "Which areas of Coimbatore do you cover?",
    a: "We photograph across Coimbatore, including RS Puram, Peelamedu, Gandhipuram, Saravanampatti and Saibaba Colony, and travel to Pollachi, Tirupur, Mettupalayam and Erode for weddings and events.",
  },
  {
    q: "Do you photograph babies, newborns and kids?",
    a: "Yes. We offer newborn photography, baby photoshoots, kids photoshoots and family portraits, at home, outdoors or in the studio.",
    link: { href: "/portfolio/maternity", label: "See maternity, baby and family work" },
  },
];

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
