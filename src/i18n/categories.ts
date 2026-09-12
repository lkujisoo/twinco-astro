import categoriesData from '../data/categories.json';
import zh from './categories/zh.json';
import en from './categories/en.json';
import fr from './categories/fr.json';
import de from './categories/de.json';
import es from './categories/es.json';
import it from './categories/it.json';
import da from './categories/da.json';
import ja from './categories/ja.json';
import ko from './categories/ko.json';
import type { Locale } from './index';

/**
 * 分类结构（id、缩略图、层级）在 src/data/categories.json，
 * 分类名称按语言拆在 src/i18n/categories/{lang}.json，key 是 id 或 "大类id.子类id"。
 */
const names: Record<string, Record<string, string>> = { zh, en, fr, de, es, it, da, ja, ko };

export interface LocalizedSubcategory {
  id: string;
  name: string;
  thumbnail?: string;
}

export interface LocalizedCategory {
  id: string;
  name: string;
  subcategories: LocalizedSubcategory[];
}

export function getCategories(lang: Locale): LocalizedCategory[] {
  const dict = names[lang];
  if (!dict) {
    throw new Error(`[i18n] 语言 "${lang}" 还没有分类名字典：src/i18n/categories/${lang}.json`);
  }
  const pick = (key: string) => {
    const value = dict[key];
    if (value === undefined) {
      throw new Error(`[i18n] "${lang}" 缺少分类名："${key}"`);
    }
    return value;
  };
  return categoriesData.map((category) => ({
    id: category.id,
    name: pick(category.id),
    subcategories: category.subcategories.map((sub) => ({
      id: sub.id,
      name: pick(`${category.id}.${sub.id}`),
      thumbnail: sub.id === 'plastic-cabinet' && sub.thumbnail
        ? sub.thumbnail
        : sub.thumbnail ? `/images/category-thumbnails/${category.id}/${sub.id}.jpg` : undefined,
    })),
  }));
}
