import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number], path: string = '') {
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

test.describe('About Page', () => {
  for (const locale of locales) {
    test(`loads about page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'about'));

      await expect(page).toHaveURL(/\/about/);

      await expect(page.locator('main')).toBeVisible();

      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/about/);
      } else {
        await expect(page).toHaveURL(/^(?!.*\/de\/).*\/about/);
      }
    });

    test(`about page navigation works for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const aboutLink = page.locator('nav a[href*="about"]').first();
      await aboutLink.click();

      await expect(page).toHaveURL(/\/about/);

      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/about/);
      }
    });
  }
});
