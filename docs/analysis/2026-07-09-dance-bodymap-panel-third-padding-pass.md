# Dance Body Map Panel Third Padding Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1694`
- `/dance-os = 1699`

因此当前 broad mobile Top1 是：

- `/dance-os = 1699`

fresh 拆 `/dance-os` 后，当前主要 section 是：

- `#correction-ledger-demo = 329.94`
- `#body-map-practice-queue = 284.55`
- `#dance-assets = 307.56`
- `#dance-summary = 135.75`
- `#dance-sources = 123.34`

## preflight

这一轮继续先做 fresh runtime preflight，而不是直接盲改。

候选结果：

- `dance-sources-title-mb1`
  - `/dance-os: 1699 -> 1697`
  - `#dance-sources: 123.34 -> 121.34`
- `dance-correction-output-pad0`
  - `/dance-os: 1699 -> 1697`
  - `#correction-ledger-demo: 329.94 -> 327.94`
- `dance-bodymap-panel-pad1`
  - `/dance-os: 1699 -> 1697`
  - `#body-map-practice-queue: 284.55 -> 282.55`
- `dance-summary-head-mb2`
  - 无收益

在这批都能带来 route `-2px` 的候选里，这一轮优先选择：

- `.dance-os-page #body-map-practice-queue .compact-bodymap-panel`
- `padding: 1px`

原因：

- 属于外壳级 single-point pass
- 同时压低 route 和目标 section
- 相比把核心内容区 `padding` 压到 `0`，可维护性更稳

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #body-map-practice-queue .compact-bodymap-panel`
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

- `/dance-os`
  - `1699 -> 1697`
- `#body-map-practice-queue`
  - `284.55 -> 282.55`
- `#correction-ledger-demo`
  - `329.94 -> 329.94`
- `#dance-assets`
  - `307.56 -> 307.56`
- `#dance-summary`
  - `135.75 -> 135.75`
- `#dance-sources`
  - `123.34 -> 123.34`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1694`
- `/dance-os = 1697`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dance-os` 从 `1699` 下降到 `1697`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1697`

但它与 `/dashboard = 1694` 只差 `3px`，因此下一轮应继续对：

- `/dance-os`
- `/dashboard`

做 fresh runtime preflight，再选 ROI 更高的一刀。
