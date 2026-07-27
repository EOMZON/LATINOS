# Dashboard Route Map Row Padding Pass

## 背景

在 `dashboard next-actions` card padding pass 之后，fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1746`
- `/dashboard = 1746`
- `/dance-os = 1749`

这意味着当前 broad mobile Top1 是并列状态：

- `/daily-latin = 1746`
- `/dashboard = 1746`

这轮先对两条并列 Top1 路由都做了 fresh 运行时预演。

对 `/dashboard` 来说，当前主要 section 是：

- `#dashboard-witness-archive = 148.84`
- `#dashboard-structure-bar = 147.19`
- `#dashboard-route-map = 144.59`

预演里收益最大的成立候选是：

- `#dashboard-route-map`

运行时继续确认：

- `#dashboard-route-map = 144.59`
- 当前最终命中的：
  - `.dashboard-page #dashboard-route-map .route-row { padding: 2px }`

进一步注入补测确认：

- `padding: 2px -> 1px 2px`

会同时带来：

- `/dashboard route -4`
- `#dashboard-route-map section -4`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正最终生效的 `390px` dashboard 覆盖层，对：

- `.dashboard-page #dashboard-route-map .route-row`

做 very small pass：

- `padding: 2px -> 1px 2px`

这轮没有去碰：

- route-map 文案
- route card 其他壳层
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
- `/daily-latin = 1746`
- `/dashboard = 1742`
- `/dance-os = 1749`

对应量化收益：

- `/dashboard 390`
  - `1746 -> 1742`
- `#dashboard-route-map`
  - `144.59 -> 140.59`

运行时再次确认：

- `.dashboard-page #dashboard-route-map .route-row`
  - `padding = 1px 2px`
  - `row height = 22.72`
  - `scrollHeight = 21`

## 这轮成立的结论

- `dashboard route-map` 在当前这版 worktree 的 `390px` 下，仍然存在一档稳定成立的 row shell 收口空间
- 这轮收益来自先做并列 Top1 预演，再只收最终命中的 route-row padding
- 这轮后 fresh broad mobile Top1 已切到：
  - `/dance-os = 1749`

下一轮应回到 `/dance-os`，优先重新判断：

- `#correction-ledger-demo`
- `#body-map-practice-queue`
- `#dance-assets`
