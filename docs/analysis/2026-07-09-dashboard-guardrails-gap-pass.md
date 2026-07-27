# Dashboard Guardrails Gap Pass

## 背景

在 `Daily Library Second Card Min-Height Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1772`
- `/dashboard = 1775`
- `/dance-os = 1760`

这意味着 broad mobile Top1 仍然是：

- `/dashboard = 1775`

继续拆 `/dashboard` 后，当前更厚的 section 是：

- `#dashboard-guardrails = 152.56`
- `#dashboard-witness-archive = 150.84`
- `#dashboard-metrics = 150.03`
- `#dashboard-route-map = 148.59`

进一步做运行时拆解后确认：

- `#dashboard-guardrails = 152.56`
- `matrixPadding = 6px`
- `rowPadding = 3px 4px`
- `matrixGap = 6px`

说明在前一轮外层 padding 收口后，这块当前最直接的 very small 控制杆是：

- `compact-source-matrix` 的 `gap`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-guardrails .compact-source-matrix`

做 very small pass：

- `gap: 6px -> 5px`

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
- `/daily-latin = 1772`
- `/dashboard = 1774`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1775 -> 1774`
- `#dashboard-guardrails`
  - `152.56 -> 151.56`

其余关键 section 保持：

- `#dashboard-witness-archive = 150.84`
- `#dashboard-metrics = 150.03`
- `#dashboard-route-map = 148.59`
- `#dashboard-next-actions = 148.53`

## 这轮成立的结论

- `guardrails` 在 `390px` 下仍有一层 very small 的 matrix gap 收口空间
- 这类 pass 依然适合继续优先走共享样式层，不需要改数据或组件
- `/dashboard` 与 `/daily-latin` 现在只差 `2px`

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/dashboard = 1774`
- `/daily-latin = 1772`
- `/dance-os = 1760`

下一轮应继续基于 fresh 数据，重新判断是再追 `/dashboard` 的并列高 section，还是切回 `/daily-latin`。
