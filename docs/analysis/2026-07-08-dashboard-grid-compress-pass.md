# 2026-07-08 Dashboard Grid Compress Pass

## 背景

在 `daily-latin` 被继续压薄之后，顺序测量的 mobile total 变成：

- `/`
  - `1730`
- `/daily-latin`
  - `3644`
- `/dance-os`
  - `4302`
- `/dashboard`
  - `4502`

这说明：

- `dashboard` 重新成为当前 mobile Top1 掉队项

继续拆 section 后，最厚的块是：

- `Witness Archive`
  - `764`
- `Route Map`
  - `632`
- `决策护栏`
  - `511`
- `验证状态`
  - `423`
- `当前运维判断`
  - `404`

进一步看内部结构后，发现最值得先动的不是 `Route Map`，而是：

1. `决策护栏`
   - 两边 panel 里的 source rows 仍然单列
2. `Witness Archive`
   - archive cards 仍是 2 列
3. `验证状态 / 当前运维判断`
   - log cards 仍是 2 列

这些地方都已经足够短，但布局仍然偏保守。

## 问题定义

这一轮不改：

- route 顺序
- 数据结构
- 交互逻辑
- 真实文案含义

只处理：

- `决策护栏`
- `Witness Archive`
- `验证状态`
- `当前运维判断`

在手机端的布局收口。

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `验证状态 / 当前运维判断` 改成手机端三列 log grid

动作：

- `dashboard-page .log-grid`
  - 改成 `repeat(3, minmax(0, 1fr))`
- log card 同步更紧：
  - padding 降
  - `day` 隐藏
  - title / row / note 更小

意义：

- 这两组内容已经是短证据卡
- 用 2 列继续堆叠，并不比 3 列更容易理解
- 改成 3 列后，更接近 compact state board 的信息气质

### 2. `决策护栏` 的 source rows 改成 panel 内双列

动作：

- `dashboard-page .compact-source-matrix-panel .source-list`
  - 改成 `repeat(2, minmax(0, 1fr))`
- row padding / font-size / line-height 再降

意义：

- 当前每个 row 都很短
- 单列排布只是高度浪费
- 改成双列后，更像当前整站统一的 compact evidence matrix

### 3. `Witness Archive` 的 archive cards 改成三列

动作：

- `dashboard-page .archive-list`
  - 改成 `repeat(3, minmax(0, 1fr))`
- `archive-item` / title / context / note / CTA 一起继续收

意义：

- 当前 archive item 已经被 clamp 到很短
- 三列比两列更像一个共享 witness atlas
- 同时能显著收短 archive panel 高度

## 量化结果

基于本地 `http://127.0.0.1:3200/dashboard` 的真实测量：

### 整页高度

- mobile total：
  - 之前：`4502`
  - 现在：`3583`

### 关键 section

- `验证状态`
  - `423 -> 127`

- `决策护栏`
  - `511 -> 323`

- `Witness Archive`
  - `764 -> 615`

- `当前运维判断`
  - `404 -> 118`

### 内部块

- `sourceMatrix`
  - `463 -> 274`

- `sourcePanels`
  - `215 / 215 -> 116 / 126`

- `archiveBoard`
  - `716 -> 567`

- `archivePanel`
  - `556 -> 407`

- `archiveList`
  - `292 -> 146`

- `archiveItem`
  - `149 / 149 / 137 -> 146 / 146 / 146`

- `verificationGrid`
  - `99`

- `opsGrid`
  - `90`

判断：

- 这轮最核心的收益来自：
  - 把已经足够短的证据卡和 archive 卡真正收成多列网格
- 不是删块
- 也不是只缩文字

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

这说明：

- `dashboard` 这轮之后也不再是当前 Top1 掉队项
- 当前又重新切回：
  - `/dance-os`

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/dashboard-grid-compress-pass-desktop.png`
- 手机端：
  - `/tmp/dashboard-grid-compress-pass-mobile.png`

## 验证

这轮通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `dashboard` dense sections 仍然存在
- `Witness Archive` 没有丢失共享 witness 结构
- mobile shell / overflow smoke 继续为绿

## 这轮后的判断

这轮的价值很明确：

1. 没再继续平均压 `Route Map`
2. 而是抓住了当前最保守的三块：
   - evidence cards
   - source matrix rows
   - archive cards
3. 把 `dashboard` mobile total 直接从 `4502` 压到 `3583`
4. 同时把当前新的 Top1 掉队项重新切回：
   - `dance-os`

## 下一步

下一轮最值得继续做的是：

1. 回到 `dance-os`
2. 继续优先看：
   - `Correction Ledger Demo`
   - `Dance OS 模块库`
   - `本页依据`
3. 再做一次布局级高 ROI 收口，而不是平均缩整页
