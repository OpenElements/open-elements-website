import { getAllUpdates } from '@/lib/updates';
import { getTranslations } from 'next-intl/server';
import UpdatesClient from '@/components/UpdatesClient';

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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const updates = getAllUpdates(locale);

  return <UpdatesClient updates={updates} />;
}

