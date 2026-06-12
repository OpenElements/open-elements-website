import { permanentRedirect } from 'next/navigation';

export const dynamic = 'force-static';

// Permanent redirect alias to the canonical feed at /feed.xml.
// Keeps existing subscribers working while consolidating to a single source of truth.
export function GET() {
  permanentRedirect('/feed.xml');
}
