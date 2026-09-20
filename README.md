# Sergey Samozhen — blog & research

A static personal blog built with Astro and MDX.

English is served from `/`; the complete Russian version is available under `/ru/`. The language switch preserves the current page.

## Local development

```sh
npm install
npm run dev
```

`npm run build` runs Astro's type/content checks and creates the static site in `dist/`.

## Add a post

Add an `.mdx` file to `src/data/posts/`:

```mdx
---
title: "Article title"
description: "Short description."
publishedAt: 2026-08-26
---

## First section

Article text.
```

The file name is the URL slug: `my-post.mdx` lives at `/articles/my-post/`. The post automatically appears on the Articles page; the home page shows the latest one. Reading time is calculated from the article body.

A Russian translation is the same file in the `ru/` subdirectory: `ru/my-post.mdx` lives at `/ru/articles/my-post/` and is linked to the original by the language switcher. Set `draft: true` to exclude a post from the published site. Set `updatedAt` only after a substantive update; it must not precede `publishedAt`.

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` deploys every push to `main` to GitHub Pages. The public URL is `https://anc13nt.dev/`; the workflow sets `SITE_URL=https://anc13nt.dev` and `BASE_PATH=/` so all canonical and discovery URLs use the custom domain.

After pushing the repository, open **Settings → Pages** on GitHub, select **GitHub Actions** as the source, set the custom domain to `anc13nt.dev`, and enable **Enforce HTTPS** once the certificate is ready. Configure the domain's DNS for GitHub Pages. `public/CNAME` also records the domain, but a custom Actions deployment still requires the Pages setting.

## Search metadata

The build generates canonical and language links, structured data, `robots.txt`, `sitemap.xml`, and `llms.txt`. Published articles are included automatically; drafts are excluded. Static navigation entries are maintained in `src/lib/discovery.ts`.

## Article sharing previews

Every published article gets a PNG preview at `/og/en/<slug>.png` or `/og/ru/<slug>.png`, generated during `astro build`. The article's Open Graph and Twitter metadata point to this image. The title, author, publication date, and domain are rendered into the existing light layout; long titles wrap and shrink to fit. No extra frontmatter or image upload is needed. Other pages use `/og.png`, also generated during the build. All previews preserve the author's name capitalization from `src/lib/site.ts`.

The renderer is `src/lib/og-image.ts`. It uses Sharp and the bundled Inter TTF from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/inter), under the adjacent Inter SIL Open Font License. Rendering works offline during builds and needs no image service or server on GitHub Pages.
