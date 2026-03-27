import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import NewsletterForm from '@/components/newsletter/NewsletterForm'

interface NewsletterPageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata> {
  const { locale } = await params

  if (locale !== 'de') {
    return {
      title: 'Page Not Available - Open Elements',
      description: 'This page is not available in this language',
    }
  }

  const title = 'Newsletter - Open Elements'
  const description = 'Melde dich zu unserem Newsletter an, um auf dem Laufenden zu bleiben.'

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: 'https://open-elements.com/de/newsletter',
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
      locale: 'de_DE',
    },
  }
}

export default async function NewsletterPage({ params }: NewsletterPageProps) {
  const { locale } = await params

  if (locale !== 'de') {
    notFound()
  }

  return (
    <div>
      {/* Hero background */}
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
        {/* Page title */}
        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1">Unser Newsletter</h1>
            <Image
              src="/illustrations/underline.svg"
              alt="Unterstrich"
              width={288}
              height={24}
              className="absolute w-36 -bottom-3 sm:w-56 shrink-0"
            />
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="lg:pb-48 sm:pb-32 pb-28">
        <div className="container mt-12 xl:max-w-1xl">
          <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-center text-blue max-w-xl text-lg">
              Bleib auf dem Laufenden über Open Source, Java und die neuesten Nachrichten von Open Elements.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
