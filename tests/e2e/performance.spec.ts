import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number]) {
  return locale === 'en' ? '/' : `/${locale}/`;
}

test.describe('Performance', () => {
  for (const locale of locales) {
    test(`home page loads within reasonable time for ${locale}`, async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto(localePath(locale), { waitUntil: 'domcontentloaded' });
      
      const loadTime = Date.now() - startTime;
      
      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test(`navigation has no console errors for ${locale}`, async ({ page }) => {
      const errors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(localePath(locale));
      
      // Should not have critical console errors
      expect(errors.length).toBe(0);
    });

    test(`page has no broken resources for ${locale}`, async ({ page }) => {
      const failedRequests: string[] = [];
      
      page.on('requestfailed', (request) => {
        failedRequests.push(request.url());
      });
      
      await page.goto(localePath(locale), { waitUntil: 'networkidle' });
      
      // Should not have failed resource loads
      expect(failedRequests.length).toBe(0);
    });
  }
});
