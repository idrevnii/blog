import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './site';

export type Language = 'en' | 'ru';
export type Post = CollectionEntry<'posts'>;

// Language and URL slug come from the file location in src/data/posts:
// 'midas.mdx' -> en, 'midas'; 'ru/midas.mdx' -> ru, 'midas'.
export const postLang = (post: Post): Language => (post.id.startsWith('ru/') ? 'ru' : 'en');
export const postSlug = (post: Post) => post.id.replace(/^ru\//, '');

export const getPosts = async (lang: Language) =>
  (await getCollection('posts', ({ data }) => !data.draft))
    .filter((post) => postLang(post) === lang)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

export const getPostUrl = (post: Post) =>
  withBase(`${postLang(post) === 'ru' ? 'ru/' : ''}articles/${postSlug(post)}/`);

/** Static paths for one language, with a link to the translated version if it exists. */
export const getArticlePaths = async (lang: Language) => {
  const other = lang === 'en' ? 'ru' : 'en';
  const posts = await getPosts(lang);
  const otherSlugs = new Set((await getPosts(other)).map(postSlug));
  const otherPrefix = other === 'ru' ? 'ru/' : '';

  return posts.map((post) => {
    const slug = postSlug(post);
    return {
      params: { slug },
      props: {
        post,
        alternatePath: otherSlugs.has(slug) ? `${otherPrefix}articles/${slug}/` : undefined,
      },
    };
  });
};

export const getReadingTime = (body = '') =>
  Math.max(1, Math.ceil(body.trim().split(/\s+/u).filter(Boolean).length / 200));
