// @ts-check
import { defineConfig } from 'astro/config';
import { LOCALES, DEFAULT_LOCALE } from './src/i18n/locales.mjs';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES,
    routing: {
      // 中文不带前缀：/product/3177；其余语言带前缀：/en/product/3177
      prefixDefaultLocale: false,
    },
  },
});
