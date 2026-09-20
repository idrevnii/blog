import type { APIRoute } from 'astro';
import { withBase } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Astro site must be configured for robots.txt.');
  // A wildcard preserves the site's existing public crawler access, including
  // search and AI crawlers. On project hosting robots.txt must live at the origin.
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('sitemap.xml'), site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
