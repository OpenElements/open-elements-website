'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function OpenSourceSection() {
  const t = useTranslations('openSource')

  return (
    <div id="open-source-section" className="container relative max-w-sm px-6 py-12 mx-auto lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full xl:py-28 sm:py-16 lg:px-0">
      <div className="flex flex-col items-center justify-between gap-5 lg:flex-row xl:gap-28 lg:gap-20">
        <div className="relative w-full lg:w-1/2">
          <Image 
            src="/illustrations/arrow-5.svg" 
            alt="arrow" 
            width={200}
            height={200}
            className="absolute left-0 hidden -top-20 lg:block"
          />
          
          <h2 className="h2 lg:hidden sm:mb-12 mb-7">
            <div className="relative inline">
              <Image 
                src="/illustrations/text-bg-1.svg" 
                alt="text background" 
                width={150}
                height={50}
                className="absolute bottom-0 w-full -mr-2"
              />
              <span className="relative">Open</span>
            </div>
            {' '}Source
          </h2>
          
          <Image 
            src="/illustrations/section-4.svg" 
            alt="section 4" 
            width={600}
            height={500}
            className="mx-auto lg:w-full sm:max-w-md"
          />
        </div>
        
        <div className="w-full lg:w-1/2">
          <div>
            <h2 className="hidden h2 lg:block">
              <div className="relative inline">
                <Image 
                  src="/illustrations/text-bg-1.svg" 
                  alt="text background" 
                  width={150}
                  height={50}
                  className="absolute bottom-0 w-full -mr-2"
                />
                <span className="relative">Open</span>
              </div>
              {' '}Source
            </h2>
            
            <p className="text-base leading-7 lg:mt-6 sm:text-lg sm:leading-8">
              {t('description1')}
            </p>
            
            <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
              {t('description2')}{' '}
              <a className="link-purple" href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">
                {t('eclipseFoundation')}
              </a>
              {' '}{t('description3')}{' '}
              <a className="link-purple" href="https://adoptium.net/" target="_blank" rel="noopener noreferrer">
                {t('eclipseAdoptium')}
              </a>
              {' '}{t('and')}{' '}
              <a className="link-purple" href="https://jakarta.ee/" target="_blank" rel="noopener noreferrer">
                {t('jakartaEE')}
              </a>
              {t('description4')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
