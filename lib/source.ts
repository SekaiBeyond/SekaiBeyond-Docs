import { llms, loader } from 'fumadocs-core/source';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineDocs } from 'fumadocs-mdx/macro';
import { i18n, isLocale } from '@/lib/i18n';
import { renderApiComponents } from '@/lib/llms';

const docs = defineDocs({
    dir: 'content/docs',
    docs: {
        schema: pageSchema,
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
    meta: {
        schema: metaSchema,
    },
});

export const source = loader({
    baseUrl: '/',
    source: docs.toFumadocsSource(),
    i18n,
});

export const docsLlms = llms(source, {
    renderPage: async (page) => {
        const locale = page.locale && isLocale(page.locale) ? page.locale : i18n.defaultLanguage;
        return `# ${page.data.title} (${page.url})

${renderApiComponents(await page.data.getText('processed'), locale)}`;
    },
});
