import { notFound } from 'next/navigation';
import { getAllUpdates } from '@/lib/updates';
import { getTranslations } from 'next-intl/server';
import UpdatesClient from '@/components/UpdatesClient';

const PROJECTS: Record<string, string> = {
  maven: 'Apache Maven',
  junit: 'JUnit',
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map(product => ({ product }));
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
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product } = await params;
  const project = PROJECTS[product];
  if (!project) notFound();

  const updates = getAllUpdates(locale, product);

  return <UpdatesClient updates={updates} project={project} />;
}
