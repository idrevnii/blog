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

A Russian translation is the same file in the `ru/` subdirectory: `ru/my-post.mdx` lives at `/ru/articles/my-post/` and is linked to the original by the language switcher. Astro components can be imported and used directly in any article:

```mdx
import Chart from '../../components/Chart.astro';

<Chart />
```

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` deploys every push to `main`. It detects whether the repository is a root user site (`idrevnii.github.io`) or a project site and configures Astro's `base` path accordingly.

After pushing the repository, open **Settings → Pages** on GitHub and select **GitHub Actions** as the source.

For a custom domain, set `SITE_URL` and `BASE_PATH=/` in the workflow and add `public/CNAME`.
