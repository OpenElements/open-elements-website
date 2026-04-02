import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import { transformHugoShortcodes } from '@/lib/remark-hugo-shortcodes';

type CatchAllPageProps = {
  params: Promise<{
    locale: string;
    rest: string[];
  }>;
};

const contentDirectory = path.join(process.cwd(), 'content');

const CONTENT_PATH_ALIASES: Record<string, string> = {
  'support-care-maven/status': 'support-care-maven-status',
};

const REDIRECTS_TO_POSTS = new Set(['articles', 'categories', 'tags']);

function localePrefix(locale: string): string {
  return locale === 'de' ? '/de' : '';
}

function maybeRedirectLegacyPath(locale: string, requestPath: string): string | null {
  const normalizedPath = requestPath.replace(/^\/+|\/+$/g, '');
  const prefix = localePrefix(locale);

  if (normalizedPath === 'about-support-care') {
    return `${prefix}/support-care`;
  }

  if (normalizedPath === 'employees') {
    return `${prefix}/about`;
  }

  if (REDIRECTS_TO_POSTS.has(normalizedPath) || normalizedPath.startsWith('categories/') || normalizedPath.startsWith('tags/')) {
    return `${prefix}/posts`;
  }

  return null;
}

function findMarkdownFile(locale: string, requestPath: string): string | null {
  const normalizedPath = requestPath.replace(/^\/+|\/+$/g, '');
  const mappedPath = CONTENT_PATH_ALIASES[normalizedPath] || normalizedPath;
  const deFile = path.join(contentDirectory, mappedPath, 'index.de.md');
  const enFile = path.join(contentDirectory, mappedPath, 'index.md');

  if (locale === 'de') {
    if (fs.existsSync(deFile)) return deFile;
    if (fs.existsSync(enFile)) return enFile;
    return null;
  }

  if (fs.existsSync(enFile)) return enFile;
  return null;
}

async function loadPageData(locale: string, requestPath: string): Promise<{ title: string; description?: string; contentHtml: string } | null> {
  const markdownFile = findMarkdownFile(locale, requestPath);

  if (!markdownFile) {
    return null;
  }

  const fileContents = fs.readFileSync(markdownFile, 'utf8');
  const { data, content } = matter(fileContents);
  const transformedContent = transformHugoShortcodes(content);
  const processedContent = await remark().use(remarkGfm).use(html, { sanitize: false }).process(transformedContent);

  return {
    title: typeof data.title === 'string' ? data.title : 'Open Elements',
    description: typeof data.description === 'string' ? data.description : undefined,
    contentHtml: processedContent.toString(),
  };
}

export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
  const { locale, rest } = await params;
  const requestPath = rest.join('/');

  if (maybeRedirectLegacyPath(locale, requestPath)) {
    return {
      title: 'Open Elements',
    };
  }

  const pageData = await loadPageData(locale, requestPath);

  if (!pageData) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${pageData.title} - Open Elements`,
    description: pageData.description,
  };
}

export default async function LocaleCatchAllPage({ params }: CatchAllPageProps) {
  const { locale, rest } = await params;
  const requestPath = rest.join('/');

  const redirectTarget = maybeRedirectLegacyPath(locale, requestPath);
  if (redirectTarget) {
    redirect(redirectTarget);
  }

  const pageData = await loadPageData(locale, requestPath);
  if (!pageData) {
    notFound();
  }

  return (
    <div className="container py-16 sm:py-24">
      <article className="prose prose-sm sm:prose-base text-blue max-w-4xl mx-auto prose-a:text-purple-700">
        <h1>{pageData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
      </article>
    </div>
  );
}
