import { test, expect } from '@playwright/test';

test.describe('Code highlighting', () => {
  test('render production-like syntax colors for fenced code blocks', async ({ page }) => {
    await page.goto('/posts/2026-03-12-java-modules-encapsulation-internal-packages');

    const articleBody = page.locator('main .prose').first();
    const codeBlock = articleBody.locator('.highlight pre').first();
    const keywordToken = codeBlock.locator('.token.keyword').first();
    const punctuationToken = codeBlock.locator('.token.punctuation').first();

    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveCSS('background-color', 'rgb(39, 40, 34)');
    await expect(keywordToken).toHaveCSS('color', 'rgb(102, 217, 239)');
    await expect(punctuationToken).toHaveCSS('color', 'rgb(249, 38, 114)');
  });
});
