# Dashboard Structure Bar Eleventh Padding Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1673`
- `/dance-os = 1680`

因此当前 broad mobile Top1 是：

- `/dance-os = 1680`

但 `/dashboard` 只落后 `7px`，所以这一轮先对 `/dashboard` 与 `/daily-latin` 的最小候选做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dashboard-archive-panel-pad0`
  - `/dashboard: 1673 -> 1671`
  - `#dashboard-witness-archive: 138.84 -> 136.84`
- `dashboard-next-actions-gap1`
  - `/dashboard: 1673 -> 1672`
  - `#dashboard-next-actions: 136.53 -> 135.53`
- `dashboard-structure-pad7`
  - `/dashboard: 1673 -> 1671`
  - `#dashboard-structure-bar: 141.19 -> 139.19`
- `daily-today-shell-pad2`
  - `/daily-latin: 1672 -> 1670`
  - `#today-loop-demo: 240.5 -> 238.5`
- `daily-library-min28`
  - `/daily-latin: 1672 -> 1670`
  - `#daily-library: 117.53 -> 115.53`

这一轮优先选择更稳的壳层压缩：

- `.dashboard-page #dashboard-structure-bar .heatmap-card`
- `padding: 7px 7px 8px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-structure-bar .heatmap-card`
- 收成：
  - `padding: 7px 7px 8px`

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
  - `1673 -> 1671`
- `#dashboard-structure-bar`
  - `141.19 -> 139.19`
- `#dashboard-witness-archive`
  - `138.84 -> 138.84`
- `#dashboard-next-actions`
  - `136.53 -> 136.53`
- `#dashboard-route-map`
  - `118.59 -> 118.59`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1671`
- `/dance-os = 1680`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dashboard` 从 `1673` 下降到 `1671`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1680`

因此下一轮应优先回到 `/dance-os`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
