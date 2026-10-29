import { i18nProvider } from 'fumadocs-ui/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Provider } from '@/components/provider';
import { inter } from '@/lib/font';
import { i18n, isLocale } from '@/lib/i18n';
import { translations } from '@/lib/layout.shared';
import { appName, siteUrl } from '@/lib/shared';
import '../global.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const title = appName[lang];

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s · ${title}` },
    icons: '/favicon.ico',
  };
}

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang === 'zh' ? 'zh-CN' : 'en'} className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider i18n={i18nProvider(translations, lang)}>{children}</Provider>
      </body>
    </html>
  );
}
