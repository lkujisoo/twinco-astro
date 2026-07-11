# TWINCO 产品 Markdown 台账

更新时间：2026-05-19

## 1. 产品 MD 文件位置

当前网站是 Astro 静态站，产品数据来自：

- `src/content/products/*.md`
- 每个产品一个 Markdown 文件，文件名通常等于产品 `id`，例如 `6930.md`
- 产品图片统一放在 `public/images/products/<产品ID>/`
- 分类配置在 `src/data/categories.json`
- 字段 schema 在 `src/content.config.ts`
- 产品列表页：`src/pages/products.astro` + `public/scripts/products.js`
- 产品详情页：`src/pages/product/[id].astro` + `public/scripts/product-detail.js`

## 2. MD 字段逻辑

### 必填基础字段

这些字段由 `src/content.config.ts` 强制要求：

| 字段 | 用途 |
| --- | --- |
| `id` | 产品 URL 和唯一标识，详情页路径为 `/product/<id>` |
| `name` | 页面主标题、列表卡片标题 |
| `nameEn` | 搜索字段之一，也可作为英文名称 |
| `category` | 一级分类 ID，需要匹配 `src/data/categories.json` |
| `subcategory` | 二级分类 ID，需要匹配对应一级分类下的子分类 |
| `description` | 列表搜索和详情页“产品介绍” |
| `descEn` | 英文描述，目前页面没有直接渲染，但 schema 要求填写 |
| `material` | 列表卡片副文本、详情页规格表 |
| `materialEn` | 英文材质，目前页面没有直接渲染，但 schema 要求填写 |
| `dimensions` | 详情页规格表尺寸 |

### 常用可选字段

| 字段 | 页面效果 |
| --- | --- |
| `subtitle` | 详情页产品副标题 |
| `maxLoad` | 详情页规格表承重 |
| `certifications` | 详情页顶部认证徽章 |
| `defaultImage` | 列表缩略图、详情页默认主图 |
| `features` | 详情页“产品特色”列表 |
| `infoSections` | 详情页折叠信息面板 |
| `highlights` | 详情页图文卖点区 |
| `detailImages` | 详情页底部产品细节图 |
| `lifestyleImages` | schema 中存在，但当前页面没有渲染 |

### 变体逻辑

网站现在主要有三种产品交互：

| 类型 | 字段 | 效果 |
| --- | --- | --- |
| 颜色切换 | `colors` | 列表卡片显示色块；详情页鼠标悬停色块/缩略图切换主图 |
| 阶数/规格切换 | `stepVariants` | 详情页显示规格按钮，切换主图和尺寸 |
| 轮子/扶手配件 | `hasAccessories: true` + `colors[*].imageHandrail/imageWheels/imageBoth` | 详情页显示配件按钮，并按颜色+配件组合切换图片 |

注意：如果 `hasAccessories: true`，最好为每个颜色补齐：

- `image`
- `imageHandrail`
- `imageWheels`
- `imageBoth`

否则页面按钮能显示，但切换到缺失组合时图片会找不到。

## 3. 已完成的产品 MD 总览

当前 `src/content/products` 里共有 19 个产品 Markdown 文件。

