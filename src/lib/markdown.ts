import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import { transformHugoShortcodes } from './remark-hugo-shortcodes';

// Path to the posts directory
const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  categories: string[];
  preview_image: string;
  slug?: string;
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
const HEADING_ANCHOR_ICON_HTML =
  '<span class="iconify w-7 h-7 shrink-0 text-lightgray inline" data-icon="mdi-link-variant" aria-hidden="true"></span>';
const CODE_BLOCK_PATTERN = /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/gi;
const PRISM_TOKEN_COLORS = new Map<string, string>([
  ['comment', '#75715e'],
  ['prolog', '#75715e'],
  ['doctype', '#75715e'],
  ['cdata', '#75715e'],
  ['punctuation', '#f92672'],
  ['operator', '#f92672'],
  ['tag', '#f92672'],
  ['deleted', '#f92672'],
  ['keyword', '#66d9ef'],
  ['class-name', '#a6e22e'],
  ['function', '#a6e22e'],
  ['function-variable', '#a6e22e'],
  ['method', '#a6e22e'],
  ['selector', '#a6e22e'],
  ['attr-name', '#a6e22e'],
  ['builtin', '#a6e22e'],
  ['property', '#a6e22e'],
  ['string', '#e6db74'],
  ['char', '#e6db74'],
  ['attr-value', '#e6db74'],
  ['regex', '#e6db74'],
  ['variable', '#e6db74'],
  ['number', '#ae81ff'],
  ['boolean', '#ae81ff'],
  ['constant', '#ae81ff'],
  ['symbol', '#ae81ff'],
  ['important', '#ae81ff'],
  ['entity', '#f8f8f2'],
  ['url', '#f8f8f2'],
  ['namespace', '#f8f8f2'],
]);

loadLanguages([
  'bash',
  'css',
  'docker',
  'html',
  'java',
  'javascript',
  'jsdoc',
  'json',
  'log',
  'markup',
  'shell-session',
  'typescript',
  'xml',
]);

Prism.hooks.add('wrap', (environment) => {
  const tokenClass = environment.classes.find(
    (className) => className !== 'token' && PRISM_TOKEN_COLORS.has(className),
  );

  if (!tokenClass) {
    return;
  }

  const color = PRISM_TOKEN_COLORS.get(tokenClass);

  if (!color) {
    return;
  }

  const existingStyle = environment.attributes.style;
  environment.attributes.style = existingStyle
    ? `${existingStyle};color:${color};`
    : `color:${color};`;
});

/**
 * Generate a URL-friendly slug from text.
 * Keeps locale-specific characters (e.g. umlauts) to match Hugo URLs.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate a post slug from frontmatter.
 * Uses the explicit `slug` property if defined, otherwise slugifies the title.
 */
function generatePostSlug(frontmatter: PostFrontmatter): string {
  if (frontmatter.slug) {
    return frontmatter.slug;
  }
  return slugify(frontmatter.title);
}

/**
 * Generate the full date-based post path from frontmatter.
 * Format: YYYY/MM/DD/slug-text
 */
function generatePostPath(frontmatter: PostFrontmatter): string {
  const date = new Date(frontmatter.date);
  const year = date.getUTCFullYear().toString();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const slug = generatePostSlug(frontmatter);
  return `${year}/${month}/${day}/${slug}`;
}

