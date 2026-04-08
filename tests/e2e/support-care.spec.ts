import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number], path: string = '') {
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

test.describe('Support Care Pages', () => {
  for (const locale of locales) {
    test(`loads support care page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'support-care'));
      
      // Page should load successfully
      await expect(page).toHaveURL(/\/support-care/);
      
      // Should have main content
      await expect(page.locator('main')).toBeVisible();
      
      // Should maintain locale in URL
      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/support-care/);
      } else {
        await expect(page).toHaveURL(/^(?!.*\/de\/).*\/support-care/);
      }
    });

    test(`loads support care maven page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'support-care-maven'));
      
      // Page should load successfully
      await expect(page).toHaveURL(/\/support-care-maven/);
      
      // Should have main content
      await expect(page.locator('main')).toBeVisible();
      
      // Should maintain locale in URL
      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/support-care-maven/);
      } else {
        await expect(page).toHaveURL(/^(?!.*\/de\/).*\/support-care-maven/);
      }
    });
  }
});
