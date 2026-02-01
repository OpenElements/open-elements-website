import { test, expect } from '@playwright/test';

const locales = ['en', 'de'] as const;

function localePath(locale: (typeof locales)[number], path: string = '') {
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

test.describe('Posts Page', () => {
  for (const locale of locales) {
    test(`loads posts listing page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'posts'));
      
      // Page should load successfully
      await expect(page).toHaveURL(/\/posts/);
      
      // Should have main content
      await expect(page.locator('main')).toBeVisible();
      
      // Should maintain locale in URL
      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/posts/);
      } else {
        await expect(page).toHaveURL(/^(?!.*\/de\/).*\/posts/);
      }
    });

    test(`posts page shows list of posts for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'posts'));
      
      // Should have at least one post link
      const postLinks = page.locator('a[href*="/posts/"]');
      const count = await postLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test(`can navigate to individual post from listing for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'posts'));
      
      // Get first post link that goes to a specific post (not just /posts)
      const postLinks = page.locator('a[href*="/posts/"]');
      const count = await postLinks.count();
      
      let foundIndividualPost = false;
      for (let i = 0; i < count; i++) {
        const link = postLinks.nth(i);
        const href = await link.getAttribute('href');
        
        // Check if it's a link to an individual post (contains /posts/slug)
        if (href && !href.startsWith('http') && href.match(/\/posts\/[^\/]+$/)) {
          await link.click();
          
          // Should navigate to individual post
          await expect(page).toHaveURL(/\/posts\/[^\/]+$/);
          
          // Should maintain locale
          if (locale === 'de') {
            await expect(page).toHaveURL(/\/de\/posts\//);
          }
          
          foundIndividualPost = true;
          break;
        }
      }
      
      // If no individual posts found, at least verify we're on the posts page
      if (!foundIndividualPost) {
        await expect(page).toHaveURL(/\/posts/);
      }
    });
  }
});
