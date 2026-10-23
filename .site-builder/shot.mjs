// Screenshot a public web page. Usage: node .site-builder/shot.mjs <url> <out.png> [width] [height]
import { chromium } from '@playwright/test';
const [url, out, w = '1100', h = '1500'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: out });
await browser.close();
console.log('saved', out);
