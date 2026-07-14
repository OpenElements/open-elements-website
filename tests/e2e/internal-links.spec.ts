import { test, expect } from '@playwright/test';

test.describe('Locale-aware internal link rewriter', () => {
  test('rewrites internal links in a German post to include /de prefix and normalizes trailing slashes', async ({ page }) => {
    // Navigate to a German post
    await page.goto('/de/posts/2025-12-15-cra');

    const articleBody = page.locator('main .prose').first();

    // /contact should be rewritten to /de/contact
    const contactLink = articleBody.locator('a[href="/de/contact"]').first();
    await expect(contactLink).toBeVisible();

    // /newsletter should be rewritten to /de/newsletter
    const newsletterLink = articleBody.locator('a[href="/de/newsletter"]').first();
    await expect(newsletterLink).toBeVisible();

    // External links should NOT be rewritten
    const externalLink = articleBody.locator('a[href^="https://eur-lex.europa.eu"]');
    await expect(externalLink).toBeVisible();
    await expect(externalLink).not.toHaveAttribute('href', /^\/de/);
  });

  test('rewrites shortcode relref links in a German post to include /de prefix', async ({ page }) => {
    // Navigate to the German review 2025 post which contains a relref to the 2024 post
    await page.goto('/de/posts/2026-02-10-review-2025');

    const articleBody = page.locator('main .prose').first();

    // The relref posts/2025-01-16-open-elements-in-2024 should be rewritten to /de/posts/2025-01-16-open-elements-in-2024
    const relrefLink = articleBody.locator('a[href="/de/posts/2025-01-16-open-elements-in-2024"]');
    await expect(relrefLink).toBeVisible();
  });

  test('does not prefix internal links in an English post', async ({ page }) => {
    // Navigate to the English review 2025 post
    await page.goto('/posts/2026-02-10-review-2025');

    const articleBody = page.locator('main .prose').first();

    // In English post, relref should remain unprefixed /posts/2025-01-16-open-elements-in-2024
    const relrefLink = articleBody.locator('a[href="/posts/2025-01-16-open-elements-in-2024"]');
    await expect(relrefLink).toBeVisible();
  });
});
