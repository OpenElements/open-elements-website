import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { renderMarkdownToHtml } from './markdown';

// Path to the standalone articles directory. Each article is a folder holding
// `index.md` (English) and optionally `index.de.md` (German).
const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleFrontmatter {
  title: string;
  description?: string;
  layout?: string;
}

export interface ArticleData {
  slug: string;
  frontmatter: ArticleFrontmatter;
  contentHtml: string;
}

function articleFilename(locale: string): string {
  return locale === 'de' ? 'index.de.md' : 'index.md';
}

/**
 * Resolve the markdown file backing an article for a locale.
 *
 * German falls back to the English file when no translation exists, matching
 * the behaviour of the generic content catch-all route so existing `/de/...`
 * links keep resolving instead of 404ing.
 */
function findArticleFile(slug: string, locale: string): string | null {
  // Guard against path traversal via the dynamic route segment.
  if (!/^[A-Za-z0-9._-]+$/.test(slug) || slug === '.' || slug === '..') {
    return null;
  }

  const localeFile = path.join(
    articlesDirectory,
    slug,
    articleFilename(locale),
  );
  if (fs.existsSync(localeFile)) return localeFile;

  const defaultFile = path.join(articlesDirectory, slug, 'index.md');
  if (fs.existsSync(defaultFile)) return defaultFile;

  return null;
}

function listArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) return [];

  return fs
    .readdirSync(articlesDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter(slug =>
      fs.existsSync(path.join(articlesDirectory, slug, 'index.md')),
    )
    .sort();
}

/**
 * Every (locale, slug) pair an article is *authored* in.
 *
 * Only locales with their own markdown file are returned, so an untranslated
 * article is not advertised (e.g. in the sitemap) under a German URL that
 * would serve English prose. The route itself still falls back to English.
 */
export function getAllArticleSlugs(): Array<{ locale: string; slug: string }> {
  const entries: Array<{ locale: string; slug: string }> = [];

  for (const slug of listArticleSlugs()) {
    entries.push({ locale: 'en', slug });

    if (fs.existsSync(path.join(articlesDirectory, slug, 'index.de.md'))) {
      entries.push({ locale: 'de', slug });
    }
  }

  return entries;
}

/**
 * Load and render a single article, or null when it does not exist.
 */
export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<ArticleData | null> {
  const articleFile = findArticleFile(slug, locale);

  if (!articleFile) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(articleFile, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as ArticleFrontmatter,
      contentHtml: await renderMarkdownToHtml(content),
    };
  } catch (error) {
    console.error(
      `Error fetching article ${slug} for locale ${locale}:`,
      error,
    );
    return null;
  }
}
