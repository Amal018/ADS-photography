# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + Tailwind CSS, deployed on Vercel. This is the build spec's recommendation, which the user confirmed by choosing its scope. First build: marketing pages only. Print & Delivery (e-commerce), database, storage and Razorpay payments are deferred.

## Users

- **Couples and families in and around Coimbatore** planning a wedding, maternity or family shoot. They mostly browse on a phone, compare studios, check work quality and price range, then enquire (often preferring WhatsApp).
- **Businesses (brands, D2C sellers, corporates)** that need product shoots, recurring retainer coverage, headshots or event coverage. They evaluate reliability, turnaround and fit, then request a quote.

## Product Purpose

The website of ADS Photography, a photography studio in Coimbatore, India. It serves two divisions: **Events & Portraits** (weddings, maternity, family; tiered packages) and **Corporate & Commercial** (product shoots, retainers, headshots/events; B2B). Success means ranking first locally for photography searches in Coimbatore and turning visitors into booking enquiries and corporate quote requests.

## Positioning

A local Coimbatore studio covering both personal milestones and commercial work under one roof. Differentiating claims beyond this are not yet confirmed.

## Operating Context

- Mostly mobile traffic; the layout is mobile-first.
- Enquiries go through a contact form (name, phone, email, service interest, preferred date, message), WhatsApp click-to-chat, and a studio location map.
- Consumer and corporate audiences need different tones: warm and personal for events, professional and ROI-focused for corporate.
- SEO is central: service + location keyword pages (`/blog/[service]-[location]`), LocalBusiness schema, NAP consistent with the Google Business Profile.

## Capabilities and Constraints

- Routes follow the build spec (Section 2), except the Print & Delivery module, which is deferred.
- Packages: three tiers, Essential / Signature / Luxury. **Prices are undecided.**
- Contact form: validated on the server. Where submissions go (email, database) is undecided.
- Blog: static content in the repo for now. The CMS choice is undecided.
- Undecided: package rupee prices, CMS, analytics provider, final domain.

## Brand Commitments

- Name: **ADS Photography**.
- No logo exists yet; the site uses a text wordmark.
- **The look must be professional and restrained.** The user rejected an illustrative, themed design ("like a cartoon"). From five professional themes they chose "Modern Swiss": pure white, bold uppercase sans headings, square black buttons, a strict grid. Photographs lead; no decorative theming.

## Evidence on Hand

- Contact details exist but have not been supplied yet; they are placeholders in `src/content/site.ts`. While `detailsConfirmed` is false, the address, phone and coordinates are kept out of structured data and the map.
- The service area is Coimbatore only until the studio names the surrounding towns it serves.
- Package inclusions are a draft outline, labelled as such on the site.
- **No portfolio photos, testimonials, client logos, case studies, founder bios or prices yet.** All of these are visibly marked placeholders. Never fabricate them or present them as real.

## Product Principles

1. The work is the argument: photography leads, and the interface steps back.
2. Every page answers "Coimbatore, which service, how to book" within the first screen on a phone.
3. Two audiences, two voices, one studio: separate the consumer and corporate paths without splitting the brand.
4. No invented proof. Placeholders stay obviously placeholders until real content replaces them.
5. Performance is SEO: fast mobile loads (LCP < 2.5s, CLS < 0.1) are a product requirement.

## Accessibility & Inclusion

Alt text on every image (subject + location), sufficient contrast, keyboard-navigable forms (build spec Section 7).
