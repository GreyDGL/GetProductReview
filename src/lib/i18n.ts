import type { CollectionEntry } from 'astro:content';

export const LANGUAGES = {
  en: {
    label: 'English',
    shortLabel: 'EN',
    htmlLang: 'en',
    hreflang: 'en',
    dateLocale: 'en-US',
    ogLocale: 'en_US',
    schemaLanguage: 'en-US',
  },
  pt: {
    label: 'Português',
    shortLabel: 'PT',
    htmlLang: 'pt-BR',
    hreflang: 'pt-BR',
    dateLocale: 'pt-BR',
    ogLocale: 'pt_BR',
    schemaLanguage: 'pt-BR',
  },
} as const;

export type Lang = keyof typeof LANGUAGES;

export type AlternatePath = {
  lang: Lang;
  path: string;
};

export const DEFAULT_LANG: Lang = 'en';

export const SITE_COPY = {
  en: {
    title: 'GetProductReview',
    tagline: 'Honest, hands-on product reviews.',
    description:
      'Independent product reviews with disclosed methodology. No affiliate fluff -- numbers, screenshots, and dealbreakers.',
    skipLink: 'Skip to content',
    navLabel: 'Primary',
    footerLabel: 'Footer',
    languageLabel: 'Language',
    nav: {
      reviews: 'Reviews',
      about: 'About',
      rss: 'RSS',
    },
    index: {
      moreReviews: 'More reviews',
      empty:
        'First review coming soon. <a href="/about">About this site -></a>',
      seeAll: 'See all reviews ->',
    },
    reviews: {
      eyebrow: 'Index',
      title: 'All reviews',
      description: 'Every review published on GetProductReview.',
      count: (count: number) =>
        `${count} ${count === 1 ? 'review' : 'reviews'} published.`,
      empty: 'No reviews yet. Check back soon.',
    },
    review: {
      label: 'Review',
      rating: (rating: number) => `Rating: ${rating} out of 10`,
      methodology: 'Methodology',
      methodologyText:
        'Reviews on GetProductReview are independent and disclose how the product was tested. See the <a href="/about">about page</a> for full methodology and disclosures.',
      aboutAuthor: 'About the author',
      aboutAuthorText:
        '<strong>{author}</strong> writes hands-on reviews at GetProductReview. <a href="/about">More about the author -></a>',
      moreReviews: 'More reviews',
      browseAll: '<a href="/reviews">Browse all reviews -></a>',
    },
    byline: {
      by: 'By',
    },
    footer: {
      about: 'About & methodology',
      reviews: 'All reviews',
      feed: 'JSON feed',
      independent:
        'All reviews are independent. Methodology disclosed on every post.',
    },
    about: {
      title: 'About',
      description:
        'About GetProductReview and its author. Disclosed methodology, no affiliate fluff.',
    },
    feeds: {
      rssTitle: 'GetProductReview RSS',
      jsonTitle: 'GetProductReview JSON Feed',
    },
  },
  pt: {
    title: 'GetProductReview',
    tagline: 'Análises de produtos honestas e testadas na prática.',
    description:
      'Análises independentes de produtos com metodologia clara. Sem exagero de afiliados: números, capturas de tela e pontos críticos.',
    skipLink: 'Pular para o conteúdo',
    navLabel: 'Principal',
    footerLabel: 'Rodapé',
    languageLabel: 'Idioma',
    nav: {
      reviews: 'Análises',
      about: 'Sobre',
      rss: 'RSS',
    },
    index: {
      moreReviews: 'Mais análises',
      empty:
        'A primeira análise chega em breve. <a href="/pt/about">Conheça o site -></a>',
      seeAll: 'Ver todas as análises ->',
    },
    reviews: {
      eyebrow: 'Índice',
      title: 'Todas as análises',
      description: 'Todas as análises publicadas no GetProductReview.',
      count: (count: number) =>
        `${count} ${count === 1 ? 'análise publicada' : 'análises publicadas'}.`,
      empty: 'Ainda não há análises. Volte em breve.',
    },
    review: {
      label: 'Análise',
      rating: (rating: number) => `Nota: ${rating} de 10`,
      methodology: 'Metodologia',
      methodologyText:
        'As análises do GetProductReview são independentes e explicam como o produto foi testado. Consulte a <a href="/pt/about">página sobre</a> para ver a metodologia e as divulgações completas.',
      aboutAuthor: 'Sobre o autor',
      aboutAuthorText:
        '<strong>{author}</strong> escreve análises práticas no GetProductReview. <a href="/pt/about">Saiba mais sobre o autor -></a>',
      moreReviews: 'Mais análises',
      browseAll: '<a href="/pt/reviews">Ver todas as análises -></a>',
    },
    byline: {
      by: 'Por',
    },
    footer: {
      about: 'Sobre e metodologia',
      reviews: 'Todas as análises',
      feed: 'Feed JSON',
      independent:
        'Todas as análises são independentes. A metodologia é divulgada em cada publicação.',
    },
    about: {
      title: 'Sobre',
      description:
        'Sobre o GetProductReview e seu autor. Metodologia clara, sem exagero de afiliados.',
    },
    feeds: {
      rssTitle: 'GetProductReview RSS em português',
      jsonTitle: 'GetProductReview Feed JSON em português',
    },
  },
} as const;

export type ReviewEntry = CollectionEntry<'reviews'>;

export function localizedPath(path: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) {
    return path;
  }

  if (path === '/') {
    return `/${lang}`;
  }

  return `/${lang}${path}`;
}

export function getNavLinks(lang: Lang) {
  const copy = SITE_COPY[lang].nav;
  return [
    { label: copy.reviews, href: localizedPath('/reviews', lang) },
    { label: copy.about, href: localizedPath('/about', lang) },
    { label: copy.rss, href: localizedPath('/rss.xml', lang) },
  ] as const;
}

export function getReviewLang(entry: ReviewEntry): Lang {
  return entry.data.lang;
}

export function getReviewSlug(entry: ReviewEntry): string {
  return entry.data.slug ?? entry.id.split('/').at(-1) ?? entry.id;
}

export function getTranslationKey(entry: ReviewEntry): string {
  return entry.data.translationKey ?? getReviewSlug(entry);
}

export function reviewPath(entry: ReviewEntry): string {
  return localizedPath(`/reviews/${getReviewSlug(entry)}`, getReviewLang(entry));
}

export function sortReviews(entries: ReviewEntry[]): ReviewEntry[] {
  return entries
    .slice()
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function reviewsForLang(entries: ReviewEntry[], lang: Lang): ReviewEntry[] {
  return sortReviews(entries.filter((entry) => getReviewLang(entry) === lang));
}

export function reviewAlternatePaths(
  entry: ReviewEntry,
  entries: ReviewEntry[]
): AlternatePath[] {
  const key = getTranslationKey(entry);
  return entries
    .filter((candidate) => getTranslationKey(candidate) === key)
    .sort((a, b) => (getReviewLang(a) === DEFAULT_LANG ? -1 : 1))
    .map((candidate) => ({
      lang: getReviewLang(candidate),
      path: reviewPath(candidate),
    }));
}

export function pageAlternatePaths(path: string): AlternatePath[] {
  return (Object.keys(LANGUAGES) as Lang[]).map((lang) => ({
    lang,
    path: localizedPath(path, lang),
  }));
}
