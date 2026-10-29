import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
    const { lang } = await params;
    if (!isLocale(lang)) notFound();
    const { nav, ...base } = baseOptions(lang);

    return (
        <DocsLayout {...base} nav={{ ...nav, mode: 'top' }} tabMode="navbar" tree={source.getPageTree(lang)}>
            {children}
        </DocsLayout>
    );
}
