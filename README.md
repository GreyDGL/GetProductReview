# GetProductReview

Static product-review site, built with Astro, deployed to GitHub Pages.

**Currently deployed at**: `https://greydgl.github.io/GetProductReview/` (GitHub Pages project page).
**Eventual home**: `https://getproductreview.com` (custom domain on GoDaddy).

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

### A. GitHub Pages project page — current default

```js
const SITE_URL = 'https://greydgl.github.io';
const BASE_PATH = '/GetProductReview';
```

Served at `https://greydgl.github.io/GetProductReview/`.

### B. Custom apex domain — switch when DNS is ready

1. **Update `astro.config.mjs`**:
   ```js
   const SITE_URL = 'https://getproductreview.com';
   const BASE_PATH = '/';
   ```

2. **Re-create the CNAME file** so GitHub Pages knows the custom domain:
   ```bash
   echo 'getproductreview.com' > public/CNAME
   ```

3. **Configure DNS at GoDaddy** for `getproductreview.com`:

   | Type  | Host | Value |
   |-------|------|-------|
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | CNAME | www  | `greydgl.github.io.` |

4. **In repo Settings → Pages**, set the **Custom domain** to `getproductreview.com` and enable **Enforce HTTPS**.

5. Commit and push. DNS propagation can take 1–24 hours.

## One-time setup: Cloudflare Web Analytics

Add the site at dash.cloudflare.com → Analytics & Logs → Web Analytics → Add a
site (manual setup), copy the beacon token, and paste it into
`cloudflareAnalyticsToken` in `src/lib/site.ts`.

## Stack

- [Astro 5](https://astro.build) — static-site generator
- Self-hosted Fraunces + Inter via `@fontsource-variable`
- `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`
- Cloudflare Web Analytics (manual beacon, no proxy required)
