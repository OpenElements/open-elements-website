import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number]) {
  return locale === 'en' ? '/' : `/${locale}/`;
}

function isExternalLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#');
}

test.describe('Navbar links', () => {
  for (const locale of locales) {
    test(`nav links keep ${locale} locale`, async ({ page, baseURL }) => {
      await page.setViewportSize({ width: 1366, height: 768 });
      await page.goto(localePath(locale));

      const navLinks = page.locator('nav a.nav-link');
      await expect(navLinks.first()).toBeVisible();

      const count = await navLinks.count();
      expect(count).toBeGreaterThan(0);

      const hrefs: string[] = [];
      for (let i = 0; i < count; i += 1) {
        const href = await navLinks.nth(i).getAttribute('href');
        if (href) {
          hrefs.push(href);
        }
      }

      for (const href of hrefs) {
        if (isExternalLink(href)) continue;

        const targetUrl = new URL(href, baseURL).pathname;
        await page.goto(targetUrl);

        if (locale === 'de') {
          await expect(page).toHaveURL(/\/de(\/|$)/);
        } else {
          await expect(page).not.toHaveURL(/\/de(\/|$)/);
        }
      }
    });
  }
});
