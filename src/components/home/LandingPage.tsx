'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

type ProductKind = 'supportCare' | 'digitalTrust' | 'labs';

interface BusinessAreaConfig {
  key: ProductKind;
  number: string;
  href: string;
  external?: boolean;
  background: string;
  accent: string;
  borderColor: string;
  dividerColor: string;
  image?: string;
}

interface EngagementConfig {
  key: 'eclipse' | 'linux' | 'hiero' | 'decentralizedTrust' | 'orc' | 'asf';
  logo?: string;
  logoClassName?: string;
}

const businessAreas: BusinessAreaConfig[] = [
  {
    key: 'supportCare',
    number: '01',
    href: '/support-care/',
    background: 'bg-[#E2F0EA]',
    accent: 'text-[#28A58A]',
    borderColor: 'border-[#C9E4D9]',
    dividerColor: 'divide-[#A8DAC8]',
    image: '/19-helper 1.png',
  },
  {
    key: 'digitalTrust',
    number: '02',
    href: '/dlt-lecture/',
    background: 'bg-[#E5EFF9]',
    accent: 'text-[#E6357B]',
    borderColor: 'border-[#C5DEF3]',
    dividerColor: 'divide-[#C5DEF3]',
    image: '/illustrations/general/people-network.svg',
  },
  {
    key: 'labs',
    number: '03',
    href: 'https://github.com/OpenElementsLabs',
    external: true,
    background: 'bg-[#FADAE5]',
    accent: 'text-[#001452]',
    borderColor: 'border-[#3A559A]',
    dividerColor: 'divide-[#3A559A]',
  },
];

const metricKeys = ['share', 'components', 'year', 'focus'] as const;

const engagements: EngagementConfig[] = [
  {
    key: 'eclipse',
    logo: '/illustrations/logo-eclipse.svg',
    logoClassName: 'h-14 w-auto sm:h-16',
  },
  {
    key: 'linux',
    logo: '/illustrations/logos/logo-linux-foundation.svg',
    logoClassName: 'h-16 w-auto sm:h-20',
  },
  {
    key: 'hiero',
    logo: '/illustrations/logo-hiero.svg',
    logoClassName: 'h-14 w-auto sm:h-16',
  },
  {
    key: 'decentralizedTrust',
  },
  {
    key: 'orc',
    logo: '/illustrations/open_regulatory.svg',
    logoClassName: 'h-16 w-auto sm:h-20',
  },
  {
    key: 'asf',
    logo: '/support-care/foundation-logos/afs.svg',
    logoClassName: 'h-14 w-auto sm:h-16',
  },
];

const valueKeys = ['openness', 'community', 'depth'] as const;

function Checkmark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}>
      <path
        d="M5 12.5 9.2 17 19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionKicker({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`mb-6 block h-1 w-16 rounded-full bg-blue ${className}`}
    />
  );
}

function PrimaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue px-6 text-sm font-bold text-white transition-colors duration-150 hover:bg-sky focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:px-7">
      {children}
    </Link>
  );
}

function SecondaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-lg border border-blue px-6 text-sm font-bold text-blue transition-colors duration-150 hover:bg-blue hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:px-7">
      {children}
    </Link>
  );
}

