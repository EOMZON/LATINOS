# Dashboard Witness Archive Summary Shell Pass

## 背景

在 `Dashboard Route Map Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1793`
- `/dance-os = 1760`

这意味着 broad mobile Top1 仍然是：

- `/dashboard = 1793`

继续拆 `/dashboard` 后，当前更厚的 section 是：

- `#dashboard-witness-archive = 154.84`
- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`
- `#dashboard-next-actions = 152.53`

进一步做运行时拆解后确认：

- `#dashboard-witness-archive .archive-board = 130.66`
- `summary = 39.00`
- `panel = 87.66`
- `list = 45.27`
- 当前最终生效的 `390px` 命中是：
  - `summary gap = 2px`
  - `summary-card padding = 4px`
  - `panel padding = 4px`
  - `list gap = 2px`

说明这一轮最值得先试的是：

- `summary-card` 壳体 very small pass

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page .archive-summary-card`

做 very small pass：

- `padding: 4px -> 3px`

这轮没有去碰：

- `WitnessArchiveBoard` 组件结构
- fallback / live witness 逻辑
- 其他 dashboard section
- 数据层内容

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
- `/dashboard = 1791`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1793 -> 1791`
- `#dashboard-witness-archive`
  - `154.84 -> 152.84`

其余关键 section 保持：

- `#dashboard-route-map = 152.59`
- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`
- `#dashboard-next-actions = 152.53`
- `#dashboard-structure-bar = 147.19`

## 这轮成立的结论

- `witness-archive` 这块在 `390px` 下仍有 very small 的 summary 壳体收口空间
- 收益虽然不大，但 route-level 和 section-level 都真实下降
- 这一类 pass 仍然适合继续优先走共享样式层，不必立刻改组件逻辑

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/dashboard = 1791`
- `/daily-latin = 1780`
- `/dance-os = 1760`

下一轮应继续在 `/dashboard` 内，基于 fresh 数据重新确认 `guardrails / metrics / next-actions` 哪一块 ROI 更高。
