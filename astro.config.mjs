import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc';
import rehypeExternalLinks from 'rehype-external-links';

// Deploy target. Two supported configurations:
//   1. GitHub Pages project page (default, current):
//        site = 'https://<user>.github.io', base = '/<repo>'
//   2. Custom apex domain (e.g. getproductreview.com on GoDaddy):
//        site = 'https://getproductreview.com', base = '/'
//      Also: re-create public/CNAME with 'getproductreview.com' and set up DNS.
// Either deploy target can be overridden via env vars at build time:
//   SITE_URL=...  BASE_PATH=...
const SITE_URL = process.env.SITE_URL ?? 'https://greydgl.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/GetProductReview';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/drafts/'),
    }),
  ],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: 'contents', maxDepth: 3 }]],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'nofollow', 'ugc'],
        },
      ],
    ],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
