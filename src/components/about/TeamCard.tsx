import Image from 'next/image'
import Link from 'next/link'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  link: string
  bio: string
  picture: string
  role: string
  visible: boolean
}

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div>
      <div className="relative">
        <Image
          className="size-56 object-contain shrink-0"
          src="/illustrations/team-placeholder.svg"
          alt=""
          width={224}
          height={224}
        />
        <Image
          className="bottom-5 left-1.5 absolute rounded-full size-44 object-cover shrink-0"
          src={member.picture}
          alt={`${member.firstName} ${member.lastName}`}
          width={176}
          height={176}
        />
      </div>
      <div className="text-center">
        <Link 
          href={member.link} 
          className="font-bold text-blue text-lg hover:text-purple transition-colors"
        >
          {member.firstName} {member.lastName}
        </Link>
        <p className="font-bold text-purple text-sm">{member.role}</p>
      </div>
    </div>
  )
}