function normalizeLegacySlugSegment(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isDateBasedSlugMatch(candidatePath: string, requestedPath: string): boolean {
  if (candidatePath === requestedPath) {
    return true;
  }

  const candidateSegments = candidatePath.split('/');
  const requestedSegments = requestedPath.split('/');

  if (candidateSegments.length !== 4 || requestedSegments.length !== 4) {
    return false;
  }

  const candidateDatePrefix = candidateSegments.slice(0, 3).join('/');
  const requestedDatePrefix = requestedSegments.slice(0, 3).join('/');

  if (candidateDatePrefix !== requestedDatePrefix) {
    return false;
  }

  return normalizeLegacySlugSegment(candidateSegments[3]) === normalizeLegacySlugSegment(requestedSegments[3]);
}

function decodePathSegments(pathValue: string): string {
  return pathValue
    .split('/')
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .join('/');
}

/**
 * Find the filename for a post matching the given date-based slug path and locale.
 * slugPath format: "YYYY/MM/DD/slug-text"
 *
 * Each locale derives slugs from its own frontmatter, so EN and DE may have
 * different slug paths for the same post.
 */
function getPostFilename(slugPath: string, locale: string): string | null {
  const files = fs.readdirSync(postsDirectory);
  const decodedSlugPath = decodePathSegments(slugPath);

  // Legacy NextJS path format: "YYYY-MM-DD-post-slug" (filename base)
  if (!decodedSlugPath.includes('/')) {
    if (locale === 'de') {
      const deFilename = `${decodedSlugPath}.de.md`;
      return files.includes(deFilename) ? deFilename : null;
    }

    const enFilename = `${decodedSlugPath}.md`;
    if (files.includes(enFilename) && !enFilename.includes('.de.md')) {
      return enFilename;
    }
    return null;
  }

  for (const filename of files) {
    if (!filename.endsWith('.md')) continue;

    // Filter to the requested locale's files
    const isLocaleFile = filename.endsWith(`.${locale}.md`);
    const isDefaultFile = !filename.includes('.de.md');

    if (locale === 'de' && !isLocaleFile) continue;
    if (locale === 'en' && !isDefaultFile) continue;

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    if (isDateBasedSlugMatch(generatePostPath(data as PostFrontmatter), decodedSlugPath)) {
      return filename;
    }
  }

  return null;
}

/**
 * Get the base filename shared between EN and DE versions of a post.
 * e.g. "2026-02-10-review-2025.de.md" → "2026-02-10-review-2025"
 * e.g. "2026-02-10-review-2025.md" → "2026-02-10-review-2025"
 */
function getBaseFilename(filename: string): string {
  if (filename.endsWith('.de.md')) {
    return filename.replace('.de.md', '');
  }
  return filename.replace('.md', '');
}

/**
 * Given a slug path and the current locale, find all available locale versions
 * by filename pairing. Returns each locale's own slug path.
 */
export function getPostLocaleAlternates(
  slugPath: string,
  currentLocale: string,
): Array<{ locale: string; slugPath: string }> {
  const currentFile = getPostFilename(slugPath, currentLocale);
  if (!currentFile) return [];

  const base = getBaseFilename(currentFile);
  const files = fs.readdirSync(postsDirectory);
  const alternates: Array<{ locale: string; slugPath: string }> = [];

  // Check English version
  const enFile = `${base}.md`;
  if (files.includes(enFile)) {
    const fullPath = path.join(postsDirectory, enFile);
    const { data } = matter(fs.readFileSync(fullPath, 'utf8'));
    alternates.push({ locale: 'en', slugPath: generatePostPath(data as PostFrontmatter) });
  }

  // Check German version
  const deFile = `${base}.de.md`;
  if (files.includes(deFile)) {
    const fullPath = path.join(postsDirectory, deFile);
    const { data } = matter(fs.readFileSync(fullPath, 'utf8'));
    alternates.push({ locale: 'de', slugPath: generatePostPath(data as PostFrontmatter) });
  }

  return alternates;
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

const STANDALONE_IMAGE_STYLE =
  'display: block; max-width: 100%; height: auto; margin-left: auto; margin-right: auto;';

function applyStandaloneImageStyle(imageHtml: string): string {
  if (/\bstyle\s*=/i.test(imageHtml)) {
    return imageHtml.replace(
      /\bstyle\s*=\s*(["'])(.*?)\1/i,
      (_match, quote: string, styleValue: string) => {
        const normalizedStyle = styleValue.trim().replace(/;?\s*$/, ';');
        return `style=${quote}${normalizedStyle} ${STANDALONE_IMAGE_STYLE}${quote}`;
      },
    );
  }

  return imageHtml.replace('<img', `<img style="${STANDALONE_IMAGE_STYLE}"`);
}

function centerStandaloneHtmlImages(contentHtml: string): string {
  return contentHtml.replace(
    /(^|\n)\s*(<img\b[^>]*>)\s*(?=\n|$)/gi,
    (_match, prefix: string, imageHtml: string) =>
      `${prefix}<div style="text-align: center; margin: 2rem 0;">${applyStandaloneImageStyle(imageHtml)}</div>`,
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function decodeHtmlEntities(text: string): string {
  const namedEntities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  };

  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, value: string) => {
    const normalizedValue = value.toLowerCase();

    if (normalizedValue.startsWith('#x')) {
      const codePoint = Number.parseInt(normalizedValue.slice(2), 16);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    if (normalizedValue.startsWith('#')) {
      const codePoint = Number.parseInt(normalizedValue.slice(1), 10);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    return namedEntities[normalizedValue] ?? entity;
  });
}

function extractHeadingText(headingHtml: string): string {
  return decodeHtmlEntities(headingHtml.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function appendHtmlAttribute(attributes: string, attribute: string): string {
  const normalizedAttributes = attributes.trimEnd();
  return normalizedAttributes ? `${normalizedAttributes} ${attribute}` : ` ${attribute}`;
}

function ensureHtmlClass(attributes: string, className: string): string {
  const classPattern = /\bclass\s*=\s*(["'])(.*?)\1/i;

  if (classPattern.test(attributes)) {
    return attributes.replace(classPattern, (_match, quote: string, classValue: string) => {
      const classes = new Set(classValue.split(/\s+/).filter(Boolean));
      classes.add(className);
      return `class=${quote}${Array.from(classes).join(' ')}${quote}`;
    });
  }

  return appendHtmlAttribute(attributes, `class="${className}"`);
}

function createHeadingAnchorHtml(headingId: string): string {
  return `<a href="#${headingId}" class="inline ml-2" aria-label="Link to this section">${HEADING_ANCHOR_ICON_HTML}</a>`;
}

function decorateHeadlinesWithAnchors(contentHtml: string): string {
  const slugger = new GithubSlugger();

  return contentHtml.replace(
    /<h([2-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (fullMatch, level: string, attributes: string, headingContent: string) => {
      if (/data-icon\s*=\s*(["'])mdi-link-variant\1/i.test(headingContent)) {
        return fullMatch;
      }

      const headingText = extractHeadingText(headingContent);
      if (!headingText) {
        return fullMatch;
      }

      const existingIdMatch = attributes.match(/\bid\s*=\s*(["'])(.*?)\1/i);
      const headingId = existingIdMatch?.[2] || slugger.slug(headingText);

      let nextAttributes = attributes;
      if (!existingIdMatch) {
        nextAttributes = appendHtmlAttribute(nextAttributes, `id="${headingId}"`);
      }
      nextAttributes = ensureHtmlClass(nextAttributes, 'scroll-mt-10');

      return `<h${level}${nextAttributes}>${headingContent}${createHeadingAnchorHtml(headingId)}</h${level}>`;
    },
  );
}

function normalizeCodeLanguage(language: string): string | null {
  const normalizedLanguage = language.trim().toLowerCase();

  if (!normalizedLanguage) {
    return null;
  }

  const aliases: Array<[string, string | null]> = [
    ['bash', 'bash'],
    ['sh', 'bash'],
    ['shell', 'bash'],
    ['shell-session', 'shell-session'],
    ['css', 'css'],
    ['docker', 'docker'],
    ['html', 'markup'],
    ['java', 'java'],
    ['javascript', 'javascript'],
    ['js', 'javascript'],
    ['json', 'json'],
    ['log', 'log'],
    ['text', null],
    ['txt', null],
    ['plaintext', null],
    ['typescript', 'typescript'],
    ['ts', 'typescript'],
    ['xml', 'markup'],
  ];

  for (const [prefix, mappedLanguage] of aliases) {
    if (normalizedLanguage === prefix || normalizedLanguage.startsWith(prefix)) {
      return mappedLanguage;
    }
  }

  return normalizedLanguage in Prism.languages ? normalizedLanguage : null;
}

function highlightCode(language: string, code: string): string {
  const normalizedLanguage = normalizeCodeLanguage(language);

  if (!normalizedLanguage) {
    return escapeHtml(code);
  }

  const grammar = Prism.languages[normalizedLanguage];

  if (!grammar) {
    return escapeHtml(code);
  }

  return Prism.highlight(code, grammar, normalizedLanguage);
}

function highlightCodeBlocks(contentHtml: string): string {
  return contentHtml.replace(
    CODE_BLOCK_PATTERN,
    (_fullMatch, language: string, encodedCode: string) => {
      const decodedCode = decodeHtmlEntities(encodedCode);
      const highlightedCode = highlightCode(language, decodedCode);

      return [
        '<div class="highlight">',
        `<pre tabindex="0" class="language-${language}" style="color:#f8f8f2;background-color:#272822;-moz-tab-size:4;-o-tab-size:4;tab-size:4;">`,
        `<code class="language-${language}" data-lang="${language}">${highlightedCode}</code>`,
        '</pre>',
        '</div>',
      ].join('');
    },
  );
}

/**
 * Get all posts for a specific locale.
 * By default, posts with showInBlog === false are excluded (for the blog listing UI).
 * Pass includeHidden = true to include all posts (e.g. for sitemap generation).
 */
export function getAllPosts(locale: string, { includeHidden = false }: { includeHidden?: boolean } = {}): PostData[] {
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

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as PostFrontmatter;

    // Skip posts not meant for the blog listing unless includeHidden is true
    if (!includeHidden && frontmatter.showInBlog === false) {
      continue;
    }

    const slug = generatePostPath(frontmatter);

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
 * Returns slug as a string array for catch-all routing: ['YYYY', 'MM', 'DD', 'slug-text']
 */
export function getAllPostSlugs(): Array<{ locale: string; slug: string[] }> {
  const files = fs.readdirSync(postsDirectory);
  const slugs: Array<{ locale: string; slug: string[] }> = [];

  for (const filename of files) {
    if (!filename.endsWith('.md')) continue;

    // Parse file to check if it should be shown
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    const postPath = generatePostPath(frontmatter);
    const slugSegments = postPath.split('/');
    const legacyBaseSlug = filename.endsWith('.de.md')
      ? filename.replace('.de.md', '')
      : filename.replace('.md', '');
    const legacySlugSegments = [legacyBaseSlug];

    if (filename.endsWith('.de.md')) {
      slugs.push({ locale: 'de', slug: slugSegments });
      slugs.push({ locale: 'de', slug: legacySlugSegments });
    } else {
      slugs.push({ locale: 'en', slug: slugSegments });
      slugs.push({ locale: 'en', slug: legacySlugSegments });
    }
  }

  return slugs;
}

/**
 * Get a single post by slug path and locale.
 * slugPath can be a joined path like "2026/03/26/slug-text" or segments joined with "/".
 */
export async function getPostBySlug(
  slugPath: string,
  locale: string,
): Promise<PostData | null> {
  try {
    const filename = getPostFilename(slugPath, locale);

    if (!filename) {
      return null;
    }

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const transformedContent = transformHugoShortcodes(content);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(transformedContent);
    const contentHtml = highlightCodeBlocks(
      decorateHeadlinesWithAnchors(
        decorateExternalLinks(centerStandaloneHtmlImages(processedContent.toString())),
      ),
    );

    return {
      slug: slugPath,
      frontmatter: data as PostFrontmatter,
      content,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error fetching post ${slugPath} for locale ${locale}:`, error);
    return null;
  }
}

/**
 * Check if a post exists for a given locale.
 * slugPath format: "YYYY/MM/DD/slug-text"
 */
export function postExistsForLocale(slugPath: string, locale: string): boolean {
  return getPostFilename(slugPath, locale) !== null;
}
