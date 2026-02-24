'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'


export default function SupportCareMavenPage() {
  const t = useTranslations('support_care.maven')

  return (
    <div className="relative">
      <div className="container pb-40">
        <div className="max-w-5xl mx-auto prose prose-p:text-blue prose-headings:text-blue text-blue relative z-10">
          <div className="flex items-center justify-center pt-16 sm:pt-24">
            <Image
              src="/illustrations/support-care-logos/support-care-maven-logo.svg"
              alt="Support and Care for Apache Maven logo"
              className="w-full"
              width={768}
              height={300}
            />
          </div>
          <p>
            {t.rich('intro1', {
              sta: (chunks) => <a href="https://www.sovereign.tech/de" className="text-purple hover:underline" target="_blank" rel="noopener noreferrer">{t('staLink')}</a>
            })}
          </p>
          <p>
            {t('intro2')}
          </p>
          <p>
            {t('intro3')}
          </p>

          {/* Subscription Packages */}
          <h2 id="our-subscription-model-for-apache-maven" className="scroll-mt-48">
            {t('subscriptionTitle')}
            <a href="#our-subscription-model-for-apache-maven" className="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="mdi-link-variant" className="iconify w-7 h-7 shrink-0 text-lightgray inline iconify--mdi"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.98 2.98 0 0 0 0-4.24a2.98 2.98 0 0 0-4.24 0l-3.53 3.53a2.98 2.98 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.98 2.98 0 0 0 0 4.24a2.98 2.98 0 0 0 4.24 0l3.53-3.53a2.98 2.98 0 0 0 0-4.24a.973.973 0 0 1 0-1.42"></path></svg>
            </a>
          </h2>
          <p className="">
            {t('subscriptionSubtitle')}
          </p>
          

          {/* Subscription Cards */}
          <div className="grid lg:grid-cols-3 lg:max-w-full max-w-sm mx-auto lg:gap-6 gap-9 lg:mt-12 sm:mt-6 mt-4">
            {/* Basic Subscription */}
            <div className="flex flex-col items-center gap-8 justify-between border border-yellow-200/45 rounded-[30px] pb-5 pt-7 px-6 shadow-2xl shadow-yellow-200/20">
                <div className="flex flex-col gap-3 items-center">
                  <div className="bg-yellow-50 inline-block rounded-full px-5 py-2 text-yellow-200 text-center xl:text-lg lg:text-base text-lg font-bold">
                   {t('basic.name')}
                  </div>
                  <Image src="/illustrations/support-care-subscription/basic.svg" 
                  className="size-48 object-contain mt-2 mb-0" alt=""  
                  width={768}
                  height={300} 
                  />
                  <ul className="mt-2 text-sm list-none pl-0 flex flex-col gap-1">
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/yellow-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                         <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet1') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/yellow-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet2') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/yellow-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet3') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/yellow-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet4') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/yellow-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet5') }} />
                      </div>
                    </li>
                     <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/yellow-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet6') }} />
                      </div>
                    </li>
                  </ul>
                </div>
                <Link 
                  href="/contact"
                  className="text-lg w-full font-bold no-underline text-white text-center bg-yellow-300 rounded-full px-4 py-2 hover:bg-yellow-400 transition-all ease-in-out duration-150 active:shadow-none hover:shadow-6">
                  {t('contactUs')}
                </Link>
            </div>
            {/* Standard Subscription */}
            <div className="flex flex-col items-center gap-8 justify-between border border-green/45 rounded-[30px] pb-5 pt-7 px-6 shadow-2xl shadow-green/20">
                <div className="flex flex-col gap-3 items-center">
                  <div className="bg-green-50 inline-block rounded-full px-5 py-2 text-green text-center xl:text-lg lg:text-base text-lg font-bold">
                    {t('standard.name')}
                  </div>
                  <Image src="/illustrations/support-care-subscription/standard.svg" 
                  className="size-48 object-contain mt-2 mb-0" alt=""  
                  width={768}
                  height={300} 
                  />
                  <ul className="mt-2 text-sm list-none pl-0 flex flex-col gap-1">
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/green-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet1') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/green-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet2') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/green-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet3') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/green-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet4') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/green-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet5') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/green-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet6') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/green-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet7') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/green-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet8') }} />
                      </div>
                    </li>
                  </ul>
                </div>
                <Link 
                  href="/contact"
                  className="text-lg w-full no-underline font-bold text-white text-center bg-green rounded-full px-4 py-2 hover:bg-green-300 transition-all ease-in-out duration-150 hover:shadow-7 active:shadow-none">
                  {t('contactUs')}
                </Link>
            </div>
            {/* Premium Subscription */}
            <div className="flex flex-col items-center gap-8 justify-between border border-sky/45 rounded-[30px] pb-5 pt-7 px-6 shadow-2xl shadow-sky/20">
                <div className="flex flex-col gap-3 items-center">
                  <div className="bg-sky-100 inline-block rounded-full px-5 py-2 text-sky text-center xl:text-lg lg:text-base text-lg font-bold">
                    {t('premium.name')}
                  </div>
                  <Image src="/illustrations/support-care-subscription/premium.svg" 
                  className="size-48 object-contain mt-2 mb-0" alt=""  
                  width={768}
                  height={300} 
                  />
                  <ul className="mt-2 text-sm list-none pl-0 flex flex-col gap-1">
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/blue-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet1') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/blue-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet2') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/blue-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet3') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/blue-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet4') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/blue-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet5') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/blue-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet6') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/blue-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet7') }} />
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-2">
                        <Image src="/illustrations/general/blue-checkmark.svg" 
                          className="size-4 shrink-0 mt-0.5 mb-0" alt=""
                          width={16}
                          height={16}
                          />
                        <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet8') }} />
                      </div>
                    </li>
                  </ul>
                </div>
                <Link 
                  href="/contact"
                  className="text-lg w-full no-underline font-bold text-white text-center bg-sky rounded-full px-4 py-2 hover:bg-sky-200 transition-all ease-in-out duration-150 hover:shadow-8 active:shadow-none">
                  {t('contactUs')}
                </Link>
            </div>
          </div>
          <p className="text-center font-bold">
            {t('closingStatement')}
          </p>


          {/* STA Support Section */}
          <h2 id="support-from-the-sovereign-tech-agency" className="scroll-mt-48">
            {t('staTitle')}
            <a href="#support-from-the-sovereign-tech-agency" className="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="mdi-link-variant" className="iconify w-7 h-7 shrink-0 text-lightgray inline iconify--mdi"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.98 2.98 0 0 0 0-4.24a2.98 2.98 0 0 0-4.24 0l-3.53 3.53a2.98 2.98 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.98 2.98 0 0 0 0 4.24a2.98 2.98 0 0 0 4.24 0l3.53-3.53a2.98 2.98 0 0 0 0-4.24a.973.973 0 0 1 0-1.42"></path></svg>
            </a>
          </h2>
          <p>
            {t('sta1')}
          </p>
          <p>
            {t('sta2')}
          </p>
          <Image
            src="/support-care-maven/diagram-1.png"
            alt="How Support and Care for Apache Maven is paid"
            className="w-full"
            width={900}
            height={500}
          />


          {/* Who Works Section */}
          <h2 id="who-works-on-support--care-for-apache-maven" className="scroll-mt-48">
            {t('whoWorksTitle')}
            <a href="#who-works-on-support--care-for-apache-maven" className="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="mdi-link-variant" className="iconify w-7 h-7 shrink-0 text-lightgray inline iconify--mdi"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.98 2.98 0 0 0 0-4.24a2.98 2.98 0 0 0-4.24 0l-3.53 3.53a2.98 2.98 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.98 2.98 0 0 0 0 4.24a2.98 2.98 0 0 0 4.24 0l3.53-3.53a2.98 2.98 0 0 0 0-4.24a.973.973 0 0 1 0-1.42"></path></svg>
            </a>
          </h2>
          <p>
              {t('whoWorks')}
          </p>
          

          {/* Model Project Section */}
          <h2 id="a-model-project-for-open-source" className="scroll-mt-48">
            {t('modelTitle')}
            <a href="#a-model-project-for-open-source" className="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="mdi-link-variant" className="iconify w-7 h-7 shrink-0 text-lightgray inline iconify--mdi"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.98 2.98 0 0 0 0-4.24a2.98 2.98 0 0 0-4.24 0l-3.53 3.53a2.98 2.98 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.98 2.98 0 0 0 0 4.24a2.98 2.98 0 0 0 4.24 0l3.53-3.53a2.98 2.98 0 0 0 0-4.24a.973.973 0 0 1 0-1.42"></path></svg>
            </a>
          </h2>
           <p>
              {t('model1')}
            </p>
            <p>
              {t('model2')}
            </p>
            <Image
              src="/illustrations/general/many-care-tree.svg"
              alt="More people start to care"
              className="w-full max-w-2xl mx-auto"
              width={768}
              height={400}
            />


            {/* Footnotes Section */}
            <h2 id="footnotes--service-information" className="scroll-mt-48">
              {t('footnotesTitle')}
              <a href="#footnotes--service-information" className="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="mdi-link-variant" className="iconify w-7 h-7 shrink-0 text-lightgray inline iconify--mdi"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.98 2.98 0 0 0 0-4.24a2.98 2.98 0 0 0-4.24 0l-3.53 3.53a2.98 2.98 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.98 2.98 0 0 0 0 4.24a2.98 2.98 0 0 0 4.24 0l3.53-3.53a2.98 2.98 0 0 0 0-4.24a.973.973 0 0 1 0-1.42"></path></svg>
              </a>
            </h2>
             <p>
              {t('trademark')}
            </p>
            <p dangerouslySetInnerHTML={{ __html: '<sup>1</sup>' + t('footnote1') }} />
            <p dangerouslySetInnerHTML={{ __html: '<sup>2</sup>' + t('footnote2') }} />
            <p dangerouslySetInnerHTML={{ __html: '<sup>3</sup>' + t('footnote3') }} />
            <p dangerouslySetInnerHTML={{ __html: '<sup>4</sup>' + t('footnote4') }} />
            <p dangerouslySetInnerHTML={{ __html: '<sup>5</sup>' + t('footnote5') }} />

        </div>

        {/* Decorative Circles at Bottom */}
        <div className="absolute sm:block hidden bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-70">
          <Image
            className="w-96 h-96"
            src="/illustrations/round-1.svg"
            alt=""
            width={384}
            height={384}
          />
          <Image
            className="w-64 h-64"
            src="/illustrations/round-1.svg"
            alt=""
            width={256}
            height={256}
          />
        </div>
      </div>     
    </div>
  )
}
