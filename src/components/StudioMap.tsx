"use client";

import { useState } from "react";
import { formattedAddress, mapEmbedSrc, mapLink, site } from "@/content/site";
import { PinIcon } from "./icons";

/**
 * Google Maps embed, loaded on request so the third-party iframe stays off the
 * critical path. Until the studio's coordinates are set in site.ts, the card
 * says the location is to be confirmed instead of pointing at a guessed pin.
 */
export function StudioMap() {
  const [show, setShow] = useState(false);
  const embed = mapEmbedSrc();
  const link = mapLink();

  if (show && embed) {
    return (
      <iframe
        title={`Map showing ${site.name} in ${site.address.locality}`}
        src={embed}
        className="block aspect-[4/3] w-full border border-line"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex aspect-[4/3] flex-col justify-between border border-line bg-stone p-6">
      <div className="flex gap-3">
        <PinIcon className="mt-0.5 size-5 shrink-0 text-muted" />
        <div>
          <p className="font-medium">The studio</p>
          <p className="mt-1 text-ink-soft">{formattedAddress()}</p>
        </div>
      </div>
      {embed && link ? (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setShow(true)} className="btn btn-primary">
            Show map
          </button>
          <a href={link} className="btn btn-secondary" target="_blank" rel="noopener">
            Open in Google Maps
          </a>
        </div>
      ) : (
        <p className="text-sm text-muted">Map location to be confirmed.</p>
      )}
    </div>
  );
}
