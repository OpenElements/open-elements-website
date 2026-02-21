'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import landingpage from '@/data/landingpage.json'

export default function HeroSection() {
  const t = useTranslations()

  return (
    <div className="mx-auto">
      {/* Hero Background Illustrations */}
      <div className="absolute top-0 left-0 right-0 flex items-start w-full">
        <div className="bg-blue h-full w-full 2xl:block hidden"></div>
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
        <div className="bg-blue h-full w-full 2xl:block hidden"></div>
      </div>

      <div className="relative mx-auto mt-12 container  sm:pb-0 pb-14">
        <div className="flex flex-col items-center gap-8 mt-20 lg:flex-row lg:mt-40">
          <div className="relative w-full">
            <Image 
              className="absolute hidden 2xl:right-20 right-12 h-28 -top-24 lg:block" 
              alt="arrow" 
              src="/illustrations/arrow-1.svg" 
              width={200}
              height={200}
            />
            <Image 
              className="absolute right-[20%] -bottom-64 lg:block hidden h-20 w-20" 
              alt="arrow" 
              src="/illustrations/arrow-sm.svg"
              width={80}
              height={80}
            />
            
            <p className="lg:text-[28px] sm:text-2xl text-[22px] font-medium text-green mb-3 lg:px-0 md:px-12 sm:px-8">
              {t('hero.tagline')}
            </p>
            
            <h1 className="max-w-2xl h1 lg:px-0 md:px-12 sm:px-8 tracking-tight">
              <div className="inline  lg:inline sm:block">
                <span className="relative z-10 inline">{t('hero.title1')}</span> &nbsp;
                <div className="relative z-0 inline-flex items-center justify-center px-5 -ml-5 -mr-5 sm:px-16 sm:-ml-16 sm:-mr-16">
                  <Image 
                    className="absolute lg:w-56 sm:w-48 w-32 inset-0 sm:ml-8 sm:-mt-2.5 -mt-1" 
                    alt="hero text background" 
                    src="/illustrations/text-bg.svg"
                    width={224}
                    height={80}
                  />
                  <span className="relative">{t('hero.title2')} </span> &nbsp;
                </div>
              </div>
              <div className="relative inline">
                <span>{t('hero.title3')}</span>
                <span className="relative block sm:inline"> {t('hero.title4')}</span>
              </div>
            </h1>
            
            <p className=" mt-4 2xl:text-lg text-base text-blue lg:px-0 md:px-12 sm:px-8">
              {t('hero.description')}
            </p>
          </div>
          
          {landingpage.category_navbar_visible && (
            <div className="relative hidden mx-auto -mt-8 lg:hidden sm:block">
              <div className="flex gap-2 px-5 py-6 overflow-x-auto xl:items-center lg:px-0 sm:px-12 xl:justify-center scrollbar-none">
                {landingpage.open_knowledge_visible && (
                  <a href="#open-knowledge-section" className="badge-purple">{t('sections.openKnowledge')}</a>
                )}
                {landingpage.open_events_visible && (
                  <a href="#open-events-section" className="badge-purple">{t('sections.openEvents')}</a>
                )}
                {landingpage.open_source_visible && (
                  <a href="#open-source-section" className="badge-purple">{t('sections.openSource')}</a>
                )}
                {landingpage.open_doors_visible && (
                  <a href="#open-doors-section" className="badge-purple">{t('sections.openDoors')}</a>
                )}
                {landingpage.open_data_visible && (
                  <a href="#open-data-section" className="badge-purple">{t('sections.openData')}</a>
                )}
                {landingpage.open_office_visible && (
                  <a href="#open-office-section" className="badge-purple">{t('sections.openOffice')}</a>
                )}
                {landingpage.open_diversity_visible && (
                  <a href="#open-diversity-section" className="badge-purple">{t('sections.openDiversity')}</a>
                )}
              </div>
            </div>
          )}
          
          <div className="relative w-full max-w-sm 2xl:max-w-md shrink-0 sm:px-0">
            <Image 
              className="absolute w-16 sm:-right-24 md:-right-40 -right-6 sm:bottom-2 -bottom-6 md:w-28 sm:w-24 lg:hidden" 
              alt="Arrow" 
              src="/illustrations/m-arrow-1.svg"
              width={112}
              height={112}
            />
            <Image 
              className="absolute w-20 -bottom-12 md:-left-40 sm:-left-24 -left-6 md:w-36 sm:w-28 lg:hidden" 
              alt="Arrow" 
              src="/illustrations/m-arrow-2.svg"
              width={144}
              height={144}
            />
            <Image 
              src="/illustrations/landingpage-hero.svg" 
              alt="hero circle" 
              className="w-full"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>

      {landingpage.category_navbar_visible && (
        <div className="relative hidden mx-auto lg:container xl:mt-5 mt-7 lg:block">
          <div className="flex items-center justify-center gap-2 px-5 py-6 mx-auto overflow-x-auto lg:px-0 sm:px-8 xl:justify-center scrollbar-none">
            {landingpage.open_knowledge_visible && (
              <a href="#open-knowledge-section" className="badge-purple">{t('sections.openKnowledge')}</a>
            )}
            {landingpage.open_events_visible && (
              <a href="#open-events-section" className="badge-purple">{t('sections.openEvents')}</a>
            )}
            {landingpage.open_source_visible && (
              <a href="#open-source-section" className="badge-purple">{t('sections.openSource')}</a>
            )}
            {landingpage.open_doors_visible && (
              <a href="#open-doors-section" className="badge-purple">{t('sections.openDoors')}</a>
            )}
            {landingpage.open_data_visible && (
              <a href="#open-data-section" className="badge-purple">{t('sections.openData')}</a>
            )}
            {landingpage.open_office_visible && (
              <a href="#open-office-section" className="badge-purple">{t('sections.openOffice')}</a>
            )}
            {landingpage.open_diversity_visible && (
              <a href="#open-diversity-section" className="badge-purple">{t('sections.openDiversity')}</a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
