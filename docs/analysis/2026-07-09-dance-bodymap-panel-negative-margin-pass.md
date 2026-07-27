# Dance Body Map Panel Negative Margin Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1671`
- `/dance-os = 1677`

因此当前 broad mobile Top1 是：

- `/dance-os = 1677`

这一轮先对 `/dance-os` 与 `/daily-latin` 的最小候选做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dance-sources-title-mbneg4`
  - `/dance-os: 1677 -> 1676`
  - `#dance-sources: 117.34 -> 116.34`
- `dance-assets-head-mbneg9`
  - `/dance-os: 1677 -> 1676`
  - `#dance-assets: 297.56 -> 296.56`
- `bodymap-panel-neg1`
  - `/dance-os: 1677 -> 1676`
  - `#body-map-practice-queue: 279.55 -> 278.55`
- `bodymap-panel-neg2`
  - `/dance-os: 1677 -> 1675`
  - `#body-map-practice-queue: 280.55 -> 278.55`
- `daily-today-shell-pad2`
  - `/daily-latin: 1672 -> 1670`
  - `#today-loop-demo: 240.5 -> 238.5`
- `daily-library-min28`
  - `/daily-latin: 1672 -> 1670`
  - `#daily-library: 117.53 -> 115.53`
- `daily-sources-title-mbneg2`
  - `/daily-latin: 1672 -> 1671`
  - `#daily-sources: 121.06 -> 120.06`

这一轮优先继续处理当前 broad mobile Top1 上收益最高的一刀：

- `.dance-os-page #body-map-practice-queue .compact-bodymap-panel`
- `margin-top: -2px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #body-map-practice-queue .compact-bodymap-panel`
- 收成：
  - `margin-top: -2px`

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

- `/dance-os`
  - `1677 -> 1675`
- `#body-map-practice-queue`
  - `280.55 -> 278.55`
- `#correction-ledger-demo`
  - `327.94 -> 327.94`
- `#dance-assets`
  - `297.56 -> 297.56`
- `#dance-summary`
  - `135.75 -> 135.75`
- `#dance-sources`
  - `117.34 -> 117.34`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1671`
- `/dance-os = 1675`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dance-os` 从 `1677` 下降到 `1675`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1675`

因此下一轮应继续优先回到 `/dance-os`，并与 `/daily-latin` 的高收益候选一起做 fresh runtime preflight，再选最小且稳定的 single-point pass。
