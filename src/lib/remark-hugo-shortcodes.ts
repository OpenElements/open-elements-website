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
      
      const imageHtml = `<img src="${src}" alt="${alt}" style="max-width: ${width}; height: auto; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);" />`;
      const captionHtml = showCaption && alt ? `<p style="text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">${alt}</p>` : '';
      
      return `<div style="text-align: center; margin: 2rem 0;">${imageHtml}${captionHtml}</div>`;
    });

    // Relative reference shortcode
    this.register('relref', (attrs) => {
      // Extract path from first attribute or 'path' key
      const path = attrs._content || attrs.path || '';
      return `/${path.replace(/^\/+/, '')}`;
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

/**
 * Parser for Hugo shortcodes
 */
class ShortcodeParser {
  private static readonly SHORTCODE_PATTERN = /\{\{<\s*([a-z-]+)\s+([^>]*?)\s*>\}\}/g;
  private static readonly ATTRIBUTE_PATTERN = /(\w+)="([^"]*)"|"([^"]*)"/g;

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
      if (match[1] && match[2] !== undefined) {
        // Named attribute: key="value"
        attrs[match[1]] = match[2];
      } else if (match[3] !== undefined) {
        // Unnamed attribute: "value"
        attrs[`_content${contentIndex > 0 ? contentIndex : ''}`] = match[3];
        if (contentIndex === 0) {
          attrs._content = match[3];
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

      const shortcodes = ShortcodeParser.parse(node.value);

      if (shortcodes.length === 0) {
        return;
      }

      // Process shortcodes and build replacement string
      let result = node.value;
      
      // Process in reverse order to maintain correct indices
      for (let i = shortcodes.length - 1; i >= 0; i--) {
        const shortcode = shortcodes[i];
        const handler = registry.getHandler(shortcode.name);

        if (handler) {
          const html = handler(shortcode.attributes);
          result = result.slice(0, shortcode.startIndex) + html + result.slice(shortcode.endIndex);
        }
      }

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
