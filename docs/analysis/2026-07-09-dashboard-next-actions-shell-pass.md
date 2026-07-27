# Dashboard Next Actions Shell Pass

## 背景

在 `Dashboard Guardrails Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1785`
- `/dance-os = 1760`

这意味着 broad mobile Top1 仍然是：

- `/dashboard = 1785`

继续拆 `/dashboard` 后，当前几块更厚的 section 已经非常接近：

- `#dashboard-witness-archive = 152.84`
- `#dashboard-route-map = 152.59`
- `#dashboard-guardrails = 152.56`
- `#dashboard-next-actions = 152.53`
- `#dashboard-metrics = 150.03`

`next-actions` 这块此前已经做过 compact copy，当前更像是：

- 数据层已经尽量压短
- 卡片壳体 still a bit too thick

运行时继续确认：

- `#dashboard-next-actions = 152.53`
- `grid = 128.34`
- `card = 60.67`
- 当前最终生效的 `390px` 命中是：
  - `.dashboard-page .course-card { padding: 6px 8px }`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page .course-card`

做 very small pass：

- `padding: 6px 8px -> 5px 7px`

这轮没有去碰：

- `dashboardActionCards` 数据
- `CourseCard` 组件逻辑
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
- `/dashboard = 1781`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1785 -> 1781`
- `#dashboard-next-actions`
  - `152.53 -> 148.53`

其余关键 section 保持：

- `#dashboard-witness-archive = 152.84`
- `#dashboard-route-map = 152.59`
- `#dashboard-guardrails = 152.56`
- `#dashboard-metrics = 150.03`
- `#dashboard-structure-bar = 147.19`

## 这轮成立的结论

- `next-actions` 这块在 `390px` 下仍有明确的卡片壳体收口空间
- 在 compact copy 已经接入的前提下，继续走共享样式层 very small pass 仍然有效
- `/dashboard` 与 `/daily-latin` 的 broad mobile 总高已经压到只差 `1px`，说明当前 route-level 优化已进入 very small finish 阶段

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/dashboard = 1781`
- `/daily-latin = 1780`
- `/dance-os = 1760`

下一轮应基于 fresh 数据重新确认是继续追 `/dashboard`，还是切回 `/daily-latin`。
