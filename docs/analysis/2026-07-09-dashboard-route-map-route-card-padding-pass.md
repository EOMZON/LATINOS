# Dashboard Route Map Route Card Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1707`
- `/dashboard = 1706`
- `/dance-os = 1702`

这意味着当前 broad mobile Top1 仍然是：

- `/daily-latin = 1707`

但 `/dashboard = 1706` 只差 `1px`，因此这一轮先重新 fresh 对比 `/daily-latin` 与 `/dashboard`，再决定把 single-point pass 落在哪一边。

fresh 拆解后：

- `/daily-latin`
  - `#today-loop-demo = 246.50`
  - `#live-return-bridge = 140.14`
  - `#daily-overview = 129.06`
  - `#daily-sources = 125.06`
  - `#daily-library = 121.53`
- `/dashboard`
  - `#dashboard-structure-bar = 147.19`
  - `#dashboard-witness-archive = 144.84`
  - `#dashboard-next-actions = 139.53`
  - `#dashboard-route-map = 136.59`
  - `#dashboard-metrics = 135.03`

## preflight

### `/daily-latin` 候选

- `daily-library-min30`
  - `/daily-latin: 1707 -> 1705`
  - `#daily-library: 121.53 -> 119.53`
- `daily-live-btn-pad1x5`
  - `/daily-latin: 1707 -> 1705`
  - `#live-return-bridge: 140.14 -> 138.14`
- `daily-legacy-head-mb4`
  - 只有 `-1px`
- `today-loop-sechead-mb2`
  - 只有 `-1px`

### `/dashboard` 候选

- `dashboard-archive-head-mb2`
  - `/dashboard: 1706 -> 1705`
  - `#dashboard-witness-archive: 144.84 -> 143.84`
- `dashboard-archive-panel-pad2`
  - `/dashboard: 1706 -> 1704`
  - `#dashboard-witness-archive: 144.84 -> 142.84`
- `dashboard-structure-pad10`
  - `/dashboard: 1706 -> 1704`
  - `#dashboard-structure-bar: 147.19 -> 145.19`
- `dashboard-route-card-pad2`
  - `/dashboard: 1706 -> 1702`
  - `#dashboard-route-map: 136.59 -> 132.59`

因此这一轮选择 ROI 最高的一刀：

- `.dashboard-page #dashboard-route-map .route-card`
- `padding: 2px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-route-map .route-card`
- 收成：
  - `padding: 2px`

## 验证链

按既定串行顺序完成：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

结果：

- `typecheck`: pass
- `build`: pass
- `route smoke`: pass
- `browser smoke`: pass
- mobile overflow:
  - `home`: no overflow
  - `daily-latin`: no overflow

## 量化结果

fresh `390px` remeasure：

- `/dashboard`
  - `1706 -> 1702`
- `#dashboard-route-map`
  - `136.59 -> 132.59`
- `#dashboard-structure-bar`
  - `147.19 -> 147.19`
- `#dashboard-witness-archive`
  - `144.84 -> 144.84`
- `#dashboard-next-actions`
  - `139.53 -> 139.53`
- `#dashboard-metrics`
  - `135.03 -> 135.03`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1707`
- `/dashboard = 1702`
- `/dance-os = 1702`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后 broad mobile Top1 仍然是：

- `/daily-latin = 1707`

而第二名变成并列：

- `/dashboard = 1702`
- `/dance-os = 1702`

因此下一轮如果继续沿着同一主线推进，默认应切回 `/daily-latin`，但也要同时警惕 `/dance-os` 已经追到并列第二。
