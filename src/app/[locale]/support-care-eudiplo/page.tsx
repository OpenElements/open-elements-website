import Image from 'next/image';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

interface EudiploPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const ASSETS = '/support-care/eudiplo';
const EUDIPLO_URL = 'https://eudiplo.dev';
const EUDIPLO_GITHUB_URL = 'https://github.com/EUDIPLO/eudiplo';

const TECH_TAGS = [
  'OID4VCI',
  'OID4VP',
  'SD-JWT VC',
  'mDOC (ISO 18013-5)',
  'Token Status List',
];

const FEATURE_KEYS = ['issuance', 'conformance', 'docker', 'license'] as const;

const OFFER_ITEMS = [
  { key: 'support', icon: 'technical-support.svg' },
  { key: 'integration', icon: 'integration.svg' },
  { key: 'development', icon: 'development.svg' },
  { key: 'security', icon: 'security.svg' },
] as const;

const WHY_US_KEYS = [
  'contributors',
  'standards',
  'governance',
  'openSource',
] as const;

const STEPS = [
  { key: 'intro', border: 'border-green' },
  { key: 'scope', border: 'border-sky' },
  { key: 'start', border: 'border-yellow' },
] as const;

const FAQ_KEYS = ['cost', 'hosting', 'fork', 'languages'] as const;

// Shared style fragments
const sectionInner = 'max-w-[1240px] mx-auto px-6 sm:px-8';
const h2Class =
  'm-0 font-extrabold text-3xl sm:text-[40px] leading-tight text-blue';
const linkClass =
  'text-blue font-bold underline underline-offset-2 hover:text-[#3E9279] transition-colors';
const pillPrimary =
  'inline-flex items-center justify-center min-h-11 rounded-full bg-green px-7 py-3.5 text-base font-bold text-blue no-underline transition-colors hover:bg-green-200';

function ExternalLink({
  href,
  children,
  className = linkClass,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}>
      {children}
    </a>
  );
}

