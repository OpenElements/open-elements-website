import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations()

  return (
    <div className="relative">
      <div className="container xl:py-56 py-36 flex sm:flex-col flex-col-reverse gap-12 items-center justify-center">
        <Image
          className="w-full h-full 2xl:max-w-3xl lg:max-w-xl max-w-md mx-auto"
          alt="404 image"
          src="/illustrations/404.svg"
          width={768}
          height={768}
          priority
        />
        <h1 className="h1 text-center">
          <div className="lg:inline sm:block inline tracking-tight">
            <div className="relative justify-center inline-flex items-center sm:px-16 px-5 -ml-5 -mr-5 sm:-ml-16 sm:-mr-16 z-0">
              <Image
                className="absolute lg:w-56 sm:w-48 w-32 inset-0 sm:ml-8 sm:-mt-2.5 -mt-1"
                alt={t('altTexts.underline')}
                src="/illustrations/bg-oops.svg"
                width={224}
                height={100}
              />
              <span className="relative">Ooops - </span>
            </div>
          </div>
          <div className="relative inline">
            <span>{t('404.notFound')}</span>
          </div>
        </h1>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white transition-all duration-150 ease-in-out bg-purple-700 rounded-full hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
          >
            {t('home')}
          </Link>
        </div>
      </div>
    </div>
  )
}
