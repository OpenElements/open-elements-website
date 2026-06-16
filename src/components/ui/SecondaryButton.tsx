import { Link } from '@/i18n/routing';

export default function SecondaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-lg border border-blue px-6 text-sm font-bold text-blue transition-colors duration-150 hover:bg-blue hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:px-7">
      {children}
    </Link>
  );
}
