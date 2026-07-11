#!/usr/bin/env node
/**
 * Verify that every URL currently listed in the production sitemap is still
 * reachable on a preview deployment (typically a Netlify PR preview).
 *
 * How it works:
 *   1. Downloads `${prodBase}/en/sitemap.xml` and `${prodBase}/de/sitemap.xml`
 *      and extracts every `<loc>` URL.
 *   2. For each URL, keeps only the path (+ query, if any) and requests
 *      `${previewBase}${path}` with redirect following. A final 2xx response
 *      is a pass; anything else (3xx-terminal, 4xx, 5xx, network error) is a
 *      fail.
 *   3. Also downloads the preview's own `/en/sitemap.xml` and `/de/sitemap.xml`
 *      and reports which production paths are missing from them (informational
 *      — a path can be missing from the preview sitemap and still reachable,
 *      which the reachability check catches separately).
 *
 * Usage:
 *   node scripts/check-sitemap-parity.mjs \
 *     --preview-base=https://deploy-preview-42--my-site.netlify.app \
 *     [--prod-base=https://open-elements.com] \
 *     [--concurrency=8] \
 *     [--timeout=15000]
 *
 * Exits 0 if every prod URL is reachable on the preview, 1 otherwise.
 */

const DEFAULT_PROD_BASE = 'https://open-elements.com';
const LOCALES = ['en', 'de'];
const USER_AGENT =
  'Mozilla/5.0 (compatible; open-elements-sitemap-parity/1.0; +https://github.com/open-elements/open-elements-website)';
const RETRY_STATUSES = new Set([403, 408, 425, 429, 500, 502, 503, 504]);

function parseArgs(argv) {
  const out = {
    prodBase: DEFAULT_PROD_BASE,
    previewBase: null,
    concurrency: 4,
    timeoutMs: 15000,
    retries: 3,
  };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--prod-base=')) {
      out.prodBase = arg.slice('--prod-base='.length);
    } else if (arg.startsWith('--preview-base=')) {
      out.previewBase = arg.slice('--preview-base='.length);
    } else if (arg.startsWith('--concurrency=')) {
      out.concurrency = Number(arg.slice('--concurrency='.length));
    } else if (arg.startsWith('--timeout=')) {
      out.timeoutMs = Number(arg.slice('--timeout='.length));
    } else if (arg.startsWith('--retries=')) {
      out.retries = Number(arg.slice('--retries='.length));
    } else if (arg === '--help' || arg === '-h') {
      out.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return out;
}

function stripTrailingSlash(url) {
  return url.replace(/\/+$/, '');
}

async function fetchText(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': USER_AGENT },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

function urlToPath(rawUrl) {
  try {
    const u = new URL(rawUrl);
    return `${u.pathname}${u.search}`;
  } catch {
    return null;
  }
}

async function loadSitemapPaths(base, timeoutMs) {
  const paths = new Set();
  for (const locale of LOCALES) {
    const sitemapUrl = `${base}/${locale}/sitemap.xml`;
    const xml = await fetchText(sitemapUrl, timeoutMs);
    for (const loc of extractLocs(xml)) {
      const p = urlToPath(loc);
      if (p) paths.add(p);
    }
  }
  return paths;
}

async function checkReachable(previewBase, pathAndQuery, timeoutMs, retries) {
  const target = `${previewBase}${pathAndQuery}`;
  let lastStatus = 0;
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      const backoffMs = 500 * 2 ** (attempt - 1);
      await new Promise(resolve => setTimeout(resolve, backoffMs));
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(target, {
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': USER_AGENT },
      });
      if (res.ok) {
        return {
          ok: true,
          status: res.status,
          finalUrl: res.url,
          attempts: attempt + 1,
        };
      }
      lastStatus = res.status;
      if (!RETRY_STATUSES.has(res.status)) {
        return { ok: false, status: res.status, attempts: attempt + 1 };
      }
    } catch (err) {
      lastError = err.message ?? String(err);
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    ok: false,
    status: lastStatus,
    error: lastError,
    attempts: retries + 1,
  };
}

async function runWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (true) {
        const i = cursor++;
        if (i >= items.length) return;
        results[i] = await worker(items[i], i);
      }
    },
  );
  await Promise.all(runners);
  return results;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.previewBase) {
    console.error(
      'Usage: node scripts/check-sitemap-parity.mjs --preview-base=<url> [--prod-base=<url>] [--concurrency=N] [--timeout=ms]',
    );
    process.exit(args.help ? 0 : 2);
  }

  const prodBase = stripTrailingSlash(args.prodBase);
  const previewBase = stripTrailingSlash(args.previewBase);

  console.log(`Prod base:    ${prodBase}`);
  console.log(`Preview base: ${previewBase}`);
  console.log(`Concurrency:  ${args.concurrency}`);
  console.log('');

  console.log('Downloading production sitemaps...');
  const prodPaths = await loadSitemapPaths(prodBase, args.timeoutMs);
  console.log(`  ${prodPaths.size} unique paths in production sitemap.`);

  console.log('Downloading preview sitemaps (informational)...');
  let previewPaths = new Set();
  try {
    previewPaths = await loadSitemapPaths(previewBase, args.timeoutMs);
    console.log(`  ${previewPaths.size} unique paths in preview sitemap.`);
  } catch (err) {
    console.warn(
      `  WARN: failed to fetch preview sitemap (${err.message ?? err}). ` +
        'Continuing with reachability check only.',
    );
  }

  const missingFromPreviewSitemap = [...prodPaths].filter(
    p => previewPaths.size > 0 && !previewPaths.has(p),
  );
  if (missingFromPreviewSitemap.length > 0) {
    console.log('');
    console.log(
      `Paths in prod sitemap but NOT in preview sitemap (${missingFromPreviewSitemap.length}):`,
    );
    for (const p of missingFromPreviewSitemap) console.log(`  - ${p}`);
  }

  console.log('');
  console.log(`Checking reachability of ${prodPaths.size} paths on preview...`);

  const pathList = [...prodPaths].sort();
  const results = await runWithConcurrency(
    pathList,
    args.concurrency,
    async pathAndQuery => {
      const r = await checkReachable(
        previewBase,
        pathAndQuery,
        args.timeoutMs,
        args.retries,
      );
      return { pathAndQuery, ...r };
    },
  );

  const failures = results.filter(r => !r.ok);
  const okCount = results.length - failures.length;

  console.log('');
  console.log(`Reachable: ${okCount} / ${results.length}`);

  if (failures.length > 0) {
    console.log('');
    console.log(`Broken paths (${failures.length}):`);
    for (const f of failures) {
      const detail =
        f.error != null ? `error: ${f.error}` : `status: ${f.status}`;
      console.log(`  ✗ ${f.pathAndQuery}  (${detail})`);
    }
    process.exit(1);
  }

  console.log('');
  console.log('All production URLs are reachable on the preview. ✓');
}

main().catch(err => {
  console.error(err.stack ?? err.message ?? err);
  process.exit(1);
});
