import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  DEFAULT_TEAM_TAG_COLOR,
  type TeamMember,
} from '@/types/team';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const tagColor = member.tagColor ?? DEFAULT_TEAM_TAG_COLOR;

  return (
    <Link href={member.link} className="group block">
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
        {member.tag ? (
          <span
            className="bottom-8 left-8 z-10 absolute inline-flex max-w-40 items-center rounded-full border border-white/70 px-4 py-2 text-sm font-bold text-white shadow-[0_10px_30px_rgba(18,29,73,0.18)]"
            style={{ backgroundColor: tagColor }}>
            {member.tag}
          </span>
        ) : null}
      </div>
      <div className="text-center">
        <span className="font-bold text-blue text-lg transition-colors group-hover:text-purple">
          {member.firstName} {member.lastName}
        </span>
        <p className="font-bold text-purple text-sm">{member.role}</p>
      </div>
    </Link>
  );
}
