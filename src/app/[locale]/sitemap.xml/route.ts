import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/markdown';
import { headers } from 'next/headers';

const staticRoutes = [
  '', // home
  'about',
  'contact',
  'impressum',
  'posts',
  'support-care',
  'support-care-maven',
  'updates',
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> | { locale: string } },
) {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;

  const localePrefix = locale === 'en' ? '/en' : `/${locale}`;
  const defaultLastmod = new Date().toISOString();
  const allUrls: Array<{ loc: string; lastmod: string }> = [];

  // Add static routes
  for (const route of staticRoutes) {
    const path = route ? `${localePrefix}/${route}` : localePrefix;
    allUrls.push({
      loc: `${baseUrl}${path}`,
      lastmod: defaultLastmod,
    });
  }

  // Add dynamic blog post routes
  const posts = getAllPosts(locale, { includeHidden: true });
  for (const post of posts) {
    let postDate = defaultLastmod;
    if (post.frontmatter.date) {
      try {
        postDate = new Date(post.frontmatter.date).toISOString();
      } catch (e) {}
    }
    allUrls.push({
      loc: `${baseUrl}${localePrefix}/posts/${post.slug}`,
      lastmod: postDate,
    });
  }

  const xmlUrls = allUrls
    .map(
      ({ loc, lastmod }) =>
        `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="utf-8" standalone="yes"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
