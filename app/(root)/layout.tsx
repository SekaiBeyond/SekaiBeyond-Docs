import type { ReactNode } from 'react';
import { inter } from '@/lib/font';
import '../global.css';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body className="flex min-h-screen flex-col">{children}</body>
        </html>
    );
}
