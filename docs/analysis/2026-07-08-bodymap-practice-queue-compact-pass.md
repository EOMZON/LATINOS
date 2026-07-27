# 2026-07-08 Body Map / Practice Queue Compact Pass

## 背景

在 `Dance OS` 上半段和 `Correction Ledger Demo` 都已经接到统一 compact workbench 层之后，剩下最明显的厚块开始集中到：

- `Body Map / Practice Queue`

上一轮之后，`Dance OS` 的量化状态是：

- 桌面端全页：`3219.50`
- 手机端全页：`7022.02`

这说明中段虽然已经收过，但后半段仍然在拖长整页节奏。

## 这轮目标

不是改逻辑，而是把 `Body Map / Practice Queue` 真正接入当前共享 compact 体系：

- 收掉组件里永远为真的伪双模式分支
- 给 `body map` / `practice queue` 补齐 compact 共享样式
- 在不破坏现有 witness 聚合与 queue 逻辑的前提下，压缩这块的体量与密度

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/body-map-practice-queue.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 组件结构收口

`BodyMapPracticeQueue` 原先虽然实际一直走 compact 方向，但组件内部仍保留：

- `compact = true`
- 大量 `compact ? ... : ...` 的死分支

这对长期 AI 维护不友好，因为它会制造“看起来支持双模式、实际没有第二模式”的假复杂度。

这轮直接把它收成当前真实形态：

- 固定使用 compact class hooks
- 删除死分支 copy
- 保留原有 witness 聚合 / queue / test id / 链接逻辑

### 2. 共享 compact 样式补齐

新增并统一到了 `workbench.css` 的 compact 层：

- `compact-bodymap-board`
- `compact-bodymap-summary-card`
- `compact-bodymap-panel`
- `compact-bodymap-focus-card`
- `compact-practice-panel`
- `compact-practice-queue-card`

主要收口动作包括：

- summary cards 更薄
- panel padding / gap 下降
- section heading 与 note pill 更紧
- focus cards、cue、latest card、queue card 一起压短
- CTA 按钮缩成更像 workbench route 里的操作入口
- mobile 下继续保留一列结构，但字级、padding、queue 密度同步压缩

## 量化结果

这轮后的真实测量：

- `Dance OS` 桌面端全页：
  - 之前：`3219.50`
  - 现在：`2964`
- `Dance OS` 手机端全页：
  - 之前：`7022.02`
  - 现在：`6609`
- 当前桌面端 `body-map-practice-queue`：
  - `597.31`
- 当前手机端 `body-map-practice-queue`：
  - `1406.81`
- 当前桌面端 `correction-ledger-demo`：
  - `734.89`

这说明：

- `Body Map / Practice Queue` 已经不再是当前页面里最厚的块
- 当前新的最大块重新回到：
  - `Correction Ledger Demo`

## 截图

- 桌面端：
  - `/tmp/latinos-dance-after-bodymap-compact-desktop.png`
- 手机端：
  - `/tmp/latinos-dance-after-bodymap-compact-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`

并且 `pnpm verify` 继续覆盖通过：

- `typecheck`
- `build`
- `route smoke`
- `prod smoke`
- `browser smoke`

继续确认：

- `body map` 聚合仍然正确显示 `1 次 witness`
- `practice queue` 继续展示最新 `feet` witness
- 现有 `data-testid` 未被破坏
- 手机端 overflow 继续为绿

## 这轮后的判断

这轮的价值不只是“页面变矮了一点”，而是：

- `Body Map / Practice Queue` 终于接到了现有共享 compact workbench 层
- 组件结构本身比之前更直白、更适合 AI 接手
- `Dance OS` 后半段现在更像同一站点里的 route section，而不是一块独立厚面板

## 下一轮最值得继续做什么

1. 继续看 `Correction Ledger Demo` 是否还能再压一层而不损坏交互可读性
2. 在 `Dance OS` 里继续用真实来源和真实状态词压掉剩余模板感
3. 再做一轮整页统一检查，确认首页 / Daily / Dance OS 的密度已经更接近参考稿的同一套完成感
