# Dance Sources Row Zero Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1713`
- `/dashboard = 1710`
- `/dance-os = 1713`

因此当前 broad mobile Top1 是并列：

- `/daily-latin = 1713`
- `/dance-os = 1713`

fresh 拆解这两条并列 Top1 后：

- `/daily-latin`
  - `#today-loop-demo = 246.50`
  - `#live-return-bridge = 142.14`
  - `#daily-overview = 131.06`
  - `#daily-sources = 127.06`
  - `#daily-library = 121.53`
  - `#legacy-daily-principles = 125.02`
- `/dance-os`
  - `#correction-ledger-demo = 331.08`
  - `#body-map-practice-queue = 286.55`
  - `#dance-summary = 135.75`
  - `#dance-assets = 307.56`
  - `#dance-sources = 134.41`

这意味着虽然 route 总高并列，但 `/dance-os` 依然有更强的局部压缩候选。

## preflight

### `/daily-latin` 候选

- `live-panel-pad-1`
  - `/daily-latin: 1713 -> 1711`
  - `#live-return-bridge: 142.14 -> 140.14`
- `live-note-pad2x3`
  - 无收益
- `overview-route-signal-pad2`
  - 无收益
- `overview-route-metric-pad2`
  - 无收益

### `/dance-os` 候选

- `bodymap-panel-pad-1`
  - `/dance-os: 1713 -> 1709`
  - `#body-map-practice-queue: 286.55 -> 282.55`
- `dance-sources-row-pad0`
  - `/dance-os: 1713 -> 1702`
  - `#dance-sources: 134.41 -> 123.34`
- `assets-title-mb1`
  - 无收益
- `assets-grid-gap-1`
  - 变差

因此这一轮选择 ROI 最高的一刀：

- `.dance-os-page #dance-sources .compact-source-matrix-panel .source-row`
- `padding: 1px -> 0`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾更晚的 `390-430px` override 中
- 将：
  - `.dance-os-page #dance-sources .compact-source-matrix-panel .source-row`
  - `padding: 1px`
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
  - `1713 -> 1702`
- `#dance-sources`
  - `134.41 -> 123.34`
- `#correction-ledger-demo`
  - `331.08 -> 331.08`
- `#body-map-practice-queue`
  - `286.55 -> 286.55`
- `#dance-summary`
  - `135.75 -> 135.75`
- `#dance-assets`
  - `307.56 -> 307.56`

这说明这轮 pass 满足成立条件：

- route 总高下降
- 目标 section 高度下降

## 结论

这是一轮成立的 `/dance-os` single-point pass。

当前 fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1713`
- `/dashboard = 1710`
- `/dance-os = 1702`

新的 broad mobile Top1 切回：

- `/daily-latin = 1713`
