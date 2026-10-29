import type { Locale } from '@/lib/i18n';

export const appName: Record<Locale, string> = {
    en: 'Sekai Beyond Developers',
    zh: 'Sekai Beyond 开发者文档',
};
export const siteUrl = 'https://docs.sekaibeyond.com';
const docsContentRoute = '/llms.mdx';

export const gitConfig = {
    user: 'SekaiBeyond',
    repo: 'SekaiBeyond-Docs',
    branch: 'main',
};

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
    const segments = [page.locale ?? 'en', ...page.slugs, 'content.md'];

    return { segments, url: `${docsContentRoute}/${segments.join('/')}` };
}
