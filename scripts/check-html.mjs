// Checks every built page has a title (<= 60 chars), a meta description (<= 155 chars),
// a canonical URL, exactly one H1, and no broken internal links or images.
// Usage: node scripts/check-html.mjs [distDir]
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

// Does an internal URL path resolve to a built file?
async function resolves(dist, urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (clean === '' ) return true;
  const base = join(dist, clean);
  return (await exists(base)) && !(await stat(base)).isDirectory()
    ? true
    : (await exists(join(base, 'index.html'))) || (await exists(base + '.html'));
}

const dist = process.argv[2] ?? 'dist';
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

let problems = 0;
for await (const file of htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="(.*?)"/s)?.[1] ?? '');
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const issues = [];
  if (!title) issues.push('missing title');
  else if (title.length > 60) issues.push(`title is ${title.length} chars (max 60)`);
  if (!desc) issues.push('missing meta description');
  else if (desc.length > 155) issues.push(`description is ${desc.length} chars (max 155)`);
  if (!/rel="canonical"/.test(html)) issues.push('missing canonical URL');
  if (h1s !== 1) issues.push(`${h1s} H1 headings (need exactly 1)`);
  const refs = [...html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('//'));
  for (const ref of new Set(refs)) {
    if (!(await resolves(dist, ref))) issues.push(`broken link: ${ref}`);
  }
  if (issues.length) {
    problems += issues.length;
    console.log(`✗ ${file}: ${issues.join('; ')}`);
  }
}
console.log(problems ? `${problems} problem(s) found` : '✓ All pages have a title, description, canonical URL, one H1, and no broken internal links');
process.exitCode = problems ? 1 : 0;
