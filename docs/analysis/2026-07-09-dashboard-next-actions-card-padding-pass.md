# Dashboard Next Actions Card Padding Pass

## 背景

在 `daily loop output final override` pass 之后，fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1746`
- `/dashboard = 1750`
- `/dance-os = 1749`

这意味着当前 broad mobile Top1 是：

- `/dashboard = 1750`

继续拆 `/dashboard` 后，当前更厚的 section 主要是：

- `#dashboard-witness-archive = 148.84`
- `#dashboard-next-actions = 147.53`
- `#dashboard-structure-bar = 147.19`
- `#dashboard-route-map = 144.59`

这轮先做了 fresh 运行时注入预演。

预演里收益最高且足够稳的候选有两个并列：

- `#dashboard-next-actions`
- `#dashboard-route-map`

其中更克制、风险更低的一刀是：

- `#dashboard-next-actions`

运行时继续确认：

- `#dashboard-next-actions = 147.53`
- 当前最终命中的：
  - `.dashboard-page .course-card { padding: 5px 7px }`

进一步注入补测确认：

- `padding: 5px 7px -> 4px 6px`

会同时带来：

- `/dashboard route -4`
- `#dashboard-next-actions section -4`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正最终生效的 `390px` dashboard 覆盖层，对：

- `.dashboard-page .course-card`

做 very small pass：

- `padding: 5px 7px -> 4px 6px`

这轮没有去碰：

- next-actions 文案
- 组件逻辑
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
- `/dashboard = 1746`
- `/dance-os = 1749`

对应量化收益：

- `/dashboard 390`
  - `1750 -> 1746`
- `#dashboard-next-actions`
  - `147.53 -> 143.53`

运行时再次确认：

- `.dashboard-page #dashboard-next-actions .course-card`
  - `padding = 4px 6px`
  - `card height = 56.67`
  - `scrollHeight = 55`

## 这轮成立的结论

- `dashboard next-actions` 在当前这版 worktree 的 `390px` 下，仍然存在一档稳定成立的 card shell 收口空间
- 这轮收益来自先做运行时预演、再只收最终命中的 compact card padding
- 这轮后 fresh broad mobile Top1 变成并列：
  - `/daily-latin = 1746`
  - `/dashboard = 1746`

下一轮应继续 fresh 预演，并在这两个并列 Top1 之间重新判断：

- `/daily-latin`
  - `#today-loop-demo`
  - `#live-return-bridge`
  - `#daily-library`
- `/dashboard`
  - `#dashboard-witness-archive`
  - `#dashboard-structure-bar`
  - `#dashboard-route-map`
