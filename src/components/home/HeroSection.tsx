import { useTranslations } from 'next-intl';
import Image from 'next/image';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export default function HeroSection() {
  const t = useTranslations('homeLanding');

  return (
    <>
      <section className="mx-auto">
        {/* Hero Background Illustrations */}
        <div className="pointer-events-none absolute -top-10 left-0 right-0 flex w-full items-start justify-center overflow-hidden">
          <div className=" hidden h-[662px] w-full min-w-[1536px] shrink-0 lg:block">
            <Image
              className="object-fill"
              src="/illustrations/home-bg-2.svg"
              alt="Hero background"
              fill
              sizes="100vw"
              priority
            />
          </div>
          <Image
            className="absolute inset-0 -top-10 block w-full object-cover object-center sm:-top-24 md:-top-28 lg:hidden"
            src="/illustrations/m-bg-hero.svg"
            alt="Hero background for mobile"
            width={800}
            height={600}
            priority
          />
        </div>

        <div className="container-box relative pb-8 pt-16 sm:pb-0">
          <div className="flex flex-col items-center gap-6 pt-6 lg:flex-row lg:items-start lg:gap-6 lg:pt-16">
            <div className="relative w-full lg:flex-1 lg:min-w-0">
              <h1 className="max-w-[738px]">
                <span className="block text-4xl font-light leading-[1.05] tracking-[-2.2px] sm:text-6xl lg:text-[88px] lg:leading-[92px]">
                  {t('hero.titlePrefix')}
                </span>
                <span className="mt-2 flex items-center gap-3 text-[2rem] font-black italic leading-none sm:mt-3 sm:gap-4 sm:text-[3.25rem] lg:text-[88px] lg:leading-[92px]">
                  <span
                    aria-hidden="true"
                    className="h-0.75 w-10 shrink-0 rounded-full bg-blue sm:w-16 lg:w-20"
                  />
                  <span>{t('hero.titleLead')}</span>
                  <span className="text-rose">{t('hero.titleHighlight')}</span>
                </span>
              </h1>

              <p className="mt-4 max-w-[646px] text-base font-normal leading-[26px]">
                {t('hero.body')}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="#why">
                  {t('hero.primaryCta')}
                </PrimaryButton>
                {/* <SecondaryButton href="#engagements">
                  {t('hero.secondaryCta')}
                </SecondaryButton> */}
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

      <div className="container-box border-b border-[#A8DAC8] pb-4 pt-8 text-right text-base font-normal leading-[26px]">
        {t('tagline')}
      </div>
    </>
  );
}
