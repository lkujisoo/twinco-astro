---
# ============================================================
#  TWINCO 产品页模板（权威版）
# ============================================================
#
# 用法：
#   1. 复制本文件到 src/content/products/，重命名为 <产品ID>.md
#   2. 按下面注释把字段填写完整；不需要的"可选块"整段删掉
#   3. 图片放到 public/images/products/<产品ID>/，文件名要和下面的 image 路径完全一致
#
# 产品图规范（重要）：
#   - 默认图、颜色变体图、阶数变体图、highlights 图必须是纯白底
#   - 路径统一以 / 开头（站点根，不是文件系统根）
#
# Schema 权威定义在 src/content.config.ts。本模板字段顺序与 schema 对齐。
# ============================================================

# ── 必填：基础信息 ─────────────────────────────
id: "产品ID"                     # 字符串，与文件名、文件夹名一致
name: "产品中文名"
nameEn: "Product English Name"
category: "分类ID"                # 见 src/data/categories.json，例：climbing-safety
subcategory: "子分类ID"            # 同上，例：metal-step-ladder
description: "中文产品描述（一两句话，列表页和详情页"产品介绍"都会用到）"
descEn: "English product description"
material: "材质中文"
materialEn: "Material English"
dimensions: "尺寸，例 463 × 526 × 841 mm（多规格时填默认/代表规格）"

# ── 可选：副标题 ──────────────────────────────
# 不需要就整行删除
subtitle: "副标题或英文系列名"

# ── 可选：承重 ───────────────────────────────
# 不适用就整行删除
maxLoad: "150 kg"

# ── 可选：认证标签（详情页右上方徽章）────────────
# 不需要就把整个 certifications 块删掉
certifications:
  - "TÜV/GS"
  - "EN 14183"

# ── 必填：默认展示图（详情页主图、列表页缩略图）─
# 必须纯白底
defaultImage: "/images/products/产品ID/default.jpg"

# ============================================================
#  变体三选一（colors / stepVariants / hasAccessories）
#  没有变体的产品三个块全删掉
# ============================================================

# ── 变体 A：颜色 ─────────────────────────────
# 用户在详情页点色块切换主图
# image 是该颜色的纯白底基础图
# imageHandrail / imageWheels / imageBoth 仅在 hasAccessories: true 时填
colors:
  - name: "Black"
    sku: "产品ID-1"
    ral: "RAL 9005"
    hex: "#1A1D23"
    image: "/images/products/产品ID/black.jpg"
  - name: "Red"
    sku: "产品ID-4"
    ral: "RAL 3020"
    hex: "#C0392B"
    image: "/images/products/产品ID/red.jpg"

# ── 变体 B：阶数（梯子/凳子常用）─────────────
# 用户点按钮切换图片和"尺寸"参数行
# label 是按钮显示的文字；image 是该规格的纯白底图
stepVariants:
  - steps: 2
    sku: "2029"
    label: "2 阶"
    image: "/images/products/产品ID/2-step.jpg"
    dimensions: "463 × 526 × 841 mm"
    maxLoad: "150 kg"     # 可选，不同阶数承重不同时填
  - steps: 3
    sku: "2030"
    label: "3 阶"
    image: "/images/products/产品ID/3-step.jpg"
    dimensions: "465 × 735 × 1053 mm"

# ── 变体 C：可选配件（轮子/扶手）──────────────
# 设为 true 时详情页会出现"轮子/扶手"切换按钮
# 同时 colors 里每项必须补 imageHandrail / imageWheels / imageBoth 三张白底图
hasAccessories: true

# 当 hasAccessories: true 时，colors 块要扩展成下面这样：
# colors:
#   - name: "Yellow"
#     sku: "6900-3"
#     ral: "RAL 1003"
#     hex: "#E8B800"
#     image: "/images/products/产品ID/yellow.jpg"
#     imageHandrail: "/images/products/产品ID/yellow-handrail.jpg"
#     imageWheels: "/images/products/产品ID/yellow-wheels.jpg"
#     imageBoth: "/images/products/产品ID/yellow-both.jpg"

# ============================================================
#  内容区
# ============================================================

# ── 产品特性（详情页"产品特性"列表）──────────
# 中英文混填都可以；建议英文为主，与 descEn 风格一致
features:
  - "First feature point"
  - "Second feature point"
  - "Third feature point"

# ── highlights：图文交替展示区（左图右文/右图左文）
# 每一组配一张纯白底图 + 中英标题/描述
# titleZh / textZh 缺省时回退到 title / text
highlights:
  - image: "/images/products/产品ID/highlight-1.jpg"
    title: "English Highlight Title"
    titleZh: "中文卖点标题"
    text: "English highlight description."
    textZh: "中文卖点描述。"
  - image: "/images/products/产品ID/highlight-2.jpg"
    title: "Another Highlight"
    titleZh: "另一个卖点"
    text: "Description."
    textZh: "描述。"

# ── 产品信息折叠面板（手风琴）─────────────────
# 第一段默认展开；contentEn 可选，缺省时只显示中文
infoSections:
  - title: "产品信息"
    titleEn: "Product Information"
    content:
      - "型号: 填写型号"
      - "材质: 填写材质"
      - "尺寸: 填写尺寸"
      - "载重: 填写载重"
      - "认证: 填写认证"
      - "颜色: 填写可选颜色"
      - "适用: 填写适用场景"
    contentEn:
      - "Model: ..."
      - "Material: ..."
      - "Dimensions: ..."
      - "Load Capacity: ..."
      - "Certifications: ..."
      - "Colors: ..."
      - "Applications: ..."
  - title: "使用说明"
    titleEn: "Usage Instructions"
    content:
      - "1. 步骤一"
      - "2. 步骤二"
    contentEn:
      - "1. Step one"
      - "2. Step two"

# ── 场景图（lifestyle，可选）──────────────────
# 真实使用场景图，可以不是纯白底；不需要就保留空数组
lifestyleImages: []
---

正文留空即可（目前页面不渲染 markdown 正文）。
