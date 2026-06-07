import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionKicker from '@/components/ui/SectionKicker';
import SecondaryButton from '@/components/ui/SecondaryButton';
import { engagements, type EngagementConfig } from './data';

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

export default function DistinguishSection() {
  const t = useTranslations('homeLanding');

  return (
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
  );
}
