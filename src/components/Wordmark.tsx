import Image from "next/image";
import { site } from "@/content/site";

/** The studio's logo (public/brand), with a white version for dark backgrounds. */
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Image
      src={light ? "/brand/ads-camera-logo-stacked-white.png" : "/brand/ads-camera-logo-stacked.png"}
      alt={site.name}
      width={188}
      height={159}
      priority={!light}
      className={light ? "h-24 w-auto" : "h-[4.25rem] w-auto"}
    />
  );
}
