import { test, expect } from '@playwright/test';

test.describe('Blog post language switch', () => {
  test('keeps direct English post URLs stable for German browser preferences', async ({ browser }) => {
    const context = await browser.newContext({
      extraHTTPHeaders: {
        'Accept-Language': 'de-DE,de',
      },
    });
    const page = await context.newPage();

    await page.goto('/posts/2026/03/12/agentic-wallets-when-ai-agents-need-to-pay');

    await expect(page).toHaveURL(/\/posts\/2026\/03\/12\/agentic-wallets-when-ai-agents-need-to-pay\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Agentic Wallets');

    await context.close();
  });

  test('hides the language switch on an English-only post', async ({ page }) => {
    await page.goto('/posts/2026-03-12-agentic-wallets');

    await expect(page).toHaveURL(/\/posts\/2026-03-12-agentic-wallets\/?$/);
    await expect(page.locator('[data-locale-link]:visible')).toHaveCount(0);
  });

  test('hides the language switch on a German-only post', async ({ page }) => {
    await page.goto('/de/posts/2026-03-19-container-gov');

    await expect(page).toHaveURL(/\/de\/posts\/2026-03-19-container-gov\/?$/);
    await expect(page.locator('[data-locale-link]:visible')).toHaveCount(0);
  });

  test('keeps the language switch on bilingual posts', async ({ page }) => {
    await page.goto('/posts/2026-03-05-oss-ai-slop');

    await expect(page.locator('[data-locale-switcher-group="desktop"]:visible')).toHaveCount(1);
    await expect(page.locator('[data-locale-link="en"]:visible')).toHaveCount(1);
    await expect(page.locator('[data-locale-link="de"]:visible')).toHaveCount(1);
  });

  test('returns a localized 404 when a post locale does not exist', async ({ page }) => {
    await page.goto('/de/posts/2026-03-12-agentic-wallets');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Seite nicht gefunden');

    await page.context().clearCookies();
    await page.goto('/posts/2026-03-19-container-gov');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Page Not Found');
  });
});
