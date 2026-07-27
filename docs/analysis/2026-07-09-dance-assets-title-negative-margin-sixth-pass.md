# Dance Assets Title Negative Margin Sixth Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1671`
- `/dance-os = 1674`

因此当前 broad mobile Top1 是：

- `/dance-os = 1674`

这一轮先对 `/dance-os` 的最小候选做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dance-sources-title-mbneg5`
  - `/dance-os: 1674 -> 1673`
  - `#dance-sources: 116.34 -> 115.34`
- `dance-assets-head-mbneg9`
  - `/dance-os: 1674 -> 1673`
  - `#dance-assets: 297.56 -> 296.56`
- `dance-assets-head-mbneg10`
  - `/dance-os: 1674 -> 1672`
  - `#dance-assets: 297.56 -> 295.56`
- `bodymap-panel-neg3`
  - `/dance-os: 1674 -> 1673`
  - `#body-map-practice-queue: 278.55 -> 277.55`
- `bodymap-panel-neg4`
  - `/dance-os: 1674 -> 1672`
  - `#body-map-practice-queue: 278.55 -> 276.55`

这一轮优先继续处理当前 broad mobile Top1 上的 section head 收口：

- `.dance-os-page #dance-assets .compact-sec-head`
- `margin-bottom: -10px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #dance-assets .compact-sec-head`
- 收成：
  - `margin-bottom: -10px`

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
  - `1674 -> 1672`
- `#dance-assets`
  - `297.56 -> 295.56`
- `#correction-ledger-demo`
  - `327.94 -> 327.94`
- `#body-map-practice-queue`
  - `278.55 -> 278.55`
- `#dance-summary`
  - `135.75 -> 135.75`
- `#dance-sources`
  - `116.34 -> 116.34`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1671`
- `/dance-os = 1672`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dance-os` 从 `1674` 下降到 `1672`
- broad mobile Top1 进入并列：
  - `/daily-latin = 1672`
  - `/dance-os = 1672`

因此下一轮应对 `/daily-latin` 与 `/dance-os` 做 fresh runtime preflight，再选最小且稳定的 single-point pass。
