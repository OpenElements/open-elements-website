import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import teamDataEn from '@/data/en/team.json';
import teamDataDe from '@/data/de/team.json';
import type { TeamMember } from '@/types/team';

function getMember(locale: string, slug: string): TeamMember | undefined {
  const teamData = locale === 'de' ? teamDataDe : teamDataEn;
  return teamData.find(member => member.id === slug);
}

export async function generateStaticParams() {
  const slugs = Array.from(
    new Set([...teamDataEn, ...teamDataDe].map(member => member.id)),
  );

  return ['en', 'de'].flatMap(locale =>
    slugs.map(slug => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const member = getMember(locale, slug) ?? getMember('en', slug);

  if (!member) {
    return {
      title: 'Employee Not Found - Open Elements',
    };
  }

  return {
    title: `${member.firstName} ${member.lastName} - Open Elements`,
    description: member.bio,
    openGraph: {
      title: `${member.firstName} ${member.lastName} - Open Elements`,
      description: member.bio,
      images: [
        {
          url: member.picture,
          width: 800,
          height: 800,
          alt: `${member.firstName} ${member.lastName}`,
        },
      ],
    },
  };
}

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const member = getMember(locale, slug) ?? getMember('en', slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="relative">
      <Image
        className="absolute hidden lg:block lg:right-[15%] lg:top-[25%]"
        alt="Circles"
        src="/illustrations/circles.svg"
        width={100}
        height={100}
      />
      <Image
        className="absolute hidden lg:block lg:right-[31%] lg:top-[15%]"
        alt="Arrow"
        src="/illustrations/arrow-dashed.svg"
        width={100}
        height={100}
      />

      <div className="container px-0 sm:max-w-full pt-16 pb-4 sm:pt-36 sm:pb-12 relative">
        <div className="sm:mb-8 mb-4 lg:hidden">
          <h1 className="text-center h2 sm:mb-2">
            {member.firstName} {member.lastName}
          </h1>
          <p className="text-center font-bold text-purple">{member.role}</p>
        </div>

        <div className="flex flex-col sm:gap-8 gap-6 items-center justify-center mb-16 lg:flex-row w-full">
          <div className="relative flex items-center justify-center w-full max-w-xs sm:max-w-md lg:w-1/2">
            <Image
              className="w-full max-w-md"
              alt="background"
              src="/illustrations/bg-employee.svg"
              width={512}
              height={512}
            />
            <Image
              className="xl:size-77 lg:size-66.25 sm:size-77 size-54 border border-purple rounded-full object-cover absolute top-[17%] xl:right-[10%] lg:right-[10.5%] sm:right-[9%] right-[11%]"
              alt="employee"
              src={member.picture}
              width={310}
              height={310}
              priority
            />
          </div>
          <div className="w-full sm:max-w-lg lg:text-left text-center">
            <div className="mb-4 lg:block hidden">
              <h1 className="h2 mb-2">
                {member.firstName} {member.lastName}
              </h1>
              <p className="font-bold text-purple">{member.role}</p>
            </div>
            <div className="text-base text-blue leading-7">{member.bio}</div>
            {member.socials && member.socials.length > 0 ? (
              <div className="flex items-center lg:justify-start justify-center gap-2 mt-6">
                {member.socials.map(social => (
                  <a
                    key={social.name}
                    href={social.link}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center transition-colors duration-150 ease-in-out rounded-full focus:outline-none size-9 shrink-0 bg-blue/90 hover:bg-purple-700">
                    <span
                      className="iconify text-xl text-white fill-current"
                      data-icon={social.icon}></span>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
