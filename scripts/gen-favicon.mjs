import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

// Resolve sharp/png-to-ico from a temp install dir (MODBASE) to avoid permanent deps.
const require = createRequire((process.env.MODBASE || process.cwd()) + '/');
const sharp = require('sharp');
const pngToIcoMod = require('png-to-ico');
const pngToIco = pngToIcoMod.default || pngToIcoMod;

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url));
const sizes = [16, 32, 48];

const pngs = await Promise.all(
  sizes.map((s) => sharp(svg, { density: 384 }).resize(s, s).png().toBuffer())
);

const ico = await pngToIco(pngs);
writeFileSync(new URL('../public/favicon.ico', import.meta.url), ico);
console.log('favicon.ico written:', ico.length, 'bytes; sizes:', sizes.join('/'));
