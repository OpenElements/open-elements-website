import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const locales = routing.locales;
  const lastmod = new Date().toISOString();

  const sitemaps = locales
    .map(
      locale =>
        `<sitemap><loc>${baseUrl}/${locale}/sitemap.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="utf-8" standalone="yes"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
