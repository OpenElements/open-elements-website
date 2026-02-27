import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .map((slug) => {
      const fullPath = path.join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: slug.replace(/\.md$/, ''),
        frontmatter: data,
        content,
        fullPath,
      };
    })
    .filter((post) => post.frontmatter.showInBlog !== false)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  
  return posts;
}

function generateRSSFeed(posts) {
  const siteUrl = 'https://open-elements.com';
  const feed = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Open Elements</title>
    <link>${siteUrl}</link>
    <description>Open Source made right - Open Elements is a modern company with a clear focus on Open Source and Java</description>
    <generator>Next.js</generator>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${posts.map(post => `
    <item>
      <title>${post.frontmatter.title}</title>
      <link>${siteUrl}/posts/${post.frontmatter.date ? post.frontmatter.date.substring(0, 4) : ''}/${post.frontmatter.date ? post.frontmatter.date.substring(5, 7) : ''}/${post.frontmatter.date ? post.frontmatter.date.substring(8, 10) : ''}/${post.slug}/</link>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/posts/${post.frontmatter.date ? post.frontmatter.date.substring(0, 4) : ''}/${post.frontmatter.date ? post.frontmatter.date.substring(5, 7) : ''}/${post.frontmatter.date ? post.frontmatter.date.substring(8, 10) : ''}/${post.slug}/</guid>
      <description><![CDATA[${post.frontmatter.excerpt || ''}]]></description>
      ${post.frontmatter.preview_image ? `<enclosure url="${siteUrl}${post.frontmatter.preview_image}" type="image/svg+xml" />` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

  return feed;
}

export async function GET() {
  try {
    const posts = getAllPosts().slice(0, 20); // Limit to 20 most recent posts
    const rssFeed = generateRSSFeed(posts);
    
    return new NextResponse(rssFeed, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
