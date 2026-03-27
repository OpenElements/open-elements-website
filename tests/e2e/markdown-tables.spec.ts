import { test, expect } from '@playwright/test';

test.describe('Markdown tables', () => {
  test('render GFM tables in blog posts', async ({ page }) => {
    await page.goto('/posts/2026-03-12-java-modules-encapsulation-internal-packages');

    const articleBody = page.locator('main .prose').first();
    const table = articleBody.locator('table').first();

    await expect(table).toBeVisible();
    await expect(table).toContainText('Aspect');
    await expect(table).toContainText('Classpath');
    await expect(table).toContainText('Module Path');
    await expect(table.locator('tr')).toHaveCount(5);
  });
});
