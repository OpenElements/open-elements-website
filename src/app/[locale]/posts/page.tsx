'use client'

import { useState } from 'react'
import Image from 'next/image'
import BlogCard from '@/components/blog/BlogCard'
import Pagination from '@/components/blog/Pagination'

// Placeholder data - in a real application, this would come from a CMS or API
const mockPosts = [
  {
    id: '1',
    title: 'Java Module System',
    excerpt: 'Learn about the Java Module System and how it helps organize your code.',
    date: '2024-01-11',
    author: 'Hendrik Ebbers',
    categories: ['Java', 'Open Source'],
    preview_image: '/posts/preview-images/software-development-green.svg',
    slug: 'java-module-system',
  },
  {
    id: '2',
    title: 'Open Elements in 2024',
    excerpt: 'A look back at what we achieved in 2024 and our plans for the future.',
    date: '2025-01-16',
    author: 'Hendrik Ebbers',
    categories: ['Open Elements', 'General'],
    preview_image: '/posts/preview-images/software-development-green.svg',
    slug: 'open-elements-in-2024',
  },
  {
    id: '3',
    title: 'DCO Signing',
    excerpt: 'Understanding Developer Certificate of Origin and why it matters.',
    date: '2025-01-03',
    author: 'Hendrik Ebbers',
    categories: ['Open Source', 'General'],
    preview_image: '/posts/preview-images/software-development-green.svg',
    slug: 'dco-signing',
  },
]

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 7
  const totalPages = Math.ceil(mockPosts.length / postsPerPage)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost)

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
            <h1 className="text-center h1">Articles</h1>
            <Image
              src="/illustrations/blog-underline.svg"
              alt="Underline"
              className="absolute w-full -bottom-3 shrink-0"
              width={300}
              height={20}
            />
          </div>
        </div>
      </div>

      {/* Blog posts */}
      {currentPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}

      {/* Pagination */}
      <div className="sm:pb-44 pb-36">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