function DoubleArrow({ width }: { width: number }) {
  const end = width - 10;
  return (
    <svg
      width={width}
      height="16"
      viewBox={`0 0 ${width} 16`}
      aria-hidden="true"
      className="max-w-full">
      <path
        d={`M10 8H${end}M10 8l7-6M10 8l7 6M${end} 8l-7-6M${end} 8l-7 6`}
        fill="none"
        stroke="#020144"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: EudiploPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'eudiplo' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [
      'EUDIPLO',
      'EUDI Wallet',
      'OID4VCI',
      'OID4VP',
      'SD-JWT VC',
      'Open Source',
      'Support & Care',
    ],
    openGraph: {
      type: 'website',
      url:
        locale === 'de'
          ? 'https://open-elements.com/de/support-care-eudiplo'
          : 'https://open-elements.com/support-care-eudiplo',
      title: t('metaTitle'),
      description: t('metaDescription'),
      siteName: 'Open Elements',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
  };
}

export default async function EudiploPage({ params }: EudiploPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'eudiplo' });

  const strong = (chunks: ReactNode) => (
    <strong className="text-blue">{chunks}</strong>
  );

  return (
    <div className="bg-white text-black">
      {/* Hero */}
      <section className="bg-blue">
        <div
          className={`${sectionInner} py-16 lg:py-[88px] flex flex-wrap items-center gap-14`}>
          <div className="flex flex-col gap-6 min-w-0 grow-[999] basis-[520px]">
            <span className="self-start rounded-full bg-green px-3.5 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.06em] text-blue">
              {t('hero.badge')}
            </span>
            <h1 className="m-0 text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.08] text-white">
              {t('hero.title')}
            </h1>
            <p className="m-0 max-w-[640px] text-lg sm:text-xl leading-relaxed text-white">
              {t('hero.intro')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className={pillPrimary}>
                {t('hero.ctaPrimary')}
              </Link>
              <ExternalLink
                href={EUDIPLO_URL}
                className="inline-flex items-center justify-center min-h-11 rounded-full border-2 border-white px-[26px] py-3 text-base font-bold text-white no-underline transition-colors hover:bg-white hover:text-blue">
                {t('hero.ctaProject')}
              </ExternalLink>
            </div>
          </div>
          <div className="flex justify-center grow basis-[260px]">
            <div className="flex size-64 sm:size-80 items-center justify-center rounded-full bg-green-100">
              <Image
                src={`${ASSETS}/wallet.svg`}
                alt=""
                aria-hidden="true"
                width={230}
                height={230}
                className="size-44 sm:size-[230px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support & Care banner */}
      <section
        aria-label={t('banner.label')}
        className="bg-green-100 border-b border-green-200">
        <div
          className={`${sectionInner} py-7 flex flex-wrap items-center gap-x-10 gap-y-6`}>
          <Link href="/support-care" className="flex shrink-0 items-center">
            <Image
              src={`${ASSETS}/support-care-logo.svg`}
              alt={t('banner.logoAlt')}
              width={204}
              height={44}
              className="h-11 w-auto"
            />
          </Link>
          <p className="m-0 min-w-0 grow basis-[520px] text-[17px] leading-normal">
            {t.rich('banner.text', { strong })}
          </p>
          <Link
            href="/support-care"
            className="shrink-0 text-[15px] font-bold text-blue underline hover:text-[#3E9279]">
            {t('banner.link')}
          </Link>
        </div>
      </section>

      {/* What is EUDIPLO */}
      <section>
        <div
          className={`${sectionInner} py-16 lg:py-[88px] flex flex-wrap gap-14`}>
          <div className="flex flex-col gap-4 min-w-0 grow basis-[420px]">
            <h2 className={h2Class}>{t('about.title')}</h2>
            <p className="m-0 text-lg leading-relaxed">{t('about.intro')}</p>
            <ul className="mt-2 flex flex-wrap gap-2 list-none p-0">
              {TECH_TAGS.map(tag => (
                <li
                  key={tag}
                  className="rounded-lg bg-sky-100 px-3 py-2 font-mono text-sm text-blue">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              <ExternalLink href={EUDIPLO_URL}>
                {t('about.moreLink')}
              </ExternalLink>
              <ExternalLink href={EUDIPLO_GITHUB_URL}>
                {t('about.githubLink')}
              </ExternalLink>
            </div>
          </div>
          <ul className="m-0 p-0 list-none min-w-0 grow basis-[420px] border-t border-[#e8e6dc]">
            {FEATURE_KEYS.map(key => (
              <li
                key={key}
                className="py-[18px] border-b border-[#e8e6dc] text-[17px] leading-normal">
                {t.rich(`about.features.${key}`, {
                  strong,
                  sprind: chunks => (
                    <ExternalLink href="https://www.sprind.org">
                      {chunks}
                    </ExternalLink>
                  ),
                  lfdt: chunks => (
                    <ExternalLink href="https://www.lfdecentralizedtrust.org">
                      {chunks}
                    </ExternalLink>
                  ),
                })}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Architecture */}
      <section aria-label={t('architecture.label')}>
        <div
          className={`${sectionInner} pb-16 lg:pb-[88px] flex flex-col gap-7`}>
          <h3 className="m-0 text-2xl font-bold text-blue">
            {t('architecture.title')}
          </h3>
          <div className="flex flex-wrap items-stretch gap-4">
            {/* Wallet */}
            <div className="flex min-w-0 grow basis-[200px] flex-col items-center justify-center gap-3 rounded-2xl bg-sky-100 p-6 text-center">
              <Image
                src={`${ASSETS}/wallet.svg`}
                alt=""
                aria-hidden="true"
                width={72}
                height={72}
                className="size-[72px]"
              />
              <strong className="text-lg text-blue">
                {t('architecture.walletTitle')}
              </strong>
              <span className="text-[15px] leading-normal">
                {t('architecture.walletDesc')}
              </span>
            </div>

            {/* Wallet <-> EUDIPLO */}
            <div className="flex min-w-[120px] shrink grow-0 basis-[150px] flex-col items-center justify-center gap-2 text-center">
              <DoubleArrow width={120} />
              <span className="font-mono text-[13px] text-blue">
                {t('architecture.walletProtocol')}
              </span>
              <span className="text-[13px]">
                {t('architecture.walletTransport')}
              </span>
            </div>

            {/* Your infrastructure */}
            <div className="relative flex min-w-0 grow-[3] basis-[560px] flex-wrap items-stretch gap-4 rounded-[20px] border-2 border-dashed border-green px-5 pt-9 pb-5">
              <span className="absolute -top-[13px] left-5 bg-white px-2.5 text-sm font-bold text-[#3E9279]">
                {t('architecture.infraLabel')}
              </span>

              <div className="flex min-w-0 grow basis-[220px] flex-col gap-2.5 rounded-2xl bg-blue p-6 text-white">
                <span className="self-start rounded-full bg-yellow px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-blue">
                  {t('architecture.badge')}
                </span>
                <strong className="text-xl">
                  {t('architecture.eudiploTitle')}
                </strong>
                <span className="text-[15px] leading-normal">
                  {t('architecture.eudiploDesc')}
                </span>
              </div>

              <div className="flex min-w-[110px] shrink grow-0 basis-[130px] flex-col items-center justify-center gap-2 text-center">
                <DoubleArrow width={110} />
                <span className="font-mono text-[13px] text-blue">
                  {t('architecture.apiProtocol')}
                </span>
                <span className="text-[13px]">
                  {t('architecture.apiTransport')}
                </span>
              </div>

              <div className="flex min-w-0 grow basis-[200px] flex-col gap-2.5 rounded-2xl border border-[#e8e6dc] bg-[#F7F6F1] p-6">
                <strong className="text-xl text-blue">
                  {t('architecture.serviceTitle')}
                </strong>
                <span className="text-[15px] leading-normal">
                  {t('architecture.serviceDesc')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-yellow-50 px-6 py-[18px]">
            <strong className="text-base text-blue">
              {t('architecture.trustTitle')}
            </strong>
            <span className="min-w-0 grow basis-[400px] text-[15px] leading-normal">
              {t('architecture.trustDesc')}
            </span>
          </div>
          <p className="m-0 text-[15px] leading-normal">
            {t('architecture.privacy')}
          </p>
        </div>
      </section>

      {/* Why support */}
      <section className="bg-green-100">
        <div className="max-w-[880px] mx-auto px-6 sm:px-8 py-16 lg:py-[72px] flex flex-col items-center gap-4 text-center">
          <h2 className="m-0 text-3xl sm:text-4xl font-extrabold text-blue">
            {t('whySupport.title')}
          </h2>
          <p className="m-0 text-lg sm:text-[19px] leading-relaxed">
            {t('whySupport.text')}
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section>
        <div
          className={`${sectionInner} pt-16 lg:pt-[88px] pb-16 flex flex-col gap-10`}>
          <h2 className={h2Class}>{t('offer.title')}</h2>
          <div className="flex flex-wrap gap-6">
            {OFFER_ITEMS.map(item => (
              <article
                key={item.key}
                className="flex min-w-0 grow basis-[260px] flex-col gap-3.5 rounded-2xl border border-[#e8e6dc] p-7">
                <Image
                  src={`${ASSETS}/${item.icon}`}
                  alt=""
                  aria-hidden="true"
                  width={112}
                  height={112}
                  className="size-28 self-center"
                />
                <h3 className="m-0 text-xl font-bold text-blue">
                  {t(`offer.${item.key}.title`)}
                </h3>
                <p className="m-0 text-base leading-relaxed">
                  {t.rich(`offer.${item.key}.desc`, {
                    link: chunks => (
                      <ExternalLink href="https://container.gov.de">
                        {chunks}
                      </ExternalLink>
                    ),
                  })}
                </p>
              </article>
            ))}
          </div>
          <p className="m-0 rounded-xl bg-yellow-50 px-5 py-4 text-base leading-normal">
            {t.rich('offer.hosting', {
              strong,
              contact: chunks => (
                <Link href="/contact" className={linkClass}>
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </section>

      {/* Why Open Elements */}
      <section className="bg-[#F7F6F1]">
        <div
          className={`${sectionInner} py-16 lg:py-[88px] flex flex-col gap-10`}>
          <h2 className={h2Class}>{t('whyUs.title')}</h2>
          <div className="flex flex-wrap gap-x-14 gap-y-10">
            {WHY_US_KEYS.map((key, index) => (
              <div key={key} className="flex min-w-0 grow basis-[460px] gap-5">
                <span className="shrink-0 text-[28px] font-extrabold text-[#3E9279]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="m-0 text-xl font-bold text-blue">
                    {t(`whyUs.${key}.title`)}
                  </h3>
                  <p className="m-0 text-base leading-relaxed">
                    {t(`whyUs.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we get started */}
      <section>
        <div
          className={`${sectionInner} py-16 lg:py-[88px] flex flex-col gap-10`}>
          <h2 className={h2Class}>{t('steps.title')}</h2>
          <ol className="m-0 flex list-none flex-wrap gap-6 p-0">
            {STEPS.map((step, index) => (
              <li
                key={step.key}
                className={`flex min-w-0 grow basis-[300px] flex-col gap-2 border-t-4 pt-5 ${step.border}`}>
                <span className="text-sm font-bold text-[#3E9279]">
                  {t('steps.stepLabel', { number: index + 1 })}
                </span>
                <strong className="text-xl text-blue">
                  {t(`steps.${step.key}.title`)}
                </strong>
                <span className="text-base leading-relaxed">
                  {t(`steps.${step.key}.desc`)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#e8e6dc]">
        <div
          className={`${sectionInner} py-16 lg:py-[88px] flex flex-col gap-8`}>
          <h2 className={h2Class}>{t('faq.title')}</h2>
          <div className="flex flex-col border-t border-[#e8e6dc]">
            {FAQ_KEYS.map(key => (
              <div
                key={key}
                className="flex flex-col gap-2 border-b border-[#e8e6dc] py-[22px]">
                <h3 className="m-0 text-lg font-bold text-blue">
                  {t(`faq.${key}.q`)}
                </h3>
                <p className="m-0 text-base leading-relaxed">
                  {t(`faq.${key}.a`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section id="contact" className="px-6 sm:px-8 pb-16 lg:pb-[88px]">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-8 rounded-3xl bg-blue p-8 sm:p-14">
          <h2 className="m-0 min-w-0 grow basis-[480px] text-2xl sm:text-4xl font-extrabold leading-tight text-white">
            {t('cta.title')}
          </h2>
          <Link href="/contact" className={pillPrimary}>
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
