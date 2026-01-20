'use client'

import { useTranslations, useLocale } from 'next-intl'
import TeamCard from './TeamCard'
import teamDataEn from '@/data/en/team.json'
import teamDataDe from '@/data/de/team.json'

export default function TeamSection() {
  const t = useTranslations('about.team')
  const locale = useLocale()
  const teamData = locale === 'de' ? teamDataDe : teamDataEn
  const visibleTeam = teamData.filter(member => member.visible)

  return (
    <div id="div1" className="scroll-mt-24 scroll-section">
      <div className="flex justify-between items-center gap-5">
        <h2 id="section_team" className="font-bold text-blue text-3xl sm:text-4xl lg:text-5xl">
          {t('title')} <span className="text-sky">{t('titleHighlight')}</span>
        </h2>
      </div>
      <div className="place-content-center gap-x-6 gap-y-6 sm:gap-y-4 grid sm:grid-cols-3 mt-8 w-full">
        {visibleTeam.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
