import { site, withBase } from './site';
import type { Language, Post } from './posts';

export const singleLine = (text: string) => text.replace(/\s+/g, ' ').trim();

// Escape HTML delimiters even inside JSON strings embedded in a script element.
export const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, '\\u003c');

export function structuredData({
  origin, canonical, title, description, lang, section, article,
}: {
  origin: URL;
  canonical: URL;
  title: string;
  description: string;
  lang: Language;
  section?: 'index' | 'articles' | 'about';
  article?: Post['data'];
}) {
  const absolute = (path = '') => new URL(withBase(path), origin).href;
  const isRu = lang === 'ru';
  const person = {
    '@type': 'Person',
    '@id': `${absolute()}#person`,
    name: isRu ? site.nameRu : site.name,
    alternateName: isRu ? site.name : site.nameRu,
    url: absolute(`${isRu ? 'ru/' : ''}about/`),
    sameAs: [site.github, site.telegram],
  };
  const website = {
    '@type': 'WebSite',
    '@id': `${absolute()}#website`,
    url: absolute(),
    name: site.name,
    alternateName: site.nameRu,
    inLanguage: ['en', 'ru'],
    publisher: { '@id': person['@id'] },
  };
  const page = {
    '@type': section === 'about' ? 'AboutPage' : section === 'articles' && !article ? 'CollectionPage' : 'WebPage',
    '@id': `${canonical.href}#webpage`,
    url: canonical.href,
    name: singleLine(title),
    description,
    inLanguage: lang,
    isPartOf: { '@id': website['@id'] },
    ...(section === 'about' ? { mainEntity: { '@id': person['@id'] } } : {}),
    ...(article ? { mainEntity: { '@id': `${canonical.href}#article` } } : {}),
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person, website, page,
      ...(article ? [{
        '@type': 'BlogPosting',
        '@id': `${canonical.href}#article`,
        url: canonical.href,
        headline: singleLine(article.title),
        description: article.description,
        inLanguage: lang,
        datePublished: article.publishedAt.toISOString(),
        // Omit an unknown modification date instead of inventing freshness.
        ...(article.updatedAt ? { dateModified: article.updatedAt.toISOString() } : {}),
        author: person,
        publisher: { '@id': person['@id'] },
        mainEntityOfPage: { '@id': page['@id'] },
        isPartOf: { '@id': website['@id'] },
      }] : []),
    ],
  };
}
