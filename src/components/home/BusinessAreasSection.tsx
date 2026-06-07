import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import Checkmark from '@/components/ui/Checkmark';
import SectionKicker from '@/components/ui/SectionKicker';
import {
  businessAreas,
  metricKeys,
  type BusinessAreaConfig,
  type ProductKind,
} from './data';

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

export default function BusinessAreasSection() {
  const t = useTranslations('homeLanding');

  return (
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
                      <li key={bullet} className="flex items-center gap-3 py-4">
                        <Checkmark className={`size-5 ${area.accent}`} />
                        <span className="text-base font-medium">{bullet}</span>
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
              <div className="absolute left-0 top-0 flex h-full w-1.25 flex-col">
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
  );
}
