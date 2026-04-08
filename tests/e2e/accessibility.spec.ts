import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number], path: string = '') {
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

test.describe('Accessibility', () => {
  for (const locale of locales) {
    test(`home page has proper heading hierarchy for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      const h1Text = await page.locator('h1').first().textContent();
      expect(h1Text?.trim().length).toBeGreaterThan(0);
    });

    test(`navigation has proper ARIA landmarks for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav).toBeVisible();

      const main = page.locator('main, [role="main"]');
      await expect(main).toBeVisible();
    });

    test(`all images have alt text for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');

        expect(alt).not.toBeNull();
      }
    });

    test(`interactive elements are keyboard accessible for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const links = page.locator('a[href]');
      const linkCount = await links.count();
      
      if (linkCount > 0) {
        const firstLink = links.first();
        await expect(firstLink).toBeVisible();

        await firstLink.focus();
        await expect(firstLink).toBeFocused();
      }
    });

    test(`page has valid lang attribute for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));
      
      const htmlLang = await page.locator('html').getAttribute('lang');
      
      if (locale === 'de') {
        expect(htmlLang).toContain('de');
      } else {
        expect(htmlLang).toContain('en');
      }
    });
  }
});
