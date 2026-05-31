import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/site';
import { link } from '../../lib/path';
import { SITE_COPY, reviewPath, reviewsForLang } from '../../lib/i18n';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const lang = 'pt';
  const copy = SITE_COPY[lang];
  const sorted = reviewsForLang(reviews, lang);

  return rss({
    title: copy.feeds.rssTitle,
    description: copy.description,
    site: context.site ?? SITE.url,
    items: sorted.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: link(reviewPath(entry)),
      author: entry.data.author,
      categories: entry.data.tags,
    })),
    customData: `<language>pt-br</language>`,
  });
}
