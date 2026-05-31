import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';
import { absoluteUrl } from '../lib/path';
import { LANGUAGES, SITE_COPY, reviewPath, reviewsForLang } from '../lib/i18n';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);

  const lines: string[] = [
    `# ${SITE.title}`,
    '',
    `> ${SITE_COPY.en.description}`,
    '',
    `${SITE.title} publishes long-form reviews and comparison roundups of products and platforms in English and Portuguese. Each review explains the evaluation criteria, includes a clear ranking or recommendation, and discloses methodology.`,
    '',
  ];

  for (const lang of Object.keys(LANGUAGES) as (keyof typeof LANGUAGES)[]) {
    const sorted = reviewsForLang(reviews, lang);
    lines.push(`## Reviews (${LANGUAGES[lang].label})`);
    lines.push('');
    for (const entry of sorted) {
      const url = absoluteUrl(reviewPath(entry), SITE.url);
      lines.push(`- [${entry.data.title}](${url}): ${entry.data.description}`);
    }
    lines.push('');
  }

  lines.push('## About');
  lines.push('');
  lines.push(
    `- [About ${SITE.title}](${absoluteUrl('/about', SITE.url)}): About the site, the author, methodology, and disclosures.`
  );
  lines.push(
    `- [Sobre ${SITE.title}](${absoluteUrl('/pt/about', SITE.url)}): Versão em português sobre o site, o autor, a metodologia e as divulgações.`
  );
  lines.push('');
  lines.push('## Feeds');
  lines.push('');
  lines.push(`- [RSS](${absoluteUrl('/rss.xml', SITE.url)})`);
  lines.push(`- [JSON Feed](${absoluteUrl('/feed.json', SITE.url)})`);
  lines.push(`- [Sitemap](${absoluteUrl('/sitemap-index.xml', SITE.url)})`);

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
