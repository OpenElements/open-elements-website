import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import deQuotes from '@/data/de/quotes.json';
import enQuotes from '@/data/en/quotes.json';

interface DltLecturePageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface Quote {
  id: string;
  name: string;
  title: string;
  image?: string;
  text: string;
}

function getDltQuote(locale: string) {
  const quotes = (locale === 'de' ? deQuotes : enQuotes) as Quote[];
  return quotes.find(quote => quote.id === 'fabian-dlt');
}

export async function generateMetadata({
  params,
}: DltLecturePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dltLecture' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      type: 'website',
      title: t('metaTitle'),
      description: t('metaDescription'),
      siteName: 'Open Elements',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
  };
}

export default async function DltLecturePage({ params }: DltLecturePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dltLecture' });
  const quote = getDltQuote(locale);
  const bulletPoints = t.raw('bulletPoints') as string[];
  const quoteName = quote?.name ?? t('quoteNameFallback');
  const quoteTitle = quote?.title ?? t('quoteTitleFallback');
  const quoteText = quote?.text ?? t('quoteTextFallback');

  return (
    <div>
      <div className="absolute left-0 w-full top-0 h-48 -z-10 overflow-hidden">
        <Image
          src="/illustrations/hero-bg-2.svg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full">
        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1">{t('title')}</h1>
            <Image
              src="/illustrations/underline.svg"
              alt={t('underlineAlt')}
              width={288}
              height={24}
              className="absolute w-48 -bottom-3 sm:w-72 sm:-mr-24 shrink-0"
            />
          </div>
        </div>
      </div>

      <div className="lg:pb-48 sm:pb-32 pb-28">
        <div className="container mt-3 xl:max-w-6xl">
          <div className="text-blue w-full max-w-none prose prose-a:text-purple-700 prose-code:bg-yellow prose-blockquote:border-l-0 prose-blockquote:bg-green-100 prose-blockquote:not-italic prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:rounded-3xl relative mx-auto">
            <p>
              {t.rich('intro', {
                hendrik: chunks => <Link href="/about-hendrik">{chunks}</Link>,
                oth: chunks => (
                  <a
                    href="https://www.oth-regensburg.de"
                    target="_blank"
                    rel="noopener noreferrer">
                    {chunks}
                  </a>
                ),
              })}
            </p>

            <p>{t('summary')}</p>

            <h2>{t('excerptHeading')}</h2>

            <p>{t('excerptIntro')}</p>

            <ul>
              {bulletPoints.map(bulletPoint => (
                <li key={bulletPoint}>{bulletPoint}</li>
              ))}
            </ul>

            <h2>{t('quoteHeading')}</h2>

            <div className="bg-green-100 rounded-3xl sm:px-8 px-6 sm:py-7 py-5 relative my-8 not-prose">
              <svg
                className="sm:absolute right-12 top-9 opacity-20 sm:w-16 sm:h-16 sm:mb-0 w-8 h-8 mb-5"
                width="64"
                height="56"
                viewBox="0 0 64 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path
                  d="M.0136073 40.4101c0 8.4143 6.8207027 15.235 15.2347927 15.235 8.4143.0 15.235-6.8207 15.235-15.235.0-8.4142-6.8207-15.2348-15.235-15.2348C13.5192 25.1753 11.8639 25.4767 10.3143 26.008 13.7428 6.34466 29.0764-6.33595 14.8622 4.10044-.899196 15.6732-.00327316 39.9445.0143631 40.3893.0143631 40.3963.0136073 40.4024.0136073 40.4101z"
                  fill="#5cba9e"
                />
                <path
                  d="M33.5254 40.4101c0 8.4143 6.8207 15.235 15.2349 15.235 8.4143.0 15.235-6.8207 15.235-15.235.0-8.4142-6.8208-15.2348-15.2351-15.2348C47.0308 25.1753 45.3757 25.4767 43.8261 26.008 47.2546 6.34466 62.5882-6.33595 48.374 4.10044 32.6126 15.6732 33.5084 39.9445 33.5261 40.3893 33.5261 40.3963 33.5254 40.4024 33.5254 40.4101z"
                  fill="#5cba9e"
                />
              </svg>

              <div className="flex sm:flex-row flex-col sm:items-center sm:gap-5 gap-3 sm:mb-5 mb-2">
                <div className="sm:w-24 sm:h-24 w-16 h-16 overflow-hidden shrink-0 flex items-center justify-center bg-white rounded-full">
                  <Image
                    src={
                      quote?.image
                        ? `/quotes/${quote.image}`
                        : '/quotes/fabian.jpeg'
                    }
                    alt={quoteName}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-blue">{quoteName}</p>
                  <p className="text-base font-semibold">{quoteTitle}</p>
                </div>
              </div>

              <p className="text-blue text-base sm:leading-8 leading-7 font-medium">
                {quoteText}
              </p>

              <svg
                className="w-full h-full mt-6"
                width="700"
                height="2"
                viewBox="0 0 700 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path
                  opacity=".6"
                  d="M0 1H700"
                  stroke="#5cba9e"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
