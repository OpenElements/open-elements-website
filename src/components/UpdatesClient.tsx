'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { MonthlyUpdate, UpdateCategory, ItemType } from '@/types/updates';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const MONTHS = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];

// Data stores months as uppercase English (e.g. "APRIL"); render them in the
// active locale, keeping the existing all-caps styling.
function localizeMonth(month: string, locale: string): string {
  const idx = MONTHS.indexOf(month.toUpperCase());
  if (idx < 0) return month;
  return new Intl.DateTimeFormat(locale, { month: 'long' })
    .format(new Date(Date.UTC(2000, idx, 1)))
    .toUpperCase();
}

const PROJECT_NAV = [
  {
    project: 'maven',
    name: 'Apache Maven',
    logo: '/support-care/component-logos/apache-maven.svg',
  },
  {
    project: 'junit',
    name: 'JUnit',
    logo: '/support-care/component-logos/junit.svg',
  },
];

function ProjectNav({ active }: { active: string }) {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-3 mt-8">
      {PROJECT_NAV.map(({ project, name, logo }) => {
        const isActive = project === active;
        return (
          <Link
            key={project}
            href={`/updates/${project}`}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center rounded-full border px-5 py-2.5 transition-colors ${
              isActive
                ? 'border-green bg-green-100'
                : 'border-slate opacity-60 hover:opacity-100 hover:border-green/40'
            }`}>
            <Image
              src={logo}
              alt={name}
              width={120}
              height={32}
              className="h-8 w-auto shrink-0"
            />
          </Link>
        );
      })}
    </nav>
  );
}

const ITEM_TYPE_CONFIG: Record<
  ItemType,
  { icon: string; label: string; color: string }
> = {
  FEATURE: {
    icon: '/icons/greenTick.svg',
    label: 'Feature',
    color: 'bg-green-100 text-green-300',
  },
  BUG_FIX: {
    icon: '/icons/redTick.svg',
    label: 'Bug Fix',
    color: 'bg-rose-100 text-rose',
  },
  IMPROVEMENT: {
    icon: '/icons/purpleTick.svg',
    label: 'Improvement',
    color: 'bg-purple-200 text-purple-700',
  },
  DOCUMENTATION: {
    icon: '/icons/blue-tick.svg',
    label: 'Docs',
    color: 'bg-sky-100 text-sky-200',
  },
  SECURITY: {
    icon: '/icons/y-1-tick.svg',
    label: 'Security',
    color: 'bg-yellow-50 text-yellow-400',
  },
  MAINTENANCE: {
    icon: '/icons/b-1-tick.svg',
    label: 'Maintenance',
    color: 'bg-slate text-blue',
  },
};

function CategorySection({ category }: { category: UpdateCategory }) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations('updates');

  const visibleItems = expanded ? category.items : category.items.slice(0, 4);
  const hasMore = category.items.length > 4;

  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <h4 className="font-semibold text-base mb-3">{category.title}</h4>
      <ul className="space-y-2.5">
        {visibleItems.map((item, idx) => {
          const config = ITEM_TYPE_CONFIG[item.type];
          return (
            <li key={idx} className="flex items-start gap-2.5">
              <Image
                src={config.icon}
                alt={config.label}
                width={20}
                height={20}
                className="size-5 shrink-0 mt-0.5"
              />
              <div className="flex flex-wrap items-center gap-2 text-sm leading-relaxed">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-green/40 hover:decoration-green transition-colors">
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.color}`}>
                  {config.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-purple-700 text-sm font-bold flex items-center gap-1.5 mt-3">
          <span>{expanded ? t('seeLess') : t('seeMore')}</span>
          <svg
            className={`size-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
            viewBox="0 0 10 10"
            fill="none">
            <path
              d="M6.56859 8.25969C5.77951 9.46983 4.00704 9.46983 3.21796 8.25968L1.57727 5.74348L0.218515 3.06449C-0.434962 1.77606 0.451277 0.241051 1.89383 0.162762L4.89328 -2.09808e-05L7.89272 0.162762C9.33528 0.241051 10.2215 1.77606 9.56804 3.06449L8.20929 5.74348L6.56859 8.25969Z"
              fill="#7573FF"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

function ContributorAvatars({ contributors }: { contributors: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {contributors.map(url => {
        const username = url.replace('https://github.com/', '');
        return (
          <a
            key={username}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={username}>
            <Image
              src={`https://github.com/${username}.png?size=80`}
              alt={username}
              width={36}
              height={36}
              className="size-9 rounded-full ring-2 ring-white"
            />
          </a>
        );
      })}
    </div>
  );
}

