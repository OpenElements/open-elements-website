# Adding New Pages to the Open Elements Website

This guide explains how to add new pages to the Open Elements website, using the [dlt-lecture](https://open-elements.com/dlt-lecture/) page as a reference example.

## Overview

The Open Elements website uses a hybrid architecture:
- **Next.js** for page rendering and routing (`src/app/[locale]/`)
- **Markdown files** for content (`content/`)
- **i18n support** for English (EN) and German (DE) versions

## Step-by-Step Guide

### 1. Create Content Markdown Files

Create a new folder under `content/` with your page name:

```
content/
  your-page-name/
    index.md         # English version
    index.de.md      # German version
```

#### English Content (`index.md`)

```markdown
---
title: "Your Page Title"
description: "Brief description for SEO and meta tags"
layout: "article"
url: "/your-page-name"
keywords: ["keyword1", "keyword2", "keyword3"]
---

Your page content here in Markdown format...

## Section Heading

Content for this section...

### Subsection

More content...
```

#### German Content (`index.de.md`)

```markdown
---
title: "Ihr Seitentitel"
description: "Kurze Beschreibung für SEO und Meta-Tags"
layout: "article"
url: "/de/your-page-name"
keywords: ["Schlüsselwort1", "Schlüsselwort2"]
---

Ihr Seiteninhalt hier im Markdown-Format...

## Abschnittsüberschrift

Inhalt für diesen Abschnitt...
```

### 2. Frontmatter Fields Explained

| Field | Required | Description | Example Values |
|-------|----------|-------------|----------------|
| `title` | Yes | Page title (appears in browser tab and meta tags) | "DLT & Digital Trust Lecture" |
| `description` | Yes | Page description for SEO and social sharing | "Since 2023 Hendrik Ebbers has been offering..." |
| `layout` | Yes | Layout template to use | `"article"`, `"single"`, `"contact"`, `"about-us"` |
| `url` | Yes | URL path for the page (EN: `/page-name`, DE: `/de/page-name`) | `/dlt-lecture` or `/de/dlt-lecture` |
| `keywords` | No | SEO keywords | `["Java", "Open Source", "Support"]` |
| `aliases` | No | Alternative URLs that redirect to this page | `['/old-url', '/another-old-url']` |
| `newsletterPopup` | No | Whether to show newsletter popup | `true` or `false` |

### 3. Available Layout Types

Choose the appropriate layout for your page:

- **`article`** - Standard article/content layout (most common)
  - Used by: dlt-lecture, impressum, newsletter-archive
  - Best for: Text-heavy content pages, documentation

- **`single`** - Simple single-column layout
  - Used by: support-care-landingpage, support-care-temurin
  - Best for: Landing pages, promotional content

- **`contact`** - Contact form layout
  - Used by: contact page
  - Best for: Contact forms

- **`about-us`** - Special layout for about pages
  - Used by: about page
  - Best for: Team/company information

- **`about-hendrik`** - Custom layout for founder page
  - Used by: about-hendrik page

- **`newsletter`** - Newsletter subscription layout
  - Used by: newsletter page

- **`index`** - Homepage layout
  - Used by: _index.md (homepage only)

### 4. Create Next.js Page Component

Create a new folder under `src/app/[locale]/` matching your content folder name:

```
src/app/[locale]/
  your-page-name/
    page.tsx
```

#### Minimal Page Component Template

```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface YourPageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: YourPageProps): Promise<Metadata> {
  const { locale } = await params

  const title = locale === 'de' 
    ? 'Ihr Seitentitel - Open Elements'
    : 'Your Page Title - Open Elements'
  
  const description = locale === 'de'
    ? 'Beschreibung auf Deutsch'
    : 'Description in English'

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'Open Elements',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
  }
}

export default async function YourPage({ params }: YourPageProps) {
  const { locale } = await params

  return (
    <div>
      {/* Hero Section */}
      <div className="absolute left-0 w-full top-0 h-48 -z-10 overflow-hidden">
        {/* Background image or styling */}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {locale === 'de' ? 'Ihr Seitentitel' : 'Your Page Title'}
        </h1>
        
        <div className="prose max-w-none">
          {/* Page content */}
        </div>
      </div>
    </div>
  )
}
```

#### Notes on Page Components:
- Use the `locale` parameter to render different content for EN/DE
- Use `notFound()` if a locale isn't supported: `if (locale !== 'de') { notFound() }`
- Import and use shared components from `src/components/`
- Follow existing pages for styling patterns (Tailwind CSS)

### 5. Adding Images

#### Image Storage Locations

Store images in appropriate subdirectories under `public/`:

```
public/
  images/           # General site images (logos, team photos, etc.)
  illustrations/    # Illustrations and graphics
  posts/            # Blog post images
  your-page-name/   # Page-specific images (create new folder)
```

#### Recommended Structure for Page-Specific Images

For a page like `dlt-lecture`, create:

```
public/
  dlt-lecture/
    hero-image.jpg
    diagram-1.png
    photo-classroom.jpg
```

#### Referencing Images in Markdown

##### Hugo Shortcodes (in content markdown):

```markdown
{{< centered-image src="/illustrations/my-image.svg" alt="Description" width="80%" >}}

{{< centered-image src="/your-page-name/specific-image.png" showCaption="true" alt="Image caption" width="60%" >}}
```

**Note:** Image paths are relative to the `public/` folder. Do NOT include `public/` in the path.

##### Next.js Image Component (in page.tsx):

```tsx
import Image from 'next/image'

<Image
  src="/images/logo.svg"
  alt="Company logo"
  width={200}
  height={100}
  className="..."
/>

{/* For full-width background images */}
<div className="relative w-full h-64">
  <Image
    src="/illustrations/hero-bg.svg"
    alt="Hero background"
    fill
    className="object-cover"
    priority
  />
</div>
```

#### Image Best Practices

1. **Naming**: Use lowercase, hyphenated names: `team-photo.jpg`, `process-diagram.svg`
2. **Formats**: 
   - Use `.svg` for logos and simple graphics
   - Use `.webp` or `.jpg` for photos
   - Use `.png` for images requiring transparency
3. **Optimization**: Compress images before adding them (use tools like TinyPNG)
4. **Alt Text**: Always provide descriptive alt text for accessibility
5. **Dimensions**: Specify width/height to prevent layout shift

### 6. Linking Between Pages

#### In Markdown Files:

```markdown
[Link to another page](/about)
[Link to German page](/de/contact)
[External link](https://example.com)
```

#### In Next.js Components:

```tsx
import Link from 'next/link'

<Link href="/about" className="...">
  About Us
</Link>

<Link href={`/${locale}/contact`}>
  Contact
</Link>
```

### 7. Using Hugo Shortcodes in Markdown

The content markdown files support Hugo shortcodes:

```markdown
{{< centered-image src="/path/to/image.png" alt="Description" width="80%" >}}

{{< quote id="person-name">}}
```

See existing content files for more shortcode examples.

### 8. Testing Your New Page

1. **Start the development server:**
   ```bash
   pnpm run dev
   ```

2. **Navigate to your page:**
   - English: `http://localhost:3000/your-page-name`
   - German: `http://localhost:3000/de/your-page-name`

3. **Test both language versions**

4. **Check responsive design** on mobile and desktop

5. **Verify images load correctly**

6. **Test navigation** to and from your page

### 9. Checklist Before Publishing

- [ ] Both `index.md` and `index.de.md` created with correct frontmatter
- [ ] Next.js `page.tsx` component created with locale support
- [ ] All images added to `public/` with appropriate naming
- [ ] Image paths are correct (relative to `public/` folder)
- [ ] All links work correctly
- [ ] SEO metadata (title, description, keywords) filled out
- [ ] Both EN and DE versions display correctly
- [ ] Page is responsive on mobile and desktop
- [ ] Accessibility: alt text on all images
- [ ] No console errors when viewing the page

## Common Patterns and Examples

### Example 1: Simple Article Page

**Content structure:**
```
content/my-article/
  index.md
  index.de.md
  
public/my-article/
  hero.jpg
  diagram.svg
```

**Markdown frontmatter:**
```yaml
---
title: "My Article Title"
description: "Article description"
layout: "article"
url: "/my-article"
---
```

### Example 2: Multi-language Landing Page

```
content/support-program/
  index.md          # English version
  index.de.md       # German version
  
src/app/[locale]/support-program/
  page.tsx          # Handles both locales
  
public/support-program/
  logo.svg
  screenshot.png
```

### Example 3: Page with Multiple Sections

```markdown
---
title: "Complex Page"
description: "A page with multiple sections"
layout: "single"
url: "/complex-page"
---

## Section 1

Content for section 1...

{{< centered-image src="/complex-page/section1-image.jpg" alt="Section 1" width="100%" >}}

## Section 2

Content for section 2...

### Subsection 2.1

More detailed content...
```

## Troubleshooting

### Page not found (404)
- Check that the URL in frontmatter matches the folder structure
- Verify the Next.js component is in the correct location
- Ensure the locale routing is set up correctly

### Images not displaying
- Verify the image path is relative to `public/` without including "public" in the path
- Check that the image file exists in the correct location
- Verify file name capitalization matches exactly

### Content not updating
- Restart the development server: `pnpm run dev`
- Clear Next.js cache: `rm -rf .next` then restart
- Check for typos in frontmatter YAML

### Layout not working as expected
- Verify the layout value matches one of the available layouts
- Check if the layout requires specific frontmatter fields
- Look at similar pages for reference

## Further Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Markdown Guide**: https://www.markdownguide.org/
- **Project README**: See [README.md](README.md) for development setup

## Need Help?

If you encounter issues not covered in this guide:
1. Check existing pages in `content/` and `src/app/[locale]/` for reference
2. Review the project [README.md](README.md)
3. Ask the development team for guidance
