'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function OpenKnowledgeSection() {
  const t = useTranslations('openKnowledge')

  return (
    <div id="open-knowledge-section" className="container relative max-w-sm px-6 py-12 mx-auto lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full xl:py-28 sm:py-16 lg:px-0">
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row xl:gap-28 sm:gap-12">
        <div className="relative w-full lg:w-1/2">
          <div className="relative flex items-start gap-6 lg:hidden sm:mb-12 mb-7">
            <h2 className="h2">{t('title')}</h2>
            <Image 
              src="/illustrations/star.svg" 
              alt="Stars" 
              width={80}
              height={80}
              className="absolute right-0 sm:w-20 w-14 sm:-top-20 -top-12 sm:right-28"
            />
          </div>
          <Image 
            src="/illustrations/arrow-3.svg" 
            alt="arrow" 
            width={256}
            height={256}
            className="absolute right-0 hidden w-48 xl:-bottom-64 -bottom-48 xl:w-64 lg:block"
          />
          <Image 
            src="/illustrations/section-2.svg" 
            alt="section 2" 
            width={600}
            height={500}
            className="mx-auto lg:w-full sm:max-w-md"
          />
        </div>
        
        <div className="relative w-full lg:w-1/2">
          <Image 
            src="/illustrations/section-2-bg.svg" 
            alt="section 2 background" 
            width={384}
            height={384}
            className="absolute w-96 lg:top-14 -right-40"
          />
          <Image 
            src="/illustrations/arrow-3.svg" 
            alt="arrow" 
            width={128}
            height={128}
            className="absolute right-0 w-20 sm:w-32 sm:-bottom-36 -bottom-24 lg:hidden"
          />
          
          <div className="relative">
            <div className="items-start hidden gap-6 lg:flex">
              <h2 className="h2" dangerouslySetInnerHTML={{ __html: t('title').replace(' ', '<br />') }} />
              <Image 
                src="/illustrations/star.svg" 
                alt="Star" 
                width={64}
                height={64}
                className="w-16 -mt-8"
              />
            </div>
            
            <p className="text-base leading-7 sm:text-lg sm:leading-8 lg:mt-5">
              {t('intro')}
            </p>
            
            <div className="flex flex-col gap-3 mt-5 text-base sm:text-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg iconify text-rose" data-icon="teenyicons:tick-circle-solid"></span>
                {t('item1')}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg iconify text-green" data-icon="teenyicons:tick-circle-solid"></span>
                {t('item2')}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg iconify text-sky" data-icon="teenyicons:tick-circle-solid"></span>
                {t('item3')}
              </div>
            </div>
            
            <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8">
              {t('outro1')}
            </p>
            
            <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8">
              {t('outro2')}{' '}
              <a className="link-green" href="https://wikimediafoundation.org/" target="_blank" rel="noopener noreferrer">
                {t('wikimedia')}
              </a>
              {' '}{t('and')}{' '}
              <a className="link-green" href="https://correctiv.org" target="_blank" rel="noopener noreferrer">
                {t('correctiv')}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
