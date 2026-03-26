import { test, expect } from '@playwright/test';

test.describe('Blog post language switch', () => {
  test('hides the language switch on an English-only post', async ({ page }) => {
    await page.goto('/posts/2026-03-12-agentic-wallets');

    await expect(page).toHaveURL(/\/posts\/2026-03-12-agentic-wallets\/?$/);
    await expect(page.locator('[data-locale-switcher]:visible')).toHaveCount(0);
  });

  test('hides the language switch on a German-only post', async ({ page }) => {
    await page.goto('/de/posts/2026-03-19-container-gov');

    await expect(page).toHaveURL(/\/de\/posts\/2026-03-19-container-gov\/?$/);
    await expect(page.locator('[data-locale-switcher]:visible')).toHaveCount(0);
  });

  test('keeps the language switch on bilingual posts', async ({ page }) => {
    await page.goto('/posts/2026-03-05-oss-ai-slop');

    const localeSwitcher = page.locator('[data-locale-switcher="desktop"]:visible');

    await expect(localeSwitcher).toHaveCount(1);
    await expect(localeSwitcher.locator('[data-locale-link="en"]')).toBeVisible();
    await expect(localeSwitcher.locator('[data-locale-link="de"]')).toBeVisible();
  });

  test('returns a localized 404 when a post locale does not exist', async ({ page }) => {
    await page.goto('/de/posts/2026-03-12-agentic-wallets');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Seite nicht gefunden');

    await page.context().clearCookies();
    await page.goto('/posts/2026-03-19-container-gov');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Page Not Found');
  });
});
