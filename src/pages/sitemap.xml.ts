import type { APIRoute } from 'astro';
import { getDiscoveryPages } from '../lib/discovery';

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[char]!);

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Astro site must be configured for the sitemap.');
  const pages = await getDiscoveryPages(site);
  const entries = pages.map(({ url, lastmod }) =>
    `  <url><loc>${escapeXml(url)}</loc>${lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : ''}</url>`,
  );
  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n'), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
