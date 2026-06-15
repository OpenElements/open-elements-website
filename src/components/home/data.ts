export type ProductKind = 'supportCare' | 'digitalTrust' | 'labs';

export interface BusinessAreaConfig {
  key: ProductKind;
  number: string;
  href: string;
  external?: boolean;
  background: string;
  accent: string;
  borderColor: string;
  dividerColor: string;
  image?: string;
}

export interface EngagementConfig {
  key: 'eclipse' | 'linux' | 'hiero' | 'decentralizedTrust' | 'orc' | 'asf';
  logo: string;
  logoClassName?: string;
}

export const businessAreas: BusinessAreaConfig[] = [
  {
    key: 'supportCare',
    number: '01',
    href: '/support-care/',
    background: 'bg-[#E2F0EA]',
    accent: 'text-[#28A58A]',
    borderColor: 'border-[#C9E4D9]',
    dividerColor: 'divide-[#A8DAC8]',
    image: '/19-helper 1.png',
  },
  {
    key: 'digitalTrust',
    number: '02',
    href: '/dlt-lecture/',
    background: 'bg-[#E5EFF9]',
    accent: 'text-[#E6357B]',
    borderColor: 'border-[#C5DEF3]',
    dividerColor: 'divide-[#C5DEF3]',
    image: '/illustrations/general/people-network.svg',
  },
  {
    key: 'labs',
    number: '03',
    href: 'https://github.com/OpenElementsLabs',
    external: true,
    background: 'bg-[#FADAE5]',
    accent: 'text-[#001452]',
    borderColor: 'border-[#3A559A]',
    dividerColor: 'divide-[#3A559A]',
    image: '/card-service-img.png',
  },
];

export const metricKeys = [
  'downloads',
  'foundations',
  'champions',
  'cra',
] as const;

export const engagements: EngagementConfig[] = [
  {
    key: 'eclipse',
    logo: '/illustrations/logo-eclipse.svg',
    logoClassName: 'h-14 w-auto sm:h-16',
  },
  {
    key: 'linux',
    logo: '/illustrations/logos/logo-linux-foundation.svg',
    logoClassName: 'h-16 w-auto sm:h-20',
  },
  {
    key: 'hiero',
    logo: '/illustrations/logo-hiero.svg',
    logoClassName: 'h-14 w-auto sm:h-16',
  },
  {
    key: 'decentralizedTrust',
    logo: '/lfdt.png',
    logoClassName: 'h-16 w-auto sm:h-20',
  },
  {
    key: 'orc',
    logo: '/illustrations/open_regulatory.svg',
    logoClassName: 'h-16 w-auto sm:h-20',
  },
  {
    key: 'asf',
    logo: '/support-care/foundation-logos/afs.svg',
    logoClassName: 'h-14 w-auto sm:h-16',
  },
];

export const valueKeys = ['openness', 'community', 'depth'] as const;
