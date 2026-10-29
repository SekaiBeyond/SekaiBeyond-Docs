'use client';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ComponentProps, ReactNode } from 'react';
import SearchDialog from '@/components/search';

export function Provider({
                             i18n,
                             children,
                         }: {
    i18n: ComponentProps<typeof RootProvider>['i18n'];
    children: ReactNode;
}) {
    return (
        <RootProvider i18n={i18n} search={{ SearchDialog }}>
            {children}
        </RootProvider>
    );
}
