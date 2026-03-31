import { NextResponse } from 'next/server';
import { postExistsForLocale } from '@/lib/markdown';

const supportedLocales = ['en', 'de'] as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const slugPath = slug.join('/');

  const availableLocales = supportedLocales.filter((locale) =>
    postExistsForLocale(slugPath, locale),
  );

  return NextResponse.json({
    slug: slugPath,
    availableLocales,
  });
}
