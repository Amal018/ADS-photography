# ADS Photography

The website for ADS Photography, a photography studio in Coimbatore. It is built with Next.js (App Router) and Tailwind CSS, and is designed to deploy on Vercel.

## Requirements

- Node.js 20.9 or newer (includes npm): https://nodejs.org
- Git, or download the ZIP from GitHub

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`: the live domain, used for canonical links, `sitemap.xml` and structured data.
- `CONTACT_WEBHOOK_URL` (optional): each validated enquiry is POSTed here as JSON (Zapier/Make, Google Apps Script, a CRM). Without it, enquiries are only written to the server log.

## What's built

The first build is marketing pages only (build spec §2–3, §6):

| Route | Purpose |
|---|---|
| `/` | Home: hero with image mosaic, services, selected work, the two divisions, packages, journal, CTA |
| `/portfolio`, `/portfolio/weddings`, `/portfolio/maternity` | Filterable galleries |
| `/packages` | Essential / Signature / Luxury. Each links to `/contact?package=<id>` |
| `/corporate`, `/corporate/product-shoots`, `/corporate/retainers`, `/corporate/headshots-events` | B2B pages. They link to `/contact?type=corporate` |
| `/about`, `/testimonials` | Trust pages |
| `/blog`, `/blog/[slug]` | Four SEO posts, one per keyword (`/blog/[service]-[location]`) |
| `/contact` | Enquiry form (validated on the server), WhatsApp link, map loaded on tap once coordinates are set |
| `/sitemap.xml`, `/robots.txt` | Generated automatically |

SEO: every page has a unique title and meta description with a canonical URL. `LocalBusiness` JSON-LD is on every page and `Article` JSON-LD is on each post. Keyword and location alt text is set on every image.

**Not built yet:** Print & Delivery (`/print`), the database, image storage, Razorpay payments and analytics.

## Replace before launch

All placeholder content is kept in `src/content/`:

- [ ] **`site.ts`**: phone, WhatsApp number, email, street address, PIN code, map coordinates (`geo`), opening hours, Google Business Profile link, Instagram, and any surrounding towns served. Then set `detailsConfirmed: true`. This publishes them in the structured data and turns on the map. Keep name, address and phone identical to the Google Business Profile listing.
- [ ] **Photos** (`public/photos/`): one folder per spot on the site (home hero, services, selected work, each portfolio category, about). Add, replace or delete files there and the site updates, with no code changes. Folder map and naming rules: `public/photos/README.txt`. The current photos are small Instagram copies (about 512–640px), so swap in full-size exports. Product, family, studio and team folders are still empty and show "photo to come" frames.
- [ ] **`packages.ts`**: real inclusions and rupee prices, then set `inclusionsConfirmed = true`. `price: null` shows "Prices to be announced".
- [ ] **`testimonials.ts`**: real reviews only, with the client's permission and the original date. While this list is empty, the site shows an honest "reviews on their way" state.
- [ ] **About page** (`src/app/about/page.tsx`): the studio story and team bios. They are marked "To be written".
- [ ] **Corporate** (`src/app/corporate/page.tsx`): client logos and case studies, with permission.
- [ ] A logo, if you have one. The header currently uses a text wordmark.

## Design

Modern Swiss: a crisp, corporate site on a strict grid, where the photographs lead:

- pure white background with hairline rules
- black text
- Archivo throughout, with bold uppercase headings
- square black buttons
- a black band for calls to action and the corporate page headers

Design tokens live in `src/app/globals.css`. Product context is in `PRODUCT.md`; the design direction is in `.impeccable/surfaces/`.
