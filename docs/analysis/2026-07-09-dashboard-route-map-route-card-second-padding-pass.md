# Dashboard Route Map Route Card Second Padding Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1698`
- `/dance-os = 1699`

因此当前 broad mobile Top1 是：

- `/dance-os = 1699`

但 `/dashboard` 只落后 `1px`，所以这一轮先对两条最接近的 route 做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dashboard-route-card-pad1`
  - `/dashboard: 1698 -> 1694`
  - `#dashboard-route-map: 132.59 -> 128.59`
- `dashboard-archive-panel-pad1`
  - `/dashboard: 1698 -> 1696`
  - `#dashboard-witness-archive: 142.84 -> 140.84`
- `dance-sources-title-mb1`
  - `/dance-os: 1699 -> 1697`
  - `#dance-sources: 123.34 -> 121.34`
- `dance-correction-output-pad0`
  - `/dance-os: 1699 -> 1697`
  - `#correction-ledger-demo: 329.94 -> 327.94`
- `dance-bodymap-panel-pad1`
  - `/dance-os: 1699 -> 1697`
  - `#body-map-practice-queue: 284.55 -> 282.55`

在当前候选里，ROI 最高且最清晰的一刀来自 `/dashboard`：

- `.dashboard-page #dashboard-route-map .route-card`
- `padding: 1px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-route-map .route-card`
- 收成：
  - `padding: 1px`

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
  - `1698 -> 1694`
- `#dashboard-route-map`
  - `132.59 -> 128.59`
- `#dashboard-structure-bar`
  - `145.19 -> 145.19`
- `#dashboard-witness-archive`
  - `142.84 -> 142.84`
- `#dashboard-next-actions`
  - `139.53 -> 139.53`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1694`
- `/dance-os = 1699`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dashboard` 从 `1698` 下降到 `1694`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1699`

因此下一轮应回到 `/dance-os`，继续对：

- `#correction-ledger-demo`
- `#body-map-practice-queue`
- `#dance-sources`

做 fresh runtime preflight，再选最小且稳定的 single-point pass。
