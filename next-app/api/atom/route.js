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

function generateAtomFeed(posts) {
  const siteUrl = 'https://open-elements.com';
  const feed = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <title>Open Elements</title>
  <link href="${siteUrl}/api/atom" rel="self"/>
  <link href="${siteUrl}"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${siteUrl}/</id>
  <author>
    <name>Open Elements</name>
  </author>
  ${posts.map(post => `
  <entry>
    <title>${post.frontmatter.title}</title>
    <link href="${siteUrl}/posts/${post.frontmatter.date ? post.frontmatter.date.substring(0, 4) : ''}/${post.frontmatter.date ? post.frontmatter.date.substring(5, 7) : ''}/${post.frontmatter.date ? post.frontmatter.date.substring(8, 10) : ''}/${post.slug}/"/>
    <id>${siteUrl}/posts/${post.frontmatter.date ? post.frontmatter.date.substring(0, 4) : ''}/${post.frontmatter.date ? post.frontmatter.date.substring(5, 7) : ''}/${post.frontmatter.date ? post.frontmatter.date.substring(8, 10) : ''}/${post.slug}/</id>
    <updated>${new Date(post.frontmatter.date || post.frontmatter.lastmod).toISOString()}</updated>
    <published>${new Date(post.frontmatter.date).toISOString()}</published>
    <author>
      <name>${post.frontmatter.author || 'Open Elements'}</name>
    </author>
    <summary type="html"><![CDATA[${post.frontmatter.excerpt || ''}]]></summary>
    <content type="html"><![CDATA[${post.frontmatter.preview_image ? `<img src="${siteUrl}${post.frontmatter.preview_image}" alt="${post.frontmatter.title}" /><br/>` : ''}${post.content}]]></content>
  </entry>`).join('')}
</feed>`;

  return feed;
}

export async function GET() {
  try {
    const posts = getAllPosts().slice(0, 20); // Limit to 20 most recent posts
    const atomFeed = generateAtomFeed(posts);
    
    return new NextResponse(atomFeed, {
      status: 200,
      headers: {
        'Content-Type': 'application/atom+xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating Atom feed:', error);
    return new NextResponse('Error generating Atom feed', { status: 500 });
  }
}
