# Dashboard Witness Archive Panel Third Padding Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1685`
- `/dance-os = 1688`

因此当前 broad mobile Top1 仍然是：

- `/dance-os = 1688`

但 `/dashboard` 只落后 `3px`，所以这一轮仍然先对最接近的候选做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dashboard-archive-panel-pad1`
  - `/dashboard: 1685 -> 1683`
  - `#dashboard-witness-archive: 142.84 -> 140.84`
- `dashboard-next-actions-gap1`
  - `/dashboard: 1685 -> 1684`
  - `#dashboard-next-actions: 136.53 -> 135.53`
- `dance-assets-head-mbneg1`
  - `/dance-os: 1688 -> 1687`
  - `#dance-assets: 305.56 -> 304.56`
- `dance-sources-title-mbneg1`
  - `/dance-os: 1688 -> 1687`
  - `#dance-sources: 120.34 -> 119.34`

这一轮优先选择 ROI 最高且仍然属于稳定壳层压缩的一刀：

- `.dashboard-page #dashboard-witness-archive .archive-panel`
- `padding: 1px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-witness-archive .archive-panel`
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
  - `1685 -> 1683`
- `#dashboard-witness-archive`
  - `142.84 -> 140.84`
- `#dashboard-structure-bar`
  - `143.19 -> 143.19`
- `#dashboard-next-actions`
  - `136.53 -> 136.53`
- `#dashboard-route-map`
  - `124.59 -> 124.59`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1683`
- `/dance-os = 1688`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dashboard` 从 `1685` 下降到 `1683`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1688`

因此下一轮应回到 `/dance-os`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
