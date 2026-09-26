/**
 * Testimonials (build spec §3.7).
 *
 * Add only real reviews with the client's permission. Copy them from Google
 * Reviews and keep the original date. While this list is empty, the site
 * shows an honest "reviews coming soon" state and links to the Google
 * Business Profile.
 */
export type Testimonial = {
  name: string;
  service: "Wedding" | "Maternity" | "Family" | "Corporate";
  /** ISO date the review was written */
  date: string;
  quote: string;
  source: "Google" | "Direct";
};

export const testimonials: Testimonial[] = [];
