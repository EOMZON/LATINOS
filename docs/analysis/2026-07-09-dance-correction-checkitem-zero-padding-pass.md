# Dance Correction Check Item Zero Padding Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1698`
- `/dance-os = 1700`

因此当前 broad mobile Top1 是：

- `/dance-os = 1700`

fresh 拆 `/dance-os` 后，当前主要 section 是：

- `#correction-ledger-demo = 331.08`
- `#body-map-practice-queue = 284.55`
- `#dance-assets = 307.56`
- `#dance-summary = 135.75`
- `#dance-sources = 123.34`

## preflight

这一轮继续先做 runtime preflight，而不是直接盲改。

候选结果：

- `dance-sources-title-mb2`
  - `/dance-os: 1700 -> 1699`
  - `#dance-sources: 123.34 -> 122.34`
- `dance-correction-check0`
  - `/dance-os: 1700 -> 1699`
  - `#correction-ledger-demo: 331.08 -> 329.94`
- `dance-sources-row-pad0`
  - 无收益
- `dance-assets-head-mb2`
  - 无收益
- `dance-summary-chips-hide`
  - 无收益
- `dance-correction-output-pad0`
  - 无收益

在两个都能带来 `-1px` route 收益的候选里，这一轮优先选择：

- `.dance-os-page #correction-ledger-demo .compact-ledger-shell .ledger-check-item`
- `padding: 0`

原因：

- 同时压低 route 和当前最大 section
- 不改路由、不改结构、不改交互逻辑
- 比继续追更小 section 的标题 margin 更符合“优先收当前最大块”的规则

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #correction-ledger-demo .compact-ledger-shell .ledger-check-item`
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

- `/dance-os`
  - `1700 -> 1699`
- `#correction-ledger-demo`
  - `331.08 -> 329.94`
- `#body-map-practice-queue`
  - `284.55 -> 284.55`
- `#dance-assets`
  - `307.56 -> 307.56`
- `#dance-summary`
  - `135.75 -> 135.75`
- `#dance-sources`
  - `123.34 -> 123.34`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1698`
- `/dance-os = 1699`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dance-os` 从 `1700` 下降到 `1699`
- 当前新的 broad mobile Top1 变成：
  - `/dance-os = 1699`

但它与 `/dashboard = 1698` 只差 `1px`，因此下一轮应继续对：

- `/dance-os`
- `/dashboard`

做 fresh runtime preflight，再选 ROI 更高的一刀，而不是静态猜测。
