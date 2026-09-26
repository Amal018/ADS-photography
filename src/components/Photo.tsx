import Image from "next/image";
import type { Photo as PhotoData } from "@/content/portfolio";

const categoryLabel: Record<PhotoData["category"], string> = {
  weddings: "Wedding",
  maternity: "Maternity",
  family: "Family",
  product: "Product",
};

/**
 * A photograph at its own aspect ratio. Entries without `src` render as a
 * quiet neutral slot with a small caption, so the layout reads correctly
 * until real work is added.
 */
export function Photo({
  photo,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  ratio,
  className = "",
}: {
  photo: PhotoData;
  sizes?: string;
  priority?: boolean;
  /** Override the photo's own ratio, e.g. to crop into a uniform grid. */
  ratio?: number;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`} style={{ aspectRatio: ratio ?? photo.ratio }}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder for: ${photo.alt}`}
          className="absolute inset-0 flex items-end bg-gradient-to-b from-[#e8e7e3] to-[#dddcd7] p-4"
        >
          <span className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            {categoryLabel[photo.category]} · photo to come
          </span>
        </div>
      )}
    </div>
  );
}
