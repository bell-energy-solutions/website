import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bellenergysolutions.com',
  output: 'static',
  trailingSlash: 'ignore',
  // The stylesheet is small, so inline it to avoid a render-blocking request (Lighthouse).
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you') })],
});
