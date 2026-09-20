import { getPosts, getPostUrl, type Language } from './posts';
import { site, withBase } from './site';

interface DiscoveryPage {
  url: string;
  title: string;
  lang: Language;
  description?: string;
  lastmod?: Date;
}

// Keep the static entries in step with src/pages. Articles come from the same
// draft-filtered collection as the article routes, including unpaired translations.
export async function getDiscoveryPages(origin: URL): Promise<DiscoveryPage[]> {
  const absolute = (path: string) => new URL(path, origin).href;
  const groups = await Promise.all((['en', 'ru'] as const).map(async (lang) => {
    const isRu = lang === 'ru';
    const prefix = isRu ? 'ru/' : '';
    const pages: DiscoveryPage[] = [
      { url: absolute(withBase(prefix)), title: isRu ? site.nameRu : site.name, lang },
      { url: absolute(withBase(`${prefix}articles/`)), title: isRu ? 'Статьи' : 'Articles', lang },
      { url: absolute(withBase(`${prefix}about/`)), title: isRu ? 'Обо мне' : 'About', lang },
    ];
    for (const post of await getPosts(lang)) {
      pages.push({
        url: absolute(getPostUrl(post)),
        title: post.data.title,
        description: post.data.description,
        lang,
        lastmod: post.data.updatedAt ?? post.data.publishedAt,
      });
    }
    return pages;
  }));
  return groups.flat();
}
