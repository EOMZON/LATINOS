# Dashboard Guardrails List Gap Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1770`
- `/dashboard = 1772`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是：

- `/dashboard = 1772`

继续拆 `/dashboard` 后，当前 section 高度主要是：

- `#dashboard-guardrails = 151.56`
- `#dashboard-witness-archive = 150.84`
- `#dashboard-route-map = 148.59`
- `#dashboard-next-actions = 148.53`
- `#dashboard-metrics = 148.03`

运行时拆解确认：

- `#dashboard-guardrails = 151.56`
- `matrix = 127.38`
- `panel = 54.19`
- `row = 15.59`
- 当前最终命中的：
  - `.dashboard-page #dashboard-guardrails .compact-source-matrix-panel .source-list { gap: 3px }`

这说明 `guardrails` 这里还有一档很直接的 source list shell 收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dashboard-page #dashboard-guardrails .compact-source-matrix-panel .source-list`

做 very small pass：

- `gap: 3px -> 2px`

这轮没有去碰：

- `SourceMatrix` / `SourcePanel` 组件逻辑
- row padding
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
- `/daily-latin = 1770`
- `/dashboard = 1770`
- `/dance-os = 1760`

对应量化收益：

- `/dashboard 390`
  - `1772 -> 1770`
- `#dashboard-guardrails`
  - `151.56 -> 149.56`

运行时再次确认：

- `#dashboard-guardrails .source-list`
  - `gap = 2px`

## 这轮成立的结论

- `dashboard guardrails` 在 `390px` 下还有一档稳定成立的 source list gap 收口空间
- 这轮收益来自命中真正最终生效的 `guardrails` media block，而不是去赌已经压得很极限的 row padding
- 这轮后 broad mobile Top1 状态重新回到并列：
  - `/daily-latin = 1770`
  - `/dashboard = 1770`

下一轮应继续 fresh 基线后，再判断是回到 `/daily-latin`，还是继续在 `/dashboard` 的 `witness-archive / route-map / next-actions` 里挑下一刀。
