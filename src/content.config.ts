import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 产品内容按语言分目录：src/content/products/{lang}/<id>.md
 * 条目 id 形如 "zh/3177"、"en/3177"。
 * 所有字段都不带语言后缀 —— 语言由所在目录决定。
 */
const products = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/products' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    subtitle: z.string().optional(),
    category: z.string(),
    subcategory: z.string(),
    description: z.string(),
    material: z.string(),
    dimensions: z.string(),
    maxLoad: z.string().optional(),
    certifications: z.array(z.string()).optional(),
    certificateCards: z.array(z.object({
      title: z.string(),
      image: z.string(),
      href: z.string(),
    })).optional(),
    defaultImage: z.string().optional(),
    colors: z.array(z.object({
      name: z.string(),
      hex: z.string(),
      image: z.string().optional(),
      imageHandrail: z.string().optional(),
      imageWheels: z.string().optional(),
      imageBoth: z.string().optional(),
      sku: z.string().optional(),
      ral: z.string().optional(),
    })).optional(),
    hasAccessories: z.boolean().optional(),
    accessoryButtons: z.array(z.object({
      key: z.string(),
      label: z.string(),
    })).optional(),
    addons: z.array(z.object({
      key: z.string(),
      label: z.string(),
    })).optional(),
    stepVariants: z.array(z.object({
      steps: z.number(),
      sku: z.string(),
      label: z.string(),
      image: z.string(),
      dimensions: z.string(),
      maxLoad: z.string().optional(),
      colorImages: z.record(z.string()).optional(),
      colorSkus: z.record(z.string()).optional(),
      addonImages: z.record(z.string()).optional(),
    })).optional(),
    accessories: z.array(z.object({
      label: z.string(),
      sku: z.string(),
      image: z.string().optional(),
      description: z.string().optional(),
    })).optional(),
    gridVariants: z.object({
      columns: z.array(z.object({ label: z.string() })),
      rows: z.array(z.object({ label: z.string() })),
      cells: z.array(z.object({
        row: z.number(),
        col: z.number(),
        sku: z.string(),
        image: z.string(),
        dimensions: z.string().optional(),
        maxLoad: z.string().optional(),
      })),
    }).optional(),
    optionProducts: z.array(z.object({
      id: z.string(),
      name: z.string(),
      subtitle: z.string().optional(),
      description: z.string(),
      material: z.string().optional(),
      dimensions: z.string().optional(),
      defaultImage: z.string(),
      colors: z.array(z.object({
        name: z.string(),
        hex: z.string(),
        sku: z.string(),
        image: z.string(),
      })),
      specs: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
      features: z.array(z.string()).optional(),
    })).optional(),
    features: z.array(z.string()).optional(),
    highlights: z.array(z.object({
      image: z.string().optional(),
      title: z.string(),
      text: z.string(),
    })).optional(),
    infoSections: z.array(z.object({
      title: z.string(),
      content: z.array(z.string()),
    })).optional(),
    lifestyleImages: z.array(z.string()).optional(),
    detailImages: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
    })).optional(),
    modelFilters: z.array(z.object({
      key: z.string(),
      label: z.string(),
      description: z.string().optional(),
    })).optional(),
    modelItems: z.array(z.object({
      sku: z.string(),
      title: z.string().optional(),
      image: z.string().optional(),
      tags: z.array(z.string()),
      description: z.string().optional(),
      dimensions: z.string().optional(),
    })).optional(),
    catalogPdf: z.string().optional(),
    catalogImages: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { products };
