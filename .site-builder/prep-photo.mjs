// Resize a photo for the site and strip all metadata (including GPS location).
// Usage: node .site-builder/prep-photo.mjs <in.jpg> <out.jpg> [maxWidth]
import sharp from 'sharp';

const [input, output, max = '2000'] = process.argv.slice(2);
await sharp(input)
  .rotate() // apply EXIF orientation before metadata is dropped
  .resize({ width: Number(max), withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output); // sharp writes no metadata unless .withMetadata() is called
const meta = await sharp(output).metadata();
console.log(`${output}: ${meta.width}x${meta.height}, exif: ${meta.exif ? 'PRESENT' : 'none'}`);
