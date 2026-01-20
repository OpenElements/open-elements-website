'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function CalendlyButton() {
  const t = useTranslations('contact.calendly')
  const handleClick = () => {
    // This would integrate with Cal.com or Calendly
    // For now, opening the cal.com link
    window.open('https://cal.com/open-elements/15min', '_blank')
  }

  return (
    <div className="max-w-[1080px] w-full pt-3 mx-auto">
      <div className="bg-sky-100 rounded-[28px] border-2 border-dashed border-sky p-6 w-full flex flex-col items-center justify-center text-center">
        <p>
          {t('description')}
        </p>
        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-3 px-4 py-3 mt-4 text-base font-semibold text-center text-white capitalize transition-all duration-150 ease-in-out rounded-full cursor-pointer bg-purple sm:px-6 hover:bg-purple-700 hover:shadow-3 active:shadow-none active:bg-purple"
        >
          <Image 
            src="/icons/call.svg" 
            alt="Call icon"
            width={20}
            height={20}
          />
          {t('button')}
        </button>
      </div>
    </div>
  )
}
