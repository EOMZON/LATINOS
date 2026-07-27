# Dashboard Route Map Row Tight Pass

## 背景

在 latest fully verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1730`
- `/dashboard = 1730`
- `/dance-os = 1735`

这意味着当轮 broad mobile Top1 是并列状态：

- `/daily-latin = 1730`
- `/dashboard = 1730`

继续 fresh 预演后，对两条并列 Top1 的主要有效候选做比较：

### `/daily-latin`

- `#daily-library .compact-move-card`
  - route `1730 -> 1728`
  - target `133.53 -> 131.53`
- `#live-return-bridge .bodymap-actions`
  - route `1730 -> 1729`
  - target `145.14 -> 144.14`

### `/dashboard`

- `#dashboard-route-map .route-row`
  - route `1730 -> 1726`
  - target `140.59 -> 136.59`
- `#dashboard-metrics .dash-card`
  - route `1730 -> 1726`
  - target `139.03 -> 135.03`
- `#dashboard-witness-archive .archive-item`
  - route `1730 -> 1728`
  - target `148.84 -> 146.84`

因此这轮优先收 `/dashboard`，并在同样能带来 `route -4` 的候选中，继续优先选择当前目标 section 更高的 `route-map`。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加更具体的 `390px` 覆盖：

- `.dashboard-page #dashboard-route-map .route-row`

做 very small pass：

- `padding: 1px 2px -> 0 2px`

这样做的原因是：

- 当前文件里已经存在多层 `route-row` 的历史 `390px` 定义
- 运行时确认真正命中的最终值已经是 `1px 2px`
- 这轮只继续收最小一档纵向 padding，不动 route-map 其余结构、不动其他 dashboard section

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
- `/daily-latin = 1730`
- `/dashboard = 1726`
- `/dance-os = 1735`

对应量化收益：

- `/dashboard 390`
  - `1730 -> 1726`
- `#dashboard-route-map`
  - `140.59 -> 136.59`

运行时再次确认：

- `#dashboard-route-map .route-row`
  - `padding = 0px 2px`

## 这轮成立的结论

- `dashboard-route-map` 在 `390px` 下还有一档明确成立的 row 纵向收口空间
- 在这轮并列 Top1 比较里，它是当前 ROI 最高的一刀
- 这轮后 fresh broad mobile Top1 变成：
  - `/daily-latin = 1730`

下一轮应回到 fresh broad baseline 后，继续拆 `/daily-latin`，优先在 `live-return-bridge / daily-library / today-loop-demo` 之间挑下一刀最小且稳定的 pass。
