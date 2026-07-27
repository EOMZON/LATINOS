# Dance Body Map Panel Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1728`

因此当前 broad mobile Top1 已经回到：

- `/dance-os = 1728`

重新拆 `/dance-os` 后，当前最厚的两块是：

- `#correction-ledger-demo = 335.94`
- `#body-map-practice-queue = 292.55`

这一轮先不直接改文件，而是先做 runtime preflight，只在 `/dance-os` 范围内测试几组 very small CSS 候选。

## preflight

基线：

- route:
  - `/dance-os = 1728`
- sections:
  - `#correction-ledger-demo = 335.94`
  - `#body-map-practice-queue = 292.55`

候选结果：

- `ledger-output-pad-1`
  - `/dance-os: 1728 -> 1727`
  - `#correction-ledger-demo: 335.94 -> 334.08`
- `check-item-pad-1`
  - 无收益
- `bodymap-summary-pad-8`
  - 无收益
- `practice-card-pad-3`
  - 无收益
- `practice-list-gap-2`
  - 无收益
- `bodymap-panel-pad-3`
  - `/dance-os: 1728 -> 1726`
  - `#body-map-practice-queue: 292.55 -> 290.55`

因此这一轮选择收益最高、同时最局部的一刀：

- `.dance-os-page #body-map-practice-queue .compact-bodymap-panel`
- `padding: 4px -> 3px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在现有 `390-430px` late override 区段里
- 将：
  - `.dance-os-page #body-map-practice-queue .compact-bodymap-panel{padding:4px}`
- 收成：
  - `.dance-os-page #body-map-practice-queue .compact-bodymap-panel{padding:3px}`

## 验证链

按既定顺序完成：

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
  - `1728 -> 1726`
- `#body-map-practice-queue`
  - `292.55 -> 290.55`
- `#correction-ledger-demo`
  - `335.94 -> 335.94`

这说明这轮 pass 满足成立条件：

- route 总高下降
- 目标 section 高度下降

## 结论

这是一轮成立的 `/dance-os` single-point pass。

当前 fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1726`

当前 broad mobile Top1 仍然是：

- `/dance-os = 1726`

这也说明目前 `/dance-os` 继续适合沿着：

- body map / practice queue
- correction ledger

这两块做 very small 逐刀收口，而不需要大改结构。
