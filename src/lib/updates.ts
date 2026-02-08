import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Update, UpdateSection } from '@/types/updates';

const updatesDirectory = path.join(process.cwd(), 'content/updates');

interface RawSection {
  title: string;
  content: string;
  metadata: {
    icon?: 'red' | 'green' | 'purple' | 'star';
    collapsible?: boolean;
    special?: boolean;
  };
}

/**
 * Parse markdown content into sections
 */
function parseMarkdownSections(content: string): {
  overview?: string[];
  sections: UpdateSection[];
} {
  const lines = content.split('\n');
  const overview: string[] = [];
  const rawSections: RawSection[] = [];
  let currentSection: RawSection | null = null;
  let isOverview = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for h2 heading (## Title)
    if (line.startsWith('## ')) {
      // Save previous section
      if (currentSection) {
        rawSections.push(currentSection);
      }

      const title = line.substring(3).trim();
      isOverview = title.toLowerCase() === 'overview' || title.toLowerCase() === 'überblick';

      if (!isOverview) {
        // Start new section
        currentSection = {
          title,
          content: '',
          metadata: {},
        };
      }
      continue;
    }

    // Check for HTML comments with metadata
    if (line.trim().startsWith('<!--') && line.trim().endsWith('-->')) {
      const comment = line.trim().slice(4, -3).trim();
      if (currentSection) {
        // Parse metadata from comment
        const parts = comment.split(',').map((p) => p.trim());
        parts.forEach((part) => {
          if (!currentSection) return;
          if (part === 'collapsible') {
            currentSection.metadata.collapsible = true;
          } else if (part === 'special') {
            currentSection.metadata.special = true;
          } else if (part.startsWith('icon:')) {
            const icon = part.split(':')[1].trim() as any;
            currentSection.metadata.icon = icon;
          }
        });
      }
      continue;
    }

    // Add content to current section or overview
    if (isOverview && line.trim()) {
      overview.push(line.trim());
    } else if (currentSection) {
      currentSection.content += line + '\n';
    }
  }

  // Don't forget the last section
  if (currentSection) {
    rawSections.push(currentSection);
  }

  // Convert raw sections to UpdateSection format
  const sections: UpdateSection[] = rawSections.map((rawSection) => {
    // Parse list items from content
    const items = rawSection.content
      .split('\n')
      .filter((line) => line.trim().startsWith('-'))
      .map((line) => ({
        text: line.trim().substring(1).trim(),
      }));

    const section: UpdateSection = {
      title: rawSection.title,
      items,
    };

    if (rawSection.metadata.icon) {
      section.icon = rawSection.metadata.icon;
    }

    if (rawSection.metadata.collapsible) {
      section.collapsible = true;
    }

    return section;
  });

  return {
    overview: overview.length > 0 ? overview : undefined,
    sections,
  };
}

/**
 * Get all update files for a specific locale
 */
export function getUpdateFiles(locale: string): string[] {
  if (!fs.existsSync(updatesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(updatesDirectory);
  return files
    .filter((file) => file.endsWith(`.${locale}.md`))
    .sort()
    .reverse(); // Most recent first
}

/**
 * Parse a single update file
 */
export function parseUpdateFile(filename: string, locale: string): Update | null {
  const fullPath = path.join(updatesDirectory, filename);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const { overview, sections } = parseMarkdownSections(content);

  const update: Update = {
    version: data.version,
    date: data.date,
    month: data.month,
    isLatest: data.isLatest || false,
    sections,
  };

  if (overview) {
    update.overview = overview;
  }

  if (data.assets) {
    update.assets = data.assets;
  }

  if (data.tags) {
    update.tags = data.tags;
  }

  if (data.contributors) {
    update.contributors = data.contributors;
  }

  if (data.contributorNote) {
    update.contributorNote = data.contributorNote;
  }

  return update;
}

/**
 * Get all updates for a specific locale
 */
export function getAllUpdates(locale: string): Update[] {
  const files = getUpdateFiles(locale);
  const updates: Update[] = [];

  for (const filename of files) {
    const update = parseUpdateFile(filename, locale);
    if (update) {
      updates.push(update);
    }
  }

  return updates;
}

/**
 * Get a single update by version
 */
export function getUpdateByVersion(version: string, locale: string): Update | null {
  const filename = `${version}.${locale}.md`;
  return parseUpdateFile(filename, locale);
}
