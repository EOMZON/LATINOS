# Dashboard Next Actions Gap Tight Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1690`
- `/dance-os = 1690`

因此当前 broad mobile Top1 进入并列：

- `/dashboard = 1690`
- `/dance-os = 1690`

## preflight

这一轮先对并列 Top1 做 fresh runtime preflight，而不是直接盲改。

候选结果：

- `dashboard-next-actions-gap2`
  - `/dashboard: 1690 -> 1687`
  - `#dashboard-next-actions: 139.53 -> 136.53`
- `dashboard-archive-panel-pad1`
  - `/dashboard: 1690 -> 1688`
  - `#dashboard-witness-archive: 142.84 -> 140.84`
- `dance-assets-head-mb1`
  - `/dance-os: 1690 -> 1689`
  - `#dance-assets: 307.56 -> 306.56`
- `dance-sources-title-mbneg1`
  - `/dance-os: 1690 -> 1689`
  - `#dance-sources: 120.34 -> 119.34`

从当前并列 Top1 里看，ROI 最高的一刀是：

- `.dashboard-page #dashboard-next-actions .course-grid`
- `gap: 2px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-next-actions .course-grid`
- 收成：
  - `gap: 2px`

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
  - `1690 -> 1687`
- `#dashboard-next-actions`
  - `139.53 -> 136.53`
- `#dashboard-structure-bar`
  - `145.19 -> 145.19`
- `#dashboard-witness-archive`
  - `142.84 -> 142.84`
- `#dashboard-route-map`
  - `124.59 -> 124.59`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1687`
- `/dance-os = 1690`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dashboard` 从 `1690` 下降到 `1687`
- 当前 broad mobile Top1 回到：
  - `/dance-os = 1690`

因此下一轮应回到 `/dance-os`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
