import { zhCN } from '@fumadocs/language/zh-cn';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n, type Locale } from '@/lib/i18n';
import { appName, gitConfig } from '@/lib/shared';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .preset('zh', zhCN())
  .add({
    en: { displayName: 'English' },
    zh: { displayName: '简体中文' },
  });

export function baseOptions(locale: Locale): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/mika.webp" alt="" width={24} height={24} className="rounded-full" />
          <span className="font-semibold">{appName[locale]}</span>
        </>
      ),
      url: `/${locale}`,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        type: 'button',
        text: locale === 'zh' ? '官网' : 'Website',
        url: 'https://sekaibeyond.com',
        external: true,
        secondary: true,
      },
    ],
  };
}
