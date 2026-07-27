# Daily Sources Panel Gap Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1716`
- `/dashboard = 1710`
- `/dance-os = 1713`

因此当前 broad mobile Top1 仍然是：

- `/daily-latin = 1716`

重新拆 `/daily-latin` 后，当前主要 section 是：

- `#today-loop-demo = 246.50`
- `#live-return-bridge = 143.14`
- `#daily-overview = 131.06`
- `#daily-sources = 129.06`
- `#legacy-daily-principles = 125.02`
- `#daily-library = 121.53`

这一轮继续只在 `today-loop-demo / live-return-bridge / daily-sources` 范围里做 very small runtime preflight。

## preflight

基线：

- route:
  - `/daily-latin = 1716`
- sections:
  - `#today-loop-demo = 246.50`
  - `#daily-overview = 131.06`
  - `#daily-sources = 129.06`

候选结果：

- `today-resultgrid-gap0-mt2`
  - 无收益
- `today-ledgercard3-pad3`
  - 无收益
- `today-tasktoggle-pad2x4`
  - 无收益
- `today-choicebtn-min29`
  - 明显变差
- `today-choicegrid-gap2-mt3`
  - 变差
- `daily-overview-sechead-mb5`
  - 无收益
- `daily-sources-list-gap2`
  - 无收益
- `daily-sources-panel-gap2-mb4`
  - `/daily-latin: 1716 -> 1714`
  - `#daily-sources: 129.06 -> 127.06`

因此这一轮选择唯一成立且 ROI 最高的一刀：

- `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel`
- `gap: 3px -> 2px`
- `margin-bottom: 5px -> 4px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel`
  - `gap: 3px`
  - `margin-bottom: 5px`
- 收成：
  - `gap: 2px`
  - `margin-bottom: 4px`

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
  - `1716 -> 1714`
- `#daily-sources`
  - `129.06 -> 127.06`
- `#today-loop-demo`
  - `246.50 -> 246.50`
- `#live-return-bridge`
  - `143.14 -> 143.14`
- `#daily-overview`
  - `131.06 -> 131.06`
- `#daily-library`
  - `121.53 -> 121.53`

这说明这轮 pass 满足成立条件：

- route 总高下降
- 目标 section 高度下降

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

当前 fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1714`
- `/dashboard = 1710`
- `/dance-os = 1713`

当前 broad mobile Top1 仍然是：

- `/daily-latin = 1714`
