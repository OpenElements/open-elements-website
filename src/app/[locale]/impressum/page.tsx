import Image from 'next/image'
import type { Metadata } from 'next'

interface ImpressumPageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: ImpressumPageProps): Promise<Metadata> {
  const { locale } = await params

  const title = locale === 'de' ? 'Impressum - Open Elements' : 'Impressum - Open Elements'
  const description = locale === 'de' ? 'Impressum' : 'Impressum'

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'Open Elements',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
  }
}

export default async function ImpressumPage({ params }: ImpressumPageProps) {
  const { locale } = await params

  const contentHtml =
    locale === 'de'
      ? `
<p>
  Open Elements GmbH<br /><br />
  Gerhart-Hauptmann-Str. 49B<br />
  51379 Leverkusen<br /><br />
  info@open-elements.de<br />
  Telefon: 0151-22684622<br /><br />
  Geschäftsführer: Hendrik Ebbers<br />
  Amtsgericht Köln<br />
  Registernummer: HRB 112036<br />
  Umsatzsteuer-Identifikationsnummer: DE 355815175<br /><br />
  Inhaltlich Verantwortlicher gemäß § 55 Absatz 2 RStV: Hendrik Ebbers, Gerhart-Hauptmann-Str. 49B, 51379 Leverkusen
</p>
`
      : `
<p>
  Open Elements GmbH<br /><br />
  Gerhart-Hauptmann-Str. 49B<br />
  51379 Leverkusen<br />
  Germany<br /><br />
  info@open-elements.de<br />
  Fon: +49 151-22684622<br /><br />
  Managing director: Hendrik Ebbers<br />
  Local Court Cologne<br />
  Registration number: HRB 112036<br />
  Sales tax identification number: DE 355815175<br /><br />
  Responsible for the content according to § 55 paragraph 2 RStV: Hendrik Ebbers, Gerhart-Hauptmann-Str. 49B, 51379 Leverkusen
</p>
`

  return (
    <div className="relative">
      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full">
        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1">Impressum</h1>
            <Image
              src="/illustrations/underline.svg"
              alt={locale === 'de' ? 'Unterstrich' : 'Underline'}
              width={288}
              height={24}
              className="absolute w-48 -bottom-3 sm:w-72 sm:-mr-24 shrink-0"
            />
          </div>
        </div>
      </div>

      <div className="relative lg:pb-48 sm:pb-32 pb-28">
        <div className="container mt-12 xl:max-w-6xl">
          <div
            className="text-blue prose prose-a:text-purple-700 prose-code:bg-yellow prose-blockquote:border-l-0 prose-blockquote:bg-green-100 prose-blockquote:not-italic prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:rounded-3xl relative"
            style={{ maxWidth: '100%' }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  )
}