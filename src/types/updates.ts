export interface Contributor {
  name: string;
  avatar: string;
  url: string;
}

export interface UpdateItem {
  text: string;
}

export interface UpdateSection {
  title: string;
  items: UpdateItem[];
  icon?: 'red' | 'green' | 'purple' | 'star';
  collapsible?: boolean;
}

export interface Update {
  version: string;
  date: string;
  month: string;
  isLatest?: boolean;
  overview?: string[];
  sections: UpdateSection[];
  assets?: number;
  tags?: string[];
  contributors?: Contributor[];
  contributorNote?: string;
}
