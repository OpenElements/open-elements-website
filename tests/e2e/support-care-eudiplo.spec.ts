import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

const expected = {
  en: {
    home: '/',
    path: '/support-care-eudiplo',
    url: /^(?!.*\/de\/).*\/support-care-eudiplo\/?$/,
    title: 'Connect EUDI wallets – open, and with backup.',
    faq: 'Does EUDIPLO cost anything?',
  },
  de: {
    home: '/de/',
    path: '/de/support-care-eudiplo',
    url: /\/de\/support-care-eudiplo\/?$/,
    title: 'EUDI-Wallets anbinden – offen und mit Rückendeckung.',
    faq: 'Kostet EUDIPLO etwas?',
  },
} as const;

test.describe('Support & Care EUDIPLO page', () => {
  for (const locale of locales) {
    const e = expected[locale];

    test(`renders the localized EUDIPLO page for ${locale}`, async ({
      page,
    }) => {
      await page.goto(e.path);

      await expect(page).toHaveURL(e.url);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        e.title,
      );
      await expect(
        page.getByRole('heading', { level: 3, name: e.faq }),
      ).toBeVisible();
      await expect(
        page.locator('main a[href="https://github.com/EUDIPLO/eudiplo"]'),
      ).toBeVisible();
    });

    test(`footer link opens the EUDIPLO page for ${locale}`, async ({
      page,
    }) => {
      await page.goto(e.home);

      const link = page
        .locator('footer')
        .getByRole('link', { name: 'Support & Care: EUDIPLO' });
      await expect(link).toBeVisible();
      await link.click();

      await expect(page).toHaveURL(e.url);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        e.title,
      );
    });
  }
});
