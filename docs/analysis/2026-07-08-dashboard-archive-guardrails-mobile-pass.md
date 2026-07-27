# 2026-07-08 Dashboard Archive + Guardrails Mobile Pass

## 背景

- 在上一轮 `dance ledger-output + bodymap mobile pass` 之后，重新做全站顺序 sweep：
  - `/` mobile：`1730`
  - `/daily-latin` mobile：`2884`
  - `/dance-os` mobile：`2775`
  - `/dashboard` mobile：`2899`

- 这意味着当前新的 mobile Top1 已经重新变成：
  - `/dashboard`

## 问题定义

这轮不再平均收整页。

而是只回答：

**在当前 `/dashboard` 已经有一轮高密度 workbench 基线的前提下，继续收 `Witness Archive` 和 `决策护栏` 两块，能不能把它从新的 mobile Top1 拉下来？**

## 当前最大块

baseline mobile 下：

- `Guardrails`：`322.61`
- `Proof / Risk / Gate`：`250.88`
- `Route Map`：`324.25`
- `Witness Archive`：`428.92`
- `Ops`：`117.84`

更细一点看：

- `archive-panel`：`321.73`
- `archive-item`：`110.7`
- `route-card`：`135.03`
- `decision-card`：`186.69`

这说明当前 `/dashboard` 最厚的块已经很明确：

- 第一位是 `Witness Archive`
- 第二层是 `Guardrails / Route Map`

而 `Route Map` 本身已经是比较稳的 compact tiles。

## 候选实验

先在浏览器中注入 CSS 做 A/B，再决定是否落盘。

### baseline

- `/dashboard` mobile total：
  - `2899`

### 只收 `Witness Archive`

做法：

- archive summary cards 再压一层
- archive panel head / links / copy / latest 再收短
- archive items 继续薄化

结果：

- `/dashboard` mobile total：
  - `2899 -> 2855`
- `Witness Archive`：
  - `428.92 -> 384.55`
- `archive-panel`：
  - `321.73 -> 283.36`
- `archive-item`：
  - `110.7 -> 97.22`

### 只收 `Guardrails`

做法：

- source matrix padding / gap 继续压
- source panel title、source rows、mini label 再收薄

结果：

- `/dashboard` mobile total：
  - `2899 -> 2828`
- `Guardrails`：
  - `322.61 -> 250.81`

### 组合方案

把 `archive + guardrails` 一起启用后：

- `/dashboard` mobile total：
  - `2899 -> 2783`
- `Guardrails`：
  - `322.61 -> 250.81`
- `Witness Archive`：
  - `428.92 -> 384.55`
- `archive-panel`：
  - `321.73 -> 283.36`
- `archive-item`：
  - `110.7 -> 97.22`

## 视觉与窄屏复核

组合方案继续确认了：

- `390`
- `375`
- `360`

结果：

- 无横向溢出
- 结构仍然像 reference-like compact monitor
- archive 虽然更薄，但仍保留“共享回流证据层”的可读性

真实 build 下三档高度分别为：

- `390`：`2783`
- `375`：`2852`
- `360`：`2864`

## 最终做法

只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

不改：

- `dashboard` route 结构
- `WitnessArchiveBoard` 逻辑
- source / witness 数据

### 1. `Guardrails`

- `compact-source-matrix` 再压一层
- source panel title 更小
- source row padding / font / mini label 再收薄

### 2. `Witness Archive`

- archive board / summary cards 更紧
- archive panel head / links / latest block 继续变薄
- archive items 的：
  - padding
  - title
  - context
  - body
  全部再收短

## 落地后的真实 build 结果

### `/dashboard`

- mobile total：
  - `2899 -> 2783`

### 关键 section

- `Guardrails`：
  - `322.61 -> 250.81`
- `Proof / Risk / Gate`：
  - `250.88`
- `Route Map`：
  - `324.25`
- `Witness Archive`：
  - `428.92 -> 384.55`
- `Ops`：
  - `117.84`

### 更细的块级结果

- `archive-panel`：
  - `321.73 -> 283.36`
- `archive-item`：
  - `110.7 -> 97.22`
- `route-card`：
  - `135.03`
- `decision-card`：
  - `186.69`

## 改动后的整站顺序 sweep

- `/` mobile：`1730`
- `/daily-latin` mobile：`2884`
- `/dance-os` mobile：`2775`
- `/dashboard` mobile：`2783`

这意味着当前新的 mobile Top1 已经变成：

- `/daily-latin`

## 验证

- 已通过：
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `/dashboard` mobile full page：
  - `/tmp/latinos-dashboard-archive-guardrails-pass.png`

## 这轮后的判断

- 这轮价值很高，因为它没有去碰已经比较稳的 `Route Map`
- 而是直接把：
  - `Guardrails`
  - `Witness Archive`
  这两块最容易继续变薄的共享层，再往参考稿的 compact monitor 方向推了一层

## 下一轮最值得继续看的地方

当前下一轮默认优先级已经重新切回：

- `/daily-latin`

如果继续按 mobile ROI 顺序推进，下一轮最值得复看的仍然是：

- `Today Loop Demo`
- `Live Return / Clip Bridge / Archive Jump`

并继续判断它们还能不能再往 reference-like workbench 密度收一轮。
