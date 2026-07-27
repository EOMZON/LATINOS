# Dashboard Metrics Second Gap Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1766`
- `/dashboard = 1767`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是：

- `/dashboard = 1767`

继续拆 `/dashboard` 后，当前 section 高度主要是：

- `#dashboard-witness-archive = 148.84`
- `#dashboard-route-map = 148.59`
- `#dashboard-next-actions = 147.53`
- `#dashboard-metrics = 148.03`

进一步做运行时拆解后确认：

- `#dashboard-metrics = 148.03`
- `grid = 148.03`
- `card = 71.52`
- `cardScroll = 70`
- 当前真正命中的 `390px` block 内：
  - `.dashboard-page #dashboard-metrics .dash-grid { gap: 5px }`

说明这块还有一档 very small 但直接的 grid gap 收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-metrics .dash-grid`

做 very small pass：

- `gap: 5px -> 4px`

这轮没有去碰：

- `MetricCard` 组件逻辑
- dash card padding
- 数据文案
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
- `/daily-latin = 1766`
- `/dashboard = 1766`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1767 -> 1766`
- `#dashboard-metrics`
  - `148.03 -> 147.03`

运行时再次确认：

- `.dashboard-page #dashboard-metrics .dash-grid`
  - `gap = 4px`

## 这轮成立的结论

- `dashboard metrics` 在 `390px` 下还有一档稳定成立的 second grid gap 收口空间
- 这轮收益来自命中真正最终生效的 `metrics` media block，而不是继续赌 card padding
- 这轮后 broad mobile Top1 状态重新回到并列：
  - `/daily-latin = 1766`
  - `/dashboard = 1766`

下一轮应继续 fresh 基线后，再判断是回到 `/daily-latin`，还是继续追 `/dashboard` 里最后几块接近的 section。
