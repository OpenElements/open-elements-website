import { test, expect } from '@playwright/test';
import teamEn from '../../src/data/en/team.json' with { type: 'json' };
import teamDe from '../../src/data/de/team.json' with { type: 'json' };

const locales = ['en', 'de'] as const;

type TeamEntry = {
  firstName: string;
  lastName: string;
  tag?: string;
  visible?: boolean;
};

const teamByLocale: Record<(typeof locales)[number], TeamEntry[]> = {
  en: teamEn,
  de: teamDe,
};

function localePath(locale: (typeof locales)[number], path: string = '') {
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

test.describe('About Page', () => {
  for (const locale of locales) {
    test(`loads about page correctly for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale, 'about'));

      await expect(page).toHaveURL(/\/about/);

      await expect(page.locator('main')).toBeVisible();

      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/about/);
      } else {
        await expect(page).toHaveURL(/^(?!.*\/de\/).*\/about/);
      }
    });

    test(`about page navigation works for ${locale}`, async ({ page }) => {
      await page.goto(localePath(locale));

      const aboutLink = page.locator('nav a[href*="about"]').first();
      await aboutLink.click();

      await expect(page).toHaveURL(/\/about/);

      if (locale === 'de') {
        await expect(page).toHaveURL(/\/de\/about/);
      }
    });

    test(`shows team tags for ${locale}`, async ({ page }) => {
      // Expectations come from the team data, so editing a member's role or
      // tag in team.json doesn't break this test.
      const tagged = teamByLocale[locale].filter(
        (member) => member.visible && member.tag,
      );
      test.skip(tagged.length === 0, 'No visible team member has a tag');

      await page.goto(localePath(locale, 'about'));

      for (const { firstName, lastName, tag } of tagged) {
        const card = page.getByRole('link').filter({
          has: page.getByRole('img', {
            name: `${firstName} ${lastName}`,
            exact: true,
          }),
        });
        await expect(card.getByText(tag!, { exact: true })).toBeVisible();
      }
    });

    test(`shows Marc Philipp on the about page for ${locale}`, async ({
      page,
    }) => {
      await page.goto(localePath(locale, 'about'));

      const marcCard = page
        .getByRole('link', { name: /Marc Philipp/i })
        .first();
      await expect(marcCard).toBeVisible();

      await marcCard.click();

      await expect(page).toHaveURL(
        locale === 'de' ? /\/de\/employees\/marc$/ : /\/employees\/marc$/,
      );
      await expect(
        page.getByRole('heading', { name: 'Marc Philipp' }),
      ).toBeVisible();
    });
  }
});
