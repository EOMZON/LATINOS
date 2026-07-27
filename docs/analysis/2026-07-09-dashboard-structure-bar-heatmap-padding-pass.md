# Dashboard Structure Bar Heatmap Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1703`
- `/dashboard = 1702`
- `/dance-os = 1702`

这意味着当前 broad mobile Top1 仍然是：

- `/daily-latin = 1703`

但 `/dashboard` 与 `/dance-os` 已经并列第二，因此这一轮先重新 fresh 对比三条 route，再决定 single-point pass 落在哪一边。

fresh 拆解后：

- `/daily-latin`
  - `#today-loop-demo = 246.50`
  - `#live-return-bridge = 138.14`
  - `#daily-overview = 129.06`
  - `#daily-sources = 125.06`
  - `#daily-library = 119.53`
- `/dashboard`
  - `#dashboard-structure-bar = 147.19`
  - `#dashboard-witness-archive = 144.84`
  - `#dashboard-next-actions = 139.53`
  - `#dashboard-route-map = 132.59`
  - `#dashboard-metrics = 135.03`
- `/dance-os`
  - `#correction-ledger-demo = 331.08`
  - `#body-map-practice-queue = 286.55`
  - `#dance-summary = 135.75`
  - `#dance-assets = 307.56`
  - `#dance-sources = 123.34`

## preflight

### `/daily-latin` 候选

- `daily-legacy-head-mb4`
  - 只有 `-1px`
- `today-loop-sechead-mb2`
  - 只有 `-1px`

### `/dashboard` 候选

- `dashboard-archive-panel-pad2`
  - `/dashboard: 1702 -> 1700`
  - `#dashboard-witness-archive: 144.84 -> 142.84`
- `dashboard-structure-pad10`
  - `/dashboard: 1702 -> 1700`
  - `#dashboard-structure-bar: 147.19 -> 145.19`

### `/dance-os` 候选

- `dance-bodymap-panel-pad2`
  - `/dance-os: 1702 -> 1700`
  - `#body-map-practice-queue: 286.55 -> 284.55`
- `dance-sources-title-mb2`
  - `/dance-os: 1702 -> 1700`
  - `#dance-sources: 123.34 -> 121.34`
- `dance-assets-sechead-mb1`
  - 只有 `-1px`
- `dance-summary-sechead-mb2`
  - 无收益

这一轮最终选择：

- `.dashboard-page #dashboard-structure-bar .heatmap-card`
- `padding: 10px 10px 11px`

原因：

- route 与目标 section 同时下降
- 只动一个静态壳体，不碰交互区
- 相比 archive 和 dance 侧候选，这刀的结构风险最低

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-structure-bar .heatmap-card`
- 收成：
  - `padding: 10px 10px 11px`

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
  - `1702 -> 1700`
- `#dashboard-structure-bar`
  - `147.19 -> 145.19`
- `#dashboard-witness-archive`
  - `144.84 -> 144.84`
- `#dashboard-next-actions`
  - `139.53 -> 139.53`
- `#dashboard-route-map`
  - `132.59 -> 132.59`
- `#dashboard-metrics`
  - `135.03 -> 135.03`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1703`
- `/dashboard = 1700`
- `/dance-os = 1702`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后 broad mobile Top1 仍然是：

- `/daily-latin = 1703`

而第二名变成：

- `/dashboard = 1700`

因此下一轮如果继续沿着同一主线推进，默认仍应先 fresh 对比 `/daily-latin` 与 `/dashboard`，并继续警惕 `/dance-os = 1702`。
