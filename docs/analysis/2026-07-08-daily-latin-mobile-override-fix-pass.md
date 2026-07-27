# 2026-07-08 Daily Latin Mobile Override Fix Pass

## 背景

这轮不是重做 `Daily Latin` 的信息架构，也不是改 demo 逻辑。

目标只有一个：

**继续沿既定主线收 `daily-latin` 手机端，并确认为什么这条 route 已经写过一轮页面级 mobile compact，但当前高度仍然没有继续明显下降。**

## 先确认的真实问题

在重新量化当前 `daily-latin` 后，手机端真实结果是：

- mobile total：`5068`

关键区块仍然偏厚：

- `Today Loop Demo`
  - `1115`
- `Live Return / Clip Bridge / Archive Jump`
  - `745`
- `入口状态`
  - `448`
- `Daily Loop`
  - `448`
- `Daily Latin 动作库`
  - `468`

继续看 CSS 结构后，发现这里和上一轮的 `dance-os` 很像：

- `daily-latin` 已经有一批页面级 mobile compact 规则
- 但它们写在移动端通用规则之前
- 后面那批更晚生效的通用 mobile 规则，会把其中一部分收口效果反向抹平

所以这一轮真正该做的，不只是再“缩一层”，而是：

1. 让 `daily-latin` 的页面级 mobile compact 规则真正生效
2. 再对最高 ROI 的几个区块继续压一层

## 问题定义

这轮不改：

- `DailyLoopDemo` 的交互逻辑
- `DailyReturnBoard` 的行为逻辑
- `Daily Latin` 的路由结构
- 内容源与数据结构

只处理：

- `Today Loop Demo`
- `Live Return / Clip Bridge / Archive Jump`
- `入口状态`
- `Daily Loop`
- `Daily Latin 动作库`
- `本页依据`

在手机端的密度与优先级问题。

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 在移动端规则尾部追加 `daily-latin` 页面级覆盖

这轮没有去碰组件结构，而是把 `daily-latin` 专属 compact 规则放到移动端规则尾部，确保它不再被通用 mobile 规则盖掉。

覆盖范围包括：

- `compact-detail-daily-top`
- `compact-route-stage-daily`
- `compact-source-matrix-daily`
- `log-card.compact-card`
- `compact-ledger-shell`
- `compact-daily-return-board`
- `compact-library-panel`
- `compact-move-card`

### 2. 顶部 summary 与依据区再压一层

动作：

- tabs 更紧
- detail top 的标题、subtitle、kv、chips 继续下降
- route stage 的 metric / signal 再压
- source matrix 的 panel title、row、mini 字级继续下降

意义：

- 让页面不是一开始就把高度花在说明层上
- 继续把首屏和上半段推向更克制的 workbench route 语言

### 3. Today Loop Demo 再压一层

动作：

- `compact-ledger-shell` 的 padding、gap、card padding 再降
- `kicker`、`h3`、`copy` 再降
- `choice`、`task toggle`、`result card`、`recent witness` 继续收
- progress bar、textarea、link-row 一起变紧

意义：

- 不删步骤
- 不删 planner
- 只继续把“解释高度”让位给“操作高度”

### 4. Live Return 再压一层

动作：

- metric pill 更小
- panel / note / copy / mode card / queue card 继续变紧
- recommendation / queue text 继续压缩
- CTA 按钮继续收短

意义：

- 让这一块更像桥接入口
- 而不是一个仍然偏厚的功能板

### 5. 下半段 cards 与动作库继续收口

动作：

- `入口状态` / `Daily Loop` / `旧站已验证的起步原则` 的 compact card 再压一层
- `move library` 的 panel、count、note、move card、tag、meta 一起压缩

意义：

- 不是只收最大块
- 而是让整页下半段也更统一地靠近参考稿那种被控制住的密度

## 量化结果

基于本地 `http://127.0.0.1:3200/daily-latin` 的真实测量：

### 整页高度

- mobile total：
  - 之前：`5068`
  - 现在：`4670`

### 关键 section

- `Daily Latin Demo`
  - `421 -> 414`

- `本页依据`
  - `321 -> 287`

- `入口状态`
  - `448 -> 392`

- `Daily Loop`
  - `448 -> 392`

- `Today Loop Demo`
  - `1115 -> 1041`

- `Live Return / Clip Bridge / Archive Jump`
  - `745 -> 681`

- `旧站已验证的起步原则`
  - `468 -> 413`

- `Daily Latin 动作库`
  - `468 -> 424`

### 内部块

- `ledgerShell`
  - `1067 -> 993`

- `ledgerOutput`
  - `450 -> 422`

- `ledgerStack`
  - `587 -> 546`

- `returnBoard`
  - `697 -> 632`

- `returnModeCard`
  - `145 -> 128`

- `moveCard`
  - `84 -> 76`

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/daily-latin-override-fix-desktop.png`
- 手机端：
  - `/tmp/daily-latin-override-fix-mobile.png`

## 验证

这轮通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `DailyLoopDemo` 交互未回退
- `DailyReturnBoard` 行为未回退
- mobile home / daily overflow 继续为绿
- `Dance OS` / `dashboard` / 首页 smoke 继续通过

## 这轮后的判断

这轮最重要的价值，不只是把 `daily-latin` 再压短了一点。

真正的价值是：

1. 找到了这条 route 前一轮 compact 没继续明显生效的原因
2. 通过页面级优先级修正，把已经成立的 `daily-latin` compact 语言真正落实到了手机端
3. 把 `Today Loop Demo`、`Live Return`、下半段 cards 和动作库一起继续收薄

当前 `daily-latin` 已经从：

- 手机端仍偏长的入口页

更靠近：

- 一个更像参考稿体系的 compact practice workbench route

## 下一步

这一轮之后，下一次更值得继续看的方向会变成：

1. 再做一次关键 route completion sweep
2. 对比：
   - `/`
   - `/daily-latin`
   - `/dance-os`
   - `/dashboard`
3. 判断现在最后的 Top1 掉队项
4. 再继续做单点高 ROI 收口，而不是分散大改
