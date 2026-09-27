// Generates on-brand placeholder art for every portfolio.ts entry that has
// no real photo yet. Run with: node scripts/generate-placeholder-photos.mjs
// Swap the resulting file at the same /public/portfolio/... path with a real
// photo (same filename) and the site picks it up automatically — no code
// change needed.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public", "portfolio");

// Kept in sync with the `photos` array in src/content/portfolio.ts (id,
// category, ratio only — this script doesn't need the alt text).
const photos = [
  { id: "w1", category: "weddings", ratio: 4 / 5 },
  { id: "w2", category: "weddings", ratio: 3 / 2 },
  { id: "w3", category: "weddings", ratio: 2 / 3 },
  { id: "w4", category: "weddings", ratio: 1 },
  { id: "w5", category: "weddings", ratio: 3 / 2 },
  { id: "w6", category: "weddings", ratio: 4 / 5 },
  { id: "m1", category: "maternity", ratio: 2 / 3 },
  { id: "m2", category: "maternity", ratio: 3 / 2 },
  { id: "m3", category: "maternity", ratio: 4 / 5 },
  { id: "f1", category: "family", ratio: 3 / 2 },
  { id: "f2", category: "family", ratio: 4 / 5 },
  { id: "f3", category: "family", ratio: 1 },
  { id: "p1", category: "product", ratio: 1 },
  { id: "p2", category: "product", ratio: 4 / 5 },
  { id: "p3", category: "product", ratio: 3 / 2 },
];

const LONG_EDGE = 1600;

// Line icons in a 24x24 grid, matching the stroke style of the inline
// placeholder already used in src/components/Photo.tsx.
const icons = {
  weddings: `<circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" />`,
  maternity: `<path d="M12 20.5S4 15.8 4 9.9A4.9 4.9 0 0 1 12 6.3a4.9 4.9 0 0 1 8 3.6c0 5.9-8 10.6-8 10.6z" />`,
  family: `<circle cx="6.5" cy="15" r="3" /><circle cx="12" cy="11.5" r="4" /><circle cx="17.5" cy="15" r="3" />`,
  product: `<rect x="5" y="5" width="14" height="14" rx="0.5" /><path d="M5 9.5h14M9.5 5v14" />`,
};

const labels = {
  weddings: "Weddings",
  maternity: "Maternity",
  family: "Family",
  product: "Product",
};

function dims(ratio) {
  if (ratio >= 1) return { width: LONG_EDGE, height: Math.round(LONG_EDGE / ratio) };
  return { width: Math.round(LONG_EDGE * ratio), height: LONG_EDGE };
}

function svgFor(photo) {
  const { width, height } = dims(photo.ratio);
  const cx = width / 2;
  const cy = height / 2;
  const icon = icons[photo.category];
  const label = labels[photo.category].toUpperCase();

  const step = Math.round(Math.min(width, height) / 7);
  const gridLines = [];
  for (let x = step; x < width; x += step) gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" />`);
  for (let y = step; y < height; y += step) gridLines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" />`);

  const iconTarget = Math.min(width, height) * 0.3;
  const scale = iconTarget / 24;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#efefef" />
      <stop offset="1" stop-color="#e3e3e3" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <g stroke="#0b0b0b" stroke-width="1" stroke-opacity="0.05">
    ${gridLines.join("\n    ")}
  </g>
  <g transform="translate(${cx} ${cy}) scale(${scale}) translate(-12 -12)" fill="none" stroke="#9a9a9a" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    ${icon}
  </g>
  <text x="${Math.round(width * 0.055)}" y="${height - Math.round(width * 0.045)}" font-family="Liberation Sans, Arial, sans-serif" font-weight="700" font-size="${Math.round(
    width / 30
  )}" letter-spacing="1.5" fill="#4d4d4d">${label} · PHOTO TO COME</text>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="#0b0b0b" stroke-opacity="0.08" />
</svg>`;
}

async function main() {
  const byCategory = {};
  for (const photo of photos) (byCategory[photo.category] ??= []).push(photo);
  for (const category of Object.keys(byCategory)) {
    await mkdir(path.join(publicDir, category), { recursive: true });
  }

  for (const photo of photos) {
    const svg = svgFor(photo);
    const outPath = path.join(publicDir, photo.category, `${photo.id}.webp`);
    const buffer = await sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();
    await writeFile(outPath, buffer);
    console.log(`${photo.id.padEnd(4)} -> ${path.relative(process.cwd(), outPath)} (${Math.round(buffer.byteLength / 1024)} KB)`);
  }
}

main();
