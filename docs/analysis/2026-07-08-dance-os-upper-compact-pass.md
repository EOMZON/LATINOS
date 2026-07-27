# 2026-07-08 Dance OS Upper Compact Pass

## 背景

在首页 hero 连续两轮收口之后，整站一致性 sweep 显示当前最明显的不统一已经不是首页，而是：

- `Dance OS`

尤其是它的上半段：

1. 顶部 summary 仍然偏“功能总览板”
2. 模块库更像高卡片墙，而不是当前这套 workbench 里的入口矩阵
3. 手机端因此比 `Daily Latin` 明显更长

## 问题定义

真正要解决的不是“删掉模块库”，而是：

**把 `Dance OS` 上半段继续推向更紧凑、更像 reference workbench 的入口结构，让它在语言上更接近首页和 `Daily Latin`。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/hashed-asset-gallery.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/asset-card.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 顶部 summary 改成 compact route summary

动作：

- `Dance OS Demo` 这块改成：
  - `compact-detail compact-detail-dance-top`
- `RouteStagePanel` 改成：
  - `compact-route-stage compact-route-stage-dance`

意义：

- 不再让 `Dance OS` 顶部显得比 `Daily Latin` 更厚更多说明
- 让它更像当前 frontdoor 体系里的 route summary，而不是另一套页面语言

### 2. 模块库引入 compact 模式

动作：

- `HashedAssetGallery` 新增：
  - `compact?: boolean`
- compact 模式下：
  - tabs 用 `compact-tabs`
  - library panel 用 `compact-library-panel`
  - 描述优先使用更短的 `group.more`
  - asset grid 用 `compact-asset-grid`

意义：

- 不再默认把模块库做成高耸的卡片墙
- 更像 workbench 的“当前看哪一组模块”

### 3. asset card 比例继续收扁

动作：

- `AssetCard` 支持可选 `className`
- `compact-asset-grid` 下：
  - card aspect ratio 从更高的 poster 感收成更扁的模块卡
  - platform / state / title / note / meta 一起缩短一层

意义：

- 这轮收掉的不是功能，而是“视觉上像一组海报”
- 让模块库更像产品结构入口，而不是资产封面墙

### 4. 首页、Daily、Dance 的语言进一步对齐

动作：

- `Dance OS` 模块库 section header 改成 compact 头
- copy 从“整页摊开”改成更明确的：
  - 先切到当前要看的那一组
  - 不把模块库做成厚卡片墙

意义：

- 首页 / Daily / Dance 三条 route 的文案风格更统一
- 整体更接近同一套前台，而不是三种页面思路

## 量化结果

### 桌面端

这轮前：

- `Dance OS` 全页：`3757.75`
- 第一块 section：`357.13`

这轮后：

- `Dance OS` 全页：`3728.28`
- 第一块 section：`364.94`
- `assetPanel`：`93.08`
- `assetGrid`：`243.59`

判断：

- 顶部 summary 并没有明显变矮，但语言更统一了
- 模块库本身明显更扁、更像矩阵
- 全页总高仍然下降了约 `29.47`

### 手机端

这轮前：

- `Dance OS` 全页：`8341.66`
- 第一块 section：`607.16`

这轮后：

- `Dance OS` 全页：`8173.25`
- 第一块 section：`513.94`
- `assetPanel`：`93.08`
- `assetGrid`：`734.17`

判断：

- 手机端收益更明显
- 全页下降约 `168.41`
- 顶部 section 下降约 `93.22`

## 视觉证据

这轮后桌面端：

- `/tmp/latinos-sweep-dance-desktop-after-compact.png`

这轮后手机端：

- `/tmp/latinos-sweep-dance-mobile-after-compact.png`

这轮前桌面端：

- `/tmp/latinos-sweep-dance-desktop.png`

这轮前手机端：

- `/tmp/latinos-sweep-dance-mobile.png`

## 验证

这轮后继续通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `Dance OS` route 正常渲染
- correction ledger 交互继续通过
- sources anchor 继续通过
- 首页 / Daily / Dashboard 没被误伤
- mobile shell 与 overflow 继续稳定

## 这轮后的判断

这轮价值主要不在“总高度大幅下降”，而在：

- `Dance OS` 开始更像当前前台体系的一部分
- 上半段不再那么像另一套独立产品页
- 手机端长度被明显收短

这符合当前阶段的优先级：

- 先统一语言
- 再继续深化内容与工具逻辑

## 剩余差距

当前仍然不能宣称完成。

剩余更大的差距开始集中到：

1. `Dance OS` 中段 `Correction Ledger Demo` 仍然是厚块
2. `Dance OS` 整页仍然比 `Daily Latin` 更重
3. 真实内容回填还可以继续压掉一部分模板感

## 下一步

下一轮优先级：

1. 继续看 `Dance OS` 中段是否还能 compact 一层
2. 或者直接切到更高 ROI 的真实内容回填
3. 继续用整站截图 + smoke 来判断“哪一页现在最不像参考稿”
