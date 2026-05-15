# GetProductReview

Static product-review site, built with Astro, deployed to GitHub Pages.

**Deployed at**: `https://getproductreview.com` (custom apex domain on GoDaddy,
served by GitHub Pages). The `greydgl.github.io/GetProductReview/` project URL
redirects here once DNS resolves.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321/GetProductReview/
npm run build     # outputs ./dist
npm run preview   # serves ./dist locally
```

## Writing a review

Create a new Markdown file under `src/content/reviews/`. Use one of the existing
files as a template. The filename (without `.md`) becomes the URL slug, e.g.
`my-new-review.md` → `/reviews/my-new-review`.

Required and optional frontmatter fields are defined in `src/content.config.ts`.

## Deployment

Push to `main`. The GitHub Actions workflow at `.github/workflows/deploy.yml`
builds and publishes to GitHub Pages automatically.

## Deploy targets

The site supports two deploy targets, controlled by `SITE_URL` and `BASE_PATH`
in `astro.config.mjs`.

### A. Custom apex domain — current default

```js
const SITE_URL = 'https://getproductreview.com';
const BASE_PATH = '/';
```

Served at `https://getproductreview.com`. Requires `public/CNAME` (present) +
GoDaddy DNS + the custom domain set in repo Settings → Pages.

GoDaddy DNS records for `getproductreview.com`:

| Type  | Host | Value           | TTL  |
|-------|------|-----------------|------|
| A     | @    | 185.199.108.153 | 600  |
| A     | @    | 185.199.109.153 | 600  |
| A     | @    | 185.199.110.153 | 600  |
| A     | @    | 185.199.111.153 | 600  |
| CNAME | www  | greydgl.github.io | 600 |

### B. GitHub Pages project page — fallback for testing

```js
const SITE_URL = 'https://greydgl.github.io';
const BASE_PATH = '/GetProductReview';
```

Served at `https://greydgl.github.io/GetProductReview/`. Delete `public/CNAME`
and clear the custom domain in repo Settings → Pages when using this target.

## One-time setup: Cloudflare Web Analytics

Add the site at dash.cloudflare.com → Analytics & Logs → Web Analytics → Add a
site (manual setup), copy the beacon token, and paste it into
`cloudflareAnalyticsToken` in `src/lib/site.ts`.

## Stack

- [Astro 5](https://astro.build) — static-site generator
- Self-hosted Fraunces + Inter via `@fontsource-variable`
- `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`
- Cloudflare Web Analytics (manual beacon, no proxy required)
