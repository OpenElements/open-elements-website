import { test, expect } from '@playwright/test';

test.describe('External post links', () => {
  test('open external article links in a new tab and show an icon', async ({ page }) => {
    await page.goto('/posts/2026-03-12-agentic-wallets');

    const articleBody = page.locator('main .prose').first();
    const externalLink = articleBody.locator(
      'a[href="https://modelcontextprotocol.io/specification/2025-11-25"]',
    );

    await expect(externalLink).toBeVisible();
    await expect(externalLink).toHaveAttribute('target', '_blank');
    await expect(externalLink).toHaveAttribute('rel', /noopener/);
    await expect(externalLink.locator('[data-icon="mdi-open-in-new"]')).toHaveCount(1);
  });

  test('keep internal article links in the same tab without the external-link icon', async ({
    page,
  }) => {
    await page.goto('/posts/2025-01-16-open-elements-in-2024');

    const articleBody = page.locator('main .prose').first();
    const internalLink = articleBody.locator('a[href="/about-hendrik"]').first();

    await expect(internalLink).toBeVisible();
    await expect(internalLink).not.toHaveAttribute('target', '_blank');
    await expect(internalLink.locator('[data-icon="mdi-open-in-new"]')).toHaveCount(0);
  });
});
