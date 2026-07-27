# Dance OS 390 Compact Pass

## 背景

在上一轮把 `/dashboard 390` 从 broad mobile Top1 拉下后，新的 `390` sweep 变成：

- `/daily-latin`: `2568`
- `/dashboard`: `2510`
- `/dance-os`: `2775`

这意味着当前 broad mobile Top1 切到：

- `/dance-os 390 = 2775`

而当前最厚的几块很明确：

- `Dance OS Demo`
- `Dance OS 模块库`
- `Correction Ledger Demo`
- `Body Map / Practice Queue`

## 问题定义

这一轮真正的问题不是单独某个 demo 逻辑，而是：

- `390` 宽度的 `dance-os` 还没有吃到 `375-389 / <=374` 那两层更激进的 compact 规则
- summary / assets / ledger / bodymap 都偏厚
- 结果是整页在主流手机宽度下仍然像长板，而不是参考稿那种窄屏工作台

所以这轮目标仍然是：

**补一组 `390-430px` 的 `dance-os` 专属 compact 覆盖，让整个 route 在 390 宽度下进入更高密度工作台状态。**

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 这轮实际改了什么

新增：

- `@media (min-width:390px) and (max-width:430px)` 的 `dance-os-page` 规则

覆盖范围不是单点，而是整条 route 的主壳：

### 1. 上半段 `Dance OS Demo` 收口

- `compact-detail-dance-top` 比例、字号、chips 收紧
- `route-stage` metrics / signals 改成更像小型 monitor

### 2. `模块库 / assets` 收成更高密度的 4 列资产栅格

- `asset-grid` 改成 4 列
- asset card aspect ratio、copy、meta 一起压短
- `cap-note` 隐掉，保留更像 reference asset atlas 的核心信息

### 3. `Correction Ledger Demo` 进入真正的 390 compact ledger

- `ledger-grid` 更紧
- `ledger-stack` 单列
- `choice-note` 直接隐藏
- `checklist` 改 2 列
- `result / next-step / witness` 全部压成更薄的 result cards

### 4. `Body Map / Practice Queue` 收成窄屏工作台

- bodymap summary 更紧
- `bodymap-grid` 两栏比例继续压
- `focus card`、`latest card`、`practice queue` 文案更短
- `focus-proof` 与长 cue 进一步隐藏，只保留更强信号

## 这轮后的量化结果

### 整页

- `/dance-os 390`
  - `2775 -> 2220`
  - 下降 `555`

### 关键 section

- `Dance OS Demo`
  - `394.61 -> 174.44`
- `Dance OS 模块库`
  - `397.08 -> 358.91`
- `Correction Ledger Demo`
  - `616.88 -> 512.86`
- `Body Map / Practice Queue`
  - `614.52 -> 480.14`
- `本页依据`
  - `233.88 -> 175.89`

### 组件内部

- `.compact-ledger-shell`
  - `552.69 -> 448.67`
- `.compact-ledger-shell .ledger-card`
  - `297.38 / 297.38 / 230.31`
  - 变成 `144.36 / 125.14 / 155.17`
- `.ledger-check-item`
  - `77.31 / 77.31 / 83.12 / 83.12`
  - 变成 `52.12 x4`
- `.compact-bodymap-board`
  - `550.33 -> 415.95`
- `.compact-bodymap-panel`
  - `372.33 / 161.20`
  - 变成 `244.95 / 154.80`
- `.compact-bodymap-focus-card`
  - `138 x4`
  - 变成 `78.02 x4`

## 这轮后的整站判断

重新做 `390` sweep 后：

- `/`: `1730`
- `/daily-latin`: `2568`
- `/dashboard`: `2510`
- `/dance-os`: `2220`

这意味着当前 broad mobile Top1 已经不再是 `/dance-os`。

当前新的 broad mobile Top1 重新切回：

- `/daily-latin 390 = 2568`

## 验证

这轮之后继续通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `/tmp/dance-os-390-after-compact-pass.png`

## 结论

这轮价值很高，因为它不是只压了一个 demo，而是把 `dance-os` 整条 route 的 `390px` 语言拉齐了：

- 上半段 summary 更像 route snapshot
- assets 更像 asset atlas
- ledger / bodymap 更像窄屏工作台

## 下一轮

1. 如果继续按 broad mobile Top1 追，重新回看 `/daily-latin 390`
2. 如果切回视觉完成感，重新回首页 `hero / heatmap / lower workbench`
