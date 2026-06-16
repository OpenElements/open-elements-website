import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number]) {
  return locale === 'en' ? '/' : `/${locale}/`;
}

test.describe('Home Page', () => {
  for (const locale of locales) {
    test(`loads home page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      await expect(page).toHaveTitle(/Open Elements/i);

      await expect(page.locator('nav')).toBeVisible();

      await expect(page.locator('main')).toBeVisible();
    });

    test(`home page has proper meta tags for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);

      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute('content', /.+/);
    });

    test(`home page is responsive for ${locale}`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(localePath(locale));
      await expect(page.locator('nav')).toBeVisible();

      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator('nav')).toBeVisible();

      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator('nav')).toBeVisible();
    });

    test(`hero background covers ultra-wide screens for ${locale}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 2560, height: 1440 });
      await page.goto(localePath(locale));

      const heroBackground = page.locator('img[alt="Hero background"]');
      await expect(heroBackground).toBeVisible();

      const bounds = await heroBackground.boundingBox();
      expect(bounds?.width).toBeGreaterThanOrEqual(2560);
      expect(bounds?.height).toBeLessThanOrEqual(663);

      const preserveAspectRatio = await page.evaluate(async () => {
        const response = await fetch('/illustrations/home-bg-2.svg');
        const document = new DOMParser().parseFromString(
          await response.text(),
          'image/svg+xml',
        );
        return document.documentElement.getAttribute('preserveAspectRatio');
      });
      expect(preserveAspectRatio).toBe('none');

      const pageWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(pageWidth).toBe(2560);
    });
  }
});
