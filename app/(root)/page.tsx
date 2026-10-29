import type { Metadata } from 'next';
import { appName } from '@/lib/shared';

export const metadata: Metadata = {
  title: appName.en,
  icons: '/favicon.ico',
};

// A static site has no server to pick a language, so the browser does: Chinese
// readers go to /zh, everyone else to /en. The links cover a browser without
// JavaScript.
const redirect = `location.replace(navigator.languages.some(function (l) { return /^zh\\b/i.test(l); }) ? '/zh' : '/en');`;

export default function Page() {
  return (
    <main className="m-auto flex flex-col items-center gap-4 p-8 text-center">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: a constant script, with nothing from the URL or the reader in it */}
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <img src="/mika.webp" alt="" width={56} height={56} className="rounded-full" />
      <h1 className="text-xl font-semibold">{appName.en}</h1>
      <p className="flex gap-4">
        <a className="text-fd-primary underline" href="/en">
          English
        </a>
        <a className="text-fd-primary underline" href="/zh">
          简体中文
        </a>
      </p>
    </main>
  );
}
