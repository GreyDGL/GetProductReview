# GetProductReview

Static product-review site, built with Astro, deployed to GitHub Pages at
`https://getproductreview.com`.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs ./dist
npm run preview   # serves ./dist locally
```

## Writing a review

Create a new Markdown file under `src/content/reviews/`. Use
`src/content/reviews/sample-review.md` as a template. The filename (without
`.md`) becomes the URL slug, e.g. `my-new-review.md` → `/reviews/my-new-review`.

Required frontmatter fields are defined in `src/content.config.ts`.

## Deployment

Push to `main`. The GitHub Actions workflow at `.github/workflows/deploy.yml`
builds and publishes to GitHub Pages automatically.

## One-time setup checklist

1. **GitHub repo Pages**: Settings → Pages → Source: **GitHub Actions**.
   Custom domain: `getproductreview.com`. Enforce HTTPS: on.
2. **GoDaddy DNS** for `getproductreview.com`:
   - `A` `@` → `185.199.108.153`
   - `A` `@` → `185.199.109.153`
   - `A` `@` → `185.199.110.153`
   - `A` `@` → `185.199.111.153`
   - `CNAME` `www` → `<your-github-username>.github.io.`
3. **Cloudflare Web Analytics**: Add the site with **Manual setup**, copy the
   beacon token, and paste it into `cloudflareAnalyticsToken` in
   `src/lib/site.ts`.

## Stack

- [Astro 5](https://astro.build) — static-site generator
- Self-hosted Fraunces + Inter via `@fontsource-variable`
- `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`
- Cloudflare Web Analytics (manual beacon, no proxy required)
