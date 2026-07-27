# 2026-07-08 Dance OS Bodymap Grid Pass

## 背景

上一轮 completion sweep 后，四个关键 route 的 mobile total 是：

- `/`
  - `1730`
- `/daily-latin`
  - `4567`
- `/dance-os`
  - `4609`
- `/dashboard`
  - `4502`

当时 `dance-os` 仍然是当前 mobile Top1 掉队项。

继续拆 `dance-os` 内部结构后，发现：

- `Correction Ledger Demo`
  - `1292`
- `Body Map / Practice Queue`
  - `1057`

但更重要的是，`Body Map` 的大块高度并不是来自复杂逻辑，而是来自：

- summary cards 仍然单列
- focus cards 仍然单列

这说明这轮最高 ROI 的点，不是继续平均缩字，而是：

**把 `Body Map` 从移动端单列信息流，收回到更像 workbench 的紧凑网格。**

## 问题定义

这一轮不改：

- 路由结构
- witness 聚合逻辑
- correction ledger 行为
- 数据来源与内容含义

只处理：

- `Correction Ledger` 的一个布局尝试
- `Body Map` 的 summary / focus grid 布局

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `Correction Ledger` 做一轮布局级试探

动作：

- `dance-os-page .compact-ledger-shell .choice-grid:not(.compact)`
  - 改成两列
- `dance-os-page .compact-ledger-shell .ledger-result-grid`
  - 改成两列

意义：

- 先验证 `STEP 1` 状态选择与 result cards 是否还有布局级 ROI
- 不动逻辑，不动文案

### 2. `Body Map` summary 改成三列

动作：

- `dance-os-page .compact-bodymap-board .bodymap-summary-grid`
  - 改成 `repeat(3, minmax(0, 1fr))`
- `compact-bodymap-summary-card`
  - padding 再降一层

意义：

- 在 mobile 下，这三张 summary card 的内容已经非常短
- 用三列比单列更像一个压缩过的 workbench metrics strip

### 3. `Body Map` focus cards 改成两列

动作：

- `dance-os-page .compact-bodymap-board .bodymap-focus-list`
  - 改成 `repeat(2, minmax(0, 1fr))`

意义：

- 当前 focus cards 每张高度已经被压得很短
- 单列只是重复堆叠，不再是最优布局
- 两列可以直接收掉大量垂直高度

## 量化结果

基于本地 `http://127.0.0.1:3200/dance-os` 的真实测量：

### 整页高度

- mobile total：
  - 之前：`4609`
  - 现在：`4302`

### 关键 section

- `Correction Ledger Demo`
  - `1292 -> 1292`
  - 基本不变

- `Body Map / Practice Queue`
  - `1057 -> 750`

### 内部块

- `ledgerShell`
  - `1228 -> 1228`
- `ledgerStack`
  - `709 -> 709`
- `ledgerOutput`
  - `490 -> 490`

结论：

- 这轮对 `Correction Ledger` 的布局试探几乎没有带来净收益
- 它说明这里当前再压的 ROI 已经明显下降

- `bodymapBoard`
  - `993 -> 686`

- `bodymapSummary`
  - `202 -> 76`

- `bodymapPanel`
  - `615 -> 434`

- `focusCard`
  - `121 -> 156`
  - 单卡略变高
  - 但因为从单列改成双列，总体高度大幅下降

判断：

- 这轮真正的收益几乎全部来自 `Body Map`
- 而且是非常典型的布局级高 ROI 收口

## 新 completion sweep

这轮后重新 sweep 四个关键 route：

### desktop total

- `/`
  - `1378`
- `/daily-latin`
  - `2412`
- `/dance-os`
  - `2687`
- `/dashboard`
  - `3104`

### mobile total

- `/`
  - `1730`
- `/daily-latin`
  - `4567`
- `/dance-os`
  - `4302`
- `/dashboard`
  - `4502`

## 当前 Top1 判断

这轮之后，`dance-os` 已经不再是当前 mobile Top1 掉队项。

当前重新变成：

- `/daily-latin`
  - `4567`

而 `dance-os` 现在已经低于：

- `daily-latin`
- `dashboard`

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/dance-os-bodymap-grid-pass-desktop.png`
- 手机端：
  - `/tmp/dance-os-bodymap-grid-pass-mobile.png`

## 验证

这轮通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `Correction Ledger Demo` 交互未回退
- `Body Map / Practice Queue` witness 聚合未回退
- mobile shell / overflow smoke 继续为绿

## 这轮后的判断

这轮的价值很明确：

1. 没再平均缩整页，而是继续抓布局级高 ROI 点
2. 验证了：
   - `Correction Ledger` 当前继续压的 ROI 已经不高
   - `Body Map` 仍然有巨大布局级空间
3. 把 `dance-os` 的 mobile total 直接从 `4609` 压到 `4302`
4. 同时把整站当前 Top1 掉队项重新切回：
   - `daily-latin`

## 下一步

下一轮最值得继续做的是：

1. 回到 `daily-latin`
2. 继续优先看：
   - `Today Loop Demo`
   - `旧站已验证的起步原则`
   - `Daily Latin 动作库`
3. 在这些块里继续抓布局级高 ROI 点，而不是分散缩所有元素
