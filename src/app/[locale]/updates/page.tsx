import { redirect } from '@/i18n/routing';
import { PROJECTS } from './[project]/page';

export default async function UpdatesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: `/updates/${PROJECTS[0]}`, locale });
}
