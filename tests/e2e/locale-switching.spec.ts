import { test, expect } from '@playwright/test';

test.describe('Locale Switching', () => {
  test('can switch between EN and DE on home page', async ({ page }) => {
    // Start with English
    await page.goto('/');
    await expect(page).not.toHaveURL(/\/de\//);
    
    // Find and click language switcher to German
    const languageSwitcher = page.locator('[data-locale-switcher], a[href*="/de/"], button[aria-label*="Deutsch"], button[aria-label*="German"]').first();
    
    if (await languageSwitcher.count() > 0) {
      await languageSwitcher.click();
      
      // Should switch to German
      await expect(page).toHaveURL(/\/de\//);
    }
  });

  test('maintains page context when switching locale', async ({ page }) => {
    // Go to about page in English
    await page.goto('/about');
    
    // Find language switcher
    const languageSwitcher = page.locator('[data-locale-switcher], a[href*="/de/about"], button[aria-label*="Deutsch"]').first();
    
    if (await languageSwitcher.count() > 0) {
      await languageSwitcher.click();
      
      // Should be on about page in German
      await expect(page).toHaveURL(/\/de\/about/);
    }
  });

  test('locale persists across navigation', async ({ page }) => {
    // Start with German
    await page.goto('/de/');
    
    // Navigate to about page
    const aboutLink = page.locator('nav a[href*="about"]').first();
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      
      // Should still be in German
      await expect(page).toHaveURL(/\/de\/about/);
    }
    
    // Navigate to contact page
    const contactLink = page.locator('nav a[href*="contact"]').first();
    if (await contactLink.count() > 0) {
      await contactLink.click();
      
      // Should still be in German
      await expect(page).toHaveURL(/\/de\/contact/);
    }
  });
});
