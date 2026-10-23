import { defineConfig, devices } from '@playwright/test';

// Tests run against the built site. Set BASE_URL to test a deployed preview instead.
const baseURL = process.env.BASE_URL ?? 'http://localhost:4322';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL },
  projects: [
    { name: 'phone', use: { ...devices['Pixel 7'], viewport: { width: 375, height: 812 } } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run build && npx astro preview --port 4322 --host 127.0.0.1',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
