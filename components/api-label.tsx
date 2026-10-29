'use client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import type { Locale } from '@/lib/i18n';

const labels = {
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

/** A word the API components show, in the page's language. */
export function ApiLabel({ name }: { name: keyof (typeof labels)['en'] }) {
    const { locale } = useI18n();
    return labels[locale === 'zh' ? 'zh' : 'en'][name];
}
