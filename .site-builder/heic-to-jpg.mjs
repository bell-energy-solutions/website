// Convert iPhone HEIC photos to JPEG. Usage: node .site-builder/heic-to-jpg.mjs <inDir> <outDir>
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import convert from 'heic-convert';

const [inDir, outDir] = process.argv.slice(2);
await mkdir(outDir, { recursive: true });
for (const name of await readdir(inDir)) {
  if (!/\.heic$/i.test(name)) continue;
  const out = await convert({ buffer: await readFile(join(inDir, name)), format: 'JPEG', quality: 0.92 });
  await writeFile(join(outDir, parse(name).name + '.jpg'), Buffer.from(out));
  console.log('converted', name);
}
