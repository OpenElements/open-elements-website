import { getAllPosts } from './markdown';

const SITE_URL = 'https://open-elements.com';
const SITE_TITLE = 'Open Elements';
const SITE_DESCRIPTION = 'Open Source made right';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(dateInput: string | Date): string {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return new Date(0).toUTCString();
  }
  return date.toUTCString();
}

/**
 * Build an RSS 2.0 feed XML string for the posts of a given locale.
 * The `feedPath` is the absolute path at which this feed is served (used for the
 * atom self-link), e.g. "/feed.xml" or "/posts/index.xml".
 */
export function buildPostsRssFeed(feedPath: string, locale = 'en'): string {
  const posts = getAllPosts(locale);
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const channelLink = `${SITE_URL}${localePath}/posts`;
  const feedUrl = `${SITE_URL}${feedPath}`;
  const language = locale === 'de' ? 'de-de' : 'en-us';
  const lastBuildDate = posts.length
    ? toRfc822(posts[0].frontmatter.date)
    : new Date().toUTCString();

  const items = posts
    .map(post => {
      const url = `${SITE_URL}${localePath}/posts/${post.slug}`;
      const title = escapeXml(post.frontmatter.title ?? '');
      const description = escapeXml(post.frontmatter.excerpt ?? '');
      const pubDate = toRfc822(post.frontmatter.date);
      const author = escapeXml(post.frontmatter.author ?? 'Open Elements');
      return [
        '    <item>',
        `      <title>${title}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${description}</description>`,
        `      <dc:creator>${author}</dc:creator>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${escapeXml(SITE_TITLE)}</title>`,
    `    <link>${escapeXml(channelLink)}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    `    <language>${language}</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n');
}

export function rssResponseHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/rss+xml; charset=utf-8',
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  };
}
