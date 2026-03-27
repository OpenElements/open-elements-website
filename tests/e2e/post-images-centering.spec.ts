import { test, expect, type Page } from '@playwright/test';

async function expectImageToBeCentered(page: Page, imageSelector: string) {
  const articleBody = page.locator('main .prose').first();
  const image = articleBody.locator(imageSelector).first();

  await expect(image).toBeVisible();

  const centerOffset = await image.evaluate((node) => {
    const article = node.closest('.prose');

    if (!article) {
      return null;
    }

    const articleRect = article.getBoundingClientRect();
    const imageRect = node.getBoundingClientRect();

    return Math.abs(
      articleRect.left + articleRect.width / 2 - (imageRect.left + imageRect.width / 2),
    );
  });

  expect(centerOffset).not.toBeNull();
  expect(centerOffset!).toBeLessThanOrEqual(2);
}

test.describe('Post images', () => {
  test('center standalone images in blog posts', async ({ page }) => {
    await page.goto('/posts/2025-01-16-open-elements-in-2024');
    await expectImageToBeCentered(
      page,
      'img[alt="Open Elements continues to focus on open source and Java"]',
    );

    await page.goto('/posts/2026-01-27-java-modules-maven4-basics');
    await expectImageToBeCentered(page, 'img[alt="Module dependencies"]');

    await page.goto('/posts/2026-03-05-oss-ai-slop');
    await expectImageToBeCentered(page, 'img[alt="Symbolic image of open source maintenance"]');
  });
});
