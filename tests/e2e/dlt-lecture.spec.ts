import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number]) {
  return locale === 'en' ? '/' : `/${locale}/`;
}

test.describe('DLT lecture page', () => {
  for (const locale of locales) {
    test(`footer link opens the localized DLT lecture page for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const lectureLink = page.getByRole('link', {
        name: locale === 'de' ? 'Vorlesung zu Digital Trust' : 'Digital Trust Lecture',
      });

      await expect(lectureLink).toBeVisible();
      await lectureLink.click();

      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/dlt-lecture\/?$/);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(
          'Vorlesung zu "DLT & Digital Trust"',
        );
        await expect(page.locator('main')).toContainText('Seit 2023 bietet Hendrik Ebbers');
        await expect(page.getByAltText('Fabian Geyer')).toBeVisible();
        await expect(page.locator('main')).toContainText('Fabian Geyer');
        await expect(page.locator('main')).toContainText('Masterstudent OTH Regensburg');
      } else {
        await expect(page).toHaveURL(/\/dlt-lecture\/?$/);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(
          'DLT & Digital Trust Lecture',
        );
        await expect(page.locator('main')).toContainText('Since 2023 Hendrik Ebbers');
        await expect(page.getByAltText('Fabian Geyer')).toBeVisible();
        await expect(page.locator('main')).toContainText('Fabian Geyer');
        await expect(page.locator('main')).toContainText('Masterstudent OTH Regensburg');
      }
    });
  }
});
