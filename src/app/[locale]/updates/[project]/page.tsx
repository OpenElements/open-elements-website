import { notFound } from 'next/navigation';
import { getAllUpdates } from '@/lib/updates';
import { PROJECTS, getProject } from '@/lib/projects';
import { getTranslations } from 'next-intl/server';
import UpdatesClient from '@/components/UpdatesClient';

export function generateStaticParams() {
  return PROJECTS.map(({ project }) => ({ project }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; project: string }>;
}) {
  const { locale, project } = await params;
  const name = getProject(project)?.name;
  const t = await getTranslations({ locale, namespace: 'updates' });
  const title = t('metaTitle', { project: name ?? '' });

  return {
    title,
    description: t('metaDescription'),
    openGraph: {
      title,
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
  if (!getProject(project)) notFound();

  const updates = getAllUpdates(locale, project);

  return <UpdatesClient updates={updates} project={project} />;
}
