import type { Metadata } from "next";
import { site } from "@/content/site";

/** Unique title + description + canonical per page (spec §6). */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${site.url}${path}`,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
    },
  };
}
