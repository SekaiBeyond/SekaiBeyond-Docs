import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
    MarkdownCopyButton,
    ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { isLocale } from '@/lib/i18n';
import { createRelativeLinks } from '@/lib/relative-links';
import { getPageMarkdownUrl, gitConfig } from '@/lib/shared';
import { source } from '@/lib/source';

export default async function Page(props: PageProps<'/[lang]/[...slug]'>) {
    const { lang, slug } = await props.params;
    if (!isLocale(lang)) notFound();
    const page = source.getPage(slug, lang);
    if (!page) notFound();

    const MDX = page.data.body;
    const markdownUrl = getPageMarkdownUrl(page).url;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
            <div className="flex items-center gap-2 border-b pb-6">
                <MarkdownCopyButton markdownUrl={markdownUrl}/>
                <ViewOptionsPopover
                    markdownUrl={markdownUrl}
                    githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
                />
            </div>
            <DocsBody>
                <MDX components={getMDXComponents(createRelativeLinks(page))}/>
            </DocsBody>
        </DocsPage>
    );
}

export function generateStaticParams() {
    return source.generateParams('slug', 'lang').filter((params) => params.slug.length > 0);
}

export async function generateMetadata(props: PageProps<'/[lang]/[...slug]'>): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const page = source.getPage(slug, lang);
    if (!page) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
