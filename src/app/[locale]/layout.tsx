import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script';

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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body className={`${montserrat.className} bg-blue`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div id="top" className="relative overflow-x-clip bg-gray">
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </div>
          <Script src="https://code.iconify.design/2/2.2.1/iconify.min.js" strategy="afterInteractive" />
          
          {/* Iubenda Cookie Consent */}
          <Script
            id="iubenda-cookie-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var _iub = _iub || [];
                var iubendaLang = "${locale === 'de' ? 'de' : 'en'}";
                _iub.csConfiguration = {
                  "askConsentAtCookiePolicyUpdate": true,
                  "countryDetection": true,
                  "enableFadp": true,
                  "enableLgpd": true,
                  "enableUspr": true,
                  "lang": iubendaLang,
                  "lgpdAppliesGlobally": false,
                  "perPurposeConsent": true,
                  "siteId": 2724482,
                  "whitelabel": false,
                  "cookiePolicyId": 15787680,
                  "banner": {
                    "acceptButtonColor": "#5CBA9E",
                    "acceptButtonDisplay": true,
                    "backgroundColor": "#020147",
                    "closeButtonDisplay": false,
                    "customizeButtonColor": "#15649F",
                    "customizeButtonDisplay": true,
                    "explicitWithdrawalDisplay": true,
                    "listPurposes": true,
                    "logo": null,
                    "position": "bottom",
                    "prependOnBody": true,
                    "rejectButtonColor": "#15649F",
                    "rejectButtonDisplay": true,
                    "showPurposesToggles": true
                  }
                };
              `,
            }}
          />
          <Script
            src="//cdn.iubenda.com/cs/gpp/stub.js"
            strategy="afterInteractive"
          />
          <Script
            src="//cdn.iubenda.com/cs/iubenda_cs.js"
            charSet="UTF-8"
            async
            strategy="afterInteractive"
          />
          
          {/* Plausible Analytics */}
          <Script
            async
            src="https://plausible.io/js/pa-2UglNOjTjMgrvAyDUEo5D.js"
            strategy="afterInteractive"
          />
          <Script
            id="plausible-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.plausible = window.plausible || function() { (plausible.q = plausible.q || []).push(arguments) };
                plausible.init = plausible.init || function(i) { plausible.o = i || {} };
                plausible.init();
              `,
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
