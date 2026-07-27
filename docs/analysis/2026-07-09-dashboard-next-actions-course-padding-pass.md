# Dashboard Next Actions Course Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1711`
- `/dashboard = 1710`
- `/dance-os = 1702`

这意味着当前 broad mobile Top1 虽然还是：

- `/daily-latin = 1711`

但 `/dashboard = 1710` 已经只差 `1px`，随时可能重新成为最厚 route。

fresh 拆 `/dashboard` 后，当前主要 section 是：

- `#dashboard-structure-bar = 147.19`
- `#dashboard-witness-archive = 144.84`
- `#dashboard-next-actions = 143.53`
- `#dashboard-route-map = 136.59`
- `#dashboard-metrics = 135.03`
- `#dashboard-guardrails = 125.56`

因此这一轮先不直接改文件，而是先做 very small runtime preflight。

## preflight

基线：

- route:
  - `/dashboard = 1710`
- sections:
  - `#dashboard-structure-bar = 147.19`
  - `#dashboard-witness-archive = 144.84`
  - `#dashboard-next-actions = 143.53`

候选结果：

- `dashboard-archive-head-mb2`
  - `/dashboard: 1710 -> 1709`
  - `#dashboard-witness-archive: 144.84 -> 143.84`
- `dashboard-archive-panel-pad2`
  - `/dashboard: 1710 -> 1708`
  - `#dashboard-witness-archive: 144.84 -> 142.84`
- `dashboard-structure-pad10`
  - `/dashboard: 1710 -> 1708`
  - `#dashboard-structure-bar: 147.19 -> 145.19`
- `dashboard-next-course-pad3x6`
  - `/dashboard: 1710 -> 1706`
  - `#dashboard-next-actions: 143.53 -> 139.53`

因此这一轮选择 ROI 最高的一刀：

- `.dashboard-page #dashboard-next-actions .course-card`
- `padding -> 3px 6px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-next-actions .course-card`
- 收成：
  - `padding: 3px 6px`

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

- `/dashboard`
  - `1710 -> 1706`
- `#dashboard-next-actions`
  - `143.53 -> 139.53`
- `#dashboard-structure-bar`
  - `147.19 -> 147.19`
- `#dashboard-witness-archive`
  - `144.84 -> 144.84`
- `#dashboard-route-map`
  - `136.59 -> 136.59`
- `#dashboard-metrics`
  - `135.03 -> 135.03`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1711`
- `/dashboard = 1706`
- `/dance-os = 1702`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后 broad mobile Top1 仍然是：

- `/daily-latin = 1711`

但 `/dashboard` 已被继续压到：

- `/dashboard = 1706`

因此下一轮默认应切回 `/daily-latin`，继续 fresh 拆它的最厚 section。
