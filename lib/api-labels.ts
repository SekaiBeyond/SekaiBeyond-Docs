import type { Locale } from '@/lib/i18n';

// The words the API components show, shared by the pages and their Markdown.
export const apiLabels = {
    en: {
        scope: 'Scope',
        required: 'Required',
        request: 'Request',
        response: 'Response',
        showProperties: 'Show properties',
    },
    zh: {
        scope: '权限范围',
        required: '必填',
        request: '请求',
        response: '响应',
        showProperties: '展开属性',
    },
} satisfies Record<Locale, Record<string, string>>;
