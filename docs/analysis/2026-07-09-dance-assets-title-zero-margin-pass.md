# Dance Assets Title Zero Margin Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1687`
- `/dance-os = 1690`

因此当前 broad mobile Top1 是：

- `/dance-os = 1690`

fresh 拆 `/dance-os` 后，当前主要 section 是：

- `#correction-ledger-demo = 327.94`
- `#body-map-practice-queue = 280.55`
- `#dance-assets = 307.56`
- `#dance-summary = 135.75`
- `#dance-sources = 120.34`

## preflight

这一轮继续先做 fresh runtime preflight，而不是直接盲改。

候选结果：

- `dance-assets-head-mb0`
  - `/dance-os: 1690 -> 1688`
  - `#dance-assets: 307.56 -> 305.56`
- `dance-assets-head-mb1`
  - `/dance-os: 1690 -> 1689`
  - `#dance-assets: 307.56 -> 306.56`
- `dance-sources-title-mbneg1`
  - `/dance-os: 1690 -> 1689`
  - `#dance-sources: 120.34 -> 119.34`
- `dashboard-archive-panel-pad1`
  - `/dashboard: 1687 -> 1685`
  - `#dashboard-witness-archive: 142.84 -> 140.84`
- `dashboard-next-actions-gap1`
  - `/dashboard: 1687 -> 1686`
  - `#dashboard-next-actions: 136.53 -> 135.53`

对当前 broad mobile Top1 `/dance-os`，ROI 最高的一刀是：

- `.dance-os-page #dance-assets .compact-sec-head`
- `margin-bottom: 0`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #dance-assets .compact-sec-head`
- 收成：
  - `margin-bottom: 0`

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
  - `1690 -> 1688`
- `#dance-assets`
  - `307.56 -> 305.56`
- `#correction-ledger-demo`
  - `327.94 -> 327.94`
- `#body-map-practice-queue`
  - `280.55 -> 280.55`
- `#dance-summary`
  - `135.75 -> 135.75`
- `#dance-sources`
  - `120.34 -> 120.34`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1687`
- `/dance-os = 1688`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dance-os` 从 `1690` 下降到 `1688`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1688`

但它与 `/dashboard = 1687` 只差 `1px`，因此下一轮应继续对：

- `/dance-os`
- `/dashboard`

做 fresh runtime preflight，再选 ROI 更高的一刀。
