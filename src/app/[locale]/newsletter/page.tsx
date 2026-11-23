/* eslint-disable @next/next/no-img-element */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsletterForm from '@/components/newsletter/NewsletterForm';

interface NewsletterPageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface NewsletterContent {
  title: string;
  description?: string;
  headline: string;
  headlineHighlight?: string;
  intro?: string;
  cta?: string;
  ctaHighlight?: string;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function loadNewsletterContent(locale: string): NewsletterContent | null {
  const filename = locale === 'de' ? 'index.de.md' : 'index.md';
  const filePath = path.join(process.cwd(), 'content', 'newsletter', filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  const title = optionalString(data.title) ?? 'Newsletter';

  return {
    title,
    description: optionalString(data.description),
    headline: optionalString(data.headline) ?? title,
    headlineHighlight: optionalString(data.headline_highlight),
    intro: optionalString(data.intro),
    cta: optionalString(data.cta),
    ctaHighlight: optionalString(data.cta_highlight),
  };
}

// Wraps the first occurrence of `highlight` in `text` using `wrap`.
function renderHighlighted(
  text: string,
  highlight: string | undefined,
  wrap: (highlight: string) => React.ReactNode,
) {
  const index = highlight ? text.indexOf(highlight) : -1;

  if (!highlight || index === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, index)}
      {wrap(highlight)}
      {text.slice(index + highlight.length)}
    </>
  );
}

export async function generateMetadata({
  params,
}: NewsletterPageProps): Promise<Metadata> {
  const { locale } = await params;
  const page = loadNewsletterContent(locale);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = `${page.title} - Open Elements`;
  const description = page.description;
  const localePrefix = locale === 'de' ? '/de' : '';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `https://open-elements.com${localePrefix}/newsletter`,
      title,
      description,
      siteName: 'Open Elements',
      images: [
        {
          url: '/open-graph/open-elements.png',
          width: 1200,
          height: 630,
          alt: 'OpenElements Logo',
        },
      ],
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
  };
}

export default async function NewsletterPage({ params }: NewsletterPageProps) {
  const { locale } = await params;
  const page = loadNewsletterContent(locale);

  if (!page) {
    notFound();
  }

  return (
    <div className="relative bg-white">
      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full relative">
        <img
          src="/illustrations/round-13.svg"
          alt=""
          className="absolute right-28 top-24 w-20 shrink-0"
        />
        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1">
              {renderHighlighted(page.headline, page.headlineHighlight, h => (
                <span className="text-green">{h}</span>
              ))}
            </h1>
            <p className="max-w-3xl mx-auto text-center text-base">
              {page.intro}
              {page.intro && page.cta && <br />}
              {page.cta &&
                renderHighlighted(page.cta, page.ctaHighlight, h => <b>{h}</b>)}
            </p>
            <img
              src="/illustrations/line-p.svg"
              alt=""
              className="absolute w-48 -bottom-7 sm:w-72 shrink-0"
            />
          </div>
        </div>
      </div>
      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full relative flex items-center justify-center">
        <a
          href="#newsletter-form-section"
          className="shrink-0 sm:mt-14 mt-28 lg:scale-100 scale-110 relative z-10 hover:opacity-95 transition-opacity">
          <img src="/illustrations/book.png" alt="" />
        </a>
        <img
          src="/illustrations/plane.svg"
          alt=""
          className="absolute top-0 lg:scale-105 scale-125 xl:-right-24 sm:block hidden"
        />
        <img
          src="/illustrations/plane-sm.svg"
          alt=""
          className="absolute -right-3 top-16 sm:hidden"
        />
        <img
          src="/illustrations/sky-round.svg"
          alt=""
          className="absolute xl:left-44 lg:left-12 md:-left-28 sm:-left-28 -left-44 lg:scale-100 sm:scale-90 sm:top-12 scale-50"
        />
        <img
          src="/illustrations/round-11.svg"
          alt=""
          className="absolute opacity-50 size-36 xl:right-72 lg:right-28 md:right-12 sm:right-8 -right-4 sm:top-14 top-20"
        />
        <img
          src="/illustrations/green-arrow.svg"
          alt=""
          className="absolute size-44 xl:right-52 lg:right-7 md:-right-10 sm:-right-12 sm:top-12 top-0 -right-7 sm:scale-100 scale-75"
        />
      </div>
      <div className="bg-gray -mt-12 sm:mt-0">
        <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full relative flex items-center justify-center">
          <img
            src="/illustrations/round-1.svg"
            alt=""
            className="absolute lg:size-96 sm:size-72 size-60 sm:-left-56 sm:right-auto -right-32 sm:top-16 sm:bottom-auto bottom-24"
          />
          <img
            src="/illustrations/round11.svg"
            alt=""
            className="absolute lg:size-56 sm:size-40 size-24 lg:right-10 sm:-right-5 right-2 sm:top-16 top-8"
          />
          <div
            id="newsletter-form-section"
            className="pb-28 pt-36 max-w-2xl mx-auto relative">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
