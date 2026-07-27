# Dashboard Guardrails Row Padding Pass

## 背景

在 latest fully verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1732`
- `/dashboard = 1738`
- `/dance-os = 1739`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1739`

但继续 fresh 拆 `/dashboard` 后，当前 section 高度主要是：

- `#dashboard-witness-archive = 148.84`
- `#dashboard-structure-bar = 147.19`
- `#dashboard-next-actions = 143.53`
- `#dashboard-guardrails = 141.56`
- `#dashboard-route-map = 140.59`
- `#dashboard-metrics = 139.03`

运行时 preflight 后确认，当前几条有效候选里 ROI 最高的是：

- `#dashboard-guardrails .compact-source-matrix-panel .source-row`
  - route `1738 -> 1730`
  - target `141.56 -> 133.56`

其余有收益但更弱的点包括：

- `#dashboard-metrics .dash-card`
  - route `1738 -> 1734`
  - target `139.03 -> 135.03`
- `#dashboard-route-map .route-row`
  - route `1738 -> 1734`
  - target `140.59 -> 136.59`
- `#dashboard-witness-archive .archive-item`
  - route `1738 -> 1736`
  - target `148.84 -> 146.84`

因此这轮优先收 `dashboard-guardrails`。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加更具体的 `390px` 覆盖：

- `.dashboard-page #dashboard-guardrails .compact-source-matrix-panel .source-row`

做 very small pass：

- `padding: 2px 4px -> 1px 4px`

这样做的原因是：

- 当前文件里已经存在一层命中的 `390px` guardrails row 覆盖
- 运行时确认真正命中的最终值已经是 `2px 4px`
- 这轮只继续收最小一档纵向 padding，不动结构、不动文案、不动其他 dashboard section

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
- `/daily-latin = 1732`
- `/dashboard = 1730`
- `/dance-os = 1739`

对应量化收益：

- `/dashboard 390`
  - `1738 -> 1730`
- `#dashboard-guardrails`
  - `141.56 -> 133.56`

运行时再次确认：

- `#dashboard-guardrails .compact-source-matrix-panel .source-row`
  - `padding = 1px 4px`

## 这轮成立的结论

- `dashboard-guardrails` 在 `390px` 下仍有一档明确的 source-row 纵向收口空间
- 这轮收益显著高于同批的 `metrics / route-map / archive-item` 候选
- 这轮后 fresh broad mobile Top1 保持为：
  - `/dance-os = 1739`

下一轮应回到 fresh broad baseline 后，优先重新拆 `/dance-os`，继续在 `body-map-practice-queue / dance-assets / correction-ledger-demo` 之间挑最小且稳定的下一刀。
