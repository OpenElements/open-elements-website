'use client'

import { useTranslations, useLocale } from 'next-intl'
import PartnerCard from './PartnerCard'
import partnersDataEn from '@/data/en/partners.json'
import partnersDataDe from '@/data/de/partners.json'

export default function PartnersSection() {
  const t = useTranslations('about.partners')
  const locale = useLocale()
  const partnersData = locale === 'de' ? partnersDataDe : partnersDataEn
  const visiblePartners = partnersData.filter(partner => partner.visible)

  return (
    <div id="div3" className="scroll-mt-24 scroll-section">
      <h2 id="section_customers" className="font-bold text-blue text-3xl sm:text-4xl lg:text-5xl">
        {t('title')} <span className="text-rose">{t('titleHighlight')}</span>
      </h2>
      <div className="relative flex flex-wrap justify-center mt-7 md:mt-12 w-full">
        {visiblePartners.map((partner, index) => (
          <PartnerCard key={index} partner={partner} />
        ))}
      </div>
    </div>
  )
}
