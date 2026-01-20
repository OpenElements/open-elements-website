import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/markdown';

interface PostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all posts in all locales
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} - Open Elements`,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.categories,
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      siteName: 'Open Elements',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      images: post.frontmatter.preview_image
        ? [
            {
              url: post.frontmatter.preview_image,
              width: 1200,
              height: 630,
              alt: post.frontmatter.title,
            },
          ]
        : undefined,
      publishedTime: new Date(post.frontmatter.date).toISOString(),
      authors: [post.frontmatter.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    locale === 'de' ? 'de-DE' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple/5 via-transparent to-green/5">
        <div className="absolute w-32 h-32 bg-green-100/50 rounded-full -right-10 top-20 blur-2xl" />
        <div className="absolute w-48 h-48 bg-purple-100/30 rounded-full -left-10 bottom-10 blur-3xl" />
        
        <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl relative z-10">
          {/* Back to Blog Link */}
          <Link 
            href={`/${locale === 'en' ? '' : locale + '/'}posts`}
            className="inline-flex items-center gap-2 text-purple hover:text-purple-700 transition-colors mb-8 group"
          >
            <svg 
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            <span className="font-medium">
              {locale === 'de' ? 'Zurück zum Blog' : 'Back to Blog'}
            </span>
          </Link>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.frontmatter.categories?.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium text-purple bg-purple/10 rounded-full"
              >
                #{category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue leading-tight mb-6">
            {post.frontmatter.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <svg 
                className="w-5 h-5 text-purple" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" 
                  clipRule="evenodd" 
                />
              </svg>
              <time className="text-sm font-medium">{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 text-purple"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-sm font-medium capitalize">{post.frontmatter.author}</span>
            </div>
          </div>

          {/* Preview Image */}
          {post.frontmatter.preview_image && (
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-video bg-gradient-to-br from-purple/20 to-green/20">
                <Image
                  src={post.frontmatter.preview_image}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl">
        <div 
          className="prose prose-lg max-w-none
            prose-headings:text-blue prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-purple prose-a:no-underline hover:prose-a:underline
            prose-strong:text-blue
            prose-ul:my-6 prose-li:my-2
            prose-img:rounded-xl prose-img:shadow-md
            prose-blockquote:border-l-purple prose-blockquote:bg-purple/5 
            prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            prose-blockquote:not-italic prose-blockquote:text-gray-700
            prose-code:text-purple prose-code:bg-purple/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
          "
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />
      </div>

      {/* Footer Navigation */}
      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="border-t border-gray-200 pt-8">
          <Link 
            href={`/${locale === 'en' ? '' : locale + '/'}posts`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple text-white rounded-full font-medium hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            {locale === 'de' ? 'Alle Artikel ansehen' : 'View All Articles'}
          </Link>
        </div>
      </div>
    </article>
  );
}
