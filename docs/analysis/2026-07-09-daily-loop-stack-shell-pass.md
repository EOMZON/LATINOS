# Daily Loop Stack Shell Pass

## 背景

在上一轮 `Dance Correction Stack Second Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1820`
- `/dashboard = 1817`
- `/dance-os = 1816`

这意味着当轮 broad mobile Top1 是：

- `/daily-latin = 1820`

继续拆 `/daily-latin` 后，当前主要 section 高度是：

- `#today-loop-demo = 262.50`
- `#daily-sources = 158.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`

进一步细拆 `#today-loop-demo` 后确认：

- `shell = 240.31`
- `stack = 226.31`
- `output = 216.28`

上一轮曾先尝试继续收右侧 output shell，fresh 运行态确认 output 自身变薄了，但 route 总高完全不动。这说明当前真正支配 `today-loop-demo` section 的仍然是左侧 stack，而不是 output。

继续细拆 stack 后确认：

- `STEP 1 = 83.16`
- `STEP 2 = 56.16`
- `STEP 3 = 81.00`

运行态命中样式是：

- `buttonMinHeight = 24px`
- `compactButtonMinHeight = 24px`
- `taskPadding = 3px 5px`

所以这轮最高 ROI 是继续只收 stack shell。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层里，对 `Today Loop Demo` 左侧 stack 做 very small pass：

- `.daily-latin-page .compact-ledger-shell .choice-grid:not(.compact) .choice-btn`
  - `min-height: 24px -> 22px`
- `.daily-latin-page .compact-ledger-shell .choice-btn.compact`
  - `min-height: 24px -> 22px`
- `.daily-latin-page .compact-ledger-shell .daily-task-toggle`
  - `padding: 3px 5px -> 3px 4px`

没有改：

- route 结构
- 数据文案
- output shell
- 其他 section

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
- `/daily-latin = 1814`
- `/dashboard = 1817`
- `/dance-os = 1816`

对应量化收益：

- `/daily-latin 390`
  - `1820 -> 1814`
- `#today-loop-demo`
  - `262.50 -> 256.50`

细拆确认：

- `STEP 1`
  - `83.16 -> 79.16`
- `STEP 2`
  - `56.16 -> 56.16`
- `STEP 3`
  - `81.00 -> 81.00`
- `output`
  - `216.28 -> 216.28`

运行态命中样式同步变为：

- `buttonMinHeight = 22px`
- `compactButtonMinHeight = 22px`
- `taskPadding = 3px 4px`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. `Today Loop Demo` section 高度同步明显下降
7. 下降可归因到左侧 stack shell 收紧，而不是测量噪音

## 结果意义

- `Today Loop Demo` 当前仍然存在稳定的 stack shell 收口空间
- `/daily-latin` 这一轮被明显拉低
- broad mobile Top1 已从 `/daily-latin` 切回 `/dashboard`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1814`
- `/dashboard = 1817`
- `/dance-os = 1816`

下一轮优先建议：

1. 切到 `/dashboard`
2. 优先回看：
   - `#dashboard-witness-archive`
   - `#dashboard-next-actions`
   - `#dashboard-route-map`
3. 仍然先做 `390px` very small shell / compact copy pass