| ID | 产品名 | 分类 | 子分类 | 图片文件数 | 颜色 | 规格 | 配件 | 卖点 | 细节图 | 信息面板 |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| 2029 | TWIN STEEL Ladder (Squared Tubes) | climbing-safety | metal-step-ladder | 19 | 0 | 3 | 否 | 2 | 7 | 1 |
| 2034 | 2034 TWIN Steel Portable Step Ladder | climbing-safety | metal-step-ladder | 0 | 0 | 0 | 否 | 2 | 0 | 1 |
| 2061 | TWIN STEEL Ladder (Round Tubes) | climbing-safety | metal-step-ladder | 9 | 0 | 2 | 否 | 2 | 2 | 1 |
| 3028 | 3028 TWIN Aluminum Step Ladder with Tools Tray | climbing-safety | metal-step-ladder | 38 | 0 | 3 | 否 | 3 | 17 | 1 |
| 6000 | Rolling Stepstool 6000 | climbing-safety | stepstool | 11 | 5 | 0 | 否 | 5 | 0 | 2 |
| 6100 | 6100 TWIN SUPERSTEP Stepstool | climbing-safety | stepstool | 11 | 8 | 0 | 否 | 4 | 0 | 2 |
| 6110 | 6110 TWIN Anti-fatigue Stool | ergonomic-seating | anti-fatigue-stool | 5 | 0 | 0 | 否 | 2 | 0 | 1 |
| 6113 | TWIN Gas Lift Anti-fatigue Stool | ergonomic-seating | anti-fatigue-stool | 10 | 0 | 6 | 否 | 2 | 0 | 1 |
| 6116 | 6116 TWIN Foldable Anti-fatigue Stool | ergonomic-seating | anti-fatigue-stool | 7 | 0 | 0 | 否 | 2 | 2 | 1 |
| 6121 | 6121 TWIN Standing Stool | ergonomic-seating | anti-fatigue-stool | 0 | 0 | 0 | 否 | 2 | 0 | 1 |
| 6200 | 6200 TWIN EASY STEP Stepstool | climbing-safety | stepstool | 10 | 4 | 0 | 否 | 5 | 0 | 2 |
| 6300 | 6300 TWIN STEEL Stepstool | climbing-safety | stepstool | 14 | 8 | 0 | 否 | 5 | 0 | 2 |
| 6400 | TWIN MINI Step Ladder | climbing-safety | metal-step-ladder | 8 | 0 | 4 | 否 | 3 | 0 | 1 |
| 6600 | 6600 TWIN Heavy Duty Safety Steps, 1-Step | climbing-safety | heavy-duty-safety | 11 | 3 | 0 | 是 | 4 | 0 | 2 |
| 6700 | 6700 TWIN Heavy Duty Safety Steps, 2-Step | climbing-safety | heavy-duty-safety | 10 | 3 | 0 | 是 | 4 | 0 | 2 |
| 6800 | 6800 TWIN Heavy Duty Safety Steps, 3-Step | climbing-safety | heavy-duty-safety | 10 | 3 | 0 | 是 | 4 | 0 | 2 |
| 6900 | 6900 TWIN Heavy Duty Safety Steps, 4-Step | climbing-safety | heavy-duty-safety | 13 | 3 | 0 | 是 | 4 | 0 | 2 |
| 6930 | 6930 TWIN Heavy Duty Safety Steps | climbing-safety | heavy-duty-safety | 11 | 3 | 0 | 否 | 4 | 3 | 1 |
| 4100 | 4100 TWIN Ball Chair | ergonomic-seating | ball-chair | 8 | 2 | 0 | 否 | 2 | 3 | 1 |
| 15008 | TWIN Ergonomic Task Chair | ergonomic-seating | task-chair | 0 | 0 | 3 | 否 | 2 | 0 | 1 |

## 4. 按分类整理

### climbing-safety / stepstool

- `6000.md` - Rolling Stepstool 6000
- `6100.md` - 6100 TWIN SUPERSTEP Stepstool
- `6200.md` - 6200 TWIN EASY STEP Stepstool
- `6300.md` - 6300 TWIN STEEL Stepstool

### climbing-safety / metal-step-ladder

- `2029.md` - TWIN STEEL Ladder (Squared Tubes)
- `2034.md` - 2034 TWIN Steel Portable Step Ladder
- `2061.md` - TWIN STEEL Ladder (Round Tubes)
- `3028.md` - 3028 TWIN Aluminum Step Ladder with Tools Tray
- `6400.md` - TWIN MINI Step Ladder

### climbing-safety / heavy-duty-safety

- `6600.md` - 6600 TWIN Heavy Duty Safety Steps, 1-Step
- `6700.md` - 6700 TWIN Heavy Duty Safety Steps, 2-Step
- `6800.md` - 6800 TWIN Heavy Duty Safety Steps, 3-Step
- `6900.md` - 6900 TWIN Heavy Duty Safety Steps, 4-Step
- `6930.md` - 6930 TWIN Heavy Duty Safety Steps

