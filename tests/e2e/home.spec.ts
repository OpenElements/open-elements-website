import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number]) {
  return locale === 'en' ? '/' : `/${locale}/`;
}

test.describe('Home Page', () => {
  for (const locale of locales) {
    test(`loads home page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));
      
      // Page should load successfully
      await expect(page).toHaveTitle(/Open Elements/i);
      
      // Should have main navigation
      await expect(page.locator('nav')).toBeVisible();
      
      // Should have main content
      await expect(page.locator('main')).toBeVisible();
    });

    test(`home page has proper meta tags for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));
      
      // Should have meta description
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);
      
      // Should have viewport meta tag
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute('content', /.+/);
    });

    test(`home page is responsive for ${locale}`, async ({ page }) => {
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(localePath(locale));
      await expect(page.locator('nav')).toBeVisible();
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator('nav')).toBeVisible();
      
      // Test desktop view
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator('nav')).toBeVisible();
    });
  }
});
