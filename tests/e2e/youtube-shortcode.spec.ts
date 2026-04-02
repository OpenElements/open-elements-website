import { test, expect } from '@playwright/test';

test.describe('YouTube shortcode embeds', () => {
  test('render YouTube previews in the year in review post for both locales', async ({ page }) => {
    for (const pathname of ['/posts/2026-02-10-review-2025', '/de/posts/2026-02-10-review-2025']) {
      await page.goto(pathname);

      const articleBody = page.locator('main .prose').first();
      const firstVideo = articleBody.locator(
        'iframe[src="https://www.youtube.com/embed/Srm1Srn3rX0"]',
      );
      const secondVideo = articleBody.locator(
        'iframe[src="https://www.youtube.com/embed/kAi_qh11Hw8"]',
      );
      const firstVideoWrapper = articleBody.locator(
        'div[style*="padding-bottom: 56.25%"] iframe[src="https://www.youtube.com/embed/Srm1Srn3rX0"]',
      );

      await expect(firstVideo).toBeVisible();
      await expect(secondVideo).toBeVisible();
      await expect(firstVideo).toHaveAttribute('title', 'YouTube Video');
      await expect(firstVideoWrapper).toHaveCount(1);
    }
  });
});
