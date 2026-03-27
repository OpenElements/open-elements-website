import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: any) {
  if (req.nextUrl.pathname.endsWith('sitemap.xml')) {
    return;
  }
  return intlMiddleware(req);
}

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next` or `/_vercel`
  // - ... if they contain a dot (e.g. `favicon.ico`)
  matcher: ['/', '/(de|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
