'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function SupportCareMavenPage() {
  const t = useTranslations('support_care.maven')
  
  return (
    <div className="pb-40">
      <div className="absolute top-0 left-0 w-full h-40  -z-10 overflow-hidden">
        <Image
          src="/illustrations/hero-bg-2.svg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center pt-16 sm:pt-24 pb-8 sm:pb-12">
            <Image
              src="/illustrations/support-care-logos/support-care-maven-logo.svg"
              alt="Support and Care for Apache Maven logo"
              className="w-full max-w-2xl"
              width={768}
              height={300}
            />
          </div>

          <div className="relative flex flex-col mt-8 text-base leading-7 gap-6 text-blue">
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
          </div>
        </div>
      </div>

      {/* Subscription Packages */}
      <div className="container mt-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-blue mb-12">
            {t('subscriptionTitle')}
          </h2>
          <p className="text-center text-blue mb-12 max-w-3xl mx-auto">
            {t('subscriptionSubtitle')}
          </p>

          {/* Subscription Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Basic Subscription */}
            <div className="bg-gray-100 rounded-[30px] shadow-lg p-6 pb-9 flex flex-col h-full">
              <h3 className="text-lg font-bold text-center text-blue mb-6">{t('basic.name')}</h3>
              <ul className="space-y-3 mb-8 flex-grow text-blue text-sm leading-6">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet1') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet2') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet3') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('basic.bullet4')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('basic.bullet5') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('basic.bullet6')}</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-purple rounded-full hover:bg-purple-700 hover:shadow-lg transition-all active:shadow-none active:bg-purple"
              >
                {t('contactUs')}
              </Link>
            </div>

            {/* Standard Subscription */}
            <div className="bg-gray-100 rounded-[30px] shadow-lg p-6 pb-9 flex flex-col h-full border-2 border-purple">
              <h3 className="text-lg font-bold text-center text-blue mb-6">{t('standard.name')}</h3>
              <ul className="space-y-3 mb-8 flex-grow text-blue text-sm leading-6">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet1') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet2') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet3') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('standard.bullet4')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet5') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('standard.bullet6')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('standard.bullet7')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('standard.bullet8') }} />
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-purple rounded-full hover:bg-purple-700 hover:shadow-lg transition-all active:shadow-none active:bg-purple"
              >
                {t('contactUs')}
              </Link>
            </div>

            {/* Premium Subscription */}
            <div className="bg-gray-100 rounded-[30px] shadow-lg p-6 pb-9 flex flex-col h-full">
              <h3 className="text-lg font-bold text-center text-blue mb-6">{t('premium.name')}</h3>
              <ul className="space-y-3 mb-8 flex-grow text-blue text-sm leading-6">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet1') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('premium.bullet2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet3') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('premium.bullet4')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet5') }} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('premium.bullet6')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>{t('premium.bullet7')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: t.raw('premium.bullet8') }} />
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-purple rounded-full hover:bg-purple-700 hover:shadow-lg transition-all active:shadow-none active:bg-purple"
              >
                {t('contactUs')}
              </Link>
            </div>
          </div>

          <p className="text-center text-blue mt-12 text-lg">
            {t('closingStatement')}
          </p>
        </div>
      </div>

      {/* STA Support Section */}
      <div className="container mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue mb-8">
            {t('staTitle')}
          </h2>
          <div className="flex flex-col gap-6 text-base leading-7 text-blue">
            <p>
              {t('sta1')}
            </p>
            <p>
              {t('sta2')}
            </p>
          </div>

          {/* How Support is Paid Illustration */}
          <div className="flex justify-center mt-12">
            <Image
              src="/support-care-maven/diagram.png"
              alt="How Support and Care for Apache Maven is paid"
              className="w-full max-w-3xl"
              width={900}
              height={500}
            />
          </div>
        </div>
      </div>

      {/* Who Works Section */}
      <div className="container mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue mb-8">
            {t('whoWorksTitle')}
          </h2>
          <div className="flex flex-col gap-6 text-base leading-7 text-blue">
            <p>
              {t('whoWorks')}
            </p>
          </div>
        </div>
      </div>

      {/* Model Project Section */}
      <div className="container mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue mb-8">
            {t('modelTitle')}
          </h2>
          <div className="flex flex-col gap-6 text-base leading-7 text-blue mb-12">
            <p>
              {t('model1')}
            </p>
            <p>
              {t('model2')}
            </p>
          </div>
          
          {/* Care Tree Illustration */}
          <div className="flex justify-center mt-12">
            <Image
              src="/illustrations/general/many-care-tree.svg"
              alt="More people start to care"
              className="w-full max-w-2xl"
              width={768}
              height={400}
            />
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="container mt-16 mb-20">
        <div className="flex items-center w-full h-full mx-auto">
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center w-full max-w-xs gap-3 px-4 py-3.5 mx-auto text-base font-bold text-center text-white capitalize transition-all duration-150 ease-in-out rounded-full bg-purple sm:px-6 hover:bg-purple-700 hover:shadow-3 active:shadow-none active:bg-purple"
          >
            <Image src="/icons/call.svg" alt="Call icon" width={20} height={20} />
            {t('contactUs')}
          </Link>
        </div>
      </div>

      {/* Footnotes Section */}
      <div className="container mt-20 mb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue mb-8">
            {t('footnotesTitle')}
          </h2>
          <div className="flex flex-col gap-4 text-sm leading-6 text-blue">
            <p>
              {t('trademark')}
            </p>
            <p dangerouslySetInnerHTML={{ __html: '<sup>1</sup>' + t('footnote1') }} />
            <p dangerouslySetInnerHTML={{ __html: '<sup>2</sup>' + t('footnote2') }} />
            <p dangerouslySetInnerHTML={{ __html: '<sup>3</sup>' + t('footnote3') }} />
            <p dangerouslySetInnerHTML={{ __html: '<sup>4</sup>' + t('footnote4') }} />
            <p dangerouslySetInnerHTML={{ __html: '<sup>5</sup>' + t('footnote5') }} />
          </div>
        </div>
      </div>

      {/* Decorative Circles at Bottom */}
      <div className="absolute bottom-20 left-0 w-full overflow-hidden pointer-events-none">
        <Image
          className="absolute -left-32 w-96 h-96"
          src="/illustrations/round-1.svg"
          alt=""
          width={384}
          height={384}
        />
        <Image
          className="absolute right-0 -bottom-20 w-64 h-64"
          src="/illustrations/round-2.svg"
          alt=""
          width={256}
          height={256}
        />
      </div>
    </div>
  )
}
