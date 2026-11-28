import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

const expected = {
  en: {
    home: '/',
    path: '/support-care-eudiplo',
    url: /^(?!.*\/de\/).*\/support-care-eudiplo\/?$/,
    javaUrl: /^(?!.*\/de\/).*\/support-care\/?$/,
    title: 'Connect EUDI wallets – open, and with backup.',
    faq: 'Does EUDIPLO cost anything?',
  },
  de: {
    home: '/de/',
    path: '/de/support-care-eudiplo',
    url: /\/de\/support-care-eudiplo\/?$/,
    javaUrl: /\/de\/support-care\/?$/,
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

    test(`Support & Care menu opens Java and EUDIPLO pages for ${locale}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1366, height: 768 });
      await page.goto(e.home);

      const trigger = page
        .locator('nav')
        .getByRole('button', { name: 'Support & Care' });
      const javaLink = page.locator('nav').getByRole('link', { name: 'Java' });
      const eudiploLink = page
        .locator('nav')
        .getByRole('link', { name: 'EUDIPLO', exact: true });

      await expect(eudiploLink).toBeHidden();
      await trigger.hover();
      await expect(javaLink).toBeVisible();
      await expect(eudiploLink).toBeVisible();

      await eudiploLink.click();
      await expect(page).toHaveURL(e.url);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        e.title,
      );

      await trigger.hover();
      await javaLink.click();
      await expect(page).toHaveURL(e.javaUrl);
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
