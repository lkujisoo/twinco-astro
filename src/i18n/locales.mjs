/**
 * 站点语言配置 —— 唯一真源。
 * astro.config.mjs、i18n 工具、语言切换器、构建脚本都从这里读。
 */

/** 默认语言：中文不带 URL 前缀，保持 /product/3177 不变 */
export const DEFAULT_LOCALE = 'zh';

/** 全部计划支持的语言（阿拉伯语暂缓，将来加进来即可） */
export const LOCALES = ['zh', 'en', 'fr', 'de', 'da', 'es', 'it', 'ja', 'ko'];

/**
 * 已完成翻译、允许对外露出的语言。
 * 规则：不做语言回退，翻译没做完的语言不生成页面、不出现在切换菜单里，
 * 避免出现中英混排的页面。翻完一种就往这里加一种。
 */
export const ENABLED_LOCALES = ['zh', 'en', 'fr', 'de', 'es', 'it', 'da', 'ja', 'ko'];

/** 语言在切换菜单里的显示名（用各自母语书写） */
export const LOCALE_LABELS = {
  zh: '中文',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  da: 'Dansk',
  es: 'Español',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
};

/** <html lang="..."> 用的标准语言标签 */
export const LOCALE_HTML_LANG = {
  zh: 'zh-CN',
  en: 'en',
  fr: 'fr',
  de: 'de',
  da: 'da',
  es: 'es',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
};

/** 书写方向。目前全部 ltr；将来加阿拉伯语时在这里标 rtl */
export const LOCALE_DIR = {
  zh: 'ltr',
  en: 'ltr',
  fr: 'ltr',
  de: 'ltr',
  da: 'ltr',
  es: 'ltr',
  it: 'ltr',
  ja: 'ltr',
  ko: 'ltr',
};
