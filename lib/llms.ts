import { apiLabels } from '@/lib/api-labels';
import { examples, type OperationId, objectExamples, statusText } from '@/lib/examples';
import type { Locale } from '@/lib/i18n';
import { requestSnippets } from '@/lib/snippets';

function codeBlock(lang: string, code: string) {
    return `\`\`\`${lang}\n${code}\n\`\`\``;
}

function json(value: unknown) {
    return codeBlock('json', JSON.stringify(value, null, 2));
}

function operation(id: string) {
    if (!(id in examples)) throw new Error(`No example for the operation "${id}" in lib/examples.ts.`);
    return examples[id as OperationId];
}

// The first tab, cURL, alone: an agent can write the other languages from it.
function curl(id: string) {
    const [snippet] = requestSnippets(operation(id));
    return codeBlock(snippet.lang, snippet.code);
}

/**
 * Writes out what the API components only name in a page's Markdown, which
 * llms.txt and each page's .md are made from: the request and response an
 * endpoint's page shows beside its text, and each request and object example.
 * The Markdown comes from the MDX source, so each tag is on its own line.
 */
export function renderApiComponents(markdown: string, locale: Locale): string {
    const label = apiLabels[locale];

    return markdown
        .replace(/^<ApiPage operation="(\w+)">\n([\s\S]*?)^<\/ApiPage>$/m, (_, id: string, body: string) => {
            const { status, response } = operation(id);
            return `${body}## ${label.request}\n\n${curl(id)}\n\n## ${label.response}\n\n**${status} ${statusText[status]}**\n\n${json(response)}`;
        })
        .replace(/^<RequestExample operation="(\w+)" \/>$/gm, (_, id: string) => curl(id))
        .replace(/^<ObjectExample name="(\w+)" \/>$/gm, (_, name: string) => {
            if (!(name in objectExamples)) throw new Error(`No object example "${name}" in lib/examples.ts.`);
            return json(objectExamples[name as keyof typeof objectExamples]);
        });
}
