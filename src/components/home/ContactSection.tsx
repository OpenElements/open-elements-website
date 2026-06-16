import { useTranslations } from 'next-intl';
import Image from 'next/image';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export default function ContactSection() {
  const t = useTranslations('homeLanding');

  return (
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
      </div>
    </section>
  );
}
