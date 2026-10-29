import { ArrowRight, BookOpen, Code2, Wrench } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RequestExample } from '@/components/api';
import { isLocale, type Locale } from '@/lib/i18n';

const copy = {
  en: {
    eyebrow: 'Sekai Beyond Developers',
    title: 'Build with Sekai Beyond',
    lead: 'Sell tickets for our events from your own app with the ticket API, and find how the Sekai Beyond website is built, tested and deployed.',
    start: 'Get started',
    reference: 'API reference',
    tryIt: 'Your first call',
    tryItLead: 'Every request carries a key in the Authorization header. List the events your key can see:',
    sections: [
      {
        href: 'ticket-api',
        icon: BookOpen,
        title: 'Ticket API',
        body: 'What the API does, getting a key, and calling it from mainland China.',
      },
      {
        href: 'api-reference',
        icon: Code2,
        title: 'API Reference',
        body: 'Every endpoint and object, with requests in cURL, Python, Node.js, Go and Java.',
      },
      {
        href: 'website',
        icon: Wrench,
        title: 'Website',
        body: 'For contributors: emulators, deployment, email, App Check, Firestore and user groups.',
      },
    ],
  },
  zh: {
    eyebrow: 'Sekai Beyond 开发者文档',
    title: '基于 Sekai Beyond 开发',
    lead: '通过门票 API，在你自己的应用里为我们的活动售票；也可以在这里了解 Sekai Beyond 官网如何构建、测试与部署。',
    start: '快速上手',
    reference: 'API 参考',
    tryIt: '第一次调用',
    tryItLead: '每个请求都在 Authorization 请求头中携带密钥。列出你的密钥可以看到的活动：',
    sections: [
      {
        href: 'ticket-api',
        icon: BookOpen,
        title: '门票 API',
        body: 'API 能做什么、如何获取密钥，以及如何从中国大陆调用。',
      },
      {
        href: 'api-reference',
        icon: Code2,
        title: 'API 参考',
        body: '所有端点与对象，附 cURL、Python、Node.js、Go 和 Java 请求示例。',
      },
      {
        href: 'website',
        icon: Wrench,
        title: '官网开发',
        body: '面向贡献者：模拟器、部署、邮件、App Check、Firestore 与用户组（英文）。',
      },
    ],
  },
} satisfies Record<Locale, unknown>;

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = copy[lang];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <section className="max-w-3xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border bg-fd-card px-3 py-1 text-sm text-fd-muted-foreground">
          <span className="size-2 rounded-full bg-linear-to-r from-sb-pink to-sb-orange" />
          {c.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{c.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-fd-muted-foreground">{c.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${lang}/ticket-api/getting-started`}
            className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            {c.start}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={`/${lang}/api-reference`}
            className="inline-flex items-center gap-2 rounded-full border bg-fd-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            {c.reference}
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {c.sections.map(({ href, icon: Icon, title, body }) => (
          <Link
            key={href}
            href={`/${lang}/${href}`}
            className="group rounded-2xl border bg-fd-card p-6 transition-colors hover:border-fd-primary/40 hover:bg-fd-accent/40"
          >
            <Icon className="mb-4 size-5 text-fd-primary" />
            <h2 className="flex items-center gap-1.5 font-semibold">
              {title}
              <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">{body}</p>
          </Link>
        ))}
      </section>

      <section className="mt-16 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{c.tryIt}</h2>
          <p className="mt-3 leading-relaxed text-fd-muted-foreground">{c.tryItLead}</p>
        </div>
        <RequestExample operation="listEvents" />
      </section>
    </main>
  );
}
