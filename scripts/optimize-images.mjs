#!/usr/bin/env node
/**
 * Optimize images in ./pics into ./public/gallery with multiple sizes & formats.
 * - Converts HEIC/HEIF, JPEG, JPG, PNG to WebP + JPEG
 * - Generates sizes: 480, 768, 1200, 1800 (width)
 * - Preserves EXIF? No (strips metadata by default for smaller output)
 * - Skips files already processed with same name+size
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 *   node scripts/optimize-images.mjs --limit 3
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'pics');
const OUT_DIR = path.join(ROOT, 'public', 'gallery');
const SIZES = [480, 768, 1200, 1800];
const FORMATS = [
  { ext: 'webp', options: { quality: 80 } },
  { ext: 'jpg', options: { quality: 82, mozjpeg: true } },
];
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.heic', '.heif', '.JPG', '.JPEG', '.PNG', '.HEIC', '.HEIF']);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function baseNameNoExt(file) {
  const ext = path.extname(file);
  return path.basename(file, ext);
}

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile())
    .map(e => e.name)
    .filter(name => ALLOWED_EXT.has(path.extname(name)));
}

function execFileAsync(cmd, args) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve({ stdout, stderr });
    });
  });
}

async function readImageBufferWithFallback(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();
  const raw = await fs.readFile(srcPath);
  // On macOS, always use sips for HEIC/HEIF first for maximum compatibility
  if ((ext === '.heic' || ext === '.heif') && process.platform === 'darwin') {
    const tmpOut = path.join(os.tmpdir(), `${baseNameNoExt(srcPath)}-tmp.jpg`);
    try {
      await execFileAsync('sips', ['-s', 'format', 'jpeg', srcPath, '--out', tmpOut]);
      const converted = await fs.readFile(tmpOut);
      fs.unlink(tmpOut).catch(() => {});
      return converted;
    } catch (fallbackErr) {
      // If sips fails, fall back to sharp (may still fail without HEIF support)
      try {
        await sharp(raw, { failOn: 'none' }).metadata();
        return raw;
      } catch (err) {
        throw new Error(`HEIC conversion failed (sips): ${fallbackErr.message}`);
      }
    }
  }
  // Non-HEIC or non-macOS: return raw; sharp will handle formats it supports
  return raw;
}

async function processImage(file) {
  const srcPath = path.join(SRC_DIR, file);
  const id = baseNameNoExt(file).replace(/\s+/g, '-');
  const buf = await readImageBufferWithFallback(srcPath);
  const meta = await sharp(buf, { failOn: 'none' }).metadata();
  const written = [];

  for (const width of SIZES) {
    // Avoid upscaling tiny images
    if (meta.width && meta.width < width) continue;
    for (const fmt of FORMATS) {
      const outName = `${id}-${width}.${fmt.ext}`;
      const outPath = path.join(OUT_DIR, outName);
      let exists = false;
      try {
        // Check if file already exists
        await fs.access(outPath);
        exists = true;
      } catch (_) {}

      const pipeline = sharp(buf, { failOn: 'none' })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .toFormat(fmt.ext, fmt.options)
        .withMetadata({ exif: undefined }); // strip metadata

      if (!exists) {
        await ensureDir(OUT_DIR);
        await pipeline.toFile(outPath);
        console.log('Wrote', path.relative(ROOT, outPath));
      }

      // Always record the file in the manifest, whether newly written or pre-existing
      written.push({ file: outName, width, format: fmt.ext });
    }
  }
  return { id, written };
}

async function main() {
  await ensureDir(OUT_DIR);
  const limitArgIndex = process.argv.indexOf('--limit');
  const limit = limitArgIndex > -1 ? Number(process.argv[limitArgIndex + 1]) : Infinity;

  const images = await listImages(SRC_DIR);
  if (!images.length) {
    console.log('No images found in', path.relative(ROOT, SRC_DIR));
    return;
  }

  let count = 0;
  const index = {};
  for (const file of images) {
    if (count >= limit) break;
    try {
      const result = await processImage(file);
      if (result) {
        index[result.id] = result.written;
      }
      count++;
    } catch (err) {
      console.error('Error processing', file, err.message);
    }
  }

  // Write index.json for app consumption
  const indexPath = path.join(OUT_DIR, 'index.json');
  await fs.writeFile(indexPath, JSON.stringify(index, null, 2));
  console.log('Wrote', path.relative(ROOT, indexPath));
  console.log(`Done. Processed ${count} of ${images.length} images.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
