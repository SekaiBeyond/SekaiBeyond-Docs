import { i18nProvider } from 'fumadocs-ui/i18n';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Provider } from '@/components/provider';
import { i18n, isLocale } from '@/lib/i18n';
import { translations } from '@/lib/layout.shared';
import { appName, siteUrl } from '@/lib/shared';
import '../global.css';

// Fetched at build time and served from this site, so nothing is loaded from
// Google, which mainland China can't reach.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  const title = lang === 'zh' ? 'Sekai Beyond 开发者文档' : appName;

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
      <body className="flex flex-col min-h-screen">
        <Provider i18n={i18nProvider(translations, lang)}>{children}</Provider>
      </body>
    </html>
  );
}
