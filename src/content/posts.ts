/**
 * Journal posts: static, in-repo content (spec §3.6; CMS choice still open).
 * Every post targets one "[service] + [location]" keyword in its H1 and links
 * to at least one portfolio or service page.
 * URL pattern for new posts: /blog/[service]-[location]
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  date: string;
  related: { href: string; label: string };
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "wedding-photographer-coimbatore",
    keyword: "wedding photographer in Coimbatore",
    title: "How to choose a wedding photographer in Coimbatore",
    description:
      "What to ask, what to look for in a portfolio, and how to plan coverage when you book a wedding photographer in Coimbatore.",
    date: "2026-09-20",
    related: { href: "/portfolio/weddings", label: "See our wedding portfolio" },
    body: [
      { type: "p", text: "A Coimbatore wedding rarely fits into a single afternoon. Between the engagement, the muhurtham, the thali-tying and the reception, you may need coverage across two or three days, often at more than one venue. Choosing the right photographer is less about finding the most famous name and more about finding someone whose work, pace and people skills suit your family." },
      { type: "h2", text: "Look at complete weddings, not just highlights" },
      { type: "p", text: "Any photographer can show twenty good frames. Ask to see one full wedding gallery from start to finish. Check how they handle the moments that matter most at a Tamil wedding: the thali being tied, the elders' blessings, the crowded mandapam, and the low evening light at the reception." },
      { type: "h2", text: "Questions to ask before you book" },
      { type: "list", items: [
        "How many photographers will be at the wedding, and who exactly are they?",
        "How many hours or days does the package cover, and what does extra time cost?",
        "When will we receive the edited photos and the album?",
        "Do you know our venue, and have you shot there before?",
        "What happens if the lead photographer falls ill on the day?",
      ] },
      { type: "h2", text: "Plan coverage around the rituals" },
      { type: "p", text: "Share your full schedule, with muhurtham timings, early. Morning muhurthams mean the team arrives well before sunrise, and the moments at the mandapam happen fast. A good photographer will ask who the important relatives are so that no one is missed in the family portraits." },
      { type: "h2", text: "Budget for what you will keep" },
      { type: "p", text: "Decide early whether you want a printed album, a highlight film or both. Those are usually what families treasure decades later. Compare packages by what is actually delivered, not only by the headline price." },
      { type: "p", text: "Planning a wedding in or around Coimbatore? Tell us your dates and venue, and we will suggest the coverage that fits." },
    ],
  },
  {
    slug: "maternity-shoot-coimbatore",
    keyword: "maternity shoot in Coimbatore",
    title: "Planning a maternity shoot in Coimbatore",
    description:
      "When to book, what to wear, and the best light and locations for a maternity photoshoot in Coimbatore.",
    date: "2026-09-12",
    related: { href: "/portfolio/maternity", label: "See our maternity & family portfolio" },
    body: [
      { type: "p", text: "A maternity shoot is one of the few photo sessions planned around a moving deadline. A little planning makes the day relaxed rather than rushed, which is exactly what shows up in the pictures." },
      { type: "h2", text: "When to schedule it" },
      { type: "p", text: "Many families choose the third trimester, often between 28 and 34 weeks, when the bump is clearly visible but moving around is still comfortable. Always check with your doctor, and keep the plan flexible." },
      { type: "h2", text: "Pair it with the valaikaappu" },
      { type: "p", text: "If your family is holding a valaikaappu or seemantham, you can combine a short portrait session with the ceremony coverage: the glass bangles, the elders' blessings and the flowers make beautiful, meaningful frames." },
      { type: "h2", text: "Light and weather in Coimbatore" },
      { type: "p", text: "Early morning and the hour before sunset give soft, flattering light and cooler temperatures. The monsoon months can bring wind and drizzle, so an indoor studio or home session is a good backup plan." },
      { type: "h2", text: "What to wear" },
      { type: "list", items: [
        "Fitted outfits or flowing gowns that show the bump's shape",
        "A silk saree for a traditional look, draped comfortably",
        "Solid colours photograph better than busy prints",
        "Coordinate your partner's and children's outfits without matching exactly",
      ] },
      { type: "h2", text: "Keep it comfortable" },
      { type: "p", text: "Bring water, snacks and a comfortable pair of footwear between setups. A good session builds in rest breaks and never asks you to hold an uncomfortable pose for long." },
    ],
  },
  {
    slug: "product-photography-coimbatore",
    keyword: "product photography in Coimbatore",
    title: "Product photography in Coimbatore for brands and online sellers",
    description:
      "How Coimbatore manufacturers, textile brands and D2C sellers can plan product photography that works for marketplaces, catalogues and social media.",
    date: "2026-09-05",
    related: { href: "/corporate/product-shoots", label: "Explore product shoots" },
    body: [
      { type: "p", text: "Coimbatore makes an enormous range of products, from textiles and garments to pumps, motors, wet grinders, jewellery and packaged foods. Whatever you sell, your photos are often the first and only way a buyer judges quality online." },
      { type: "h2", text: "Start with where the images will be used" },
      { type: "p", text: "Marketplace listings, printed catalogues, trade-fair banners and Instagram each need different framing. Plan the shot list around the channels first. It is far cheaper than reshooting later." },
      { type: "h2", text: "Marketplace basics" },
      { type: "list", items: [
        "Main images on major marketplaces usually need a pure white background",
        "The product should fill most of the frame",
        "High resolution (at least 1000px on the longest side) enables zoom",
        "Add detail, scale and in-use shots as secondary images",
      ] },
      { type: "p", text: "Marketplace rules change, so check each platform's current image guidelines before the shoot." },
      { type: "h2", text: "Consistency is a brand asset" },
      { type: "p", text: "Use the same lighting, angles and background across a whole catalogue, so your listings look like they come from one serious brand. That is why many businesses move from one-off shoots to a monthly or quarterly retainer." },
      { type: "h2", text: "Prepare products before the shoot" },
      { type: "p", text: "Send clean, unscratched samples in every variant you want photographed, with any packaging and labels. A shared shot list with product codes makes delivery and file naming painless for your team." },
    ],
  },
  {
    slug: "best-photo-spots-coimbatore",
    keyword: "best photo spots in Coimbatore",
    title: "Best pre-wedding photoshoot locations near Coimbatore",
    description:
      "Lakefronts, temples, tree-lined roads and green countryside: the best photo spots in and around Coimbatore for pre-wedding, couple and outdoor family portrait shoots.",
    date: "2026-08-28",
    related: { href: "/portfolio", label: "Browse the portfolio" },
    body: [
      { type: "p", text: "Coimbatore sits at the foot of the Western Ghats, so within an hour you can move from city lakefronts to temple towns and green countryside. Here are locations that work well for couple, pre-wedding and family portraits." },
      { type: "h2", text: "Valankulam and Ukkadam lakefronts" },
      { type: "p", text: "The redeveloped lakefront walkways give open sky, water and clean lines right in the city. They are best early in the morning, before the crowds and the harsh light." },
      { type: "h2", text: "Race Course" },
      { type: "p", text: "The tree-lined roads around Race Course offer shade, greenery and an easy, everyday-Coimbatore feel. They suit relaxed couple and family sessions." },
      { type: "h2", text: "Temple towns: Perur and Marudhamalai" },
      { type: "p", text: "The old stone architecture of Perur and the hill approach to Marudhamalai make striking traditional backdrops. Photography is often restricted inside temple premises, so plan to shoot in the surrounding streets and approaches, and always respect the rules and devotees." },
      { type: "h2", text: "Pollachi countryside" },
      { type: "p", text: "Coconut groves, paddy fields and village roads around Pollachi are a favourite for pre-wedding shoots and are worth the drive for a full-day session." },
      { type: "h2", text: "Towards the hills" },
      { type: "p", text: "The roads towards Siruvani and the Western Ghats foothills give misty mornings and layered hills. Some areas are forest land with entry rules and timings, so check permissions before you plan a shoot there." },
      { type: "h2", text: "Tips for any location" },
      { type: "list", items: [
        "Shoot in the first two hours after sunrise or the last hour before sunset",
        "Check whether a location needs permission or a fee for photography",
        "Visit on a weekday to avoid crowds",
        "Carry a change of outfit for a second look",
      ] },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
