import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts, postLang, postSlug, type Post } from '../../lib/posts';
import { renderArticleOg } from '../../lib/og-image';

export const getStaticPaths = (async () => {
  const posts = (await Promise.all([getPosts('en'), getPosts('ru')])).flat();
  return posts.map((post) => ({
    params: { id: `${postLang(post)}/${postSlug(post)}` },
    props: { post },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props, site }) => {
  if (!site) throw new Error('Astro site must be configured for OG images.');
  const { post } = props as { post: Post };
  const png = await renderArticleOg({
    title: post.data.title,
    lang: postLang(post),
    publishedAt: post.data.publishedAt,
    hostname: site.hostname,
  });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
