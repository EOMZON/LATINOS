# Dashboard Metrics Shell Pass

## 背景

在 `Dashboard Witness Archive Summary Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1791`
- `/dance-os = 1760`

这意味着 broad mobile Top1 仍然是：

- `/dashboard = 1791`

继续拆 `/dashboard` 后，当前更厚的 section 是：

- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`
- `#dashboard-route-map = 152.59`
- `#dashboard-next-actions = 152.53`
- `#dashboard-witness-archive = 152.84`

进一步做运行时拆解后确认：

- `#dashboard-metrics = 154.03`
- `dash-grid = 154.03`
- 每张 `dash-card = 73.52`
- 当前最终生效的 `390px` 命中是：
  - `.dashboard-page .dash-card { padding: 11px }`

说明这块当前更像是：

- metrics 卡片壳体 still a bit too thick

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page .dash-card`

做 very small pass：

- `padding: 11px -> 10px`

这轮没有去碰：

- `MetricCard` 组件逻辑
- metrics 数据内容
- 其他 dashboard section

## 验证结果

这轮按既定串行链完整通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1787`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1791 -> 1787`
- `#dashboard-metrics`
  - `154.03 -> 150.03`

其余关键 section 保持：

- `#dashboard-guardrails = 154.56`
- `#dashboard-route-map = 152.59`
- `#dashboard-witness-archive = 152.84`
- `#dashboard-next-actions = 152.53`
- `#dashboard-structure-bar = 147.19`

## 这轮成立的结论

- `metrics` 这块在 `390px` 下仍有少量但真实的卡片壳体收口空间
- 这轮收益来自共享样式层的 very small pass，而不是继续改组件或数据
- `/dashboard` 当前仍然处于多个 section 高度非常接近的阶段，因此后续继续追时必须依赖 fresh runtime baseline

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/dashboard = 1787`
- `/daily-latin = 1780`
- `/dance-os = 1760`

下一轮应继续在 `/dashboard` 内，基于 fresh 数据重新确认 `guardrails / route-map / next-actions / witness-archive` 哪一块 ROI 更高。
