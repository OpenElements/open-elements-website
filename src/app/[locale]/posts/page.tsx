import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/markdown';
import BlogCard from '@/components/blog/BlogCard';
import BlogPagination from '@/components/blog/BlogPagination';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { page } = await searchParams;
  
  const currentPage = parseInt(page || '1', 10);
  const postsPerPage = 7;
  
  // Fetch all posts for the current locale
  const allPosts = getAllPosts(locale);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  
  // Paginate posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Transform posts to match BlogCard expected format
  const formattedPosts = currentPosts.map((post, index) => ({
    id: index.toString(),
    title: post.frontmatter.title,
    excerpt: post.frontmatter.excerpt || '',
    date: new Date(post.frontmatter.date).toISOString().split('T')[0],
    author: post.frontmatter.author || 'Open Elements',
    categories: post.frontmatter.categories || [],
    preview_image: post.frontmatter.preview_image || '/posts/preview-images/software-development-green.svg',
    slug: post.slug,
  }));

  const t = await getTranslations();

  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute w-20 h-20 bg-green-100 rounded-full xl:-left-8 xl:right-auto sm:-right-8 -right-11 xl:top-56 top-20 shrink-0" />
      <Image
        src="/illustrations/blog-arrow.svg"
        alt=""
        className="absolute w-32 sm:w-64 2xl:w-96 lg:w-80 2xl:left-32 xl:left-9 lg:top-36 sm:top-28 top-12 shrink-0"
        width={384}
        height={100}
      />
      <Image
        src="/illustrations/blog-shape.svg"
        alt=""
        className="sm:block hidden absolute xl:w-32 md:w-24 w-20 md:right-[10%] right-[7%] top-48 shrink-0"
        width={128}
        height={128}
      />

      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full">
        <div className="flex items-center justify-center pt-16 pb-12 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-auto px-12">
            <h1 className="text-center h1">
              {locale === 'de' ? 'Artikel' : 'Articles'}
            </h1>
            <Image
              src="/illustrations/blog-underline.svg"
              alt={t('altTexts.underline')}
              className="absolute w-full -bottom-3 shrink-0"
              width={300}
              height={20}
            />
          </div>
        </div>
      </div>

      {/* Blog posts */}
      {formattedPosts.length > 0 ? (
        formattedPosts.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))
      ) : (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-600">
            {locale === 'de' 
              ? 'Keine Artikel gefunden.' 
              : 'No articles found.'}
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="sm:pb-44 pb-36">
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          locale={locale}
        />
      </div>
    </div>
  );
}
