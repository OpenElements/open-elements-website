import Image from 'next/image'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  categories: string[]
  preview_image: string
  slug: string
}

interface BlogCardProps {
  post: BlogPost
  locale?: string
}

export default function BlogCard({ post, locale = 'en' }: BlogCardProps) {
  const localePath = locale === 'en' ? '' : `/${locale}`;
  
  return (
    <div className="pt-7 sm:pt-12">
      <div className="container mx-auto space-y-20 lg:max-w-7xl">
        <div className="space-y-6">
          <div className="flex post bg-gray rounded-[30px] shadow-4 w-full relative group sm:flex-row flex-col">
            <Link href={`${localePath}/posts/${post.slug}`} className="absolute inset-0 z-10" />
            <div className="relative sm:w-52 shrink-0 sm:h-auto h-72 half-rounded overflow-hidden">
              {post.preview_image && (
                <Image
                  src={post.preview_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-5">
              <article>
                <div className="flex flex-col gap-1.5 sm:items-center sm:gap-5 sm:flex-row">
                  <div className="flex items-center gap-2 text-purple">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    </svg>
                    <time className="text-[14px] font-medium">
                      {new Date(post.date).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2 text-purple">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    <p className="text-[14px] font-medium">{post.author}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:mt-2 text-purple">
                  {post.categories.map((category, index) => (
                    <p key={index}>#{category}</p>
                  ))}
                </div>
                <div className="mt-6 space-y-5 sm:mt-5 sm:space-y-4">
                  <h2 className="text-lg font-bold text-center transition-colors duration-150 ease-in-out text-blue sm:text-left sm:line-clamp-none line-clamp-2 group-hover:text-purple-700">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-[22px] text-blue line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
