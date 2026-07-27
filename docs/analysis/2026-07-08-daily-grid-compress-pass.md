# 2026-07-08 Daily Grid Compress Pass

## 背景

在上一轮 `daily return grid pass` 之后，`/daily-latin` 的 mobile total 已经来到：

- `4567`

这已经比更早的版本明显短很多。

但继续看当前 mobile section 高度，仍然有几块明显还在吃垂直空间：

- `Today Loop Demo`
  - `1049`
- `Live Return / Clip Bridge / Archive Jump`
  - `570`
- `状态分流 / 4 步起步 / 回流判断`
  - `414`
- `Daily Latin 动作库`
  - `320`

进一步拆开后，发现真正还偏“线性堆叠”的不是 loop 本身，而是：

- `入口状态`
- `Daily Loop`
- `旧站已验证的起步原则`
- `Daily Latin 动作库`

这些区块都已经足够短，但在手机端仍然保守地保持：

- 一列卡片堆叠
- 两列 move cards

这说明当前更高 ROI 的方向，不是继续平均缩字号，而是：

**把这些已经足够短的卡片块，真正收成移动端紧凑网格。**

## 问题定义

这一轮不改：

- route 结构
- 交互逻辑
- 数据结构
- 内容语义

只处理：

- `入口状态`
- `Daily Loop`
- `旧站已验证的起步原则`
- `Daily Latin 动作库`

的手机端卡片排布。

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 三组 `log card` 改成手机端三列紧凑网格

动作：

- `daily-latin-page .log-grid`
  - 改成 `repeat(3, minmax(0, 1fr))`
- `daily-latin-page .log-grid.single-column`
  - 也改成 `repeat(3, minmax(0, 1fr))`

同时继续压卡片本体：

- padding 下降
- `day` 直接隐藏
- title / row / note 字级继续下降
- note 改成 2 行 clamp

意义：

- `入口状态`
- `Daily Loop`
- `旧站原则`

这三组内容本身已经不是“大卡说明块”了，

更合理的形态是：

- 一组同时可扫读的 compact grid

而不是：

- 一张一张往下堆

### 2. `Daily Latin 动作库` 改成手机端三列 move grid

动作：

- `daily-latin-page .compact-move-grid`
  - 改成 `repeat(3, minmax(0, 1fr))`
- `compact-move-card`
  - min-height 继续下降
  - padding 继续下降
  - `tag` 更小
  - `subtitle` 直接隐藏
  - `meta` 继续压短

意义：

- 当前默认打开的是 `路径` 这一组
- 项目已经足够简短
- 两列布局只是保守，没有更强的信息收益
- 三列更像一个真正被收住的 tool / route atlas

## 量化结果

基于本地 `http://127.0.0.1:3200/daily-latin` 的真实测量：

### 整页高度

- mobile total：
  - 之前：`4567`
  - 现在：`3644`

### 关键 section

- `入口状态`
  - `392 -> 119`

- `Daily Loop`
  - `392 -> 110`

- `旧站已验证的起步原则`
  - `413 -> 149`

- `Daily Latin 动作库`
  - `320 -> 320`
  - section 总高度基本持平，但 grid 本体继续被压紧

### 内部块

- `legacyGrid`
  - `364 -> 101`

- `entryGrid`
  - `364 -> 92`

- `loopGrid`
  - `364 -> 82`

- `libraryPanel`
  - `76 -> 71`

- `moveGrid`
  - `240 -> 141`

- `moveCard`
  - `76 -> 68`

判断：

- 这轮最大价值来自：
  - 三组 log cards 从线性堆叠变成真正的 compact grid
- move library 也一起更像被收紧的 route-level atlas

## 新 completion sweep

顺序测量后的当前 mobile total：

- `/`
  - `1730`
- `/daily-latin`
  - `3644`
- `/dance-os`
  - `4302`
- `/dashboard`
  - `3583`

这说明这轮之后：

- `daily-latin` 已经不再是当前 Top1 掉队项

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/daily-latin-grid-compress-pass-desktop.png`
- 手机端：
  - `/tmp/daily-latin-grid-compress-pass-mobile.png`

## 验证

这轮通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `DailyLoopDemo` 交互未回退
- `DailyReturnBoard` 行为未回退
- mobile home / daily overflow 继续为绿

## 这轮后的判断

这轮的价值非常明确：

1. 没再继续平均缩 `Today Loop Demo`
2. 而是抓到了当前真正还保守的块：
   - 线性卡片堆叠
3. 用更接近参考稿的 compact grid 语言，把 `daily-latin` mobile total 直接从 `4567` 压到 `3644`

## 下一步

这轮之后，当前新的 mobile Top1 掉队项已经不再是 `daily-latin`。

下一步更值得继续做的是：

1. 回到 `dashboard`
2. 优先看：
   - `决策护栏`
   - `Witness Archive`
   - `验证状态 / 当前运维判断`
3. 继续抓布局级高 ROI 点
