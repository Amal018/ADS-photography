"use client";

import { useEffect, useState } from "react";
import { Photo } from "./Photo";
import type { Category, Photo as PhotoData } from "@/content/portfolio";

type Filter = Category | "all";

export function PortfolioGallery({
  photos,
  filters,
}: {
  photos: PhotoData[];
  filters?: { id: Category; label: string }[];
}) {
  const [active, setActive] = useState<Filter>("all");

  // Deep links like /portfolio#weddings open on that category.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (filters?.some((f) => f.id === hash)) setActive(hash as Category);
  }, [filters]);

  const select = (id: Filter) => {
    setActive(id);
    history.replaceState(null, "", id === "all" ? window.location.pathname : `#${id}`);
  };

  const shown = active === "all" ? photos : photos.filter((p) => p.category === active);

  return (
    <div>
      {filters ? (
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {[{ id: "all" as const, label: "All work" }, ...filters].map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => select(f.id)}
              className="min-h-10 border border-line px-4 text-sm font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {f.label}
            </button>
          ))}
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} photos
      </p>
      <div className="mt-10 columns-1 gap-4 min-[480px]:columns-2 lg:columns-3">
        {shown.map((photo) => (
          <figure key={photo.id} className="mb-4 break-inside-avoid">
            <Photo photo={photo} />
            <figcaption className="sr-only">{photo.alt}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
