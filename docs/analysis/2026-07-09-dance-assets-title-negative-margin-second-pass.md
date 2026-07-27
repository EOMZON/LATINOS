# Dance Assets Title Negative Margin Second Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1683`
- `/dance-os = 1688`

因此当前 broad mobile Top1 是：

- `/dance-os = 1688`

这一轮继续先做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dance-assets-head-mbneg1`
  - `/dance-os: 1688 -> 1687`
  - `#dance-assets: 305.56 -> 304.56`
- `dance-sources-title-mbneg1`
  - `/dance-os: 1688 -> 1687`
  - `#dance-sources: 120.34 -> 119.34`
- `dance-assets-head-mbneg2`
  - `/dance-os: 1688 -> 1686`
  - `#dance-assets: 305.56 -> 303.56`
- `dance-sources-title-mbneg2`
  - `/dance-os: 1688 -> 1686`
  - `#dance-sources: 120.34 -> 118.34`
- `dance-assets-grid-gap2`
  - 无收益
- `dance-correction-output-zero`
  - 无收益

这一轮优先选择仍然属于 section head 收口、但收益更高的一刀：

- `.dance-os-page #dance-assets .compact-sec-head`
- `margin-bottom: -2px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #dance-assets .compact-sec-head`
- 收成：
  - `margin-bottom: -2px`

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
  - `1688 -> 1686`
- `#dance-assets`
  - `305.56 -> 303.56`
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
- `/dashboard = 1683`
- `/dance-os = 1686`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dance-os` 从 `1688` 下降到 `1686`
- 当前 broad mobile Top1 切到：
  - `/daily-latin = 1685`

因此下一轮应对 `/daily-latin` 与 `/dance-os` 做 fresh runtime preflight，再选最小且稳定的 single-point pass。
