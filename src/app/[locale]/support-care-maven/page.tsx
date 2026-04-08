'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function SupportCareMavenPage() {
  const t = useTranslations('support_care.landingpage');
  const tm = useTranslations('support_care.maven');

  return (
    <div className="relative">
      <div className="container pb-40">
        <div className="max-w-5xl mx-auto prose prose-p:text-blue prose-headings:text-blue text-blue relative z-10">
          {/* Hero Section */}
          <div className="flex items-center justify-center pt-16 sm:pt-24">
            <Image
              src="/support-care-maven/support-and-care-logo.svg"
              alt={t('logoAlt')}
              className="w-4/5"
              width={768}
              height={200}
            />
          </div>
          <div className="text-center mb-6">
            <p
              className="text-[1.2rem] max-w-[900px] mx-auto mb-4 leading-relaxed"
              style={{ color: '#5CBA9E', fontWeight: 400 }}>
              {t('heroParagraph')}
            </p>
            {/* Component logos row */}
            <div className="flex flex-wrap justify-center items-center gap-5 mx-auto mb-5">
              <Image
                src="/support-care-maven/component-logos/eclipse-temurin.svg"
                alt="Eclipse Temurin"
                width={225}
                height={48}
                className="h-7 w-auto opacity-70 my-0"
              />
              <Image
                src="/support-care-maven/component-logos/apache-maven.svg"
                alt="Apache Maven"
                width={190}
                height={48}
                className="h-7 w-auto opacity-70 my-0"
              />
              <Image
                src="/support-care-maven/component-logos/junit.svg"
                alt="JUnit"
                width={169}
                height={48}
                className="h-7 w-auto opacity-70 my-0"
              />
              <Image
                src="/support-care-maven/component-logos/apache-log4j.png"
                alt="Apache Log4j"
                width={116}
                height={48}
                className="h-7 w-auto opacity-70 my-0"
              />
              <Image
                src="/support-care-maven/component-logos/apache-commons.svg"
                alt="Apache Commons"
                width={110}
                height={48}
                className="h-7 w-auto opacity-70 my-0"
              />
            </div>
            <p className="text-base mx-auto mb-6 leading-relaxed">
              {t('heroBody')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-3 px-6 py-3.5 text-lg font-bold text-white text-center bg-sky rounded-full transition-all duration-150 ease-in-out hover:bg-sky-200 hover:shadow-lg no-underline"
                style={{ color: 'white' }}>
                {t('heroContact')}
              </Link>
              <Link
                href="#our-services"
                className="inline-flex shrink-0 items-center justify-center gap-3 px-6 py-3.5 text-lg font-bold text-white text-center bg-sky rounded-full transition-all duration-150 ease-in-out hover:bg-sky-200 hover:shadow-lg no-underline"
                style={{ color: 'white' }}>
                {t('heroDiscover')}
              </Link>
            </div>
          </div>

          <hr className="border-t-2 border-gray-200 w-2/5 mx-auto my-10" />

          {/* The Problem Section */}
          <h2 id="the-problem" className="scroll-mt-48">
            {t('problemTitle')}
          </h2>
          <p>{t('problemP1')}</p>
          <div
            className="bg-blue-50 border-l-4 border-sky-300 rounded-lg px-6 py-5 my-6 text-[1.1rem]"
            style={{
              backgroundColor: '#DFF1FD',
              borderColor: '#5DB9F5',
              color: '#020144',
              fontWeight: 600,
            }}>
            {t('problemHighlight')}
          </div>
          <p>{t('problemP2')}</p>
          <p>
            <strong>{t('problemBulletTitle')}</strong>
          </p>
          <ul>
            <li>{t('problemBullet1')}</li>
            <li>
              {t('problemBullet2').split('Log4Shell')[0]}
              <a
                href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Cyber-Sicherheitslage/Schwachstelle-log4Shell-Java-Bibliothek/log4j_node.html"
                target="_blank"
                rel="noopener"
                className="text-purple-700 hover:underline">
                {t('problemBullet2Link')}
              </a>
              {t('problemBullet2').split('Log4Shell')[1]}
            </li>
            <li>{t('problemBullet3')}</li>
          </ul>

          {/* Supported Components Section */}
          <h2 id="supported-components" className="scroll-mt-48">
            {t('componentsTitle')}
          </h2>
          <p>{t('componentsIntro')}</p>

          <div className="flex flex-wrap justify-center gap-8 my-8 not-prose">
            {[
              {
                img: '/support-care-maven/component-logos/eclipse-temurin.svg',
                name: t('temurin.name'),
                desc: t('temurin.desc'),
                alt: 'Eclipse Temurin',
                width: 225,
              },
              {
                img: '/support-care-maven/component-logos/apache-maven.svg',
                name: t('maven.name'),
                desc: t('maven.desc'),
                alt: 'Apache Maven',
                width: 190,
              },
              {
                img: '/support-care-maven/component-logos/junit.svg',
                name: t('junit.name'),
                desc: t('junit.desc'),
                alt: 'JUnit',
                width: 169,
              },
              {
                img: '/support-care-maven/component-logos/apache-log4j.png',
                name: t('log4j.name'),
                desc: t('log4j.desc'),
                alt: 'Apache Log4j',
                width: 116,
              },
              {
                img: '/support-care-maven/component-logos/apache-commons.svg',
                name: t('commons.name'),
                desc: t('commons.desc'),
                alt: 'Apache Commons',
                width: 110,
              },
            ].map(comp => (
              <div
                key={comp.alt}
                className="text-center p-6 border border-gray-200 rounded-2xl w-80 flex-shrink-0">
                <Image
                  src={comp.img}
                  alt={comp.alt}
                  width={comp.width}
                  height={48}
                  className="h-12 w-auto mx-auto mb-4 object-contain"
                />
                <strong className="block text-[0.95rem] text-blue">
                  {comp.name}
                </strong>
                <p
                  className="mt-3 text-[0.9rem] leading-relaxed text-blue"
                  dangerouslySetInnerHTML={{ __html: comp.desc }}
                />
              </div>
            ))}
          </div>

          <div
            className="bg-blue-50 border-l-4 border-sky-300 rounded-lg px-6 py-5 my-6 text-[1.1rem]"
            style={{
              backgroundColor: '#DFF1FD',
              borderColor: '#5DB9F5',
              color: '#020144',
              fontWeight: 600,
            }}>
            {t('componentsHighlight')}
          </div>

          {/* Where Support & Care Steps In */}
          <h2 id="where-support-care-steps-in" className="scroll-mt-48">
            {t('layersTitle')}
          </h2>
          <p>{t('layersIntro')}</p>

          <div className="flex items-center justify-center my-6">
            <Image
              src="/support-care-maven/pyramid.png"
              alt={t('pyramidAlt')}
              className="w-3/5"
              width={1902}
              height={1496}
            />
          </div>

          <ol>
            <li>
              <strong>{t('layer1')}</strong>
              <br />
              {t('layer1Desc')}
            </li>
            <li>
              <strong>{t('layer2')}</strong>
              <br />
              {t('layer2Desc')}
            </li>
            <li>
              <strong>{t('layer3')}</strong>
              <br />
              {t('layer3Desc')}
            </li>
          </ol>

          <div
            className="bg-blue-50 border-l-4 border-sky-300 rounded-lg px-6 py-5 my-6 text-[1.1rem]"
            style={{
              backgroundColor: '#DFF1FD',
              borderColor: '#5DB9F5',
              color: '#020144',
              fontWeight: 600,
            }}>
            {t('layersHighlight').split('Log4Shell')[0]}
            <a
              href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Cyber-Sicherheitslage/Schwachstelle-log4Shell-Java-Bibliothek/log4j_node.html"
              target="_blank"
              rel="noopener"
              className="text-purple-700 hover:underline">
              Log4Shell
            </a>
            {t('layersHighlight').split('Log4Shell')[1]}
          </div>

          {/* Our Services Section */}
          <h2 id="our-services" className="scroll-mt-48">
            {t('servicesTitle')}
          </h2>
          <p>{t('servicesIntro')}</p>

          <div className="flex flex-wrap justify-center gap-8 my-8 not-prose">
            {[
              {
                img: '/support-care-maven/services-pictograms/long-term-support.svg',
                name: t('lts.name'),
                desc: t('lts.desc'),
              },
              {
                img: '/support-care-maven/services-pictograms/security.svg',
                name: t('security.name'),
                desc: t('security.desc'),
              },
              {
                img: '/support-care-maven/services-pictograms/documentation.svg',
                name: t('documentation.name'),
                desc: t('documentation.desc'),
              },
              {
                img: '/support-care-maven/services-pictograms/workshops.svg',
                name: t('workshops.name'),
                desc: t('workshops.desc'),
              },
              {
                img: '/support-care-maven/services-pictograms/workshops.svg',
                name: t('webinars.name'),
                desc: t('webinars.desc'),
              },
              {
                img: '/support-care-maven/services-pictograms/custom-containers.svg',
                name: t('customBuilds.name'),
                desc: t('customBuilds.desc'),
              },
            ].map(svc => (
              <div
                key={svc.name}
                className="text-center p-6 border border-gray-200 rounded-2xl w-80 flex-shrink-0">
                <Image
                  src={svc.img}
                  alt={svc.name}
                  width={96}
                  height={96}
                  className="h-24 mx-auto mb-4 object-contain"
                />
                <strong className="block text-[0.95rem] text-blue">
                  {svc.name}
                </strong>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-blue">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CRA Section */}
          <h3 id="cra" className="scroll-mt-48">
            {t('craTitle')}
          </h3>
          <p>{t('craP1')}</p>
          <p>
            <strong>{t('craBulletTitle')}</strong>
          </p>
          <ul>
            <li>{t('craBullet1')}</li>
            <li>{t('craBullet2')}</li>
            <li>{t('craBullet3')}</li>
            <li>{t('craBullet4')}</li>
            <li>{t('craBullet5')}</li>
            <li>{t('craBullet6')}</li>
          </ul>
          <div
            className="bg-blue-50 border-l-4 border-sky-300 rounded-lg px-6 py-5 my-6 text-[1.1rem]"
            style={{
              backgroundColor: '#DFF1FD',
              borderColor: '#5DB9F5',
              color: '#020144',
              fontWeight: 600,
            }}>
            {t('craHighlight')}
          </div>

          {/* Hardened Containers Section */}
          <h3 id="hardened-containers" className="scroll-mt-48">
            {t('containersTitle')}
          </h3>
          <p>{t('containersP1')}</p>
          <p>{t('containersP2')}</p>
          <p>
            <strong>{t('containersBulletTitle')}</strong>
          </p>
          <ul>
            <li>{t('containersBullet1')}</li>
            <li>{t('containersBullet2')}</li>
            <li>{t('containersBullet3')}</li>
            <li>{t('containersBullet4')}</li>
            <li>{t('containersBullet5')}</li>
          </ul>

          <div className="flex items-center justify-center my-6">
            <Image
              src="/support-care-maven/oe-delivers-container.png"
              alt={t('containersImgAlt')}
              className="w-3/5"
              width={3330}
              height={1218}
            />
          </div>
          <p className="text-center text-sm text-gray-500 -mt-4">
            {t('containersImgAlt')}
          </p>

          {/* Our Model Section */}
          <h2 id="our-model" className="scroll-mt-48">
            {t('modelTitle')}
          </h2>
          <p>{t('modelP1')}</p>
          <p>{t('modelSubtitle')}</p>
          <ul>
            <li>
              <strong>1.</strong> {t('modelPrinciple1')}
            </li>
            <li>
              <strong>2.</strong> {t('modelPrinciple2')}
            </li>
            <li>
              <strong>3.</strong> {t('modelPrinciple3')}
              <ul>
                <li>{t('modelBullet1')}</li>
                <li>{t('modelBullet2')}</li>
                <li>{t('modelBullet3')}</li>
                <li>{t('modelBullet4')}</li>
              </ul>
            </li>
          </ul>

          <div
            className="bg-blue-50 border-l-4 border-sky-300 rounded-lg px-6 py-5 my-6 text-[1.1rem]"
            style={{
              backgroundColor: '#DFF1FD',
              borderColor: '#5DB9F5',
              color: '#020144',
              fontWeight: 600,
            }}>
            {t('modelHighlight')}
          </div>

          <p>{t('modelP2')}</p>

          {/* Subscription Packages */}
          <div className="grid lg:grid-cols-3 lg:max-w-full max-w-sm mx-auto lg:gap-6 gap-9 lg:mt-12 sm:mt-6 mt-4 not-prose">
            {/* Basic Subscription */}
            <div className="flex flex-col items-center gap-8 justify-between border border-yellow-200/45 rounded-[30px] pb-5 pt-7 px-6 shadow-2xl shadow-yellow-200/20">
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-yellow-50 inline-block rounded-full px-5 py-2 text-yellow-200 text-center xl:text-lg lg:text-base text-lg font-bold">
                  {tm('basic.name')}
                </div>
                <Image
                  src="/illustrations/support-care-subscription/basic.svg"
                  className="size-48 object-contain mt-2 mb-0"
                  alt=""
                  width={800}
                  height={800}
                />
                <ul className="mt-2 text-sm list-none pl-0 flex flex-col gap-1">
                  {[
                    'bullet1',
                    'bullet2',
                    'bullet3',
                    'bullet4',
                    'bullet5',
                    'bullet6',
                  ].map(b => (
                    <li key={b}>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/illustrations/general/yellow-checkmark.svg"
                          className="size-4 shrink-0 mt-0.5 mb-0"
                          alt=""
                          width={16}
                          height={16}
                        />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: tm.raw(`basic.${b}`),
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="text-lg w-full font-bold no-underline text-white text-center bg-yellow-300 rounded-full px-4 py-2 hover:bg-yellow-400 transition-all ease-in-out duration-150 active:shadow-none hover:shadow-md">
                {tm('contactUs')}
              </Link>
            </div>
            {/* Standard Subscription */}
            <div className="flex flex-col items-center gap-8 justify-between border border-green/45 rounded-[30px] pb-5 pt-7 px-6 shadow-2xl shadow-green/20">
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-green-50 inline-block rounded-full px-5 py-2 text-green text-center xl:text-lg lg:text-base text-lg font-bold">
                  {tm('standard.name')}
                </div>
                <Image
                  src="/illustrations/support-care-subscription/standard.svg"
                  className="size-48 object-contain mt-2 mb-0"
                  alt=""
                  width={800}
                  height={800}
                />
                <ul className="mt-2 text-sm list-none pl-0 flex flex-col gap-1">
                  {[
                    'bullet1',
                    'bullet2',
                    'bullet3',
                    'bullet4',
                    'bullet5',
                    'bullet6',
                    'bullet7',
                    'bullet8',
                  ].map(b => (
                    <li key={b}>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/illustrations/general/green-checkmark.svg"
                          className="size-4 shrink-0 mt-0.5 mb-0"
                          alt=""
                          width={16}
                          height={16}
                        />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: tm.raw(`standard.${b}`),
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="text-lg w-full no-underline font-bold text-white text-center bg-green rounded-full px-4 py-2 hover:bg-green-300 transition-all ease-in-out duration-150 hover:shadow-md active:shadow-none">
                {tm('contactUs')}
              </Link>
            </div>
            {/* Premium Subscription */}
            <div className="flex flex-col items-center gap-8 justify-between border border-sky/45 rounded-[30px] pb-5 pt-7 px-6 shadow-2xl shadow-sky/20">
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-sky-100 inline-block rounded-full px-5 py-2 text-sky text-center xl:text-lg lg:text-base text-lg font-bold">
                  {tm('premium.name')}
                </div>
                <Image
                  src="/illustrations/support-care-subscription/premium.svg"
                  className="size-48 object-contain mt-2 mb-0"
                  alt=""
                  width={800}
                  height={800}
                />
                <ul className="mt-2 text-sm list-none pl-0 flex flex-col gap-1">
                  {[
                    'bullet1',
                    'bullet2',
                    'bullet3',
                    'bullet4',
                    'bullet5',
                    'bullet6',
                    'bullet7',
                    'bullet8',
                  ].map(b => (
                    <li key={b}>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/illustrations/general/blue-checkmark.svg"
                          className="size-4 shrink-0 mt-0.5 mb-0"
                          alt=""
                          width={16}
                          height={16}
                        />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: tm.raw(`premium.${b}`),
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="text-lg w-full no-underline font-bold text-white text-center bg-sky rounded-full px-4 py-2 hover:bg-sky-200 transition-all ease-in-out duration-150 hover:shadow-md active:shadow-none">
                {tm('contactUs')}
              </Link>
            </div>
          </div>

          {/* Why Open Elements */}
          <h2 id="why-open-elements" className="scroll-mt-48 mt-16">
            {t('whyTitle')}
          </h2>
          <p>{t('whyP1')}</p>

          <div className="flex flex-wrap justify-center gap-8 my-8 not-prose">
            <Link
              href="/about-hendrik/"
              className="text-center w-44 no-underline"
              style={{ color: 'inherit' }}>
              <Image
                src="/team/hendrik.jpg"
                alt="Hendrik Ebbers"
                width={120}
                height={120}
                className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-3 border-[3px] border-[#5DB9F5]"
              />
              <strong className="block text-[0.95rem] text-blue">
                Hendrik Ebbers
              </strong>
              <span className="text-[0.8rem]" style={{ color: '#5CBA9E' }}>
                {t('hendrikRole')}
              </span>
            </Link>
            <Link
              href="/employees/sandra"
              className="text-center w-44 no-underline"
              style={{ color: 'inherit' }}>
              <Image
                src="/team/sandra.jpg"
                alt="Sandra Parsick"
                width={120}
                height={120}
                className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-3 border-[3px] border-[#5DB9F5]"
              />
              <strong className="block text-[0.95rem] text-blue">
                Sandra Parsick
              </strong>
              <span className="text-[0.8rem]" style={{ color: '#5CBA9E' }}>
                {t('sandraRole')}
              </span>
            </Link>
            <Link
              href="/employees/sebastian"
              className="text-center w-44 no-underline"
              style={{ color: 'inherit' }}>
              <Image
                src="/team/sebastian.jpg"
                alt="Sebastian Tiemann"
                width={120}
                height={120}
                className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-3 border-[3px] border-[#5DB9F5]"
              />
              <strong className="block text-[0.95rem] text-blue">
                Sebastian Tiemann
              </strong>
              <span className="text-[0.8rem]" style={{ color: '#5CBA9E' }}>
                {t('sebastianRole')}
              </span>
            </Link>
          </div>

          <p>{t('whyP2')}</p>

          <div className="flex flex-wrap justify-center gap-8 my-8 not-prose">
            {[
              {
                img: '/support-care-maven/foundation-logos/eclipse.png',
                name: 'Eclipse Foundation',
                desc: t('eclipseDesc'),
                imgWidth: 180,
                imgHeight: 64,
              },
              {
                img: '/support-care-maven/foundation-logos/lf.svg',
                name: 'Linux Foundation',
                desc: t('lfDesc'),
                imgWidth: 120,
                imgHeight: 64,
              },
              {
                img: '/support-care-maven/foundation-logos/afs.svg',
                name: 'Apache Software Foundation',
                desc: t('asfDesc'),
                imgWidth: 120,
                imgHeight: 64,
              },
            ].map(f => (
              <div
                key={f.name}
                className="text-center p-6 border border-gray-200 rounded-2xl w-80 flex-shrink-0">
                <Image
                  src={f.img}
                  alt={f.name}
                  width={f.imgWidth}
                  height={f.imgHeight}
                  className="h-16 mx-auto mb-4 object-contain"
                />
                <strong className="block text-[0.95rem] text-blue">
                  {f.name}
                </strong>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-blue">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="bg-blue-50 border-l-4 border-sky-300 rounded-lg px-6 py-5 my-6 text-[1.1rem]"
            style={{
              backgroundColor: '#DFF1FD',
              borderColor: '#5DB9F5',
              color: '#020144',
              fontWeight: 600,
            }}>
            {t('whyHighlight')}
          </div>

          {/* FAQ Section */}
          <h2 id="faq" className="scroll-mt-48">
            {t('faqTitle')}
          </h2>

          <div className="flex flex-col gap-4 my-8 not-prose">
            {[
              { q: t('faq1Q'), a: t('faq1A') },
              { q: t('faq2Q'), a: t('faq2A') },
              { q: t('faq3Q'), a: t('faq3A') },
              { q: t('faq4Q'), a: t('faq4A') },
              { q: t('faq5Q'), a: t('faq5A') },
              { q: t('faq6Q'), a: t('faq6A') },
              { q: t('faq7Q'), a: t('faq7A') },
            ].map((faq, i) => (
              <details
                key={i}
                className="border border-gray-200 rounded-xl px-6 py-5 cursor-pointer">
                <summary
                  style={{
                    color: '#020144',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                  }}>
                  {faq.q}
                </summary>
                <p className="mt-3 leading-relaxed text-blue">{faq.a}</p>
              </details>
            ))}
          </div>

          {/* CTA Section */}
          <h2 id="get-in-touch" className="scroll-mt-48">
            {t('ctaTitle')}
          </h2>
          <p>{t('ctaP1')}</p>

          <div className="flex justify-center my-6">
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 px-6 py-3.5 text-lg font-bold text-white text-center bg-sky rounded-full transition-all duration-150 ease-in-out hover:bg-sky-200 hover:shadow-lg no-underline"
              style={{ color: 'white' }}>
              {t('ctaContact')}
            </Link>
          </div>

          {/* Footnotes */}
          <hr className="border-t border-gray-200 mt-12 mb-6" />
          <div className="text-xs text-gray-500 leading-8 not-prose">
            <sup>1</sup> {t('footnote1')}
            <br />
            <sup>2</sup> {t('footnote2')}
            <br />
            <sup>3</sup> {t('footnote3')}
            <br />
            <sup>4</sup> {t('footnote4')}
            <br />
            <sup>5</sup> {t('footnote5')}
          </div>
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
  );
}
