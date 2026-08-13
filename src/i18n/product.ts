import { getCollection } from 'astro:content';
import type { Locale } from './index';

/**
 * 产品内容按语言读取。
 *
 * 内容放在 src/content/products/{lang}/<id>.md，条目 id 形如 "zh/3177"。
 * 字段不带任何语言后缀 —— 模板拿到什么就渲染什么，不需要再判断语言。
 * 新增一种语言 = 往 src/content/products/<lang>/ 里放一套文件，代码不用改。
 */

/** 参照语言：colorImages / colorSkus 的键一律取这种语言的色名 */
const KEY_LOCALE = 'en';

async function loadByLang(lang: Locale) {
  const all = await getCollection('products');
  const map = new Map<string, Record<string, any>>();
  for (const entry of all) {
    if (entry.id.startsWith(`${lang}/`)) map.set(entry.data.id, entry.data);
  }
  return map;
}

/**
 * colorImages / colorSkus 的键是英文色名，翻译后的 color.name 不能直接用来查表。
 * 这里按位置把英文色名补成 color.key。
 * 同时带上英文产品名 nameRef，让搜索在任何语言下都能用英文型号名命中。
 */
function attachRefs(product: Record<string, any>, reference?: Record<string, any>) {
  const withRef = { ...product, nameRef: reference?.name ?? product.name };
  if (!product.colors) return withRef;
  return {
    ...withRef,
    colors: product.colors.map((color: any, i: number) => ({
      ...color,
      key: reference?.colors?.[i]?.name ?? color.name,
    })),
  };
}

/** 取某种语言的全部产品 */
export async function getProductsByLang(lang: Locale) {
  const [target, reference] = await Promise.all([loadByLang(lang), loadByLang(KEY_LOCALE)]);
  return [...target.values()].map((p) => attachRefs(p, reference.get(p.id)));
}

/** 取某种语言的单个产品；该语言没有这个产品时返回 null */
export async function getProductByLang(lang: Locale, id: string) {
  const [target, reference] = await Promise.all([loadByLang(lang), loadByLang(KEY_LOCALE)]);
  const product = target.get(id);
  return product ? attachRefs(product, reference.get(id)) : null;
}

/** 全部产品 id（以默认内容语言的目录为准） */
export async function getAllProductIds(sourceLang: Locale = 'zh') {
  const map = await loadByLang(sourceLang);
  return [...map.keys()];
}
