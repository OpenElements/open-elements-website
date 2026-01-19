'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function OpenOfficeSection() {
  const t = useTranslations('openOffice')

  return (
    <div id="open-office-section" className="container relative max-w-sm px-6 py-12 mx-auto lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full xl:py-28 sm:py-16 lg:px-0">
      <div className="flex flex-col items-center justify-between gap-20 lg:flex-row xl:gap-28 lg:gap-20">
        <div className="w-full lg:w-1/2">
          <div className="relative mb-10 lg:mb-16 sm:mb-14">
            <Image 
              src="/illustrations/arrow-6.svg" 
              alt="arrow" 
              width={200}
              height={200}
              className="absolute hidden -top-16 -right-5 lg:block"
            />
            <h2 className="h2">
              Open <span className="text-purple">Office</span>
            </h2>
          </div>
          <Image 
            src="/illustrations/section-6.svg" 
            alt="Section 6" 
            width={600}
            height={500}
            className="mx-auto lg:w-full sm:max-w-md"
          />
        </div>
        
        <div className="w-full lg:w-1/2">
          <div>
            <div className="relative flex flex-col gap-3 xl:flex-row xl:items-center lg:gap-6 sm:gap-5">
              <Image 
                src="/illustrations/arrow-6.svg" 
                alt="arrow" 
                width={288}
                height={288}
                className="absolute w-48 sm:-top-20 -top-16 sm:w-72 -left-1/3 lg:hidden"
              />
              <Image 
                src="/illustrations/line-3.svg" 
                alt="line" 
                width={400}
                height={10}
                className="absolute w-full lg:-bottom-10 sm:-bottom-8 -bottom-5"
              />
              <p className="text-purple lg:text-[100px] sm:text-7xl text-[48px] font-bold">{t('percentage')}</p>
              <p className="mt-2 text-base leading-7 xl:mt-0 sm:mt-4 sm:text-lg sm:leading-8">
                {t('percentageText')}
              </p>
            </div>
            
            <p className="mt-8 text-base leading-7 lg:mt-20 sm:mt-16 sm:text-lg sm:leading-8">
              {t('description1')}
            </p>
            
            <p className="xl:text-[32px] text-xl font-bold xl:leading-10 leading-8 text-purple sm:mt-7 mt-5">
              {t('description2')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
