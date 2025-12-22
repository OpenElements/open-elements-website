'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import mainMenu from '@/data/mainMenu.json'
import social from '@/data/social.json'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 flex items-start w-full">
          <div className="bg-blue h-[244px] w-full 2xl:block hidden"></div>
          <div className="w-full 2xl:shrink-0">
            <Image
              className="hidden w-full mt-3 xl:mt-0 lg:block"
              src="/illustrations/home-bg-2.svg"
              alt="Hero background"
              width={2000}
              height={600}
              priority
            />
            <Image
              className="absolute inset-0 block object-cover object-center w-full md:-top-28 sm:-top-24 -top-10 lg:hidden"
              src="/illustrations/m-bg-hero.svg"
              alt="hero background for mobile"
              width={800}
              height={600}
              priority
            />
          </div>
          <div className="bg-blue h-[595px] w-full 2xl:block hidden"></div>
        </div>

        <div className="container pt-16">
          <div className="fixed inset-x-0 top-0 z-30 w-full pb-3 bg-blue">
            <div className="container relative mx-auto max-w-7xl">
              <nav className="flex items-center justify-between pt-5 pb-3">
                <Link href="/">
                  <Image src="/images/logo.svg" alt="logo" width={120} height={28} className="h-5 sm:h-7 w-auto" />
                </Link>
                
                <div className="items-center hidden xl:flex gap-9">
                  <div className="flex items-center gap-9">
                    {mainMenu.map((item, index) => {
                      if (!item.visibleInNavigation) return null
                      
                      return (
                        <div key={index} className="nav-item group relative">
                          {item.children ? (
                            <>
                              <button className="flex items-center justify-between nav-link">
                                {item.name}
                                <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <div className="hidden absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 group-hover:block">
                                <div className="dropdownBox w-screen max-w-md flex-auto overflow-hidden bg-blue text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 rounded-lg">
                                  <div className="p-4">
                                    {item.children.map((child, childIndex) => (
                                      <div key={childIndex} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                        <div>
                                          <Link href={child.link} className="nav-link whitespace-nowrap">
                                            {child.name}
                                            <span className="absolute inset-0"></span>
                                          </Link>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <Link href={item.link} className="nav-link inline-flex items-center">
                              {item.name}
                            </Link>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-green">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                      <div className="flex items-center gap-1">
                        <span className="bg-green rounded-full px-2 py-[3px] text-xs font-medium leading-none text-center text-blue">EN</span>
                        <Link href="/de" className="bg-transparent rounded-full px-2 py-[3px] text-xs font-medium leading-none text-center hover:bg-white/20 transition-all ease-in-out duration-150 text-white">DE</Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5">
                    {social.map((item, index) => (
                      <a 
                        key={index}
                        href={item.link} 
                        aria-label={item.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus:outline-none"
                      >
                        <span className="iconify nav-icon" data-icon={item.icon}></span>
                      </a>
                    ))}
                  </div>
                </div>

                <button 
                  className="xl:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Image 
                    src="/illustrations/burger-menu.svg" 
                    alt="menu" 
                    width={32} 
                    height={32} 
                    className="w-8"
                  />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-0 z-30 h-full bg-blue xl:hidden">
          <div className="relative w-full h-screen">
            <Image 
              className="absolute inset-0 object-cover w-full h-full" 
              alt="menu background"
              src="/illustrations/menu-bg.svg"
              width={800}
              height={1000}
              priority
            />
            <nav className="container relative flex items-center justify-between pt-4 pb-3 mx-auto sm:pt-5 max-w-7xl">
              <Link href="/">
                <Image src="/images/logo.svg" alt="logo" width={120} height={28} className="h-5 sm:h-7 w-auto" />
              </Link>
              <button className="xl:hidden" onClick={() => setIsOpen(false)}>
                <Image 
                  className="w-7" 
                  alt="close button icon" 
                  src="/illustrations/close.svg"
                  width={28}
                  height={28}
                />
              </button>
            </nav>
            <div className="flex flex-col sm:items-center justify-between py-12 sm:px-12 px-8 gap-24 relative h-[calc(100vh-70px)]">
              <div className="flex flex-col gap-11 sm:items-center">
                <div className="flex flex-col sm:items-center gap-7">
                  {mainMenu.map((item, index) => {
                    if (!item.visibleInNavigation) return null
                    
                    return (
                      <div key={index} className="nav-item group relative">
                        {item.children ? (
                          <>
                            <button className="flex items-center justify-between nav-link">
                              {item.name}
                              <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <div className="hidden absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 group-hover:block">
                              <div className="dropdownBox w-screen max-w-md flex-auto overflow-hidden bg-blue text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                  {item.children.map((child, childIndex) => (
                                    <div key={childIndex} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                      <div>
                                        <Link href={child.link} className="nav-link whitespace-nowrap">
                                          {child.name}
                                          <span className="absolute inset-0"></span>
                                        </Link>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Link href={item.link} className="nav-link inline-flex items-center" onClick={() => setIsOpen(false)}>
                            {item.name}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-green">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <div className="flex items-center gap-3">
                    <span className="bg-green rounded-full px-2 py-[3px] text-xs font-medium leading-none text-center text-blue">EN</span>
                    <Link href="/de" className="bg-transparent rounded-full px-2 py-[3px] text-xs font-medium leading-none text-center hover:bg-white/20 transition-all ease-in-out duration-150 text-white">DE</Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {social.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link} 
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none"
                  >
                    <span className="iconify nav-icon" data-icon={item.icon}></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
