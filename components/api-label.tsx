'use client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { apiLabels } from '@/lib/api-labels';

/** A word the API components show, in the page's language. */
export function ApiLabel({ name }: { name: keyof (typeof apiLabels)['en'] }) {
    const { locale } = useI18n();
    return apiLabels[locale === 'zh' ? 'zh' : 'en'][name];
}
