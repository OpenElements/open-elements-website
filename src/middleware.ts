import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
const STATIC_FILE_EXTENSION_PATTERN = /\.(?:avif|bmp|css|gif|ico|jpeg|jpg|js|json|map|mp4|png|svg|txt|webm|webp|woff|woff2|xml)$/i;

export default function middleware(req: any) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith('sitemap.xml') || STATIC_FILE_EXTENSION_PATTERN.test(pathname)) {
    return;
  }
  return intlMiddleware(req);
}

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next` or `/_vercel`
  // - ... if they contain a dot (e.g. `favicon.ico`)
  matcher: ['/', '/posts/:path*', '/(de|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
