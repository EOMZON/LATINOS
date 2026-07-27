# Dashboard Route Map Third Card Padding Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1764`
- `/dashboard = 1766`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是：

- `/dashboard = 1766`

继续拆 `/dashboard` 后，当前 section 高度主要是：

- `#dashboard-route-map = 148.59`
- `#dashboard-witness-archive = 148.84`
- `#dashboard-next-actions = 147.53`
- `#dashboard-metrics = 147.03`

进一步做运行时拆解后确认：

- `#dashboard-route-map = 148.59`
- `card = 61.2`
- `cardScroll = 59`
- 当前真正命中的 `390px` block 内：
  - `.dashboard-page #dashboard-route-map .route-card { padding: 4px }`

说明这块仍有一档 very small 但直接的 card shell 收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-route-map .route-card`

做 very small pass：

- `padding: 4px -> 3px`

这轮没有去碰：

- `RouteSignalCard` 组件逻辑
- route row / head 文案
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
- `/daily-latin = 1764`
- `/dashboard = 1762`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1766 -> 1762`
- `#dashboard-route-map`
  - `148.59 -> 144.59`

运行时再次确认：

- `.dashboard-page #dashboard-route-map .route-card`
  - `padding = 3px`
  - `card height = 59.20`
  - `card scrollHeight = 57`

## 这轮成立的结论

- `dashboard route-map` 在 `390px` 下还有一档稳定成立的 third card padding 收口空间
- 这轮收益来自命中真正最终生效的 `route-map` media block，而不是去改其他 section
- 这轮后 broad mobile Top1 已切回：
  - `/daily-latin = 1764`

下一轮应继续 fresh 基线后，回到 `/daily-latin`，优先重新确认 `today-loop-demo / daily-sources / live-return-bridge` 的剩余 ROI。
