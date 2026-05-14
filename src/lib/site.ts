export const SITE = {
  url: 'https://getproductreview.com',
  title: 'GetProductReview',
  tagline: 'Honest, hands-on product reviews.',
  description:
    'Independent product reviews with disclosed methodology. No affiliate fluff — numbers, screenshots, and dealbreakers.',
  author: {
    name: 'Gelei',
    url: 'https://getproductreview.com/about',
    email: 'gelei@quantstamp.com',
    sameAs: [] as string[],
  },
  locale: 'en_US',
  defaultOgImage: '/og-default.png',
  cloudflareAnalyticsToken: '',
  navLinks: [
    { label: 'Reviews', href: '/reviews' },
    { label: 'About', href: '/about' },
    { label: 'RSS', href: '/rss.xml' },
  ] as const,
} as const;
