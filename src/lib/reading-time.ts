const WORDS_PER_MINUTE = 220;

const LABELS = {
  en: 'min read',
  pt: 'min de leitura',
} as const;

type Lang = keyof typeof LABELS;

export function readingTime(text: string, lang: Lang = 'en'): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} ${LABELS[lang]}`;
}
