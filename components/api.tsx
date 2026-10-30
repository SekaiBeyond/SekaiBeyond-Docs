import { highlight } from 'fumadocs-core/highlight';
import {
    CodeBlock,
    CodeBlockTab,
    CodeBlockTabs,
    CodeBlockTabsList,
    CodeBlockTabsTrigger,
    Pre,
} from 'fumadocs-ui/components/codeblock';
import type { ReactNode } from 'react';
import { ApiLabel } from '@/components/api-label';
import { cn } from '@/lib/cn';
import { examples, type Method, type OperationId, objectExamples, statusText } from '@/lib/examples';
import { requestSnippets } from '@/lib/snippets';

// The same themes as the MDX code blocks. With no default color, every color
// is a CSS variable, which Fumadocs switches with the site's theme.
const themes = { light: 'github-light', dark: 'github-dark' } as const;

async function Highlighted({ code, lang }: { code: string; lang: string }) {
    return highlight(code, {
        lang,
        themes,
        defaultColor: false,
        components: { pre: (props) => <Pre {...props} /> },
    });
}

const methodColors: Record<Method, string> = {
    GET: 'bg-method-get/10 text-method-get',
    POST: 'bg-method-post/10 text-method-post',
    DELETE: 'bg-method-delete/10 text-method-delete',
};

function MethodBadge({ method }: { method: Method }) {
    return (
        <span className={cn('rounded-md px-1.5 py-0.5 font-mono text-xs font-semibold', methodColors[method])}>
      {method}
    </span>
    );
}

/** The method, path and scope at the top of an endpoint's page. */
export function Endpoint({ method, path, scope }: { method: Method; path: string; scope: string }) {
    // Keyed by where each part starts in the path, which never changes.
    let offset = 0;
    const parts = path.split(/(\{[^}]+\})/).map((text) => {
        const at = offset;
        offset += text.length;
        return { text, at };
    });

    return (
        <div
            className="not-prose my-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border bg-fd-card px-3 py-2.5">
            <MethodBadge method={method}/>
            <code className="font-mono text-sm break-all">
                {parts.map(({ text, at }) =>
                        text.startsWith('{') ? (
                            <span key={at} className="text-mint">
              {text}
            </span>
                        ) : (
                            text
                        ),
                )}
            </code>
            <span className="ms-auto text-xs text-fd-muted-foreground">
        <ApiLabel name="scope"/> <code className="rounded bg-fd-muted px-1 py-0.5 font-mono">{scope}</code>
      </span>
        </div>
    );
}

/** An operation's request, in each language the snippets cover. */
export async function RequestExample({ operation }: { operation: OperationId }) {
    const snippets = requestSnippets(examples[operation]);

    return (
        <div className="not-prose">
            <p className="mb-2 text-sm font-medium text-fd-muted-foreground">
                <ApiLabel name="request"/>
            </p>
            <CodeBlockTabs defaultValue={snippets[0].id} groupId="request-language" persist>
                <CodeBlockTabsList>
                    {snippets.map((s) => (
                        <CodeBlockTabsTrigger key={s.id} value={s.id}>
                            {s.label}
                        </CodeBlockTabsTrigger>
                    ))}
                </CodeBlockTabsList>
                {snippets.map((s) => (
                    <CodeBlockTab key={s.id} value={s.id}>
                        <CodeBlock>
                            <Highlighted code={s.code} lang={s.lang}/>
                        </CodeBlock>
                    </CodeBlockTab>
                ))}
            </CodeBlockTabs>
        </div>
    );
}

/** An operation's successful response. */
export async function ResponseExample({ operation }: { operation: OperationId }) {
    const { status, response } = examples[operation];

    return (
        <div className="not-prose">
            <p className="mb-2 text-sm font-medium text-fd-muted-foreground">
                <ApiLabel name="response"/>{' '}
                <span className="ms-1 rounded-md bg-method-get/10 px-1.5 py-0.5 font-mono text-xs text-method-get">
          {status} {statusText[status]}
        </span>
            </p>
            <CodeBlock>
                <Highlighted code={JSON.stringify(response, null, 2)} lang="json"/>
            </CodeBlock>
        </div>
    );
}

/** An example of one of the objects the API returns. */
export async function ObjectExample({ name }: { name: keyof typeof objectExamples }) {
    return (
        <CodeBlock>
            <Highlighted code={JSON.stringify(objectExamples[name], null, 2)} lang="json"/>
        </CodeBlock>
    );
}

/**
 * An endpoint's page: the text on the left and, on wide screens, its request
 * and response held beside it as the reader scrolls.
 */
export function ApiPage({ operation, children }: { operation: OperationId; children: ReactNode }) {
    return (
        <div className="grid gap-x-10 gap-y-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
            <div className="min-w-0 [&>:first-child]:mt-0">{children}</div>
            <aside
                className="flex min-w-0 flex-col gap-6 xl:sticky xl:top-[calc(var(--fd-header-height)+1.5rem)] xl:max-h-[calc(100dvh-var(--fd-header-height)-3rem)] xl:self-start xl:overflow-y-auto">
                <RequestExample operation={operation}/>
                <ResponseExample operation={operation}/>
            </aside>
        </div>
    );
}

/** A request parameter or a response field. */
export function Param({
                          name,
                          type,
                          required,
                          children,
                      }: {
    name: string;
    type: string;
    required?: boolean;
    children?: ReactNode;
}) {
    return (
        <div className="border-b py-4 first:pt-0 last:border-b-0 [&_p]:my-2 [&_p:last-child]:mb-0">
            <div className="not-prose flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <code className="font-mono text-sm font-semibold text-fd-foreground">{name}</code>
                <span className="font-mono text-xs text-fd-muted-foreground">{type}</span>
                {required && (
                    <span
                        className="rounded-md bg-fd-primary/10 px-1.5 py-0.5 text-[0.7rem] font-medium text-fd-primary">
            <ApiLabel name="required"/>
          </span>
                )}
            </div>
            {children && <div className="mt-1.5 text-[0.9375rem] text-fd-muted-foreground">{children}</div>}
        </div>
    );
}

/** A list of parameters or fields. */
export function Params({ children }: { children: ReactNode }) {
    return <div className="my-4">{children}</div>;
}

/** An object parameter's own fields, folded away until asked for. */
export function Properties({ children }: { children: ReactNode }) {
    return (
        <details className="group mt-3 rounded-lg border bg-fd-card/60 open:pb-1">
            <summary
                className="cursor-pointer list-none px-3 py-2 text-sm font-medium text-fd-foreground select-none [&::-webkit-details-marker]:hidden">
                <span className="me-1.5 inline-block transition-transform group-open:rotate-90">›</span>
                <ApiLabel name="showProperties"/>
            </summary>
            <div className="border-t px-3 pt-4">{children}</div>
        </details>
    );
}
