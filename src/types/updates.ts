export type ItemType =
  | 'FEATURE'
  | 'BUG_FIX'
  | 'IMPROVEMENT'
  | 'DOCUMENTATION'
  | 'SECURITY'
  | 'MAINTENANCE';

export interface UpdateItem {
  text: string;
  link?: string;
  type: ItemType;
}

export interface UpdateCategory {
  title: string;
  items: UpdateItem[];
}

export interface MonthlyUpdate {
  month: string;
  year: number;
  excerpt: string;
  categories: UpdateCategory[];
  contributors: string[];
}
