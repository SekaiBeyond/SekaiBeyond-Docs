import { Card } from 'fumadocs-ui/components/card';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { ComponentProps } from 'react';
import { i18n } from '@/lib/i18n';
import { source } from '@/lib/source';

type Page = NonNullable<ReturnType<typeof source.getPage>>;

const languageFolder = new RegExp(`^(${i18n.languages.join('|')})/`);

/**
 * Links and cards that take a relative file path, such as ./keys.mdx, and point
 * at that page in the reader's language.
 */
export function createRelativeLinks(page: Page) {
    // Fumadocs looks pages up by their path within a language, but with the dir
    // parser page.path still starts with the language's folder (en/…), so a
    // relative link from it never matches. Resolve from the path without it.
    const from = { ...page, path: page.path.replace(languageFolder, '') };

    return {
        a: createRelativeLink(source, from),
        // biome-ignore lint/correctness/noComponentHookFactories: bound to this page, as Fumadocs' createRelativeLink is
        Card: ({ href, ...props }: ComponentProps<typeof Card>) => (
            <Card href={href ? source.resolveHref(href, from) : href} {...props} />
        ),
    };
}
