# Daily Legacy Principles Title Negative Margin Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1678`
- `/dashboard = 1677`
- `/dance-os = 1684`

因此当前 broad mobile Top1 是：

- `/dance-os = 1684`

但 `/daily-latin` 只落后 `6px`，所以这一轮先对 `/dance-os` 与 `/daily-latin` 的最小候选做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dance-assets-head-mbneg3`
  - `/dance-os: 1684 -> 1683`
  - `#dance-assets: 303.56 -> 302.56`
- `dance-summary-head-mbneg1`
  - 无收益
- `dance-sources-title-mbneg3`
  - `/dance-os: 1684 -> 1683`
  - `#dance-sources: 118.34 -> 117.34`
- `daily-today-shell-pad2`
  - `/daily-latin: 1678 -> 1676`
  - `#today-loop-demo: 240.5 -> 238.5`
- `daily-library-min28`
  - `/daily-latin: 1678 -> 1676`
  - `#daily-library: 117.53 -> 115.53`
- `daily-legacy-head-mbneg1`
  - `/daily-latin: 1678 -> 1672`
  - `#legacy-daily-principles: 125.02 -> 119.02`

这一轮优先选择当前收益最高、同时仍然属于 section head 收口的一刀：

- `.daily-latin-page #legacy-daily-principles .compact-sec-head`
- `margin-bottom: -1px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.daily-latin-page #legacy-daily-principles .compact-sec-head`
- 收成：
  - `margin-bottom: -1px`

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
  - `1678 -> 1672`
- `#legacy-daily-principles`
  - `125.02 -> 119.02`
- `#today-loop-demo`
  - `240.5 -> 240.5`
- `#live-return-bridge`
  - `138.14 -> 138.14`
- `#daily-overview`
  - `116.06 -> 116.06`
- `#daily-sources`
  - `121.06 -> 121.06`
- `#daily-library`
  - `117.53 -> 117.53`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1672`
- `/dashboard = 1677`
- `/dance-os = 1684`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/daily-latin` 从 `1678` 下降到 `1672`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1684`

因此下一轮应优先回到 `/dance-os`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
