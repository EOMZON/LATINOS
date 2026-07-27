# Dance Body Map Panel Second Padding Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1700`
- `/dance-os = 1702`

因此当前 broad mobile Top1 是：

- `/dance-os = 1702`

fresh 拆 `/dance-os` 后，当前主要 section 是：

- `#correction-ledger-demo = 331.08`
- `#body-map-practice-queue = 286.55`
- `#dance-assets = 307.56`
- `#dance-summary = 135.75`
- `#dance-sources = 123.34`

## preflight

这一轮没有直接盲改，而是先对 `dance / dashboard` 的 remaining very small 候选做 runtime 预演。

候选结果：

- `dance-bodymap-panel-pad2`
  - `/dance-os: 1702 -> 1700`
  - `#body-map-practice-queue: 286.55 -> 284.55`
- `dance-sources-title-mb2`
  - `/dance-os: 1702 -> 1701`
  - `#dance-sources: 123.34 -> 122.34`
- `dashboard-archive-panel-pad2`
  - `/dashboard: 1700 -> 1698`
  - `#dashboard-witness-archive: 144.84 -> 142.84`
- `dashboard-witness-summary-pad2`
  - 无收益

对于当前 broad mobile Top1 `/dance-os`，ROI 最高且最稳的一刀仍然是：

- `.dance-os-page #body-map-practice-queue .compact-bodymap-panel`
- `padding: 2px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #body-map-practice-queue .compact-bodymap-panel`
- 收成：
  - `padding: 2px`

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
  - `1702 -> 1700`
- `#body-map-practice-queue`
  - `286.55 -> 284.55`
- `#correction-ledger-demo`
  - `331.08 -> 331.08`
- `#dance-assets`
  - `307.56 -> 307.56`
- `#dance-summary`
  - `135.75 -> 135.75`
- `#dance-sources`
  - `123.34 -> 123.34`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1700`
- `/dance-os = 1700`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/daily-latin` 继续保持最低：
  - `1685`
- broad mobile Top1 进入并列：
  - `/dashboard = 1700`
  - `/dance-os = 1700`

因此下一轮应优先对：

- `/dashboard`
- `/dance-os`

继续做 fresh runtime preflight，然后选 ROI 更高的一刀，不要靠静态猜测。
