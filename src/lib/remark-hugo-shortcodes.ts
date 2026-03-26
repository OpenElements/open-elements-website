import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Text, Parent, Html } from 'mdast';

/**
 * Attributes for Hugo shortcodes
 */
interface ShortcodeAttributes {
  [key: string]: string;
}

/**
 * Parsed Hugo shortcode
 */
interface ParsedShortcode {
  name: string;
  attributes: ShortcodeAttributes;
  rawContent: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Shortcode handler function type
 */
type ShortcodeHandler = (attrs: ShortcodeAttributes) => string;

/**
 * Registry of shortcode handlers
 */
class ShortcodeRegistry {
  private handlers: Map<string, ShortcodeHandler>;

  constructor() {
    this.handlers = new Map();
    this.registerDefaultHandlers();
  }

  /**
   * Register a shortcode handler
   */
  register(name: string, handler: ShortcodeHandler): void {
    this.handlers.set(name, handler);
  }

  /**
   * Get handler for a shortcode
   */
  getHandler(name: string): ShortcodeHandler | undefined {
    return this.handlers.get(name);
  }

  /**
   * Register default shortcode handlers
   */
  private registerDefaultHandlers(): void {
    // Centered image shortcode
    this.register('centered-image', (attrs) => {
      const src = attrs.src || '';
      const alt = this.escapeHtml(attrs.alt || '');
      const width = attrs.width || '100%';
      const showCaption = attrs.showCaption !== 'false';
      
      const imageHtml = `<img src="${src}" alt="${alt}" style="max-width: ${width}; height: auto; border-radius: 0.75rem;" />`;
      const captionHtml = showCaption && alt ? `<p style="text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">${alt}</p>` : '';
      
      return `<div style="text-align: center; margin: 2rem 0;">${imageHtml}${captionHtml}</div>`;
    });

    // Relative reference shortcode
    this.register('relref', (attrs) => {
      // Extract path from first attribute or 'path' key
      const path = attrs._content || attrs.path || '';
      return `/${path.replace(/^\/+/, '')}`;
    });

    this.register('ref', (attrs) => {
      const path = attrs._content || attrs.path || '';
      return `/${path.replace(/^\/+/, '')}`;
    });

    this.register('youtube', (attrs) => {
      const videoId = this.escapeHtml(attrs._content || attrs.id || '');

      if (!videoId) {
        return '';
      }

      return [
        '<div style="text-align: center; display: block; margin-left: auto; margin-right: auto; margin-top: 0em; margin-bottom: 2em; width: 100%; max-width: 100%">',
        '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; display: flex;">',
        `    <iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen="" title="YouTube Video"></iframe>`,
        '</div>',
        '</div>',
      ].join('');
    });
  }

  /**
   * Escape HTML special characters
   */
  private escapeHtml(text: string): string {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return text.replace(/[&<>"']/g, (char) => escapeMap[char] || char);
  }
}

function replaceShortcodes(text: string, registry: ShortcodeRegistry): string {
  const shortcodes = ShortcodeParser.parse(text);

  if (shortcodes.length === 0) {
    return text;
  }

  let result = text;

  // Process in reverse order to maintain correct indices
  for (let i = shortcodes.length - 1; i >= 0; i--) {
    const shortcode = shortcodes[i];
    const handler = registry.getHandler(shortcode.name);

    if (handler) {
      const replacement = handler(shortcode.attributes);
      result = result.slice(0, shortcode.startIndex) + replacement + result.slice(shortcode.endIndex);
    }
  }

  return result;
}

export function transformHugoShortcodes(text: string): string {
  return replaceShortcodes(text, new ShortcodeRegistry());
}

/**
 * Parser for Hugo shortcodes
 */
class ShortcodeParser {
  private static readonly SHORTCODE_PATTERN = /\{\{<\s*([a-z-]+)\s+([^>]*?)\s*>\}\}/g;
  private static readonly ATTRIBUTE_PATTERN = /(\w+)=(?:"([^"]*)"|([^\s"]+))|"([^"]*)"|([^\s"]+)/g;

  /**
   * Parse all shortcodes in a text string
   */
  static parse(text: string): ParsedShortcode[] {
    const shortcodes: ParsedShortcode[] = [];
    let match: RegExpExecArray | null;

    // Reset regex state
    this.SHORTCODE_PATTERN.lastIndex = 0;

    while ((match = this.SHORTCODE_PATTERN.exec(text)) !== null) {
      const name = match[1];
      const attributeString = match[2];
      const attributes = this.parseAttributes(attributeString);

      shortcodes.push({
        name,
        attributes,
        rawContent: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
      });
    }

    return shortcodes;
  }

  /**
   * Parse attribute string into key-value pairs
   */
  private static parseAttributes(attrString: string): ShortcodeAttributes {
    const attrs: ShortcodeAttributes = {};
    let match: RegExpExecArray | null;
    let contentIndex = 0;

    // Reset regex state
    this.ATTRIBUTE_PATTERN.lastIndex = 0;

    while ((match = this.ATTRIBUTE_PATTERN.exec(attrString)) !== null) {
      if (match[1]) {
        // Named attribute: key="value" or key=value
        attrs[match[1]] = match[2] ?? match[3] ?? '';
        continue;
      }

      const unnamedValue = match[4] ?? match[5];

      if (unnamedValue !== undefined) {
        // Unnamed attribute: "value" or bareword
        attrs[`_content${contentIndex > 0 ? contentIndex : ''}`] = unnamedValue;
        if (contentIndex === 0) {
          attrs._content = unnamedValue;
        }
        contentIndex++;
      }
    }

    return attrs;
  }
}

/**
 * Remark plugin to transform Hugo shortcodes into HTML
 */
export const remarkHugoShortcodes: Plugin<[], Root> = () => {
  const registry = new ShortcodeRegistry();

  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!node.value || typeof index !== 'number' || !parent) {
        return;
      }

      const result = replaceShortcodes(node.value, registry);

      // Replace text node with HTML node if changes were made
      if (result !== node.value) {
        const htmlNode: Html = {
          type: 'html',
          value: result,
        };
        parent.children[index] = htmlNode;
      }
    });
  };
};
