import type { Operation } from '@/lib/examples';

// The relay, since it works from mainland China and everywhere else.
const baseUrl = 'https://api.sekaibeyond.com';

export interface Snippet {
    id: string;
    label: string;
    lang: string;
    code: string;
}

function json(value: unknown, indent: string) {
    return JSON.stringify(value, null, 2).replaceAll('\n', `\n${indent}`);
}

function curl({ method, path, body }: Operation) {
    // -d makes it a POST, the only method with a body; DELETE has to be named.
    const lines = [`curl ${method === 'DELETE' ? '-X DELETE ' : ''}${baseUrl}${path}`, `-H "Authorization: Bearer $SEKAI_API_KEY"`];
    if (body !== undefined) {
        lines.push(`-H "Content-Type: application/json"`, `-d '${json(body, '  ')}'`);
    }
    return lines.join(' \\\n  ');
}

/** How a language writes a JSON value as a literal in its own code. */
interface LiteralStyle {
    step: string;
    key: (key: string) => string;
    scalar: (value: unknown) => string;
}

function literal(value: unknown, indent: string, style: LiteralStyle): string {
    if (value === null || typeof value !== 'object') return style.scalar(value);

    const inner = indent + style.step;
    const [open, close] = Array.isArray(value) ? ['[', ']'] : ['{', '}'];
    const items = Array.isArray(value)
        ? value.map((v) => literal(v, inner, style))
        : Object.entries(value).map(([k, v]) => `${style.key(k)}: ${literal(v, inner, style)}`);
    if (items.length === 0) return open + close;
    return `${open}\n${items.map((item) => inner + item).join(',\n')},\n${indent}${close}`;
}

const pythonLiteral: LiteralStyle = {
    step: '    ',
    key: (k) => JSON.stringify(k),
    scalar: (v) => (v === null ? 'None' : v === true ? 'True' : v === false ? 'False' : JSON.stringify(v)),
};

function jsString(s: string) {
    return `'${JSON.stringify(s).slice(1, -1).replaceAll('\\"', '"').replaceAll("'", "\\'")}'`;
}

const jsLiteral: LiteralStyle = {
    step: '  ',
    key: (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : jsString(k)),
    scalar: (v) => (typeof v === 'string' ? jsString(v) : JSON.stringify(v)),
};

function python({ method, path, body }: Operation) {
    const args = [`"${baseUrl}${path}"`, `headers={"Authorization": f"Bearer {os.environ['SEKAI_API_KEY']}"}`];
    if (body !== undefined) args.push(`json=${literal(body, '    ', pythonLiteral)}`);
    args.push('timeout=30');

    return `import os
import requests

response = requests.${method.toLowerCase()}(
${args.map((a) => `    ${a},`).join('\n')}
)
print(response.status_code, response.json())`;
}

function javascript({ method, path, body }: Operation) {
    // biome-ignore lint/suspicious/noTemplateCurlyInString: the ${…} is in the generated Node.js code
    const headers = ['Authorization: `Bearer ${process.env.SEKAI_API_KEY}`,'];
    if (body !== undefined) headers.push(`'Content-Type': 'application/json',`);

    const init = [
        ...(method === 'GET' ? [] : [`method: '${method}',`]),
        `headers: {\n${headers.map((h) => `    ${h}`).join('\n')}\n  },`,
        ...(body !== undefined ? [`body: JSON.stringify(${literal(body, '  ', jsLiteral)}),`] : []),
    ];

    return `const response = await fetch('${baseUrl}${path}', {
${init.map((line) => `  ${line}`).join('\n')}
});
console.log(response.status, await response.json());`;
}

function go({ method, path, body }: Operation) {
    const imports = body !== undefined ? ['bytes', 'fmt', 'io', 'net/http', 'os'] : ['fmt', 'io', 'net/http', 'os'];
    const lines: string[] = [];
    if (body !== undefined) {
        lines.push(`body := []byte(\`${JSON.stringify(body, null, 2)}\`)`);
        lines.push(`req, err := http.NewRequest("${method}", "${baseUrl}${path}", bytes.NewReader(body))`);
    } else {
        lines.push(`req, err := http.NewRequest("${method}", "${baseUrl}${path}", nil)`);
    }
    lines.push('if err != nil {', '\tpanic(err)', '}');
    lines.push('req.Header.Set("Authorization", "Bearer "+os.Getenv("SEKAI_API_KEY"))');
    if (body !== undefined) lines.push('req.Header.Set("Content-Type", "application/json")');
    lines.push(
        '',
        'res, err := http.DefaultClient.Do(req)',
        'if err != nil {',
        '\tpanic(err)',
        '}',
        'defer res.Body.Close()',
        '',
        'data, _ := io.ReadAll(res.Body)',
        'fmt.Println(res.StatusCode, string(data))',
    );

    // The body's raw string spans lines, which stay unindented: a tab inside
    // the backticks would become part of the body.
    return `package main

import (
${imports.map((i) => `\t"${i}"`).join('\n')}
)

func main() {
${lines.map((line) => (line ? `\t${line}` : line)).join('\n')}
}`;
}

function java({ method, path, body }: Operation) {
    const pad = '        ';
    const lines: string[] = [];
    if (body !== undefined) {
        const text = JSON.stringify(body, null, 2).split('\n');
        lines.push(`String body = """`, ...text.map((l) => `    ${l}`), `    """;`);
    }
    lines.push(
        'HttpRequest request = HttpRequest.newBuilder()',
        `    .uri(URI.create("${baseUrl}${path}"))`,
        '    .header("Authorization", "Bearer " + System.getenv("SEKAI_API_KEY"))',
    );
    if (body !== undefined) {
        lines.push(
            '    .header("Content-Type", "application/json")',
            `    .${method}(HttpRequest.BodyPublishers.ofString(body))`,
        );
    } else {
        lines.push(`    .${method}()`);
    }
    lines.push(
        '    .build();',
        '',
        'HttpResponse<String> response = HttpClient.newHttpClient()',
        '    .send(request, HttpResponse.BodyHandlers.ofString());',
        'System.out.println(response.statusCode() + " " + response.body());',
    );

    return `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
${lines.map((l) => (l ? pad + l : l)).join('\n')}
    }
}`;
}

export function requestSnippets(operation: Operation): Snippet[] {
    return [
        { id: 'curl', label: 'cURL', lang: 'bash', code: curl(operation) },
        { id: 'python', label: 'Python', lang: 'python', code: python(operation) },
        { id: 'javascript', label: 'Node.js', lang: 'js', code: javascript(operation) },
        { id: 'go', label: 'Go', lang: 'go', code: go(operation) },
        { id: 'java', label: 'Java', lang: 'java', code: java(operation) },
    ];
}
