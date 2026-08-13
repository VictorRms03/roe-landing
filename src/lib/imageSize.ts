import { readFileSync } from "node:fs";

export type ImageSize = { width: number; height: number };

/**
 * Intrinsic pixel size, read from the file header alone.
 *
 * Worth the forty lines: `next/image` builds a very different srcset depending
 * on what it is told. Given `fill` plus a `sizes` with no `vw` unit it offers
 * every configured width up to 3840, and a browser that picks the top of that
 * list asks the optimiser to render a 4K version of a logo — slow enough in dev
 * that some cards never fill in. Given a real width and height it offers 1x and
 * 2x of that size and nothing else.
 *
 * Only the three raster formats the logo folder accepts are handled; SVG has no
 * intrinsic size to read, and the caller sizes it nominally instead.
 */
export function imageSize(path: string): ImageSize | undefined {
  // 64 bytes covers PNG's IHDR and WebP's headers; JPEG needs the walk below.
  const bytes = readFileSync(path);

  if (bytes.length > 24 && bytes.toString("latin1", 1, 4) === "PNG") {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }

  if (bytes.length > 30 && bytes.toString("latin1", 0, 4) === "RIFF") {
    const format = bytes.toString("latin1", 12, 16);
    // Lossy, lossless and extended each store the size somewhere else.
    if (format === "VP8 ") {
      return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
    }
    if (format === "VP8L") {
      const bits = bytes.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (format === "VP8X") {
      return {
        width: (bytes.readUIntLE(24, 3) & 0xffffff) + 1,
        height: (bytes.readUIntLE(27, 3) & 0xffffff) + 1,
      };
    }
  }

  if (bytes.length > 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    // Walk the segments to the start-of-frame, which is the only one carrying
    // the dimensions. Every marker but SOF holds a length we can skip over.
    let offset = 2;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = bytes[offset + 1];
      const isStartOfFrame =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isStartOfFrame) {
        return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) };
      }

      offset += 2 + bytes.readUInt16BE(offset + 2);
    }
  }

  return undefined;
}
