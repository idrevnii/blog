import { resolve } from 'node:path';
import sharp from 'sharp';
import { site, formatDate } from './site';
import type { Language } from './posts';

const fontfile = resolve('src/assets/fonts/InterVariable.ttf');
const escapeMarkup = (value: string) => value.replace(/[<>&"']/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[char]!);

// Pango measures and wraps the actual bundled font, including Cyrillic. Reduce
// the size for long titles instead of clipping them or relying on host fonts.
async function textBlock(text: string, width: number, height: number, size: number, color = '#181818', weight = 'normal') {
  const markup = `<span foreground="${color}" weight="${weight}">${escapeMarkup(text)}</span>`;
  for (let current = size; current >= 18; current -= 2) {
    const result = await sharp({ text: {
      text: markup, font: `Inter ${current}`, fontfile, width,
      wrap: 'word-char', rgba: true, dpi: 72,
    } }).png().toBuffer({ resolveWithObject: true });
    if (result.info.height <= height && result.info.width <= width) return result;
  }
  throw new Error(`OG text is too long to fit legibly: ${text}`);
}

export async function renderArticleOg({ title, lang, publishedAt, hostname }: {
  title: string;
  lang: Language;
  publishedAt: Date;
  hostname: string;
}) {
  const isRu = lang === 'ru';
  const [author, role, headline, domain, date] = await Promise.all([
    textBlock(isRu ? site.nameRu : site.name, 228, 80, 26, '#181818', 'bold'),
    textBlock(isRu ? site.roleRu : site.role, 228, 64, 18, '#6e6e6c'),
    textBlock(title.replace(/\s+/g, ' ').trim(), 746, 360, 64),
    textBlock(hostname, 228, 36, 22),
    textBlock(formatDate(publishedAt), 228, 30, 18, '#6e6e6c'),
  ]);
  const divider = Buffer.from('<svg width="1" height="630"><rect width="1" height="630" fill="#c9c9c5"/></svg>');
  return sharp({ create: { width: 1200, height: 630, channels: 3, background: '#f6f6f4' } })
    .composite([
      { input: divider, left: 330, top: 0 },
      { input: author.data, left: 54, top: 58 },
      { input: role.data, left: 54, top: 58 + author.info.height + 18 },
      { input: headline.data, left: 390, top: Math.round((630 - headline.info.height) / 2) },
      { input: domain.data, left: 54, top: 513 },
      { input: date.data, left: 54, top: 552 },
    ])
    .png()
    .toBuffer();
}

export async function renderSiteOg() {
  const [author, role, headline] = await Promise.all([
    textBlock(site.name, 260, 80, 28, '#181818', 'bold'),
    textBlock(site.role.toLowerCase(), 260, 64, 18, '#6e6e6c'),
    textBlock('Building systems\nthat make models\nprove their work.', 756, 360, 64),
  ]);
  const divider = Buffer.from('<svg width="1" height="630"><rect width="1" height="630" fill="#c9c9c5"/></svg>');
  return sharp({ create: { width: 1200, height: 630, channels: 3, background: '#f6f6f4' } })
    .composite([
      { input: divider, left: 330, top: 0 },
      { input: author.data, left: 54, top: 58 },
      { input: role.data, left: 54, top: 58 + author.info.height + 18 },
      { input: headline.data, left: 390, top: Math.round((630 - headline.info.height) / 2) },
    ])
    .png()
    .toBuffer();
}
