import { defineI18n } from 'fumadocs-core/i18n';

// Pages live in content/docs/<lang>/. A page missing from zh falls back to en,
// so the website contributor docs, written in English only, show in both.
export const i18n = defineI18n({
  languages: ['en', 'zh'],
  defaultLanguage: 'en',
  // A static site can't rewrite URLs, so every URL carries its language.
  hideLocale: 'never',
  parser: 'dir',
});

export type Locale = (typeof i18n.languages)[number];

export function isLocale(value: string): value is Locale {
  return (i18n.languages as string[]).includes(value);
}
