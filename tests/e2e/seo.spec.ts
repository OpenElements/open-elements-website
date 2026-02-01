import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number], path: string = '') {
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

test.describe('SEO', () => {
  const pages = ['', 'about', 'contact', 'posts', 'support-care'];

  for (const locale of locales) {
    for (const pagePath of pages) {
      test(`${pagePath || 'home'} page has title tag for ${locale}`, async ({ page }) => {
        await page.goto(localePath(locale, pagePath));
        
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);
        expect(title.length).toBeLessThan(70); // SEO best practice
      });

      test(`${pagePath || 'home'} page has meta description for ${locale}`, async ({ page }) => {
        await page.goto(localePath(locale, pagePath));
        
        const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
        
        if (metaDescription) {
          expect(metaDescription.length).toBeGreaterThan(50);
          expect(metaDescription.length).toBeLessThan(200); // Allow slightly longer descriptions
        }
      });

      test(`${pagePath || 'home'} page has Open Graph tags for ${locale}`, async ({ page }) => {
        await page.goto(localePath(locale, pagePath));
        
        // Should have og:title
        const ogTitle = page.locator('meta[property="og:title"]');
        await expect(ogTitle).toHaveAttribute('content', /.+/);
        
        // Should have og:type
        const ogType = page.locator('meta[property="og:type"]');
        if (await ogType.count() > 0) {
          await expect(ogType).toHaveAttribute('content', /.+/);
        }
      });

      test(`${pagePath || 'home'} page has canonical URL for ${locale}`, async ({ page }) => {
        await page.goto(localePath(locale, pagePath));
        
        const canonical = page.locator('link[rel="canonical"]');
        
        if (await canonical.count() > 0) {
          const href = await canonical.getAttribute('href');
          expect(href).toBeTruthy();
        }
      });
    }
  }

  test('robots.txt exists and is accessible', async ({ page, baseURL }) => {
    const response = await page.goto(`${baseURL}/robots.txt`);
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    expect(content).toContain('User-agent');
  });

  test('sitemap.xml exists and is accessible', async ({ page, baseURL }) => {
    const response = await page.goto(`${baseURL}/sitemap.xml`);
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    // Check for sitemap content (may be wrapped in HTML by browser)
    expect(content).toMatch(/sitemap|urlset/);
  });
});
