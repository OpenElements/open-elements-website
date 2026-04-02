import { redirect } from 'next/navigation'

export default async function AboutHendrikPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/employees/hendrik`)
}
