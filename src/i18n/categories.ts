import categoriesData from '../data/categories.json';
import zh from './categories/zh.json';
import en from './categories/en.json';
import type { Locale } from './index';

/**
 * 分类结构（id、缩略图、层级）在 src/data/categories.json，
 * 分类名称按语言拆在 src/i18n/categories/{lang}.json，key 是 id 或 "大类id.子类id"。
 */
const names: Record<string, Record<string, string>> = { zh, en };

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
      thumbnail: sub.thumbnail,
    })),
  }));
}
