import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { DEFAULT_TEAM_TAG_COLOR, type TeamMember } from '@/types/team';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const tagColor = member.tagColor ?? DEFAULT_TEAM_TAG_COLOR;
  const tagStyle = {
    backgroundColor: tagColor,
    boxShadow:
      '0 12px 28px rgba(2, 1, 68, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
  };

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
        <div className="bottom-5 left-1.5 absolute size-44">
          <Image
            className="rounded-full size-44 object-cover shrink-0"
            src={member.picture}
            alt={`${member.firstName} ${member.lastName}`}
            width={176}
            height={176}
          />
          {member.tag ? (
            <span
              className="pointer-events-none absolute top-32 left-1/2 z-10 inline-flex min-w-28 max-w-36 -translate-x-1/2 items-center justify-center rounded-full border border-white/75 px-3 py-1.5 text-center text-[13px] font-semibold leading-none text-white backdrop-blur-[2px]"
              style={tagStyle}>
              {member.tag}
            </span>
          ) : null}
        </div>
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
