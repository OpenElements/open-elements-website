import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/markdown';
import teamDataEn from '@/data/en/team.json';
import teamDataDe from '@/data/de/team.json';

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  link?: string;
  bio?: string;
  picture?: string;
  role?: string;
  socials?: Array<{ name: string; link: string; icon: string }>;
  visible?: boolean;
}

function getAuthorById(locale: string, authorId: string): TeamMember | undefined {
  const localizedTeam = locale === 'de' ? teamDataDe : teamDataEn;
  return localizedTeam.find((member) => member.id === authorId) || teamDataEn.find((member) => member.id === authorId);
}

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

  const author = getAuthorById(locale, post.frontmatter.author);
  const authorName = author ? `${author.firstName} ${author.lastName}` : post.frontmatter.author;

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
      authors: [authorName],
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

  const author = getAuthorById(locale, post.frontmatter.author);
  const authorName = author ? `${author.firstName} ${author.lastName}` : post.frontmatter.author;

  return (
    <div className="">
      <div className="container w-full max-w-screen-2xl">
        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1 text-4xl sm:text-5xl lg:text-6xl">{post.frontmatter.title}</h1>
            <Image
              src="/illustrations/underline.svg"
              alt={locale === 'de' ? 'Unterstrich' : 'Underline'}
              width={288}
              height={24}
              className="absolute w-48 -bottom-3 sm:w-72 sm:-mr-24 shrink-0"
            />
          </div>
        </div>
      </div>

      <div className="lg:pb-48 sm:pb-32 pb-28">
        <div className="container mt-12 w-full max-w-screen-2xl">
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-8">
            <div className="flex-1 w-full space-y-8">
              <div className="space-y-4 sm:space-y-3">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2 text-purple">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <time className="text-lg font-medium">{formattedDate}</time>
                  </div>
                  <div className="flex items-center gap-2 text-purple">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {author?.link ? (
                      <Link href={author.link} className="text-lg font-medium text-blue hover:text-purple transition-colors">
                        {authorName}
                      </Link>
                    ) : (
                      <span className="text-lg font-medium">{authorName}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm sm:text-base sm:mt-2 text-purple">
                  {post.frontmatter.categories?.map((category, index) => (
                    <p key={index}>#{category}</p>
                  ))}
                </div>
              </div>

              {post.frontmatter.preview_image && (
                <div className="rounded-[30px] overflow-hidden shadow-4">
                  <div className="relative aspect-video">
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

              <div
                className="text-blue prose prose-lg prose-a:text-purple-700 prose-code:bg-yellow prose-p:text-lg prose-p:leading-8 prose-blockquote:border-l-0 prose-blockquote:bg-green-100 prose-blockquote:not-italic prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:rounded-3xl relative"
                style={{ maxWidth: '100%' }}
                dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
              />
            </div>

            {author && (
              <aside className="w-full xl:max-w-sm shrink-0">
                <div className="rounded-[30px] w-full shadow-4 bg-white xl:p-5 p-4 xl:block md:flex lg:items-center">
                  {author.picture && (
                    <div className="relative lg:w-40 md:w-48 sm:w-40 w-28 h-28 md:h-auto lg:h-40 shrink-0 overflow-hidden rounded-3xl bg-gray-100 xl:float-left md:float-none float-left xl:mr-6 mr-4">
                      <Image
                        src={author.picture}
                        alt={authorName}
                        fill
                        sizes="(max-width: 640px) 112px, (max-width: 1024px) 160px, 192px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="mb-2 text-xl font-bold">
                      {author.link ? (
                        <Link href={author.link} className="hover:text-purple transition-colors">
                          {authorName}
                        </Link>
                      ) : (
                        authorName
                      )}
                    </h4>
                    {author.bio && (
                      <p className="text-base leading-7">
                        {author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
