import { redirect } from '@/i18n/routing';

interface RedirectPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { locale } = await params;

  // Forward legacy URL natively to the correct new domain.
  redirect({ href: '/support-care', locale });
}
