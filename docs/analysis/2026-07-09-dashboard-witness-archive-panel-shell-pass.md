# Dashboard Witness Archive Panel Shell Pass

## 背景

在 `Daily Library Card Min-Height Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1776`
- `/dashboard = 1777`
- `/dance-os = 1760`

这意味着 broad mobile Top1 仍然是：

- `/dashboard = 1777`

继续拆 `/dashboard` 后，当前更厚的 section 是：

- `#dashboard-witness-archive = 152.84`
- `#dashboard-guardrails = 152.56`
- `#dashboard-metrics = 150.03`
- `#dashboard-route-map = 148.59`

进一步做运行时拆解后确认：

- `#dashboard-witness-archive = 152.84`
- `summaryCard = 37`
- `summaryPadding = 3px`
- `panelPadding = 4px`
- `itemPadding = 4px`

说明在前一轮 `summary-card` shell pass 成立之后，这块当前最值得追的是：

- `archive-panel` 外层 padding

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page .archive-panel`

做 very small pass：

- `padding: 4px -> 3px`

这轮没有去碰：

- `WitnessArchiveBoard` 组件逻辑
- archive 数据
- 其他 dashboard section

## 验证结果

这轮按既定串行链完整通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1776`
- `/dashboard = 1775`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1777 -> 1775`
- `#dashboard-witness-archive`
  - `152.84 -> 150.84`

其余关键 section 保持：

- `#dashboard-guardrails = 152.56`
- `#dashboard-metrics = 150.03`
- `#dashboard-route-map = 148.59`
- `#dashboard-next-actions = 148.53`

## 这轮成立的结论

- `witness-archive` 在 `390px` 下仍有一层 very small panel shell 收口空间
- `summary-card` 收完之后，继续收 `archive-panel` 外层 padding 仍然能带来真实收益
- 这轮收益足够让 `/dashboard` 低于 `/daily-latin`

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切回：

- `/daily-latin = 1776`
- `/dashboard = 1775`
- `/dance-os = 1760`

下一轮应回到 `/daily-latin`，基于 fresh 数据继续确认 `today-loop-demo / live-return-bridge / daily-library` 的最高 ROI。
