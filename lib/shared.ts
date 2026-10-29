export const appName = 'Sekai Beyond Developers';
export const siteUrl = 'https://docs.sekaibeyond.com';
export const docsContentRoute = '/llms.mdx';

export const gitConfig = {
  user: 'SekaiBeyond',
  repo: 'SekaiBeyond-Docs',
  branch: 'main',
};

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [page.locale ?? 'en', ...page.slugs, 'content.md'];

  return { segments, url: `${docsContentRoute}/${segments.join('/')}` };
}
