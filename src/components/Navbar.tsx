'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import mainMenu from '@/data/mainMenu.json'
import social from '@/data/social.json'

type SupportedLocale = 'en' | 'de'

const allLocales: SupportedLocale[] = ['en', 'de']

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [illustrationOffset, setIllustrationOffset] = useState(0)
  const t = useTranslations()
  const pathname = usePathname()
  const postSlug = pathname.match(/^\/posts\/(.+?)\/?$/)?.[1] ?? null
  const [postLocaleAlternates, setPostLocaleAlternates] = useState<{
    slug: string
    alternates: Array<{ locale: SupportedLocale; slugPath: string }>
  } | null>(
    null,
  )

  useEffect(() => {
    const maxOffset = 180

    const updateIllustrationOffset = () => {
      const nextOffset = Math.min(window.scrollY, maxOffset)
      setIllustrationOffset(nextOffset)
    }

    updateIllustrationOffset()
    window.addEventListener('scroll', updateIllustrationOffset, { passive: true })

    return () => window.removeEventListener('scroll', updateIllustrationOffset)
  }, [pathname])

  useEffect(() => {
    let cancelled = false

    if (!postSlug) {
      return () => {
        cancelled = true
      }
    }

    const encodedSlug = postSlug.split('/').map(encodeURIComponent).join('/')
    fetch(`/api/post-locales/${encodedSlug}?locale=${locale}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to load post locales')
        }

        const data = await response.json()
        if (cancelled) {
          return
        }

        if (!Array.isArray(data.alternates)) {
          throw new Error('Invalid post locale response')
        }

        const alternates = data.alternates.filter(
          (alt: { locale: string }) => allLocales.includes(alt.locale as SupportedLocale),
        )

        setPostLocaleAlternates({
          slug: postSlug,
          alternates,
        })
      })
      .catch(() => {
        if (!cancelled) {
          setPostLocaleAlternates({
            slug: postSlug,
            alternates: allLocales.map((loc) => ({ locale: loc, slugPath: postSlug })),
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [postSlug, locale])

  const availableLocales =
    postSlug && postLocaleAlternates?.slug === postSlug
      ? postLocaleAlternates.alternates.map((alt) => alt.locale)
      : postSlug
        ? []
        : allLocales
  const showLocaleSwitcher = availableLocales.length > 1

  /**
   * Get the correct path for a locale switcher link.
   * For blog posts, each locale has its own slug path.
   */
  const getLocaleHref = (targetLocale: SupportedLocale): string => {
    if (postSlug && postLocaleAlternates?.slug === postSlug) {
      const alt = postLocaleAlternates.alternates.find((a) => a.locale === targetLocale)
      if (alt) {
        return `/posts/${alt.slugPath}`
      }
    }
    return pathname
  }

  const renderLocaleSwitcher = (variant: 'desktop' | 'mobile') => {
    if (!showLocaleSwitcher) {
      return null
    }

    const gapClass = variant === 'desktop' ? 'gap-2' : 'gap-3'
    const paddingClass = variant === 'desktop' ? 'px-2 py-1' : 'px-2 py-[3px]'

    return (
      <div className={`flex items-center ${gapClass}`} data-locale-switcher-group={variant}>
        {availableLocales.map((languageCode) => (
          <span
            key={languageCode}
            className={`rounded-full ${paddingClass} text-xs font-medium leading-none text-center ${
              locale === languageCode
                ? 'bg-green text-blue'
                : 'bg-transparent text-white hover:bg-white/20'
            } transition-all ease-in-out duration-150`}
          >
            <Link
              href={getLocaleHref(languageCode)}
              locale={languageCode}
              data-locale-switcher={languageCode !== locale ? languageCode : undefined}
              data-locale-link={languageCode}
              onClick={variant === 'mobile' ? () => setIsOpen(false) : undefined}
            >
              {languageCode.toUpperCase()}
            </Link>
          </span>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="">
        <div className="container pt-16">
          <div className={`fixed inset-x-0 top-0 z-30 w-full bg-blue ${pathname !== '/' ? 'border-b border-white/15' : ''}`}>
            {pathname !== '/' && (
              <div
                className="absolute inset-x-0 top-0 flex items-start w-full pointer-events-none"
                style={{ transform: `translateY(-${illustrationOffset}px)` }}
              >
                <div className="w-full 2xl:shrink-0">
                  <Image
                    className="hidden w-full xl:mt-0 lg:block"
                    src="/illustrations/hero-bg-2.svg"
                    alt="Description"
                    width={500}
                    height={300}
                  />
                  <Image
                    className="absolute inset-0 block object-cover object-center w-full md:-top-28 sm:-top-24 -top-10 lg:hidden"
                    src="/illustrations/bg-hero-mb.svg"
                    alt="Description"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            )}
            <div className="mx-auto relative container-box">
              <nav className="flex items-center justify-between py-5">
                <Link href="/">
                  <Image src="/images/logo.svg" alt="logo" width={120} height={28} className="h-5 sm:h-7 w-full object-contain" />
                </Link>
                
                <div className="items-center hidden xl:flex gap-8">
                  <div className="flex items-center gap-8">
                    {mainMenu.map((item, index) => {
                      if (!item.visibleInNavigation) return null
                      
                      return (
                        <div key={index} className="nav-item group relative">
                          {item.children ? (
                            <>
                              <button className="flex items-center justify-between nav-link">
                                {item.i18nKey ? t(item.i18nKey) : item.name}
                                <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 group-hover:block">
                                <div className="dropdownBox w-screen max-w-md flex-auto overflow-hidden bg-blue text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 rounded-lg">
                                  <div className="p-4">
                                    {item.children.map((child, childIndex) => (
                                      <div key={childIndex} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                        <div>
                                          <Link href={child.link} className="nav-link whitespace-nowrap">
                                            {child.i18nKey ? t(child.i18nKey) : child.name}
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
                              {item.i18nKey ? t(item.i18nKey) : item.name}
                            </Link>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  <div>
                    {showLocaleSwitcher && (
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-green">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                      {renderLocaleSwitcher('desktop')}
                    </div>
                    )}
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
                  className="xl:hidden cursor-pointer"
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
                  className="w-7 cursor-pointer" 
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
                              {item.i18nKey ? t(item.i18nKey) : item.name}
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
                                          {child.i18nKey ? t(child.i18nKey) : child.name}
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
                            {item.i18nKey ? t(item.i18nKey) : item.name}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
                {showLocaleSwitcher && (
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-green">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  {renderLocaleSwitcher('mobile')}
                </div>
                )}
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
