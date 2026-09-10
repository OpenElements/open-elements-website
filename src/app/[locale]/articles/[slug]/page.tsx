import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles';

interface ArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Pre-render every article that exists in each locale.
export async function generateStaticParams() {
  return getAllArticleSlugs();
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.frontmatter.title} - Open Elements`,
    description: article.frontmatter.description,
    openGraph: {
      type: 'article',
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      siteName: 'Open Elements',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <div className="container w-full max-w-7xl">
        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1">{article.frontmatter.title}</h1>
            <Image
              src="/illustrations/underline.svg"
              alt={locale === 'de' ? 'Unterstrich' : 'Underline'}
              width={288}
              height={24}
              className="absolute w-48 -bottom-3 sm:w-72 h-auto sm:-mr-24 shrink-0"
            />
          </div>
        </div>
      </div>

      <div className="lg:pb-48 sm:pb-32 pb-28">
        <div className="container mt-12 w-full">
          <div className="mx-auto w-full max-w-4xl space-y-8">
            {article.frontmatter.description && (
              <p className="text-lg font-medium leading-8 text-purple">
                {article.frontmatter.description}
              </p>
            )}

            <div
              className="text-blue sm:prose-base prose prose-sm max-w-none prose-pre:prose-code:text-sm prose-ul:marker:text-blue prose-a:text-purple-700 prose-pre:prose-code:bg-transparent prose-code:bg-yellow prose-p:sm:leading-7 prose-blockquote:border-l-0 prose-blockquote:bg-green-100 prose-blockquote:not-italic prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:rounded-3xl relative"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
