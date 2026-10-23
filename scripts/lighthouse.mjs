// Run Lighthouse (mobile defaults) on several pages, using Playwright's Chromium.
// Usage: node .site-builder/lighthouse.mjs <baseUrl> <path> [path...]
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { writeFile, mkdir } from 'node:fs/promises';

const [base, ...paths] = process.argv.slice(2);
// Cloudflare preview URLs (pr-N-...) are served with "noindex" on purpose, so the
// crawlability audit would always fail there. It still runs against the live site.
const isPreview = /\/\/pr-\d+-/.test(base);
const port = 9333;
const browser = await chromium.launch({ args: [`--remote-debugging-port=${port}`] });
await mkdir('test-results/lighthouse', { recursive: true });
let worst = 100;
for (const path of paths) {
  const result = await lighthouse(base + path, {
    port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    ...(isPreview ? { skipAudits: ['is-crawlable'] } : {}),
  });
  const c = result.lhr.categories;
  const s = (k) => Math.round(c[k].score * 100);
  const scores = [s('performance'), s('accessibility'), s('best-practices'), s('seo')];
  worst = Math.min(worst, ...scores);
  console.log(`${path.padEnd(42)} perf ${scores[0]}  a11y ${scores[1]}  best ${scores[2]}  seo ${scores[3]}`);
  const name = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  await writeFile(`test-results/lighthouse/${name}.json`, result.report);
  for (const [, audit] of Object.entries(result.lhr.audits)) {
    if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'informative' && audit.scoreDisplayMode !== 'notApplicable') {
      console.log(`   - ${audit.id}: ${audit.title}${audit.displayValue ? ' (' + audit.displayValue + ')' : ''}`);
    }
  }
}
await browser.close();
console.log(`lowest score: ${worst}`);
process.exitCode = worst >= 90 ? 0 : 1;
