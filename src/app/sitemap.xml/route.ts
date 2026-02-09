import { NextResponse } from 'next/server';
import { getAllPostSlugs } from '@/lib/markdown';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://open-elements.com';

const staticRoutes = [
  '',           // home
  'about',
  'contact',
  'impressum',
  'posts',
  'support-care',
  'support-care-maven',
  'updates'
];

function generateSitemap(): string {
  const locales = routing.locales;
  const allUrls: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      const path = route ? `${localePrefix}/${route}` : localePrefix;
      allUrls.push({
        loc: `${BASE_URL}${path}`,
        lastmod: new Date().toISOString(),
        changefreq: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? '1.0' : '0.8'
      });
    }
  }

  const postSlugs = getAllPostSlugs();
  for (const { locale, slug } of postSlugs) {
    const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    allUrls.push({
      loc: `${BASE_URL}${localePrefix}/posts/${slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.7'
    });
  }

  const xmlUrls = allUrls.map(({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap();
  
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
