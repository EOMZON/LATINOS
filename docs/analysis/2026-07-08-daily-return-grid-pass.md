# 2026-07-08 Daily Return Grid Pass

## 背景

在上一轮 `daily-latin mobile override fix pass` 之后，`/daily-latin` 的手机端已经从：

- `5068 -> 4670`

这说明方向是对的。

但继续做四个关键 route 的 completion sweep 后，当前 mobile total 仍然是：

- `/`
  - `1730`
- `/daily-latin`
  - `4670`
- `/dance-os`
  - `4609`
- `/dashboard`
  - `4502`

这说明：

- 首页已经不是问题
- `dashboard` 也不是当前 Top1
- `daily-latin` 仍然是当前 mobile total 最高的 route

但继续拆 `daily-latin` 内部块后，又发现：

- `Today Loop Demo`
  - `1041`
- `Live Return / Clip Bridge / Archive Jump`
  - `681`
- `Daily Latin 动作库`
  - `424`
- `旧站已验证的起步原则`
  - `413`

也就是说，当前更值得继续抓的不是平均缩字，而是：

1. `Today Loop Demo` 里是否还有布局级节省空间点
2. `Live Return` 的 mode cards 是否还能更像紧凑入口排布

## 问题定义

这一轮不改：

- 组件结构
- 数据结构
- 交互逻辑
- route 信息架构

只处理：

- `Today Loop Demo`
  - `STEP 1` 的状态选择排布
- `Live Return`
  - mode cards 的手机端排布

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `Today Loop Demo` 的状态选择改成手机端两列

动作：

- `daily-latin-page .compact-ledger-shell .choice-grid:not(.compact)`
  - 改成 `repeat(2, minmax(0, 1fr))`
- 同时把这组按钮的 `min-height` 降到 `48px`

意义：

- 不改步骤顺序
- 不改状态文案
- 只让 `STEP 1` 不再垂直堆成单列

这是一个比继续缩字号更高 ROI 的布局调整。

### 2. `Live Return` 的 mode cards 改成手机端三列

动作：

- `daily-latin-page .compact-daily-return-board .daily-return-mode-list`
  - 改成 `repeat(3, minmax(0, 1fr))`
- gap 继续压紧

意义：

- 这三张 mode cards 天然就是三种去向：
  - 回 Daily
  - 看 Archive
  - 桥接 Dance
- 在手机端做成三列，比两列更像一个快速判断板
- 同时也显著收短第一块 return panel 的高度

## 量化结果

基于本地 `http://127.0.0.1:3200/daily-latin` 的真实测量：

### 整页高度

- mobile total：
  - 之前：`4670`
  - 现在：`4567`

### 关键 section

- `Today Loop Demo`
  - `1041 -> 1049`
  - 基本持平，略有回涨

- `Live Return / Clip Bridge / Archive Jump`
  - `681 -> 570`

### 内部块

- `ledgerShell`
  - `993 -> 1001`
  - 基本持平

- `STEP 1 / STEP 2 / STEP 3` card heights
  - `168 / 176 / 186`
  - 变为 `176 / 176 / 186`
  - 说明 `STEP 1` 两列并没有带来明显净收益

- `return panel`
  - `364 -> 253`

- `returnModeCard`
  - `128 -> 150`
  - 单卡更高了
  - 但由于从两列改成三列，整体 return panel 仍然显著变短

判断：

- 这轮最有效的不是 `Today Loop Demo`
- 而是 `Live Return` 的布局重排
- 它把整个 `daily-latin` 再拉短了约 `103px`

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
  - `4609`
- `/dashboard`
  - `4502`

## 当前 Top1 判断

这轮之后，当前真正的 mobile Top1 掉队项已经不再是 `daily-latin`。

当前变成：

- `/dance-os`
  - `4609`

而它的最大块仍然是：

- `Correction Ledger Demo`
  - `1292`
- `Body Map / Practice Queue`
  - `1057`

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/daily-latin-return-grid-pass-desktop.png`
- 手机端：
  - `/tmp/daily-latin-return-grid-pass-mobile.png`

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

这轮的价值在于：

1. 没有平均缩整页，而是继续抓布局级高 ROI 点
2. 验证了：
   - `Today Loop Demo` 当前再压的 ROI 已经变低
   - `Live Return` 的入口排布仍然有明显收益
3. 通过这一轮，把 `daily-latin` 的 mobile total 继续压到了 `4567`
4. 同时把整站当前 Top1 掉队项重新切换回：
   - `dance-os`

## 下一步

下一轮最值得继续做的是：

1. 回到 `dance-os`
2. 继续优先看：
   - `Correction Ledger Demo`
   - `Body Map / Practice Queue`
3. 在这两个最大块里，再抓下一个布局级高 ROI 点，而不是平均缩字
