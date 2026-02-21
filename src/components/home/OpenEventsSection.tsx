'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function OpenEventsSection() {
  const t = useTranslations('openEvents')

  return (
    <div id="open-events-section" className="bg-slate">
      <div className="container max-w-sm px-6 py-12 mx-auto lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full sm:py-16 lg:px-0">
        <div className="flex flex-col-reverse items-center justify-between gap-5 lg:flex-row xl:gap-28 lg:gap-20">
          <div className="relative w-full lg:w-1/2">
            <Image 
              src="/illustrations/arrow-4.svg" 
              alt="Arrow" 
              width={208}
              height={208}
              className="absolute w-32 xl:w-52 lg:w-36 sm:w-40 xl:-bottom-72 lg:-bottom-48 lg:-right-20 lg:left-auto -left-14 sm:-bottom-32 -bottom-24"
            />
            
            <div>
              <div className="relative hidden px-6 py-3 border rounded-sm bg-rose-100 border-rose lg:inline-block">
                <h2 className="h2 text-rose">{t('title')}</h2>
                <span className="absolute text-3xl iconify text-rose -right-6 -bottom-6" data-icon="clarity:cursor-arrow-solid"></span>
              </div>
              
              <p className="text-base leading-7 lg:mt-8 sm:text-lg sm:leading-8">
                {t('description1')}{' '}
                <a className="link-rose" href="https://www.meetup.com/jug-dortmund" target="_blank" rel="noopener noreferrer">
                  {t('jugDortmund')}
                </a>
                {' '}{t('description2')}{' '}
                <a className="link-rose" href="https://www.javaland.eu" target="_blank" rel="noopener noreferrer">
                  {t('javaland')}
                </a>
                {' '}{t('description3')}{' '}
                <a className="link-rose" href="https://cyberland.ijug.eu" target="_blank" rel="noopener noreferrer">
                  {t('cyberland')}
                </a>
                {' '}{t('description4')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
            <div className="relative inline-block w-full px-6 py-3 text-center border rounded-sm bg-rose-100 border-rose lg:hidden sm:w-auto sm:mb-12 mb-7">
              <h2 className="h2 text-rose">{t('title')}</h2>
              <span className="absolute hidden text-3xl iconify text-rose -right-6 -bottom-6 sm:block" data-icon="clarity:cursor-arrow-solid"></span>
              <Image 
                src="/illustrations/click.svg" 
                alt="Click SVG" 
                width={40}
                height={40}
                className="absolute -right-5 -bottom-6 size-8 sm:hidden"
              />
            </div>
            <Image 
              src="/illustrations/section-3.svg" 
              alt="Section 3" 
              width={600}
              height={500}
              className="mx-auto lg:w-full sm:max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
