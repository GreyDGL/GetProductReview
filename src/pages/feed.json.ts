import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const sorted = reviews.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: SITE.title,
    home_page_url: SITE.url,
    feed_url: `${SITE.url}/feed.json`,
    description: SITE.description,
    language: 'en-US',
    authors: [
      {
        name: SITE.author.name,
        url: SITE.author.url,
      },
    ],
    items: sorted.map((entry) => ({
      id: `${SITE.url}/reviews/${entry.id}`,
      url: `${SITE.url}/reviews/${entry.id}`,
      title: entry.data.title,
      summary: entry.data.description,
      content_text: entry.data.description,
      date_published: entry.data.publishDate.toISOString(),
      ...(entry.data.updatedDate
        ? { date_modified: entry.data.updatedDate.toISOString() }
        : {}),
      authors: [{ name: entry.data.author }],
      tags: entry.data.tags,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
    },
  });
}
