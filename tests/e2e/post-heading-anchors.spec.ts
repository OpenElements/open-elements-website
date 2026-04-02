import { test, expect } from '@playwright/test';

test.describe('Post heading anchors', () => {
  test('render Hugo-style anchor links for post headlines', async ({ page }) => {
    await page.goto('/posts/2026-03-12-java-modules-encapsulation-internal-packages');

    const articleBody = page.locator('main .prose').first();
    const punctuatedHeading = articleBody.locator(
      'h2#controlling-visibility-with-module-infojava',
    );
    const sourceCodeAnchor = articleBody.locator('h2#source-code a[href="#source-code"]');

    await expect(punctuatedHeading).toBeVisible();
    await expect(
      punctuatedHeading.locator(
        'a[href="#controlling-visibility-with-module-infojava"] [data-icon="mdi-link-variant"]',
      ),
    ).toHaveCount(1);

    await expect(sourceCodeAnchor).toBeVisible();
    await sourceCodeAnchor.click();
    await expect(page).toHaveURL(/#source-code$/);
  });
});
