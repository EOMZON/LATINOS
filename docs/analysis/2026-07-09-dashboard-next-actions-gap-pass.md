# Dashboard Next Actions Gap Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1768`
- `/dashboard = 1768`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是并列状态：

- `/daily-latin = 1768`
- `/dashboard = 1768`

继续拆 `/dashboard` 后，当前 section 高度主要是：

- `#dashboard-witness-archive = 148.84`
- `#dashboard-route-map = 148.59`
- `#dashboard-next-actions = 148.53`
- `#dashboard-metrics = 148.03`

进一步做运行时拆解后确认：

- `#dashboard-next-actions = 148.53`
- `grid = 124.34`
- `card = 58.67`
- `cardScroll = 57`
- 当前真正命中的 `390px` block 内：
  - `.dashboard-page .course-grid { gap: 6px }`

说明这块还有一档很直接的 grid gap 收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在带有 `#dashboard-structure-bar` 上下文的最终生效 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page .course-grid`

做 very small pass：

- `gap: 6px -> 5px`

这轮没有去碰：

- `CourseCard` 组件逻辑
- card padding
- 文案内容
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
- `/daily-latin = 1768`
- `/dashboard = 1767`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1768 -> 1767`
- `#dashboard-next-actions`
  - `148.53 -> 147.53`

运行时再次确认：

- `.dashboard-page .course-grid`
  - `gap = 5px`

## 这轮成立的结论

- `dashboard next-actions` 在 `390px` 下还有一档稳定成立的 course grid gap 收口空间
- 这轮收益来自命中真正最终生效的 `390px` block，而不是误改其他同名 selector
- 这轮后 broad mobile Top1 已切回：
  - `/daily-latin = 1768`

下一轮应继续 fresh 基线后，回到 `/daily-latin` 或继续追 `/dashboard` 里的 `route-map / metrics`，按真实 runtime 再选一刀。