### ergonomic-seating / anti-fatigue-stool

- `6110.md` - 6110 TWIN Anti-fatigue Stool
- `6113.md` - TWIN Gas Lift Anti-fatigue Stool
- `6116.md` - 6116 TWIN Foldable Anti-fatigue Stool
- `6121.md` - 6121 TWIN Standing Stool

### ergonomic-seating / ball-chair

- `4100.md` - 4100 TWIN Ball Chair

### ergonomic-seating / task-chair

- `15008.md` - TWIN Ergonomic Task Chair

## 5. 图片引用缺失检查

以下产品 MD 已写好字段，但有部分引用图片在 `public/images/products/<id>/` 中未找到。补图时优先处理这些路径。

| ID | 缺失数量 | 缺失路径 |
| --- | ---: | --- |
| 2034 | 3 | `/images/products/2034/default.jpg`；`/images/products/2034/highlights/1.jpg`；`/images/products/2034/highlights/2.jpg` |
| 6100 | 1 | `/images/products/6100/highlights/1.png` |
| 6113 | 1 | `/images/products/6113/6120.jpg` |
| 6121 | 3 | `/images/products/6121/default.jpg`；`/images/products/6121/highlights/1.jpg`；`/images/products/6121/highlights/2.jpg` |
| 6400 | 1 | `/images/products/6400/highlights/3.png` |
| 6600 | 6 | `/images/products/6600/yellow-wheels.jpg`；`/images/products/6600/yellow-both.jpg`；`/images/products/6600/red-wheels.jpg`；`/images/products/6600/red-both.jpg`；`/images/products/6600/blue-wheels.jpg`；`/images/products/6600/blue-both.jpg` |
| 6700 | 7 | `/images/products/6700/yellow-wheels.jpg`；`/images/products/6700/yellow-both.jpg`；`/images/products/6700/red-wheels.jpg`；`/images/products/6700/red-both.jpg`；`/images/products/6700/blue-wheels.jpg`；`/images/products/6700/blue-both.jpg`；`/images/products/6700/highlights/4.jpg` |
| 6800 | 7 | `/images/products/6800/yellow-handrail.jpg`；`/images/products/6800/yellow-wheels.jpg`；`/images/products/6800/red-handrail.jpg`；`/images/products/6800/red-wheels.jpg`；`/images/products/6800/blue-handrail.jpg`；`/images/products/6800/blue-wheels.jpg`；`/images/products/6800/highlights/4.jpg` |
| 6900 | 4 | `/images/products/6900/yellow-handrail.jpg`；`/images/products/6900/red-handrail.jpg`；`/images/products/6900/blue-handrail.jpg`；`/images/products/6900/highlights/4.jpg` |
| 6930 | 1 | `/images/products/6930/highlights/3.jpg` |
| 15008 | 6 | `/images/products/15008/default.jpg`；`/images/products/15008/15008.jpg`；`/images/products/15008/15009.jpg`；`/images/products/15008/15018.jpg`；`/images/products/15008/highlights/1.jpg`；`/images/products/15008/highlights/2.jpg` |

## 6. 当前状态判断

- MD 已经覆盖两个一级分类：`climbing-safety` 和 `ergonomic-seating`。
- 已完成内容最完整的是登高安全类，尤其是 stepstool、metal-step-ladder、heavy-duty-safety。
- `2034`、`6121`、`15008` 的 MD 已存在，但图片目录为空，前端会显示缺图。
- `6600`、`6700`、`6800`、`6900` 已启用配件切换，但部分轮子/扶手组合图缺失，需要补齐或暂时从 MD 中移除对应图片字段。
- `lifestyleImages` 字段虽然在 schema 中存在，但当前详情页没有渲染它；如果以后要展示场景图，需要改 `src/pages/product/[id].astro`。

