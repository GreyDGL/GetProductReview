import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';
import { absoluteUrl } from '../lib/path';
import { LANGUAGES, SITE_COPY, reviewPath, reviewsForLang } from '../lib/i18n';
import type { APIContext } from 'astro';

const dateOnly = (d: Date) => d.toISOString().slice(0, 10);

export async function GET(_context: APIContext) {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);

  const lines: string[] = [
    `# ${SITE.title} — Full Content`,
    '',
    `> ${SITE_COPY.en.description}`,
    '',
    `This file contains a structured summary of every English and Portuguese review on ${SITE.title}, formatted for ingestion by language models. Reviews are listed newest first within each language.`,
    '',
    '---',
    '',
  ];

  for (const lang of Object.keys(LANGUAGES) as (keyof typeof LANGUAGES)[]) {
    lines.push(`## Language: ${LANGUAGES[lang].label}`);
    lines.push('');

    for (const entry of reviewsForLang(reviews, lang)) {
      const d = entry.data;
      const url = absoluteUrl(reviewPath(entry), SITE.url);

      lines.push(`### ${d.title}`);
      lines.push('');
      lines.push(`- URL: ${url}`);
      lines.push(`- Author: ${d.author}`);
      lines.push(`- Published: ${dateOnly(d.publishDate)}`);
      lines.push(`- Category: ${d.productCategory}`);
      if (typeof d.rating === 'number') {
        lines.push(`- Rating: ${d.rating} / 10`);
      }
      lines.push('');
      lines.push(d.description);
      lines.push('');

      if (d.itemList && d.itemList.length > 0) {
        lines.push('#### Ranking');
        lines.push('');
        const ordered = d.itemList
          .slice()
          .sort((a, b) => a.position - b.position);
        for (const item of ordered) {
          const score = typeof item.score === 'number' ? ` — ${item.score}` : '';
          const summary = item.summary ? ` — ${item.summary}` : '';
          lines.push(`${item.position}. ${item.name}${score}${summary}`);
        }
        lines.push('');
      }

      lines.push(`See the full review at ${url}.`);
      lines.push('');
      lines.push('---');
      lines.push('');
    }

    lines.push('');
  }

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
