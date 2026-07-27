# Dashboard Witness Archive Third Shell Pass

## 背景

在上一轮 `Daily Loop Second Stack Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1810`
- `/dashboard = 1811`
- `/dance-os = 1808`

这意味着当轮 broad mobile Top1 是：

- `/dashboard = 1811`

继续拆 `/dashboard` 当前 section 后确认：

- `#dashboard-witness-archive = 159.84`
- `#dashboard-route-map = 156.59`
- `#dashboard-structure-bar = 156.19`
- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`
- `#dashboard-next-actions = 152.53`

进一步细拆 `#dashboard-witness-archive` 后确认：

- `boardGap = 4px`
- `summaryPadding = 5px`
- `panelPadding = 5px`
- `listGap = 2px`
- `itemHeight = 45.27`

这说明 `Witness Archive` 虽然已经非常紧，但仍然存在 very small shell 收口空间。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `390px` 覆盖层里，对 `Witness Archive` 再做 very small shell pass：

- `.dashboard-page .archive-summary-card`
  - `padding: 5px -> 4px`
- `.dashboard-page .archive-panel`
  - `padding: 5px -> 4px`
- `.dashboard-page .archive-list`
  - `margin-top: 3px -> 2px`

没有改：

- route 结构
- 组件逻辑
- 数据文案
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
- `/daily-latin = 1810`
- `/dashboard = 1806`
- `/dance-os = 1808`

对应量化收益：

- `/dashboard 390`
  - `1811 -> 1806`
- `#dashboard-witness-archive`
  - `159.84 -> 154.84`

其他主要 section 保持：

- `#dashboard-route-map = 156.59`
- `#dashboard-structure-bar = 156.19`
- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`
- `#dashboard-next-actions = 152.53`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. fresh `next start` 成功
4. `route smoke` 通过
5. `browser smoke` 通过
6. fresh `390px` route 总高真实下降
7. `Witness Archive` section 高度也同步下降

## 结果意义

- `/dashboard` 已不再是 broad mobile Top1
- `Witness Archive` 这块在极限压缩状态下，仍然拿到了稳定的 route 级收益
- 当前 broad mobile Top1 切回：
  - `/daily-latin = 1810`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1810`
- `/dashboard = 1806`
- `/dance-os = 1808`

下一轮优先建议：

1. 切到 `/daily-latin`
2. 优先回看：
   - `#today-loop-demo = 252.47`
3. 仍然先做 `390px` very small stack shell pass，而不是重新改结构
