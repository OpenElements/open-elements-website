import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number], path: string = '') {
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

test.describe('About Page', () => {
  for (const locale of locales) {
    test(`loads about page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'about'));
      
      // Page should load successfully
      await expect(page).toHaveURL(/\/about/);
      
      // Should have main content
      await expect(page.locator('main')).toBeVisible();
      
      // Should maintain locale in URL
      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/about/);
      } else {
        await expect(page).toHaveURL(/^(?!.*\/de\/).*\/about/);
      }
    });

    test(`about page navigation works for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));
      
      // Find and click about link in navigation
      const aboutLink = page.locator('nav a[href*="about"]').first();
      await aboutLink.click();
      
      // Should navigate to about page
      await expect(page).toHaveURL(/\/about/);
      
      // Should maintain locale
      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/about/);
      }
    });
  }
});
