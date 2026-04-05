import { test, expect } from '@playwright/test';

test.describe('Markdown tables', () => {
  test('render GFM tables in blog posts', async ({ page }) => {
    await page.goto('/posts/2020-02-21-adopt-tests', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('main')).toBeVisible();

    const articleBody = page.locator('main .prose').first();
    const table = articleBody.locator('table').first();

    await expect(table).toBeVisible();
    await expect(table).toContainText('name');
    await expect(table).toContainText('openjdk');
    await expect(table).toContainText('functional');
    await expect(table.locator('tr')).toHaveCount(7);
  });
});
