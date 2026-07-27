# Dashboard Guardrails Shell Pass

## 背景

在 `Dashboard Metrics Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1787`
- `/dance-os = 1760`

这意味着 broad mobile Top1 仍然是：

- `/dashboard = 1787`

继续拆 `/dashboard` 后，当前更厚的 section 是：

- `#dashboard-guardrails = 154.56`
- `#dashboard-witness-archive = 152.84`
- `#dashboard-route-map = 152.59`
- `#dashboard-next-actions = 152.53`

进一步做运行时拆解后确认：

- `#dashboard-guardrails = 154.56`
- `matrix = 130.38`
- `panel = 54.19`
- `title = 16`
- `list = 34.19`
- `row = 15.59`
- 当前最终生效的 `390px` 命中是：
  - `.compact-source-matrix { padding: 7px; gap: 6px }`
  - `.source-list { gap: 3px }`
  - `.source-row { padding: 3px 4px }`

说明这块当前更适合继续追：

- `matrix` 外层 padding very small pass

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-guardrails .compact-source-matrix`

做 very small pass：

- `padding: 7px -> 6px`

这轮没有去碰：

- `SourceMatrix` 组件结构
- `dashboardSourceLeft / dashboardSourceRight` 数据
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
- `/daily-latin = 1780`
- `/dashboard = 1785`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1787 -> 1785`
- `#dashboard-guardrails`
  - `154.56 -> 152.56`

其余关键 section 保持：

- `#dashboard-witness-archive = 152.84`
- `#dashboard-route-map = 152.59`
- `#dashboard-next-actions = 152.53`
- `#dashboard-metrics = 150.03`
- `#dashboard-structure-bar = 147.19`

## 这轮成立的结论

- `guardrails` 这块在 `390px` 下仍有 very small 的 matrix 壳体收口空间
- 收益虽然很小，但 route-level 和 section-level 都真实下降
- 当前 `/dashboard` 已进入多个 section 高度几乎并列的 very small pass 阶段，后续每一轮都必须依赖 fresh runtime baseline

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/dashboard = 1785`
- `/daily-latin = 1780`
- `/dance-os = 1760`

下一轮应基于 fresh 数据重新确认 `witness-archive / route-map / next-actions` 哪一块是新的最高 ROI。
