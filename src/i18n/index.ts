import { DEFAULT_LOCALE, ENABLED_LOCALES, LOCALES, LOCALE_LABELS, LOCALE_HTML_LANG, LOCALE_DIR } from './locales.mjs';
import zh from './ui/zh.json';
import en from './ui/en.json';
import fr from './ui/fr.json';
import de from './ui/de.json';
import es from './ui/es.json';
import it from './ui/it.json';
import da from './ui/da.json';
import ja from './ui/ja.json';
import ko from './ui/ko.json';

export type Locale = string;

/**
 * 已翻译完成的界面字典。翻完一种语言就在这里 import 并登记一条，
 * 同时把语言代码加进 locales.mjs 的 ENABLED_LOCALES。
 */
const dictionaries: Record<string, Record<string, string>> = { zh, en, fr, de, es, it, da, ja, ko };

export { DEFAULT_LOCALE, ENABLED_LOCALES, LOCALES, LOCALE_LABELS, LOCALE_HTML_LANG, LOCALE_DIR };

/** 从 URL 取语言码。/en/products → 'en'；/products → 'zh' */
export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

/**
 * 取翻译函数。
 * 刻意不做语言回退：缺 key 直接抛错，构建就会失败。
 * 这样可以从结构上保证线上不会出现中英混排的页面。
 */
export function useTranslations(lang: Locale) {
  const dict = dictionaries[lang];
  if (!dict) {
    throw new Error(`[i18n] 语言 "${lang}" 还没有界面字典。请先补 src/i18n/ui/${lang}.json 再把它加进 ENABLED_LOCALES。`);
  }
  return function t(key: string, params?: Record<string, string | number>): string {
    const value = dict[key];
    if (value === undefined) {
      throw new Error(`[i18n] "${lang}" 缺少文案 key："${key}"（源文案见 src/i18n/ui/zh.json）`);
    }
    if (!params) return value;
    return value.replace(/\{(\w+)\}/g, (match, name) =>
      name in params ? String(params[name]) : match
    );
  };
}

/**
 * 取原始文案模板（占位符不替换），用于把带 {n}、{q} 的模板交给客户端脚本自己填。
 */
export function rawTranslation(lang: Locale, key: string): string {
  const dict = dictionaries[lang];
  if (!dict) {
    throw new Error(`[i18n] 语言 "${lang}" 还没有界面字典：src/i18n/ui/${lang}.json`);
  }
  const value = dict[key];
  if (value === undefined) {
    throw new Error(`[i18n] "${lang}" 缺少文案 key："${key}"`);
  }
  return value;
}

/**
 * 给站内路径加语言前缀。默认语言不加，保持现有中文 URL 不变。
 * localizePath('/products', 'zh') → '/products'
 * localizePath('/products', 'fr') → '/fr/products'
 */
export function localizePath(path: string, lang: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === DEFAULT_LOCALE) return clean;
  return `/${lang}${clean === '/' ? '' : clean}`;
}

/** 语言切换菜单用：只列已翻译完成的语言 */
export function getLocaleOptions(currentLang: Locale, currentPath: string) {
  const stripped = stripLangPrefix(currentPath);
  return ENABLED_LOCALES.map((lang) => ({
    lang,
    label: LOCALE_LABELS[lang as keyof typeof LOCALE_LABELS],
    href: localizePath(stripped, lang),
    active: lang === currentLang,
  }));
}

/** 去掉路径上的语言前缀，得到语言无关的路径 */
export function stripLangPrefix(path: string): string {
  const [, first, ...rest] = path.split('/');
  if (LOCALES.includes(first) && first !== DEFAULT_LOCALE) {
    return `/${rest.join('/')}`;
  }
  return path;
}

/** 非默认语言的静态路径，供 src/pages/[lang]/ 下的 getStaticPaths 使用 */
export function nonDefaultLocalePaths() {
  return ENABLED_LOCALES.filter((lang) => lang !== DEFAULT_LOCALE).map((lang) => ({
    params: { lang },
  }));
}