function UpdateCard({
  update,
  isFirst,
  isLast,
}: {
  update: MonthlyUpdate;
  isFirst: boolean;
  isLast: boolean;
}) {
  const t = useTranslations('updates');
  const locale = useLocale();
  const month = localizeMonth(update.month, locale);

  return (
    <li className="relative flex md:gap-x-9 sm:gap-x-5 gap-x-3">
      {/* Timeline line */}
      <div
        className={`absolute ${isLast ? 'bottom-0' : '-bottom-12'} left-0 top-0 flex sm:w-6 w-5 justify-center`}>
        <div className="w-px bg-green"></div>
      </div>
      {isLast && (
        <div className="w-6 h-3/4 absolute bottom-0 bg-linear-to-t from-white"></div>
      )}

      {/* Month label (desktop) */}
      <p className="-top-3 font-semibold absolute lg:block hidden -left-16 text-xs uppercase tracking-wider text-green-300">
        {month}
      </p>

      {/* Timeline dot */}
      <div className="relative flex sm:size-6 size-5 flex-none items-center justify-center -mt-1">
        <div className="sm:size-5 size-4 rounded-full bg-green-100 flex items-center justify-center">
          <div className="size-1.5 rounded-full bg-green"></div>
        </div>
      </div>

      {/* Card content */}
      <div className="bg-white w-full shadow-5 rounded-4xl rounded-tl-none sm:p-6 p-4 relative">
        {/* Header */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-light text-2xl sm:text-3xl">
            {month} {update.year}
          </h3>
          {isFirst && (
            <span className="text-xs bg-green-100 text-green-300 font-bold px-3 py-1 rounded-full">
              {t('latest')}
            </span>
          )}
        </div>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed mt-3 text-blue/80">
          {update.excerpt}
        </p>

        {/* Categories */}
        <div className="divide-y divide-slate mt-4">
          {update.categories.map((category, idx) => (
            <CategorySection key={idx} category={category} />
          ))}
        </div>

        {/* Contributors */}
        {update.contributors.length > 0 && (
          <div className="mt-5 pt-5 border-t border-slate">
            <h4 className="font-semibold text-sm mb-2.5">
              {t('contributors')}
            </h4>
            <ContributorAvatars contributors={update.contributors} />
          </div>
        )}
      </div>
    </li>
  );
}

export default function UpdatesClient({
  updates,
  project,
}: {
  updates: MonthlyUpdate[];
  project: string;
}) {
  const t = useTranslations('updates');
  const projectName =
    PROJECT_NAV.find(p => p.project === project)?.name ?? project;

  return (
    <div className="relative bg-white">
      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full relative">
        <Image
          src="/illustrations/green-arrow.svg"
          alt={t('decorationAlt')}
          width={160}
          height={160}
          className="absolute lg:block hidden right-28 top-24 w-40 shrink-0"
        />
        <Image
          src="/illustrations/round-13.svg"
          alt={t('decorationAlt')}
          width={80}
          height={80}
          className="absolute lg:block hidden right-48 top-16 w-20 shrink-0"
        />
        <Image
          src="/illustrations/round11.svg"
          alt={t('decorationAlt')}
          width={144}
          height={144}
          className="absolute lg:block hidden left-36 top-24 w-36 -rotate-90 shrink-0"
        />

        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1">{t('title')}</h1>
            <p className="max-w-3xl mx-auto text-center text-base">
              {t('description', { project: projectName })}
            </p>
            <Image
              src="/illustrations/line-p.svg"
              alt={t('underlineAlt')}
              width={288}
              height={20}
              className="absolute w-48 -bottom-7 sm:w-72 shrink-0"
            />
          </div>
        </div>
        <ProjectNav active={project} />
      </div>

      <ul
        role="list"
        className="sm:space-y-12 space-y-8 container lg:max-w-6xl w-full relative lg:pt-16 pt-12 pb-28 lg:pl-28">
        {updates.map((update, idx) => (
          <UpdateCard
            key={`${update.year}-${update.month}`}
            update={update}
            isFirst={idx === 0}
            isLast={idx === updates.length - 1}
          />
        ))}
      </ul>
    </div>
  );
}
