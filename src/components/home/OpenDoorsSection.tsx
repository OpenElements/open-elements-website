'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function OpenDoorsSection() {
  const t = useTranslations('openDoors')

  return (
    <div id="open-doors-section" className="container relative max-w-sm px-6 py-12 mx-auto lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full xl:py-28 sm:py-16 lg:px-0">
      <div>
        <div className="flex flex-col items-center justify-center gap-10 lg:items-start lg:flex-row lg:justify-start">
          <div className="relative inline-block w-full py-3 pl-6 pr-6 text-center bg-purple-100 border rounded-sm border-purple lg:pr-11 sm:w-auto">
            <h2 className="h2 text-purple">{t('title')}</h2>
            <span className="absolute hidden text-3xl iconify text-purple -right-6 -bottom-6 sm:block" data-icon="clarity:cursor-arrow-solid"></span>
            <Image 
              src="/illustrations/click-2.svg" 
              alt="click svg" 
              width={40}
              height={40}
              className="absolute -right-5 -bottom-6 sm:hidden"
            />
          </div>
          <Image 
            src="/illustrations/opendoor.svg" 
            alt="Open door image" 
            width={600}
            height={500}
            className="sm:max-w-md lg:hidden"
          />
        </div>
        
        <div className="flex flex-col items-end w-full mx-auto xl:flex-row">
          <div className="relative lg:-mt-16 flex flex-col lg:gap-5 sm:gap-24 gap-11 2xl:max-w-3xl xl:max-w-[800px] mx-auto shrink-0 w-full ml-0">
            <Image 
              src="/illustrations/connected-line-2.svg" 
              alt="lines" 
              width={700}
              height={400}
              className="absolute inset-0 lg:block hidden w-full max-w-[700px] top-20 ml-10"
            />
            <Image 
              src="/illustrations/vertical-line.svg" 
              alt="vertical lines" 
              width={450}
              height={600}
              className="absolute inset-0 lg:hidden max-w-[450px] sm:ml-2 -ml-3 w-full mx-auto mt-20"
            />
            
            <div className="relative flex justify-end order-2 mx-auto mt-8 lg:order-1 lg:mx-0 lg:mt-0">
              <div className="bg-sky-100 rounded-[28px] border-2 border-dashed border-sky p-6 lg:w-[380px] sm:w-96 w-full h-64 flex items-center justify-center text-center">
                <p className="text-base leading-7 sm:text-lg sm:leading-8">
                  {t('box1')}
                </p>
              </div>
            </div>
            
            <div className="flex relative lg:mt-[-12%] lg:order-2 order-1 lg:ml-0 mx-auto mt-12">
              <div className="bg-sky-100 rounded-[28px] border-2 border-dashed border-sky p-6 xl:w-60 lg:w-56 sm:w-96 w-full h-32 flex items-center justify-center text-center">
                <p className="text-base leading-7 sm:text-lg sm:leading-8">
                  {t('box2')}
                </p>
              </div>
            </div>
            
            <div className="flex relative lg:ml-[25%] lg:mt-20 mt-4 lg:order-3 order-3 mx-auto">
              <div className="bg-sky-100 rounded-[28px] border-2 border-dashed border-sky p-6 sm:w-96 w-full flex flex-col items-center justify-center text-center">
                <p className="text-base leading-7 sm:text-lg sm:leading-8">
                  {t('box3')}{' '}
                  <a className="link-purple" href="https://cal.com/open-elements/15min" target="_blank" rel="noopener noreferrer">
                    {t('bookAppointment')}
                  </a>
                  {' '}{t('box3End')}
                </p>
                <a 
                  href="https://cal.com/open-elements/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full gap-3 px-4 py-3 mt-4 text-base font-semibold text-center text-white capitalize transition-all duration-150 ease-in-out rounded-full bg-purple sm:px-6 hover:bg-purple-700 hover:shadow-3 active:shadow-none active:bg-purple"
                >
                  <Image 
                    src="/icons/call.svg" 
                    alt="call icon" 
                    width={20}
                    height={20}
                  />
                  {t('scheduleButton')}
                </a>
              </div>
            </div>
          </div>
          
          <Image 
            src="/illustrations/opendoor.svg" 
            alt="open door image" 
            width={500}
            height={600}
            className="hidden max-w-md mx-auto mt-16 xl:absolute right-5 2xl:bottom-14 lg:block xl:mt-0"
          />
        </div>
      </div>
    </div>
  )
}
