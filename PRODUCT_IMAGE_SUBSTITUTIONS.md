# 临时替代图片清单

更新时间：2026-05-19

## 记录规则

- 本文档只记录“不是最终准确素材、只是为了先让页面完整/不破图”的图片。
- 按编号规则正确放入的图片不记录在这里，例如 `6110/1.jpg` 对应第 1 段文案、`6110/4.png` 对应第 4 段文案。
- 后续拿到正确素材后，优先按这里的“目标路径”直接替换文件或修改 MD 引用。

## 15008 / 15009 / 15018 组

原因：`产品文案加图片/15008＆15018＆15009` 只有 docx，没有编号 highlight 图；本地也没有找到 15008、15009 单独展示图。为了让现有 `15008.md` 页面先完整显示，临时使用 `产品展示图/15018修改版` 的 15018 图片。

| 页面位置 | 当前目标路径 | 临时来源 | 替代说明 | 后续建议 |
| --- | --- | --- | --- | --- |
| 默认主图 | `/images/products/15008/default.jpg` | `产品展示图/15018修改版/15018 (1).jpg` | 用 15018 产品图作为 15008 组默认主图 | 有三款合照或 15008 主图后替换 |
| 15008 规格图 | `/images/products/15008/default.jpg` | `产品展示图/15018修改版/15018 (1).jpg` | 15008 规格按钮目前也显示 15018 图 | 找到 15008 单品图后改为 `/images/products/15008/15008.jpg` |
| 15009 规格图 | `/images/products/15008/default.jpg` | `产品展示图/15018修改版/15018 (1).jpg` | 15009 规格按钮目前也显示 15018 图 | 找到 15009 单品图后改为 `/images/products/15008/15009.jpg` |
| 15018 规格图 | `/images/products/15008/default.jpg` | `产品展示图/15018修改版/15018 (1).jpg` | 这是 15018 图片，但路径用了组默认图 | 可保留，或另存为 `/images/products/15008/15018.jpg` 后修改 MD |
| Highlight 1：三种坐姿 | `/images/products/15008/highlights/seat-profile.jpg` | `产品展示图/15018修改版/15018 (3).jpg` | 用 15018 侧面图代替“三种坐姿”对应图 | 建议换成 15008/15009/15018 三款并列图或编号 `1` 图 |
| Highlight 2：脚踏环/底座 | `/images/products/15008/highlights/foot-ring-base.jpg` | `产品展示图/15018修改版/15018 (4).jpg` | 用 15018 角度图代替脚踏环和底座卖点图 | 建议换成脚踏环/五星底座细节图或编号 `2` 图 |
| Highlight 3：BIFMA/Class 3 气压杆 | `/images/products/15008/highlights/gas-lift.jpg` | `产品展示图/15018修改版/15018 (5).jpg` | 用 15018 后视图代替气压杆/认证卖点图 | 建议换成气压杆结构图、认证图或编号 `3` 图 |
| Detail 图 | `/images/products/15008/details/15018-front.jpg` | `产品展示图/15018修改版/15018 (1).jpg` | 细节区只展示 15018 | 找到 15008/15009 图后补充或替换 |
| Detail 图 | `/images/products/15008/details/15018-left.jpg` | `产品展示图/15018修改版/15018 (3).jpg` | 细节区只展示 15018 | 找到 15008/15009 图后补充或替换 |
| Detail 图 | `/images/products/15008/details/15018-right.jpg` | `产品展示图/15018修改版/15018 (4).jpg` | 细节区只展示 15018 | 找到 15008/15009 图后补充或替换 |
| Detail 图 | `/images/products/15008/details/15018-back.jpg` | `产品展示图/15018修改版/15018 (5).jpg` | 细节区只展示 15018 | 找到 15008/15009 图后补充或替换 |

涉及文件：

- `src/content/products/15008.md`
- `public/images/products/15008/default.jpg`
- `public/images/products/15008/highlights/seat-profile.jpg`
- `public/images/products/15008/highlights/foot-ring-base.jpg`
- `public/images/products/15008/highlights/gas-lift.jpg`
- `public/images/products/15008/details/*.jpg`

## 6110

原因：`产品文案加图片/6110` 只有 `1.jpg` 和 `4.png`。第 2 段“高度 8 档可调，630-885mm”没有对应编号 `2` 图片；当前保留了原网站已有的 `2.jpg` 来避免该 highlight 没图。

| 页面位置 | 当前目标路径 | 临时来源 | 替代说明 | 后续建议 |
| --- | --- | --- | --- | --- |
| Highlight 2：高度8档可调 | `/images/products/6110/highlights/2.jpg` | 原网站已有图片，非本次 `产品文案加图片/6110` 编号图 | 用旧图暂时代替第 2 段文案图 | 拿到 `产品文案加图片/6110/2.jpg` 或 `2.png` 后替换 |

不算替代、已经按编号正确使用的图片：

- `/images/products/6110/highlights/1.jpg` 来自 `产品文案加图片/6110/1.jpg`
- `/images/products/6110/highlights/4.png` 来自 `产品文案加图片/6110/4.png`

## 6113 / 6114 / 6117 / 6118 / 6119 / 6120 组

原因：`产品文案加图片/6113＆6114＆6117＆6118＆6119＆6120` 只有 docx，没有编号 highlight 图。页面当前保留原网站已有的 2 张 highlight 图片，用来承载更新后的文案。

| 页面位置 | 当前目标路径 | 临时来源 | 替代说明 | 后续建议 |
| --- | --- | --- | --- | --- |
| Highlight 1：6种坐垫 | `/images/products/6113/highlights/1.jpg` | 原网站已有图片，非本次编号图 | 用 6113 产品角度图暂时代替“6种坐垫”文案图 | 拿到编号 `1` 图或 6款坐垫组合图后替换 |
| Highlight 2：气压升降 | `/images/products/6113/highlights/2.jpg` | 原网站已有图片，非本次编号图 | 用 6113 产品侧面图暂时代替“气压升降”文案图 | 拿到编号 `2` 图或气压杆结构图后替换 |

不算替代、作为细节图正常使用的图片：

- `/images/products/6113/6113.jpg`
- `/images/products/6113/6114.png`
- `/images/products/6113/6117.jpg`
- `/images/products/6113/6118.jpg`
- `/images/products/6113/6119.jpg`

仍缺：

- `/images/products/6113/6120.jpg`

## 没有使用替代图的缺口

以下缺口我已经按你的规则保留为“缺图”，没有用其他图片顶替：

| 产品 | 缺口 |
| --- | --- |
| 6100 | 缺 `/images/products/6100/highlights/1.png` |
| 6400 | 缺第 3 张文案图 `/images/products/6400/highlights/3.png` |
| 6700 | 缺第 4 张文案图 `/images/products/6700/highlights/4.jpg` |
| 6800 | 缺第 4 张文案图 `/images/products/6800/highlights/4.jpg` |
| 6900 | 文案文件夹没有编号图，缺 `/images/products/6900/highlights/4.jpg` |
| 6930 | 缺第 3 张文案图 `/images/products/6930/highlights/3.jpg` |
| 6121 | 缺主图和 2 张 highlight 图 |
