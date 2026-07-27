# Dashboard Metrics Gap Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1772`
- `/dashboard = 1774`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 仍然是：

- `/dashboard = 1774`

继续拆 `/dashboard` 后，当前更厚的 section 是：

- `#dashboard-guardrails = 151.56`
- `#dashboard-witness-archive = 150.84`
- `#dashboard-metrics = 150.03`
- `#dashboard-route-map = 148.59`
- `#dashboard-next-actions = 148.53`

进一步做运行时拆解后确认：

- `#dashboard-metrics = 150.03`
- `dash-grid = 150.03`
- 每张 `dash-card = 71.52`
- 当前命中的 gap 是：
  - `.dashboard-page #dashboard-metrics .dash-grid { gap: 7px }`

说明这块还有一档很直接的 grid shell 收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-metrics .dash-grid`

做 very small pass：

- `gap: 7px -> 5px`

这轮没有去碰：

- `MetricCard` 组件逻辑
- metrics 文案或数据
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
- `/daily-latin = 1772`
- `/dashboard = 1772`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1774 -> 1772`
- `#dashboard-metrics`
  - `150.03 -> 148.03`

运行时再次确认：

- `.dashboard-page #dashboard-metrics .dash-grid`
  - `gap = 5px`

## 这轮成立的结论

- `dashboard metrics` 在 `390px` 下还有 very small 但稳定成立的 grid 壳体收口空间
- 这轮收益来自命中最终生效 media block 的 `gap` 收口，而不是继续赌 card padding
- 当前 broad mobile Top1 已不再是单独的 `/dashboard`，而是：
  - `/daily-latin = 1772`
  - `/dashboard = 1772`

下一轮应继续 fresh 复测后，再决定是继续追 `/dashboard` 里剩余几个近似 section，还是回到 `/daily-latin`。
