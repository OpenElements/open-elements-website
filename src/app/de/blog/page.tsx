'use client'

import { useState } from 'react'
import Image from 'next/image'
import BlogCard from '@/components/blog/BlogCard'
import Pagination from '@/components/blog/Pagination'

const mockPosts = [
  {
    id: '1',
    title: 'Java Module System',
    excerpt: 'Erfahren Sie mehr über das Java-Modulsystem und wie es hilft, Ihren Code zu organisieren.',
    date: '2024-01-11',
    author: 'Hendrik Ebbers',
    categories: ['Java', 'Open Source'],
    preview_image: '/posts/preview-images/software-development-green.svg',
    slug: 'java-module-system',
  },
]

export default function DeBlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 7
  const totalPages = Math.ceil(mockPosts.length / postsPerPage)

  return (
    <div className="relative">
      <div className="absolute w-20 h-20 bg-green-100 rounded-full xl:-left-8 xl:right-auto sm:-right-8 -right-11 xl:top-56 top-20 shrink-0" />
      <Image
        src="/illustrations/blog-arrow.svg"
        alt=""
        className="absolute w-32 sm:w-64 2xl:w-96 lg:w-80 2xl:left-32 xl:left-9 lg:top-36 sm:top-28 top-12 shrink-0"
        width={384}
        height={100}
      />

      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full">
        <div className="flex items-center justify-center pt-16 pb-12 sm:pt-36 sm:pb-12">
          <div className="flex flex-col items-end w-full mx-auto xl:flex-row justify-center">
            <div className="bg-sky-100 rounded-[28px] border-2 border-dashed border-sky p-6 sm:w-96 w-full flex flex-col items-center justify-center text-center">
              <p className="text-base leading-7 sm:text-lg sm:leading-8">
                Alle unsere Beiträge gibt es auf der englischen Seite.
              </p>
              <a 
                href="/blog" 
                className="flex items-center justify-center w-full gap-3 px-4 py-3 mt-4 text-base font-semibold text-center text-white capitalize transition-all duration-150 ease-in-out rounded-full bg-purple sm:px-6 hover:bg-purple-700 hover:shadow-3 active:shadow-none active:bg-purple"
              >
                Zur englischen Seite
              </a>
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center w-auto px-12">
            <h1 className="text-center h1">Artikel</h1>
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

      {mockPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}

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
