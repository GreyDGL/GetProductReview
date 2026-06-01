import { getCollection } from 'astro:content';
import { SITE } from '../../lib/site';
import { absoluteUrl } from '../../lib/path';
import {
  LANGUAGES,
  SITE_COPY,
  localizedPath,
  reviewPath,
  reviewsForLang,
} from '../../lib/i18n';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const lang = 'is';
  const copy = SITE_COPY[lang];
  const sorted = reviewsForLang(reviews, lang);

  const homeUrl = absoluteUrl(localizedPath('/', lang), SITE.url);
  const feedUrl = absoluteUrl(localizedPath('/feed.json', lang), SITE.url);
  const authorUrl = absoluteUrl(localizedPath(SITE.author.aboutPath, lang), SITE.url);

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: copy.feeds.jsonTitle,
    home_page_url: homeUrl,
    feed_url: feedUrl,
    description: copy.description,
    language: LANGUAGES[lang].schemaLanguage,
    authors: [
      {
        name: SITE.author.name,
        url: authorUrl,
      },
    ],
    items: sorted.map((entry) => {
      const itemUrl = absoluteUrl(reviewPath(entry), SITE.url);
      return {
        id: itemUrl,
        url: itemUrl,
        title: entry.data.title,
        summary: entry.data.description,
        content_text: entry.data.description,
        date_published: entry.data.publishDate.toISOString(),
        ...(entry.data.updatedDate
          ? { date_modified: entry.data.updatedDate.toISOString() }
          : {}),
        authors: [{ name: entry.data.author }],
        tags: entry.data.tags,
      };
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
    },
  });
}
