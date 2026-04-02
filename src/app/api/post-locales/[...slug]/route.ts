import { NextResponse } from 'next/server';
import { getPostLocaleAlternates } from '@/lib/markdown';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const slugPath = slug.join('/');

  // Get the current locale from the query string
  const { searchParams } = new URL(request.url);
  const currentLocale = searchParams.get('locale') || 'en';

  // Find all locale versions of this post by filename pairing
  const alternates = getPostLocaleAlternates(slugPath, currentLocale);

  return NextResponse.json({
    slug: slugPath,
    alternates,
  });
}
