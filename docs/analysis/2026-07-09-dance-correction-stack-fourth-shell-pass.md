# Dance Correction Stack Fourth Shell Pass

## 背景

在上一轮 `Daily Sources Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1799`
- `/dashboard = 1806`
- `/dance-os = 1808`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1808`

继续拆 `/dance-os` 当前 section 后确认：

- `#correction-ledger-demo = 362.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

进一步细拆 `#correction-ledger-demo` 后确认：

- `shell = 335.89`
- `grid = 319.89`
- `stack = 319.89`
- `output = 295.75`
- `STEP 1 = 115.92`
- `STEP 2 = 103.92`
- `STEP 3 = 94.05`

同时确认当前 `390px` 最终命中层里：

- `.ledger-stack { gap: 3px }`
- `.choice-btn { padding: 4px }`
- `.choice-grid:not(.compact) .choice-btn { min-height: 36px }`
- `.choice-btn.compact { min-height: 30px }`

这说明当前更高 ROI 的仍然是左侧 stack shell，而不是右侧 output。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `390px` 覆盖层里，对 `Correction Ledger` 左侧 stack 做 very small shell pass：

- `.dance-os-page .compact-ledger-shell .ledger-stack`
  - `gap: 3px -> 2px`
- `.dance-os-page .compact-ledger-shell .choice-btn`
  - `padding: 4px -> 3px`
- `.dance-os-page .compact-ledger-shell .choice-grid:not(.compact) .choice-btn`
  - `min-height: 36px -> 34px`
- `.dance-os-page .compact-ledger-shell .choice-btn.compact`
  - `min-height: 30px -> 28px`

没有改：

- route 结构
- 组件逻辑
- 数据文案
- 右侧 output
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
- `/daily-latin = 1799`
- `/dashboard = 1806`
- `/dance-os = 1798`

对应量化收益：

- `/dance-os 390`
  - `1808 -> 1798`
- `#correction-ledger-demo`
  - `362.08 -> 352.08`

其他主要 section 保持：

- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. fresh `next start` 成功
4. `route smoke` 通过
5. `browser smoke` 通过
6. fresh `390px` route 总高真实下降
7. `Correction Ledger Demo` section 高度也同步下降

## 结果意义

- `/dance-os` 当前已不再是 broad mobile Top1
- `Correction Ledger` 左侧 stack 仍然存在稳定的 shell 级收口空间
- 当前 broad mobile Top1 切到：
  - `/dashboard = 1806`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1799`
- `/dashboard = 1806`
- `/dance-os = 1798`

下一轮优先建议：

1. 切到 `/dashboard`
2. 优先回看：
   - `#dashboard-route-map = 156.59`
   - `#dashboard-structure-bar = 156.19`
3. 仍然先做 `390px` very small shell / compact copy pass
