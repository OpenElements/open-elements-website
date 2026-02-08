'use client';

import { useState } from 'react';
import Image from 'next/image';

// Types
interface Contributor {
  name: string;
  avatar: string;
  url: string;
}

interface UpdateItem {
  text: string;
}

interface UpdateSection {
  title: string;
  items: UpdateItem[];
  icon?: 'red' | 'green' | 'purple' | 'star';
  collapsible?: boolean;
}

interface Update {
  version: string;
  date: string;
  month: string;
  isLatest?: boolean;
  overview?: string[];
  sections: UpdateSection[];
  assets?: number;
  tags?: string[];
  contributors?: Contributor[];
  contributorNote?: string;
}

// Collapsible Section Component
function CollapsibleSection({ section }: { section: UpdateSection }) {
  const [open, setOpen] = useState(false);

  const getIcon = (iconType?: string) => {
    const icons = {
      red: '/icons/redTick.svg',
      green: '/icons/greenTick.svg',
      purple: '/icons/purpleTick.svg',
      star: '/icons/star.svg',
    };
    return iconType ? icons[iconType as keyof typeof icons] : null;
  };

  const getIconSize = (iconType?: string) => {
    return iconType === 'star' ? 'size-4 mt-1.5' : 'size-6';
  };

  const icon = getIcon(section.icon);
  const iconSize = getIconSize(section.icon);

  if (!section.collapsible) {
    return (
      <div className="py-6 flex flex-col gap-3 last:pb-0">
        <h4 className="font-semibold">{section.title}</h4>
        <div className="text-sm">
          <ul className="space-y-2 text-sm leading-6">
            {section.items.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                {icon && (
                  <Image
                    src={icon}
                    alt="icon"
                    width={24}
                    height={24}
                    className={`${iconSize} shrink-0`}
                  />
                )}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const visibleItems = section.items.slice(0, 4);
  const hiddenItems = section.items.slice(4);

  return (
    <div className="py-6 flex flex-col gap-3 last:pb-0">
      <h4 className="font-semibold sm:text-base text-sm">{section.title}</h4>
      <div className="text-sm space-y-2">
        <ul className="space-y-2 text-sm leading-6">
          {visibleItems.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              {icon && (
                <Image
                  src={icon}
                  alt="icon"
                  width={24}
                  height={24}
                  className={`${iconSize} shrink-0`}
                />
              )}
              {item.text}
            </li>
          ))}
        </ul>
        {hiddenItems.length > 0 && open && (
          <ul className="space-y-2 text-sm leading-6">
            {hiddenItems.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                {icon && (
                  <Image
                    src={icon}
                    alt="icon"
                    width={24}
                    height={24}
                    className={`${iconSize} shrink-0`}
                  />
                )}
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
      {hiddenItems.length > 0 && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-purple-700 sm:text-lg text-base font-bold flex items-center gap-2"
        >
          <span>{open ? 'See Less' : 'See More'}</span>
          <svg
            className={`size-3.5 mt-px transition-all ${open ? 'rotate-180' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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

// Truncated Section Component
function TruncatedSection({ section }: { section: UpdateSection }) {
  const [open, setOpen] = useState(false);

  const icon = section.icon === 'star' ? '/icons/star.svg' : null;

  return (
    <div className="py-6 flex flex-col gap-3 last:pb-0">
      <div className="relative mb-2 sm:block flex flex-col gap-2 items-start">
        <h3 className="font-bold sm:text-2xl text-base inline">{section.title}</h3>
        <span className="sm:text-sm text-xs bg-rose-100 text-rose font-bold sm:px-4 px-2.5 sm:py-2 py-1.5 rounded-full sm:ml-2 sm:absolute inline-block">
          Semper
        </span>
      </div>
      <h4 className="font-semibold sm:text-base text-sm sm:mb-0 -mb-2.5">New Features</h4>
      <div className="text-sm space-y-2">
        <ul
          className={`space-y-2 text-sm leading-6 relative ${!open ? 'h-28 overflow-hidden' : ''}`}
        >
          {!open && (
            <div className="bg-gradient-to-t from-white via-white/50 h-16 w-full absolute bottom-0"></div>
          )}
          {section.items.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              {icon && (
                <Image
                  src={icon}
                  alt="icon"
                  width={16}
                  height={16}
                  className="size-4 mt-1.5 shrink-0"
                />
              )}
              {item.text}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-purple-700 sm:text-lg text-base font-bold flex items-center gap-2"
        >
          <span>{open ? 'See Less' : 'See More'}</span>
          <svg
            className={`size-3.5 mt-px transition-all ${open ? 'rotate-180' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.56859 8.25969C5.77951 9.46983 4.00704 9.46983 3.21796 8.25968L1.57727 5.74348L0.218515 3.06449C-0.434962 1.77606 0.451277 0.241051 1.89383 0.162762L4.89328 -2.09808e-05L7.89272 0.162762C9.33528 0.241051 10.2215 1.77606 9.56804 3.06449L8.20929 5.74348L6.56859 8.25969Z"
              fill="#7573FF"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Update Card Component
function UpdateCard({ update, isLast }: { update: Update; isLast?: boolean }) {
  return (
    <li className="relative flex md:gap-x-9 sm:gap-x-5 gap-x-3">
      <div
        className={`absolute ${isLast ? 'bottom-0' : '-bottom-12'} left-0 top-0 flex sm:w-6 w-5 justify-center`}
      >
        <div className="w-px bg-purple"></div>
      </div>
      {isLast && (
        <div className="w-6 h-3/4 absolute bottom-0 bg-gradient-to-t from-white"></div>
      )}
      <p className="-top-3 font-semibold absolute lg:block hidden -left-12 text-xs uppercase">
        {update.month}
      </p>
      <div className="relative flex sm:size-6 size-5 flex-none items-center justify-center -mt-1">
        <div className="sm:size-5 size-4 rounded-full bg-purple-100 flex items-center justify-center">
          <div className="size-1.5 rounded-full bg-purple"></div>
        </div>
      </div>

      <div className="bg-white w-full shadow-5 rounded-[32px] rounded-tl-none sm:p-6 p-4 relative">
        <h3 className="font-bold sm:text-32 text-2xl relative">
          {update.version}
          {update.isLatest && (
            <span className="sm:text-sm text-xs bg-purple-200 text-purple font-bold sm:px-4 px-3 sm:py-2 py-1.5 rounded-full absolute ml-2 sm:mt-2">
              Latest
            </span>
          )}
        </h3>
        <time className="text-green text-sm font-medium uppercase sm:absolute right-8 top-8 sm:mt-0 mt-1.5 inline-block">
          {update.date}
        </time>

        <div className="divide-y divide-green-50">
          {update.overview && (
            <div className="flex flex-col gap-3 py-6 last:pb-0">
              <h4 className="font-bold">Overview</h4>
              <div>
                {update.overview.map((text, idx) => (
                  <p key={idx} className="text-sm font-medium first:pt-0">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          )}

          {update.sections.map((section, idx) => {
            if (section.title === "What's Changed") {
              return <TruncatedSection key={idx} section={section} />;
            }
            return <CollapsibleSection key={idx} section={section} />;
          })}

          {update.assets && (
            <div className="py-6 flex flex-col gap-3 last:pb-0">
              <h4 className="text-blue sm:text-2xl text-base font-bold flex items-center gap-3">
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3537 4.95005C12.5638 5.73913 12.5638 7.5116 11.3537 8.30068L7.3845 10.8888L3.15851 13.0322C1.87008 13.6857 0.335071 12.7994 0.256782 11.3569L-3.93402e-07 6.62537L0.256782 1.89387C0.335071 0.451317 1.87008 -0.434922 3.15851 0.218555L7.3845 2.36192L11.3537 4.95005Z"
                    fill="#5DB9F5"
                  />
                </svg>
                Assets
                <span className="bg-sky-100/50 font-bold text-sky-200 rounded-full text-sm size-8 inline-flex items-center justify-center">
                  {update.assets}
                </span>
              </h4>
            </div>
          )}

          {update.tags && (
            <div className="py-6 flex flex-col gap-3 last:pb-0">
              <div className="flex flex-wrap gap-2 text-sm font-semibold *:px-3 *:py-1 *:bg-yellow-50 *:rounded-full">
                {update.tags.map((tag, idx) => (
                  <span key={idx}>#{tag}</span>
                ))}
              </div>
            </div>
          )}

          {update.contributors && (
            <div className="py-6 flex flex-col gap-3 last:pb-0">
              <h4 className="font-semibold">Contributors</h4>
              <div className="flex flex-wrap gap-3 font-semibold *:size-10 *:overflow-hidden *:rounded-full">
                {update.contributors.map((contributor, idx) => (
                  <a key={idx} href={contributor.url}>
                    <Image
                      src={contributor.avatar}
                      alt={contributor.name}
                      width={40}
                      height={40}
                    />
                  </a>
                ))}
              </div>
              {update.contributorNote && (
                <p className="text-sm pt-0">{update.contributorNote}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

// Main Updates Page
export default function UpdatesPage() {
  // Sample data - replace with actual data from API or CMS
  const updates: Update[] = [
    {
      version: 'v0.1.8',
      date: 'NOVEMBER, 2025',
      month: 'NOV',
      isLatest: true,
      overview: [
        'Pretium augue urna sit vulputate in. Venenatis amet dui augue et interdum. Dolor feugiat morbi pellentesque in at ullamcorper. Quis imperdiet sit ipsum et sodales amet urna.',
        'Pretium augue urna sit vulputate in. Venenatis amet dui augue et interdum. Dolor feugiat morbi pellentesque in at ullamcorper. Quis imperdiet sit ipsum et sodales amet urna.',
      ],
      sections: [
        {
          title: 'Refactored Documentation:',
          collapsible: true,
          items: [
            { text: 'docs: added changelog conflict resolution examples to docs/common_issues.md' },
            { text: 'docs: added "One Issue Per Pull Request" section to examples/sdk_developers/common_issues.md.' },
            { text: 'docs: update pyproject.toml maintainers list.' },
            { text: 'docs: added to README a social follow section' },
            { text: 'docs: added changelog conflict resolution examples to docs/common_issues.md' },
            { text: 'docs: added "One Issue Per Pull Request" section to examples/sdk_developers/common_issues.md.' },
            { text: 'docs: update pyproject.toml maintainers list.' },
            { text: 'docs: added to README a social follow section' },
          ],
        },
        {
          title: 'Bug Fixes:',
          icon: 'red',
          items: [
            { text: 'Pharetra sed pellentesque pretium euismod risus iaculis netus. Ac scelerisque posuere viverra sit. Consequat in odio sed tempus faucibus risus. Malesuada turpis nisi lorem volutpat ullamcorper magna.' },
            { text: 'Pharetra sed pellentesque pretium euismod risus iaculis netus. Ac scelerisque posuere viverra sit. Consequat in odio sed tempus faucibus risus. Malesuada turpis nisi lorem volutpat ullamcorper magna.' },
          ],
        },
        {
          title: 'New Fixes:',
          icon: 'green',
          items: [
            { text: 'Pharetra sed pellentesque pretium euismod risus iaculis netus. Ac scelerisque posuere viverra sit. Consequat in odio sed tempus faucibus risus. Malesuada turpis nisi lorem volutpat ullamcorper magna.' },
            { text: 'Nunc quis nec urna pellentesque. Mus tempor placerat at lacinia nulla justo iaculis bibendum pretium. Dis ullamcorper scelerisque eget ultricies fermentum fermentum nisi. Eu auctor lorem sed nisl elit posuere purus est.' },
            { text: 'Quam enim rhoncus fames et vitae enim molestie tellus. Pulvinar eget diam vestibulum pellentesque sit fringilla ornare augue pellentesque. Consequat nec at proin et vitae elit. Vitae ut cursus suspendisse elementum euismod sit.' },
            { text: 'Purus habitant consectetur vulputate gravida. Lacus in neque fermentum viverra eros viverra. Dui odio urna nunc volutpat. In nunc arcu augue eu eu tellus.' },
          ],
        },
        {
          title: 'New Features:',
          icon: 'purple',
          collapsible: true,
          items: [
            { text: 'Quis quam pellentesque at sed in sed orci. Purus varius non arcu cursus malesuada convallis nisl sem pulvinar.' },
            { text: 'Nisl commodo quis blandit nibh. Odio mauris id eget quis tempor.' },
            { text: 'Sed gravida morbi elit a sit. Nec non amet tortor purus neque amet libero.' },
            { text: 'Consequat consectetur cras neque mattis. In quam aliquam mattis ut risus risus dis proin lorem.' },
            { text: 'Quis quam pellentesque at sed in sed orci. Purus varius non arcu cursus malesuada convallis nisl sem pulvinar.' },
            { text: 'Nisl commodo quis blandit nibh. Odio mauris id eget quis tempor.' },
            { text: 'Sed gravida morbi elit a sit. Nec non amet tortor purus neque amet libero.' },
            { text: 'Consequat consectetur cras neque mattis. In quam aliquam mattis ut risus risus dis proin lorem.' },
          ],
        },
        {
          title: "What's Changed",
          icon: 'star',
          items: [
            { text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.' },
            { text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.' },
            { text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.' },
          ],
        },
      ],
      assets: 2,
      tags: ['Tortor', 'Tellus', 'Mattis', 'Luctus', 'Tellus'],
      contributors: Array(23).fill({
        name: 'Contributor',
        avatar: 'https://cdn.pixabay.com/photo/2025/04/02/18/48/background-9509852_1280.jpg',
        url: '#',
      }),
      contributorNote:
        'Tellus massa commodo at neque eget morbi mus porta mauris. Ac elementum natoque massa arcu tellus lorem eu hac amet.',
    },
    {
      version: 'v0.1.7',
      date: 'OKTOBER, 2025',
      month: 'OKT',
      sections: [
        {
          title: "What's Changed",
          icon: 'star',
          items: [
            { text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.' },
            { text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.' },
            { text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.' },
          ],
        },
      ],
      assets: 2,
      contributors: Array(5).fill({
        name: 'Contributor',
        avatar: 'https://cdn.pixabay.com/photo/2025/04/02/18/48/background-9509852_1280.jpg',
        url: '#',
      }),
      contributorNote:
        'Tellus massa commodo at neque eget morbi mus porta mauris. Ac elementum natoque massa arcu tellus lorem eu hac amet.',
    },
    {
      version: 'v0.1.6',
      date: 'August, 2025',
      month: 'AUG',
      sections: [
        {
          title: "What's Changed",
          icon: 'star',
          items: [
            { text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.' },
            { text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.' },
            { text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.' },
            { text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.' },
            { text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.' },
            { text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.' },
          ],
        },
      ],
    },
    {
      version: 'v0.1.5',
      date: 'September, 2025',
      month: 'SEP',
      sections: [
        {
          title: "What's Changed",
          icon: 'star',
          items: [
            { text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.' },
            { text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.' },
            { text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.' },
            { text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.' },
            { text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.' },
            { text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="relative bg-white">
      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full relative">
        <Image
          src="/illustrations/green-arrow.svg"
          alt="decoration"
          width={160}
          height={160}
          className="absolute lg:block hidden right-28 top-24 w-40 shrink-0"
        />
        <Image
          src="/illustrations/round-13.svg"
          alt="decoration"
          width={80}
          height={80}
          className="absolute lg:block hidden right-48 top-16 w-20 shrink-0"
        />
        <Image
          src="/illustrations/round11.svg"
          alt="decoration"
          width={144}
          height={144}
          className="absolute lg:block hidden left-36 top-24 w-36 -rotate-90 shrink-0"
        />

        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1">Updates & Changelog</h1>
            <p className="max-w-3xl mx-auto text-center text-base">
              Stay up to date with the latest features, improvements, and bug fixes
            </p>
            <Image
              src="/illustrations/line-p.svg"
              alt="underline"
              width={288}
              height={20}
              className="absolute w-48 -bottom-7 sm:w-72 shrink-0"
            />
          </div>
        </div>
      </div>

      <ul
        role="list"
        className="sm:space-y-12 space-y-8 container lg:max-w-6xl w-full relative lg:pt-16 pt-12 pb-28 lg:pl-28"
      >
        {updates.map((update, idx) => (
          <UpdateCard key={update.version} update={update} isLast={idx === updates.length - 1} />
        ))}
      </ul>
    </div>
  );
}
