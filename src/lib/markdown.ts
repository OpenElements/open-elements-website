import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { remarkHugoShortcodes } from './remark-hugo-shortcodes';

// Path to the posts directory
const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  categories: string[];
  preview_image: string;
  outdated?: boolean;
  showInBlog?: boolean;
}

export interface PostData {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  contentHtml?: string;
}

const INTERNAL_HOSTNAMES = new Set([
  'open-elements.com',
  'www.open-elements.com',
  'localhost',
  '127.0.0.1',
  '::1',
]);

const EXTERNAL_LINK_ICON_HTML =
  '<span class="iconify inline" data-icon="mdi-open-in-new" aria-hidden="true"></span>';

/**
 * Get the filename for a post based on locale
 * The content uses locale suffixes like:
 * - English: `2025-01-16-post-name.md` (no suffix)
 * - German: `2025-01-16-post-name.de.md` (.de suffix)
 */
function getPostFilename(slug: string, locale: string): string | null {
  const files = fs.readdirSync(postsDirectory);

  // For non-default locale (e.g., German), look for files with locale suffix
  if (locale !== 'en') {
    // Try to find a file with the locale suffix
    const localeFile = files.find(file => {
      const withoutExt = file.replace(/\.md$/, '');
      return (
        withoutExt.endsWith(`.${locale}`) &&
        withoutExt.replace(`.${locale}`, '').endsWith(slug)
      );
    });

    if (localeFile) return localeFile;

    // Also check if the slug itself matches
    const directMatch = files.find(file => {
      const withoutLocaleExt = file.replace(`.${locale}.md`, '');
      return withoutLocaleExt === slug || file === `${slug}.${locale}.md`;
    });

    if (directMatch) return directMatch;
  }

  // For English, look for files without locale suffix
  if (locale === 'en') {
    const englishFile = files.find(file => {
      if (file.endsWith('.de.md')) return false; // Skip German files
      const withoutExt = file.replace(/\.md$/, '');
      return withoutExt.endsWith(slug) || withoutExt === slug;
    });

    return englishFile || null;
  }

  return null;
}

/**
 * Extract slug from filename
 */
function extractSlugFromFilename(filename: string, locale: string): string {
  if (locale !== 'en' && filename.endsWith(`.${locale}.md`)) {
    // Remove locale suffix and .md extension
    return filename.replace(`.${locale}.md`, '');
  }
  // Remove .md extension
  return filename.replace(/\.md$/, '');
}

function isInternalHostname(hostname: string): boolean {
  const normalizedHostname = hostname.toLowerCase();
  return (
    INTERNAL_HOSTNAMES.has(normalizedHostname) ||
    normalizedHostname.endsWith('.open-elements.com')
  );
}

function isExternalContentLink(href: string): boolean {
  const normalizedHref = href.trim();

  if (
    !normalizedHref ||
    normalizedHref.startsWith('/') ||
    normalizedHref.startsWith('#') ||
    normalizedHref.startsWith('mailto:') ||
    normalizedHref.startsWith('tel:')
  ) {
    return false;
  }

  try {
    const url = new URL(normalizedHref, 'https://open-elements.com');
    return !isInternalHostname(url.hostname);
  } catch {
    return false;
  }
}

function ensureBlankTarget(attributes: string): string {
  if (/\btarget\s*=/i.test(attributes)) {
    return attributes.replace(/\btarget\s*=\s*(["']).*?\1/i, 'target="_blank"');
  }

  return `${attributes} target="_blank"`;
}

function ensureSafeRel(attributes: string): string {
  const relPattern = /\brel\s*=\s*(["'])(.*?)\1/i;

  if (relPattern.test(attributes)) {
    return attributes.replace(relPattern, (_match, quote: string, relValue: string) => {
      const tokens = new Set(relValue.split(/\s+/).filter(Boolean));
      tokens.add('noopener');
      tokens.add('noreferrer');
      return `rel=${quote}${Array.from(tokens).join(' ')}${quote}`;
    });
  }

  return `${attributes} rel="noopener noreferrer"`;
}

function addExternalLinkIcon(linkContent: string): string {
  if (/data-icon\s*=\s*(["'])mdi-open-in-new\1/i.test(linkContent)) {
    return linkContent;
  }

  return `${linkContent}${EXTERNAL_LINK_ICON_HTML}`;
}

function decorateExternalLinks(contentHtml: string): string {
  return contentHtml.replace(
    /<a\b([^>]*?)href=(["'])(.*?)\2([^>]*)>([\s\S]*?)<\/a>/gi,
    (
      fullMatch,
      attributesBeforeHref: string,
      quote: string,
      href: string,
      attributesAfterHref: string,
      linkContent: string,
    ) => {
      if (!isExternalContentLink(href)) {
        return fullMatch;
      }

      let attributes = `${attributesBeforeHref}href=${quote}${href}${quote}${attributesAfterHref}`;
      attributes = ensureBlankTarget(attributes);
      attributes = ensureSafeRel(attributes);

      return `<a${attributes}>${addExternalLinkIcon(linkContent)}</a>`;
    },
  );
}

/**
 * Get all posts for a specific locale
 */
export function getAllPosts(locale: string): PostData[] {
  const files = fs.readdirSync(postsDirectory);

  const posts: PostData[] = [];

  for (const filename of files) {
    // Skip non-markdown files
    if (!filename.endsWith('.md')) continue;

    // Determine which posts to include based on locale
    const isLocaleFile = filename.endsWith(`.${locale}.md`);
    const isDefaultFile = !filename.includes('.de.md'); // No locale suffix = English

    // For German locale, prefer .de.md files
    if (locale === 'de') {
      if (!isLocaleFile) continue; // Skip non-German files for German locale list
    } else {
      // For English, skip locale-specific files
      if (!isDefaultFile) continue;
    }

    const slug = extractSlugFromFilename(filename, locale);
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as PostFrontmatter;

    posts.push({
      slug,
      frontmatter,
      content,
    });
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}

/**
 * Get all post slugs for all locales (used in generateStaticParams)
 */
export function getAllPostSlugs(): Array<{ locale: string; slug: string }> {
  const files = fs.readdirSync(postsDirectory);
  const slugs: Array<{ locale: string; slug: string }> = [];

  for (const filename of files) {
    if (!filename.endsWith('.md')) continue;

    // Parse file to check if it should be shown
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    // Skip hidden posts
    if (frontmatter.showInBlog === false || frontmatter.outdated === true) {
      continue;
    }

    if (filename.endsWith('.de.md')) {
      // German post
      const slug = filename.replace('.de.md', '');
      slugs.push({ locale: 'de', slug });
    } else {
      // English post
      const slug = filename.replace('.md', '');
      slugs.push({ locale: 'en', slug });
    }
  }

  return slugs;
}

/**
 * Get a single post by slug and locale
 */
export async function getPostBySlug(
  slug: string,
  locale: string,
): Promise<PostData | null> {
  try {
    const filename = getPostFilename(slug, locale);

    if (!filename) {
      return null;
    }

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkHugoShortcodes)
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = decorateExternalLinks(processedContent.toString());

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error fetching post ${slug} for locale ${locale}:`, error);
    return null;
  }
}

/**
 * Check if a post exists for a given locale
 */
export function postExistsForLocale(slug: string, locale: string): boolean {
  return getPostFilename(slug, locale) !== null;
}
