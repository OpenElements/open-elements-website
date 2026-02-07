import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number], path: string = '') {
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

test.describe('Contact Page', () => {
  for (const locale of locales) {
    test(`loads contact page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'contact'));

      await expect(page).toHaveURL(/\/contact/);

      await expect(page.locator('main')).toBeVisible();

      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/contact/);
      } else {
        await expect(page).toHaveURL(/^(?!.*\/de\/).*\/contact/);
      }
    });

    test(`contact page navigation works for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const contactLink = page.locator('nav a[href*="contact"]').first();
      
      if (await contactLink.count() > 0) {
        await contactLink.click();

        await expect(page).toHaveURL(/\/contact/);

        if (locale === 'de') {
          await expect(page).toHaveURL(/\/de\/contact/);
        }
      }
    });
  }
});
