# 2026-07-08 Daily Overview + Return Mobile Pass

## 背景

- 在上一轮 `dance-os` ledger + bodymap mobile pass 之后，重新做全站顺序 sweep：
  - `/` mobile：`1730`
  - `/dashboard` mobile：`2899`
  - `/dance-os` mobile：`3050`
  - `/daily-latin` mobile：`3233`
- 这意味着新的 mobile Top1 又重新回到：
  - `/daily-latin`

## 问题定义

这轮不回去继续抠 `Today Loop Demo`。

而是只回答：

**能不能在不碰 demo 逻辑的前提下，把 `daily-overview` 和 `Live Return / Clip Bridge / Archive Jump` 进一步推向参考稿那种窄屏 workbench 结构？**

## 为什么抓这两块

当前 mobile 下：

- `Today Loop Demo`：`637`
- `Live Return / Clip Bridge / Archive Jump`：`570`
- `状态分流 / 4 步起步 / 回流判断`：`414`
- `Daily Latin 动作库`：`320`

`Today Loop Demo` 当然仍然最大，但上一轮已经做过高 ROI 的 ledger workbench 收口。

这轮更值得收的是：

- `live return` 顶部 metric strip 仍然被压成纵向堆叠
- `daily-overview` 仍然被通用 mobile override 拉回过于保守的单列状态

## 当前内部测量

### `daily-overview`

- section：
  - `414`
- detail panel：
  - `414`
- stage：
  - `189`

### `live return`

- section：
  - `570`
- board：
  - `522`
- metric strip：
  - `153`
- panel 1：
  - `253`
- panel 2：
  - `99`
- 3 张 mode cards：
  - 都约 `150`

结论很清楚：

- `daily-overview` 仍然有明显的 override 回退空间
- `live return` 顶部指标条是非常直接的浪费

## 候选实验

先在浏览器里注入 CSS 做 A/B。

### baseline

- total：
  - `3233`

### 只收 `live return` 顶部 metrics

- total：
  - `3126`
- `live return`：
  - `570 -> 463`

### `live return` 再恢复双列 workbench

- total：
  - `3051`
- `live return`：
  - `570 -> 389`

### 只收 `daily-overview`

- total：
  - `3064`
- `daily-overview`：
  - `414 -> 245`

### 组合收口

- total：
  - `2883`
- `daily-overview`：
  - `414 -> 245`
- `live return`：
  - `570 -> 389`

## 宽度复核

这组组合方案在：

- `390`
- `375`

表现很好，但在：

- `360`

会开始回弹到 `3440`，说明过窄手机会被压得太紧。

所以这轮最终策略不是全量替换，而是：

- 只在 `@media (min-width:375px) and (max-width:860px)` 生效
- `360` 等更窄手机继续保留原来的安全版本

## 最终做法

只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

不改：

- `DailyLoopDemo` 逻辑
- `DailyReturnBoard` 逻辑
- route / data 结构

### 1. `daily-overview`

- 恢复 `compact-detail-daily-top` 的 mobile 双列 workbench
- 恢复 `route-stage-metrics` 的 3 列紧凑排布
- 恢复 `route-stage-signals` 的 3 列紧凑排布
- 同步压缩 `kv / chips / stage / subtitle`

### 2. `live return`

- `daily-return-metric-strip` 恢复成 3 列
- `daily-return-grid` 恢复成双列 workbench
- `mode cards / queue panel / note / CTA` 全部继续压轻

## 落地后的真实 build 结果

### `/daily-latin`

- mobile total：
  - `3233 -> 2884`

### 关键 section

- `Live Return / Clip Bridge / Archive Jump`：
  - `570 -> 390`

- `状态分流 / 4 步起步 / 回流判断`：
  - `414 -> 245`

### 其余 section

- `Today Loop Demo`：
  - `637`
- `Daily Latin 动作库`：
  - `320`
- `本页依据`：
  - `287`

## 更细的块级结果

### `daily-overview`

- detail：
  - `245`
- stage：
  - `96`
- 4 个 metrics：
  - `40 / 40 / 40 / 40`
- 3 个 signals：
  - `40 / 40 / 40`

### `live return`

- board：
  - `341`
- metric strip：
  - `47`
- panel 1：
  - `284`
- panel 2：
  - `124`
- 3 张 mode cards：
  - 都约 `181`

## 改动后的整站顺序 sweep

- `/` mobile：`1730`
- `/daily-latin` mobile：`2884`
- `/dashboard` mobile：`2899`
- `/dance-os` mobile：`3050`

这意味着当前新的 mobile Top1 已重新收束为：

- `/dance-os`

## 验证

- 已通过：
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `daily-overview` mobile：
  - `/tmp/latinos-daily-overview-pass-mobile.png`
- `live-return` mobile：
  - `/tmp/latinos-daily-return-pass-mobile.png`
- `daily-latin` full page mobile：
  - `/tmp/latinos-daily-page-overview-return-pass.png`

## 这轮后的判断

- 这轮不是再抠文案，而是把两个明显被通用 mobile override 拉长的块重新拉回 workbench 结构
- `daily-latin` 已经不再是当前 mobile Top1
- 下一轮最值得继续追的掉队项又回到：
  - `/dance-os`
