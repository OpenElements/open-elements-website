import { test, expect } from '@playwright/test';

test.describe('Markdown shortcode links', () => {
  test('render relref links inside markdown link syntax', async ({ page }) => {
    await page.goto('/posts/2026-03-12-java-modules-encapsulation-internal-packages');

    const articleBody = page.locator('main .prose').first();
    const firstArticleLink = articleBody.locator(
      'a[href="/posts/2026-01-27-java-modules-maven4-basics"]',
    );
    const homeworkLink = articleBody.locator(
      'a[href="/posts/2026-02-26-java-modules-maven4-basics-homework"]',
    );

    await expect(firstArticleLink).toBeVisible();
    await expect(firstArticleLink).toContainText('first article');
    await expect(homeworkLink).toBeVisible();
    await expect(homeworkLink).toContainText('homework extension');
  });

  test('preserve relref fragments inside markdown links', async ({ page }) => {
    await page.goto('/posts/2026-02-26-java-modules-maven4-basics-homework');

    const articleBody = page.locator('main .prose').first();
    const fragmentLink = articleBody.locator(
      'a[href="/posts/2026-01-27-java-modules-maven4-basics#the-module-source-hierarchy"]',
    );

    await expect(fragmentLink).toBeVisible();
    await expect(fragmentLink).toContainText('module source hierarchy');
  });
});
