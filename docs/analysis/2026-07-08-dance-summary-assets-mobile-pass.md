# 2026-07-08 Dance Summary + Assets Mobile Pass

## 背景

- 按当前 goal 基线重新 build / start 后，先做了 `/dance-os` 的真实 mobile 复核：
  - `/dance-os` mobile：`3050`
- 当时 section 高度为：
  - `Body Map / Practice Queue`：`707.34`
  - `Correction Ledger Demo`：`683.16`
  - `录 / 看 / 记 / 下一轮`：`478`
  - `Dance OS 模块库`：`426.2`
  - `本页依据`：`233.88`

虽然 `ledger/bodymap` 仍然更高，但它们已经在上一轮被明显压过一层。

这轮更值得回答的是：

**能不能只通过继续收 `dance-summary` 和 `dance-assets` 这两个共享展示层，让 `/dance-os` 更接近参考稿的 mobile workbench 密度，同时不碰 demo 逻辑？**

## 为什么抓这两块

这两块当前更像：

- summary 仍然偏“解释面板”
- asset library 仍然偏“展示墙”

而参考稿更像：

- 顶部 summary 是压紧的 control panel
- 模块库是高密度、低解释的 asset strip

因此这轮先不碰：

- `CorrectionLedgerDemo` 逻辑
- `BodyMapPracticeQueue` 逻辑
- route / data 结构

只继续动共享样式层。

## 候选实验

先在浏览器里做注入实验，再决定是否落盘。

### baseline

- `/dance-os` mobile total：
  - `3050`

### 激进方案

做法：

- 强行把 `dance-summary` 在 mobile 下压成两栏
- summary stage 改成更极端的压缩排布

量化结果：

- `dance-summary`：
  - `478 -> 203.28`
- `/dance-os` mobile total：
  - `3050 -> 2775`

但视觉复核发现：

- summary 内部出现明显挤压
- stage / copy 的观感失衡
- 已经偏离“参考稿式 workbench”，更像硬挤压

结论：

- **收益虽然大，但不采用**

### 克制方案

做法：

- 保持 summary 仍是单栏工作台语义
- 只继续压：
  - `route-stage` metrics / signals
  - detail copy / kv / chips
  - tabs / library head / library note
  - asset card 纵横比、topline、字级、meta clamp

注入实验结果：

- `dance-summary`：
  - `478 -> 394.61`
- `dance-assets`：
  - `426.2 -> 397.08`
- `/dance-os` mobile total：
  - `3050 -> 2934`

并且在：

- `390`
- `375`
- `360`

都确认：

- 无横向溢出
- 布局没有崩
- 仍然保留 reference-like 的紧凑 dark workbench 气质

## 最终做法

只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

不改：

- `app/dance-os/page.tsx`
- `HashedAssetGallery` 逻辑
- `CorrectionLedgerDemo` 逻辑
- `BodyMapPracticeQueue` 逻辑

### 1. `dance-summary`

- 继续压 `compact-detail-dance-top`
- `route-stage-metrics` 改成 4 列 mini metrics
- `route-stage-signals` 保留 3 列，但改成更薄的 signal tiles
- detail copy 的：
  - title
  - subtitle
  - kv label/value
  - chips
  都继续压紧

### 2. `dance-assets`

- tabs 继续收薄
- library head / count / note 进一步压紧
- asset card 改成更紧的近方形比例
- topline、platform badge、state、meta 统一缩一层
- `asset-meta` 收成单行

## 落地后的真实 build 结果

### `/dance-os`

- mobile total：
  - `3050 -> 2934`

### 关键 section

- `dance-summary`：
  - `478 -> 394.61`

- `dance-assets`：
  - `426.2 -> 397.08`

- `Correction Ledger Demo`：
  - `683.16`

- `Body Map / Practice Queue`：
  - `707.34`

### 整站顺序 sweep

- `/` mobile：`1730`
- `/daily-latin` mobile：`2884`
- `/dance-os` mobile：`2934`
- `/dashboard` mobile：`2899`

这意味着：

- `/dance-os` 仍然是当前 mobile Top1
- 但已经从 `3050` 继续降到 `2934`

## 窄屏复核

真实 build 下继续确认：

- `390`：`2934`
- `375`：`2951`
- `360`：`2953`

并且三档都满足：

- `scrollWidth == innerWidth`
- 无横向溢出

## 验证

- 已通过：
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `/dance-os` mobile full page：
  - `/tmp/latinos-dance-summary-assets-mobile-pass.png`

## 这轮后的判断

- 这轮价值不在于“把最大块继续硬压”
- 而在于把 `/dance-os` 上半段更明确地推进到：
  - 更像参考稿的 compact control panel
  - 更像高密度 asset library
  - 更少展示墙感

## 下一轮最值得继续看的地方

当前更值得继续追的掉队项重新集中到：

- `Body Map / Practice Queue`
- `Correction Ledger Demo`

尤其下一轮可以优先复看：

- `Body Map Snapshot`
- `Practice Queue`
- `ledger-output`

判断能不能再收一轮，而不破坏当前已经建立的 mobile workbench 结构。
