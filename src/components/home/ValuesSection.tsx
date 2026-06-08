import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionKicker from '@/components/ui/SectionKicker';
import { valueKeys } from './data';

export default function ValuesSection() {
  const t = useTranslations('homeLanding');

  return (
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
  );
}
