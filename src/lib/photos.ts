import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { photosFor, type Category, type Photo } from "@/content/portfolio";

/**
 * Photos are read from folders in /public/photos, one folder per page section
 * (see public/photos/README.txt). Drop a file in, replace one or delete one and
 * the page picks it up on the next load in dev, or on the next build in
 * production. Empty folders fall back to the placeholder frames in
 * src/content/portfolio.ts.
 */

const ROOT = path.join(process.cwd(), "public", "photos");
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
// Camera and phone file names say nothing about the picture.
const CAMERA_NAME = /^(img|dsc|dscf|pxl|photo|image|whatsapp image)?[\s_.-]*[\d\s_.-]*$/i;

const describes: Record<Category, string> = {
  weddings: "candid wedding photography in Coimbatore",
  maternity: "maternity photoshoot in Coimbatore",
  family: "family portrait photography in Coimbatore",
  product: "product photography in Coimbatore",
};

/** "2-bride-in-a-lavender-saree.jpg" → "Bride in a lavender saree, wedding photography in Coimbatore" */
function altFrom(name: string, topic: string, prefix?: string) {
  let words = name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[\s_.-]*/, "")
    .replace(/[_-]+/g, " ")
    .trim();
  if (prefix && words.toLowerCase().startsWith(prefix)) words = words.slice(prefix.length).trim();
  if (!words || CAMERA_NAME.test(words)) return `${topic[0].toUpperCase()}${topic.slice(1)} by ADS Photography`;
  return `${words[0].toUpperCase()}${words.slice(1)}, ${topic}`;
}

function ratioOf(file: string) {
  // The header holds the dimensions; the first 1MB covers even large EXIF blocks.
  const fd = fs.openSync(file, "r");
  try {
    const buffer = Buffer.alloc(Math.min(fs.fstatSync(fd).size, 1024 * 1024));
    fs.readSync(fd, buffer, 0, buffer.length, 0);
    const { width, height, orientation } = imageSize(buffer);
    // EXIF orientations 5–8 are rotated a quarter turn.
    return orientation && orientation >= 5 ? height / width : width / height;
  } catch {
    return 4 / 5;
  } finally {
    fs.closeSync(fd);
  }
}

type Options = {
  /** Ends each photo's alt text. Defaults to the category's, e.g. "wedding photography in Coimbatore". */
  topic?: string;
  /** A slot name to leave out of the alt text. */
  prefix?: string;
};

/** Every image in public/photos/<folder>, ordered by file name (prefix 1-, 2-… to order). */
export function photosIn(folder: string, category: Category, { topic, prefix }: Options = {}): (Photo & { name: string })[] {
  const dir = path.join(ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => {
      const file = path.join(dir, name);
      const { mtimeMs, size } = fs.statSync(file);
      return {
        id: `${folder}/${name}`,
        name,
        category,
        alt: altFrom(name, topic ?? describes[category], prefix),
        ratio: ratioOf(file),
        // A replaced file gets a new URL, so the image optimizer's cache can't serve the old one.
        src: `/photos/${folder}/${encodeURIComponent(name)}?v=${Math.round(mtimeMs).toString(36)}${size.toString(36)}`,
      };
    });
}

/** A portfolio gallery: public/photos/portfolio/<category>, or placeholders while it's empty. */
export function gallery(category: Category): Photo[] {
  const real = photosIn(`portfolio/${category}`, category);
  return real.length ? real : photosFor(category);
}

/** Fixed slots filled in file-name order; slots without a photo keep their placeholder. */
export function slots(folder: string, placeholders: Photo[], topic?: string): Photo[] {
  const real = photosIn(folder, placeholders[0].category, { topic });
  return placeholders.map((placeholder, i) => real[i] ?? placeholder);
}

/** One named slot: the first file whose name starts with `slot`, e.g. "weddings-couple.jpg". */
export function namedSlot(folder: string, slot: string, placeholder: Photo, topic?: string): Photo {
  return (
    photosIn(folder, placeholder.category, { topic, prefix: slot }).find((p) => p.name.toLowerCase().startsWith(slot)) ??
    placeholder
  );
}
