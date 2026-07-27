# 2026-07-08 Dashboard Mobile Density Pass

## 背景

- 在上一轮 `daily-latin` ledger mobile workbench pass 之后，重新做全站顺序 sweep：
  - `/` mobile：`1730`
  - `/daily-latin` mobile：`3233`
  - `/dance-os` mobile：`3583`
  - `/dashboard` mobile：`3583`
- 当时 `dance-os` 与 `dashboard` 并列 mobile Top1。

## 问题定义

这一轮不去同时碰两个并列掉队项。

而是先回答：

**在不改 dashboard 结构与交互前提下，能不能仅通过更接近参考稿的“高密度工作台卡片”布局，把 `dashboard` 明显压短？**

## 为什么先做 dashboard

- `dashboard` 当前更偏：
  - 信息密度
  - 卡片排布
  - 文案节奏
- 而不是复杂交互。
- 这让它更适合用：
  - 组件层不动
  - 样式层重排
  - mobile dense workbench
  的方式直接收收益。

## 当前最大块

baseline mobile 下：

- `Route Map`：`632`
- `Witness Archive`：`615`
- `Proof / Risk / Gate`：`441`

这说明真正拖长页面的不是顶部概览，而是：

- route cards 仍然太像纵向说明卡
- archive board 仍然保留了过多“解释型”高度
- decision cards 也还可以更像 workbench mini-panels

## 候选实验

先在浏览器中注入 CSS 做 A/B，再决定是否落盘。

### baseline

- `/dashboard` mobile total：
  - `3583`

### 只压 `Route Map`

- `/dashboard` mobile total：
  - `3276`

### 只压 `Witness Archive`

- `/dashboard` mobile total：
  - `3397`

### 同时压 `Proof / Risk / Gate` + `Route Map` + `Witness Archive`

- `/dashboard` mobile total：
  - `2899`

## 视觉判断

这轮组合方案虽然更密，但仍然保持：

- 黑底 workbench 结构
- 清楚的 section 分段
- 卡片之间的边界感
- reference-like 的“把块压成控制台面板”节奏

并且在以下宽度都验证了无横向溢出：

- `390`
- `375`
- `360`

对应总高度分别约：

- `2899`
- `2964`
- `2987`

## 最终做法

只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

不改：

- route 结构
- 组件结构
- 数据
- witness 逻辑

### 具体策略

1. `Proof / Risk / Gate`

- `decision-rows` 从纵向 rows 改成 3 列 mini-grid
- 每条 row 改成更像小状态块
- summary / note 进一步 clamp

2. `Route Map`

- `route-rows` 改成 3 列 mini-grid
- route card padding / header / note 继续压轻
- 让 4 张 route cards 更像 mobile workbench tiles

3. `Witness Archive`

- summary cards 继续压成纯数值卡
- archive panel head / copy / latest block 继续变薄
- archive items 继续收成更短的 witness chips

## 量化结果

### `/dashboard`

- mobile total：
  - `3583 -> 2899`

### 关键 section

- `Route Map`：
  - `632 -> 324`
- `Witness Archive`：
  - `615 -> 429`
- `Proof / Risk / Gate`：
  - `441 -> 251`

### 更细的块级结果

- route cards：
  - 4 张都约 `135`
- decision cards：
  - 3 张都约 `187`
- archive summary cards：
  - `53 / 53 / 53`
- archive panel：
  - `322`
- archive items：
  - 3 张都约 `111`

## 改动后的整站顺序 sweep

- `/` mobile：`1730`
- `/daily-latin` mobile：`3233`
- `/dashboard` mobile：`2899`
- `/dance-os` mobile：`3583`

这意味着新的唯一 mobile Top1 已经收束为：

- `/dance-os`

## 验证

- 已通过：
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `/dashboard` mobile full page：
  - `/tmp/latinos-dashboard-mobile-density-pass.png`

## 这轮后的判断

- 这轮不是“把字再缩一点”
- 而是把 `dashboard` 更明确地推向：
  - 高密度状态工作台
  - reference-style compact route monitor
- 当前下一轮最值得继续追的掉队项已经明确只剩：
  - `/dance-os`
