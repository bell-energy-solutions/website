import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pages } from './pages';

for (const path of pages) {
  test.describe(path, () => {
    test('layout, accessibility, and tap targets', async ({ page }, testInfo) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);

      // Full-page screenshot for human review.
      const name = (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '-')) + `-${testInfo.project.name}.png`;
      await page.screenshot({ path: `test-results/screens/${name}`, fullPage: true });

      // No sideways scrolling.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, 'page scrolls sideways').toBeLessThanOrEqual(0);

      // No broken images.
      const broken = await page.evaluate(() =>
        [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
      );
      expect(broken, 'broken images').toEqual([]);

      // Phone number is easy to find on every page.
      await expect(page.locator('header a[href^="tel:"]')).toBeVisible();

      // Buttons and nav links are big enough to tap (44x44 CSS px).
      const small = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('.btn, .menu-toggle, .nav a, .header-call')]
          .filter((el) => el.offsetParent !== null)
          .map((el) => ({ text: el.textContent?.trim() ?? '', ...el.getBoundingClientRect().toJSON() }))
          .filter((r) => r.width < 44 || r.height < 44)
          .map((r) => `${r.text} (${Math.round(r.width)}x${Math.round(r.height)})`),
      );
      expect(small, 'tap targets smaller than 44px').toEqual([]);

      // Accessibility, including color contrast (WCAG 2 AA).
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      const issues = results.violations.map((v) => `${v.id}: ${v.nodes.length} element(s) — ${v.help}`);
      expect(issues, 'accessibility problems').toEqual([]);
    });
  });
}

test('404 page returns a page with a way back', async ({ page }) => {
  await page.goto('/this-page-does-not-exist/');
  await expect(page.locator('h1')).toHaveText('Page not found');
  await expect(page.locator('main a[href="/"]')).toBeVisible();
});
