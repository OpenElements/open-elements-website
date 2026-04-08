import { test, expect } from '@playwright/test';

test.describe('Post heading anchors', () => {
  test('render Hugo-style anchor links for post headlines', async ({ page }) => {
    await page.goto('/posts/2026-03-05-oss-ai-slop', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('main')).toBeVisible();

    const articleBody = page.locator('main .prose').first();
    const punctuatedHeading = articleBody.locator(
      'h2#case-study-an-unusual-contribution-trend-in-the-context-of-major-projects',
    );
    const whyItMattersAnchor = articleBody.locator(
      'h2#why-this-ai-slop-matters a[href="#why-this-ai-slop-matters"]',
    );

    await expect(punctuatedHeading).toBeVisible();
    await expect(
      punctuatedHeading.locator(
        'a[href="#case-study-an-unusual-contribution-trend-in-the-context-of-major-projects"] [data-icon="mdi-link-variant"]',
      ),
    ).toHaveCount(1);

    await expect(whyItMattersAnchor).toBeVisible();
    await whyItMattersAnchor.click();
    await expect(page).toHaveURL(/#why-this-ai-slop-matters$/);
  });
});
