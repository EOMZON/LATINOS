# Dance Sources Row Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1718`

因此当前 broad mobile Top1 是并列：

- `/daily-latin = 1718`
- `/dance-os = 1718`

fresh 拆解这两条并列 Top1 后：

- `/daily-latin`
  - `#today-loop-demo = 246.50`
  - `#live-return-bridge = 145.14`
  - `#daily-overview = 131.06`
  - `#daily-sources = 129.06`
  - `#daily-library = 121.53`
  - `#legacy-daily-principles = 125.02`
- `/dance-os`
  - `#correction-ledger-demo = 331.08`
  - `#body-map-practice-queue = 286.55`
  - `#dance-summary = 135.75`
  - `#dance-assets = 307.56`
  - `#dance-sources = 138.89`

这意味着虽然两条 route 总高并列，但 `/dance-os` 仍然更有局部压缩空间。

## preflight

### `/daily-latin` 候选

- `today-ledger-output-pad-1`
  - 无收益
- `today-linkrow-gap1-mt1`
  - 无收益
- `live-actions-gap-1`
  - 无收益
- `live-panel-pad-2`
  - `/daily-latin: 1718 -> 1716`
  - `#live-return-bridge: 145.14 -> 143.14`

### `/dance-os` 候选

- `assets-grid-gap-2`
  - 无收益，且 target 轻微变高
- `assets-asset-pad-3`
  - 无收益
- `dance-sources-row-pad-1`
  - `/dance-os: 1718 -> 1713`
  - `#dance-sources: 138.89 -> 134.41`
- `bodymap-panel-pad-1`
  - `/dance-os: 1718 -> 1714`
  - `#body-map-practice-queue: 286.55 -> 282.55`

因此这一轮选择 ROI 最高的一刀：

- `.dance-os-page #dance-sources .compact-source-matrix-panel .source-row`
- `padding: 2px -> 1px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #dance-sources .compact-source-matrix-panel .source-row`
  - `padding: 2px`
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
  - `1718 -> 1713`
- `#dance-sources`
  - `138.89 -> 134.41`
- `#correction-ledger-demo`
  - `331.08 -> 331.08`
- `#body-map-practice-queue`
  - `286.55 -> 286.55`

这说明这轮 pass 满足成立条件：

- route 总高下降
- 目标 section 高度下降

## 结论

这是一轮成立的 `/dance-os` single-point pass。

当前 fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1713`

新的 broad mobile Top1 切回：

- `/daily-latin = 1718`
