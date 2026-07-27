# Dashboard Structure Bar Thirteenth Padding Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1666`
- `/dashboard = 1669`
- `/dance-os = 1670`

因此当前 broad mobile Top1 是：

- `/dance-os = 1670`

但 `/dashboard` 只落后 `1px`，所以这一轮先对 `/dance-os` 与 `/dashboard` 的最小候选做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dance-assets-head-mbneg13`
  - `/dance-os: 1670 -> 1669`
  - `#dance-assets: 293.56 -> 292.56`
- `dance-sources-title-mbneg5`
  - `/dance-os: 1670 -> 1669`
  - `#dance-sources: 116.34 -> 115.34`
- `bodymap-panel-neg3`
  - `/dance-os: 1670 -> 1669`
  - `#body-map-practice-queue: 278.55 -> 277.55`
- `dashboard-archive-panel-neg1`
  - `/dashboard: 1669 -> 1668`
  - `#dashboard-witness-archive: 137.84 -> 136.84`
- `dashboard-next-actions-gap1`
  - `/dashboard: 1669 -> 1668`
  - `#dashboard-next-actions: 136.53 -> 135.53`
- `dashboard-structure-pad5`
  - `/dashboard: 1669 -> 1667`
  - `#dashboard-structure-bar: 137.19 -> 135.19`

这一轮优先选择当前证据最强的壳层压缩：

- `.dashboard-page #dashboard-structure-bar .heatmap-card`
- `padding: 5px 5px 6px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-structure-bar .heatmap-card`
- 收成：
  - `padding: 5px 5px 6px`

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
  - `1669 -> 1667`
- `#dashboard-structure-bar`
  - `137.19 -> 135.19`
- `#dashboard-witness-archive`
  - `138.84 -> 138.84`
- `#dashboard-next-actions`
  - `136.53 -> 136.53`
- `#dashboard-route-map`
  - `118.59 -> 118.59`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1666`
- `/dashboard = 1667`
- `/dance-os = 1670`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dashboard` 从 `1669` 下降到 `1667`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1670`

因此下一轮应优先回到 `/dance-os`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
