# Dashboard Metrics Eighth Padding Pass

## 背景

在 `daily-library` fifth card min-height pass 之后，fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1744`
- `/dashboard = 1742`
- `/dance-os = 1745`

这意味着当前 broad mobile Top1 是：

- `/dashboard = 1742`

继续拆 `/dashboard` 后，当前主要 section 高度是：

- `#dashboard-witness-archive = 148.84`
- `#dashboard-structure-bar = 147.19`
- `#dashboard-next-actions = 143.53`
- `#dashboard-route-map = 140.59`
- `#dashboard-metrics = 143.03`

这轮先做了 fresh 运行时注入预演。

预演里收益最高且足够稳的一刀是：

- `#dashboard-metrics`

运行时继续确认：

- `#dashboard-metrics = 143.03`
- 当前最终命中的：
  - `.dashboard-page #dashboard-metrics .dash-card { padding: 9px }`

进一步注入补测确认：

- `padding: 9px -> 8px`

会同时带来：

- `/dashboard route -4`
- `#dashboard-metrics section -4`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正最终生效的 `390px` dashboard 覆盖层，对：

- `.dashboard-page #dashboard-metrics .dash-card`

做 very small pass：

- `padding: 9px -> 8px`

这轮没有去碰：

- metrics 文案
- 其他 dashboard section
- 组件逻辑

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
- `/daily-latin = 1744`
- `/dashboard = 1738`
- `/dance-os = 1745`

对应量化收益：

- `/dashboard 390`
  - `1742 -> 1738`
- `#dashboard-metrics`
  - `143.03 -> 139.03`

运行时再次确认：

- `.dashboard-page #dashboard-metrics .dash-card`
  - `padding = 8px`
  - `card height = 67.52`
  - `scrollHeight = 66`

## 这轮成立的结论

- `dashboard metrics` 在当前这版 worktree 的 `390px` 下，仍然存在一档稳定成立的 card shell 收口空间
- 这轮收益来自 fresh 预演后只收最终命中的 metrics card padding
- 这轮后 fresh broad mobile Top1 已切回：
  - `/daily-latin = 1744`

下一轮应回到 `/daily-latin`，优先重新判断：

- `#live-return-bridge`
- `#daily-library`
- `#today-loop-demo`
