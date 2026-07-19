import { notFound } from 'next/navigation';
import { getAllUpdates } from '@/lib/updates';
import { getTranslations } from 'next-intl/server';
import UpdatesClient from '@/components/UpdatesClient';

export const PROJECTS = ['maven', 'junit'] as const;

export function generateStaticParams() {
  return PROJECTS.map(project => ({ project }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'updates' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
    },
  };
}

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string; project: string }>;
}) {
  const { locale, project } = await params;
  if (!(PROJECTS as readonly string[]).includes(project)) notFound();

  const updates = getAllUpdates(locale, project);

  return <UpdatesClient updates={updates} project={project} />;
}
