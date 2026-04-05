import { test, expect } from '@playwright/test';

test.describe('Markdown shortcode links', () => {
  test('render relref and ref links to post and top-level routes', async ({ page }) => {
    await page.goto('/posts/2026-02-10-review-2025', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('main')).toBeVisible();

    const articleBody = page.locator('main .prose').first();
    const firstArticleLink = articleBody.locator(
      'a[href="/posts/2025-01-16-open-elements-in-2024"]',
    );
    const supportCareLink = articleBody.locator(
      'a[href="/support-care-maven"]',
    );

    await expect(firstArticleLink).toBeVisible();
    await expect(firstArticleLink).toContainText('growth trajectory from 2024');
    await expect(supportCareLink.first()).toBeVisible();
  });

  test('render relref links to nested routes', async ({ page }) => {
    await page.goto('/posts/2026-02-10-review-2025', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('main')).toBeVisible();

    const articleBody = page.locator('main .prose').first();
    const articleLink = articleBody.locator(
      'a[href="/articles/what-is-maven"]',
    );
    const employeeLink = articleBody.locator('a[href="/employees/jessie"]');

    await expect(articleLink).toBeVisible();
    await expect(articleLink).toContainText('work on Apache Maven');
    await expect(employeeLink).toBeVisible();
    await expect(employeeLink).toContainText('Jessy Ssebuliba');
  });
});
