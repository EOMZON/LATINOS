# Dance Correction Stack Choice Grid Margin Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1721`

因此当前 broad mobile Top1 仍然是：

- `/dance-os = 1721`

重新拆 `/dance-os` 后，当前两块核心 section 是：

- `#correction-ledger-demo = 334.08`
- `#body-map-practice-queue = 286.55`

上一轮已经证明：

- `Body Map / Practice Queue` 还能继续压
- 但当前最厚 section 重新回到了 `Correction Ledger`

因此这一轮切回 `Correction Ledger`，继续只做 very small runtime preflight。

## preflight

基线：

- route:
  - `/dance-os = 1721`
- target section:
  - `#correction-ledger-demo = 334.08`

候选结果：

- `ledger-grid-gap-4`
  - 无收益
- `ledger-stack-gap-1`
  - `/dance-os: 1721 -> 1719`
  - `#correction-ledger-demo: 334.08 -> 332.08`
- `result-grid-gap-2-mt3`
  - 无收益
- `stack-choicegrid-mt2`
  - `/dance-os: 1721 -> 1718`
  - `#correction-ledger-demo: 334.08 -> 331.08`
- `choice-btn-min33`
  - `/dance-os: 1721 -> 1719`
  - `#correction-ledger-demo: 334.08 -> 332.08`
- `choice-btn-compact-min27`
  - `/dance-os: 1721 -> 1719`
  - `#correction-ledger-demo: 334.08 -> 332.08`
- `checklist-gap-3`
  - `/dance-os: 1721 -> 1720`
  - `#correction-ledger-demo: 334.08 -> 333.08`
- `checkitem-strong-8_6`
  - `/dance-os: 1721 -> 1720`
  - `#correction-ledger-demo: 334.08 -> 333.45`

因此这一轮选择收益最大、同时仍然足够局部的一刀：

- `.dance-os-page .compact-ledger-shell .ledger-stack .choice-grid`
- `margin-top: 3px -> 2px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在当前 `390px` late compact rule 中
- 将：
  - `.dance-os-page .compact-ledger-shell .ledger-stack .choice-grid{margin-top:3px}`
- 收成：
  - `.dance-os-page .compact-ledger-shell .ledger-stack .choice-grid{margin-top:2px}`

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
  - `1721 -> 1718`
- `#correction-ledger-demo`
  - `334.08 -> 331.08`
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
- `/dance-os = 1718`

当前 broad mobile Top1 变成并列：

- `/daily-latin = 1718`
- `/dance-os = 1718`

这也说明当前 `/dance-os` 在 `Correction Ledger` 和 `Body Map / Practice Queue` 两块之间交替收口，仍然能拿到 very small 级别的稳定收益。
