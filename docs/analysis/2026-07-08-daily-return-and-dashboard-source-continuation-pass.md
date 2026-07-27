# Daily Return And Dashboard Source Continuation Pass

## 背景

在上一轮 `daily / dashboard 390 rotation continuation pass` 之后，fresh `390px` sweep 来到：

- `/` = `1513`
- `/daily-latin` = `2345`
- `/dashboard` = `2338`
- `/dance-os` = `2220`

这时新的 broad mobile Top1 仍然是：

- `/daily-latin 390 = 2345`

但它只比 `/dashboard 390 = 2338` 高：

- `7`

所以这轮不适合做大结构动作，更适合继续沿着已经成立的 dense workbench 语言做：

1. 一个 `daily-latin` 的 very small compact 组件层收口
2. 一个 `dashboard` 的 source matrix CSS-only 收口

## 问题定义

### `daily-latin`

当前最值得继续收的不是：

- `Today Loop Demo`
- `Daily Library`

而是：

- `Live Return / Clip Bridge / Archive Jump`

原因不是它太高，而是它仍然保留了：

- compact 状态下的辅助说明 note
- compact 状态下的 helper copy

它在手机端更像“解释壳”，而不是 reference 那种 dense route bridge。

### `dashboard`

在 `Witness Archive` 被上一轮收薄之后，新的最厚单块已经切到：

- `决策护栏`

进一步测量发现：

- `决策护栏` section：`250.81`
- 内部 `.compact-source-matrix`：`202.63`
- 每个 `source-row`：约 `31.19`

这说明当前真正拖高 section 的，不是 header，而是：

- source matrix 仍然偏“说明板”

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-return-board.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `daily-latin`：把 compact `live-return` 的 note / copy 直接收进组件条件

这轮没有继续在叠了多层的 media query 里赌优先级。

而是直接在组件层判断：

- `compact`

时不渲染：

- `daily-return-note`
- `daily-return-copy`

作用：

- 保留 compact board 的结构
- 保留 3 个 mode cards
- 保留 queue card 与 bridge CTA
- 去掉手机端已经重复的解释层

这比继续堆 CSS 覆盖更稳，也更符合长期 AI 可维护性。

### 2. `dashboard`：把 source matrix 再压成更 dense 的 monitor

这轮只动：

- `dashboard-page .compact-source-matrix-panel .source-row`
- `dashboard-page .compact-source-matrix-panel .source-row .mini`

动作：

- row padding 再降一层
- 字级再降一层
- `.mini` 辅助行直接隐藏

不动：

- SourceMatrix 组件结构
- 数据内容
- 左右 panel 结构

## 量化结果

### 第一轮：`daily-latin` compact `live-return`

#### 整页

- `/daily-latin 390`
  - `2345 -> 2311`

#### 关键块

- `#live-return-bridge`
  - `310.48 -> 276.48`
- `.compact-daily-return-board`
  - `264.30 -> 230.30`
- 左侧主 panel
  - `207.30 -> 173.30`
- 右侧 queue panel
  - `115.27 -> 81.27`

判断：

- 这轮不是简单改样式数字
- 而是把 compact route bridge 的“解释壳”真的删掉了

### 第二轮：`dashboard` source matrix

#### 整页

- `/dashboard 390`
  - `2338 -> 2298`

#### 关键块

- `决策护栏`
  - `250.81 -> 211.31`
- `.compact-source-matrix`
  - `202.63 -> 163.13`
- 单个 `source-row`
  - `31.19 -> 21.31`

判断：

- 这一轮价值非常高
- 因为它不是继续收 `archive`，而是把当前新的厚块重新拉回了 dense monitor 语言

## 这轮后的 fresh 390 sweep

- `/` = `1513`
- `/daily-latin` = `2311`
- `/dashboard` = `2298`
- `/dance-os` = `2220`

当前新的 broad mobile Top1 是：

- `/daily-latin 390 = 2311`

它只比 `/dashboard` 高：

- `13`

同时 `/dance-os` 已明显低一档，说明三条主 route 的 `390px` 密度已经被进一步拉齐。

## 视觉证据

- `/tmp/daily-latin-390-after-component-return-pass.png`
- `/tmp/dashboard-390-after-source-matrix-pass.png`
- `/tmp/home-current-desktop-v2.png`
- `/tmp/home-current-mobile-v2.png`

## 验证

这轮继续通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `DailyLoopDemo` 交互未回退
- `dashboard dense sections render`
- `dashboard witness archive` 继续正常
- mobile shell 正常
- mobile home / daily 无横向 overflow

## 结论

这轮最重要的价值有两个：

1. 用组件层 compact 条件渲染，把 `daily-latin` 的 `live-return` 从解释板继续推向 dense bridge
2. 用 CSS-only very small pass，把 `dashboard` 当前新的厚块 `决策护栏` 收回到更接近 reference 的监控板密度

## 下一步

下一轮更值得继续做的是：

1. 再回 `daily-latin 390`
   - 优先看：
     - `#daily-library`
     - `#today-loop-demo`
   - 但只在有明确 ROI 时继续动
2. 或者切回整站 completion 视角
   - 重新判断首页 desktop/mobile 最后那层完成感是否重新成为更高 ROI gap
