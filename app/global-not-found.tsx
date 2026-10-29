import type { Metadata } from 'next';
import { inter } from '@/lib/font';
import { appName } from '@/lib/shared';
import './global.css';

export const metadata: Metadata = {
    title: `Page not found · ${appName.en}`,
};

export default function GlobalNotFound() {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body className="flex min-h-screen flex-col">
        <main className="m-auto flex flex-col items-center gap-3 p-8 text-center">
            <img src="/mika.webp" alt="" width={56} height={56} className="rounded-full"/>
            <h1 className="text-xl font-semibold">Page not found · 页面不存在</h1>
            <p className="text-fd-muted-foreground">This page may have moved. · 此页面可能已移动。</p>
            <p className="flex gap-4">
                <a className="text-fd-primary underline" href="/en">
                    Docs home
                </a>
                <a className="text-fd-primary underline" href="/zh">
                    文档首页
                </a>
            </p>
        </main>
        </body>
        </html>
    );
}
