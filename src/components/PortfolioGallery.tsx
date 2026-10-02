"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Photo } from "./Photo";
import { CameraDial } from "./motion/CameraDial";
import { Lightbox } from "./motion/Lightbox";
import type { Category, Photo as PhotoData } from "@/content/portfolio";

type Filter = Category | "all";

export function PortfolioGallery({
  photos,
  filters,
}: {
  photos: PhotoData[];
  filters?: { id: Category; label: string }[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Filter>("all");
  const [open, setOpen] = useState<{ index: number; origin: { x: number; y: number } } | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

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
  const viewable = shown.filter((p) => p.src);

  function openAt(photo: PhotoData, e: React.MouseEvent<HTMLButtonElement>) {
    returnFocus.current = e.currentTarget;
    const r = e.currentTarget.getBoundingClientRect();
    setOpen({
      index: viewable.indexOf(photo),
      origin: { x: ((r.left + r.width / 2) / window.innerWidth) * 100, y: ((r.top + r.height / 2) / window.innerHeight) * 100 },
    });
  }

  return (
    <div>
      {filters ? (
        <CameraDial
          options={[{ id: "all" as const, label: "All work" }, ...filters]}
          active={active}
          onSelect={(id) => select(id as Filter)}
          counts={Object.fromEntries([["all", photos.length], ...filters.map((f) => [f.id, photos.filter((p) => p.category === f.id).length])])}
        />
      ) : null}
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} photos
      </p>
      {/* Keyed by filter so a new selection re-deals the prints. */}
      <div key={active} className="mt-10 columns-1 gap-4 min-[480px]:columns-2 lg:columns-3">
        {shown.map((photo, i) => (
          <motion.figure
            key={photo.id}
            className="mb-4 break-inside-avoid"
            initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={reduce ? { duration: 0 } : { duration: 0.9, delay: (i % 6) * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {photo.src ? (
              <button
                type="button"
                onClick={(e) => openAt(photo, e)}
                className="group block w-full cursor-zoom-in"
                aria-label={`View larger: ${photo.alt}`}
              >
                <Photo photo={photo} />
              </button>
            ) : (
              <Photo photo={photo} />
            )}
            <figcaption className="sr-only">{photo.alt}</figcaption>
          </motion.figure>
        ))}
      </div>

      <Lightbox
        photos={viewable}
        open={open}
        onIndex={(index) => setOpen((o) => (o ? { ...o, index } : o))}
        onClose={() => {
          setOpen(null);
          returnFocus.current?.focus();
        }}
      />
    </div>
  );
}
