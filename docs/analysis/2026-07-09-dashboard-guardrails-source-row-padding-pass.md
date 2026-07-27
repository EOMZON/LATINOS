# Dashboard Guardrails Source Row Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/daily-latin = 1718`
- `/dashboard = 1718`
- `/dance-os = 1728`

其中 `/daily-latin` 与 `/dashboard` 并列，但 `/dashboard` 里仍有一个已经做过 preflight、且单点收益非常明确的候选：

- `#dashboard-guardrails`

preflight 已经表明：

- 如果把 `.dashboard-page #dashboard-guardrails .compact-source-matrix-panel .source-row`
  从运行时 `padding: 1px 4px`
  收成 `padding: 0 4px`
- route 总高和目标 section 高度都会同时下降

因此这一轮继续沿着既定 very small pass 主线，只做这一刀。

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚、更具体的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-guardrails .compact-source-matrix-panel .source-row`
  - `padding: 1px 4px`
- 收成：
  - `padding: 0 4px`

## 验证链

按既定顺序完成：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

结果：

- `typecheck`: pass
- `build`: pass
- `route smoke`: pass
- `browser smoke`: pass
- mobile overflow:
  - `home`: no overflow
  - `daily-latin`: no overflow

## 量化结果

fresh `390px` remeasure：

- `/dashboard`
  - `1718 -> 1710`
- `#dashboard-guardrails`
  - `133.56 -> 125.56`

其余已测 route 基线保持：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dance-os = 1728`

这说明这轮 pass 满足成立条件：

- route 总高下降
- 目标 section 高度下降

## 结论

这是一轮成立的 `390px` single-point pass。

当前 broad mobile Top1 仍然是：

- `/dance-os = 1728`

而 `/dashboard` 已经从并列位进一步降到：

- `1710`

这也再次验证：

- 在 `styles/workbench.css` 存在大量重叠 `390-430px` 媒体查询时
- 最安全的收口方式依然是：
  - 文件末尾
  - 更具体 selector
  - very small override
