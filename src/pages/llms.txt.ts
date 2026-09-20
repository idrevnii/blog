import type { APIRoute } from 'astro';
import { getDiscoveryPages } from '../lib/discovery';
import { singleLine } from '../lib/seo';
import { site as identity } from '../lib/site';

const markdownText = (text: string) => singleLine(text).replace(/[\\`*_[\]<>]/g, '\\$&');

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Astro site must be configured for llms.txt.');
  const pages = await getDiscoveryPages(site);
  // A navigation aid assembled from existing metadata, not a second article
  // or an instruction to a model. llms.txt is not a guaranteed ranking signal.
  const lines = [`# ${identity.name}`, '', `> ${identity.description}`, ''];
  for (const lang of ['en', 'ru'] as const) {
    lines.push(`## ${lang === 'en' ? 'English' : 'Русский'}`, '');
    for (const page of pages.filter((page) => page.lang === lang)) {
      lines.push(`- [${markdownText(page.title)}](<${page.url}>)${page.description ? `: ${markdownText(page.description)}` : ''}`);
    }
    lines.push('');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
