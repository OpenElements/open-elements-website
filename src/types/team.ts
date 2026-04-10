export const DEFAULT_TEAM_TAG_COLOR = '#5CBB9E';

export interface TeamSocial {
  name: string;
  link: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  link: string;
  bio: string;
  picture: string;
  role: string;
  socials?: TeamSocial[];
  visible: boolean;
  tag?: string;
  tagColor?: string;
}
