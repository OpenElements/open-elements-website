import { NextResponse } from 'next/server';
import { buildPostsRssFeed, rssResponseHeaders } from '@/lib/rss';

export const dynamic = 'force-static';

export function GET() {
  const xml = buildPostsRssFeed('/feed.xml');
  return new NextResponse(xml, {
    status: 200,
    headers: rssResponseHeaders(),
  });
}
