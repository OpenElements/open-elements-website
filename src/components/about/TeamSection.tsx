import TeamCard from './TeamCard'
import teamData from '@/data/en/team.json'

export default function TeamSection() {
  const visibleTeam = teamData.filter(member => member.visible)

  return (
    <div id="div1" className="scroll-mt-24 scroll-section">
      <div className="flex justify-between items-center gap-5">
        <h2 id="section_team" className="font-bold text-blue text-3xl sm:text-4xl lg:text-5xl">
          Our <span className="text-sky">Team</span>
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