function ProductLogo({ kind }: { kind: ProductKind }) {
  if (kind === 'supportCare') {
    return (
      <Image
        src="/illustrations/support-care-logos/support-care-logo.svg"
        alt="Support & Care by Open Elements"
        width={260}
        height={56}
        loading="eager"
        unoptimized
        className="h-14 w-auto max-w-full"
      />
    );
  }

  if (kind === 'digitalTrust') {
    return (
      <div className="flex items-center gap-3">
        <span className="relative size-12 shrink-0">
          <span className="absolute left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky" />
          <span className="absolute left-1 top-2 size-3 rounded-full bg-rose" />
          <span className="absolute right-1 top-2 size-3 rounded-full bg-sky" />
          <span className="absolute bottom-1 left-3 size-3 rounded-full bg-purple" />
          <span className="absolute bottom-2 right-2 size-3 rounded-full bg-green" />
          <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-blue" />
        </span>
        <span className="leading-none">
          <span className="block text-2xl font-bold tracking-normal text-blue sm:text-3xl">
            Digital Trust
          </span>
          <span className="block text-right text-xs font-medium text-blue/70">
            by Open Elements
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="size-7 text-white">
          <path
            d="M9 3h6M10 3v5.5l-4.5 7.8A3 3 0 0 0 8.1 21h7.8a3 3 0 0 0 2.6-4.5L14 8.5V3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 15h7.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="text-2xl font-bold text-blue sm:text-3xl">
          OpenElements
        </span>
        <span className="ml-2 text-2xl font-semibold italic text-green sm:text-3xl">
          Labs
        </span>
      </span>
    </div>
  );
}

function EngagementMark({ kind }: { kind: EngagementConfig['key'] }) {
  if (kind === 'decentralizedTrust') {
    return (
      <div className="leading-none text-sky">
        <span className="block text-2xl font-black uppercase tracking-normal sm:text-3xl">
          LFDT
        </span>
        <span className="block text-2xl font-light uppercase tracking-normal sm:text-3xl">
          Decentralized Trust
        </span>
      </div>
    );
  }

  return null;
}

function AreaLink({
  area,
  label,
}: {
  area: BusinessAreaConfig;
  label: string;
}) {
  const className =
    'inline-flex min-h-11 items-center justify-center rounded-lg border border-blue px-5 text-sm font-bold text-blue transition-colors duration-150 hover:bg-blue hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2';

  if (area.external) {
    return (
      <a
        href={area.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={area.href} className={className}>
      {label}
    </Link>
  );
}

export default function LandingPage() {
  const t = useTranslations('homeLanding');

  return (
    <div className="bg-white text-blue">
      <section className="mx-auto">
        {/* Hero Background Illustrations */}
        <div className="absolute -top-10 left-0 right-0 flex w-full items-start">
          <div className="hidden h-full w-full bg-blue 2xl:block" />
          <div className="w-full 2xl:shrink-0">
            <Image
              className="hidden w-full xl:mt-0 lg:block"
              src="/illustrations/home-bg-2.svg"
              alt="Hero background"
              width={2000}
              height={600}
              priority
            />
            <Image
              className="absolute inset-0 -top-10 block w-full object-cover object-center sm:-top-24 md:-top-28 lg:hidden"
              src="/illustrations/m-bg-hero.svg"
              alt="Hero background for mobile"
              width={800}
              height={600}
              priority
            />
          </div>
          <div className="hidden h-full w-full bg-blue 2xl:block" />
        </div>

        <div className="container-box relative pb-8 sm:pb-0">
          <div className="flex flex-col items-center gap-6 pt-6 lg:flex-row lg:gap-8 lg:pt-16">
            <div className="relative w-full lg:flex-1 lg:min-w-0">
              <h1 className="max-w-2xl">
                <span className="block text-4xl font-light leading-[1.1] tracking-tight text-blue sm:text-5xl lg:text-[4.25rem]">
                  {t('hero.titlePrefix')}
                </span>
                <span className="mt-2 flex items-center gap-3 text-[2rem] font-black italic leading-none sm:mt-3 sm:gap-4 sm:text-[3.25rem] lg:text-[4.25rem]">
                  <span
                    aria-hidden="true"
                    className="h-0.75 w-10 shrink-0 rounded-full bg-blue sm:w-16 lg:w-20"
                  />
                  <span>{t('hero.titleLead')}</span>
                  <span className="text-rose">{t('hero.titleHighlight')}</span>
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm text-blue sm:text-base">
                {t('hero.body')}
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="#why">
                  {t('hero.primaryCta')}
                </PrimaryButton>
                <SecondaryButton href="#engagements">
                  {t('hero.secondaryCta')}
                </SecondaryButton>
              </div>
            </div>

            <div className="relative w-full max-w-xs shrink-0 lg:w-96 lg:max-w-none xl:w-112">
              <Image
                src="/illustrations/landingpage-hero.svg"
                alt={t('hero.imageAlt')}
                className="w-full"
                width={460}
                height={484}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container-box border-b border-green/50 py-8 text-center text-sm font-medium sm:text-right">
        {t('tagline')}
      </div>

      <section id="business-areas" className="container-box py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionKicker />
            <h2 className="text-3xl font-light leading-tight tracking-normal sm:text-4xl lg:text-[2.75rem]">
              {t('business.title')}
            </h2>
          </div>
          <p className="max-w-3xl text-base font-medium leading-7 lg:justify-self-end lg:text-lg">
            {t('business.intro')}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          {businessAreas.map(area => {
            const bullets = t.raw(`business.areas.${area.key}.bullets`) as
              | string[]
              | undefined;

            return (
              <article
                key={area.key}
                className={`grid gap-8 rounded-3xl ${area.background} px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[5rem_1fr_1fr] lg:gap-6 lg:px-12 lg:py-10`}>
                <div className="lg:row-span-1">
                  <p
                    className={`text-5xl font-light leading-none ${area.accent}`}>
                    {area.number}
                  </p>
                </div>

                <div>
                  <ProductLogo kind={area.key} />
                  <h3 className="mt-5 text-base font-semibold leading-7">
                    {t(`business.areas.${area.key}.headline`)}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7">
                    {t(`business.areas.${area.key}.body`)}
                  </p>
                  <div className="mt-7">
                    <AreaLink
                      area={area}
                      label={t(`business.areas.${area.key}.cta`)}
                    />
                  </div>
                </div>

                <div className={`${area.borderColor} lg:border-l lg:pl-10`}>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3A559A]">
                    {t(`business.areas.${area.key}.category`)}
                  </p>
                  <div className="flex items-start gap-6">
                    <ul className={`mt-5 flex-1 divide-y ${area.dividerColor}`}>
                      {(bullets ?? []).map(bullet => (
                        <li
                          key={bullet}
                          className="flex items-center gap-3 py-4">
                          <Checkmark className={`size-5 ${area.accent}`} />
                          <span className="text-base font-medium">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex shrink-0 items-center">
                      {area.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={area.image}
                          alt={t(`business.areas.${area.key}.imageAlt`)}
                          className="h-36 w-auto"
                        />
                      ) : (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 96 130"
                          fill="none"
                          className="h-32 w-auto text-green">
                          <path
                            d="M48 3c20 18 31 39 31 63 0 28-17 47-31 59-14-12-31-31-31-59C17 42 28 21 48 3Z"
                            fill="currentColor"
                            stroke="#020144"
                            strokeWidth="3"
                          />
                          <path
                            d="M48 37a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
                            fill="#9CD5FD"
                            stroke="#020144"
                            strokeWidth="3"
                          />
                          <path
                            d="M31 104 17 120M65 104l14 16M48 111v16"
                            stroke="#020144"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M35 127h-8M52 127h-8M69 127h-8"
                            stroke="#5DB9F5"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {metricKeys.map((key, index) => {
            const cardStyles = [
              'bg-[#6EA6E3] text-white',
              'bg-[#C5DEF3] text-blue',
              'bg-[#9EC5EC] text-blue',
              'bg-[#C9E4D9] text-blue',
            ];
            return (
              <div
                key={key}
                className={`relative overflow-hidden rounded-3xl ${cardStyles[index]} px-8 py-10 sm:px-10 sm:py-12`}>
                {/* Tri-color left border */}
                <div className="absolute left-0 top-0 flex h-full w-[5px] flex-col">
                  <span className="flex-1 bg-green" />
                  <span className="flex-1 bg-rose" />
                  <span className="flex-1 bg-[#4A87D6]" />
                </div>
                <p className="text-5xl font-light leading-none sm:text-6xl lg:text-7xl">
                  {t(`metrics.${key}.value`)}
                </p>
                <p
                  className={`mt-6 max-w-52 text-xs font-bold uppercase leading-5 tracking-[0.15em] ${index === 0 ? 'text-white/60' : 'text-blue/60'}`}>
                  {t(`metrics.${key}.label`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="why" className="bg-[#f6f9fc] py-16 lg:py-24">
        <div className="container-box">
          <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-start">
            <div>
              <SectionKicker />
              <h2 className="text-3xl font-light leading-tight tracking-normal sm:text-4xl lg:text-[2.75rem]">
                {t('distinguish.titlePrefix')}{' '}
                <span className="font-bold">
                  {t('distinguish.titleHighlight')}
                </span>
              </h2>
              <p className="mt-6 max-w-[640px] text-base font-normal leading-8 sm:text-xl sm:leading-8">
                {t('distinguish.body')}
              </p>
              <div className="mt-4">
                <SecondaryButton href="/about/#div2">
                  {t('distinguish.cta')}
                </SecondaryButton>
              </div>
            </div>
            <Image
              src="/illustrations/general/connecting-open-source-gov.svg"
              alt={t('distinguish.imageAlt')}
              width={469}
              height={289}
              loading="eager"
              unoptimized
              className="h-auto w-full"
            />
          </div>

          <div
            id="engagements"
            className="mt-14 overflow-hidden rounded-3xl border border-[#C5DEF3] bg-white">
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {engagements.map((engagement, index) => {
                const col3 = index % 3;
                const row3 = Math.floor(index / 3);
                const col2 = index % 2;
                const row2 = Math.floor(index / 2);
                return (
                  <article
                    key={engagement.key}
                    className={`border-[#C5DEF3] p-6 ${
                      col2 === 0 ? 'md:border-r' : ''
                    } ${row2 < 2 ? 'md:border-b' : ''} ${
                      col3 !== 2 ? 'lg:border-r' : 'lg:border-r-0'
                    } ${row3 === 0 ? 'lg:border-b' : 'lg:border-b-0'}`}>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3A559A]">
                      {t(`distinguish.engagements.${engagement.key}.category`)}
                    </p>
                    <div className="mt-4 flex h-[86px] items-center">
                      {engagement.logo ? (
                        <Image
                          src={engagement.logo}
                          alt={t(
                            `distinguish.engagements.${engagement.key}.logoAlt`,
                          )}
                          width={280}
                          height={120}
                          loading="eager"
                          unoptimized
                          className={engagement.logoClassName}
                        />
                      ) : (
                        <EngagementMark kind={engagement.key} />
                      )}
                    </div>
                    <p className="mt-4 text-base font-normal leading-[26px]">
                      {t(`distinguish.engagements.${engagement.key}.body`)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-6 rounded-3xl border border-[#C5DEF3] bg-white p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="text-xl font-normal leading-8">
              {t('distinguish.summary')}
            </p>
            <SecondaryButton href="/about/#div2">
              {t('distinguish.summaryCta')}
            </SecondaryButton>
          </div>

          <div className="mt-10 flex flex-wrap items-end gap-6 border-b border-[#9EC5EC] pb-6 sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-block size-3 rotate-45 rounded-sm bg-blue" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-black">
                {t('distinguish.category')}
              </span>
              <span className="text-base font-normal leading-[26px] text-[#3A559A]">
                {t('tagline')}
              </span>
            </div>
            <SecondaryButton href="/about/#div2">
              {t('distinguish.allEngagements')}
            </SecondaryButton>
          </div>
        </div>
      </section>

      <section className="bg-[#E2F0EA] py-16 lg:py-24">
        <div className="container-box flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex-1">
            <SectionKicker />
            <h2 className="text-3xl font-light leading-tight tracking-normal sm:text-4xl lg:text-[2.75rem]">
              {t('values.titlePrefix')}{' '}
              <span className="font-bold">{t('values.titleHighlight')}</span>
            </h2>
            <p className="mt-6 max-w-[608px] text-xl font-normal leading-8">
              {t('values.body')}
            </p>
            <Image
              src="/illustrations/general/building-open-source-universe.svg"
              alt={t('values.imageAlt')}
              width={608}
              height={421}
              loading="eager"
              unoptimized
              className="mt-6 h-auto w-full"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            {valueKeys.map((key, index) => (
              <article
                key={key}
                className="rounded-3xl border border-[#C5DEF3] bg-white p-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-[3px] w-[26px] rounded-full ${
                      index === 0
                        ? 'bg-[#28A58A]'
                        : index === 1
                          ? 'bg-[#E6357B]'
                          : 'bg-[#4A87D6]'
                    }`}
                  />
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#3A559A]">
                    {String(index + 1).padStart(2, '0')}/03
                  </span>
                </div>
                <h3 className="mt-4 text-[30px] font-normal leading-[38px] tracking-[-0.45px]">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="mt-6 text-base font-normal leading-[26px]">
                  {t(`values.items.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-box">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
            <div className="flex-1">
              <div aria-hidden="true" className="mb-6 flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#28A58A]" />
                <span className="size-3 rounded-full bg-[#E6357B]" />
                <span className="size-3 rounded-full bg-[#4A87D6]" />
              </div>
              <h2 className="text-5xl font-light leading-[72px] tracking-[-1.28px] sm:text-6xl lg:text-[64px]">
                {t('contact.titlePrefix')}{' '}
                <span className="font-black italic">
                  {t('contact.titleHighlight')}
                </span>
              </h2>
              <p className="mt-6 max-w-[629px] text-xl font-normal leading-8">
                {t('contact.body')}
              </p>
              <div className="mt-6 flex flex-col gap-6 sm:flex-row">
                <PrimaryButton href="/contact/">
                  {t('contact.primaryCta')}
                </PrimaryButton>
                <SecondaryButton href="/about/">
                  {t('contact.secondaryCta')}
                </SecondaryButton>
              </div>
            </div>

            <div className="flex-1">
              <Image
                src="/illustrations/general/many-care-tree.svg"
                alt={t('contact.imageAlt')}
                width={629}
                height={428}
                loading="eager"
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="mt-8 border-t border-[#C5DEF3] pt-4 text-center">
            <p className="text-base font-normal leading-[26px] text-[#3A559A]">
              {t('contact.awardsIntro')}
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Image
                src="/soft1.png"
                alt={t('contact.hostedBadge')}
                width={153}
                height={85}
                className="h-[85px] w-auto"
              />
              <Image
                src="/soft2.png"
                alt={t('contact.madeBadge')}
                width={151}
                height={85}
                className="h-[85px] w-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
