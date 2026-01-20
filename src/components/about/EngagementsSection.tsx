'use client'

import { useTranslations, useLocale } from 'next-intl'
import EngagementCard from './EngagementCard'
import engagementsDataEn from '@/data/en/engagements.json'
import engagementsDataDe from '@/data/de/engagements.json'

export default function EngagementsSection() {
  const t = useTranslations('about.engagements')
  const locale = useLocale()
  const engagementsData = locale === 'de' ? engagementsDataDe : engagementsDataEn
  const visibleEngagements = engagementsData.filter(engagement => engagement.visible)

  return (
    <div id="div2" className="scroll-mt-24 scroll-section">
      <h2 id="section_engagement" className="font-bold text-blue text-3xl sm:text-4xl lg:text-5xl">
        {t('title')} <span className="text-purple">{t('titleHighlight')}</span>
      </h2>
      <div className="gap-5 grid md:grid-cols-2 mt-7 md:mt-12 w-full">
        {visibleEngagements.map((engagement, index) => (
          <EngagementCard key={index} engagement={engagement} />
        ))}
      </div>
    </div>
  )
}
