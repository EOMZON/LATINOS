# Dashboard Witness Archive Item Padding Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1768`
- `/dashboard = 1770`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是：

- `/dashboard = 1770`

继续拆 `/dashboard` 后，当前 section 高度主要是：

- `#dashboard-witness-archive = 150.84`
- `#dashboard-guardrails = 149.56`
- `#dashboard-route-map = 148.59`
- `#dashboard-next-actions = 148.53`
- `#dashboard-metrics = 148.03`

进一步做运行时拆解后确认：

- `#dashboard-witness-archive = 150.84`
- `item = 45.27`
- `itemScroll = 43`
- 当前最终命中的：
  - `.dashboard-page #dashboard-witness-archive .archive-item { padding: 4px }`

说明 `archive item` 壳体还有一档 very small 但真实的收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-witness-archive .archive-item`

做 very small pass：

- `padding: 4px -> 3px`

这轮没有去碰：

- `WitnessArchiveBoard` 组件逻辑
- `archive-panel` padding
- `summary-grid`
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
- `/daily-latin = 1768`
- `/dashboard = 1768`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1770 -> 1768`
- `#dashboard-witness-archive`
  - `150.84 -> 148.84`

运行时再次确认：

- `.dashboard-page #dashboard-witness-archive .archive-item`
  - `padding = 3px`
  - `item height = 43.27`

## 这轮成立的结论

- `dashboard witness-archive` 在 `390px` 下还有一档稳定成立的 archive item padding 收口空间
- 这轮收益来自命中真正最终生效的 `witness-archive` media block，而不是继续扩改共享组件逻辑
- 这轮后 broad mobile Top1 状态重新回到并列：
  - `/daily-latin = 1768`
  - `/dashboard = 1768`

下一轮应继续 fresh 基线后，再判断是回到 `/daily-latin`，还是继续在 `/dashboard` 的 `route-map / next-actions / metrics` 里挑下一刀。
