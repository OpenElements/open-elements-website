import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'Open Elements - Open Source made right',
    de: 'Open Elements - Open Source, aber richtig',
  };
  
  const descriptions = {
    en: 'Open Source made right - Open Elements is a modern company with a clear focus on Open Source and Java',
    de: 'Open Source, aber richtig - Open Elements ist ein modernes Unternehmen mit einem Fokus auf Open Source und Java',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: ['open source', 'Java', 'OSS', 'open source Support', 'Java Support'],
    openGraph: {
      type: 'website',
      url: locale === 'de' ? 'https://open-elements.com/de' : 'https://open-elements.com/',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <div id="top" className="relative overflow-x-hidden">
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </div>
          <script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
