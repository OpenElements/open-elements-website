import fs from 'fs';
import path from 'path';
import type { MonthlyUpdate } from '@/types/updates';

export function getAllUpdates(
  locale: string,
  product: string,
): MonthlyUpdate[] {
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    locale,
    `updates-${product}.json`,
  );

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as MonthlyUpdate[];
}
