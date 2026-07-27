# Daily Loop Entry Shell Pass

## 背景

在上一轮 `Daily Library Tab Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1836`
- `/dashboard = 1823`
- `/dance-os = 1840`

这意味着当轮 broad mobile Top1 是：

- `/daily-latin = 1836`

继续拆 `/daily-latin` 后，当前 section 高度是：

- `#today-loop-demo = 268.50`
- `#daily-sources = 168.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`

## 为什么这轮选 `#today-loop-demo`

对 `#today-loop-demo` 的当前 compact 状态拆解显示：

- `section = 268.50`
- `card1 = 87.16`
- `card2 = 60.16`
- `card3 = 81.00`
- `output = 231.28`

进一步拆 `STEP 1 / STEP 2` 后确认：

- `card1Grid = 53`
- `card2Grid = 26`
- `choice-btn` 当前最终命中层仍是：
  - `min-height: 26px`
  - `padding: 2px 3px` 或 `3px`

说明这块已经进入 very small shell pass 阶段，继续收 `STEP 1 / STEP 2` 按钮壳体仍有轻微收益空间。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层里，对 `Today Loop Demo` 的 entry shell 做 very small pass：

- `.choice-grid:not(.compact) .choice-btn`
  - `min-height: 26px -> 24px`
- `.choice-btn.compact`
  - `min-height: 26px -> 24px`
  - `padding: 3px -> 2px 3px`

没有改：

- route 结构
- 组件逻辑
- 文案数据
- output 区

## 验证动作

按既定串行链验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad mobile heights：

- `/ = 1513`
- `/daily-latin = 1835`
- `/dashboard = 1823`
- `/dance-os = 1840`

对应量化收益：

- `/daily-latin 390`
  - `1836 -> 1835`
- `#today-loop-demo`
  - `268.50 -> 267.47`

其余关键 section 保持：

- `#daily-sources = 168.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降

## 结果意义

- `today-loop-demo` 仍然存在 very small entry shell 收口空间
- 当前 `/daily-latin` 已经进入极小像素级竞争区
- 后续继续追这块时，需要优先找默认空态下仍能稳定归因的小壳体，而不是重改结构

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1835`
- `/dashboard = 1823`
- `/dance-os = 1840`

下一轮优先建议：

1. 继续留在 `/daily-latin`
2. 优先看：
   - `#daily-sources = 168.06`
   - 或 `#today-loop-demo` 的下一层默认空态 shell
3. 仍然先做 `390px` very small pass
