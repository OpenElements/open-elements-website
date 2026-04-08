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
    await page.goto('/posts/2020-02-21-adopt-tests', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('main')).toBeVisible();
    await expectImageToBeCentered(page, 'img[alt="ci pipeline"]');

    await page.goto('/posts/2026-03-12-agentic-wallets', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('main')).toBeVisible();
    await expectImageToBeCentered(
      page,
      'img[alt="AI agents are blocked by traditional payment infrastructure that requires human identity verification"]',
    );
  });
});
