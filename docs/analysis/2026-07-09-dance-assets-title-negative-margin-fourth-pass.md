# Dance Assets Title Negative Margin Fourth Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1675`
- `/dance-os = 1682`

因此当前 broad mobile Top1 是：

- `/dance-os = 1682`

这一轮先对 `/dance-os` 的最小候选做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dance-sources-title-mbneg3`
  - `/dance-os: 1682 -> 1681`
  - `#dance-sources: 118.34 -> 117.34`
- `dance-assets-head-mbneg5`
  - `/dance-os: 1682 -> 1681`
  - `#dance-assets: 301.56 -> 300.56`
- `dance-assets-head-mbneg6`
  - `/dance-os: 1682 -> 1680`
  - `#dance-assets: 301.56 -> 299.56`
- `dance-summary-head-mbneg1`
  - 无收益
- `bodymap-panel-neg1`
  - `/dance-os: 1682 -> 1681`
  - `#body-map-practice-queue: 280.55 -> 279.55`

这一轮优先选择当前 broad mobile Top1 上收益最高的一刀：

- `.dance-os-page #dance-assets .compact-sec-head`
- `margin-bottom: -6px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #dance-assets .compact-sec-head`
- 收成：
  - `margin-bottom: -6px`

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
  - `1682 -> 1680`
- `#dance-assets`
  - `301.56 -> 299.56`
- `#correction-ledger-demo`
  - `327.94 -> 327.94`
- `#body-map-practice-queue`
  - `280.55 -> 280.55`
- `#dance-summary`
  - `135.75 -> 135.75`
- `#dance-sources`
  - `118.34 -> 118.34`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1675`
- `/dance-os = 1680`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dance-os` 从 `1682` 下降到 `1680`
- 当前 broad mobile Top1 回到：
  - `/dashboard = 1675`

因此下一轮应优先回到 `/dashboard`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
