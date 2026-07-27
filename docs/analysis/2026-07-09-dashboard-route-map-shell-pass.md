# Dashboard Route Map Shell Pass

## 背景

在 `Dance Summary Chip Hide Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1797`
- `/dance-os = 1760`

这意味着新的 broad mobile Top1 是：

- `/dashboard = 1797`

继续拆 `/dashboard` 后，当前更厚的 section 是：

- `#dashboard-route-map = 156.59`
- `#dashboard-witness-archive = 154.84`
- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`
- `#dashboard-next-actions = 152.53`

进一步做运行时拆解后确认：

- `#dashboard-route-map .route-grid = 132.41`
- 每张 `.route-card = 65.20`
- `.route-head = 23.48`
- `.route-rows = 24.72`

说明这块当前已经不像前几轮那样主要由说明文案拖高，而更像是：

- 紧凑卡片壳体仍然略厚

运行时实际命中样式确认：

- `#dashboard-route-map .route-card`
  - `padding: 6px`

因此这轮优先追：

- `route-card` 壳体 very small pass

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-route-map .route-card`

做 very small pass：

- `padding: 6px -> 5px`

这轮没有去碰：

- `dashboardRouteSignals` 数据
- `RouteSignalCard` 组件结构
- 其他 route
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
- `/dashboard = 1793`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1797 -> 1793`
- `#dashboard-route-map`
  - `156.59 -> 152.59`

其余关键 section 保持：

- `#dashboard-witness-archive = 154.84`
- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`
- `#dashboard-next-actions = 152.53`
- `#dashboard-structure-bar = 147.19`

## 这轮成立的结论

- `route-map` 这块在 `390px` 下仍有少量但真实的卡片壳体收口空间
- 这轮收益来自共享样式层 very small pass，而不是继续重写数据或组件
- 当前 `/dashboard` 仍处于多个 section 高度非常接近的阶段，后续继续追时必须依赖 fresh baseline，而不能凭上轮印象

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/dashboard = 1793`
- `/daily-latin = 1780`
- `/dance-os = 1760`

下一轮应继续在 `/dashboard` 内，基于 fresh 数据重新确认最高 ROI section，再做下一刀最小 pass。
