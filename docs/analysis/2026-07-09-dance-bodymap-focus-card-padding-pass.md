# Dance Body Map Focus Card Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1725`

因此当前 broad mobile Top1 仍然是：

- `/dance-os = 1725`

重新拆 `/dance-os` 后，当前两块核心 section 仍然是：

- `#correction-ledger-demo = 334.08`
- `#body-map-practice-queue = 290.55`

前一轮已经证明 `Correction Ledger` 内部继续往下压的空间开始变小，于是这一轮切回 `Body Map / Practice Queue`，继续只做 very small runtime preflight。

## preflight

基线：

- route:
  - `/dance-os = 1725`
- sections:
  - `#correction-ledger-demo = 334.08`
  - `#body-map-practice-queue = 290.55`

### 先排除一组无收益候选

- `bodymap-grid-gap-3`
  - 无收益
- `practice-panel-pad-2`
  - 无收益

### 成立候选

- `bodymap-panel-pad-2`
  - `/dance-os: 1725 -> 1723`
  - `#body-map-practice-queue: 290.55 -> 288.55`
- `focus-list-gap-2`
  - `/dance-os: 1725 -> 1723`
  - `#body-map-practice-queue: 290.55 -> 288.55`
- `bodymap-copy-tight`
  - `/dance-os: 1725 -> 1723`
  - `#body-map-practice-queue: 290.55 -> 289.00`
- `focus-card-pad-2`
  - `/dance-os: 1725 -> 1721`
  - `#body-map-practice-queue: 290.55 -> 286.55`

因此这一轮选择收益最大、同时仍然足够局部的一刀：

- `.dance-os-page #body-map-practice-queue .compact-bodymap-focus-card`
- `padding: 3px -> 2px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在现有 `390-430px` late override 区段里
- 将：
  - `.dance-os-page #body-map-practice-queue .compact-bodymap-focus-card{padding:3px}`
- 收成：
  - `.dance-os-page #body-map-practice-queue .compact-bodymap-focus-card{padding:2px}`

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
  - `1725 -> 1721`
- `#body-map-practice-queue`
  - `290.55 -> 286.55`
- `#correction-ledger-demo`
  - `334.08 -> 334.08`

这说明这轮 pass 满足成立条件：

- route 总高下降
- 目标 section 高度下降

## 结论

这是一轮成立的 `/dance-os` single-point pass。

当前 fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1721`

当前 broad mobile Top1 仍然是：

- `/dance-os = 1721`

这也说明在当前空 witness 状态下，`Body Map / Practice Queue` 继续比 `Correction Ledger` 更有局部压缩空间。
