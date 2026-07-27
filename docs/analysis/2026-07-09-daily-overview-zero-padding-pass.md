# Daily Overview Zero Padding Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1681`
- `/dashboard = 1683`
- `/dance-os = 1686`

因此当前 broad mobile Top1 是：

- `/dance-os = 1686`

但 `/daily-latin` 只落后 `5px`，所以这一轮先对最接近的 route 做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dance-sources-title-mbneg2`
  - `/dance-os: 1686 -> 1684`
  - `#dance-sources: 120.34 -> 118.34`
- `dance-assets-head-mbneg3`
  - `/dance-os: 1686 -> 1685`
  - `#dance-assets: 303.56 -> 302.56`
- `dashboard-next-actions-gap1`
  - `/dashboard: 1683 -> 1682`
  - `#dashboard-next-actions: 136.53 -> 135.53`
- `dashboard-structure-pad8`
  - `/dashboard: 1683 -> 1681`
  - `#dashboard-structure-bar: 143.19 -> 141.19`
- `daily-overview-pad0`
  - `/daily-latin: 1681 -> 1678`
  - `#daily-overview: 119.06 -> 116.06`

这一轮优先选择当前收益最高、同时仍然属于单点内部 padding 收口的一刀：

- `.daily-latin-page #daily-overview .compact-detail-daily-top`
- `padding: 0`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.daily-latin-page #daily-overview .compact-detail-daily-top`
- 收成：
  - `padding: 0`

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

- `/daily-latin`
  - `1681 -> 1678`
- `#daily-overview`
  - `119.06 -> 116.06`
- `#today-loop-demo`
  - `240.5 -> 240.5`
- `#live-return-bridge`
  - `138.14 -> 138.14`
- `#daily-sources`
  - `121.06 -> 121.06`
- `#daily-library`
  - `117.53 -> 117.53`
- `#legacy-daily-principles`
  - `125.02 -> 125.02`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1678`
- `/dashboard = 1683`
- `/dance-os = 1686`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/daily-latin` 从 `1681` 下降到 `1678`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1686`

因此下一轮应回到 `/dance-os` 与 `/dashboard`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
