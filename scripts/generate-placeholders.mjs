/**
 * Generates tasteful gradient PLACEHOLDER images so the site renders before
 * the owner's real photos arrive. These are throwaway — replace the files in
 * public/images/ with real photography (see EDITING.md).
 *
 * Run:  node scripts/generate-placeholders.mjs
 * Emits PNGs, which are then converted to .jpg by sips in package setup.
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT, { recursive: true });

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

/** Vertical gradient with a faint horizon band — reads as a seascape stand-in. */
function makePng(width, height, top, bottom, horizon) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  let p = 0;
  for (let y = 0; y < height; y++) {
    raw[p++] = 0; // filter: none
    const t = y / (height - 1);
    for (let x = 0; x < width; x++) {
      let r = lerp(top[0], bottom[0], t);
      let g = lerp(top[1], bottom[1], t);
      let b = lerp(top[2], bottom[2], t);
      // faint lighter horizon line ~62% down
      if (horizon) {
        const hy = Math.abs(y - height * 0.62);
        if (hy < 2) {
          r = Math.min(255, r + 26);
          g = Math.min(255, g + 26);
          b = Math.min(255, b + 26);
        }
      }
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const ink = [11, 27, 59];
const sound = [46, 90, 122];
const sand = [214, 201, 178];

const images = [
  { name: "boat-profile.png", w: 1600, h: 1000, top: ink, bottom: sound, horizon: true },
  { name: "boat-cockpit.png", w: 1400, h: 1000, top: sound, bottom: [230, 222, 208], horizon: false },
  { name: "boat-bow.png", w: 1400, h: 1000, top: [222, 214, 198], bottom: ink, horizon: false },
];

for (const im of images) {
  writeFileSync(join(OUT, im.name), makePng(im.w, im.h, im.top, im.bottom, im.horizon));
  console.log("wrote", im.name);
}
console.log("done");
