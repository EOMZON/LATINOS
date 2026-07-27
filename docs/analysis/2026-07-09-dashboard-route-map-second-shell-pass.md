# Dashboard Route Map Second Shell Pass

## 背景

在 `Dashboard Next Actions Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1781`
- `/dance-os = 1760`

这意味着 broad mobile Top1 仍然是：

- `/dashboard = 1781`

继续拆 `/dashboard` 后，当时更厚的几块 section 是：

- `#dashboard-witness-archive = 152.84`
- `#dashboard-route-map = 152.59`
- `#dashboard-guardrails = 152.56`
- `#dashboard-next-actions = 148.53`

进一步做运行时拆解后确认：

- `#dashboard-route-map = 152.59`
- 每张 `route-card = 63.20`
- 当前最终生效的 `390px` 命中是：
  - `.dashboard-page #dashboard-route-map .route-card { padding: 5px }`

说明在前一轮 shell pass 之后，这块仍然存在 very small 的卡片壳体收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-route-map .route-card`

继续做第二轮 very small pass：

- `padding: 5px -> 4px`

这轮没有去碰：

- `dashboardRouteSignals` 数据
- `RouteSignalCard` 组件结构
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
- `/dashboard = 1777`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1781 -> 1777`
- `#dashboard-route-map`
  - `152.59 -> 148.59`

其余关键 section 保持：

- `#dashboard-witness-archive = 152.84`
- `#dashboard-guardrails = 152.56`
- `#dashboard-next-actions = 148.53`
- `#dashboard-metrics = 150.03`
- `#dashboard-structure-bar = 147.19`

## 这轮成立的结论

- `route-map` 这块在 `390px` 下仍然有第二轮 very small card shell 收口空间
- 这轮继续证明：在 compact copy 已经稳定后，继续从共享样式层 very small pass 往下压仍然有效
- 这轮收益足够让 `/dashboard` 低于 `/daily-latin`

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切回：

- `/daily-latin = 1780`
- `/dashboard = 1777`
- `/dance-os = 1760`

下一轮应回到 `/daily-latin`，基于 fresh 数据重新确认 `today-loop-demo / live-return-bridge / daily-library` 谁是新的最高 ROI。
